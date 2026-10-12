# Current 2.1.287 owner binding

`state.js` is now a compatibility re-export of `canonical287.ts`. Public command,
request-header and UI consumers use the existing execution-host cell `qn` in
`officialHooksLifecycle287`; no independent 286 root or state allocator runs.
`continuation287.js` restores 15 complete original 287 declarations around that
same cell. Regenerate/check them with `scripts/official/low-priority-owner-287.mjs`.

The 286 `provenance.json`, generator, contrast fixtures and notes below are
historical evidence, not validation or regeneration of the current runtime.
Old isolated-host and error-constructor fixtures are skipped when incompatible;
current accepted runtime scopes are recorded in `WORK_PLAN_287.md`.

---

# Official low-priority state (2.1.286)

The state machine is recovered from the pinned local official npm 2.1.286 darwin-arm64 source. Its complete original declarations are copied verbatim; local edits are limited to host/import bindings and compatibility exports. `provenance.json` records SHA-256 hashes and UTF-16 source ranges for each complete declaration and imported dependency. The exact local source module is `chunk-tx79xqc5.js` (manifest SHA-256 `9c1e53986aa126f85e625401314cc5e1ef9e3250f7f7067894f2cb662cc9a069`).

## Recovery and verification

Run from the repository root, in the offline fixture:

```sh
bun scripts/official/vendor-low-priority-286.mjs \
  [private-reference-not-distributed] \
  [private-reference-not-distributed] --recover
bun scripts/official/vendor-low-priority-286.mjs \
  [private-reference-not-distributed] \
  [private-reference-not-distributed] --verify
bun test tests/low-priority-shared-host-286.test.ts tests/low-priority.test.ts tests/low-priority-ui.test.ts
```

`recover.mjs` and `verify.mjs` are compatibility launchers for the same 2.1.286 generator/verifier. The generator hash-checks the official manifest and imported modules, captures the full state/offer/budget/timer declaration closure, and compares all mapped declarations with the pinned 2.1.284 source. The comparison found **77/77** declarations with matching AST structure and literal values; the full 2.1.286 source statements are still emitted and independently hash-verified rather than substituting 2.1.284 text.

## Shared host contract

- The official declarations retain `R8`, `x8 = new q(R8)`, `Vn() => x8.of(j().host)`, and `iNe`; the exact source ranges for these and wrapper consumers `CM`, `$M`, and `s9` are also checked against the existing `officialFetchWrapper286/runtime.provenance.json`.
- The app state uses one module-root host and one `K` registry, not a session ID. Normal UI and request callers therefore reach the same state through `mr()`.
- `SharedLowPriorityCell286` is the `q` port adapter for a future wrapper binding: even though the untouched original wrapper evaluates `new q(R8)` inside its factory, that constructible adapter is a singleton and delegates `.of(host)` to the already existing official state registry. It never invokes the wrapper's `R8` factory or creates a second state cell.
- `tests/low-priority-shared-host-286.test.ts` instantiates the actual recovered wrapper with this `q` adapter, accepts one offer through the public app API, dispatches a synthetic `/v1/messages` request, and asserts the wrapper's actual `s9 → iNe → Vn` path adds `anthropic-usage-limit: slow` while the UI still reads the identical state object. It also verifies the actual spinner output.

This does not enable or edit the main-owned `client.ts` or `officialFetchWrapper286` integration. The source/runtime contrast test and injected-port consumer test establish the minimum binding for the main controller to use; the production caller remains outside this change.

## Eligibility and fixture boundary

The implementation retains official treatment/rollout, first-party subscriber, reset, budget, cooldown, and request-source gates. It does not force a product feature flag, mint an offer, broaden source eligibility, or alter third-party policy. Tests use only offline API responses, fake headers, local state, and a fake terminal.

The old SDK fixture failures were caused by fixture drift, not by an auth-freshness guard regression: a bare `ANTHROPIC_API_KEY` in the isolated HOME was not approved by the 2.1.285 API-key selection policy, and the OAuth fixture omitted `user:inference` while mocking the obsolete refresh entrypoint instead of the 2.1.286 `checkAndRefreshOAuthTokenOutcome` consumed by the client. The fixture now supplies the real subscriber scope and stubs that exact refresh-outcome boundary. No auth checks were disabled or relaxed; all focused low-priority SDK, stream, command, and UI tests now pass.
