# ViaCoder 2.1.287 — current public handoff

## Source and scope

- Fixed ordinary public-client baseline: Claude Code 2.1.287. Keep accepted local
  customizations in their existing owner paths; do not turn private-host or
  account-gated conditions into fake-success implementations.
- Runtime pin: public Bun 1.4.3. SDK dependency: 0.127.0. Public CLI is
  `viacoder`; Web entry is `viacoder serve`. Internal Claude protocol/UA/session
  names remain compatible.
- The latest SDK settings-namespace correction removed one partial host case.
  Actual init/open-stream and in-flight cancel reached their corresponding
  fixed loopback POST/RST(8) contracts. H2 stream-credit/response-chunk
  scheduling differences remain explicit runtime boundaries, not byte-for-byte
  parity claims. The private source successor passed its local type and physical archive
  gates; public export and six native CI gates remain independent.

## Build and finite checks

From the repository root after acquiring the pinned public dependencies:

```sh
bun install --frozen-lockfile --ignore-scripts --registry=https://registry.npmjs.org
node --max-old-space-size=8192 node_modules/typescript/bin/tsc --noEmit --project tsconfig.json
bun --no-env-file test tests/web-ui-records.test.ts tests/web-ui-askuser-round18.test.ts tests/web-composer-command-menu-20260928.test.tsx tests/web-compact-summary-card.test.tsx tests/release-file-identity.test.ts
bun --no-env-file test tests/native-distribution-287.test.ts
bun --no-env-file --config=packaging/runtime.bunfig.toml scripts/ci/native-platform.mjs facts TARGET
bun --no-env-file --config=packaging/runtime.bunfig.toml scripts/ci/native-platform.mjs tests TARGET
bun --no-env-file --config=packaging/runtime.bunfig.toml scripts/ci/native-platform.mjs install TARGET
bun --no-env-file --config=packaging/runtime.bunfig.toml scripts/ci/distribution-287.mjs TARGET
```

`TARGET` is one of `darwin-x64`, `darwin-arm64`, `linux-x64`, `linux-arm64`,
`win32-x64`, `win32-arm64`, on its matching native runner. Dependency install
and native package acquisition are networked CI steps, not offline privacy
checks. The original full `tsconfig.json` check requires 8 GiB Node heap; a
small direct-file check is not equivalent. Native CI validates the named
offline interaction fixtures and physical package install, not graphical
desktop/Chrome, real OAuth/model traffic or every protocol condition.

## Recovery and provenance

The portable `scripts/official/extract.py`, `index.mjs`,
`version-diff-local.mjs`, `provenance-records.mjs`,
`current-registration-review.mjs` and its `registration-inventory.mjs`
dependency operate on an explicit, separately
obtained/hash-verified official package extraction. Private developer paths or
historical evidence directories are not inputs supplied by this repository.
Source provenance keeps hashes and UTF-16 end-exclusive declaration ranges.
Portable recovery of any additional generator must resolve its exact external
input contract before use; no private fixture tree is bundled.

## Publication and package identity

The initial C import is an explicitly mixed accepted baseline; later P/C
changes remain separate. See `PUBLICATION.md` for the public history policy.
Every intermediate tree/object and the final export require exact privacy
review. Publication author **and** committer are administrator
<admin@example.com>. First host publication is followed by a fresh, full
actual clone and an all-object/privacy/identity scan before any second-host
mirror. No prior private Git history or operational evidence is imported.

The six-platform release archive is a native-runner-produced source+Bun
runtime/dependency distribution with offline install/rollback support, **not**
a single-file executable. Per-platform receipts and checksums are required.
No six-platform graphical desktop acceptance follows merely from CI.

## Known boundaries

- Fixed-287 ordinary public-client logic has accepted finite evidence; neither
  all account qualifications nor private backend behavior is certified.
- R14 manual message/turn editing remains design-only.
- Final release requires the *current* frozen source hashes, whole-repository
  types, protection, installed behavior, exact export transformations, and
  first-host actual clone audit. Earlier package/CI receipts remain tied to
  their own byte snapshots.
- No new real OAuth/model request, remote installation or credentials are
  implied by this handoff.
