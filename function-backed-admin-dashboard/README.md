# Function-backed Admin Dashboard

An internal dashboard that calls a connected Computer Agents Function for privileged operations.

## Connected resources

- Function: returns metrics and runs admin actions.
- Optional database: source for operational records.
- Optional agent runtime: enriches summaries or remediation suggestions.

## Expected endpoints

- `GET /api/functions/ops-summary`
- `POST /api/functions/rebuild-index`

Keep privileged logic inside the Function. The browser should only call your app's safe public endpoints.

