import type { Component, MissionConfiguration, OrbitOption } from '../domain/types'
import { isFiniteNonnegative } from './numericValidation'

export interface ScienceDataFlowSummary {
  generatedScienceDataMbPerDay: number
  rawDownlinkMbPerDay: number
  effectiveDownlinkMbPerDay: number
  deliveredScienceDataMbPerDay: number
}

export type DataFlowCalculationErrorCode =
  | 'unknown-component-id'
  | 'unknown-orbit-id'
  | 'invalid-scientific-data-rate'
  | 'invalid-downlink-rate'
  | 'invalid-orbit-contact-modifier'
  | 'non-finite-data-flow-result'

/** A structured failure returned when data throughput cannot be calculated safely. */
export class DataFlowCalculationError extends Error {
  constructor(
    public readonly code: DataFlowCalculationErrorCode,
    public readonly componentId?: string,
    public readonly orbitId?: string,
  ) {
    const id = orbitId ?? componentId
    const messages: Record<DataFlowCalculationErrorCode, string> = {
      'unknown-component-id': `Selected component ID "${id}" does not exist in the available component catalogs.`,
      'unknown-orbit-id': `Selected orbit ID "${id}" does not exist in the available orbit catalog.`,
      'invalid-scientific-data-rate': `Selected scientific instrument "${id}" has an invalid scienceDataMbPerDay value; it must be finite and nonnegative.`,
      'invalid-downlink-rate': `Selected communications component "${id}" has an invalid downlinkMbPerDay value; it must be finite and nonnegative.`,
      'invalid-orbit-contact-modifier': `Selected orbit "${id}" has an invalid contactModifier value; it must be finite and nonnegative.`,
      'non-finite-data-flow-result': 'Data-flow calculation produced a non-finite result.',
    }

    super(messages[code])
    this.name = 'DataFlowCalculationError'
  }
}

function requireFiniteDataFlowResult(value: number): number {
  if (!Number.isFinite(value)) {
    throw new DataFlowCalculationError('non-finite-data-flow-result')
  }

  return value
}

/**
 * Calculates daily science-data generation and orbit-adjusted downlink throughput.
 *
 * Instrument and communications rates are additive daily averages. The selected
 * orbit's contact modifier scales aggregate downlink once; scienceModifier is not
 * used, and no buffering, prioritization, compression, or packet loss is modeled.
 */
export function calculateScienceDataFlow(
  configuration: MissionConfiguration,
  availableComponents: readonly Component[],
  availableOrbits: readonly OrbitOption[],
): ScienceDataFlowSummary {
  const orbit = availableOrbits.find((candidate) => candidate.id === configuration.selectedOrbitId)

  if (!orbit) {
    throw new DataFlowCalculationError('unknown-orbit-id', undefined, configuration.selectedOrbitId)
  }

  if (!isFiniteNonnegative(orbit.contactModifier)) {
    throw new DataFlowCalculationError('invalid-orbit-contact-modifier', undefined, orbit.id)
  }

  let generatedScienceDataMbPerDay = 0
  let rawDownlinkMbPerDay = 0

  for (const componentId of configuration.selectedComponentIds) {
    const component = availableComponents.find((candidate) => candidate.id === componentId)

    if (!component) {
      throw new DataFlowCalculationError('unknown-component-id', componentId)
    }

    if (component.type === 'scientific-instrument') {
      const scienceDataMbPerDay = (component as Component & { scienceDataMbPerDay?: unknown })
        .scienceDataMbPerDay

      if (!isFiniteNonnegative(scienceDataMbPerDay)) {
        throw new DataFlowCalculationError('invalid-scientific-data-rate', componentId)
      }

      generatedScienceDataMbPerDay = requireFiniteDataFlowResult(
        generatedScienceDataMbPerDay + scienceDataMbPerDay,
      )
    }

    if (component.type === 'communications') {
      const downlinkMbPerDay = (component as Component & { downlinkMbPerDay?: unknown })
        .downlinkMbPerDay

      if (!isFiniteNonnegative(downlinkMbPerDay)) {
        throw new DataFlowCalculationError('invalid-downlink-rate', componentId)
      }

      rawDownlinkMbPerDay = requireFiniteDataFlowResult(rawDownlinkMbPerDay + downlinkMbPerDay)
    }
  }

  const effectiveDownlinkMbPerDay = requireFiniteDataFlowResult(
    rawDownlinkMbPerDay * orbit.contactModifier,
  )
  const deliveredScienceDataMbPerDay = Math.min(
    generatedScienceDataMbPerDay,
    effectiveDownlinkMbPerDay,
  )

  return {
    generatedScienceDataMbPerDay,
    rawDownlinkMbPerDay,
    effectiveDownlinkMbPerDay,
    deliveredScienceDataMbPerDay,
  }
}
