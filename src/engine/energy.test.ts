import { describe, expect, it } from 'vitest'
import type { Component, MissionConfiguration, OrbitOption } from '../domain/types'
import {
  EnergyCalculationError,
  calculateSpacecraftEnergySummary,
} from './energy'
import { SpacecraftPowerDrawCalculationError } from './resources'

type EnergyComponent = Component & {
  powerConsumptionW?: number
  powerGenerationW?: number
  capacityWh?: number
}

const baseConfiguration: MissionConfiguration = {
  missionId: 'mission.test.v1',
  selectedComponentIds: [],
  selectedOrbitId: 'orbit.test.v1',
  selectedLaunchOptionId: 'launch.test.v1',
}

const orbit: OrbitOption = {
  id: 'orbit.test.v1',
  name: 'Test Orbit',
  altitudeKm: 400,
  inclinationDeg: 51.6,
  periodMinutes: 90,
  sunlightFraction: 0.6,
  contactModifier: 1,
  scienceModifier: 1,
  description: 'Test orbit.',
}

const components: readonly EnergyComponent[] = [
  {
    id: 'solar-panel.test.v1',
    name: 'Solar Panel',
    type: 'solar-panel',
    massKg: 10,
    powerGenerationW: 100,
  },
  {
    id: 'instrument.test.v1',
    name: 'Instrument',
    type: 'scientific-instrument',
    massKg: 10,
    powerConsumptionW: 40,
  },
  {
    id: 'battery.test.v1',
    name: 'Battery',
    type: 'battery',
    massKg: 2,
    capacityWh: 500,
  },
]

function configurationWith(selectedComponentIds: string[]): MissionConfiguration {
  return { ...baseConfiguration, selectedComponentIds }
}

describe('calculateSpacecraftEnergySummary', () => {
  it('calculates daily generation, consumption, eclipse duration, and battery requirement', () => {
    expect(
      calculateSpacecraftEnergySummary(
        configurationWith(['solar-panel.test.v1', 'instrument.test.v1']),
        components,
        [orbit],
      ),
    ).toEqual({
      dailySolarGenerationWh: 1440,
      dailyConsumptionWh: 960,
      eclipseDurationHours: 0.6,
      eclipseBatteryRequirementWh: 24,
    })
  })

  it('returns zero generation when no solar panels are selected', () => {
    expect(
      calculateSpacecraftEnergySummary(configurationWith(['instrument.test.v1']), components, [orbit]),
    ).toMatchObject({
      dailySolarGenerationWh: 0,
      dailyConsumptionWh: 960,
      eclipseBatteryRequirementWh: 24,
    })
  })

  it('returns zero consumption and eclipse battery requirement with no power-consuming components', () => {
    expect(
      calculateSpacecraftEnergySummary(configurationWith(['solar-panel.test.v1']), components, [orbit]),
    ).toMatchObject({
      dailySolarGenerationWh: 1440,
      dailyConsumptionWh: 0,
      eclipseBatteryRequirementWh: 0,
    })
  })

  it('counts repeated solar panel IDs as separate generation sources', () => {
    expect(
      calculateSpacecraftEnergySummary(
        configurationWith(['solar-panel.test.v1', 'solar-panel.test.v1']),
        components,
        [orbit],
      ).dailySolarGenerationWh,
    ).toBe(2880)
  })

  it('reuses repeated consuming components in daily consumption and eclipse need', () => {
    expect(
      calculateSpacecraftEnergySummary(
        configurationWith(['instrument.test.v1', 'instrument.test.v1']),
        components,
        [orbit],
      ),
    ).toMatchObject({ dailyConsumptionWh: 1920, eclipseBatteryRequirementWh: 48 })
  })

  it('handles zero sunlight fraction', () => {
    const zeroSunOrbit = { ...orbit, sunlightFraction: 0 }

    expect(
      calculateSpacecraftEnergySummary(
        configurationWith(['solar-panel.test.v1', 'instrument.test.v1']),
        components,
        [zeroSunOrbit],
      ),
    ).toEqual({
      dailySolarGenerationWh: 0,
      dailyConsumptionWh: 960,
      eclipseDurationHours: 1.5,
      eclipseBatteryRequirementWh: 60,
    })
  })

  it('handles full sunlight fraction', () => {
    const fullSunOrbit = { ...orbit, sunlightFraction: 1 }

    expect(
      calculateSpacecraftEnergySummary(
        configurationWith(['solar-panel.test.v1', 'instrument.test.v1']),
        components,
        [fullSunOrbit],
      ),
    ).toEqual({
      dailySolarGenerationWh: 2400,
      dailyConsumptionWh: 960,
      eclipseDurationHours: 0,
      eclipseBatteryRequirementWh: 0,
    })
  })

  it('rejects an unknown component ID through the shared power-draw error convention', () => {
    expect(() =>
      calculateSpacecraftEnergySummary(
        configurationWith(['component.unknown.v1']),
        components,
        [orbit],
      ),
    ).toThrow(SpacecraftPowerDrawCalculationError)
  })

  it('rejects an unknown orbit ID', () => {
    const configuration = { ...baseConfiguration, selectedOrbitId: 'orbit.unknown.v1' }

    expect(() => calculateSpacecraftEnergySummary(configuration, components, [orbit])).toThrow(
      EnergyCalculationError,
    )

    try {
      calculateSpacecraftEnergySummary(configuration, components, [orbit])
    } catch (error) {
      expect(error).toMatchObject({ code: 'unknown-orbit-id', orbitId: 'orbit.unknown.v1' })
    }
  })

  it.each([-0.1, 1.1, Number.NaN, Number.POSITIVE_INFINITY])(
    'rejects invalid sunlight fraction %s',
    (sunlightFraction) => {
      expect(() =>
        calculateSpacecraftEnergySummary(baseConfiguration, components, [
          { ...orbit, sunlightFraction },
        ]),
      ).toThrow(EnergyCalculationError)
    },
  )

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])(
    'rejects invalid orbital period %s',
    (periodMinutes) => {
      expect(() =>
        calculateSpacecraftEnergySummary(baseConfiguration, components, [
          { ...orbit, periodMinutes },
        ]),
      ).toThrow(EnergyCalculationError)
    },
  )

  it.each([Number.NaN, Number.POSITIVE_INFINITY, -1, undefined])(
    'rejects invalid solar generation value %s',
    (powerGenerationW) => {
      const invalidComponents: readonly EnergyComponent[] = [
        {
          id: 'solar-panel.invalid.v1',
          name: 'Invalid Solar Panel',
          type: 'solar-panel',
          massKg: 1,
          powerGenerationW,
        },
      ]

      expect(() =>
        calculateSpacecraftEnergySummary(
          configurationWith(['solar-panel.invalid.v1']),
          invalidComponents,
          [orbit],
        ),
      ).toThrow(EnergyCalculationError)
    },
  )

  it('rejects arithmetic overflow', () => {
    const overflowingComponents: readonly EnergyComponent[] = [
      {
        id: 'solar-panel.overflow.v1',
        name: 'Overflowing Solar Panel',
        type: 'solar-panel',
        massKg: 1,
        powerGenerationW: Number.MAX_VALUE,
      },
    ]

    expect(() =>
      calculateSpacecraftEnergySummary(
        configurationWith(['solar-panel.overflow.v1', 'solar-panel.overflow.v1']),
        overflowingComponents,
        [orbit],
      ),
    ).toThrow(EnergyCalculationError)
  })

  it('returns zeroes for an empty component selection without mutating inputs', () => {
    const configurationBefore = structuredClone(baseConfiguration)
    const componentsBefore = structuredClone(components)
    const orbitsBefore = structuredClone([orbit])

    expect(calculateSpacecraftEnergySummary(baseConfiguration, components, [orbit])).toEqual({
      dailySolarGenerationWh: 0,
      dailyConsumptionWh: 0,
      eclipseDurationHours: 0.6,
      eclipseBatteryRequirementWh: 0,
    })
    expect(calculateSpacecraftEnergySummary(baseConfiguration, components, [orbit])).toEqual({
      dailySolarGenerationWh: 0,
      dailyConsumptionWh: 0,
      eclipseDurationHours: 0.6,
      eclipseBatteryRequirementWh: 0,
    })
    expect(baseConfiguration).toEqual(configurationBefore)
    expect(components).toEqual(componentsBefore)
    expect([orbit]).toEqual(orbitsBefore)
  })
})
