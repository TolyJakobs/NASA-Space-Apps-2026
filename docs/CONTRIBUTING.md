# Contributing Guide

Welcome to the NASA Space Apps Challenge 2026 project!

This document defines our team's development and collaboration conventions. Its purpose is to keep our work organized, maintain a readable project history, and help everyone contribute effectively.

These conventions apply to all team members, including developers, researchers, and documentation contributors.

**Our guiding principles:**

- Keep changes small, focused, and easy to review.
- Communicate before making changes that affect other teammates.
- Keep the `main` branch stable and functional.
- Document important decisions and development progress.
- Prioritize working software over unnecessary process.

During the hackathon, we may simplify procedures when necessary, but we should preserve a clear record of our work.

---

## 1. Getting Started

### 1.1 Prerequisites

Before contributing, ensure you have:

- Git installed and configured.
- A GitHub account with access to the repository.
- A code editor or IDE.
- The development dependencies specified in the project README once the technology stack is finalized.

### 1.2 Clone the Repository

Clone the project to your local machine:

```bash
git clone https://github.com/TolyJakobs/NASA-Space-Apps-2026.git
cd NASA-Space-Apps-2026
```

Configure your Git identity if you haven't already:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Use an email associated with your GitHub account, or your GitHub-provided private commit email.

### 1.3 Synchronize Your Local Repository

Before starting new work, switch to `main` and retrieve the latest changes:

```bash
git switch main
git pull --ff-only origin main
```

The `--ff-only` flag prevents Git from creating an unexpected merge commit.

Do this regularly, particularly before creating new branches.

---

## 2. Branching Strategy

We follow a simplified **GitHub Flow** branching strategy.

### 2.1 Main Branch

The `main` branch represents the latest stable version of the project.

Team members should:

- Avoid committing directly to `main`.
- Create a separate branch for each feature, fix, or documentation change.
- Merge changes through pull requests.
- Ensure changes work before requesting a merge.

### 2.2 Branch Naming Convention

Use the following format:

```text
<category>/<short-description>
```

Recommended categories:

| Category | Purpose | Example |
|---|---|---|
| `feature/` | New functionality | `feature/mission-selection` |
| `fix/` | Bug fixes | `fix/fuel-calculation` |
| `docs/` | Documentation | `docs/contributing-guide` |
| `refactor/` | Internal code improvements | `refactor/mission-validator` |
| `test/` | Tests | `test/physics-calculations` |
| `chore/` | Configuration or maintenance | `chore/setup-linter` |

When working on a GitHub Issue, include its number if available:

```text
feature/12-mission-selection
fix/24-fuel-calculation
```

Branch names should be lowercase, descriptive, and hyphen-separated.

### 2.3 Creating a Branch

Start from the latest `main`:

```bash
git switch main
git pull --ff-only origin main
git switch -c feature/12-mission-selection
```

All changes for that task should be made on the newly created branch.

### 2.4 Keeping a Branch Updated

If `main` changes while you're working, you may incorporate those changes into your branch:

```bash
git fetch origin
git merge origin/main
```

Resolve any conflicts, test the result, and commit the merge if Git requires it.

Do not rewrite shared branch history without coordinating with the other contributors.

---

## 3. Commit Message Convention

We use a simplified version of **Conventional Commits v1.0.0**, adapted to our project's terminology.

Reference: https://www.conventionalcommits.org/en/v1.0.0/

### 3.1 Format

```text
<type>(<scope>): <description>
```

The scope is optional:

```text
docs: update README
```

### 3.2 Commit Types

| Type | Description |
|---|---|
| `feat` | Introduces new functionality |
| `fix` | Corrects a bug |
| `docs` | Changes documentation |
| `refactor` | Restructures code without changing functionality |
| `test` | Adds or updates tests |
| `chore` | Repository maintenance or configuration |
| `build` | Changes the build system or dependencies |
| `ci` | Changes continuous integration workflows |
| `perf` | Improves performance |
| `style` | Changes formatting without changing behavior |

### 3.3 Project-Specific Scopes

Scopes identify which part of the project is affected.

Suggested scopes include:

| Scope | Area |
|---|---|
| `mission` | Mission planning and objectives |
| `spacecraft` | Spacecraft configuration and components |
| `physics` | Engineering and physics calculations |
| `simulation` | Mission simulation |
| `game` | Gameplay rules and mechanics |
| `scoring` | Mission evaluation and scoring |
| `ui` | User interface |
| `data` | Data processing and resources |
| `team` | Team documentation and collaboration |

These scopes are suggestions, not an exhaustive list. Use a new scope when it clearly describes the affected subsystem.

### 3.4 Examples

Good commit messages:

```text
feat(mission): add mission selection screen
feat(spacecraft): add component mass validation
fix(physics): correct delta-v calculation
test(scoring): add mission success tests
docs(team): add contribution guidelines
refactor(simulation): simplify event processing
chore: configure project formatting
```

Avoid vague messages such as:

```text
fixed stuff
update
changes
final version
it works now
```

### 3.5 Commit Message Rules

- Use lowercase commit types and scopes.
- Write a short, descriptive subject.
- Use imperative wording where practical, such as `add`, `fix`, or `update`.
- Do not end the subject with a period.
- Keep each commit focused on one logical change.
- Use the optional commit body to explain important reasoning or technical decisions.

Breaking changes should be marked using the Conventional Commits specification, such as `feat(api)!: change spacecraft configuration format`, and explained in the commit body.

---

## 4. Making and Pushing Changes

### 4.1 Review Your Changes

Before committing, inspect the working tree:

```bash
git status
git diff
```

Stage the intended files:

```bash
git add path/to/file
```

Alternatively, stage all changes:

```bash
git add .
```

Use `git add .` carefully to avoid accidentally committing generated files, credentials, or unrelated changes.

### 4.2 Create a Commit

```bash
git commit -m "feat(mission): add mission selection screen"
```

Commit whenever you complete a meaningful unit of work.

A single GitHub Issue may require multiple commits.

### 4.3 Push Your Branch

For the first push:

```bash
git push -u origin feature/12-mission-selection
```

For subsequent pushes:

```bash
git push
```

Pushing uploads your branch to GitHub. It does **not** merge your work into `main`.

### 4.4 Before Requesting Review

Confirm that:

- Your changes work as intended.
- Relevant tests pass.
- Debugging code and temporary files have been removed.
- No secrets or credentials are included.
- Documentation is updated when necessary.
- Your branch contains only relevant changes.

---

## 5. GitHub Issues

GitHub Issues are the primary way we track individual development tasks.

### 5.1 Issue Organization

We organize work using the following hierarchy:

**Milestone → Topic / Parent Issue → Task / Sub-Issue**

- **Milestones** represent meaningful project outcomes.
- **Parent issues** represent related topics or workstreams.
- **Sub-issues** represent small, actionable tasks.

Where useful, labels identify priorities and technical areas.

### 5.2 Issue Requirements

Each development task should clearly describe:

1. **Objective:** What needs to be accomplished?
2. **Context:** Why is this needed?
3. **Scope:** What should be implemented or changed?
4. **Acceptance Criteria:** How will completion be verified?
5. **Dependencies:** What other tasks must be completed first, if any?

For shared modules, issues may specify expected interfaces, data structures, and units.

Internal implementation details should remain flexible unless a specific design decision has been approved.

### 5.3 Task Size

Prefer small, independently verifiable tasks.

As a guideline, most tasks should be achievable in approximately 15–90 minutes, although complex tasks may take longer.

If a task becomes too large, consider dividing it into sub-issues.

Avoid creating multiple trivial issues when the work is naturally completed as one small change.

### 5.4 Claiming Issues

Before starting a task:

1. Check whether it is already assigned.
2. Confirm that its dependencies are satisfied.
3. Assign yourself or notify the team that you are claiming it.
4. Create a corresponding branch.
5. Update the issue if you encounter blockers or changes in scope.

Issues may remain unassigned until someone is ready to work on them.

---

## 6. Pull Requests

Pull requests (PRs) are how we propose and integrate changes.

### 6.1 When to Open a Pull Request

Open a PR when your work is ready for review.

Draft PRs may be opened earlier when feedback or collaboration is needed.

Keep PRs focused on one task or a closely related set of changes.

### 6.2 Pull Request Contents

Each PR should include:

**Summary**

A short explanation of what changed.

**Related Issue**

Reference the associated issue, where applicable.

**Testing**

Describe how the changes were tested.

**Notes**

Mention known limitations, unresolved problems, or decisions that require attention.

Example:

```markdown
## Summary
- Added spacecraft mass calculations.
- Added validation for mass limits.

## Related Issue
Closes #14

## Testing
- Unit tests passed.
- Manually verified sample configurations.

## Notes
- Fuel consumption is handled by a separate task.
```

Use `Closes #14` only when the PR fully resolves that issue. Use `Related to #14` for partial work.

### 6.3 Pull Request Titles

PR titles should follow the same conventions as commit messages.

Example:

```text
feat(spacecraft): implement mass validation
```

This is particularly useful because we use squash merging.

---

## 7. Code Reviews

At least one other team member should review a PR before it is merged, whenever practical.

The purpose of a code review is to catch problems, maintain consistency, and share knowledge—not to criticize the contributor.

### 7.1 Reviewer Checklist

Reviewers should consider:

- Does the change satisfy the issue's acceptance criteria?
- Is the implementation understandable?
- Are relevant edge cases handled?
- Are calculations and units correct?
- Does the change introduce obvious bugs?
- Are relevant tests included and passing?
- Does the change conflict with existing components?
- Are important assumptions documented?

Reviewers should provide specific, constructive feedback.

### 7.2 Author Responsibilities

PR authors should:

- Respond to review comments.
- Address requested corrections.
- Explain technical decisions when necessary.
- Request another review after significant changes.

For time-sensitive hackathon work, reviews may be brief, but critical calculations and integration changes should receive particular attention.

---

## 8. Merging Pull Requests

### 8.1 Default Merge Strategy

Use **Squash and Merge** by default.

This combines a PR's commits into a single commit on `main`, helping keep the shared history concise.

Before merging:

1. Confirm the PR is approved.
2. Confirm relevant checks and tests pass.
3. Resolve merge conflicts, if any.
4. Confirm the final squash commit follows our commit-message convention.
5. Merge the PR.
6. Delete the feature branch if no longer needed.

### 8.2 Updating Local Main

After a PR is merged:

```bash
git switch main
git pull --ff-only origin main
```

Then create a new branch for the next task.

### 8.3 Emergency Changes

During the hackathon, urgent fixes may require an expedited review or merge.

When this happens:

- Communicate the reason to the team.
- Prefer a quick second-person review.
- Test the affected functionality.
- Document significant exceptions afterward.

Direct changes to `main` should remain exceptional.

---

## 9. Milestones and Progress Tracking

We use GitHub's built-in Milestones feature to track project progress.

Each milestone should define:

- A clear objective.
- Included topics and workstreams.
- Expected deliverables.
- Acceptance criteria.
- Dependencies, where relevant.

GitHub Milestones and Issues serve as the primary source of truth for active task status.

Project documentation may describe milestone objectives and decisions, but should not duplicate a manually maintained issue-status tracker.

A milestone is complete when its required deliverables satisfy their acceptance criteria, not merely when implementation has started or code has been written.

---

## 10. Development Log

The project maintains a human-readable development log at:

`docs/DEVELOPMENT_LOG.md`

The log records significant progress and technical decisions.

### 10.1 When to Update the Log

Create or update an entry when:

- A milestone is completed.
- A significant technical decision is made or changed.
- A major blocker is discovered or resolved.
- The project's architecture or scope changes substantially.
- A meaningful integration or delivery checkpoint is reached.

Not every commit requires a development-log entry.

### 10.2 Log Entry Format

```markdown
## YYYY-MM-DD — [Milestone or Topic]

### Completed
- Describe the completed work.

### Decisions
- Record important decisions and reasoning.

### Issues / Blockers
- Describe unresolved problems, if any.

### Next Steps
- Identify the next actions.

### References
- Issues: #...
- Pull Requests: #...
```

Keep entries concise, factual, and useful to someone reading the project's history.

Use GitHub Issues and PRs for detailed implementation discussions.

---

## 11. Coding and Documentation Standards

### 11.1 General Code Quality

Contributors should:

- Use descriptive names for variables, functions, and classes.
- Follow the established conventions of the relevant language.
- Keep functions and modules focused.
- Avoid unnecessary complexity and premature optimization.
- Handle relevant errors and edge cases.
- Remove unused code and temporary debugging statements.
- Add tests for important calculations and logic.

### 11.2 Comments and Documentation

Comments should explain *why* something is done when the reason is not obvious.

Public functions, shared interfaces, and complex algorithms should have appropriate documentation.

Engineering calculations should document:

- The underlying equation or model.
- Units of measurement.
- Important assumptions.
- Relevant limitations.
- Scientific or technical references when applicable.

Avoid comments that merely restate obvious code behavior.

### 11.3 Formatting

Follow the project's formatting and linting configuration once established.

Do not introduce unrelated formatting changes into feature PRs.

### 11.4 Security and Repository Hygiene

Never commit:

- Passwords or API keys.
- Authentication tokens.
- Private credentials.
- Local environment files containing secrets.
- Large generated artifacts that are not needed by the project.

Use `.gitignore` appropriately.

If a credential is accidentally committed, notify the team and rotate or revoke it immediately. Simply deleting the file in a later commit is not sufficient.

---

## 12. Communication and Collaboration

Good communication is especially important during a short hackathon.

Team members should:

- Notify the team before changing shared interfaces.
- Communicate blockers as soon as they are identified.
- Avoid duplicating someone else's active work.
- Keep relevant GitHub Issues updated.
- Ask for review or assistance when needed.
- Help others integrate their work.

For decisions affecting the entire architecture or multiple workstreams, consult the team before implementation.

Not every small implementation detail requires group approval.

---

## 13. Hackathon-Specific Guidelines

Because our development window is limited, we prioritize:

1. A working, demonstrable project.
2. Correct and explainable core functionality.
3. Successful integration and testing.
4. Clear documentation and scientific attribution.
5. Optional features and visual polish.

We will follow the official NASA Space Apps Challenge rules regarding the timing of competition development and the use of external resources.

Before the permitted development window, contributors may prepare their development environments, practice relevant skills, research available resources, and maintain permitted planning documentation.

When uncertain whether a preparation activity is allowed, consult the event organizers before proceeding.

Our processes should support the team rather than slow it down.

---

## 14. References

Our development conventions draw on the following resources:

- [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow)
- [GitHub Pull Requests](https://docs.github.com/en/pull-requests)
- [GitHub Issues and Milestones](https://docs.github.com/en/issues)
- [Git Documentation](https://git-scm.com/doc)

---

**Thank you for contributing!**

Our goal is to collaborate effectively, learn from one another, and build the best project we can within the NASA Space Apps Challenge timeframe.
