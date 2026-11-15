import type { Battery } from '../domain/types'

/** Illustrative gameplay values, not verified spacecraft battery specifications. */
export const batteries = [
  {
    id: 'small-battery', name: 'Small Battery', type: 'battery',
    description: 'A lightweight, lower-cost battery with modest stored energy.',
    capacityWh: 250, massKg: 2, costUsd: 500,
  },
  {
    id: 'large-battery', name: 'Large Battery', type: 'battery',
    description: 'A higher-capacity battery that adds mass and cost for more stored energy.',
    capacityWh: 500, massKg: 5, costUsd: 900,
  },
] satisfies readonly Battery[]
