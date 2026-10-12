# ViaCoder

<p align="right"><a href="./README.md">中文</a> | <strong>English</strong></p>

A **locally runnable version** organized from the public Claude Code package logic, currently targeting version `2.1.287` (release acceptance is not complete), with support for any Anthropic-compatible API endpoint such as MiniMax and OpenRouter.

> The original leaked source does not run as-is. This repository fixes multiple blocking issues in the startup path so the full Ink TUI can work locally.

## Features

- Full Ink TUI experience (matching the official Claude Code interface)
- `--print` headless mode for scripts and CI
- MCP server, plugin, and Skills support
- Custom API endpoint and model support
- OAuth login, Plan/Goal workflows, effort controls, and low-priority mode
- Fallback Recovery CLI mode

### Supported Platforms

| Platform | Architecture | Source runtime target |
|----------|--------------|---------------------------|
| macOS | arm64 | `darwin-arm64` |
| macOS | amd64/x86_64 | `darwin-x64` |
| Linux (glibc) | arm64/aarch64 | `linux-arm64` |
| Linux (glibc) | amd64/x86_64 | `linux-x64` |
| Windows | arm64 | `win32-arm64` |
| Windows | amd64/x86_64 | `win32-x64` |

Releases are **source + Bun packages, not standalone native executables**. Install production and optional dependencies on each target using its matching Bun architecture. Linux requires glibc >= 2.26; musl is not supported. Six platform targets do not establish six native-host acceptance results; release gates remain open. See [release installation and rollback](packaging/README.md).

The public brand is **ViaCoder**: `viacoder` starts the TUI and `viacoder serve` starts the Web UI. Only `viacoder` is published, leaving the system C compiler’s `cc` name free. The installer retires only confirmed managed `cclaude` and legacy `cc` links; unrelated `cc` entries and `/usr/bin/cc` are untouched.

After installation, launch with `viacoder`. The entry point preserves the caller's working directory, so project settings and existing transcripts under `~/.claude/projects/` remain available. When `CLAUDE_CONFIG_DIR` is unset, it also leaves Claude Code's default `~/.claude` path untouched, including the existing macOS Keychain OAuth credentials.

Linux uses the same `~/.claude` configuration directory and `.credentials.json` OAuth storage with `0600` permissions, rather than creating a second XDG-specific store. arm64/aarch64 and amd64/x86_64 only select the matching runtime.

---

## Architecture Overview

---

## Quick Start

### 1. Install Bun

This project uses the latest publicly published Bun 1.4.2 (release installation requires exactly 1.4.2). The Bun build embedded in the official Claude Code 2.1.284 native package remains a comparison baseline and is not extracted. Install Bun 1.4.2 before installation:

```bash
# macOS / Linux (official install script)
curl -fsSL https://bun.sh/install | bash -s "bun-v1.4.3"
```

If a minimal Linux image reports `unzip is required to install bun`, install `unzip` first:

```bash
# Ubuntu / Debian
apt update && apt install -y unzip
```

```bash
# macOS (Homebrew)
brew install bun
```

After installation, reopen the terminal and verify:

```bash
bun --version
```

### 2. Install project dependencies

```bash
bun install
```

Install the local entry point:

```bash
# Create a credential-free source artifact first (offline):
BUN_BIN="$(command -v bun)" ./install/cc-install pack "$PWD" ../.work/releases
# On the target, from the verified/extracted artifact directory:
# --online explicitly permits dependency downloads; default is --offline.
BUN_BIN="$(command -v bun)" ./install/cc-install install "$PWD" --online
export PATH="$HOME/.local/bin:$PATH"
```

Then launch it from any project directory:

```bash
viacoder
viacoder -c
viacoder --resume
```

### 3. Configure environment variables (optional with existing OAuth)

Copy the example file and fill in your API key:

```bash
# Source checkout only; releases never include .env or credentials.
cp .env.example .env
```

Edit `.env`:

```env
# API authentication (choose one)
ANTHROPIC_API_KEY=sk-xxx          # Standard API key via x-api-key header
ANTHROPIC_AUTH_TOKEN=sk-xxx       # Bearer token via Authorization header

# API endpoint (optional, defaults to Anthropic)
ANTHROPIC_BASE_URL=https://api.minimaxi.com/anthropic

# Model configuration
ANTHROPIC_MODEL=MiniMax-M2.7-highspeed
ANTHROPIC_DEFAULT_SONNET_MODEL=MiniMax-M2.7-highspeed
ANTHROPIC_DEFAULT_HAIKU_MODEL=MiniMax-M2.7-highspeed
ANTHROPIC_DEFAULT_OPUS_MODEL=MiniMax-M2.7-highspeed

# Timeout in milliseconds
API_TIMEOUT_MS=600000

# Disable telemetry and non-essential network traffic
DISABLE_TELEMETRY=1
CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

### 4. Start

#### macOS / Linux (arm64 and amd64)

```bash
# Interactive TUI mode (full interface)
viacoder

# Headless mode (single prompt)
viacoder -p "your prompt here"

# Pipe input
echo "explain this code" | viacoder -p

# Show all options
viacoder --help
```

---

## Environment Variables

| Variable | Required | Description |
|------|------|------|
| `ANTHROPIC_API_KEY` | One of two | API key sent via the `x-api-key` header |
| `ANTHROPIC_AUTH_TOKEN` | One of two | Auth token sent via the `Authorization: Bearer` header |
| `ANTHROPIC_BASE_URL` | No | Custom API endpoint, defaults to Anthropic |
| `ANTHROPIC_MODEL` | No | Default model |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | No | Sonnet-tier model mapping |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | No | Haiku-tier model mapping |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | No | Opus-tier model mapping |
| `API_TIMEOUT_MS` | No | API request timeout, default `600000` (10min) |
| `DISABLE_TELEMETRY` | No | Set to `1` to disable telemetry |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | No | Set to `1` to disable non-essential network traffic |
| `CLAUDE_CODE_OAUTH_SCOPES` | No | Override the OAuth scope list |
| `CLAUDE_CODE_LOW_PRIORITY` | No | Read for compatibility only; official account, quota, and entry conditions decide low-priority mode rather than this variable forcing it |

---

## Fallback Mode

If the full TUI has issues, use the simplified readline-based interaction mode:

```bash
CLAUDE_CODE_FORCE_RECOVERY_CLI=1 viacoder
```

Interactive mode exposes the synchronized `/plan`, `/goal`, model selection, effort, and low-priority commands. OAuth mode uses the first-party scope and token-refresh path.

---

## Fixes Compared with the Original Leaked Source

The leaked source could not run directly. This repository mainly fixes the following issues:

| Issue | Root cause | Fix |
|------|------|------|
| TUI does not start | The entry script routed no-argument startup to the recovery CLI | Restored the full `cli.tsx` entry |
| Startup hangs | The `verify` skill imports a missing `.md` file, causing Bun's text loader to hang indefinitely | Added stub `.md` files |
| `--print` hangs | `filePersistence/types.ts` was missing | Added type stub files |
| `--print` hangs | `ultraplan/prompt.txt` was missing | Added resource stub files |
| **Enter key does nothing** | The `modifiers-napi` native package was missing, `isModifierPressed()` threw, `handleEnter` was interrupted, and `onSubmit` never ran | Added try/catch fault tolerance |
| Setup was skipped | `preload.ts` automatically set `LOCAL_RECOVERY=1`, skipping all initialization | Removed the default setting |

---

## Project Structure

```text
bin/viacoder              # Entry script
preload.ts               # Bun preload (sets MACRO globals)
.env.example             # Environment variable template
src/
├── entrypoints/cli.tsx  # Main CLI entry
├── main.tsx             # Main TUI logic (Commander.js + React/Ink)
├── localRecoveryCli.ts  # Fallback Recovery CLI
├── setup.ts             # Startup initialization
├── screens/REPL.tsx     # Interactive REPL screen
├── ink/                 # Ink terminal rendering engine
├── components/          # UI components
├── tools/               # Agent tools (Bash, Edit, Grep, etc.)
├── commands/            # Slash commands (/commit, /review, etc.)
├── skills/              # Skill system
├── services/            # Service layer (API, MCP, OAuth, etc.)
├── hooks/               # React hooks
└── utils/               # Utility functions
```

---

## Tech Stack

| Category | Technology |
|------|------|
| Runtime | [Bun](https://bun.sh) |
| Language | TypeScript |
| Terminal UI | React + [Ink](https://github.com/vadimdemedes/ink) |
| CLI parsing | Commander.js |
| API | Anthropic SDK |
| Protocols | MCP, LSP |

---

## Disclaimer

This repository is based on the Claude Code source leaked from the Anthropic npm registry on 2026-03-31. All original source code copyrights belong to [Anthropic](https://www.anthropic.com). It is provided for learning and research purposes only.
