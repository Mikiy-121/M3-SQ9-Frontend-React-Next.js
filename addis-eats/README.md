# Addis Eats

A simple food-ordering application built with Next.js (App Router) and JavaScript.

## Routes

| URL | Purpose |
| --- | --- |
| / | Home page |
| /menu | List available dishes |
| /menu/[id] | Display one dish |
| /cart | Display the cart |
| /checkout | Place an order |
| POST /api/orders | Orders endpoint |

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production Build

```bash
npm run build
npm run start
```

## Documentation

- [STRATEGY.md](STRATEGY.md): rendering strategy for each route
- [BOUNDARY.md](BOUNDARY.md): server and client component boundary
