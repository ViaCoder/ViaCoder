param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]] $Arguments
)

$ErrorActionPreference = 'Stop'
$root = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
if (-not $env:HOME) { $env:HOME = $env:USERPROFILE }
if (-not $env:HOME) {
  [Console]::Error.WriteLine('HOME or USERPROFILE is required.')
  exit 1
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
  [Console]::Error.WriteLine('Set BUN_BIN or add Bun 1.4.2 to PATH.')
  exit 1
}

& $bun --no-env-file "--config=$(Join-Path $root 'packaging/runtime.bunfig.toml')" (Join-Path $root 'packaging/release.ts') @Arguments
exit $LASTEXITCODE
