#!/usr/bin/env bun
// Isolated Chrome native-messaging probe. Never opens the account bridge,
// reads a browser profile, or sends a browser tool request.
import { createHash } from 'node:crypto'
import { constants as fsConstants, createWriteStream } from 'node:fs'
import { chmod, copyFile, lstat, mkdir, readFile, readdir, realpath, rename, rm, stat, writeFile } from 'node:fs/promises'
import { connect } from 'node:net'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ChromeNativeHost } from '../src/utils/claudeInChrome/chromeNativeHost.js'
import { summarizeNativeReadonlyResult } from './chrome-offline-result.mjs'

export const HOST_NAME = 'com.anthropic.claude_code_browser_extension'
export const PROD_EXTENSION_ID = 'fcoeoabgfenejglbffodgkkbkcdhcgfn'
const MAX = 1024 * 1024
const sha = data => createHash('sha256').update(data).digest('hex')
const arg = (args, key) => {
  const at = args.indexOf(key)
  if (at < 0 || at + 1 >= args.length) throw Error(`Required ${key}`)
  return args[at + 1]
}
const quote = value => `'${value.replaceAll("'", "'\\''")}'`
const stageFiles = stage => ({
  wrapper: join(stage, 'native-host'), manifest: join(stage, `${HOST_NAME}.json`),
  receipt: join(stage, 'install-receipt.json'), backup: join(stage, 'previous-manifest.json'),
  events: join(stage, 'events.jsonl'), socketDir: join(stage, 'socket'),
  nativeEntry: join(stage, 'chrome-native-entry.mjs'), nativeEntryHash: join(stage, 'chrome-native-entry.sha256'),
})
async function regularOrAbsent(path) {
  try {
    const s = await lstat(path)
    if (!s.isFile() || s.isSymbolicLink()) throw Error(`Expected regular file: ${path}`)
    return s
  } catch (error) {
    if (error.code === 'ENOENT') return null
    throw error
  }
}
async function ensureStage(path, create = false) {
  const stage = resolve(path)
  if (create) await mkdir(stage, {recursive: true, mode: 0o700})
  const s = await lstat(stage)
  if (!s.isDirectory() || s.isSymbolicLink() || (process.getuid && s.uid !== process.getuid())) throw Error('Untrusted stage')
  await chmod(stage, 0o700)
  return realpath(stage)
}
async function prepare(args) {
  const stage = await ensureStage(arg(args, '--stage'), true)
  const bun = await realpath(arg(args, '--bun'))
  const files = stageFiles(stage)
  if (await regularOrAbsent(files.receipt)) throw Error('Stage has an active install receipt; restore first')
  const script = await realpath(fileURLToPath(import.meta.url))
  for (const value of [bun, script, stage]) if (/[\r\n]/.test(value)) throw Error('Path contains newline')
  await writeFile(files.wrapper, `#!/bin/sh\ncd ${quote(stage)}\nexec ${quote(bun)} ${quote(script)} host --stage ${quote(stage)}\n`, {mode: 0o700})
  await chmod(files.wrapper, 0o700)
  const manifest = {name: HOST_NAME, description: 'Claude Code Browser Extension Native Host (offline transport probe)',
    path: files.wrapper, type: 'stdio', allowed_origins: [`chrome-extension://${PROD_EXTENSION_ID}/`]}
  await writeFile(files.manifest, JSON.stringify(manifest, null, 2) + '\n', {mode: 0o600})
  await chmod(files.manifest, 0o600)
  console.log(JSON.stringify({stage, wrapper: files.wrapper, manifest: files.manifest,
    targetExample: `~/.config/google-chrome/NativeMessagingHosts/${HOST_NAME}.json`,
    note: 'No installed manifest or browser profile changed'}, null, 2))
}
async function prepareProduct(args) {
  const stage = await ensureStage(arg(args, '--stage'), true)
  const bun = await realpath(arg(args, '--bun'))
  const release = await realpath(arg(args, '--release'))
  const files = stageFiles(stage)
  if (await regularOrAbsent(files.receipt)) throw Error('Stage has an active install receipt; restore first')
  for (const relative of ['packaging/runtime.bunfig.toml', 'preload.ts', 'src/entrypoints/cli.tsx', 'bin/cc']) {
    if (!await regularOrAbsent(join(release, relative))) throw Error(`Missing full product entry: ${relative}`)
  }
  for (const value of [bun, stage, release]) if (/[\r\n]/.test(value)) throw Error('Path contains newline')
  // Match bin/cc's full normal source entry, but pin the physical release so a
  // later `current` switch cannot change a running native host's lazy imports.
  const command = [bun, '--config=' + join(release, 'packaging/runtime.bunfig.toml'),
    '--preload', join(release, 'preload.ts'), join(release, 'src/entrypoints/cli.tsx'), '--chrome-native-host']
  await writeFile(files.wrapper, `#!/bin/sh\ncd ${quote(stage)}\nexec ${command.map(quote).join(' ')}\n`, {mode: 0o700})
  await chmod(files.wrapper, 0o700)
  const manifest = {name: HOST_NAME, description: 'Claude Code Browser Extension Native Host',
    path: files.wrapper, type: 'stdio', allowed_origins: [`chrome-extension://${PROD_EXTENSION_ID}/`]}
  await writeFile(files.manifest, JSON.stringify(manifest, null, 2) + '\n', {mode: 0o600})
  await chmod(files.manifest, 0o600)
  console.log(JSON.stringify({stage, release, wrapper: files.wrapper, manifest: files.manifest,
    entry: 'full product --chrome-native-host', note: 'No installed manifest or browser profile changed'}, null, 2))
}
async function prepareNative(args) {
  const stage = await ensureStage(arg(args, '--stage'), true)
  const bun = await realpath(arg(args, '--bun'))
  const supplied = resolve(arg(args, '--native-entry'))
  if (!await regularOrAbsent(supplied)) throw Error('Native entry bundle missing')
  const entry = await realpath(supplied)
  const files = stageFiles(stage)
  if (await regularOrAbsent(files.receipt)) throw Error('Stage has an active install receipt; restore first')
  if (await regularOrAbsent(files.nativeEntry) || await regularOrAbsent(files.nativeEntryHash)) throw Error('Stage already contains a native bundle')
  for (const value of [bun, stage, entry]) if (/[\r\n]/.test(value)) throw Error('Path contains newline')
  await copyFile(entry, files.nativeEntry, fsConstants.COPYFILE_EXCL)
  await chmod(files.nativeEntry, 0o600)
  const entrySha256 = sha(await readFile(files.nativeEntry))
  await writeFile(files.nativeEntryHash, entrySha256 + '\n', {flag: 'wx', mode: 0o600})
  await writeFile(files.wrapper, `#!/bin/sh\ncd ${quote(stage)}\nexec ${quote(bun)} ${quote(files.nativeEntry)}\n`, {mode: 0o700})
  await chmod(files.wrapper, 0o700)
  const manifest = {name: HOST_NAME, description: 'Claude Code Browser Extension Native Host',
    path: files.wrapper, type: 'stdio', allowed_origins: [`chrome-extension://${PROD_EXTENSION_ID}/`]}
  await writeFile(files.manifest, JSON.stringify(manifest, null, 2) + '\n', {mode: 0o600})
  await chmod(files.manifest, 0o600)
  console.log(JSON.stringify({stage, wrapper: files.wrapper, manifest: files.manifest,
    nativeEntry: files.nativeEntry, entrySha256,
    entry: 'dedicated production runChromeNativeHost', note: 'No installed manifest or browser profile changed'}, null, 2))
}
async function install(args) {
  const stage = await ensureStage(arg(args, '--stage'))
  const target = resolve(arg(args, '--target'))
  if (target !== join(dirname(target), `${HOST_NAME}.json`)) throw Error('Target must be the exact native host manifest filename')
  const files = stageFiles(stage)
  if (await regularOrAbsent(files.receipt)) throw Error('Already installed from this stage')
  const old = await regularOrAbsent(target)
  const staged = await readFile(files.manifest)
  const parsed = JSON.parse(staged.toString())
  if (parsed.name !== HOST_NAME || parsed.path !== files.wrapper || parsed.type !== 'stdio' ||
      JSON.stringify(parsed.allowed_origins) !== JSON.stringify([`chrome-extension://${PROD_EXTENSION_ID}/`])) throw Error('Invalid staged manifest')
  if (await regularOrAbsent(files.nativeEntryHash)) {
    const expected = (await readFile(files.nativeEntryHash, 'utf8')).trim()
    if (sha(await readFile(files.nativeEntry)) !== expected) throw Error('Staged native entry changed')
  }
  if (await regularOrAbsent(files.backup)) throw Error('Backup path already exists')
  const oldBytes = old ? await readFile(target) : null
  if (oldBytes) {
    await copyFile(target, files.backup)
    await chmod(files.backup, 0o600)
  }
  const receipt = {target, installedSha256: sha(staged), previousSha256: oldBytes ? sha(oldBytes) : null,
    previousMode: old ? old.mode & 0o777 : null}
  await writeFile(files.receipt, JSON.stringify(receipt, null, 2) + '\n', {flag: 'wx', mode: 0o600})
  try {
    const temp = join(dirname(target), `.${HOST_NAME}.${process.pid}.tmp`)
    try {
      await writeFile(temp, staged, {flag: 'wx', mode: 0o600})
      await rename(temp, target)
    } finally { await rm(temp, {force: true}) }
  } catch (error) {
    await rm(files.receipt, {force: true})
    throw error
  }
  console.log(JSON.stringify({installed: target, backup: old ? files.backup : null, sha256: receipt.installedSha256}))
}
async function restore(args) {
  const stage = await ensureStage(arg(args, '--stage'))
  const files = stageFiles(stage)
  const receipt = JSON.parse(await readFile(files.receipt, 'utf8'))
  const target = receipt.target
  if (typeof target !== 'string' || target !== join(dirname(target), `${HOST_NAME}.json`)) throw Error('Invalid receipt target')
  await regularOrAbsent(target) || (() => { throw Error('Installed manifest missing') })()
  if (sha(await readFile(target)) !== receipt.installedSha256) throw Error('Installed manifest changed; manual review required')
  if (receipt.previousSha256) {
    if (sha(await readFile(files.backup)) !== receipt.previousSha256) throw Error('Backup hash mismatch')
    const temp = join(dirname(target), `.${HOST_NAME}.${process.pid}.restore`)
    try {
      await copyFile(files.backup, temp)
      await chmod(temp, receipt.previousMode)
      await rename(temp, target)
    } finally { await rm(temp, {force: true}) }
  } else await rm(target)
  await rm(files.receipt)
  console.log(JSON.stringify({restored: target, previousSha256: receipt.previousSha256}))
}
function writeFrame(value) {
  const data = Buffer.from(JSON.stringify(value))
  const header = Buffer.alloc(4)
  header.writeUInt32LE(data.length)
  process.stdout.write(header)
  process.stdout.write(data)
}
async function host(args) {
  const stage = await ensureStage(arg(args, '--stage'))
  const files = stageFiles(stage)
  const log = createWriteStream(files.events, {flags: 'a', mode: 0o600})
  const event = kind => log.write(JSON.stringify({at: new Date().toISOString(), kind}) + '\n')
  const relay = new ChromeNativeHost({socketDir: files.socketDir,
    socketPath: join(files.socketDir, `${process.pid}.sock`),
    sendChromeMessage: raw => {
      // Production host emits only these three frame kinds without tool requests.
      const value = JSON.parse(raw)
      if (['pong', 'status_response', 'mcp_connected', 'mcp_disconnected'].includes(value.type)) {
        event(`host:${value.type}`)
        writeFrame(value)
      }
    }, log: () => {}})
  let buffer = Buffer.alloc(0)
  let stopping = false
  const stop = async () => {
    if (stopping) return
    stopping = true
    await relay.stop()
    event('host:stop')
    await new Promise(resolve => log.end(resolve))
  }
  try {
    await relay.start()
    event('host:start')
    for await (const chunk of process.stdin) {
      buffer = Buffer.concat([buffer, chunk])
      while (buffer.length >= 4) {
        const length = buffer.readUInt32LE(0)
        if (length < 1 || length > MAX) throw Error('Invalid native frame length')
        if (buffer.length < length + 4) break
        const raw = buffer.subarray(4, length + 4).toString('utf8')
        buffer = buffer.subarray(length + 4)
        let frame
        try { frame = JSON.parse(raw) } catch { event('extension:invalid-json'); continue }
        // Record no payload, device ID, tab information, account data or token.
        if (frame?.type === 'ping' || frame?.type === 'get_status') {
          event(`extension:${frame.type}`)
          await relay.handleMessage(JSON.stringify({type: frame.type}))
        } else event('extension:ignored')
      }
    }
  } finally { await stop() }
}
async function probe(args) {
  const path = await socketArg(args)
  await new Promise((resolve, reject) => {
    const socket = connect(path)
    socket.once('connect', () => socket.end())
    socket.once('close', hadError => hadError ? reject(Error('Socket error')) : resolve())
    socket.once('error', reject)
  })
  console.log(JSON.stringify({socket: path, result: 'connected-and-closed; no tool request sent'}))
}
async function socketArg(args) {
  if (args.includes('--socket')) {
    if (args.includes('--stage')) throw Error('Use either --socket or --stage')
    const path = resolve(arg(args, '--socket'))
    await trustedSocket(path)
    return path
  }
  const stage = await ensureStage(arg(args, '--stage'))
  const directory = stageFiles(stage).socketDir
  const names = (await readdir(directory)).filter(name => /^\d+\.sock$/.test(name))
  if (names.length !== 1) throw Error(`Expected one running staged native host, found ${names.length}`)
  const path = join(directory, names[0])
  await trustedSocket(path)
  return path
}
async function trustedSocket(path) {
  const dir = await lstat(dirname(path))
  if (!dir.isDirectory() || dir.isSymbolicLink() || (process.getuid && dir.uid !== process.getuid()) ||
    (dir.mode & 0o077) !== 0) throw Error('Untrusted socket directory')
  const s = await stat(path)
  if (!s.isSocket() || (process.getuid && s.uid !== process.getuid()) || (s.mode & 0o777) !== 0o600) throw Error('Untrusted socket')
}
async function nativeReadonly(args) {
  if (!args.includes('--allow-readonly-tabs-context')) throw Error('Explicit --allow-readonly-tabs-context required')
  const path = await socketArg(args)
  const {getChromeModuleForPlatform} = await import('../src/vendor/official-chrome/platform.js')
  const logger = {silly() {}, debug() {}, info() {}, warn() {}, error() {}}
  // No bridgeConfig, localPairing, bearer callback or network URL is supplied.
  // The official Linux closure therefore selects its native socket client.
  const client = getChromeModuleForPlatform('linux').createClient({serverName: 'offline-native-readonly',
    logger, clientTypeId: 'claude-code', socketPath: path, getToolCallTimeoutMs: () => 5000,
    onToolCallDisconnected: () => 'native socket disconnected'})
  client.disableAutoReconnect = true
  let timer
  try {
    let result
    try {
      result = await Promise.race([
        client.callTool('tabs_context_mcp', {createIfEmpty: false}),
        new Promise((_, reject) => { timer = setTimeout(() => reject(Error('Read-only native request timed out')), 6500) }),
      ])
    } catch {
      console.log(JSON.stringify({socket: path, request: 'tabs_context_mcp', isError: true,
        transportError: true, responseValid: false, contentBlocks: 0, tabCount: null,
        note: 'Error body discarded'}))
      return
    }
    console.log(JSON.stringify({socket: path, request: 'tabs_context_mcp',
      ...summarizeNativeReadonlyResult(result),
      note: 'Reply body, titles and URLs discarded'}))
  } finally { clearTimeout(timer); client.disconnect() }
}
const [command, ...args] = process.argv.slice(2)
try {
  if (command === 'prepare') await prepare(args)
  else if (command === 'prepare-product') await prepareProduct(args)
  else if (command === 'prepare-native') await prepareNative(args)
  else if (command === 'install') await install(args)
  else if (command === 'restore') await restore(args)
  else if (command === 'host') await host(args)
  else if (command === 'probe') await probe(args)
  else if (command === 'native-readonly') await nativeReadonly(args)
  else throw Error('Usage: chrome-offline-native.mjs prepare|prepare-product|prepare-native|install|restore|host|probe|native-readonly --stage DIR [--socket SOCKET] [--bun BUN] [--native-entry BUNDLE] [--release DIR] [--target MANIFEST]')
} catch (error) {
  console.error(`chrome-offline-native: ${error.message}`)
  process.exitCode = 1
}
