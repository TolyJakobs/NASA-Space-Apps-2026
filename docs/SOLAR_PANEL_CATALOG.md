# Solar Panel Catalog Specification

**Issue:** #14 (`M2-03`)  
**Status:** Catalog specification pending completion of M1-03 shared domain interfaces  
**Scope:** Two static power-generation choices for the single-player wildfire-monitoring mission. This document does not create a TypeScript contract, catalog implementation, UI, or energy calculation.

## Gameplay assumptions

All values below are illustrative gameplay assumptions for the two-day MVP, not verified spacecraft hardware specifications, procurement quotes, or NASA requirements. Units follow [DATA_CONVENTIONS.md](DATA_CONVENTIONS.md): mass in kg, nominal generated power in W, and cost in USD.

Nominal panel generation is a power rate in **W**. It is deliberately not battery storage in **Wh**, and this catalog does not convert it to daily energy: the engine must combine power with an agreed operating duration before calculating energy.

## Illustrative catalog entries

| Stable ID | Solar panel | Description | Mass (kg) | Nominal generated power (W) | Cost (USD) |
| --- | --- | --- | ---: | ---: | ---: |
| `solar-panel.compact-array.v1` | Compact Solar Array | A lighter, lower-cost panel option that generates enough nominal power for a modest spacecraft design. | 12 | 120 | 1,200,000 |
| `solar-panel.high-output-array.v1` | High-Output Solar Array | A heavier, more expensive panel option that provides substantially more nominal generation margin for power-hungry instruments. | 24 | 300 | 2,800,000 |

Both IDs are unique and stable. Every numeric value is finite and nonnegative. The high-output array creates a clear gameplay trade-off: it adds 12 kg and USD 1,600,000 while increasing nominal generation by 180 W.

The high-output array's 300 W rating is compatible with the wildfire mission's illustrative 330 W available-power reference only when the future power model accounts for its other agreed generation sources or revises the reference design. This catalog does not claim that the panel alone satisfies that total; it intentionally leaves the engineering calculation to the engine.

## Intended integration after M1-03

The current `Component` interface in `src/domain/types.ts` has no agreed fields for nominal generated power or cost. It is therefore incomplete for this catalog, even though it supports the shared ID, name, type, mass, and description concepts.

Once M1-03's owner finalizes the contract, implement `src/data/solarPanels.ts` using the exact `Component` field names to represent:

- Stable ID, human-readable name, appropriate agreed component category, description, and mass in kg.
- Nominal generated power in W and cost in USD.

The data module must import the finalized domain type only, follow the established catalog export pattern, and contain no React state, battery capacity in Wh, or energy calculation logic. Do not add a parallel interface, `any`, or unagreed fields to force an early typed implementation.

## MVP boundaries

This catalog intentionally contains two choices only. It does not model illumination time, panel degradation, pointing, eclipse duration, efficiency, battery storage, or power consumption. Those are future engine responsibilities.
