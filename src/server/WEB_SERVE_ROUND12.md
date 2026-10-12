# `cc serve` execution boundary (round 12)

> Historical Round 12 slice. Later default interactive ownership, structured
> interactions and real API-key wire/MCP viewer evidence are recorded in
> `docs/parity/WEB_OWNERSHIP_ROUND18.md`, `WEB_INTERACTIONS_ROUND18.md`, and
> `WEB_WIRE_ROUND19.md`. The original source/difference audit below is retained.

This is a **first execution slice**, not a claim that the existing REPL/print
sessions or a complete browser UI have been migrated. No real model call or
deployment is part of the evidence below.

## Upstream reuse and deliberate differences

The fixed local upstream cache is
`../.work/parity-next/round12/web-upstream/` (MIT, copyright 2026 cc-haha).
`src_server_services_sessionTurnEvents.ts` SHA-256
`d4213a159118e3eaddc4816399340e426f2f762829dcdfa54b6688abf721582e`
is copied verbatim after a three-line provenance header into
`src/server/sessionTurnEvents.ts`; the exact MIT notice is retained as
`src/server/UPSTREAM_MIT.LICENSE`. `ServeSession` uses its
`emitSessionTurnEvent` at turn admission, SDK input commit, output, and stop.

The upstream `src_server_ws_handler.ts::handleUserMessage` admits a user turn,
routes it to the CLI transport, and calls `emitSessionTurnEvent`; the local
`ServeSession.enqueueTurn`/`pump`/`receive` are a limited host adapter to the
existing local `-p --input-format=stream-json --output-format=stream-json`
worker, **not** a copy of the upstream WebSocket handler. The upstream
`src_server_services_conversationService.ts::respondToPermission` sends the
SDK `control_response`; the local first-valid-answer transition is in
`ServeSession.answerApproval`. It currently omits upstream permission-rule
updates, automatic-question stripping, and `buildDenyMessage`'s tool-specific
denial text. For the development text client, an allow answer without an
edited input retains the pending SDK tool input instead of sending an empty
object. These are behavior differences, not source equivalence.

`src_server_services_sessionCollaborationService.ts` SHA-256
`7c9523b7ef57b91df62ed6042d11caf225616b63fbfdc05e45967e17421ccc2f`
persists team/collaboration members, cross-session messages, and stop fences;
its dependencies require a session service and runtime callbacks. It is not a
generic Web event journal or operation table. The cached
`src_server_services_sessionCollaborationHost.ts` also depends on the upstream
session/conversation/repository service closure absent locally. Copying the
upstream `src_server_sessionManager.ts` (SHA-256
`f39776e5d683466e83bf8477642045f44045122cc9108b21ccf956f76bb4fcb5`)
would copy a noop skeleton rather than supply that host. Accordingly,
`ServeJournal` is explicitly local Bun SQLite glue: full event pages and
operation IDs on disk, no 1024-event replay expiry or 4096-operation lifetime
stop. This is an implementation difference to revisit when the actual upstream
host dependency closure is available, not invented upstream parity.

## Actual single writer and entrypoints

`src/main.tsx` registers `cc serve`; `startServe` owns the `ServeSessionHub`.
Each session starts **one** existing local headless CLI worker through
`createExistingHeadlessCliTransport`. The `-p` worker owns query/tool execution;
`ServeSession` serializes its stdin, allows one active turn, queues subsequent
turns, and sends one SDK response to the first valid approval. Web HTTP and
`cc serve attach` both enter the same queue. The terminal attach command is a
**development text-only protocol client**, not a replacement for the existing
REPL; it does not start its own worker. It renders assistant text and approval
prompts only, not tool panes, modes, or other REPL UI. It rejects malformed or
gapped history/live events and unexpected WebSocket closure instead of silently
dropping them; reattachment starts from disk history, but automatic reconnect
is not implemented. The server closes a viewer on Bun WebSocket drop/backpressure
rather than silently skip an event; a failing viewer cannot stop the SDK worker.
Client-provided `source` is only display metadata; it is
not an authorization claim.

Event sequence and idempotency are host-owned SQLite state in the current
process. Pages remain queryable past 1200 events and operation IDs past 4100.
There is a transient 64-waiting-turn backpressure limit, not a lifetime limit;
request body and malformed single-frame size guards still exist. The journal
is **not** a completed crash-recovery/session-resume protocol: after a process
restart, live worker ownership, pending approvals and queued turns are not
reconstructed. Until recovery semantics exist, do not treat persisted
`queued: true` as proof a lost worker actually executed the turn.

Default bind is `127.0.0.1` with a generated token. `--lan` selects a private
RFC1918 interface explicitly; no wildcard/public bind. `--no-auth` is an
explicit opt-in. Browser Origin/Sec-Fetch-Site and literal bound-Host checks
block arbitrary cross-origin browser access; the token is printed to the
terminal, not returned in the static Web assets. A separately owned responsive
React UI now has a static route; its visual and full-feature acceptance is
separate from this backend evidence.

Round 15 API additions for the separate Web UI owner: authenticated
`GET /v1/sessions` returns `{ sessions: ServeSnapshot[] }`, including creation
time and the public SDK capability snapshot. `sdk_ready.capabilities` is
projected from this worker's actual SDK initialize response (headless command
projection from `buildInitializeResponse`/`projectSdkCommands`, model catalog,
output styles and permission mode) and system-init capabilities/tools. The
projection uses existing `SlashCommandSchema`/`ModelInfoSchema`, whitelists
fields and **does not journal raw system init, account, auth source or local
paths**. A later real SDK `commands_changed` frame emits
`capabilities_changed`; it does not invent support for Ink-only commands.
`turn_queued.content` journals the actual submitted text so another client can
render the input. `permission_request.request` retains the full SDK approval
request alongside its summary fields. Static `GET /`, `/assets/app.css`, and
`/assets/app.js` delegate to the separately owned `webAssetResponse` after
Host/Origin checks but before API token checks; `/v1/*` remains protected.
Attachments and full slash-command execution parity still
require additional host/UI integration, not a guessed capabilities flag.

## Precise remaining REPL/print integration

The following section records the round-12/15 baseline; see the round-16
update at the end of this document for the explicit shared-TUI adapter.

The ordinary terminal `REPL` is still launched at `src/main.tsx`'s
`launchRepl(...)` paths (normal path near line 3830; resume/remote branches
earlier) and executes `query(...)` in `src/screens/REPL.tsx::onQueryImpl`
(near line 2830). Headless print has its own
`src/cli/print.ts::runHeadlessStreaming` (near line 996). Neither registers its
existing in-process worker with this `cc serve` hub. Merely assigning a
`source: 'terminal'` field or spawning a fresh `-p` for the same session ID
would give two owners and is **not** the requested immediate-visibility path.
The main integration must choose one owner and route the ordinary terminal
REPL/print input, output, permissions, and resume transitions through that
same owner or attach them as clients to it. The present `serve` command
provides a real attach client but does not change ordinary REPL/print.

There is an existing **mature terminal rendering candidate** to reuse, rather
than expanding the text-only client: `src/screens/REPL.tsx` already renders
remote SDK messages through `useDirectConnect` and
`src/remote/sdkMessageAdapter.ts`, with permission UI and modes. Its current
`DirectConnectSessionManager` (`src/server/directConnectManager.ts`) expects
raw SDK frames bidirectionally on a WebSocket plus the older `/sessions`
creation response; the new `/v1/sessions/:id/ws` sends numbered event
envelopes and accepts operations over HTTP only. These protocols are **not
interchangeable**. A main-thread integration should adapt the existing
DirectConnect transport/UI to the one-writer service and test history/stream
deduplication, permissions, tools, modes, interrupts, and resume before
calling it a full terminal client. No REPL/print/direct-connect files were
changed in this slice.

## Evidence and boundary

Own-source offline tests are `tests/web-serve-{session,journal,http,terminal,cli}-round12.test.ts`.
`tests/web-serve-terminal-protocol-round12.test.ts` additionally tests history
gaps, live gaps and dropped connections. Round 15 adds
`tests/web-serve-capabilities-round15.test.ts` for the real event/list contract,
`tests/web-serve-command-round15.test.ts` for a real worker's catalog and
offline `/reload-skills` execution, and
`tests/web-serve-assets-route-round15.test.ts` for static UI/auth separation.
The isolated-HOME suite of these nine files passed **19 tests / 109 assertions**
on macOS with a local loopback
listener; the server modules transpiled with Bun, and the vendored event
module matches the upstream file exactly after its provenance header.
The round-15 targeted TypeScript project for `src/server/{serve,serveSession,
serveTransport,serveJournal,serveCapabilities,attachTerminal}.ts` passed with
zero diagnostics; the three `serveTransport.ts` Bun stdin union errors from
the wider snapshot were removed by runtime type narrowing.
They use a fixed local stream-json fixture; one test starts the **real local
CLI** and verifies SDK initialize with no user turn/model request, and another
sends `/reload-skills` to that same kind of worker with an inert local API
endpoint, verifying successful local-command output without a model call. The
terminal/Web test verifies both clients against one fixture worker, ordered
turns and one approval response. These are not the upstream official suite.
No browser UI, live model turn, ordinary REPL sharing, restart recovery, or
full upstream permission semantics has been acceptance-tested.

## Round 16: explicit ordinary-REPL renderer attachment

`cc serve tui <session-id>` now rewrites to the existing `launchRepl` branch,
passing a `protocol: 'serve'` DirectConnect config. The existing `REPL.tsx`
renderer, `useDirectConnect`, `sdkMessageAdapter`, permission UI and local
command registry are reused; the readline development client is not the TUI.
`ServeDirectConnectSessionManager` pages numbered disk events, verifies
contiguous sequence IDs, opens the WebSocket at that cursor, suppresses its
own optimistic user echo, renders Web-origin user turns, forwards SDK frames,
and closes an approval dialog when another viewer responds. All writes go to
the same HTTP queue and service-owned CLI worker; no second model loop exists
inside the adapter. Deliberate React unmount does not report transport loss.

The authenticated `POST /v1/sessions/:id/controls` maps only actual SDK
`interrupt`, `set_model`, `set_permission_mode`, and `get_plan` requests to
the existing worker. The exact upstream contract is recovered in
`src/entrypoints/sdk/controlTypes.ts` and handled by `src/cli/print.ts` near
its corresponding subtype cases. This is host wiring, not a new model/mode
engine. A matching `control_response` is required for acceptance; a mere
stdin write is insufficient. `get_plan` is projected to `{exists,content}`
without the worker's path. Raw SDK control errors and initialize account/auth
fields are not journaled. The Web boundary rejects extra/unknown control
fields and bypass-permissions mode. The real REPL's existing text and
base64-image input blocks now pass through the same turn queue, subject to
the existing 16 MiB HTTP request limit. `set_permission_mode` changes the
public capability snapshot only after a successful SDK response.

This is an **explicit** terminal attachment. Default `cc` and `-p` still use
their separate query owners and do not automatically appear in Web. The
ordinary REPL's local-JSX slash commands execute in its own process while
headless worker commands execute in the worker; there is not yet one command
host/capability catalog for every slash command. `/clear` must remain routed
through the existing print worker, including its `sessionResetKey` MCP
invalidations; the Web adapter does not clear UI state or reconnect V2 MCP
itself. Permission-rule persistence, tool-specific denial messages,
cross-client mode broadcasts, full attachment rendering, restart/resume and
full PTY/Ink acceptance remain open. Backend HTTP/WS+adapter tests and
real-worker **idle** control ACKs are not a live model or a full REPL PTY test.

Own-source round-16 additions are
`tests/web-serve-controls-round16.test.ts` and
`tests/web-serve-repl-adapter-round16.test.ts`, alongside the existing
round-12/15 backend tests. The fixed SDK fixture uses the same control and
turn frame shapes as the recovered official schemas. The CLI help route was
also checked without invoking a model. The tests are not an official suite.
The final 11-file isolated-HOME backend suite passed **23 tests / 145
assertions**. Bun transpilation of the five changed runtime entry files
passed. A targeted TypeScript run reported no diagnostics in this backend,
adapter, hook or new tests; the wider transitive project still reports
unrelated diagnostics, so this is not a whole-repository typecheck claim.
