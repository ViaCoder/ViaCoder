/** Native-runner only. The network-dependent step is frozen production dependency
 * acquisition; all application checks use isolated HOME and offline fixtures. */
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { checkBun, hostTarget } from '../../packaging/platform.ts'
import { createSource } from '../../packaging/source.ts'
import { installSource } from '../../packaging/installer.ts'
import { packNative287 } from '../../packaging/nativeDistribution287.ts'
import { isolatedEnv, run, verifyInstalled } from '../../packaging/verify.ts'

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const [expected] = process.argv.slice(2)
const output = join(repo, '.distribution-287')
const report = { version: '2.1.287', expectedTarget: expected, target: null, bun: Bun.version,
  provenance: 'native GitHub runner; synthetic isolated HOME; no real account/model requests',
  kind: 'prebuilt-source-bun, not single-file executable', status: 'running' }
const temp = mkdtempSync(join(tmpdir(), 'viacoder-distribution-287-'))
try {
  checkBun(); report.target = hostTarget()
  if (report.target !== expected) throw Error(`Native runner mismatch: ${report.target} != ${expected}`)
  const home = join(temp, 'home'); mkdirSync(home)
  const tests = Bun.spawnSync([process.execPath, '--no-env-file', 'test', 'tests/native-distribution-287.test.ts'],
    { cwd: repo, env: isolatedEnv(home), stdout: 'pipe', stderr: 'pipe', timeout: 180_000 })
  process.stdout.write(tests.stdout); process.stderr.write(tests.stderr)
  if (tests.exitCode !== 0) throw Error(`Distribution unit fixtures failed: ${tests.exitCode}`)
  report.distributionFixtures = 'passed'
  const source = createSource(repo, join(temp, 'source-artifacts'))
  const installed = await installSource(source, { prefix: join(temp, 'source-prefix'), binDir: join(temp, 'source-bin'), offline: false })
  await verifyInstalled(installed)
  report.nativeSourceInstall = 'verified'
  mkdirSync(output, { recursive: true })
  const packed = await packNative287(installed, output)
  // Exercise the bytes users download, not only the directory before archiving.
  const extracted = join(temp, 'extracted'); mkdirSync(extracted)
  if (report.target.startsWith('win32-')) {
    const quote = value => value.replaceAll("'", "''")
    run(['pwsh', '-NoProfile', '-Command', `Expand-Archive -LiteralPath '${quote(packed.archive)}' -DestinationPath '${quote(extracted)}'`], home, isolatedEnv(home))
  } else run(['tar', '-xzf', packed.archive, '-C', extracted], home, isolatedEnv(home))
  const bundle = join(extracted, `ViaCoder-2.1.287-${report.target}`)
  const bundleSource = join(bundle, 'source')
  const bundledBun = join(bundle, 'production', '.viacoder-runtime', report.target.startsWith('win32-') ? 'bun.exe' : 'bun')
  const deployed = run([bundledBun, '--no-env-file', `--config=${join(bundleSource, 'packaging/runtime.bunfig.toml')}`,
    join(bundleSource, 'packaging/nativeDistribution287.ts'), 'install', bundle,
    join(temp, 'prebuilt-prefix'), join(temp, 'prebuilt-bin')], home, isolatedEnv(home)).trim()
  await verifyInstalled(deployed)
  const launch = report.target.startsWith('win32-')
    ? ['pwsh', '-NoProfile', '-File', join(temp, 'prebuilt-bin', 'viacoder.ps1'), '--version']
    : [join(temp, 'prebuilt-bin', 'viacoder'), '--version']
  const version = run(launch, home, isolatedEnv(home)).trim()
  if (version !== '2.1.287 (Claude Code)') throw Error(`Prebuilt public launcher version mismatch: ${version}`)
  report.prebuiltInstalled = 'verified'
  report.publicLauncherVersion = version
  report.archive = packed.archive
  report.archiveSHA256 = readFileSync(`${packed.archive}.sha256`, 'utf8').split(/\s+/)[0]
  report.boundaries = ['Native runner only', 'No GUI/Chrome/real OAuth or model evidence', 'No destination dependency resolution']
  report.status = 'passed'
} catch (error) {
  report.status = 'failed'; report.error = error instanceof Error ? error.message : String(error)
  process.exitCode = 1
} finally {
  mkdirSync(output, { recursive: true })
  writeFileSync(join(output, `result-${expected ?? 'unknown'}.json`), JSON.stringify(report, null, 2) + '\n')
  rmSync(temp, { recursive: true, force: true })
  console.log(JSON.stringify(report))
}
