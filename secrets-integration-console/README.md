# Secrets-powered Integration Console

A small operations console that calls a Function proxy for third-party APIs. The Function reads credentials from Computer Agents Secrets.

## Connected resources

- Secrets: stores provider credentials such as `CRM_API_KEY`.
- Function: performs server-side external API requests.
- Optional database: stores sync history.

## Expected endpoints

- `GET /api/functions/integration-status`
- `POST /api/functions/sync-provider`

Never put provider tokens in browser JavaScript. Keep them in a connected Secrets vault and read them from a Function.

