# One-command release, install, and deployment

`install/cc-release` composes the existing allowlisted `cc-install pack` and
transactional `cc-install install` flows. It builds a source+Bun artifact that
supports target-native dependency installation on macOS/Linux/Windows
amd64/arm64 (six targets). The POSIX entry remains `install/cc-release`;
the Windows local entry is `install/cc-release.ps1`. Neither cross-compiles
native dependencies nor claims a target was tested from another architecture.

```sh
# Current machine (public Bun 1.4.3 and target-native dependencies required).
./install/cc-release local --offline

# Specific host and password file; password contents are consumed only by
# sshpass -f and are not read, copied, placed in argv/env, or printed here.
./install/cc-release deploy --server USER@HOST --password-file /path/to/password-file --online
```

## Windows local one-command entry and six-platform boundaries

Run on the target machine with its matching public Bun **1.4.3**, PowerShell
and `tar` already installed; this command does not download a runtime. Paths
are passed as argument-array elements, including spaces and apostrophes.

```powershell
# Existing target-native dependency cache only; no automatic online retry.
pwsh -NoProfile -File .\install\cc-release.ps1 local --offline
# Optional explicit paths (relative paths retain the caller's working directory).
pwsh -NoProfile -File .\install\cc-release.ps1 local --offline --prefix "C:\CClaude data" --bin-dir "C:\CClaude bin" --cache-dir "C:\Bun cache"
# Only when dependency downloads are explicitly desired:
pwsh -NoProfile -File .\install\cc-release.ps1 local --online
```

The PowerShell entry only composes the existing `cc-install.ps1 pack` then
`cc-install.ps1 install`, using the exact `root` returned by pack's JSON.
It propagates a nonzero pack/install status and removes only its own temporary
pack directory. Allowlisted source selection, manifest/checksum validation,
Bun/platform/frozen-dependency checks, native/CLI smoke checks, the prefix lock
and atomic `current`/rollback promotion stay in `packaging/release.ts` and the
same `packaging/installer.ts`. No second installer/cache, model configuration,
credential migration, service activation or runtime/version change is added.
The PowerShell and Bash one-command wrappers default to `--online`; explicit
`--offline` is forwarded unchanged. The lower-level installer still defaults
to offline when used directly. Windows installs only `viacoder.ps1`; it does not replace the system `cc` command or modify PATH/profile.

| Source+Bun target | Local one-command entry | Required host boundary |
|---|---|---|
| darwin-x64 / darwin-arm64 | `install/cc-release local` | Bash, tar, matching Bun/native dependencies |
| linux-x64 / linux-arm64 | `install/cc-release local` | Bash, tar, matching Bun/native dependencies; glibc >= 2.26, not musl |
| win32-x64 / win32-arm64 | `install/cc-release.ps1 local` | PowerShell, tar, matching Bun/native dependencies; no separate sharp-libvips Windows package |

These are source/installer target contracts, not six-platform execution
certificates. The local PowerShell entry has **no `deploy`, SSH, password-file
or POSIX remote-command mode**. Native Windows SSH targets are not routed
through the Bash installer. WSL uses its own Linux environment and is not a
Windows-native target. Existing POSIX `cc-release deploy` remains unchanged;
its systemd user-service lifecycle requires a supported Linux/systemd host,
not a Windows service (nor an implicit macOS launchd implementation). Historical
four-platform evidence elsewhere is not extended into Windows execution
acceptance by this entry. This batch adds source wiring; real Windows
PowerShell/Bun/native install and per-target validation remain release gates.

Deploy also requires `sshpass`, OpenSSH `ssh`/`scp`, `tar`, and `sha256sum` on
the controller, plus Bun 1.4.3 on the target. SSH host-key checking retains
the OpenSSH defaults. The deploy command packs locally, transfers only the
archive and checksum to a generated temporary directory, verifies SHA256 on
the target, then invokes the existing installer there with remote lifecycle
enabled. Target architecture, glibc, frozen package dependencies, CLI/native
smoke checks and atomic rollback state are evaluated by that installer. Under
its existing prefix lock, remote deployment makes a fresh activity query just
before pointer promotion; active or unknown CLI/Web/terminal work holds the
switch. After promotion it enables/restarts the user `cc-serve.service` and
requires a ready response matching the installed version manifest. Service or
ready failure restores the exact prior pointers and attempts old-service
recovery. Local install does not start a service or configure a provider.
Temporary transfer data is removed after
success; on failure it is retained for diagnosis and can be removed manually.
No credentials/configuration are included in the artifact. The script never
uses xtrace and does not expose a password value to shell arguments or logs.

`packaging/cc-serve.service` is a conservative **systemd user unit** template
for Linux. Remote lifecycle installs only this user unit and refuses to
overwrite a differing existing unit. Manual service management, when desired,
remains user-scoped:

```sh
mkdir -p "$HOME/.config/systemd/user"
install -m 0644 packaging/cc-serve.service "$HOME/.config/systemd/user/cc-serve.service"
systemctl --user daemon-reload
systemctl --user enable --now cc-serve.service
```

The public command is `viacoder` (`viacoder serve` for Web); no `cclaude` alias is installed;
the system compiler `cc` is never created or replaced.

## Final source and work-record delivery

After release acceptance and deployment, use the **same verified source artifact**
for the requested Downloads handoff. This command never reads login credentials
or copies user sessions, dependency caches, Git, or arbitrary logs:

```sh
./install/cc-install delivery ARTIFACT_DIR RECORDS_DIR OUTPUT_DIR METADATA_JSON
```

`RECORDS_DIR` contains only the documented work-record allowlist. The metadata
identifies the official version, exact artifact build ID, P/C commits and known
boundaries; it does not silently mark tests or platforms as passed. The command
creates a checksummed source/records bundle and does not deploy or restart a
service. Use the existing archive/transfer flow only after the release gates and
a fresh active-task check. Preserve the prior immutable version for rollback.
