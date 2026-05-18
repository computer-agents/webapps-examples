# Authenticated Customer Portal

A customer dashboard for signed-in users. It is designed to sit in front of Computer Agents Auth and a connected database.

## Connected resources

- Auth: resolves the current user/session.
- Database: stores tickets, invoices, or workspace records.

## Expected endpoints

- `GET /api/auth/session`
- `GET /api/database/customer-summary`
- `GET /api/database/tickets`

Use a Function or your web app backend adapter to connect these routes to Computer Agents resources.

