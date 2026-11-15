import type { Component, MissionConfiguration, OrbitOption } from '../domain/types'
import { isFiniteNonnegative } from './numericValidation'
import {
  SpacecraftPowerDrawCalculationError,
  calculateTotalSpacecraftPowerDrawW,
} from './resources'

const HOURS_PER_DAY = 24
const MINUTES_PER_HOUR = 60

export interface SpacecraftEnergySummary {
  dailySolarGenerationWh: number
  dailyConsumptionWh: number
  eclipseDurationHours: number
  eclipseBatteryRequirementWh: number
}

export type EnergyCalculationErrorCode =
  | 'unknown-orbit-id'
  | 'invalid-orbit-sunlight-fraction'
  | 'invalid-orbit-period-minutes'
  | 'invalid-solar-panel-generation'
  | 'non-finite-energy-result'

/** A structured failure returned when daily energy values cannot be calculated safely. */
export class EnergyCalculationError extends Error {
  constructor(
    public readonly code: EnergyCalculationErrorCode,
    public readonly componentId?: string,
    public readonly orbitId?: string,
  ) {
    const id = orbitId ?? componentId
    const messages: Record<EnergyCalculationErrorCode, string> = {
      'unknown-orbit-id': `Selected orbit ID "${id}" does not exist in the available orbit catalog.`,
      'invalid-orbit-sunlight-fraction': `Selected orbit "${id}" has an invalid sunlightFraction; it must be finite and between 0 and 1.`,
      'invalid-orbit-period-minutes': `Selected orbit "${id}" has an invalid periodMinutes value; it must be finite and greater than zero.`,
      'invalid-solar-panel-generation': `Selected solar panel "${id}" has an invalid powerGenerationW value; it must be finite and nonnegative.`,
      'non-finite-energy-result': 'Energy calculation produced a non-finite result.',
    }

    super(messages[code])
    this.name = 'EnergyCalculationError'
  }
}

function requireFiniteEnergyResult(value: number): number {
  if (!Number.isFinite(value)) {
    throw new EnergyCalculationError('non-finite-energy-result')
  }

  return value
}

function validateOrbit(orbit: OrbitOption): void {
  if (!isFiniteNonnegative(orbit.sunlightFraction) || orbit.sunlightFraction > 1) {
    throw new EnergyCalculationError('invalid-orbit-sunlight-fraction', undefined, orbit.id)
  }

  if (!Number.isFinite(orbit.periodMinutes) || orbit.periodMinutes <= 0) {
    throw new EnergyCalculationError('invalid-orbit-period-minutes', undefined, orbit.id)
  }
}

/**
 * Calculates idealized daily solar energy, daily load, and a single-eclipse reserve.
 *
 * Solar panels generate nominal power only during the selected orbit's modeled
 * sunlight fraction. Active loads are constant for all 24 hours; panel losses,
 * battery capacity, charging, discharge, and duty cycles are intentionally excluded.
 */
export function calculateSpacecraftEnergySummary(
  configuration: MissionConfiguration,
  availableComponents: readonly Component[],
  availableOrbits: readonly OrbitOption[],
): SpacecraftEnergySummary {
  const activePowerDrawW = calculateTotalSpacecraftPowerDrawW(configuration, availableComponents)
  const orbit = availableOrbits.find((candidate) => candidate.id === configuration.selectedOrbitId)

  if (!orbit) {
    throw new EnergyCalculationError('unknown-orbit-id', undefined, configuration.selectedOrbitId)
  }

  validateOrbit(orbit)

  let totalSolarGenerationW = 0

  for (const componentId of configuration.selectedComponentIds) {
    const component = availableComponents.find((candidate) => candidate.id === componentId)

    if (!component) {
      throw new SpacecraftPowerDrawCalculationError('unknown-component-id', componentId)
    }

    if (component.type !== 'solar-panel') {
      continue
    }

    const powerGenerationW = (component as Component & { powerGenerationW?: unknown })
      .powerGenerationW

    if (!isFiniteNonnegative(powerGenerationW)) {
      throw new EnergyCalculationError('invalid-solar-panel-generation', componentId)
    }

    totalSolarGenerationW = requireFiniteEnergyResult(totalSolarGenerationW + powerGenerationW)
  }

  const eclipseDurationHours = requireFiniteEnergyResult(
    (orbit.periodMinutes * (1 - orbit.sunlightFraction)) / MINUTES_PER_HOUR,
  )
  const dailySolarGenerationWh = requireFiniteEnergyResult(
    totalSolarGenerationW * HOURS_PER_DAY * orbit.sunlightFraction,
  )
  const dailyConsumptionWh = requireFiniteEnergyResult(activePowerDrawW * HOURS_PER_DAY)
  const eclipseBatteryRequirementWh = requireFiniteEnergyResult(
    activePowerDrawW * eclipseDurationHours,
  )

  return {
    dailySolarGenerationWh,
    dailyConsumptionWh,
    eclipseDurationHours,
    eclipseBatteryRequirementWh,
  }
}
