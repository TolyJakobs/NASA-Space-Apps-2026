import { describe, expect, it } from 'vitest'
import { launches } from '../data/launches'
import type { Component, LaunchOption, MissionConfiguration } from '../domain/types'
import {
  ComponentMassCalculationError,
  MissionCostCalculationError,
  SpacecraftPowerDrawCalculationError,
  calculateTotalSpacecraftMassKg,
  calculateTotalMissionCostUsd,
  calculateTotalSpacecraftPowerDrawW,
} from './resources'

const baseConfiguration: MissionConfiguration = {
  missionId: 'mission.test.v1',
  selectedComponentIds: [],
  selectedOrbitId: 'orbit.test.v1',
  selectedLaunchOptionId: 'launch.shared-rideshare.v1',
}

const components: readonly Component[] = [
  { id: 'component.camera.v1', name: 'Camera', type: 'instrument', massKg: 18 },
  { id: 'component.panel.v1', name: 'Panel', type: 'power', massKg: 12 },
  { id: 'component.battery.v1', name: 'Battery', type: 'storage', massKg: 5 },
]

const costedComponents = [
  { id: 'component.camera.v1', costUsd: 4_000_000 },
  { id: 'component.panel.v1', costUsd: 1_200_000 },
  { id: 'component.battery.v1', costUsd: 900 },
] as const

const launchOptions: readonly LaunchOption[] = [
  {
    id: 'launch.shared-rideshare.v1',
    name: 'Shared Rideshare',
    vehicleName: 'Test Launch Vehicle',
    description: 'Test launch option.',
    maxPayloadKg: 150,
    costUsd: 5_800_000,
    supportedOrbitIds: ['orbit.test.v1'],
  },
]

type PowerComponent = Component & { powerConsumptionW?: number }

const powerComponents: readonly PowerComponent[] = [
  {
    id: 'instrument.camera.v1',
    name: 'Camera',
    type: 'scientific-instrument',
    massKg: 18,
    powerConsumptionW: 55,
  },
  {
    id: 'communications.radio.v1',
    name: 'Radio',
    type: 'communications',
    massKg: 6,
    powerConsumptionW: 25,
  },
  {
    id: 'solar-panel.array.v1',
    name: 'Solar Array',
    type: 'solar-panel',
    massKg: 12,
  },
  {
    id: 'battery.small.v1',
    name: 'Battery',
    type: 'battery',
    massKg: 2,
  },
]

function configurationWith(selectedComponentIds: string[]): MissionConfiguration {
  return { ...baseConfiguration, selectedComponentIds }
}

describe('calculateTotalSpacecraftMassKg', () => {
  it('returns zero for an empty component selection', () => {
    expect(calculateTotalSpacecraftMassKg(baseConfiguration, components)).toBe(0)
  })

  it('returns the mass of a single selected component', () => {
    expect(calculateTotalSpacecraftMassKg(configurationWith(['component.camera.v1']), components)).toBe(18)
  })

  it('sums the masses of different selected components', () => {
    expect(
      calculateTotalSpacecraftMassKg(
        configurationWith(['component.camera.v1', 'component.panel.v1', 'component.battery.v1']),
        components,
      ),
    ).toBe(35)
  })

  it('counts a repeated component ID as another physical copy', () => {
    expect(
      calculateTotalSpacecraftMassKg(
        configurationWith(['component.battery.v1', 'component.battery.v1']),
        components,
      ),
    ).toBe(10)
  })

  it('throws an actionable structured error for an unknown component ID', () => {
    expect(() =>
      calculateTotalSpacecraftMassKg(configurationWith(['component.unknown.v1']), components),
    ).toThrow(ComponentMassCalculationError)

    try {
      calculateTotalSpacecraftMassKg(configurationWith(['component.unknown.v1']), components)
    } catch (error) {
      expect(error).toMatchObject({
        code: 'unknown-component-id',
        componentId: 'component.unknown.v1',
      })
    }
  })

  it.each([Number.NaN, Number.POSITIVE_INFINITY, -1])(
    'throws an actionable structured error for invalid selected mass %s',
    (massKg) => {
      const invalidComponents: readonly Component[] = [
        { id: 'component.invalid.v1', name: 'Invalid', type: 'test', massKg },
      ]

      expect(() =>
        calculateTotalSpacecraftMassKg(configurationWith(['component.invalid.v1']), invalidComponents),
      ).toThrow(ComponentMassCalculationError)

      try {
        calculateTotalSpacecraftMassKg(configurationWith(['component.invalid.v1']), invalidComponents)
      } catch (error) {
        expect(error).toMatchObject({
          code: 'invalid-component-mass',
          componentId: 'component.invalid.v1',
        })
      }
    },
  )

  it('excludes launch vehicle payload capacity from spacecraft mass', () => {
    const launch = launches.find((candidate) => candidate.id === baseConfiguration.selectedLaunchOptionId)
    expect(launch).toBeDefined()

    expect(
      calculateTotalSpacecraftMassKg(configurationWith(['component.camera.v1']), components),
    ).toBe(18)
    expect(launch?.maxPayloadKg).not.toBe(18)
  })

  it('returns the same result for repeated calls with the same inputs', () => {
    const configuration = configurationWith(['component.camera.v1', 'component.battery.v1'])

    expect(calculateTotalSpacecraftMassKg(configuration, components)).toBe(23)
    expect(calculateTotalSpacecraftMassKg(configuration, components)).toBe(23)
  })
})

describe('calculateTotalMissionCostUsd', () => {
  it('returns the launch cost for an empty component selection', () => {
    expect(calculateTotalMissionCostUsd(baseConfiguration, costedComponents, launchOptions)).toBe(
      5_800_000,
    )
  })

  it('adds one component cost to the selected launch cost', () => {
    expect(
      calculateTotalMissionCostUsd(
        configurationWith(['component.camera.v1']),
        costedComponents,
        launchOptions,
      ),
    ).toBe(9_800_000)
  })

  it('sums multiple different component costs with the selected launch cost', () => {
    expect(
      calculateTotalMissionCostUsd(
        configurationWith(['component.camera.v1', 'component.panel.v1', 'component.battery.v1']),
        costedComponents,
        launchOptions,
      ),
    ).toBe(11_000_900)
  })

  it('counts each repeated component ID as another purchased copy', () => {
    expect(
      calculateTotalMissionCostUsd(
        configurationWith(['component.battery.v1', 'component.battery.v1']),
        costedComponents,
        launchOptions,
      ),
    ).toBe(5_801_800)
  })

  it('throws an actionable structured error for an unknown component ID', () => {
    expect(() =>
      calculateTotalMissionCostUsd(
        configurationWith(['component.unknown.v1']),
        costedComponents,
        launchOptions,
      ),
    ).toThrow(MissionCostCalculationError)

    try {
      calculateTotalMissionCostUsd(
        configurationWith(['component.unknown.v1']),
        costedComponents,
        launchOptions,
      )
    } catch (error) {
      expect(error).toMatchObject({ code: 'unknown-component-id', id: 'component.unknown.v1' })
    }
  })

  it('throws an actionable structured error for an unknown launch ID', () => {
    const configuration = { ...baseConfiguration, selectedLaunchOptionId: 'launch.unknown.v1' }

    expect(() => calculateTotalMissionCostUsd(configuration, costedComponents, launchOptions)).toThrow(
      MissionCostCalculationError,
    )

    try {
      calculateTotalMissionCostUsd(configuration, costedComponents, launchOptions)
    } catch (error) {
      expect(error).toMatchObject({ code: 'unknown-launch-option-id', id: 'launch.unknown.v1' })
    }
  })

  it.each([Number.NaN, Number.POSITIVE_INFINITY, -1, undefined])(
    'throws an actionable structured error for invalid component cost %s',
    (costUsd) => {
      const invalidComponents = [{ id: 'component.invalid.v1', costUsd: costUsd as number }]

      expect(() =>
        calculateTotalMissionCostUsd(
          configurationWith(['component.invalid.v1']),
          invalidComponents,
          launchOptions,
        ),
      ).toThrow(MissionCostCalculationError)

      try {
        calculateTotalMissionCostUsd(
          configurationWith(['component.invalid.v1']),
          invalidComponents,
          launchOptions,
        )
      } catch (error) {
        expect(error).toMatchObject({ code: 'invalid-component-cost', id: 'component.invalid.v1' })
      }
    },
  )

  it.each([Number.NaN, Number.POSITIVE_INFINITY, -1, undefined])(
    'throws an actionable structured error for invalid launch cost %s',
    (costUsd) => {
      const invalidLaunches = [{ ...launchOptions[0], costUsd: costUsd as number }]

      expect(() =>
        calculateTotalMissionCostUsd(baseConfiguration, costedComponents, invalidLaunches),
      ).toThrow(MissionCostCalculationError)

      try {
        calculateTotalMissionCostUsd(baseConfiguration, costedComponents, invalidLaunches)
      } catch (error) {
        expect(error).toMatchObject({
          code: 'invalid-launch-cost',
          id: 'launch.shared-rideshare.v1',
        })
      }
    },
  )

  it('adds launch cost exactly once and never uses launch payload mass as cost', () => {
    expect(calculateTotalMissionCostUsd(baseConfiguration, costedComponents, launchOptions)).toBe(
      launchOptions[0].costUsd,
    )
    expect(launchOptions[0].maxPayloadKg).not.toBe(launchOptions[0].costUsd)
  })

  it('rejects a non-finite total caused by arithmetic overflow', () => {
    const expensiveComponents = [{ id: 'component.expensive.v1', costUsd: Number.MAX_VALUE }]

    expect(() =>
      calculateTotalMissionCostUsd(
        configurationWith(['component.expensive.v1', 'component.expensive.v1']),
        expensiveComponents,
        launchOptions,
      ),
    ).toThrow(MissionCostCalculationError)

    try {
      calculateTotalMissionCostUsd(
        configurationWith(['component.expensive.v1', 'component.expensive.v1']),
        expensiveComponents,
        launchOptions,
      )
    } catch (error) {
      expect(error).toMatchObject({ code: 'non-finite-total-cost' })
    }
  })

  it('returns the same result without mutating any input', () => {
    const configuration = configurationWith(['component.camera.v1', 'component.battery.v1'])
    const configurationBefore = structuredClone(configuration)
    const componentsBefore = structuredClone(costedComponents)
    const launchesBefore = structuredClone(launchOptions)

    expect(calculateTotalMissionCostUsd(configuration, costedComponents, launchOptions)).toBe(9_800_900)
    expect(calculateTotalMissionCostUsd(configuration, costedComponents, launchOptions)).toBe(9_800_900)
    expect(configuration).toEqual(configurationBefore)
    expect(costedComponents).toEqual(componentsBefore)
    expect(launchOptions).toEqual(launchesBefore)
  })
})

describe('calculateTotalSpacecraftPowerDrawW', () => {
  it('returns zero for an empty component selection', () => {
    expect(calculateTotalSpacecraftPowerDrawW(baseConfiguration, powerComponents)).toBe(0)
  })

  it('returns the active draw of one selected consuming component', () => {
    expect(
      calculateTotalSpacecraftPowerDrawW(
        configurationWith(['instrument.camera.v1']),
        powerComponents,
      ),
    ).toBe(55)
  })

  it('sums the active draw of multiple selected consuming components', () => {
    expect(
      calculateTotalSpacecraftPowerDrawW(
        configurationWith(['instrument.camera.v1', 'communications.radio.v1']),
        powerComponents,
      ),
    ).toBe(80)
  })

  it('counts each repeated consuming component ID as another active load', () => {
    expect(
      calculateTotalSpacecraftPowerDrawW(
        configurationWith(['communications.radio.v1', 'communications.radio.v1']),
        powerComponents,
      ),
    ).toBe(50)
  })

  it('does not add solar panel generation to active power draw', () => {
    expect(
      calculateTotalSpacecraftPowerDrawW(
        configurationWith(['solar-panel.array.v1']),
        powerComponents,
      ),
    ).toBe(0)
  })

  it('does not add battery capacity to active power draw', () => {
    expect(
      calculateTotalSpacecraftPowerDrawW(
        configurationWith(['battery.small.v1']),
        powerComponents,
      ),
    ).toBe(0)
  })

  it('adds only active loads in a mixed selection', () => {
    expect(
      calculateTotalSpacecraftPowerDrawW(
        configurationWith([
          'instrument.camera.v1',
          'solar-panel.array.v1',
          'battery.small.v1',
          'communications.radio.v1',
        ]),
        powerComponents,
      ),
    ).toBe(80)
  })

  it('throws an actionable structured error for an unknown component ID', () => {
    expect(() =>
      calculateTotalSpacecraftPowerDrawW(
        configurationWith(['component.unknown.v1']),
        powerComponents,
      ),
    ).toThrow(SpacecraftPowerDrawCalculationError)

    try {
      calculateTotalSpacecraftPowerDrawW(
        configurationWith(['component.unknown.v1']),
        powerComponents,
      )
    } catch (error) {
      expect(error).toMatchObject({
        code: 'unknown-component-id',
        componentId: 'component.unknown.v1',
      })
    }
  })

  it.each([Number.NaN, Number.POSITIVE_INFINITY, -1])(
    'throws an actionable structured error for invalid consuming power %s',
    (powerConsumptionW) => {
      const invalidComponents: readonly PowerComponent[] = [
        {
          id: 'instrument.invalid.v1',
          name: 'Invalid Instrument',
          type: 'scientific-instrument',
          massKg: 1,
          powerConsumptionW,
        },
      ]

      expect(() =>
        calculateTotalSpacecraftPowerDrawW(
          configurationWith(['instrument.invalid.v1']),
          invalidComponents,
        ),
      ).toThrow(SpacecraftPowerDrawCalculationError)

      try {
        calculateTotalSpacecraftPowerDrawW(
          configurationWith(['instrument.invalid.v1']),
          invalidComponents,
        )
      } catch (error) {
        expect(error).toMatchObject({
          code: 'invalid-component-power-consumption',
          componentId: 'instrument.invalid.v1',
        })
      }
    },
  )

  it('rejects a power-consuming component with a missing active power field', () => {
    const invalidComponents: readonly PowerComponent[] = [
      {
        id: 'communications.invalid.v1',
        name: 'Invalid Radio',
        type: 'communications',
        massKg: 1,
      },
    ]

    expect(() =>
      calculateTotalSpacecraftPowerDrawW(
        configurationWith(['communications.invalid.v1']),
        invalidComponents,
      ),
    ).toThrow(SpacecraftPowerDrawCalculationError)

    try {
      calculateTotalSpacecraftPowerDrawW(
        configurationWith(['communications.invalid.v1']),
        invalidComponents,
      )
    } catch (error) {
      expect(error).toMatchObject({
        code: 'invalid-component-power-consumption',
        componentId: 'communications.invalid.v1',
      })
    }
  })

  it('rejects a non-finite total caused by arithmetic overflow', () => {
    const expensiveComponents: readonly PowerComponent[] = [
      {
        id: 'instrument.expensive.v1',
        name: 'Power-Hungry Instrument',
        type: 'scientific-instrument',
        massKg: 1,
        powerConsumptionW: Number.MAX_VALUE,
      },
    ]

    expect(() =>
      calculateTotalSpacecraftPowerDrawW(
        configurationWith(['instrument.expensive.v1', 'instrument.expensive.v1']),
        expensiveComponents,
      ),
    ).toThrow(SpacecraftPowerDrawCalculationError)

    try {
      calculateTotalSpacecraftPowerDrawW(
        configurationWith(['instrument.expensive.v1', 'instrument.expensive.v1']),
        expensiveComponents,
      )
    } catch (error) {
      expect(error).toMatchObject({ code: 'non-finite-total-power-draw' })
    }
  })

  it('returns the same result without mutating any input', () => {
    const configuration = configurationWith(['instrument.camera.v1', 'communications.radio.v1'])
    const configurationBefore = structuredClone(configuration)
    const componentsBefore = structuredClone(powerComponents)

    expect(calculateTotalSpacecraftPowerDrawW(configuration, powerComponents)).toBe(80)
    expect(calculateTotalSpacecraftPowerDrawW(configuration, powerComponents)).toBe(80)
    expect(configuration).toEqual(configurationBefore)
    expect(powerComponents).toEqual(componentsBefore)
  })
})
