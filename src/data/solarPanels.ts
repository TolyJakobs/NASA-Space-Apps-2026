import type { SolarPanel } from '../domain/types'

/**
 * Illustrative gameplay values. Power ratings are nominal generation in W,
 * not battery energy storage in Wh or average orbital power availability.
 */
export const solarPanels = [
  {
    id: 'solar-panel.compact-array.v1',
    name: 'Compact Solar Array',
    type: 'solar-panel',
    description:
      'A lighter, lower-cost panel option that generates enough nominal power for a modest spacecraft design.',
    massKg: 12,
    costUsd: 1_200_000,
    powerGenerationW: 120,
  },
  {
    id: 'solar-panel.high-output-array.v1',
    name: 'High-Output Solar Array',
    type: 'solar-panel',
    description:
      'A heavier, more expensive panel option that provides substantially more nominal generation margin for power-hungry instruments.',
    massKg: 24,
    costUsd: 2_800_000,
    powerGenerationW: 300,
  },
] satisfies readonly SolarPanel[]
