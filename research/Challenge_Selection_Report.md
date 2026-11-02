# NASA Space Apps Challenge 2026 — Challenge Selection Report

**Prepared:** November 1, 2026  
**Event:** November 14–15, 2026  
**Status:** Research / decision support, **not** a final challenge selection

> **Interpretation:** Ratings are subjective *team-fit estimates*, not official NASA scores or predictions of winning. Competitor examples are **publicly stated intentions**, not verified deliverables. Re-check challenge briefs, resources, team entries, and official event rules before deciding.

## Executive recommendation

**Top candidates:**
1. **Space Mission Design Game** — most natural blend of gameplay, engineering trade-offs, manageable programming, and demonstration appeal. Biggest weakness: several teams already describe similar simulators.
2. **Build a Junior Astronaut Mission Trainer** — strong beginner fit; limit the initial project to one outpost and a few resource systems. Good optional physical-control-panel integration.
3. **Interplanetary Survival Guide: Martian Map** — strongest option among these for geospatial algorithms and a distinctive aerospace demo, but data preprocessing is a serious risk.
4. **Create Health Monitoring Software for Astronauts** — best conventional full-stack dashboard; use simulated measurements, avoid medical claims.
5. **The Earth Information Jukebox** — memorable accessible-data experience, but sonification design is an unfamiliar discipline.

**Decision principle:** Choose the challenge whose *smallest honest, complete demo* the team can confidently build. A polished vertical slice beats a broad collection of unfinished features.

## Rating rubric

Scores range from 1 (low) to 10 (high), except **Technical difficulty**, where 10 means hardest.

- **Feasibility (30%)** — can a novice team complete a working demonstrable result in two days?
- **Differentiation potential (20%)** — how much room is there for a genuinely distinctive implementation? This is *not* an objective count of competitors.
- **Demo appeal (20%)** — can judges immediately understand and experience the value?
- **Scientific/mission relevance (15%)** — can the team show real NASA data or credible domain reasoning?
- **Hardware potential (5%)** — would a physical component improve the solution naturally?
- **Team learning and engagement (10%)** — collaborative scope and relevant engineering learning.

**Overall** is the weighted score, rounded to one decimal; scores are research judgments, not measured outcomes. **Competition evidence** is intentionally reported separately rather than folded into a speculative score.

## Comparison matrix

| Challenge | Feasibility | Differentiation | Demo | NASA relevance | Hardware | Learning | Difficulty | Weighted overall |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Space Mission Design Game | 9 | 7 | 10 | 7 | 8 | 9 | 5 | **8.4** |
| Junior Astronaut Mission Trainer | 9 | 7 | 9 | 7 | 9 | 8 | 4 | **8.2** |
| Martian Map | 6 | 9 | 9 | 10 | 8 | 10 | 8 | **8.0** |
| Astronaut Health Monitoring | 8 | 7 | 8 | 8 | 9 | 8 | 6 | **7.8** |
| Earth Information Jukebox | 8 | 8 | 9 | 7 | 7 | 7 | 5 | **7.9** |
| Abandoned but not Forgotten | 9 | 6 | 8 | 7 | 3 | 7 | 3 | **7.4** |
| Identify Earth Analog Locations | 6 | 9 | 8 | 9 | 4 | 9 | 7 | **7.5** |
| Lunar Landing Site Navigator | 5 | 9 | 9 | 10 | 5 | 10 | 9 | **7.4** |
| Earth System Trend Detective | 5 | 7 | 8 | 10 | 2 | 9 | 8 | **6.8** |
| Field Shift (Farms) | 5 | 8 | 8 | 9 | 8 | 8 | 8 | **7.1** |
| Flame in Freefall | 5 | 8 | 8 | 9 | 5 | 8 | 8 | **6.9** |
| Dancing with the SARs | 4 | 8 | 8 | 9 | 3 | 9 | 9 | **6.4** |
| MODIS / VIIRS Hot Spots | 4 | 7 | 7 | 10 | 3 | 9 | 9 | **6.2** |
| Planet X and SPHEREx | 4 | 8 | 9 | 10 | 2 | 9 | 9 | **6.9** |

> **Scope note:** These are the fourteen challenge names discussed and found in the current research. Double-check the live [official catalogue](https://www.spaceappschallenge.org/2026/challenges/) for additions, renamed titles, and special categories. “CLPS Lunar Mission Browser” was mentioned in an earlier conversation but should **not** be treated as an independently verified fifteenth official brief. It is omitted here pending verification.

## Detailed challenge profiles

### 1. Space Mission Design Game
**Official goal:** Let a user design/manage/simulate a space mission while balancing objectives, mass, power, fuel, costs, communications, risks and science return.

**Minimum demo:** Select one mission (e.g. Mars orbiter), choose components, validate budget/mass/power, launch a short event-driven mission, and display results and reasons.

**Ideas:** (A) A browser-based engineering trade-off game; (B) a mission-control control-panel with ESP32 switches; (C) scenario cards with random spacecraft failures and explanations.

**Pros:** Intuitive demo, excellent teamwork division, accessible stack, minimal dataset dependency.  
**Cons:** Games tempt large scope; simulation can become arbitrary if assumptions are unexplained; generic versions are already publicly proposed.  
**Differentiator:** Teach *why* each engineering decision matters, including a traceable constraint breakdown and comparison of two designs.  
**Kill switch:** Do not attempt orbital mechanics, multiplayer, polished 3D, and several missions simultaneously.

**Public competitor signals:** [ORIONIX](https://www.spaceappschallenge.org/2026/find-a-team/missionforge/) describes a trade-off simulator; [Astrominoes](https://www.spaceappschallenge.org/2026/find-a-team/astrominoes/) describes an interactive NASA-inspired mission simulator; [0_Play Space_0](https://www.spaceappschallenge.org/2026/find-a-team/play-space/) describes a simulation-game plan. **Implication:** A generic spacecraft selection screen alone is unlikely to feel distinctive.

### 2. Build a Junior Astronaut Mission Trainer
**Official goal:** Create a game/app for young learners operating a lunar or Martian outpost while balancing life support, radiation, power and food.

**Minimum demo:** One base, four resources, six decisions/events, explainable victory/failure criteria, age-appropriate instructions.

**Ideas:** (A) One-sol survival strategy game; (B) classroom challenge mode with teacher explanations; (C) a physical outpost control board using buttons and LEDs.

**Pros:** Very concrete MVP, easy to test with players, engaging, hardware compatible.  
**Cons:** Educational accuracy and actual learning outcomes need attention; simplistic gameplay can feel generic.  
**Differentiator:** Show a “what I learned” report linking actions to trade-offs.

### 3. Interplanetary Survival Guide: Martian Map
**Official goal:** Integrate data from multiple NASA Mars missions into a layered view of a place/route to help plan and conduct a Marswalk.

**Minimum demo:** One small mapped area with source-labelled layers, scientifically grounded points of interest, two selectable destinations and route comparison.

**Ideas:** (A) Hazard-aware Marswalk route planner with A*; (B) astronaut route planner with science-value vs. time trade-offs; (C) robot demonstration following a scaled route (optional).

**Pros:** Authentic NASA mapping, distinctive algorithmic depth, excellent portfolio work, visually strong.  
**Cons:** Coordinate systems, data availability, terrain resolution, map processing and scientific uncertainty can consume the event.  
**Differentiator:** Explain route costs and **data uncertainty** rather than presenting a mathematically attractive line as a certified safe route.  
**Kill switch:** Limit to one region and two reliable data layers; do not attempt autonomous rover operation before the map works.

**Public competitor signal:** [Delta Dune / Delta V](https://www.spaceappschallenge.org/2026/find-a-team/delta-dune/) says its participants have an existing robotics/swarm simulation and are recruiting hardware/design help. This is a team claim, not independently verified code or performance. **Implication:** A distinctive newcomer entry could emphasize simple, transparent, human-centered route decisions rather than competing on AI complexity.

### 4. Create Health Monitoring Software for Astronauts on Space Missions
**Official goal:** Collect health indicators and help astronauts assess and respond to their health during long missions.

**Minimum demo:** Simulated vitals/history, clear trends, contextual non-diagnostic flags, recommended next *monitoring* steps and evidence links.

**Ideas:** (A) Offline-first astronaut self-check dashboard; (B) stress/fatigue diary with carefully bounded interpretations; (C) optional pulse sensor feeding a visualization.

**Pros:** Familiar web/app architecture, accessible UI testing, hardware possible.  
**Cons:** Health claims, missing real-world data, false confidence in fabricated thresholds.  
**Differentiator:** Explain measurement confidence, sensor failure, and limited connectivity.

**Competitor signal:** [ASTRA](https://www.spaceappschallenge.org/2026/find-a-team/space-labs/) publicly proposes self-health tracking and risk assessment. Avoid making unverifiable clinical predictions.

### 5. The Earth Information Jukebox
**Official goal:** Couple NASA Earth Information Center visual frames with dynamic, real-time sonification.

**Minimum demo:** Choose one authentic Earth visualization; define a reproducible value-to-sound mapping; play synced audio with accessible captions/controls.

**Ideas:** (A) Climate visualization with temperature mapped to pitch/timbre; (B) interactive sonic timeline for one region; (C) tactile/physical slider to scrub data-driven sound.

**Pros:** Memorable judge demo, creatively different from conventional dashboards, accessibility potential.  
**Cons:** Weak sound mappings become arbitrary; audio hardware and browser playback can misbehave during demos.  
**Differentiator:** Show the mapping legend and include accessibility alternatives for deaf/hard-of-hearing users.

**Competitor signals:** [Pipilapu](https://www.spaceappschallenge.org/2026/find-a-team/pipilapu/) and [AuraSonics](https://www.spaceappschallenge.org/2026/find-a-team/aurasonics/) both publicly describe immersive sonification ideas.

### 6. Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars
**Goal:** Present the history and meaning of human-made equipment left on the Moon and Mars through engaging, evidence-based storytelling.

**Minimum demo:** Five documented objects/locations, an interactive exploration timeline, imagery and NASA source links.

**Ideas:** (A) Interactive museum; (B) choose-an-object narrative from launch to final resting place; (C) map-based “museum of artifacts”.

**Pros:** Low engineering risk, strong narrative/design roles, feasible.  
**Cons:** A plain gallery is not very novel; needs rigorous attribution and engaging interactivity.  
**Differentiator:** Trace artifacts across missions and explain historical/scientific context with an interactive story.

### 7. Identify Earth Locations that Analog the Permanent Moon Base Locations and Mars
**Official goal:** Use Earth, Moon, and Mars data to identify and characterize promising terrestrial analog locations for base/landing-site research.

**Minimum demo:** One target lunar/Mars environment, a small list of terrestrial candidate locations, reproducible scoring criteria, interactive comparison map.

**Ideas:** (A) Analog-site discovery dashboard; (B) geology/climate similarity explorer; (C) educational training-site recommendation tool.

**Pros:** Real scientific relevance, meaningful geospatial work, differentiable criteria.  
**Cons:** Comparing planetary environments is intrinsically approximate; multiple geospatial datasets need alignment.  
**Differentiator:** Show why each Earth location is analogous **and where the analogy breaks down**.

### 8. Lunar Landing Site Navigator
**Official goal:** Make it easy to compare lunar south-pole sites/dates through Sun and Earth horizon-position visualizations relevant to power and line-of-sight communications.

**Minimum demo:** Two candidate sites, selected date/time, trustworthy illumination/visibility calculations or verified precomputed examples, clear graphical comparison.

**Ideas:** (A) Side-by-side site calendar; (B) mission-planning horizon visualization; (C) physical model with LEDs to illustrate shadow/illumination (optional).

**Pros:** Clearly specified operational question, important real-world constraints, striking visuals.  
**Cons:** Lunar coordinate frames and ephemeris/time calculations; misleading output is easy.  
**Differentiator:** Explicit assumptions and transparent comparison rather than a generic lunar map.

### 9. Be An Earth System Trend Detective!
**Official goal:** Select Earth-science variables, visualize changes over time and evaluate location, magnitude and statistical significance.

**Minimum demo:** One NASA variable, one geographic region, one reliable time series, trend estimate with uncertainty/context.

**Ideas:** (A) Trend comparison lab; (B) explainable “significant or not?” view; (C) explore seasonal vs. long-term change.

**Pros:** Serious scientific content, clear quantitative learning.  
**Cons:** Statistical significance, multiple comparisons, missing data, seasonality and time-series assumptions.  
**Differentiator:** Communicate uncertainty rather than a flashy but simplistic trend arrow.

### 10. Field Shift: Adapting Farms with NASA Data
**Official goal:** Help farmers evaluate crop-rotation strategies from NASA Earth observations, local soil, crop properties and farmer priorities.

**Minimum demo:** One location/region, a few crops, NASA climate indicators, compare two rotations with stated assumptions.

**Ideas:** (A) Rotation decision matrix; (B) water-use trade-off explorer; (C) optional soil sensor demo linked to farmer inputs.

**Pros:** Practical societal benefit, hardware possibilities, strong human-centered design.  
**Cons:** Agronomy knowledge and local soil data; shouldn't imply a prototype produces authoritative farm advice.  
**Differentiator:** Explain trade-offs under drought and differing farmer priorities.

### 11. Flame in Freefall: AI-Powered Fire Safety Insights from Microgravity Combustion Data
**Official goal:** Summarize, compare and interpret NASA microgravity combustion findings through an interactive intelligence-assisted dashboard.

**Minimum demo:** Small curated research corpus, traceable search/filtering, side-by-side findings, citations to exact source records.

**Ideas:** (A) Research comparison explorer; (B) evidence-grounded Q&A with cited passages; (C) experiment-condition matrix.

**Pros:** Interesting space safety problem, useful research tooling, distinctive subject.  
**Cons:** Niche literature and experimental interpretation; AI summaries can hallucinate.  
**Differentiator:** Make every summary auditable to a source and distinguish findings from extrapolations.

### 12. Dancing with the SARs
**Broad scope:** A challenge involving synthetic-aperture radar (SAR) Earth observation and interpretation. **Official brief details not fully verified in this research pass.**

**Provisional demo:** Explore one documented SAR dataset and illustrate one phenomenon with clear explanatory overlays.

**Ideas:** (A) Before/after radar image explorer; (B) SAR interpretation tutorial; (C) change-detection prototype, only if the brief supports it.

**Pros:** Uncommon data, technical novelty.  
**Cons:** Radar-specific interpretation and preprocessing risk; precise deliverables need verification.  
**Differentiator:** Explain what SAR does and does *not* reveal.

### 13. Harmonization of MODIS and VIIRS Hot Spots
**Official goal:** Harmonize historical fire-hotspot records from different satellite sensors into an interpretable activity calendar and web tool.

**Minimum demo:** One region, limited period, documented normalization assumptions, calendar visualization and comparison.

**Ideas:** (A) Seasonal fire activity calendar; (B) cross-sensor uncertainty explainer; (C) anomaly explorer for a selected region.

**Pros:** Concrete NASA data problem with high practical significance.  
**Cons:** Sensor differences, spatial/temporal consistency and false precision; substantial data engineering.  
**Differentiator:** Document which detections are comparable and when they aren't.

**Competitor signals:** [Celestial X](https://www.spaceappschallenge.org/2026/find-a-team/celestial-x/) proposes an ETL pipeline and fire calendar; [Protectech](https://www.spaceappschallenge.org/2026/find-a-team/protectech/) similarly describes combining records. Their descriptions are not proof of completed tooling.

### 14. Planet X and SPHEREx
**Official goal:** Build a public-facing tool displaying SPHEREx sky imagery to explore how imagery changes over time.

**Minimum demo:** Limited sky region, two observation epochs where available, accessible imagery comparison with provenance and explanation.

**Ideas:** (A) Before/after sky viewer; (B) multi-band image comparison; (C) apparent motion educational explorer (without claiming new planet discoveries).

**Pros:** Powerful scientific mission, impressive astronomical imagery, challenging frontend/data work.  
**Cons:** Astronomical file formats, giant imagery, coordinate alignment and interpretation.  
**Differentiator:** Make subtle temporal differences easy to understand and show image provenance.

**Competitor signals:** [PROJECT SPECTRALx](https://www.spaceappschallenge.org/2026/find-a-team/spectral-x/) advertises a sky image library; [ExoMapper](https://www.spaceappschallenge.org/2026/find-a-team/exomapper/) reports a Python/Astropy backend; [The Abyss](https://www.spaceappschallenge.org/2026/find-a-team/the-abyss/) describes a visualization tool. These are self-descriptions only.

## Cross-challenge competitor assessment

**What can be inferred:** Public team pages show overlapping plans in mission simulation, astronaut health, sonification, fire-data harmonization, SPHEREx browsing and Martian mapping. Some descriptions claim previous work or mature skill sets.  
**What cannot be inferred:** Total teams per challenge, actual quality, competitive ranking, eventual completion, judging odds, or whether public descriptions remain current. Empty or boilerplate descriptions are not evidence of a weak team.

**Strategy for differentiation:** Pick one unusually clear user need, implement it end-to-end, use real data/credible assumptions, and make sources/uncertainties visible. Do not choose a challenge merely because it seems to have fewer teams.

## Suggested one-page team decision process (optional)

1. Each member independently selects their top three challenges.
2. For each finalist, agree on an explicit **60-second demo script** and a **minimum feature set**.
3. Identify the single highest-risk dependency (NASA data file, math formula, browser audio, sensor integration, etc.).
4. Check that dependency using permitted pre-event research and tutorials, while respecting the official hackathon rules on project development.
5. Assign prototype roles: domain/data, core algorithm, UI, integration/testing, presentation.
6. Choose a primary challenge **and a fallback** before the event.

### Team voting template

| Team member | First choice | Second | Third | Available skills | Biggest concern |
|---|---|---|---|---|---|
| Anatoliy | | | | | |
| Ben | | | | | |
| David | | | | | |
| Kim | | | | | |

### Final decision record (Optional)

- **Selected challenge:** TBD
- **Why this challenge:** TBD
- **What will be demonstrated:** TBD
- **Real NASA sources needed:** TBD
- **First risk to resolve:** TBD
- **What explicitly will NOT be built:** TBD
- **Fallback project:** TBD

## Primary official resources

- [2026 challenge catalogue](https://www.spaceappschallenge.org/2026/challenges/)
- [NASA Space Apps 2026 event overview](https://www.spaceappschallenge.org/2026/)
- [NASA Space Apps team directory](https://www.spaceappschallenge.org/2026/find-a-team/)
- [Junior Astronaut Mission Trainer](https://www.spaceappschallenge.org/2026/challenges/junior-astronaut-mission-trainer/)
- [Astronaut Health Monitoring](https://www.spaceappschallenge.org/2026/challenges/create-health-monitoring-software-for-astronauts-on-space-missions/)
- [Lunar Landing Site Navigator](https://www.spaceappschallenge.org/2026/challenges/lunar-landing-site-navigator/)
- [Earth Analog Locations](https://www.spaceappschallenge.org/2026/challenges/permanent-moon-base-locations-and-mars/)
- [Earth System Trend Detective](https://www.spaceappschallenge.org/2026/challenges/earth-system-trend-detective/)
- [Field Shift](https://www.spaceappschallenge.org/2026/challenges/field-shift-adapting-farms-with-nasa-data/)
- [MODIS/VIIRS Hot Spots](https://www.spaceappschallenge.org/2026/challenges/modis-and-viirs-hot-spots/)
- [Earth Information Jukebox](https://www.spaceappschallenge.org/2026/challenges/the-earth-information-jukebox/)
- [Flame in Freefall](https://www.spaceappschallenge.org/2026/challenges/flame-in-freefall/)
- [Abandoned but not Forgotten](https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/)
- [Martian Map team/brief excerpt](https://www.spaceappschallenge.org/2026/find-a-team/delta-dune/)

**Research limitation:** A few challenge pages were intermittently unavailable to the browser and some public team pages have inconsistent labels/content. Treat unverified details as provisional. Validate exact requirements and licensing from official NASA challenge tabs before implementation.
