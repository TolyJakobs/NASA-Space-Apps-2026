import type { Component } from '../domain/types'

export const communications: Component[] = [
  {
    id: 'communications.compact-s-band.v1',
    name: 'Compact S-Band Communications',
    type: 'communications',
    massKg: 6,
    description: 'A compact communications system for standard mission data transmission.',
  },
  {
    id: 'communications.high-capacity-x-band.v1',
    name: 'High-Capacity X-Band Communications',
    type: 'communications',
    massKg: 14,
    description: 'A higher-capacity communications system for increased data transmission.',
  },
]