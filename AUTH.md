# Addis Eats Authentication and Authorization

## Public routes

Routes:
`/`, `/menu`, `/signin`

Protection:
None.

Reason:
Visitors can see the menu without signing in.

## Checkout

Route:
`/checkout`

Protection:
`proxy.js` (session cookie check).

Reason:
Checkout involves a user's order and personal information.

## Orders

Route:
`/orders`

Protection:
`proxy.js` + `getSession()` in the page + `getOrdersFor(session.userId)`.

Reason:
Orders belong to individual users, so the query uses the session user id and never an id from the request.

## Order Status

Route:
`/orders/[id]`

Protection:
`proxy.js` (session cookie check).

Reason:
The matcher `/orders/:path*` also covers nested order routes.

## placeOrder

Action:
`placeOrder` in `app/orders/actions.js`

Protection:
`getSession()` inside the action.

Reason:
The action must confirm the user is signed in before it does any work.

## cancelOrder

Action:
`cancelOrder` in `app/orders/actions.js`

Protection:
`getSession()` + ownership check (`order.userId === session.userId`).

Reason:
A signed-in user must not be able to cancel another user's order.

## Kitchen

Route:
`/kitchen`

Protection:
`getSession()` + server-side staff role check.

Reason:
The kitchen is an internal staff area.

## Sign In and Sign Out

Routes:
`/signin`, `/api/signin`, `/api/signout`

Protection:
Credentials are checked on the server. The session cookie is `httpOnly`, `sameSite: "lax"` and `secure` in production. The `next` value must start with `/`, which prevents open redirects.

Reason:
The browser must not decide whether a password is correct or where the user is sent after signing in.
