# Rendering Strategy

## /

Static

The home page contains mostly static content.

## /menu

Server-rendered menu page.

The page fetches its data directly on the server.

## /menu/[id]

Prerendered dynamic route.

generateStaticParams() provides the known dish IDs.

## /cart

Client-side interactive UI.

The cart contains browser-specific state.

## /checkout

Server-side form mutation.

The form uses a Server Action to process the order.
