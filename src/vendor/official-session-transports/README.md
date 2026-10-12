# Session transport recovery — 2.1.283

Source: locally extracted, integrity-checked official npm darwin-arm64 modules.
`evidence.json` records source hashes, symbols, adaptations and test scope.

- `sse-parser.js` and `response-body.js` are complete, unmodified official modules.
- `protocol.js` preserves the original client-platform and credential-header functions.
- `SSETransport` consumes the parser, proxy/TLS settings, durable cursor rules,
  source checks, reconnect behavior and bounded response draining.
- `ccrClient` retains its own event envelopes and protocol. SSE's direct POST
  is not substituted for the normal CCR write path.

Run `bun test tests/session-transports-offline.test.ts` for localhost-only HTTP,
HTTPS, proxy, WebSocket, factory and CCR initialization/write/ACK coverage.
The local fixture CA, credentials and server responses are synthetic.

## Remaining boundaries

This is not complete remote-session parity. `RemoteIO` still selects CCR V2 by
its existing flag; its ws(s) input boundary and CCR's http(s) precondition need
caller-level recovery before changing the default transport. The complete bridge
initialization order, batching, heartbeat and resume lifecycle are not restored.

Keepalive negotiation, heartbeat-probe/owner-present consumers, non-origin 403
recovery, deferred delivery and attestation remain incomplete. External enterprise
proxies, mTLS, Node dispatchers and real remote accounts were not validated.
No private feature gate is enabled by this recovery.
