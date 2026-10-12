# MCP public text host continuation — official npm 2.1.283

## Integrated

- `mcp/index.ts.loadNonInteractive` and the existing 13-command registry both load the actual text handler. Direct public slash dispatch does not mount MCP UI. Goal index/test and clear UUID/query paths were not modified in this continuation.
- `mcp-noninteractive.ts` uses an explicit owning `commandRuntime.mcp` first, otherwise the React-free local manager in `services/mcp/localCommandHost.ts`. `setEnabled(name, enabled)` is an optional desired-state extension; older injected hosts retain `reconnect(name)` / `toggle(name)` compatibility.
- The local host calls the existing real connection/cache/discovery services, publishes clients/tools/prompts/resources to AppState and current command options, persists enable/disable before cleanup, serializes per-server actions, and confirms saved state. No success is counted before a real result.
- Fresh local config loading preserves enterprise exclusivity, allow/deny rules, enabled settings sources, project approval and plugin-only/enabled-plugin gates. Missing/stale sources are not promoted from cached state into approved configs. Policy/config is rechecked after dial/refresh. Off-box and privately owned SDK/attached sources are not locally mutated.
- Tools/prompts/resources list_changed notifications invalidate the corresponding discovery cache and refresh the live public pools. Removed resources are actually deleted; unrelated servers and generic resource tools are retained/deduplicated. A revoked live source is disconnected and its exposed discovery removed.
- Official `Be` supports status/reconnect/enable/disable, **not `/mcp refresh`**. Refresh is automatic via list_changed or explicit named reconnect. The host keeps this contract.
- `clearServerCache` no longer starts a new connection while trying to invalidate one. It detaches intentional close callbacks and does not evict a newer entry installed during awaited cleanup. Shared discovery was extracted from `reconnectMcpServerImpl` without replacing permission wrappers or auth transports. Existing parallel Chrome/type changes in client.ts were retained.

## Evidence

`host-evidence-2.1.283.json` records raw module and exact source-span SHA-256 values:

- chunk-qmbtrg7a `Be`: text contract and actual result counting.
- chunk-dkwvvm62 `wqt/eeo/c0e/cir/dir`: explicit owning manager controls.
- chunk-mzg9kbjz `eye` (`Zo`, `An`, `No` closures) / `P9e`: manager reconnect, persist-before-close toggle, discovery/notifications and disposal.
- chunk-gg4jhzsm `lt/Ge/_o`: no-dial cache cleanup and real reconnect/discovery.
- chunk-wyjbafrm `Ff/zR/CVe/Uo`: policy/source resolution and persisted enabled-state functions.

This is an adaptation to the current public AppState/connection service, not the full newer private runtime/storageV5 implementation.

## Actual offline validation

Reviewed the existing stdio/LSP/Chrome suites first. Reused stdio/LSP tests instead of duplicating their transport smoke tests. Added `tests/mcp-command-host.test.ts` and real SDK HTTP fixture `tests/fixtures/mcp-http.ts`, bound exclusively to 127.0.0.1 ephemeral ports. HOME/config are pre-isolated by tests/setup.ts; fetch allows only active fixture origins and axios is blocked.

Final run with CC_OFFICIAL_RAW: **29 pass, 0 fail, 392 assertions, 6 files**:

- mcp-command-host (5): raw evidence, registry/public slash HTTP lifecycle and list_changed, policy/source/project-approval gates with zero requests, private/off-box unsupported and no-dial eviction, partial real connection failures/cancellation.
- mcp-host-offline, lsp-offline, noninteractive-commands, command-registry-integration, goal.

Actual registry probe: interactive 54 / noninteractive 53; handler errors 0; missing handlers 0; networkAttempts []. This probe loads handlers only; HTTP command execution is separately covered above.

Sandbox blocked opening loopback sockets on the first attempt; the final passing command was run with reviewed loopback-test permission. No skipped/pass-on-error socket test. No real accounts/models/remote servers or deployment/commit.

## Remaining boundaries (do not advertise full MCP parity)

- Private SDK-injected/dynamic/attached-host pools and claude.ai proxy ownership remain unsupported by the local default. Their owner must supply runtime controls; no state-only fake success.
- Full official cached discovery/storageV5, auth identity epochs, recovery/backoff supervisor, cloud OAuth/step-up/revocation and private project-disabled semantics remain incomplete. Local unexpected close is exposed as failed; explicit reconnect works, automatic retry supervisor was not added.
- Local headless connections keep the real client's default elicitation **cancel** handler rather than fabricating UI/SDK consent. Private approval handoff and channel registration are not restored here. Existing tool permission checks remain on the actual tool wrappers.
- SSE/WebSocket use the existing transport implementations but were not exercised by this new suite. HTTP and existing stdio/LSP are verified offline; no live OAuth/provider validation.
- The new host is registered for ordinary local noninteractive commands. Existing React manager lifecycle and private print control-message pools were not reworked; no Tool.ts/REPL/print.ts/model/effort edits in this continuation.
- Full repository typecheck/regression remains with main; these targeted tests and probe are not proof of whole-repository parity.
