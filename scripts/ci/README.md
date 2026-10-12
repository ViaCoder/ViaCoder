# Native platform acceptance

Fixed baseline: Claude Code 2.1.287 / public Bun 1.4.2. No real OAuth, API keys,
model requests or remote desktop credentials are needed by this workflow.

The six native runner jobs check their actual OS/CPU, existing offline Web
fixtures, and the real source installer with target-native sharp/ripgrep,
CLI help/version, Web asset build and public `viacoder` launcher. Dependencies
are downloaded with the frozen lock; tests do not contact model services.
The separate Linux job checks all published files with the original tsconfig
and an 8GiB heap. Private operational records and original Git history are not
published; this job does not replace the local full-workspace check.

The selected fixtures are project tests, not the official test suite. Passing
these jobs does not certify graphical Chrome/computer-use, every public or
private feature, an actual OAuth login, or byte-identical OS/network timing.
Failed jobs stay failed; no automatic model retries or eligibility overrides.
Dispatch `all` for six platforms, `windows` for a Windows-only follow-up, or
`types` for the original-config type check after source changes;
already accepted unaffected jobs do not need to be repeated.

Runner reports contain only runtime/build facts and test status. Artifacts
expire after seven days. No credentials, dependency directory, user session,
source archive, or system environment dump is uploaded as an artifact.
