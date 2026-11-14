
# Data and Numeric Conventions

## Purpose

This document defines consistent units, numeric validation rules, and component identification conventions for the Space Mission Design Game.

All application layers must interpret these values consistently.

## 1. Units

| Quantity | Unit | Description |
|---|---|---|
| Mass | kg | Component or spacecraft mass |
| Power | W | Rate of electrical energy consumption or generation |
| Energy | Wh | Stored or consumed electrical energy |
| Data generation | MB/day | Data generated over one day |
| Cost | USD | Monetary cost in US dollars |
| Orbit altitude | km | Altitude above Earth's reference surface |
| Time | s | Duration in seconds |

All values use the units specified here unless a field explicitly documents otherwise.

Power and energy must not be treated as interchangeable.

Example:

A component consuming 100 W for 2 hours requires 200 Wh of energy.

## 2. Numeric Validation

Unless a field explicitly specifies a stricter constraint, numeric values must:

- Be JavaScript numbers.
- Be finite.
- Be nonnegative.
- Not be `NaN`, `Infinity`, or `-Infinity`.

Examples:

| Input | Valid? | Reason |
|---|---|---|
| `100` | Yes | Finite and nonnegative |
| `0` | Yes | Zero is permitted by the general rule |
| `-10` | No | Negative |
| `NaN` | No | Not a valid finite number |
| `Infinity` | No | Not finite |
| `"100"` | No | String, not number |

Individual fields may impose stricter rules. For example, a quantity representing the number of components must be a positive integer.

## 3. Component Identification

Each catalog component must have a unique, stable string ID.

Every `MissionConfiguration.selectedComponentIds` value must resolve to an existing catalog entry. Unknown component IDs are invalid and must be rejected.

Repeated component IDs represent multiple copies of the same catalog component. For example, `['camera-a', 'camera-a']` selects two copies of `camera-a`.

All numeric values governed by these conventions must be finite and nonnegative. Implementations must reject negative numbers, `NaN`, `Infinity`, and `-Infinity` using the shared `isFiniteNonnegative` helper in `src/engine/numericValidation.ts`.

## 4. Calculations

All calculations must use compatible units.

Examples:

- Total mass: sum component masses multiplied by quantities.
- Total cost: sum component costs multiplied by quantities.
- Energy consumption: power in W multiplied by operating time in hours, producing Wh.

Unit conversions must be explicit.

## 5. Assumptions

The numeric examples in this document are illustrative and are not NASA-verified component specifications.

Scientific and gameplay assumptions must be documented when introduced.

## 6. Implementation Boundaries

The domain layer defines shared data structures.

The engine layer performs calculations and validation.

The UI may display converted or formatted values but must not redefine their underlying meaning.

This document establishes conventions; it does not implement gameplay mechanics.
