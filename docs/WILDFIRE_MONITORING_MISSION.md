# Wildfire Monitoring Mission Specification

**Issue:** #12 (`M2-01`)  
**Status:** Gameplay specification for the single-player MVP  
**Scope:** One deterministic Earth-observation satellite mission; no shared interfaces or simulation code are defined here.

## Mission scenario and player objective

Wildfires can change quickly, so emergency teams need timely observations of areas that may be actively burning. The player designs a small Earth-observation satellite that collects wildfire-relevant imagery and returns it to the ground.

**Player objective:** Build and launch a satellite that returns at least **200 MB/day** of wildfire-monitoring science data while staying within its engineering limits and mission budget.

The mission's science tag is **`wildfire-monitoring`**. Instruments and payloads with this tag count toward the mission's science-data target. The MVP does not claim to detect, predict, or certify real fires; it models a simplified design trade-off game.

## Gameplay assumptions

All values below are deliberately small, coherent gameplay assumptions for a two-day hackathon MVP. They are **not verified NASA specifications**, launch-service offers, spacecraft requirements, or scientific performance claims. Values use the units in [DATA_CONVENTIONS.md](DATA_CONVENTIONS.md).

The simulation is deterministic: the same selected components and orbit values always produce the same validation result and score. It does not model weather, cloud cover, orbital mechanics, image quality, real ground-station passes, or changing fires.

## Hard constraints

A design succeeds only when every condition below is met.

| Area | Hard constraint | Why it matters in the game |
| --- | --- | --- |
| Science return | Generate **at least 200 MB/day** of `wildfire-monitoring` data. | The spacecraft must produce useful mission data. |
| Downlink | Daily downlink capacity is **at least the generated mission data**. | Data that cannot reach the ground does not complete the mission. |
| Mass | Total spacecraft mass is **at most 150 kg**. | Keeps the design within the selected small-satellite launch allocation. |
| Power | Average available spacecraft power is **at least average required power**. | Prevents an underpowered design. |
| Battery | Battery capacity is **at least the eclipse energy requirement**. | Ensures the spacecraft can operate while not generating solar power. |
| Budget | Total mission cost is **at most USD 25,000,000**. | Establishes a fixed, understandable spending limit. |
| Orbit | Orbit altitude is **500–650 km** and inclination is **97–98 degrees**. | Represents the MVP's simplified sun-synchronous Earth-observation orbit envelope. |
| Launch compatibility | The selected launch option supports the mission's orbit envelope and has a mass allowance of **at least 150 kg**. | Prevents an otherwise valid spacecraft from being assigned an incompatible launch. |

For the MVP, a selected orbit is launch-compatible only when it passes both the displayed orbit envelope and the selected launch option's supported-envelope checks. Component-level calculations remain the responsibility of the future engine; this document does not prescribe their APIs.

## Scoring goals

These goals affect the score only after all hard constraints pass. Missing a scoring goal must never cause a mission failure.

| Goal | Direction | Simple deterministic score signal |
| --- | --- | --- |
| Extra science data | More is better | MB/day above 200. |
| Data delivery margin | More is better | Daily downlink capacity minus generated data. |
| Budget efficiency | Lower is better | USD 25,000,000 minus total cost. |
| Mass margin | More is better | 150 kg minus total mass. |
| Power margin | More is better | Available average power minus required average power. |
| Battery margin | More is better | Battery capacity minus eclipse energy requirement. |

A small MVP may show these as individual score contributions or as a single total score. It should always display the underlying margins so a beginner can see why one design scores better.

## Illustrative feasible reference design

This reference is a balance target for future catalog authors, not a real spacecraft design. It demonstrates a configuration that passes every gameplay constraint and avoids an unwinnable first mission.

| Measure | Illustrative value | Passes because |
| --- | ---: | --- |
| Science tag | `wildfire-monitoring` | Matches the mission. |
| Science data generated | 240 MB/day | At least 200 MB/day. |
| Downlink capacity | 300 MB/day | Covers 240 MB/day of data. |
| Total mass | 132 kg | At most 150 kg. |
| Average power available / required | 330 W / 260 W | 70 W positive margin. |
| Battery capacity / eclipse requirement | 900 Wh / 650 Wh | 250 Wh positive margin. |
| Total cost | USD 22,400,000 | At most USD 25,000,000. |
| Orbit | 550 km, 97.6 degrees | Within the specified envelope. |
| Launch allocation | 150 kg; supports 500–650 km and 97–98 degrees | Meets the simplified compatibility rule. |

## Success and failure conditions

**Success:** The player launches a configuration that meets every hard constraint. The result screen states that the satellite returns its required wildfire-monitoring data and shows the scoring margins.

**Failure:** The player attempts to evaluate or launch a configuration with one or more hard-constraint failures. The result must list every failed rule in beginner-friendly language, for example: “Data downlink is 40 MB/day short” or “Total mass exceeds the 150 kg limit by 8 kg.” A failure is not random and does not end the game permanently; the player can adjust the design and retry.

## Future `MissionDefinition` integration boundary

M1-03 owns the shared domain contract. Until it is merged and agreed, this specification is intentionally **not** a TypeScript interface and does not establish field names.

When integrating this mission into the agreed `MissionDefinition`, it will need equivalent concepts for these mission inputs:

- Stable mission ID, display name, description, and science tag (`wildfire-monitoring`).
- Budget limit in USD and target science data in MB/day.
- Hard limits for mass (kg), average power (W), battery energy (Wh), daily data/downlink (MB/day), orbit altitude (km), and inclination (degrees).
- Compatible launch/orbit requirements or references, expressed through the agreed shared catalog contracts rather than copied data.
- Scoring goals or weights, if the final interface supports mission-specific scoring.

Given a player's selected components, launch option, and orbit, the future engine should produce:

- A pass/fail mission result.
- A complete list of hard-constraint validation messages and numeric margins.
- Calculated mission totals for mass, power, battery/eclipse energy, generated data, downlink, and cost.
- A deterministic score breakdown for the scoring goals.

The final mapping of these concepts to `MissionDefinition`, component catalogs, launch definitions, and engine result types is blocked on M1-03. This document must be reviewed against that contract when it merges; it does not authorize adding unsupported fields or duplicate shared interfaces now.

## MVP boundaries

This mission intentionally includes one objective, one science tag, one orbit envelope, one budget, and one reference configuration. It excludes multiple missions, fuel or delta-v modeling, dynamic weather/fire events, real Earth-observation data ingestion, real launch pricing, orbital propagation, and scientific fire-detection claims.
