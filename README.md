# Dependabot auto-merge test

A throwaway repo that proves a GitHub Actions workflow auto-merges **patch** and
**minor** Dependabot PRs while leaving **major** updates for manual review.

## Pieces

- **`package.json`** — three deps pinned old to force one of each update type:
  - `ms` `2.1.2` → patch
  - `lodash` `4.17.21` → minor
  - `chalk` `4.1.2` → major
- **`.github/dependabot.yml`** — enables daily npm update checks.
- **`.github/workflows/dependabot-auto-merge.yml`** — the deliverable. Reads the
  update type from `dependabot/fetch-metadata` and merges patch/minor PRs.

## How the workflow decides

`dependabot/fetch-metadata` exposes `update-type`. The workflow merges when it is
`semver-patch` or `semver-minor`, and skips `semver-major`. All event values pass
through `env:` (never interpolated into `run:`) to avoid workflow injection.

## Local testing

The merge decision is exercised locally with [`act`](https://github.com/nektos/act)
via a `workflow_dispatch` dry-run that injects the update type (the real
`fetch-metadata` step needs the live API, so it is skipped locally):

```bash
act workflow_dispatch --input update_type=version-update:semver-patch -j auto-merge
act workflow_dispatch --input update_type=version-update:semver-minor -j auto-merge
act workflow_dispatch --input update_type=version-update:semver-major -j auto-merge
```
