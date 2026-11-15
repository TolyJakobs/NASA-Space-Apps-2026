import type { MissionDefinition } from '../domain/types'

/** Illustrative gameplay values, not verified NASA mission requirements. */
export const wildfireMonitoringMission = {
  id: 'mission.wildfire-monitoring.v1', name: 'Wildfire Monitoring',
  description: 'Design an Earth-observation satellite that returns useful wildfire-monitoring data within the mission budget.',
  scienceTags: ['wildfire-monitoring'], budgetUsd: 25_000_000, targetScienceDataMbPerDay: 200,
  componentIds: [
    'instrument.optical-earth-observation-camera.v1', 'instrument.thermal-infrared-sensor.v1',
    'solar-panel.compact-array.v1', 'solar-panel.high-output-array.v1', 'small-battery', 'large-battery',
    'communications.compact-s-band.v1', 'communications.high-capacity-x-band.v1',
  ],
  orbitIds: ['orbit.sun-synchronous-550km.v1'],
  launchOptionIds: ['launch.shared-rideshare.v1', 'launch.dedicated-mission.v1'],
} satisfies MissionDefinition
