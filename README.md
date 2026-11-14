# NASA-Space-Apps-2026
Repo for a collaborative work for a NASA Space Apps 2026 Hackathon Event.

## Quick Start

### Installation

1. Clone the repository using GitHub Desktop.
2. Open the repository in VS Code.
3. Open Terminal → New Terminal.
4. Install the project dependencies:

```bash
npm ci
```

**Alternative for Windows PowerShell:**

If PowerShell blocks npm scripts, use:

```powershell
npm.cmd ci
```

### Development

Start the local development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

### Production Build

Check TypeScript and create a production build:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Testing

Run the automated test suite:

```bash
npm test
```

## Project Architecture

The application is organized into the following separate modules:

| Module | Responsibility |
|--------|----------------|
| `domain/` | Shared types and interfaces |
| `data/` | Static catalogs and definitions |
| `engine/` | Calculations and validation |
| `app/` | Application orchestration |
| `ui/` | React components and presentation |
| `test/` | Tests and test utilities |

Domain and simulation logic must remain independent
of React.

See [Architecture](docs/ARCHITECTURE.md) for module
boundaries and permitted dependencies.

## Contributing

Read [Contributing Guidelines](docs/CONTRIBUTING.md)
before starting work.

Create a feature branch, assign yourself the relevant
GitHub issue, and submit a pull request for review.

## Scientific Sources and Assumptions

See [Sources and Assumptions](docs/SOURCES_AND_ASSUMPTIONS.md)
for NASA references, scientific explanations, and illustrative gameplay values used in the project.

