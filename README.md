# Redirect

A small SvelteKit app that permanently redirects requests for alternative hosts to the canonical
host.

## Redirect rules

Redirect Rules live in [`src/lib/redirect-rules.ts`](src/lib/redirect-rules.ts) as a declarative
table and are resolved by the `handle` hook in [`src/hooks.server.ts`](src/hooks.server.ts).

| Source Host    | Canonical Origin   | Path & Query Preservation |
| :------------- | :----------------- | :------------------------ |
| www.maier.tech | https://maier.tech | preserved                 |

Requests for an Unknown Host get a `404 Not found` response.

## Requirements

- Node >= 22.17
- pnpm

## Getting started

```sh
pnpm install
pnpm run dev
```

The dev server runs on <http://localhost:5173>. Redirects are decided by the `Host` header, so you
can exercise them locally:

```sh
curl -sI -H 'Host: www.maier.tech' 'http://localhost:5173/some/path?a=1'
```

## Scripts

| Script               | Description                                     |
| :------------------- | :---------------------------------------------- |
| `pnpm run dev`       | Starts the dev server                           |
| `pnpm run build`     | Builds the app for production (`build/`)        |
| `pnpm run start`     | Starts the built server (`node build/index.js`) |
| `pnpm run lint`      | Checks formatting and runs ESLint               |
| `pnpm run check`     | Type-checks the project with `svelte-check`     |
| `pnpm run test`      | Runs the unit tests once                        |
| `pnpm run test:unit` | Runs the unit tests in watch mode               |
| `pnpm run format`    | Formats the code with Prettier                  |
