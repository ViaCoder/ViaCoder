import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { hostTarget, checkBun } from '../../packaging/platform.ts'
import { createSource, verifySource } from '../../packaging/source.ts'
import { installSource } from '../../packaging/installer.ts'
import { isolatedEnv, run } from '../../packaging/verify.ts'
const repo = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const [phase, expectedTarget] = process.argv.slice(2)
const reportDir = join(repo, 'ci-results'); mkdirSync(reportDir, { recursive: true })
const report = { phase, expectedTarget, bun: Bun.version,
  realAccountConfigured: false, source: 'native GitHub runner; self-authored offline fixtures', status: 'running' }
try {
  checkBun()
  const target = hostTarget(); report.target = target
  if (target !== expectedTarget) throw Error(`Runner mismatch: ${target} != ${expectedTarget}`)
  const pkg = JSON.parse(readFileSync(join(repo, 'package.json'), 'utf8')); report.version = pkg.version
  if (pkg.version !== '2.1.287') throw Error('CI baseline must remain 2.1.287')
  if (phase === 'facts') {
    report.architecture = process.arch
    report.platform = process.platform
  } else if (phase === 'tests') {
    const files = ['tests/web-ui-records.test.ts', 'tests/web-ui-askuser-round18.test.ts',
      'tests/web-composer-command-menu-20260928.test.tsx', 'tests/web-compact-summary-card.test.tsx',
      'tests/release-file-identity.test.ts']
    const home = mkdtempSync(join(tmpdir(), 'viacoder-ci-tests-'))
    try {
      const result = Bun.spawnSync([process.execPath, '--no-env-file', 'test', ...files],
        { cwd: repo, env: isolatedEnv(home), stdout: 'pipe', stderr: 'pipe', timeout: 180_000 })
      process.stdout.write(result.stdout); process.stderr.write(result.stderr)
      report.fixtureFiles = files
      if (result.exitCode !== 0) throw Error(`Offline fixtures failed (${result.exitCode})`)
    } finally { rmSync(home, { recursive: true, force: true }) }
  } else if (phase === 'install') {
    const temp = mkdtempSync(join(tmpdir(), 'viacoder-ci-native-'))
    try {
      const artifact = createSource(repo, join(temp, 'artifact'))
      const manifest = verifySource(artifact)
      const prefix = join(temp, 'prefix'), binDir = join(temp, 'bin')
      // Real frozen target-native dependencies and installer, not an InstallIO fixture.
      const installed = await installSource(artifact, { prefix, binDir, offline: false })
      const home = join(temp, 'launch-home'); mkdirSync(home)
      const launcher = join(binDir, process.platform === 'win32' ? 'viacoder.ps1' : 'viacoder')
      const args = process.platform === 'win32'
        ? ['pwsh', '-NoProfile', '-File', launcher, '--version'] : [launcher, '--version']
      const version = run(args, home, isolatedEnv(home)).trim()
      if (version !== '2.1.287 (Claude Code)') throw Error(`Public launcher version mismatch: ${version}`)
      report.payloadFiles = manifest.files.length
      report.launcher = process.platform === 'win32' ? 'viacoder.ps1' : 'viacoder'
      report.nativeInstall = true
      report.installedManifestVerified = verifySource(installed, true).version === pkg.version
      report.boundaries = ['No real account/model requests', 'CLI help/version, sharp/ripgrep and Web build verified by installer',
        'No graphical desktop/Chrome extension acceptance', 'No full cross-platform function/parity claim']
    } finally { rmSync(temp, { recursive: true, force: true }) }
  } else throw Error(`Unknown CI phase: ${phase}`)
  report.status = 'passed'
} catch (error) {
  report.status = 'failed'
  report.error = error instanceof Error ? error.message : String(error)
  process.exitCode = 1
} finally {
  writeFileSync(join(reportDir, `${phase}-${expectedTarget}.json`), JSON.stringify(report, null, 2) + '\n')
  console.log(JSON.stringify(report))
}
