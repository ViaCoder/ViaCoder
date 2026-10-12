#!/usr/bin/env node
/** Explicit, offline source patch/build/install workflow. Never called at startup.
 * No Git, download, desktop setup, MCP spawn, authentication or model request. */
import fs from 'node:fs'
import path from 'node:path'
import {createHash} from 'node:crypto'
import {spawnSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {LINUX_DRAG_PATCH_073 as identity} from '../src/utils/linuxComputerUse/dragPatchIdentity.ts'

const root = fileURLToPath(new URL('linux-drag-patch/', import.meta.url))
const suffix = '.cclaude-linux-drag.json'
const digest = bytes => createHash('sha256').update(bytes).digest('hex')
export function loadLinuxDragPatch() {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'))
  const patch = fs.readFileSync(path.join(root, 'computer-use-linux-0.7.3-drag.patch'), 'utf8')
  if (digest(patch) !== manifest.patchSha256 || manifest.patchSha256 !== identity.patchSha256 ||
      manifest.id !== identity.id || manifest.baseCommit !== identity.baseCommit ||
      manifest.sourceTreeSha256 !== identity.sourceTreeSha256 ||
      Object.keys(manifest.files).length !== 2 ||
      Object.entries(identity.sourceSha256).some(([p, sha]) => manifest.files[p]?.afterSha256 !== sha))
    throw Error('Linux drag patch manifest/runtime identity mismatch')
  return {manifest, patch}
}

/** Exact unified-diff application, no fuzz, offset search or partial acceptance. */
export function applyExactUnifiedPatch(original, diff) {
  const source = original.match(/[^\n]*\n|[^\n]+$/g) ?? []
  const lines = diff.match(/[^\n]*\n|[^\n]+$/g) ?? []
  const output = []; let cursor = 0
  for (let i = 2; i < lines.length;) {
    const match = /^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/.exec(lines[i++])
    if (!match) throw Error('Invalid exact patch hunk')
    const start = Number(match[1]) - 1
    if (start < cursor || start > source.length) throw Error('Patch hunk outside source')
    output.push(...source.slice(cursor, start)); cursor = start
    let removed = 0, added = 0
    while (i < lines.length && !lines[i].startsWith('@@ ')) {
      const line = lines[i++], mode = line[0], text = line.slice(1)
      if (![' ', '+', '-'].includes(mode)) throw Error('Unsupported patch line')
      if (mode !== '+') {
        if (source[cursor++] !== text) throw Error('Exact patch context mismatch')
        removed++
      }
      if (mode !== '-') {output.push(text); added++}
    }
    if (removed !== Number(match[2] ?? 1) || added !== Number(match[4] ?? 1))
      throw Error('Patch hunk counts differ')
  }
  output.push(...source.slice(cursor)); return output.join('')
}

export function patchLinuxDragSource(sourceRoot) {
  if (!path.isAbsolute(sourceRoot)) throw Error('Absolute upstream source directory required')
  const {manifest, patch} = loadLinuxDragPatch()
  const sections = patch.split(/(?=^--- a\/)/m).filter(Boolean)
  if (sections.length !== 2) throw Error('Expected exactly two upstream patch files')
  // Validate all inputs/outputs first, before any source write.
  const writes = sections.map(section => {
    const p = /^--- a\/([^\n]+)\n\+\+\+ b\/\1\n/.exec(section)?.[1]
    if (!p || !manifest.files[p]) throw Error('Unexpected patch path')
    const filename = path.join(sourceRoot, p), before = fs.readFileSync(filename, 'utf8')
    if (digest(before) !== manifest.files[p].beforeSha256) throw Error(`Pinned source mismatch: ${p}`)
    const after = applyExactUnifiedPatch(before, section)
    if (digest(after) !== manifest.files[p].afterSha256) throw Error(`Patched source mismatch: ${p}`)
    return {filename, after}
  })
  for (const {filename, after} of writes) fs.writeFileSync(filename, after)
  return identity
}

/** Full fixed-tag source tree, except the two precisely patched modules. */
export function verifyLinuxDragSource(sourceRoot) {
  const {manifest} = loadLinuxDragPatch()
  for (const file of manifest.upstreamTree) {
    const bytes = fs.readFileSync(path.join(sourceRoot, file.path))
    const patchFile = manifest.files[file.path]
    if (patchFile ? digest(bytes) !== patchFile.afterSha256 :
      createHash('sha1').update(Buffer.from(`blob ${bytes.length}\0`)).update(bytes).digest('hex') !== file.gitBlobSha1)
      throw Error(`Fixed-tag build input mismatch: ${file.path}`)
  }
  // Local build hooks/config must not silently override the pinned inputs.
  for (const name of ['build.rs', '.cargo/config', '.cargo/config.toml', 'rust-toolchain', 'rust-toolchain.toml'])
    if (!manifest.upstreamTree.some(f => f.path === name) && fs.existsSync(path.join(sourceRoot, name)))
      throw Error(`Unpinned build input: ${name}`)
  return manifest.sourceTreeSha256
}

function verifyArtifact(bytes, receipt) {
  loadLinuxDragPatch()
  const target = receipt.target
  if (!['x86_64-unknown-linux-gnu', 'aarch64-unknown-linux-gnu'].includes(target) ||
      receipt.schema !== 1 || receipt.kind !== 'local-cargo-offline-locked-release' ||
      receipt.patchId !== identity.id || receipt.baseCommit !== identity.baseCommit ||
      receipt.patchSha256 !== identity.patchSha256 || receipt.sourceTreeSha256 !== identity.sourceTreeSha256 ||
      JSON.stringify(receipt.sourceSha256) !== JSON.stringify(identity.sourceSha256) ||
      receipt.binarySha256 !== digest(bytes) || !Number.isFinite(Date.parse(receipt.builtAt)))
    throw Error('Local Linux drag artifact/receipt mismatch')
  if (bytes.length < 64 || !bytes.subarray(0, 4).equals(Buffer.from([127, 69, 76, 70])) ||
      bytes[4] !== 2 || bytes[5] !== 1 || bytes[6] !== 1 || ![2, 3].includes(bytes.readUInt16LE(16)) ||
      bytes.readUInt16LE(18) !== (target.startsWith('x86_64-') ? 62 : 183))
    throw Error('Local Linux drag artifact ELF/target mismatch')
}

/** Only this explicit command creates a build receipt, after real cargo exit0.
 * A cached complete upstream tree/toolchain is required; no network fetches. */
export function buildLinuxDrag(sourceRoot, target, outputRoot) {
  if (process.platform !== 'linux') throw Error('Full backend build requires a Linux build host')
  if (!['x86_64-unknown-linux-gnu', 'aarch64-unknown-linux-gnu'].includes(target)) throw Error('Unsupported build target')
  if (![sourceRoot, outputRoot, process.env.CARGO, process.env.RUSTC, process.env.CARGO_HOME].every(p => typeof p === 'string' && path.isAbsolute(p)))
    throw Error('Absolute SOURCE/OUTPUT/CARGO/RUSTC/offline CARGO_HOME required')
  const source = fs.realpathSync(sourceRoot), output = path.resolve(outputRoot)
  if (fs.existsSync(output) || output === source || output.startsWith(source + path.sep) || source.startsWith(output + path.sep))
    throw Error('Use a fresh output directory outside the upstream tree')
  verifyLinuxDragSource(source)
  fs.mkdirSync(path.join(output, 'home'), {recursive: true})
  const args = ['build', '--offline', '--locked', '--release', '--bin', 'computer-use-linux', '--target', target, '--target-dir', path.join(output, 'target')]
  const env = {PATH: process.env.PATH ?? '/usr/bin:/bin', HOME: path.join(output, 'home'),
    CARGO_HOME: process.env.CARGO_HOME, RUSTC: process.env.RUSTC, CARGO_NET_OFFLINE: 'true'}
  const result = spawnSync(process.env.CARGO, args, {cwd: source, env, stdio: 'inherit'})
  if (result.error || result.status !== 0) throw Error(`Offline Linux drag build failed: ${result.status ?? result.error?.message}`)
  verifyLinuxDragSource(source) // no during-build source drift accepted
  const bytes = fs.readFileSync(path.join(output, 'target', target, 'release', 'computer-use-linux'))
  const receipt = {schema: 1, kind: 'local-cargo-offline-locked-release', patchId: identity.id,
    baseCommit: identity.baseCommit, patchSha256: identity.patchSha256, sourceTreeSha256: identity.sourceTreeSha256,
    sourceSha256: identity.sourceSha256, target, binarySha256: digest(bytes), builtAt: new Date().toISOString()}
  verifyArtifact(bytes, receipt)
  const artifact = path.join(output, 'computer-use-linux')
  fs.writeFileSync(artifact, bytes, {flag: 'wx', mode: 0o755})
  fs.writeFileSync(artifact + suffix, JSON.stringify(receipt, null, 2) + '\n', {flag: 'wx'})
  return {artifact, receipt}
}

/** Explicit physical copy to a fresh versioned path; never replace a live server.
 * The same command path + adjacent receipt is consumed by connectedExecutor. */
export function installLinuxDragArtifact(artifact, destination) {
  if (!path.isAbsolute(artifact) || !path.isAbsolute(destination)) throw Error('Absolute artifact/install paths required')
  const bytes = fs.readFileSync(artifact), receipt = JSON.parse(fs.readFileSync(artifact + suffix, 'utf8'))
  verifyArtifact(bytes, receipt)
  if (fs.existsSync(destination) || fs.existsSync(destination + suffix)) throw Error('Fresh install path required; existing server not overwritten')
  fs.mkdirSync(path.dirname(destination), {recursive: true})
  fs.writeFileSync(destination, bytes, {flag: 'wx', mode: 0o755})
  try {
    fs.writeFileSync(destination + suffix, JSON.stringify(receipt, null, 2) + '\n', {flag: 'wx'})
  } catch (error) {fs.unlinkSync(destination); throw error}
  return {command: destination, args: ['mcp'], receipt: destination + suffix}
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const [command, ...args] = process.argv.slice(2)
    let result
    if (command === 'apply' && args.length === 1) result = patchLinuxDragSource(args[0])
    else if (command === 'verify-source' && args.length === 1) result = verifyLinuxDragSource(args[0])
    else if (command === 'build' && args.length === 3) result = buildLinuxDrag(...args)
    else if (command === 'install' && args.length === 2 && process.platform === 'linux') result = installLinuxDragArtifact(...args)
    else throw Error('Usage: apply SOURCE | verify-source SOURCE | build SOURCE TARGET OUTPUT | install ARTIFACT NEW_ABSOLUTE_PATH (build/install on Linux)')
    console.log(JSON.stringify(result, null, 2))
  } catch (error) {console.error(error.message); process.exitCode = 1}
}
