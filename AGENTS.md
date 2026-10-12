# ViaCoder work entry

Read `docs/current/HANDOFF.md` and `docs/current/PUBLICATION.md` before changing or releasing this repository. Baseline is Claude Code 2.1.287 and public Bun 1.4.3. Prefer complete original functions and existing owner/caller chains. Preserve accepted local behavior; keep P (official alignment/runtime adaptation) and C (local customization/distribution) commits separate.

Tests use isolated HOME and synthetic local services. Do not infer real-account, desktop or all-platform acceptance from source comparisons or fixture success. Do not add credentials, user sessions, local operational evidence or dependency caches to Git.

## Credentials

Use PassManager MCP or CLI; call list first. Never ask for, print, log or store plaintext passwords, tokens or keys. HTTP/SSH/SCP use only secret placeholders; stored base URLs stay placeholders too. HTTPS Git uses ordinary URLs through PassManager git-proxy. SSH Git uses PassManager ssh-agent. Handle locked, unbound/missing credentials and changed-host-key errors through the user-managed service; do not bypass them. CI uses ephemeral GitHub Actions credentials, not a personal PAT.
