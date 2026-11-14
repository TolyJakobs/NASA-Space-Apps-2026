# Scientific Instrument Catalog Specification

**Issue:** #13 (`M2-02`)  
**Status:** Implemented in `src/data/instruments.ts`

**Scope:** Two static scientific instrument choices for the single-player wildfire-monitoring mission. This document defines gameplay content only; it does not create a TypeScript contract, catalog implementation, UI, or simulation logic.

## Gameplay assumptions

Every value in this catalog is an illustrative gameplay assumption for the hackathon MVP. It is **not** a verified spacecraft-hardware specification, scientific detection claim, performance guarantee, procurement quote, or NASA data product. Units follow [DATA_CONVENTIONS.md](DATA_CONVENTIONS.md): kg, W, USD, and MB/day.

The two instruments are designed to be selected together in the reference mission: their combined **240 MB/day** of wildfire-monitoring data exceeds the mission's 200 MB/day science target in [WILDFIRE_MONITORING_MISSION.md](WILDFIRE_MONITORING_MISSION.md). Their combined USD 12,000,000 cost leaves room within the USD 25,000,000 mission budget for the spacecraft bus and launch. These relationships are intended only as simple, deterministic game balance.

## Illustrative catalog entries

| Stable ID | Instrument | Description | Mass (kg) | Active power (W) | Cost (USD) | Science data (MB/day) | Science tags |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- |
| `instrument.optical-earth-observation-camera.v1` | Optical Earth Observation Camera | A visible-light camera that gives the player broad daytime imagery for spotting smoke and burned-area changes. | 18 | 55 | 4,000,000 | 80 | `wildfire-monitoring` |
| `instrument.thermal-infrared-sensor.v1` | Thermal Infrared Wildfire Sensor | A higher-power thermal sensor that gives the player stronger heat-focused wildfire observations, including where visible smoke may be less informative. | 34 | 140 | 8,000,000 | 160 | `wildfire-monitoring` |

Both entries use unique, stable IDs and finite nonnegative numeric values. The thermal sensor deliberately returns more data at greater mass, active-power demand, and cost, creating a clear trade-off for beginners.

## Implemented contract

`src/domain/types.ts` defines `ScientificInstrument`, a specialized `Component` with the exact fields used by this catalog:

- `costUsd` is component cost in USD.
- `powerConsumptionW` is active power consumed in W; it is not generated power.
- `scienceDataMbPerDay` is daily scientific data generation in MB/day.
- `scienceTags` includes `wildfire-monitoring` for both instruments.

`scientificInstruments` is a readonly catalog that uses `satisfies readonly ScientificInstrument[]` for compile-time conformance. It imports only the domain type and contains no React/UI state or calculations.

## MVP boundaries

The MVP catalog contains only these two instruments. It does not model operating schedules, cloud cover, imaging resolution, thermal sensitivity, data compression, instrument failures, or real fire detection. Power, mass, data, and cost validation belong to the future engine implementation.
