import type { CommunicationEquipment } from '../domain/types'

/** Illustrative gameplay values, not verified communications-link specifications. */
export const communications = [
  {
    id: 'communications.compact-s-band.v1', name: 'Compact S-Band Transceiver', type: 'communications',
    description: 'A lighter, lower-power option for modest daily data returns.',
    massKg: 6, costUsd: 800_000, powerConsumptionW: 25, downlinkMbPerDay: 150,
  },
  {
    id: 'communications.high-capacity-x-band.v1', name: 'High-Capacity X-Band Transceiver', type: 'communications',
    description: 'A larger, higher-power option that can return the wildfire mission data target.',
    massKg: 14, costUsd: 2_000_000, powerConsumptionW: 70, downlinkMbPerDay: 400,
  },
] satisfies readonly CommunicationEquipment[]
