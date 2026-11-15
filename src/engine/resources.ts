import type { Component, LaunchOption, MissionConfiguration } from '../domain/types'
import { isFiniteNonnegative } from './numericValidation'

/** The minimum catalog shape required to calculate component purchase costs. */
export interface CostedComponent {
  id: string
  costUsd: number
}

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

export type MissionCostCalculationErrorCode =
  | 'unknown-component-id'
  | 'unknown-launch-option-id'
  | 'invalid-component-cost'
  | 'invalid-launch-cost'
  | 'non-finite-total-cost'

/** A structured failure returned when mission costs cannot be calculated safely. */
export class MissionCostCalculationError extends Error {
  constructor(
    public readonly code: MissionCostCalculationErrorCode,
    public readonly id?: string,
  ) {
    const messages: Record<MissionCostCalculationErrorCode, string> = {
      'unknown-component-id': `Selected component ID "${id}" does not exist in the available component catalogs.`,
      'unknown-launch-option-id': `Selected launch option ID "${id}" does not exist in the available launch catalog.`,
      'invalid-component-cost': `Selected component "${id}" has an invalid costUsd value; cost must be finite and nonnegative.`,
      'invalid-launch-cost': `Selected launch option "${id}" has an invalid costUsd value; cost must be finite and nonnegative.`,
      'non-finite-total-cost': 'Mission cost total is not finite after adding the selected costs.',
    }

    super(messages[code])
    this.name = 'MissionCostCalculationError'
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

/**
 * Calculates selected component and launch costs in USD.
 *
 * Catalog IDs are assumed unique. Repeated component IDs intentionally add a
 * separate physical copy's cost. Catalog costs are illustrative gameplay values.
 */
export function calculateTotalMissionCostUsd(
  configuration: MissionConfiguration,
  availableComponents: readonly CostedComponent[],
  availableLaunches: readonly LaunchOption[],
): number {
  const launchOption = availableLaunches.find(
    (candidate) => candidate.id === configuration.selectedLaunchOptionId,
  )

  if (!launchOption) {
    throw new MissionCostCalculationError(
      'unknown-launch-option-id',
      configuration.selectedLaunchOptionId,
    )
  }

  if (!isFiniteNonnegative(launchOption.costUsd)) {
    throw new MissionCostCalculationError('invalid-launch-cost', launchOption.id)
  }

  let totalMissionCostUsd = launchOption.costUsd

  for (const componentId of configuration.selectedComponentIds) {
    const component = availableComponents.find((candidate) => candidate.id === componentId)

    if (!component) {
      throw new MissionCostCalculationError('unknown-component-id', componentId)
    }

    if (!isFiniteNonnegative(component.costUsd)) {
      throw new MissionCostCalculationError('invalid-component-cost', componentId)
    }

    totalMissionCostUsd += component.costUsd

    if (!Number.isFinite(totalMissionCostUsd)) {
      throw new MissionCostCalculationError('non-finite-total-cost')
    }
  }

  return totalMissionCostUsd
}
