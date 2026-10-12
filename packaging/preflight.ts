import { lstatSync, readFileSync } from 'node:fs'
import { checkBun, nativePackages, targetFor, type Target } from './platform.js'

export type HostFacts = {
  schema: 1
  platform: string
  arch: string
  bun: string
  glibc: string | null
}

// Inventory only: no HOME/config/keychain inspection, commands, DNS or network.
export function localFacts(): HostFacts {
  let glibc: string | null = null
  if (process.platform === 'linux') {
    const report = process.report.getReport() as { header: { glibcVersionRuntime?: string } }
    glibc = report.header.glibcVersionRuntime ?? null
  }
  return { schema: 1, platform: process.platform, arch: process.arch, bun: Bun.version, glibc }
}

function isFacts(value: unknown): value is HostFacts {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const v = value as Record<string, unknown>
  return Object.keys(v).length === 5 && v.schema === 1 &&
    typeof v.platform === 'string' && /^[A-Za-z0-9_-]{1,32}$/.test(v.platform) &&
    typeof v.arch === 'string' && /^[A-Za-z0-9_-]{1,32}$/.test(v.arch) &&
    typeof v.bun === 'string' && /^\d{1,6}\.\d{1,6}\.\d{1,6}$/.test(v.bun) &&
    (v.glibc === null || (typeof v.glibc === 'string' && /^\d{1,6}\.\d{1,6}(?:\.\d{1,6})?$/.test(v.glibc)))
}

const remaining = [
  'Confirm these supplied facts belong to the target; no remote identity was verified.',
  'Check destination permissions, free disk space, and the native shell/runtime requirements locally (PowerShell on Windows; Bash on POSIX).',
  'Use the existing target HOME/config/cwd; no credential or session migration is performed.',
  'Verify a trusted artifact, install frozen production dependencies, then run native/CLI smoke at the final physical path.',
  'Only successful install/rollback validation permits the atomic current switch.',
] as const

export type PreflightResult = {
  schema: 1
  target: string
  status: 'blocked' | 'platform-compatible'
  reason: string
  releaseTarget?: Target
  nativeDependencies?: Record<string, string>
  remaining: readonly string[]
}

export function assessDeployment(target: string, facts?: unknown): PreflightResult {
  // A label, never an executable SSH destination. Reject password/control syntax.
  if (target.length > 254 || !/^[A-Za-z0-9._-]+@[A-Za-z0-9][A-Za-z0-9.-]*$/.test(target)) {
    throw Error('Target must be a user@hostname or user@IPv4 label; no password or shell syntax.')
  }
  const base = { schema: 1 as const, target, remaining }
  const blocked = (reason: string): PreflightResult => ({ ...base, status: 'blocked', reason })
  if (facts === undefined) return blocked('Target facts are missing. Do not infer the remote platform from this machine or account name.')
  if (!isFacts(facts)) return blocked('Invalid facts schema. Supply only schema/platform/arch/bun/glibc; Bun must be a stable version.')
  let releaseTarget: Target
  try { releaseTarget = targetFor(facts.platform, facts.arch, facts.glibc ?? undefined) }
  catch { return blocked('Unsupported source-release platform: macOS/Linux/Windows x64/arm64 only; Linux requires glibc >= 2.26. musl/Android are not supported.') }
  try { checkBun(facts.bun) }
  catch { return blocked('Bun 1.4.2 is required on the target for this source release; this preflight does not install a runtime.') }
  return { ...base, status: 'platform-compatible', releaseTarget, nativeDependencies: nativePackages(releaseTarget),
    reason: 'Supplied platform facts are compatible only. This is not an installation or deployment verification.' }
}

export function readFacts(path: string): unknown {
  // Explicit inventory file only. Never discover config files or echo parser input.
  try {
    const stat = lstatSync(path)
    if (!stat.isFile() || stat.size > 4096) throw Error('invalid inventory')
    return JSON.parse(readFileSync(path, 'utf8')) as unknown
  } catch { throw Error('Facts must be a regular JSON inventory file of at most 4096 bytes.') }
}

export function preflightArgs(args: string[]): PreflightResult {
  let target: string | undefined, factsPath: string | undefined
  for (let i = 0; i < args.length; i += 2) {
    const flag = args[i], value = args[i + 1]
    if (!value || value.startsWith('--')) throw Error('Preflight requires --target LABEL and optional --facts FILE.')
    if (flag === '--target' && target === undefined) target = value
    else if (flag === '--facts' && factsPath === undefined) factsPath = value
    else throw Error('Unsupported or repeated preflight option; no credential or transport options are accepted.')
  }
  if (!target) throw Error('Preflight requires --target LABEL.')
  assessDeployment(target) // Validate before opening the explicitly supplied inventory.
  return assessDeployment(target, factsPath === undefined ? undefined : readFacts(factsPath))
}
