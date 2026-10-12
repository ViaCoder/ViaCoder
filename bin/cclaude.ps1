param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]] $Arguments
)

$ErrorActionPreference = 'Stop'
# Stable installer ownership marker; keep this line across launcher template revisions.
# CC-MANAGED-LAUNCHER:v1 __CC_INSTALL_PREFIX_B64__
$managedPrefixB64 = '__CC_INSTALL_PREFIX_B64__'
if ($managedPrefixB64 -ne '__CC_INSTALL_PREFIX_B64__' -and $managedPrefixB64.Length -gt 0) {
  $env:CC_INSTALL_PREFIX = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($managedPrefixB64))
}

$root = $null
if ($env:CC_INSTALL_PREFIX) {
  $current = Join-Path $env:CC_INSTALL_PREFIX 'current'
  if (-not (Test-Path -LiteralPath $current -PathType Leaf)) {
    [Console]::Error.WriteLine("No current release pointer at: $current")
    exit 1
  }
  $release = [IO.File]::ReadAllText($current).TrimEnd("`r", "`n")
  if ($release -notmatch '^releases/[A-Za-z0-9.-]+$') {
    [Console]::Error.WriteLine("Invalid current release pointer: $current")
    exit 1
  }
  $releasePath = Join-Path $env:CC_INSTALL_PREFIX ($release -replace '/', [IO.Path]::DirectorySeparatorChar)
  if (-not (Test-Path -LiteralPath (Join-Path $releasePath 'src/entrypoints/cli.tsx') -PathType Leaf)) {
    [Console]::Error.WriteLine("Current release payload is missing: $releasePath")
    exit 1
  }
  $root = (Resolve-Path -LiteralPath $releasePath).Path
} else {
  $candidate = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
  if (Test-Path -LiteralPath (Join-Path $candidate 'src/entrypoints/cli.tsx') -PathType Leaf) {
    $root = $candidate
  } else {
    [Console]::Error.WriteLine('Set CC_INSTALL_PREFIX or invoke the launcher from a source release.')
    exit 1
  }
}

$bun = $env:BUN_BIN
if (-not $bun) {
  $command = Get-Command bun -ErrorAction SilentlyContinue
  if ($command) { $bun = $command.Source }
}
if (-not $bun -and $env:BUN_INSTALL) {
  $candidate = Join-Path $env:BUN_INSTALL 'bin/bun.exe'
  if (Test-Path -LiteralPath $candidate -PathType Leaf) { $bun = $candidate }
}
if (-not $bun -and $HOME) {
  $candidate = Join-Path $HOME '.bun/bin/bun.exe'
  if (Test-Path -LiteralPath $candidate -PathType Leaf) { $bun = $candidate }
}
if (-not $bun) {
  [Console]::Error.WriteLine('Bun 1.4.2 was not found; set BUN_BIN or add Bun to PATH.')
  exit 1
}

$version = (& $bun --version 2>$null | Out-String).Trim()
if ($LASTEXITCODE -ne 0 -or $version -ne '1.4.2') {
  [Console]::Error.WriteLine("Bun 1.4.2 is required for this source release; found $version")
  exit 1
}

$entry = Join-Path $root 'src/entrypoints/cli.tsx'
if ($env:CLAUDE_CODE_FORCE_RECOVERY_CLI -eq '1') { $entry = Join-Path $root 'src/localRecoveryCli.ts' }
$bunArgs = @('--feature=TRANSCRIPT_CLASSIFIER', "--config=$(Join-Path $root 'packaging/runtime.bunfig.toml')", '--preload', (Join-Path $root 'preload.ts'))
if ($env:CC_ENV_FILE) {
  if (-not (Test-Path -LiteralPath $env:CC_ENV_FILE -PathType Leaf)) {
    [Console]::Error.WriteLine("CC_ENV_FILE does not exist: $env:CC_ENV_FILE")
    exit 1
  }
  $bunArgs += "--env-file=$($env:CC_ENV_FILE)"
} elseif (Test-Path -LiteralPath (Join-Path $root '.env') -PathType Leaf) {
  $bunArgs += "--env-file=$(Join-Path $root '.env')"
}

& $bun @bunArgs $entry @Arguments
exit $LASTEXITCODE
