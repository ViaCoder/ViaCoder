# Public managed-consent projection — 2.1.284

`logic.js` is a 59-declaration pure-function closure extracted from the retained
macOS-arm64 original modules, not from a hand-written reimplementation. It
includes dangerous shell/helper commands, filtered environment values, sandbox
and isolation settings, nested policy-helper payloads, canonical JSON hashing,
and the legacy `claudeMd` consent-hash comparison. No account, feature flag,
network, credential store, StorageV5, or render host is imported.

Regenerate offline with `node scripts/extractManagedConsent284.mjs` from the
repository root. Every baseline module must match its retained manifest.
`provenance.json` records module hashes, original UTF-16 offsets and declaration
hashes; the offline host-boundary test checks those records and exercises the
original declarations in a separate VM against the production exports.

Adapters: Node `createHash`; `JSON.stringify` for plain settings JSON. Preserve
the copyright notice and the original declaration text when regenerating. The
existing local dialog remains in place and lists names, not helper bodies.
