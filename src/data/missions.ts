import type { MissionDefinition } from '../domain/types'

export const wildfireMonitoringMission: MissionDefinition = {
  id: 'mission.wildfire-monitoring.v1',
  name: 'Wildfire Monitoring',
  description:
    'An Earth-observation mission designed to monitor wildfires using optical and thermal imaging.',
  componentIds: [
    'instrument.optical-earth-observation-camera.v1',
    'instrument.thermal-infrared-sensor.v1',
    'solar-panel.compact-array.v1',
    'solar-panel.high-output-array.v1',
    'small-battery',
    'large-battery',
    'communications.compact-s-band.v1',
    'communications.high-capacity-x-band.v1',
  ],
  orbitIds: [
    'low-earth-orbit',
    'mid-earth-orbit',
    'high-earth-orbit',
  ],
  launchOptionIds: [
    'launch.shared-rideshare.v1',
    'launch.dedicated-mission.v1',
  ],
}