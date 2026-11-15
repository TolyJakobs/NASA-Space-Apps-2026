
import type { OrbitOption } from '../domain/types'

/** All values are illustrative gameplay assumptions, not precise orbital predictions. */
export const orbits = [
  {
    id: 'orbit.low-earth-orbit.v1',
    name: 'Low Earth Orbit (LEO)',
    altitudeKm: 400,
    inclinationDeg: 51.6,
    periodMinutes: 92,
    sunlightFraction: 0.6,
    contactModifier: 1.2,
    scienceModifier: 1.0,
    description:
      'A lower-altitude option with frequent modeled contact opportunities, but not the wildfire mission orbit.',
  },
  {
    id: 'orbit.sun-synchronous-550km.v1',
    name: '550 km Sun-Synchronous-Style Orbit',
    altitudeKm: 550,
    inclinationDeg: 97.6,
    periodMinutes: 96,
    sunlightFraction: 0.62,
    contactModifier: 1.0,
    scienceModifier: 1.15,
    description:
      'A simplified near-polar Earth-observation option that matches the wildfire mission altitude and inclination envelope.',
  },
  {
    id: 'orbit.high-coverage-meo.v1',
    name: 'High-Coverage Medium Earth Orbit',
    altitudeKm: 8_000,
    inclinationDeg: 30,
    periodMinutes: 760,
    sunlightFraction: 0.7,
    contactModifier: 0.7,
    scienceModifier: 0.7,
    description:
      'A higher-altitude gameplay option with broader modeled coverage but weaker contact and science modifiers.',
  },
] satisfies readonly OrbitOption[]
