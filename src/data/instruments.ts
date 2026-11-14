import type { ScientificInstrument } from '../domain/types'

/**
 * Illustrative gameplay values, not verified spacecraft hardware specifications.
 */
export const scientificInstruments = [
  {
    id: 'instrument.optical-earth-observation-camera.v1',
    name: 'Optical Earth Observation Camera',
    type: 'scientific-instrument',
    description:
      'A visible-light camera that gives the player broad daytime imagery for spotting smoke and burned-area changes.',
    massKg: 18,
    costUsd: 4_000_000,
    powerConsumptionW: 55,
    scienceDataMbPerDay: 80,
    scienceTags: ['wildfire-monitoring'],
  },
  {
    id: 'instrument.thermal-infrared-sensor.v1',
    name: 'Thermal Infrared Wildfire Sensor',
    type: 'scientific-instrument',
    description:
      'A higher-power thermal sensor that gives the player stronger heat-focused wildfire observations, including where visible smoke may be less informative.',
    massKg: 34,
    costUsd: 8_000_000,
    powerConsumptionW: 140,
    scienceDataMbPerDay: 160,
    scienceTags: ['wildfire-monitoring'],
  },
] satisfies readonly ScientificInstrument[]
