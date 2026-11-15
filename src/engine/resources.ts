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

export type SpacecraftPowerDrawCalculationErrorCode =
  | 'unknown-component-id'
  | 'invalid-component-power-consumption'
  | 'non-finite-total-power-draw'

/** A structured failure returned when active spacecraft power draw cannot be calculated safely. */
export class SpacecraftPowerDrawCalculationError extends Error {
  constructor(
    public readonly code: SpacecraftPowerDrawCalculationErrorCode,
    public readonly componentId?: string,
  ) {
    const messages: Record<SpacecraftPowerDrawCalculationErrorCode, string> = {
      'unknown-component-id': `Selected component ID "${componentId}" does not exist in the available component catalogs.`,
      'invalid-component-power-consumption': `Selected power-consuming component "${componentId}" has an invalid powerConsumptionW value; power consumption must be finite and nonnegative.`,
      'non-finite-total-power-draw': 'Spacecraft active power draw total is not finite after adding selected loads.',
    }

    super(messages[code])
    this.name = 'SpacecraftPowerDrawCalculationError'
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

/**
 * Calculates selected components' active electrical consumption in watts.
 *
 * Scientific instruments and communications equipment require active power
 * consumption values. Solar panels and batteries are non-consuming under the
 * current model, so neither generation nor stored energy contributes to W.
 */
export function calculateTotalSpacecraftPowerDrawW(
  configuration: MissionConfiguration,
  availableComponents: readonly Component[],
): number {
  let totalPowerDrawW = 0

  for (const componentId of configuration.selectedComponentIds) {
    const component = availableComponents.find((candidate) => candidate.id === componentId)

    if (!component) {
      throw new SpacecraftPowerDrawCalculationError('unknown-component-id', componentId)
    }

    if (component.type !== 'scientific-instrument' && component.type !== 'communications') {
      continue
    }

    const powerConsumptionW = (component as Component & { powerConsumptionW?: unknown })
      .powerConsumptionW

    if (!isFiniteNonnegative(powerConsumptionW)) {
      throw new SpacecraftPowerDrawCalculationError(
        'invalid-component-power-consumption',
        componentId,
      )
    }

    totalPowerDrawW += powerConsumptionW

    if (!Number.isFinite(totalPowerDrawW)) {
      throw new SpacecraftPowerDrawCalculationError('non-finite-total-power-draw')
    }
  }

  return totalPowerDrawW
}
