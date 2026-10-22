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
