import { mkdtempSync, realpathSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { checkBun, hostTarget } from './platform.js'
import { verifySource } from './source.js'

// Deliberate allowlist: no API/provider/OAuth/npm_config_*/NODE_OPTIONS/.env inheritance.
export function isolatedEnv(home: string, platform = process.platform): Record<string, string> {
  const env: Record<string, string> = { PATH: process.env.PATH ?? '/usr/bin:/bin', HOME: home, TMPDIR: home,
    XDG_CONFIG_HOME: join(home, 'config'), XDG_CACHE_HOME: join(home, 'cache'),
    CLAUDE_CONFIG_DIR: join(home, '.claude'), BUN_BIN: process.execPath,
    DISABLE_TELEMETRY: '1', CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: '1',
    CLAUDE_CODE_LOCAL_SKIP_REMOTE_PREFETCH: '1', DISABLE_AUTOUPDATER: '1',
    NO_COLOR: '1', TERM: 'dumb' }
  if (platform === 'win32') {
    // Preserve only OS process-launch variables; never inherit auth/provider env.
    for (const name of ['SystemRoot', 'WINDIR', 'COMSPEC', 'PATHEXT']) {
      const value = process.env[name]
      if (value) env[name] = value
    }
    env.USERPROFILE = home
    env.TEMP = home
    env.TMP = home
  }
  return env
}
export function run(command: string[], cwd: string, env: Record<string, string>): string {
  const result = Bun.spawnSync(command, { cwd, env, stdin: 'ignore', stdout: 'pipe', stderr: 'pipe', timeout: 120_000 })
  if (result.exitCode !== 0) throw Error(`Release command failed (${result.exitCode}): ${command[0]} ${command[1]}\n${result.stderr.toString().slice(-6000)}`)
  return result.stdout.toString()
}
export function samePinnedExecutablePath(actual: string, expected: string, platform = process.platform): boolean {
  if (platform !== 'win32') return actual === expected
  if (actual.toLowerCase() === expected.toLowerCase()) return true
  // Windows TEMP may use an 8.3 alias while the native child reports the long
  // pathname. Compare the actual file identity, not a guessed path rewrite.
  const a = statSync(actual, { bigint: true }), b = statSync(expected, { bigint: true })
  return a.ino !== 0n && a.ino === b.ino && a.dev === b.dev
}
export async function verifyInstalled(root: string): Promise<void> {
  checkBun(); hostTarget()
  root = realpathSync(root)
  const manifest = verifySource(root, true)
  const home = mkdtempSync(join(tmpdir(), 'cc-release-verify-'))
  try {
    const env = isolatedEnv(home)
    const args = [process.execPath, '--no-env-file', `--config=${join(root, 'packaging/runtime.bunfig.toml')}`, '--preload', join(root, 'packaging/offline-guard.ts'),
      '--preload', join(root, 'preload.ts')]
    const native = JSON.parse(run([...args, join(root, 'packaging/native-check.ts')], home, env))
    if (native.target !== hostTarget()) throw Error('Native dependency target mismatch')
    // Only this known installed executable is run; no curl/keychain/SSH commands.
    const rg = realpathSync(native.rgPath)
    const rgName = hostTarget().startsWith('win32-') ? 'rg.exe' : 'rg'
    const rgExpected = realpathSync(join(root, `node_modules/@vscode/ripgrep-${hostTarget()}/bin/${rgName}`))
    const sameRg = samePinnedExecutablePath(rg, rgExpected)
    if (!sameRg) throw Error(`ripgrep path mismatch: ${rg} != ${rgExpected}`)
    const rgVersion = run([rg, '--version'], home, env)
    if (!rgVersion.startsWith('ripgrep ')) throw Error(`ripgrep unexpected version output: ${JSON.stringify(rgVersion.slice(0, 160))}`)
    const version = run([...args, join(root, 'src/entrypoints/cli.tsx'), '--version'], home, env).trim()
    if (version !== `${manifest.version} (Claude Code)`) throw Error(`CLI version mismatch: ${version}`)
    // --bare prevents macOS credential prefetch during main module evaluation.
    // Network/child-process guards stay active; no real Keychain access is allowed.
    const help = run([...args, join(root, 'src/entrypoints/cli.tsx'), '--bare', '--help'], home, env)
    if (!help.includes('--resume') || !help.includes('--print')) throw Error('Full CLI help did not load')
    const web = JSON.parse(run([...args, join(root, 'packaging/web-asset-check.ts')], home, env)) as {
      webAssets?: string; jsBytes?: number; cssBytes?: number
    }
    if (web.webAssets !== 'ok' || !Number.isSafeInteger(web.jsBytes) || web.jsBytes! < 100_000 ||
        !Number.isSafeInteger(web.cssBytes) || web.cssBytes! < 1_000) throw Error('Web release assets did not build')
  } finally { rmSync(home, { recursive: true, force: true }) }
}
