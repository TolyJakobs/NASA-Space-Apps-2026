# Sources and Assumptions

## Purpose

This record distinguishes NASA-supported concepts from illustrative values used by the single-player wildfire-monitoring MVP. Unless a row explicitly says otherwise, numeric values are game-balance assumptions, not NASA specifications, launch offers, or mission requirements.

## NASA-supported concepts

| Concept | Source | What the source supports |
| --- | --- | --- |
| Earth-satellite orbit concepts | [NASA: Catalog of Earth Satellite Orbits](https://science.nasa.gov/earth/earth-observatory/catalog-of-earth-satellite-orbits/) (older reference, approximately 2009) | Altitude and orbit type affect orbital characteristics; it does not validate this game's numeric entries. |
| Solar generation and battery storage | [NASA Space Place: What Powers a Spacecraft?](https://spaceplace.nasa.gov/what-powers-a-spacecraft/en/) | Solar panels generate electricity and batteries store energy for use without sunlight. |
| Approximate low-Earth-orbit period | [NASA JSC: Space Station Orbit Tutorial](https://eol.jsc.nasa.gov/Tools/orbitTutorial.htm) | The ISS completes an orbit in roughly 90–93 minutes; it does not validate other game periods or modifiers. |

## M2 gameplay inventory

| Group | Values or rule | Classification and limitation |
| --- | --- | --- |
| Wildfire mission | `wildfire-monitoring`; USD 25,000,000 budget; 200 MB/day target; 150 kg reference limit | Illustrative mission balance. The game does not detect, predict, or certify real fires. |
| Instruments | Optical camera: 18 kg, 55 W, USD 4M, 80 MB/day; thermal sensor: 34 kg, 140 W, USD 8M, 160 MB/day | Illustrative payload trade-offs. Earth-observation instruments are a NASA-supported concept; these specifications are not NASA-verified. |
| Solar panels | Compact: 12 kg, 120 W, USD 1.2M; high-output: 24 kg, 300 W, USD 2.8M | Illustrative nominal generation values. W is power, not battery energy in Wh or average orbital availability. |
| Batteries | Small: 250 Wh, 2 kg, USD 500; large: 500 Wh, 5 kg, USD 900 | Illustrative storage trade-offs. Wh is stored energy, not a power draw or generation rate. |
| Communications | Compact: 150 MB/day, 6 kg, 25 W, USD 0.8M; high-capacity: 400 MB/day, 14 kg, 70 W, USD 2M | Illustrative simplified downlink capacities. No ground-station pass or radio-link calculation is modeled. |
| Orbits | LEO: 400 km/51.6°/92 min; sun-synchronous-style: 550 km/97.6°/96 min; high-coverage MEO: 8,000 km/45°/288 min | Altitude/inclination/period are illustrative. Sunlight fraction and contact/science modifiers are simplified gameplay values, not orbital predictions. |
| Launches | Shared: 150 kg/USD 5.8M; dedicated: 250 kg/USD 8.5M | Entirely illustrative gameplay launch choices. Supported-orbit lists are game compatibility rules, not launch-provider capabilities. |

## Simplified model rules

- Mass uses kg; power uses W; stored energy uses Wh; data generation/downlink uses MB/day; costs use USD.
- Sunlight fraction is a modeled fraction between 0 and 1. Contact and science modifiers are dimensionless gameplay multipliers; values above or below 1 indicate a relative bonus or penalty.
- Repeated selected component IDs represent multiple copies, as defined by the M1 data convention.
- The M2 catalogs are static data only. Orbital mechanics, panel duty cycles, battery charging, communications passes, validation, and scoring are deferred to later milestones.

## Accuracy rules

- Do not describe any illustrative value as NASA-certified or as a real vendor quotation.
- Do not use a general NASA concept source to imply that an invented price, mass, rate, or modifier is NASA-supported.
- Update this record when an M2 value changes or a specific reliable source is adopted.
