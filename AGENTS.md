
# AGENTS.md — NASA Space Apps 2026

## 1. Project Context

This repository contains our submission for the NASA Space Apps Challenge 2026, specifically the **Space Mission Design Game** challenge.

We are a team of four working under a strict hackathon deadline.

Our priorities, in order:

1. Deliver a functional, demonstrable MVP.
2. Satisfy the official challenge requirements.
3. Maintain reliable, understandable code.
4. Enable parallel development without integration problems.
5. Improve presentation, polish, and optional features when time permits.

Do not introduce unnecessary complexity.

## 2. Source of Truth

Before implementing changes:

1. Read `README.md` and relevant documentation.
2. Inspect existing code and project conventions.
3. Read the relevant GitHub issue and acceptance criteria.
4. Check existing interfaces before introducing new ones.

The official challenge requirements and agreed team decisions take precedence over assumptions.

If requirements are unclear, explain the ambiguity rather than inventing requirements.

Do not assume a particular technology stack, architecture, or game mechanic unless the repository or team decisions establish it.

## 3. Scope and Task Discipline

- Work on the assigned GitHub issue only.
- Implement the smallest complete solution satisfying its acceptance criteria.
- Avoid unrelated refactoring.
- Do not implement features belonging to other issues.
- Do not introduce speculative abstractions.
- Identify dependencies and blockers before implementation.
- Ask for clarification when an ambiguity materially affects implementation.

If a task is too large, recommend splitting it into smaller issues.

## 4. Architecture and Interfaces

- Follow the existing project structure.
- Prefer modular, cohesive components.
- Keep business logic separate from presentation where practical.
- Define clear inputs, outputs, and responsibilities.
- Reuse existing utilities and interfaces.
- Avoid circular dependencies.
- Do not silently modify shared interfaces.
- Document changes to contracts that affect other components.

Shared interfaces must be agreed upon before dependent components are implemented.

## 5. Coding Standards

- Prioritize readability and maintainability.
- Use descriptive names.
- Keep functions focused.
- Prefer simple solutions over clever ones.
- Follow the formatting and naming conventions of the existing codebase.
- Handle errors explicitly.
- Validate external or untrusted inputs.
- Avoid unnecessary dependencies.
- Never hardcode secrets, credentials, or API keys.

Comments should explain non-obvious reasoning rather than restate code.

## 6. Testing and Verification

For each implementation:

1. Identify relevant tests and checks.
2. Add or update tests where appropriate.
3. Run available relevant tests.
4. Check for regressions.
5. Verify the issue's acceptance criteria.

Do not claim tests passed unless they were actually executed.

If tests cannot run, explain why.

Prioritize testing critical game logic, calculations, data contracts, and integration boundaries.

## 7. Git and GitHub Workflow

Our collaboration workflow:

- Topic-based GitHub milestones.
- Small, independently understandable issues.
- One primary assignee per active issue.
- Feature branches and pull requests.
- Shared interfaces agreed upon before dependent work.
- MVP completion before optional features.

Use descriptive branch names, such as:

- `feat/issue-12-mission-selection`
- `fix/issue-18-calculation-error`
- `docs/issue-6-setup-instructions`

Use Conventional Commits:

- `feat: add mission selection`
- `fix: correct fuel calculation`
- `docs: update setup instructions`
- `test: add mission validation tests`
- `chore: configure development tooling`

Do not commit directly to `main` unless explicitly instructed.

Do not push, merge pull requests, rewrite history, or delete branches without explicit authorization.

## 8. AI Agent Working Procedure

When given a task:

1. **Understand:** Read the issue, relevant files, and existing interfaces.
2. **Plan:** Briefly identify the files and changes required.
3. **Implement:** Make focused changes within the agreed scope.
4. **Verify:** Run relevant tests and checks.
5. **Report:** Summarize the result and any outstanding concerns.

For straightforward changes, keep planning brief.

Prefer completing a small task over producing lengthy explanations.

Do not make unrelated changes simply because improvements are possible.

## 9. Completion Report

After implementation, report:

**Implemented**
- What changed.
- Which files were affected.

**Verification**
- Tests or checks executed.
- Results.

**Outstanding**
- Known limitations.
- Blockers or unresolved questions.
- Follow-up work, if necessary.

**Git**
- Suggested branch name.
- Suggested Conventional Commit message.

Do not describe unfinished work as complete.

## 10. Hackathon-Specific Principles

**Time is our most limited resource.**

- Prefer working software over ambitious incomplete features.
- Favor deterministic, testable behavior.
- Keep the application runnable throughout development.
- Avoid major architectural rewrites near the deadline.
- Use mock data when appropriate, but clearly distinguish it from real data.
- Never fabricate NASA data, scientific results, or calculation accuracy.
- Clearly document simplified simulation assumptions.
- Preserve a reliable demonstration path.

When deciding between a sophisticated solution and a simpler one that meets the requirements, prefer the simpler solution unless there is a clear reason otherwise.

## 11. Agent Boundaries

AI agents must not:

- Invent requirements or acceptance criteria.
- Modify unrelated features without permission.
- Change agreed interfaces silently.
- Introduce unnecessary frameworks or dependencies.
- Remove tests merely to make checks pass.
- Claim scientific correctness without supporting evidence.
- Commit or push without authorization.
- Mark GitHub issues complete without authorization.

When uncertain, communicate the uncertainty clearly.

**Primary objective: help the team ship a reliable, demonstrable NASA Space Apps MVP within the hackathon deadline.**
