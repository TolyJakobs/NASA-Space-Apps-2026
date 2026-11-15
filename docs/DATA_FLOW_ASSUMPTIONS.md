# Science Data Flow Assumptions

**Issue:** #29 (`M4-05`)

This deterministic MVP model treats science generation and communications capacity as illustrative daily-average throughput values, not a ground-station or spacecraft communications analysis.

## Calculations

- Generated science data (MB/day) is the sum of selected scientific instruments' `scienceDataMbPerDay` values.
- Raw downlink capacity (MB/day) is the sum of selected communications equipment's `downlinkMbPerDay` values.
- Effective downlink capacity (MB/day) is raw downlink capacity multiplied once by the selected orbit's `contactModifier`.
- Delivered science data (MB/day) is the smaller of generated science data and effective downlink capacity.

Repeated component selections represent separate physical instances. Solar panels and batteries contribute neither science data nor downlink capacity. The orbit `scienceModifier` is intentionally not used by this issue.

## Modeling boundaries

Communication capacities are additive, and all generated science data competes for the same downlink capacity. The model does not include compression, buffering, packet loss, scheduling, instrument prioritization, science-tag matching, objectives, feasibility, or scoring.
