import type { LaunchOption } from '../domain/types'

export const launches: LaunchOption[] = [
  {
    id: 'launch.shared-rideshare.v1',
    name: 'Shared Rideshare',
    vehicleName: 'Shared Launch Vehicle',
    maxPayloadKg: 150,
    costUsd: 5_800_000,
  },
  {
    id: 'launch.dedicated-mission.v1',
    name: 'Dedicated Mission Launch',
    vehicleName: 'Dedicated Launch Vehicle',
    maxPayloadKg: 250,
    costUsd: 8_500_000,
  },
]