import { afterEach, expect, test } from 'bun:test'
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, renameSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { copyProductionTree287, prebuiltLauncher287 } from '../packaging/nativeDistribution287.js'

const temps: string[] = []
function temp() { const path = mkdtempSync(join(tmpdir(), 'viacoder-prebuilt-287-')); temps.push(path); return path }
afterEach(() => { for (const path of temps.splice(0)) rmSync(path, { recursive: true, force: true }) })

test('production payload copier only follows links within verified dependency root', () => {
  const root = temp(), deps = join(root, 'node_modules'), dest = join(root, 'copy')
  mkdirSync(join(deps, 'pkg'), { recursive: true })
  writeFileSync(join(deps, 'pkg', 'index.js'), 'export default 287')
  for (const name of ['credentials.js', 'secrets.js', 'fixture.pem', 'fixture.key']) writeFileSync(join(deps, 'pkg', name), 'fixture-package-source')
  copyProductionTree287(deps, dest)
  expect(readFileSync(join(dest, 'pkg', 'index.js'), 'utf8')).toBe('export default 287')
  for (const name of ['credentials.js', 'secrets.js', 'fixture.pem', 'fixture.key'])
    expect(readFileSync(join(dest, 'pkg', name), 'utf8')).toBe('fixture-package-source')
  expect(existsSync(join(dest, '.env'))).toBe(false)
  writeFileSync(join(deps, '.env'), 'fixture-not-a-secret')
  expect(() => copyProductionTree287(deps, join(root, 'bad-env'))).toThrow('Forbidden')
  rmSync(join(deps, '.env'))
  if (process.platform !== 'win32') {
    writeFileSync(join(root, 'outside'), 'fixture-not-a-secret')
    symlinkSync(join(root, 'outside'), join(deps, 'pkg', 'escape'))
    expect(() => copyProductionTree287(deps, join(root, 'bad-link'))).toThrow('escapes')
  }
})

test('public launchers bind the immutable current release and bundled Bun without changing cwd or HOME', () => {
  const prefix = resolve('/tmp/viacoder-prebuilt-fixture')
  const posix = prebuiltLauncher287(prefix, 'linux')
  expect(posix).toContain('readlink "$p/current"')
  expect(posix).toContain('node_modules/.viacoder-runtime/bun')
  expect(posix).toContain('exec "$p/$r/bin/viacoder" "$@"')
  expect(posix).not.toContain('cd ')
  expect(posix).not.toContain('HOME=')
  const windows = prebuiltLauncher287(prefix, 'win32')
  expect(windows).toContain("Join-Path $p 'current'")
  expect(windows).toContain('node_modules/.viacoder-runtime/bun.exe')
  expect(windows).toContain("& (Join-Path $root 'bin/viacoder.ps1') @args")
  expect(windows).not.toContain('Set-Location')
})

test.skipIf(process.platform === 'win32')('portable launcher follows atomic current switch and preserves caller cwd/HOME', () => {
  const root = temp(), prefix = join(root, 'prefix'), project = join(root, 'project'), home = join(root, 'home')
  mkdirSync(project); mkdirSync(home)
  for (const name of ['old', 'next']) {
    const bin = join(prefix, 'releases', name, 'bin'); mkdirSync(bin, { recursive: true })
    const app = join(bin, 'viacoder')
    writeFileSync(app, `#!/bin/sh\nprintf '%s|%s|%s|%s\\n' '${name}' "$PWD" "$HOME" "$BUN_BIN"\n`)
    chmodSync(app, 0o755)
  }
  symlinkSync('releases/old', join(prefix, 'current'))
  const launcher = join(root, 'viacoder')
  writeFileSync(launcher, prebuiltLauncher287(prefix, process.platform)); chmodSync(launcher, 0o755)
  const execute = () => {
    const result = Bun.spawnSync([launcher], { cwd: project, env: { PATH: process.env.PATH ?? '/usr/bin:/bin', HOME: home }, stdout: 'pipe', stderr: 'pipe' })
    expect(result.exitCode).toBe(0)
    return result.stdout.toString().trim().split('|')
  }
  expect(execute()).toEqual(['old', realpathSync(project), home, join(prefix, 'releases/old/node_modules/.viacoder-runtime/bun')])
  symlinkSync('releases/next', join(prefix, 'current.next'))
  renameSync(join(prefix, 'current.next'), join(prefix, 'current'))
  expect(execute()).toEqual(['next', realpathSync(project), home, join(prefix, 'releases/next/node_modules/.viacoder-runtime/bun')])
})

test('source payload allowlist includes distribution installer but not CI result directories', () => {
  const list = JSON.parse(readFileSync(resolve(import.meta.dir, '../packaging/files.json'), 'utf8')) as { files: string[]; trees: string[] }
  expect(list.files).toContain('packaging/nativeDistribution287.ts')
  expect(list.files.some(x => x.startsWith('.distribution-287') || x.includes('ci-results'))).toBe(false)
  expect(list.trees).not.toContain('node_modules')
})
