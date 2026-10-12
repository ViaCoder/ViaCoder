# One-command local Source+Bun release. All validation and promotion remain
# in cc-install.ps1 -> packaging/release.ts; no installer is duplicated here.
param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]] $Arguments
)

Set-StrictMode -Version 2.0
$ErrorActionPreference = 'Stop'

function Show-Usage {
  Write-Output @'
Usage:
  cc-release.ps1 local [--offline|--online] [--prefix DIR] [--bin-dir DIR] [--cache-dir DIR]

Packs the current source and invokes the existing local installer on this
machine. Bun 1.4.3 and target-native dependencies are required. Default
mode is --online; --offline never retries online. Does not configure a
provider or start a service. Native Windows SSH deployment is not an entry
point; use this local command on the Windows target. Existing POSIX remote
deployment remains in cc-release (Bash).
'@
}

if (-not $Arguments -or $Arguments.Count -eq 0) { Show-Usage; exit 2 }
if ($Arguments[0] -eq '--help') { Show-Usage; exit 0 }
if ($Arguments[0] -ne 'local') {
  [Console]::Error.WriteLine('Only local is supported by cc-release.ps1; POSIX remote deployment uses the Bash cc-release entry.')
  exit 2
}

$dependencyMode = '--online'
$installOptions = @()
try {
  for ($i = 1; $i -lt $Arguments.Count; $i++) {
    $flag = $Arguments[$i]
    switch ($flag) {
      '--offline' { $dependencyMode = '--offline' }
      '--online' { $dependencyMode = '--online' }
      { $_ -in '--prefix', '--bin-dir', '--cache-dir' } {
        if ($i + 1 -ge $Arguments.Count -or [string]::IsNullOrWhiteSpace($Arguments[$i + 1]) -or $Arguments[$i + 1].StartsWith('--')) {
          throw "Missing value for $flag."
        }
        $i++
        $installOptions += @($flag, $Arguments[$i])
      }
      default { throw 'Unknown option.' }
    }
  }
} catch {
  [Console]::Error.WriteLine($_.Exception.Message)
  exit 2
}

$root = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$installer = Join-Path $root 'install/cc-install.ps1'
$work = Join-Path ([IO.Path]::GetTempPath()) ('cc-release-' + [Guid]::NewGuid().ToString('N'))
$exitCode = 1
try {
  New-Item -ItemType Directory -Path $work -ErrorAction Stop | Out-Null
  # Capture only pack's JSON result, not an inferred directory or shell text.
  $packOutput = & $installer pack $root $work
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
  $artifact = ($packOutput -join [Environment]::NewLine) | ConvertFrom-Json -ErrorAction Stop
  if ($artifact.root -isnot [string] -or [string]::IsNullOrWhiteSpace($artifact.root)) {
    throw 'Release pack did not return an artifact root.'
  }
  $installArguments = @('install', $artifact.root, $dependencyMode) + $installOptions
  # Array splatting preserves each path as a single argument; no shell eval.
  & $installer @installArguments
  $exitCode = $LASTEXITCODE
} catch {
  [Console]::Error.WriteLine($_.Exception.Message)
  $exitCode = 1
} finally {
  # Remove only this invocation's transient pack directory, never releases.
  if (Test-Path -LiteralPath $work) {
    try { Remove-Item -LiteralPath $work -Recurse -Force -ErrorAction Stop }
    catch {
      [Console]::Error.WriteLine('Temporary release cleanup failed.')
      if ($exitCode -eq 0) { $exitCode = 1 }
    }
  }
}
exit $exitCode
