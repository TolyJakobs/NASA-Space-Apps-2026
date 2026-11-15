import { describe, expect, it } from 'vitest'
import { batteries } from '../data/batteries'
import { communications } from '../data/communications'
import { scientificInstruments } from '../data/instruments'
import { launches } from '../data/launches'
import { wildfireMonitoringMission } from '../data/missions'
import { orbits } from '../data/orbits'
import { solarPanels } from '../data/solarPanels'

function expectFiniteNonnegative(...values: number[]) {
  for (const value of values) {
    expect(Number.isFinite(value)).toBe(true)
    expect(value).toBeGreaterThanOrEqual(0)
  }
}

describe('M2 catalog integrity', () => {
  it('uses unique stable IDs across components, orbits, launches, and the mission', () => {
    const ids = [
      wildfireMonitoringMission.id,
      ...scientificInstruments.map((component) => component.id),
      ...solarPanels.map((component) => component.id),
      ...batteries.map((component) => component.id),
      ...communications.map((component) => component.id),
      ...orbits.map((orbit) => orbit.id),
      ...launches.map((launch) => launch.id),
    ]

    expect(new Set(ids).size).toBe(ids.length)
  })

  it('uses finite nonnegative numeric values with costUsd fields', () => {
    for (const instrument of scientificInstruments) {
      expectFiniteNonnegative(
        instrument.massKg,
        instrument.costUsd,
        instrument.powerConsumptionW,
        instrument.scienceDataMbPerDay,
      )
    }

    for (const panel of solarPanels) {
      expectFiniteNonnegative(panel.massKg, panel.costUsd, panel.powerGenerationW)
    }

    for (const battery of batteries) {
      expectFiniteNonnegative(battery.massKg, battery.costUsd, battery.capacityWh)
    }

    for (const communication of communications) {
      expectFiniteNonnegative(
        communication.massKg,
        communication.costUsd,
        communication.powerConsumptionW,
        communication.downlinkMbPerDay,
      )
    }

    for (const orbit of orbits) {
      expectFiniteNonnegative(
        orbit.altitudeKm,
        orbit.inclinationDeg,
        orbit.periodMinutes,
        orbit.sunlightFraction,
        orbit.contactModifier,
        orbit.scienceModifier,
      )
      expect(orbit.sunlightFraction).toBeLessThanOrEqual(1)
    }

    for (const launch of launches) {
      expectFiniteNonnegative(launch.maxPayloadKg, launch.costUsd)
      expect('cost' in launch).toBe(false)
    }
  })

  it('matches mission science tags to an instrument', () => {
    for (const scienceTag of wildfireMonitoringMission.scienceTags) {
      expect(
        scientificInstruments.some((instrument) => instrument.scienceTags.includes(scienceTag)),
      ).toBe(true)
    }
  })

  it('resolves every launch supported-orbit ID', () => {
    const orbitIds = new Set(orbits.map((orbit) => orbit.id))

    for (const launch of launches) {
      for (const orbitId of launch.supportedOrbitIds) {
        expect(orbitIds.has(orbitId)).toBe(true)
      }
    }
  })

  it('contains a statically plausible wildfire-monitoring configuration', () => {
    const selectedComponentIds = [
      'instrument.optical-earth-observation-camera.v1',
      'instrument.thermal-infrared-sensor.v1',
      'solar-panel.high-output-array.v1',
      'large-battery',
      'large-battery',
      'communications.high-capacity-x-band.v1',
    ]
    const selectedOrbitId = 'orbit.sun-synchronous-550km.v1'
    const selectedLaunchId = 'launch.shared-rideshare.v1'
    const components = [
      ...scientificInstruments,
      ...solarPanels,
      ...batteries,
      ...communications,
    ]
    const selectedComponents = selectedComponentIds.map((id) => {
      const component = components.find((candidate) => candidate.id === id)
      if (!component) throw new Error(`Unknown component ID: ${id}`)
      return component
    })
    const selectedLaunch = launches.find((launch) => launch.id === selectedLaunchId)
    if (!selectedLaunch) throw new Error(`Unknown launch ID: ${selectedLaunchId}`)

    const totalMassKg = selectedComponents.reduce((total, component) => total + component.massKg, 0)
    const totalCostUsd =
      selectedComponents.reduce((total, component) => total + component.costUsd, 0) +
      selectedLaunch.costUsd
    const scienceDataMbPerDay = scientificInstruments.reduce(
      (total, instrument) => total + instrument.scienceDataMbPerDay,
      0,
    )
    const downlinkMbPerDay = communications.find(
      (communication) => communication.id === 'communications.high-capacity-x-band.v1',
    )?.downlinkMbPerDay

    expect(totalMassKg).toBeLessThanOrEqual(selectedLaunch.maxPayloadKg)
    expect(totalCostUsd).toBeLessThanOrEqual(wildfireMonitoringMission.budgetUsd)
    expect(scienceDataMbPerDay).toBeGreaterThanOrEqual(
      wildfireMonitoringMission.targetScienceDataMbPerDay,
    )
    expect(downlinkMbPerDay).toBeGreaterThanOrEqual(scienceDataMbPerDay)
    expect(wildfireMonitoringMission.orbitIds).toContain(selectedOrbitId)
    expect(selectedLaunch.supportedOrbitIds).toContain(selectedOrbitId)
  })
})
