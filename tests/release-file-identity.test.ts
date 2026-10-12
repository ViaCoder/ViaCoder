import { expect, test } from 'bun:test'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { linkSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { samePinnedExecutablePath } from '../packaging/verify.js'

test('Windows aliases identify the same pinned file, not an unrelated file', () => {
  const dir = mkdtempSync(join(tmpdir(), 'viacoder-file-identity-'))
  try {
    const file = join(dir, 'pinned'), alias = join(dir, 'alias'), unrelated = join(dir, 'other')
    writeFileSync(file, 'fixture'); linkSync(file, alias); writeFileSync(unrelated, 'fixture')
    expect(samePinnedExecutablePath(file, alias, 'win32')).toBe(true)
    expect(samePinnedExecutablePath(file, unrelated, 'win32')).toBe(false)
    expect(samePinnedExecutablePath(file, alias, 'linux')).toBe(false)
    expect(samePinnedExecutablePath(file, file, 'linux')).toBe(true)
  } finally { rmSync(dir, { recursive: true, force: true }) }
})

test('only exact bare help selects the metadata path before the identity gate', () => {
  const source = readFileSync(new URL('../src/entrypoints/cli.tsx', import.meta.url), 'utf8')
  const match = /if \((args.length === 2[^\n]+)\) \{\s+const \{ main: showHelp \}[^}]+return;\s+\}/.exec(source)
  expect(match).not.toBeNull()
  const selected = new Function('args', `return (${match![1]})`) as (args: string[]) => boolean
  expect(selected(['--bare', '--help'])).toBe(true)
  expect(selected(['--help', '--bare'])).toBe(true)
  expect(selected(['--bare', '--help', '--dangerously-skip-permissions'])).toBe(false)
  expect(selected(['--chrome-native-host', '--help'])).toBe(false)
  expect(selected(['--bare', 'serve'])).toBe(false)
  expect(source.indexOf(match![0])).toBeLessThan(source.indexOf("assertExecutionProcess287('cli')"))
})

test('offline policy absence is limited to the two official registry reads', () => {
  const source = readFileSync(new URL('../packaging/offline-guard.ts', import.meta.url), 'utf8')
  const body = /export function isIsolatedManagedPolicyRead\([\s\S]+?\n\}/.exec(source)![0]
  const js = new Bun.Transpiler({ loader: 'ts' }).transformSync(body).replace('export ', '')
  const check = new Function('process', `${js}; return isIsolatedManagedPolicyRead`)({ platform: 'win32', env: { SYSTEMROOT: 'C:\\Windows' } })
  const exe = 'C:\\Windows\\System32\\reg.exe'
  expect(check(exe, ['query', 'HKLM\\SOFTWARE\\Policies\\ClaudeCode', '/v', 'Settings'])).toBe(true)
  expect(check(exe, ['query', 'HKCU\\SOFTWARE\\Policies\\ClaudeCode', '/v', 'Settings'])).toBe(true)
  expect(check(exe, ['delete', 'HKCU\\SOFTWARE\\Policies\\ClaudeCode', '/v', 'Settings'])).toBe(false)
  expect(check(exe, ['query', 'HKCU\\SOFTWARE\\Credentials', '/v', 'Settings'])).toBe(false)
  expect(check('cmd.exe', ['query', 'HKCU\\SOFTWARE\\Policies\\ClaudeCode', '/v', 'Settings'])).toBe(false)
  expect(check(exe, ['query', 'HKCU\\SOFTWARE\\Policies\\ClaudeCode', '/v', 'Settings', '/s'])).toBe(false)
  expect(check(exe, ['query', 'HKCU\\SOFTWARE\\Policies\\ClaudeCode', '/v', 'Settings'], 'linux')).toBe(false)
})
