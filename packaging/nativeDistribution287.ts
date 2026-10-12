/** Native prebuilt source+Bun distribution for the fixed 2.1.287 release.
 * This is deliberately not a Bun --compile / single-file executable: the
 * source loader, dynamic imports, desktop resources and native modules remain
 * separate verified files. Never run this against an unverified checkout.
 */
import { createHash, randomUUID } from 'node:crypto'
import { chmodSync, copyFileSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, realpathSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, relative, resolve, sep } from 'node:path'
import { checkBun, hostTarget, type Target } from './platform.js'
import { hash, MANIFEST, verifySource } from './source.js'
import { installSource, rollback, type InstallIO } from './installer.js'
import { isolatedEnv, samePinnedExecutablePath, verifyInstalled } from './verify.js'

const META = 'prebuilt-manifest.json'
const RUNTIME = `node_modules/.viacoder-runtime/bun${process.platform === 'win32' ? '.exe' : ''}`
const BUNDLE_RUNTIME = `.viacoder-runtime/bun${process.platform === 'win32' ? '.exe' : ''}`
const VERSION = '2.1.287'
type Entry = { path: string; sha256: string; mode: number }
type Bundle = { format: 1; kind: 'prebuilt-source-bun'; version: string; target: Target; bun: string; sourceManifestSHA256: string; files: Entry[] }
function fileHash(path: string) { return createHash('sha256').update(readFileSync(path)).digest('hex') }
function present(path: string) { try { lstatSync(path); return true } catch (error) { if ((error as NodeJS.ErrnoException).code === 'ENOENT') return false; throw error } }
function safePart(name: string) {
  // Source is copied exclusively from release-manifest.json; dependencies are
  // copied exclusively from the just-installed frozen production tree. Do not
  // classify legitimate package source/fixtures by names such as credentials.js,
  // secrets.js, or test certificate extensions.
  if (!name || name === '.' || name === '..' || name === '.git' || name === '.claude' || name === '.work' || name === '.env')
    throw Error(`Forbidden prebuilt payload component: ${name}`)
}
function inside(root: string, path: string) {
  const rel = relative(realpathSync(root), path)
  if (rel === '..' || rel.startsWith(`..${sep}`) || rel.startsWith(sep)) throw Error(`Dependency symlink escapes verified tree: ${path}`)
}
export function copyProductionTree287(source: string, dest: string, root = source) {
  const real = realpathSync(source); inside(root, real)
  const stat = statSync(source)
  if (stat.isDirectory()) {
    mkdirSync(dest, { recursive: true })
    for (const name of readdirSync(source).sort()) { safePart(name); copyProductionTree287(join(source, name), join(dest, name), root) }
  } else if (stat.isFile()) {
    mkdirSync(dirname(dest), { recursive: true }); copyFileSync(source, dest)
    chmodSync(dest, stat.mode & 0o111 ? 0o755 : 0o644)
  } else throw Error(`Unsupported production dependency entry: ${source}`)
}
function entries(root: string): Entry[] {
  const output: Entry[] = []
  function visit(dir: string, prefix: string) {
    for (const name of readdirSync(dir).sort()) {
      safePart(name)
      const path = prefix ? `${prefix}/${name}` : name
      const full = join(dir, name), st = lstatSync(full)
      if (st.isSymbolicLink()) throw Error(`Symlink in prebuilt payload: ${path}`)
      if (st.isDirectory()) visit(full, path)
      else if (st.isFile()) output.push({ path, sha256: fileHash(full), mode: st.mode & 0o111 ? 0o755 : 0o644 })
      else throw Error(`Unsupported prebuilt entry: ${path}`)
    }
  }
  visit(root, '')
  return output
}
function verifyBundle(root: string): Bundle {
  root = resolve(root)
  const metaPath = join(root, META)
  if (lstatSync(metaPath).isSymbolicLink()) throw Error('Prebuilt manifest is a symlink')
  const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as Bundle
  if (meta.format !== 1 || meta.kind !== 'prebuilt-source-bun' || meta.version !== VERSION ||
      meta.bun !== '1.4.3' || meta.target !== hostTarget() || !Array.isArray(meta.files)) throw Error('Prebuilt identity mismatch')
  const actual = entriesExcludingMeta(root)
  if (JSON.stringify(actual) !== JSON.stringify(meta.files)) throw Error('Prebuilt payload checksum or file set mismatch')
  const source = join(root, 'source')
  const sourceManifest = verifySource(source)
  if (sourceManifest.version !== VERSION || fileHash(join(source, MANIFEST)) !== meta.sourceManifestSHA256) throw Error('Source manifest mismatch')
  const bun = join(root, 'production', BUNDLE_RUNTIME)
  if (!existsSync(bun) || fileHash(bun) !== meta.files.find(e => e.path === `production/${BUNDLE_RUNTIME}`)?.sha256) throw Error('Bundled Bun missing')
  return meta
}
function entriesExcludingMeta(root: string) {
  const files = entries(root).filter(e => e.path !== META)
  // The manifest is not self-hashed; all other files, including instructions, are.
  return files
}
function copySourceFiles(installed: string, dest: string) {
  const manifest = verifySource(installed, true)
  for (const e of manifest.files) {
    const from = join(installed, e.path), to = join(dest, e.path)
    mkdirSync(dirname(to), { recursive: true }); copyFileSync(from, to); chmodSync(to, e.mode)
  }
  copyFileSync(join(installed, MANIFEST), join(dest, MANIFEST))
}
function archive(root: string, output: string, target: Target) {
  const parent = dirname(root), name = basename(root)
  const archivePath = join(output, `ViaCoder-${VERSION}-${target}${target.startsWith('win32-') ? '.zip' : '.tar.gz'}`)
  if (existsSync(archivePath)) throw Error(`Archive already exists: ${archivePath}`)
  const archiveRun = (command: string[], env: Record<string, string>) => {
    const result = Bun.spawnSync(command, { cwd: parent, env, stdin: 'ignore', stdout: 'pipe', stderr: 'pipe', timeout: 600_000 })
    if (result.exitCode !== 0) throw Error(`System archive command failed (${result.exitCode}): ${result.stderr.toString().slice(-2000)}`)
  }
  if (target.startsWith('win32-')) {
    // Windows runner's native PowerShell ZIP writer; no home-grown archive format.
    const script = `Compress-Archive -LiteralPath '${root.replaceAll("'", "''")}' -DestinationPath '${archivePath.replaceAll("'", "''")}' -CompressionLevel Optimal`
    archiveRun(['pwsh', '-NoProfile', '-Command', script], isolatedEnv(parent))
  } else archiveRun(['tar', '-czf', archivePath, '-C', parent, '--', name], { PATH: process.env.PATH ?? '/usr/bin:/bin', COPYFILE_DISABLE: '1' })
  writeFileSync(`${archivePath}.sha256`, `${fileHash(archivePath)}  ${basename(archivePath)}\n`, { flag: 'wx' })
  return archivePath
}
export async function packNative287(installed: string, output: string, bunExecutable = process.execPath) {
  checkBun(); const target = hostTarget()
  installed = realpathSync(installed); output = resolve(output); bunExecutable = realpathSync(bunExecutable)
  const source = verifySource(installed, true)
  if (source.version !== VERSION) throw Error('Only the fixed 2.1.287 installed source is eligible')
  const ready = JSON.parse(readFileSync(join(installed, '.cc-ready.json'), 'utf8'))
  if (ready.target !== target || ready.bun !== Bun.version || ready.manifestHash !== fileHash(join(installed, MANIFEST))) throw Error('Installed release stamp mismatch')
  if (!existsSync(join(installed, 'node_modules'))) throw Error('Verified production dependencies are required')
  if (present(join(installed, 'node_modules/.viacoder-runtime'))) throw Error('Reserved runtime directory already exists in dependencies')
  if (!samePinnedExecutablePath(realpathSync(process.execPath), bunExecutable)) throw Error('Bun executable must be the native runner executable')
  await verifyInstalled(installed)
  mkdirSync(output, { recursive: true })
  const stage = join(output, `.prebuilt-${randomUUID()}`), name = `ViaCoder-${VERSION}-${target}`
  const final = join(output, name)
  if (existsSync(final)) throw Error(`Prebuilt directory already exists: ${final}`)
  mkdirSync(join(stage, 'source'), { recursive: true })
  try {
    const sourceDest = join(stage, 'source'), production = join(stage, 'production')
    copySourceFiles(installed, sourceDest)
    copyProductionTree287(join(installed, 'node_modules'), production, join(installed, 'node_modules'))
    const runtime = join(production, BUNDLE_RUNTIME)
    mkdirSync(dirname(runtime), { recursive: true }); copyFileSync(bunExecutable, runtime); chmodSync(runtime, 0o755)
    verifySource(sourceDest)
    const instructions = `ViaCoder ${VERSION} / ${target} — prebuilt source + native Bun 1.4.3 + production dependencies.\nNOT a single-file executable. No dependency resolution occurs on the destination.\nUnpack and run from this directory:\n  macOS/Linux: ./production/.viacoder-runtime/bun source/packaging/nativeDistribution287.ts install . PREFIX BIN_DIR\n  Windows: .\\production\\.viacoder-runtime\\bun.exe source\\packaging\\nativeDistribution287.ts install . PREFIX BIN_DIR\nRollback (same PREFIX and BIN_DIR):\n  macOS/Linux: ./production/.viacoder-runtime/bun source/packaging/nativeDistribution287.ts rollback PREFIX BIN_DIR\n  Windows: .\\production\\.viacoder-runtime\\bun.exe source\\packaging\\nativeDistribution287.ts rollback PREFIX BIN_DIR\nPREFIX defaults to ~/.local/share/viacoder-prebuilt and BIN_DIR to ~/.local/bin if omitted.\nInstaller does not read or copy HOME authentication/configuration and the launcher preserves the caller working directory.\nVerify the archive SHA256 against the separately published .sha256 before extraction; only use trusted releases.\n`;
    writeFileSync(join(stage, 'INSTALL.txt'), instructions)
    const meta: Bundle = { format: 1, kind: 'prebuilt-source-bun', version: VERSION, target, bun: Bun.version,
      sourceManifestSHA256: fileHash(join(sourceDest, MANIFEST)), files: entriesExcludingMeta(stage) }
    writeFileSync(join(stage, META), JSON.stringify(meta, null, 2) + '\n')
    verifyBundle(stage)
    verifySource(installed, true) // source payload must still match its installed manifest
    renameSync(stage, final)
    return { directory: final, archive: archive(final, output, target), target, manifestSHA256: hash(readFileSync(join(final, META))) }
  } finally { if (existsSync(stage)) rmSync(stage, { recursive: true, force: true }) }
}
export function prebuiltLauncher287(prefix: string, platform: string): string {
  if (platform === 'win32') {
    const q = prefix.replaceAll("'", "''")
    return `# VIACODER-PREBUILT-287\n$ErrorActionPreference = 'Stop'\n$p = '${q}'\n$r = [IO.File]::ReadAllText((Join-Path $p 'current')).Trim()\nif ($r -notmatch '^releases/[A-Za-z0-9.-]+$') { throw 'Invalid managed release pointer' }\n$root = Join-Path $p ($r -replace '/', [IO.Path]::DirectorySeparatorChar)\nRemove-Item Env:CC_INSTALL_PREFIX -ErrorAction SilentlyContinue\n$env:BUN_BIN = Join-Path $root 'node_modules/.viacoder-runtime/bun.exe'\n& (Join-Path $root 'bin/viacoder.ps1') @args\nexit $LASTEXITCODE\n`
  }
  const q = prefix.replaceAll("'", "'\\''")
  return `#!/bin/sh\n# VIACODER-PREBUILT-287\nset -eu\np='${q}'\nr=$(readlink "$p/current")\ncase "$r" in releases/*) name=\${r#releases/};; *) echo 'Invalid managed release pointer' >&2; exit 1;; esac\ncase "$name" in ''|*[!A-Za-z0-9.-]*) echo 'Invalid managed release name' >&2; exit 1;; esac\nexport BUN_BIN="$p/$r/node_modules/.viacoder-runtime/bun"\nexec "$p/$r/bin/viacoder" "$@"\n`
}
function publishLauncher(prefix: string, binDir: string, platform: string) {
  mkdirSync(binDir, { recursive: true })
  const path = join(binDir, platform === 'win32' ? 'viacoder.ps1' : 'viacoder')
  const body = prebuiltLauncher287(realpathSync(prefix), platform)
  if (present(path) && (lstatSync(path).isSymbolicLink() || !lstatSync(path).isFile() || readFileSync(path, 'utf8') !== body)) throw Error(`Unmanaged public launcher: ${path}`)
  if (!present(path)) {
    const temp = `${path}.next-${randomUUID()}`
    try { writeFileSync(temp, body, { flag: 'wx', mode: 0o755 }); renameSync(temp, path) }
    finally { if (existsSync(temp)) rmSync(temp) }
  }
}
export async function installNative287(bundleRoot: string, prefix: string, binDir: string) {
  checkBun(); const meta = verifyBundle(bundleRoot), source = join(resolve(bundleRoot), 'source')
  if (!samePinnedExecutablePath(realpathSync(process.execPath), realpathSync(join(resolve(bundleRoot), 'production', BUNDLE_RUNTIME)))) throw Error('Run installation with the bundled native Bun executable')
  prefix = resolve(prefix); binDir = resolve(binDir)
  const publicPath = join(binDir, process.platform === 'win32' ? 'viacoder.ps1' : 'viacoder')
  if (present(publicPath)) {
    const expected = prebuiltLauncher287(existsSync(prefix) ? realpathSync(prefix) : prefix, process.platform)
    if (lstatSync(publicPath).isSymbolicLink() || !lstatSync(publicPath).isFile() || readFileSync(publicPath, 'utf8') !== expected) throw Error(`Unmanaged public launcher: ${publicPath}`)
  }
  const io: InstallIO = {
    target: meta.target,
    async dependencies(candidate) {
      copyProductionTree287(join(resolve(bundleRoot), 'production'), join(candidate, 'node_modules'), join(resolve(bundleRoot), 'production'))
    },
    async verify(candidate) {
      await verifyInstalled(candidate)
      const runtime = join(candidate, RUNTIME)
      if (fileHash(runtime) !== meta.files.find(e => e.path === `production/${BUNDLE_RUNTIME}`)?.sha256) throw Error('Installed Bun checksum mismatch')
    },
  }
  // Reuse the source installer's exclusive lock, immutable releases, native
  // checks, fresh final-location verification, pointer transaction and rollback.
  const internalBin = join(prefix, '.prebuilt-internal-bin')
  const installed = await installSource(source, { prefix, binDir: internalBin, offline: true }, io)
  publishLauncher(prefix, binDir, process.platform)
  return installed
}
export async function rollbackNative287(prefix: string, binDir: string) {
  checkBun(); prefix = resolve(prefix); binDir = resolve(binDir)
  const io: InstallIO = { async dependencies() { throw Error('Rollback must not resolve dependencies') }, verify: verifyInstalled }
  const restored = await rollback({ prefix, binDir: join(prefix, '.prebuilt-internal-bin'), offline: true }, io)
  publishLauncher(prefix, binDir, process.platform)
  return restored
}
if (import.meta.main) {
  try {
    const [operation, ...args] = process.argv.slice(2)
    if (operation === 'pack' && args.length === 2) console.log(JSON.stringify(await packNative287(args[0]!, args[1]!), null, 2))
    else if (operation === 'inspect' && args.length === 1) console.log(JSON.stringify(verifyBundle(args[0]!), null, 2))
    else if (operation === 'install' && args.length >= 1 && args.length <= 3) {
      const home = process.env.HOME ?? process.env.USERPROFILE
      if (!home && args.length < 3) throw Error('HOME or explicit PREFIX and BIN_DIR required')
      console.log(await installNative287(args[0]!, args[1] ?? join(home!, '.local/share/viacoder-prebuilt'), args[2] ?? join(home!, '.local/bin')))
    } else if (operation === 'rollback' && args.length <= 2) {
      const home = process.env.HOME ?? process.env.USERPROFILE
      if (!home && args.length < 2) throw Error('HOME or explicit PREFIX and BIN_DIR required')
      console.log(await rollbackNative287(args[0] ?? join(home!, '.local/share/viacoder-prebuilt'), args[1] ?? join(home!, '.local/bin')))
    } else throw Error('Usage: nativeDistribution287.ts pack INSTALLED OUT | inspect BUNDLE | install BUNDLE [PREFIX BIN_DIR] | rollback [PREFIX BIN_DIR]')
  } catch (error) { console.error(error instanceof Error ? error.message : String(error)); process.exitCode = 1 }
}
