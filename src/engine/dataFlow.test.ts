import { describe, expect, it } from 'vitest'
import type { Component, MissionConfiguration, OrbitOption } from '../domain/types'
import {
  DataFlowCalculationError,
  calculateScienceDataFlow,
} from './dataFlow'

type DataFlowComponent = Component & {
  scienceDataMbPerDay?: number
  downlinkMbPerDay?: number
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
  contactModifier: 0.8,
  scienceModifier: 1,
  description: 'Test orbit.',
}

const components: readonly DataFlowComponent[] = [
  {
    id: 'instrument.primary.v1',
    name: 'Primary Instrument',
    type: 'scientific-instrument',
    massKg: 10,
    scienceDataMbPerDay: 100,
  },
  {
    id: 'instrument.secondary.v1',
    name: 'Secondary Instrument',
    type: 'scientific-instrument',
    massKg: 10,
    scienceDataMbPerDay: 200,
  },
  {
    id: 'communications.primary.v1',
    name: 'Primary Radio',
    type: 'communications',
    massKg: 6,
    downlinkMbPerDay: 250,
  },
  {
    id: 'communications.secondary.v1',
    name: 'Secondary Radio',
    type: 'communications',
    massKg: 6,
    downlinkMbPerDay: 50,
  },
  { id: 'solar-panel.test.v1', name: 'Solar Panel', type: 'solar-panel', massKg: 12 },
  { id: 'battery.test.v1', name: 'Battery', type: 'battery', massKg: 2 },
]

function configurationWith(selectedComponentIds: string[]): MissionConfiguration {
  return { ...baseConfiguration, selectedComponentIds }
}

describe('calculateScienceDataFlow', () => {
  it('limits 300 MB/day generated science to 200 MB/day effective downlink', () => {
    expect(
      calculateScienceDataFlow(
        configurationWith([
          'instrument.primary.v1',
          'instrument.secondary.v1',
          'communications.primary.v1',
        ]),
        components,
        [orbit],
      ),
    ).toEqual({
      generatedScienceDataMbPerDay: 300,
      rawDownlinkMbPerDay: 250,
      effectiveDownlinkMbPerDay: 200,
      deliveredScienceDataMbPerDay: 200,
    })
  })

  it('limits delivered data to generated science when downlink is larger', () => {
    const highCapacityComponents: readonly DataFlowComponent[] = [
      components[0],
      { ...components[2], downlinkMbPerDay: 625 },
    ]

    expect(
      calculateScienceDataFlow(
        configurationWith(['instrument.primary.v1', 'communications.primary.v1']),
        highCapacityComponents,
        [orbit],
      ),
    ).toMatchObject({
      generatedScienceDataMbPerDay: 100,
      effectiveDownlinkMbPerDay: 500,
      deliveredScienceDataMbPerDay: 100,
    })
  })

  it('applies the contact modifier once to aggregate raw downlink', () => {
    expect(
      calculateScienceDataFlow(
        configurationWith(['communications.primary.v1']),
        components,
        [orbit],
      ),
    ).toMatchObject({ rawDownlinkMbPerDay: 250, effectiveDownlinkMbPerDay: 200 })
  })

  it('aggregates multiple instrument and communication components', () => {
    expect(
      calculateScienceDataFlow(
        configurationWith([
          'instrument.primary.v1',
          'instrument.secondary.v1',
          'communications.primary.v1',
          'communications.secondary.v1',
        ]),
        components,
        [orbit],
      ),
    ).toEqual({
      generatedScienceDataMbPerDay: 300,
      rawDownlinkMbPerDay: 300,
      effectiveDownlinkMbPerDay: 240,
      deliveredScienceDataMbPerDay: 240,
    })
  })

  it('counts repeated selected components as separate sources and links', () => {
    expect(
      calculateScienceDataFlow(
        configurationWith([
          'instrument.primary.v1',
          'instrument.primary.v1',
          'communications.primary.v1',
          'communications.primary.v1',
        ]),
        components,
        [orbit],
      ),
    ).toEqual({
      generatedScienceDataMbPerDay: 200,
      rawDownlinkMbPerDay: 500,
      effectiveDownlinkMbPerDay: 400,
      deliveredScienceDataMbPerDay: 200,
    })
  })

  it('returns zero generated and delivered data with no instruments', () => {
    expect(
      calculateScienceDataFlow(configurationWith(['communications.primary.v1']), components, [orbit]),
    ).toMatchObject({ generatedScienceDataMbPerDay: 0, deliveredScienceDataMbPerDay: 0 })
  })

  it('returns zero effective downlink and delivered data with no communications equipment', () => {
    expect(
      calculateScienceDataFlow(configurationWith(['instrument.primary.v1']), components, [orbit]),
    ).toMatchObject({ effectiveDownlinkMbPerDay: 0, deliveredScienceDataMbPerDay: 0 })
  })

  it('returns zeroes when no components are selected', () => {
    expect(calculateScienceDataFlow(baseConfiguration, components, [orbit])).toEqual({
      generatedScienceDataMbPerDay: 0,
      rawDownlinkMbPerDay: 0,
      effectiveDownlinkMbPerDay: 0,
      deliveredScienceDataMbPerDay: 0,
    })
  })

  it('ignores solar panels and batteries for data throughput', () => {
    expect(
      calculateScienceDataFlow(
        configurationWith(['solar-panel.test.v1', 'battery.test.v1']),
        components,
        [orbit],
      ),
    ).toEqual({
      generatedScienceDataMbPerDay: 0,
      rawDownlinkMbPerDay: 0,
      effectiveDownlinkMbPerDay: 0,
      deliveredScienceDataMbPerDay: 0,
    })
  })

  it('throws an actionable structured error for an unknown component ID', () => {
    expect(() =>
      calculateScienceDataFlow(configurationWith(['component.unknown.v1']), components, [orbit]),
    ).toThrow(DataFlowCalculationError)

    try {
      calculateScienceDataFlow(configurationWith(['component.unknown.v1']), components, [orbit])
    } catch (error) {
      expect(error).toMatchObject({
        code: 'unknown-component-id',
        componentId: 'component.unknown.v1',
      })
    }
  })

  it('throws an actionable structured error for an unknown orbit ID', () => {
    const configuration = { ...baseConfiguration, selectedOrbitId: 'orbit.unknown.v1' }

    expect(() => calculateScienceDataFlow(configuration, components, [orbit])).toThrow(
      DataFlowCalculationError,
    )

    try {
      calculateScienceDataFlow(configuration, components, [orbit])
    } catch (error) {
      expect(error).toMatchObject({ code: 'unknown-orbit-id', orbitId: 'orbit.unknown.v1' })
    }
  })

  it.each([Number.NaN, Number.POSITIVE_INFINITY, -1, undefined])(
    'rejects invalid scientific data value %s',
    (scienceDataMbPerDay) => {
      const invalidComponents: readonly DataFlowComponent[] = [
        {
          id: 'instrument.invalid.v1',
          name: 'Invalid Instrument',
          type: 'scientific-instrument',
          massKg: 1,
          scienceDataMbPerDay,
        },
      ]

      expect(() =>
        calculateScienceDataFlow(
          configurationWith(['instrument.invalid.v1']),
          invalidComponents,
          [orbit],
        ),
      ).toThrow(DataFlowCalculationError)
    },
  )

  it.each([Number.NaN, Number.POSITIVE_INFINITY, -1, undefined])(
    'rejects invalid downlink data value %s',
    (downlinkMbPerDay) => {
      const invalidComponents: readonly DataFlowComponent[] = [
        {
          id: 'communications.invalid.v1',
          name: 'Invalid Radio',
          type: 'communications',
          massKg: 1,
          downlinkMbPerDay,
        },
      ]

      expect(() =>
        calculateScienceDataFlow(
          configurationWith(['communications.invalid.v1']),
          invalidComponents,
          [orbit],
        ),
      ).toThrow(DataFlowCalculationError)
    },
  )

  it.each([-1, Number.NaN, Number.POSITIVE_INFINITY])(
    'rejects invalid contact modifier %s',
    (contactModifier) => {
      expect(() =>
        calculateScienceDataFlow(baseConfiguration, components, [{ ...orbit, contactModifier }]),
      ).toThrow(DataFlowCalculationError)
    },
  )

  it('handles a zero contact modifier', () => {
    expect(
      calculateScienceDataFlow(
        configurationWith(['instrument.primary.v1', 'communications.primary.v1']),
        components,
        [{ ...orbit, contactModifier: 0 }],
      ),
    ).toMatchObject({ effectiveDownlinkMbPerDay: 0, deliveredScienceDataMbPerDay: 0 })
  })

  it('accepts a contact modifier above one', () => {
    expect(
      calculateScienceDataFlow(
        configurationWith(['communications.primary.v1']),
        components,
        [{ ...orbit, contactModifier: 1.2 }],
      ),
    ).toMatchObject({ rawDownlinkMbPerDay: 250, effectiveDownlinkMbPerDay: 300 })
  })

  it('rejects arithmetic overflow', () => {
    const overflowingComponents: readonly DataFlowComponent[] = [
      {
        id: 'instrument.overflow.v1',
        name: 'Overflow Instrument',
        type: 'scientific-instrument',
        massKg: 1,
        scienceDataMbPerDay: Number.MAX_VALUE,
      },
    ]

    expect(() =>
      calculateScienceDataFlow(
        configurationWith(['instrument.overflow.v1', 'instrument.overflow.v1']),
        overflowingComponents,
        [orbit],
      ),
    ).toThrow(DataFlowCalculationError)
  })

  it('returns deterministic results without mutating inputs', () => {
    const configuration = configurationWith(['instrument.primary.v1', 'communications.primary.v1'])
    const configurationBefore = structuredClone(configuration)
    const componentsBefore = structuredClone(components)
    const orbits = [orbit]
    const orbitsBefore = structuredClone(orbits)

    expect(calculateScienceDataFlow(configuration, components, orbits)).toEqual(
      calculateScienceDataFlow(configuration, components, orbits),
    )
    expect(configuration).toEqual(configurationBefore)
    expect(components).toEqual(componentsBefore)
    expect(orbits).toEqual(orbitsBefore)
  })
})
