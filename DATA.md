# Addis Eats Data Strategy

## Menu

Key:
`/api/dishes`

Strategy:
Server rendering for the initial menu.

Reason:
The initial menu does not require browser-side fetching.

## Menu Search

Key:
`/api/dishes?q=query`

Strategy:
SWR + debounce.

Reason:
The request depends on user typing.

## Menu Pagination

Key:
`/api/dishes?page={page}`

Strategy:
SWR + keepPreviousData.

Reason:
The page changes in the browser.

## Order Status

Key:
`/api/orders/${id}`

Strategy:
SWR + fallbackData + polling.

Refresh:
5 seconds.

Reason:
Order status changes while the page is open.

## Cart

Key:
`/api/cart`

Strategy:
SWR or TanStack Query.

Refresh:
After a successful cart mutation.

Reason:
The client cache must reflect the latest cart state.
