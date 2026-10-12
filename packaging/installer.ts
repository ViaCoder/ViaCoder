import { randomUUID } from 'node:crypto'
import { existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, readlinkSync, realpathSync, renameSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { checkBun, dependencyArgs, hostTarget, type Target } from './platform.js'
import { copySource, hash, MANIFEST, verifySource } from './source.js'
import { isolatedEnv, run, verifyInstalled } from './verify.js'

type Options = { prefix: string; binDir: string; offline: boolean; cache?: string }
// Injectable IO is for offline tests only; the CLI never exposes skip-validation hooks.
export type InstallIO = {
  dependencies(root: string, target: Target, options: Options): Promise<void>
  verify(root: string): Promise<void>
  /** Offline adapter seam; production derives both values from the actual Bun host. */
  platform?: 'posix' | 'win32'
  target?: Target
}
/** Optional remote-release gates. The commit callback runs under the existing
 * prefix lock, after final-location verification and immediately before the
 * current/previous pointer transaction. Local installs supply no lifecycle. */
export type InstallLifecycle = {
  beforePromote?(context: { prefix: string; candidate: string; current?: string }): Promise<void>
  afterPromote?(context: { prefix: string; release: string; previous?: string }): Promise<void>
  afterPromotionFailure?(context: { prefix: string; previous?: string; error: unknown }): Promise<void>
}
const realIO: InstallIO = {
  async dependencies(root, target, options) {
    const home = mkdtempSync(join(tmpdir(), 'cc-dependency-home-'))
    try { run([process.execPath, ...dependencyArgs(target, options.offline, options.cache)], root, isolatedEnv(home)) }
    finally { rmSync(home, { recursive: true, force: true }) }
  },
  verify: verifyInstalled,
}
function present(path: string): boolean {
  try { lstatSync(path); return true } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return false
    throw error
  }
}
function managedTarget(prefix: string, name: string, platform: 'posix' | 'win32'): string | undefined {
  const path = join(prefix, name)
  if (!present(path)) return
  if (platform === 'win32') {
    if (lstatSync(path).isSymbolicLink() || !lstatSync(path).isFile()) throw Error(`Refusing to replace non-managed Windows pointer: ${path}`)
    const value = readFileSync(path, 'utf8')
    const match = /^(releases\/[A-Za-z0-9.-]+)\r?\n?$/.exec(value)
    if (!match) throw Error(`Unmanaged release pointer: ${path}`)
    const target = match[1]!
    const location = join(prefix, target)
    if (lstatSync(location).isSymbolicLink() || !lstatSync(location).isDirectory() || !existsSync(join(location, '.cc-ready.json'))) throw Error(`Release is not verified: ${target}`)
    return target
  }
  if (!lstatSync(path).isSymbolicLink()) throw Error(`Refusing to replace non-managed path: ${path}`)
  const target = readlinkSync(path)
  if (!/^releases\/[A-Za-z0-9.-]+$/.test(target)) throw Error(`Unmanaged release link: ${path}`)
  const location = join(prefix, target)
  if (lstatSync(location).isSymbolicLink() || !lstatSync(location).isDirectory() || !existsSync(join(location, '.cc-ready.json'))) throw Error(`Release is not verified: ${target}`)
  return target
}
function atomicLink(target: string, path: string, prefix: string, platform: 'posix' | 'win32'): void {
  const temp = `${path}.next-${randomUUID()}`
  if (platform === 'win32') {
    // A small regular-file pointer can be atomically replaced on Windows;
    // unlike directory junction replacement it needs no privilege or gap.
    try { writeFileSync(temp, `${target}\n`, { flag: 'wx' }); renameSync(temp, path) }
    finally { if (present(temp)) rmSync(temp, { force: true }) }
  } else {
    try { symlinkSync(target, temp); renameSync(temp, path) }
    finally { if (present(temp)) unlinkSync(temp) }
  }
}
function isLegacyLauncher(path: string, expected: string): boolean {
  return present(path) && lstatSync(path).isSymbolicLink() &&
    resolve(path, '..', readlinkSync(path)) === expected
}
function removeLegacyLauncher(state: { legacy: string; expected: string; migrateLegacy: boolean }): void {
  // Only an exact link belonging to this already-managed prefix is eligible.
  // Recheck after validation/promotion; never remove a user-replaced compiler.
  if (state.migrateLegacy && isLegacyLauncher(state.legacy, state.expected)) unlinkSync(state.legacy)
}
/** Retire only this prefix's former public alias; unrelated commands are untouched. */
function retireCompatibilityLauncher(state: ReturnType<typeof prepare>): void {
  if (state.platform === 'posix') {
    if (isLegacyLauncher(state.launcher, state.expected!)) unlinkSync(state.launcher)
  } else if (present(state.launcher) && !lstatSync(state.launcher).isSymbolicLink() && lstatSync(state.launcher).isFile()) {
    if (isManagedWindowsLauncher(state.launcher, state.prefix) || readFileSync(state.launcher, 'utf8') === state.compatibilityExpected)
      unlinkSync(state.launcher)
  }
}

function windowsLauncher(template: string, prefix: string): string {
  const marker = '__CC_INSTALL_PREFIX_B64__'
  const occurrences = template.split(marker).length - 1
  const assignment = `$managedPrefixB64 = '${marker}'`
  const comparison = `-ne '${marker}'`
  const assignmentCount = template.split(assignment).length - 1
  const comparisonCount = template.split(comparison).length - 1
  const hasOwnershipMarker = /^# CC-MANAGED-LAUNCHER:v1 __CC_INSTALL_PREFIX_B64__$/m.test(template)
  if (occurrences !== (hasOwnershipMarker ? 3 : 2) || assignmentCount !== 1 || comparisonCount !== 1) {
    throw Error('Windows launcher template marker is missing or repeated')
  }
  const encodedPrefix = Buffer.from(prefix, 'utf8').toString('base64')
  let rendered = template.replace(assignment, `$managedPrefixB64 = '${encodedPrefix}'`)
  if (hasOwnershipMarker) rendered = rendered.replace(`# CC-MANAGED-LAUNCHER:v1 ${marker}`, `# CC-MANAGED-LAUNCHER:v1 ${encodedPrefix}`)
  return rendered
}
function isManagedWindowsLauncher(path: string, prefix: string): boolean {
  if (!present(path) || lstatSync(path).isSymbolicLink() || !lstatSync(path).isFile()) return false
  const contents = readFileSync(path, 'utf8')
  const encodedPrefix = Buffer.from(prefix, 'utf8').toString('base64')
  return contents.split(/\r?\n/).filter(line => line.trim() === `# CC-MANAGED-LAUNCHER:v1 ${encodedPrefix}`).length === 1
}
function prepare(options: Options, io: InstallIO, launcherTemplate?: string) {
  checkBun(); const target = io.target ?? hostTarget()
  const platform = io.platform ?? (target.startsWith('win32-') ? 'win32' : 'posix')
  mkdirSync(options.prefix, { recursive: true }); mkdirSync(options.binDir, { recursive: true })
  const prefix = realpathSync(options.prefix), binDir = realpathSync(options.binDir)
  const lock = join(prefix, '.install-lock')
  mkdirSync(lock) // exclusive across install/rollback; never steal another process's lock
  try {
    const releases = join(prefix, 'releases')
    if (present(releases) && lstatSync(releases).isSymbolicLink()) throw Error('releases must not be a symlink')
    mkdirSync(releases, { recursive: true })
    const current = managedTarget(prefix, 'current', platform)
    managedTarget(prefix, 'previous', platform)
    if (platform === 'win32') {
      const launcher = join(binDir, 'cclaude.ps1')
      const publicLauncher = join(binDir, 'viacoder.ps1')
      const publicTemplate = current ? join(prefix, current, 'bin/viacoder.ps1') : undefined
      const currentReleaseTemplate = current ? join(prefix, current, 'bin/cclaude.ps1') : undefined
      const template = launcherTemplate ?? (currentReleaseTemplate && readFileSync(currentReleaseTemplate, 'utf8'))
      if (!template) throw Error('Windows install requires the packaged bin/cclaude.ps1 launcher template')
      const expectedContents = windowsLauncher(template, prefix)
      // Older installs predate the stable marker. Their launcher is owned only
      // when it exactly matches the template shipped by the verified current release.
      const legacyExpected = currentReleaseTemplate
        ? windowsLauncher(readFileSync(currentReleaseTemplate, 'utf8'), prefix) : undefined
      const publicContents = windowsLauncher(launcherTemplate ?? (publicTemplate && existsSync(publicTemplate) ? readFileSync(publicTemplate, 'utf8') : undefined) ?? template, prefix)
      if (present(publicLauncher) && !isManagedWindowsLauncher(publicLauncher, prefix) &&
          (!legacyExpected || readFileSync(publicLauncher, 'utf8') !== legacyExpected)) throw Error(`Existing viacoder.ps1 is not managed by this prefix: ${publicLauncher}`)
      return { prefix, binDir, lock, target, platform, launcher, expectedContents, compatibilityExpected: legacyExpected ?? expectedContents, publicLauncher, publicContents }
    }
    // Only ViaCoder is published; the former alias is inspected solely for retirement.
    const launcher = join(binDir, 'cclaude'), expected = join(prefix, 'current/bin/cc')
    const publicLauncher = join(binDir, 'viacoder'), publicExpected = expected
    if (present(publicLauncher) && (!lstatSync(publicLauncher).isSymbolicLink() || readlinkSync(publicLauncher) !== publicExpected)) throw Error(`Existing viacoder is not managed by this prefix: ${publicLauncher}`)
    const legacy = join(binDir, 'cc'), migrateLegacy = !!current && isLegacyLauncher(legacy, expected)
    return { prefix, binDir, lock, target, platform, launcher, expected, legacy, migrateLegacy, publicLauncher, publicExpected }
  } catch (error) { rmSync(lock, { recursive: true }); throw error }
}
export async function installSource(source: string, options: Options, io: InstallIO = realIO,
  lifecycle?: InstallLifecycle): Promise<string> {
  const manifest = verifySource(source)
  const windows = io.platform === 'win32' || (io.platform === undefined && (io.target ?? hostTarget()).startsWith('win32-'))
  // Older verified artifacts carry only the compatible cclaude launcher; its
  // stable template also works for the new ViaCoder shim.
  const template = windows
    ? readFileSync(join(source, existsSync(join(source, 'bin/viacoder.ps1')) ? 'bin/viacoder.ps1' : 'bin/cclaude.ps1'), 'utf8') : undefined
  const state = prepare(options, io, template)
  const candidate = join(state.prefix, 'releases', `.candidate-${randomUUID()}`)
  let createdPublicPosixLauncher = false
  try {
    copySource(source, candidate)
    await io.dependencies(candidate, state.target, options)
    verifySource(candidate, true) // frozen dependency installation may not alter payload
    await io.verify(candidate)
    const id = `${manifest.version}-${state.target}-${randomUUID()}`
    const dest = join(state.prefix, 'releases', id)
    writeFileSync(join(candidate, '.cc-ready.json'), JSON.stringify({ format: 1, target: state.target,
      bun: Bun.version, manifestHash: hash(readFileSync(join(candidate, MANIFEST))) }) + '\n')
    renameSync(candidate, dest)
    // Only validation has used this candidate. Verify again at its final physical
    // location before making it available through the public launcher.
    await io.verify(dest)
    const old = managedTarget(state.prefix, 'current', state.platform)
    const oldPrevious = managedTarget(state.prefix, 'previous', state.platform)
    if (state.platform === 'win32') {
      // Publish only ViaCoder after candidate checks; leave unrelated legacy names alone.
      if (!present(state.publicLauncher) || readFileSync(state.publicLauncher, 'utf8') !== state.publicContents) {
        const tempLauncher = `${state.publicLauncher}.next-${randomUUID()}`
        try { writeFileSync(tempLauncher, state.publicContents!, { flag: 'wx' }); renameSync(tempLauncher, state.publicLauncher) }
        finally { if (present(tempLauncher)) rmSync(tempLauncher, { force: true }) }
      }
    } else {
      // The public launcher can precede first promotion; it remains dangling until
      // current's single rename commit. Subsequent launches keep the old current.
      if (!present(state.publicLauncher)) {
        atomicLink(state.publicExpected!, state.publicLauncher, state.prefix, state.platform)
        createdPublicPosixLauncher = true
      }
    }
    // Do not put any potentially slow work between this fresh check and the
    // pointer commit. The existing .install-lock remains held throughout.
    await lifecycle?.beforePromote?.({ prefix: state.prefix, candidate: dest, current: old })
    if (managedTarget(state.prefix, 'current', state.platform) !== old ||
        managedTarget(state.prefix, 'previous', state.platform) !== oldPrevious)
      throw Error('Managed release pointers changed during the fresh-check window; promotion is held')
    try {
      if (old) atomicLink(old, join(state.prefix, 'previous'), state.prefix, state.platform)
      atomicLink(`releases/${id}`, join(state.prefix, 'current'), state.prefix, state.platform)
      await lifecycle?.afterPromote?.({ prefix: state.prefix, release: dest, previous: old })
    } catch (error) {
      // A failed service start/readiness check must not leave current on the
      // candidate. Restore both pointers exactly; release directories stay
      // immutable and are deliberately retained.
      try {
        const currentNow = managedTarget(state.prefix, 'current', state.platform)
        if (currentNow !== `releases/${id}` && currentNow !== old)
          throw Error('Current pointer changed during failed promotion; refusing automatic repair')
        if (currentNow === `releases/${id}`) {
          if (old) atomicLink(old, join(state.prefix, 'current'), state.prefix, state.platform)
          else rmSync(join(state.prefix, 'current'), { force: true })
        }
        const nowPrevious = managedTarget(state.prefix, 'previous', state.platform)
        const allowedPrevious = old ? [old, oldPrevious] : [oldPrevious]
        if (!allowedPrevious.includes(nowPrevious)) throw Error('Previous pointer changed during failed promotion; refusing automatic repair')
        if (old && nowPrevious !== oldPrevious) {
          if (oldPrevious) atomicLink(oldPrevious, join(state.prefix, 'previous'), state.prefix, state.platform)
          else rmSync(join(state.prefix, 'previous'), { force: true })
        }
        await lifecycle?.afterPromotionFailure?.({ prefix: state.prefix, previous: old, error })
      } catch (rollbackError) {
        throw new AggregateError([error, rollbackError], 'Remote lifecycle failed and pointer/service recovery was incomplete')
      }
      throw error
    }
    retireCompatibilityLauncher(state)
    if (state.platform !== 'win32') removeLegacyLauncher(state)
    return dest
  } finally {
    // Never delete a release (including failed final-location candidates), old or running.
    if (existsSync(candidate)) rmSync(candidate, { recursive: true, force: true })
    if (createdPublicPosixLauncher && !present(join(state.prefix, 'current')) && present(state.publicLauncher) &&
        lstatSync(state.publicLauncher).isSymbolicLink() && readlinkSync(state.publicLauncher) === state.publicExpected) unlinkSync(state.publicLauncher)
    rmSync(state.lock, { recursive: true })
  }
}
export async function rollback(options: Options, io: InstallIO = realIO): Promise<string> {
  const state = prepare(options, io)
  try {
    const previous = managedTarget(state.prefix, 'previous', state.platform), current = managedTarget(state.prefix, 'current', state.platform)
    if (!previous || !current) throw Error('No previous verified release to roll back to')
    const dest = join(state.prefix, previous)
    const ready = JSON.parse(readFileSync(join(dest, '.cc-ready.json'), 'utf8'))
    if (ready.target !== state.target || ready.manifestHash !== hash(readFileSync(join(dest, MANIFEST)))) throw Error('Previous release verification stamp mismatch')
    verifySource(dest, true); await io.verify(dest)
    // Restore only ViaCoder after validation, including rollback to legacy releases.
    if (!present(state.publicLauncher)) {
      if (state.platform === 'win32') {
        const tempLauncher = `${state.publicLauncher}.next-${randomUUID()}`
        try { writeFileSync(tempLauncher, state.publicContents!, { flag: 'wx' }); renameSync(tempLauncher, state.publicLauncher) }
        finally { if (present(tempLauncher)) rmSync(tempLauncher, { force: true }) }
      } else atomicLink(state.publicExpected!, state.publicLauncher, state.prefix, state.platform)
    }
    atomicLink(current, join(state.prefix, 'previous'), state.prefix, state.platform)
    atomicLink(previous, join(state.prefix, 'current'), state.prefix, state.platform)
    retireCompatibilityLauncher(state)
    if (state.platform === 'posix') removeLegacyLauncher(state)
    return dest
  } finally { rmSync(state.lock, { recursive: true }) }
}
