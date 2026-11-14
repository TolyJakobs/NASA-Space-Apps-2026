# Source Architecture

`src/` is organized by responsibility so mission logic remains independent of the React application.

| Module | Responsibility | May import from |
| --- | --- | --- |
| `domain/` | Shared TypeScript models and interfaces. | No application modules. |
| `data/` | Static mission definitions and component catalogs. | `domain/` types only. |
| `engine/` | Pure simulation, engineering calculations, and validation. | `domain/` types only. |
| `app/` | Application composition and state integration. | `domain/`, `data/`, `engine/`, and `ui/`. |
| `ui/` | React components and presentation. | `domain/` types and React. |
| `test/` | Shared test utilities and fixtures. | Any module it supports. |

`domain/`, `data/`, and `engine/` must not import React, `app/`, or `ui/`. The UI receives state and behavior through props; it does not import the application, engine, or data modules directly.
