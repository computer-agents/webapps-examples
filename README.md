# Computer Agents Web App Examples

Small web app templates that show how hosted Computer Agents Web Apps can connect to platform resources.

Each example is a static app with a clear integration point. You can open `index.html` locally for a preview, then upload the folder to a Web App resource and connect the required Computer Agents resources.

## Examples

| Example | What it shows |
| --- | --- |
| [`agent-support-portal`](./agent-support-portal) | A support portal that sends questions to a connected Agent Runtime. |
| [`authenticated-customer-portal`](./authenticated-customer-portal) | A signed-in customer workspace backed by Auth and a database. |
| [`function-backed-admin-dashboard`](./function-backed-admin-dashboard) | An admin dashboard that calls a connected Function for server-side actions. |
| [`secrets-integration-console`](./secrets-integration-console) | An integration console that proxies third-party API calls through Functions and Secrets. |

## Deploy

1. Create or open a Computer Agents project.
2. Create a Web App resource.
3. Upload one example folder as the app source.
4. Connect the resources listed in that example README.
5. Deploy the web app.

The examples intentionally keep secrets and privileged resource access out of browser code. Use Computer Agents Functions for server-side calls that need secrets, database writes, or external provider credentials.

