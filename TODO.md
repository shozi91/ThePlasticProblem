# The Plastic Problem - To-Do List

This list is prioritized so we can keep shipping while reducing risk.

## P0 - Unblock Development (Do First)
- [ ] Replace hard-coded secrets/API keys with environment variables and document `.env` usage.
- [ ] Make DB table access deterministic (use explicit table names, not index positions from reflection).
- [ ] Fix broken frontend asset references (`static/js/pie.js`, `static/js/cleanupTest.js`, `js/home.js`, `d3.min.js`).
- [ ] Fix filter runtime bug in `static/assets/table/app.js` (`button.on` called on undefined value).
- [ ] Add a short smoke-test checklist for core routes/pages.

## P1 - Stabilize Backend
- [ ] Refactor database layer into helper functions/module for cleaner route handlers.
- [ ] Add error handling for external requests and DB failures with clear JSON error responses.
- [ ] Add route-level tests for all JSON endpoints.
- [ ] Remove unused imports and dead code in `app.py`.

## P2 - Frontend Reliability
- [ ] Consolidate duplicate script imports across templates.
- [ ] Remove stale files and unused templates or clearly mark them as archived.
- [ ] Standardize static asset paths (`/static/...`) to avoid path issues.
- [ ] Add lightweight UI regression checklist for key pages (`index`, `source`, `gal`, `resolution`).

## P3 - Dependency and Security Maintenance
- [ ] Upgrade vulnerable/outdated dependencies in `requirements.txt`.
- [ ] Confirm runtime compatibility and move off Python `3.7.7`.
- [ ] Add `pip-audit` or similar dependency scan to CI.

## P4 - Team Workflow
- [ ] Add `CONTRIBUTING.md` with branch/PR conventions.
- [ ] Add issue templates for bug reports and feature requests.
- [ ] Add CI job (lint + tests) on pull requests.

## Definition Of "Project Is Ready To Build On"
- [ ] New contributor can run app locally in <= 15 minutes.
- [ ] Core pages load without JS console errors.
- [ ] Data endpoints return expected payload shapes.
- [ ] No secrets are committed in source code.
