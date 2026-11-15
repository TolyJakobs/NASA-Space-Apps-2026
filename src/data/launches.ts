import type { LaunchOption } from '../domain/types'

/** Illustrative gameplay values, not launch-provider prices or capabilities. */
export const launches = [
  {
    id: 'launch.shared-rideshare.v1', name: 'Shared Rideshare', vehicleName: 'Illustrative Small Launch Vehicle',
    description: 'A lower-cost launch option with enough capacity for the wildfire reference design.',
    maxPayloadKg: 150, costUsd: 5_800_000,
    supportedOrbitIds: ['orbit.low-earth-orbit.v1', 'orbit.sun-synchronous-550km.v1'],
  },
  {
    id: 'launch.dedicated-mission.v1', name: 'Dedicated Mission', vehicleName: 'Illustrative Dedicated Launch Vehicle',
    description: 'A higher-capacity, higher-cost option that supports every MVP orbit.',
    maxPayloadKg: 250, costUsd: 8_500_000,
    supportedOrbitIds: ['orbit.low-earth-orbit.v1', 'orbit.sun-synchronous-550km.v1', 'orbit.high-coverage-meo.v1'],
  },
] satisfies readonly LaunchOption[]
