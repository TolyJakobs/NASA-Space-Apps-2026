import type { Component, MissionConfiguration } from '../domain/types'
import { isFiniteNonnegative } from './numericValidation'

export type ComponentMassCalculationErrorCode =
  | 'unknown-component-id'
  | 'invalid-component-mass'

/** A structured failure returned when a selected component cannot contribute valid mass. */
export class ComponentMassCalculationError extends Error {
  constructor(
    public readonly code: ComponentMassCalculationErrorCode,
    public readonly componentId: string,
  ) {
    super(
      code === 'unknown-component-id'
        ? `Selected component ID "${componentId}" does not exist in the available component catalogs.`
        : `Selected component "${componentId}" has an invalid massKg value; mass must be finite and nonnegative.`,
    )
    this.name = 'ComponentMassCalculationError'
  }
}

/**
 * Calculates selected spacecraft component mass in kilograms.
 *
 * Catalog component IDs are assumed to be unique. Repeated selected IDs are
 * intentionally resolved and added once per occurrence. Launch configuration
 * is accepted only as part of MissionConfiguration and never contributes mass.
 */
export function calculateTotalSpacecraftMassKg(
  configuration: MissionConfiguration,
  availableComponents: readonly Component[],
): number {
  let totalMassKg = 0

  for (const componentId of configuration.selectedComponentIds) {
    const component = availableComponents.find((candidate) => candidate.id === componentId)

    if (!component) {
      throw new ComponentMassCalculationError('unknown-component-id', componentId)
    }

    if (!isFiniteNonnegative(component.massKg)) {
      throw new ComponentMassCalculationError('invalid-component-mass', componentId)
    }

    totalMassKg += component.massKg
  }

  return totalMassKg
}
