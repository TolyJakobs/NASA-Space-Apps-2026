# Energy Model Assumptions

**Issue:** #28 (`M4-04`)

This MVP energy model uses illustrative catalog values and an idealized 24-hour day. It is a deterministic gameplay calculation, not a spacecraft power-system analysis.

## Calculations

- Daily solar generation (Wh/day) = selected solar-panel generation (W) × 24 hours × orbit sunlight fraction.
- Daily consumption (Wh/day) = active spacecraft power draw (W) × 24 hours.
- Eclipse duration (hours) = orbit period (minutes) ÷ 60 × (1 − sunlight fraction).
- Eclipse battery requirement (Wh) = active spacecraft power draw (W) × eclipse duration (hours).

Watts are rates of electrical energy; watt-hours are energy quantities. The period conversion from minutes to hours is explicit before calculating the eclipse battery requirement.

## Modeling boundaries

Solar generation is nominal and constant while in modeled sunlight. Active equipment load is constant throughout the day. The eclipse reserve represents one continuous eclipse in the selected orbit.

The model deliberately excludes panel degradation, conversion and charging losses, battery discharge limits, duty cycles, thermal effects, orbit perturbations, and any feasibility decision. Battery `capacityWh` is not generation or power draw and is not compared with the eclipse requirement in this issue.
