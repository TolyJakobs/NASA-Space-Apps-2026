import { describe, expect, it } from 'vitest'
import { launches } from '../data/launches'
import type { Component, MissionConfiguration } from '../domain/types'
import {
  ComponentMassCalculationError,
  calculateTotalSpacecraftMassKg,
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
