import type { MissionConfiguration } from '../domain/types'

import { wildfireMonitoringMission } from '../data/missions'
import { scientificInstruments } from '../data/instruments'
import { solarPanels } from '../data/solarPanels'
import { batteries } from '../data/batteries'
import { communications } from '../data/communications'
import { orbits } from '../data/orbits'
import { launches } from '../data/launches'

/**
 * Default single-player configuration for the wildfire-monitoring mission.
 */
export const DEFAULT_MISSION_CONFIGURATION: Readonly<MissionConfiguration> = {
  missionId: wildfireMonitoringMission.id,
  selectedComponentIds: [
    'instrument.optical-earth-observation-camera.v1',
    'instrument.thermal-infrared-sensor.v1',
    'solar-panel.high-output-array.v1',
    'large-battery',
    'communications.high-capacity-x-band.v1',
  ],
  selectedOrbitId: 'low-earth-orbit',
  selectedLaunchOptionId: 'launch.shared-rideshare.v1',
}

/**
 * Returns a fresh copy of the default configuration.
 */
export function createDefaultMissionConfiguration(): MissionConfiguration {
  return {
    ...DEFAULT_MISSION_CONFIGURATION,
    selectedComponentIds: [
      ...DEFAULT_MISSION_CONFIGURATION.selectedComponentIds,
    ],
  }
}

/**
 * Checks whether an unknown saved value is a valid mission configuration.
 */
export function isMissionConfigurationValid(
  value: unknown,
): value is MissionConfiguration {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }

  const configuration = value as Partial<MissionConfiguration>

  if (
    typeof configuration.missionId !== 'string' ||
    typeof configuration.selectedOrbitId !== 'string' ||
    typeof configuration.selectedLaunchOptionId !== 'string' ||
    !Array.isArray(configuration.selectedComponentIds)
  ) {
    return false
  }

  const selectedComponentIds: unknown[] = Array.from(
    configuration.selectedComponentIds,
  )

  if (!selectedComponentIds.every((id) => typeof id === 'string')) {
    return false
  }

  const mission = wildfireMonitoringMission

  if (configuration.missionId !== mission.id) return false

  if (!mission.orbitIds.includes(configuration.selectedOrbitId)) {
    return false
  }

  if (!mission.launchOptionIds.includes(configuration.selectedLaunchOptionId)) {
    return false
  }

  const orbitExists = orbits.some(
    (orbit) => orbit.id === configuration.selectedOrbitId,
  )

  if (!orbitExists) return false

  const launchExists = launches.some(
    (launch) => launch.id === configuration.selectedLaunchOptionId,
  )

  if (!launchExists) return false

  const availableComponentIds = new Set([
    ...scientificInstruments.map((component) => component.id),
    ...solarPanels.map((component) => component.id),
    ...batteries.map((component) => component.id),
    ...communications.map((component) => component.id),
  ])

  return selectedComponentIds.every(
    (id) =>
      mission.componentIds.includes(id as string) &&
      availableComponentIds.has(id as string),
  )
}

/**
 * Initializes a configuration from saved data.
 * Invalid or missing saved data falls back to the default.
 */
export function initializeMissionConfiguration(
  savedConfiguration?: unknown,
): MissionConfiguration {
  if (isMissionConfigurationValid(savedConfiguration)) {
    return {
      ...savedConfiguration,
      selectedComponentIds: [...savedConfiguration.selectedComponentIds],
    }
  }

  return createDefaultMissionConfiguration()
}