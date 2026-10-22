# Redirects

The context of redirecting requests for alternative hosts to the single canonical host that serves
the site.

## Language

**Redirect Rule**: A declarative entry that maps a Source Host to a Canonical Origin and decides
whether the original path and query string survive the redirect. _Avoid_: Rule, Mapping, Redirect
entry

**Source Host**: The host a request arrives for, e.g. `www.maier.tech`. A Source Host is what a
Redirect Rule is matched against. _Avoid_: Incoming host, Origin, Domain

**Canonical Origin**: The single origin all traffic is redirected to, e.g. `https://maier.tech`. It
is the target of every Redirect Rule. _Avoid_: Target, Destination, Redirect URL

**Path & Query Preservation**: Keeping the path and query string of the original request when
redirecting to the Canonical Origin. When preservation is off, the request is redirected to the root
of the Canonical Origin. _Avoid_: Parameter forwarding, URL rewriting

**Unknown Host**: A host that matches no Redirect Rule. Requests for an Unknown Host are answered
with a `404 Not found` response instead of a redirect. _Avoid_: Unmatched host, Invalid host,
Default host
