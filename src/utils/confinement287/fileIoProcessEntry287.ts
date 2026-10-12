// Private, short-lived I/O entry. The parent retains the original tool/session
// algorithm; this process holds the original file pin inside the OS sandbox.
import * as fs from 'node:fs'
import * as fsPromises from 'node:fs/promises'
import * as path from 'node:path'
import * as os from 'node:os'
import * as stream from 'node:stream'
import * as stringDecoder from 'node:string_decoder'
import {createReadFileRange287} from '../officialReadFileRange287/native.js'
import {createInterface} from 'node:readline'
import {createBoundFileIo287, createBoundAtomicWriter287, type BoundFilePin287, type BoundFileRead287} from '../officialBoundFileIo287/native.js'
import type {AtomicStagingRegistry287} from '../officialAtomicWriter287/native.js'
import {assertNonAdministrator287} from './processPrivilege287.js'
import type {FileIoError287, FileIoReply287, FileIoRequest287, FileIoRoot287} from './fileIoProtocol287.js'

assertNonAdministrator287('worker')
if (process.platform !== 'darwin' && process.platform !== 'linux') throw new Error('Unsupported file-I/O sandbox platform')
const platform = `${process.platform}-${process.arch}`
if (platform !== 'darwin-arm64' && platform !== 'darwin-x64' && platform !== 'linux-arm64' && platform !== 'linux-x64') {
  throw new Error('Unsupported file-I/O sandbox architecture')
}
// The official external-build profiler is a Disposable no-op. Do not load
// application settings/auth merely to instrument private filesystem calls.
const externalProfile: Disposable = {[Symbol.dispose]() {}}
const confinedPromises = {...fsPromises,
  async open(...args: Parameters<typeof fsPromises.open>) {
    const handle = await fsPromises.open(...args)
    try {
      const stat = await handle.stat()
      if (stat.isFile() && stat.nlink !== 1) throw new Error('File I/O requires a singly-linked regular file')
      return handle
    } catch (error) {await handle.close(); throw error}
  },
}
const io = createBoundFileIo287({
  platform, fs, fsPromises: confinedPromises, path, os,
  getPlatform: () => process.platform === 'darwin' ? 'macos' :
    /microsoft|wsl/i.test(fs.readFileSync('/proc/version', 'utf8')) ? 'wsl' : 'linux',
  debug() {}, profileFs: () => externalProfile,
})
const rangeReader = createReadFileRange287({fs, 'fs/promises': confinedPromises, stream, string_decoder: stringDecoder})
let readPin: BoundFileRead287 | undefined
let pin: BoundFilePin287 | undefined
let root: FileIoRoot287 | undefined
let rootHandle: fsPromises.FileHandle | undefined
let closed = false
let stagingRegistry: AtomicStagingRegistry287
const atomic = createBoundAtomicWriter287(platform, {
  ae: () => io.fs,
  t() {}, m() {},
  j: () => stagingRegistry,
})
stagingRegistry = new atomic.StagingRegistry()
async function checkRoot() {
  if (!root || !rootHandle) throw new Error('File I/O has no open workspace')
  const held = await rootHandle.stat({bigint: true})
  const current = await fsPromises.lstat(root.canonicalPath, {bigint: true})
  if (!held.isDirectory() || !current.isDirectory() ||
      held.dev.toString() !== root.device || held.ino.toString() !== root.inode ||
      current.dev !== held.dev || current.ino !== held.ino ||
      await fsPromises.realpath(root.canonicalPath) !== root.canonicalPath) {
    throw new Error('Workspace identity changed during file I/O')
  }
}
function inside(file: string) {
  if (!root || !path.isAbsolute(file)) throw new Error('Invalid file-I/O path')
  const relative = path.relative(root.canonicalPath, file)
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error('File I/O outside workspace')
  }
}
async function close() {
  closed = true
  try {await pin?.close(); await readPin?.close()} finally {pin = undefined; readPin = undefined; await rootHandle?.close(); rootHandle = undefined}
}
async function operate(request: FileIoRequest287): Promise<unknown> {
  if (closed) throw new Error('File I/O is closed')
  if (request.kind === 'close') {await close(); return null}
  if (request.kind === 'open') {
    if (rootHandle || pin || readPin) throw new Error('File I/O target is already open')
    root = request.root
    rootHandle = await fsPromises.open(root.canonicalPath, fs.constants.O_RDONLY | fs.constants.O_DIRECTORY | fs.constants.O_NOFOLLOW)
    await checkRoot()
    inside(request.path)
    request.approvedPaths.forEach(inside)
    if (request.readOnly) {
      const identity = request.checkedIdentity ? {dev: BigInt(request.checkedIdentity.dev), ino: BigInt(request.checkedIdentity.ino)} : undefined
      readPin = await io.openRead(request.path, request.approvedPaths, undefined, identity)
      inside(readPin.canonicalPath)
      return {canonicalPath: readPin.canonicalPath}
    }
    pin = await io.pinWrite(request.path, request.approvedPaths, {
      createParents: request.createParents, leaf: request.leaf,
    })
    inside(pin.canonicalPath)
    return {canonicalPath: pin.canonicalPath}
  }
  await checkRoot()
  if (!pin && !readPin) throw new Error('File I/O target is not open')
  const target = readPin ?? pin!
  if (readPin) {
    const stat = await readPin.handle.stat()
    if (!stat.isFile() || stat.nlink !== 1) throw new Error('File-I/O read requires a singly-linked regular file')
    if (request.kind === 'identityStat') {
      if (request.path !== undefined) inside(request.path)
      const identity = request.path === undefined ? await readPin.handle.stat({bigint: true})
        : await fsPromises.lstat(request.path, {bigint: true})
      return {dev: identity.dev.toString(), ino: identity.ino.toString(), size: identity.size.toString(), regular: identity.isFile()}
    }
    if (request.kind === 'realpath' || request.kind === 'readlink') {
      inside(request.path)
      const result = await fsPromises[request.kind](request.path)
      if (request.kind === 'realpath') inside(result)
      return result
    }
    if (request.kind === 'readAt') {
      if (!Number.isSafeInteger(request.offset) || request.offset < 0 ||
          !Number.isSafeInteger(request.length) || request.length < 0) throw new Error('Invalid file-I/O read range')
      const buffer = Buffer.alloc(request.length)
      const {bytesRead} = await readPin.handle.read(buffer, 0, buffer.length, request.offset)
      return buffer.subarray(0, bytesRead).toString('base64')
    }
    if (request.kind === 'read') return io.readTextFromHandle(readPin.handle, readPin.canonicalPath, request.maxBytes)
    if (request.kind === 'readBytes') {
      // A retained descriptor is shared by page-count, rendering and the
      // original whole-file reader. Do not advance its implicit position.
      const buffer = Buffer.alloc(Math.min(stat.size, request.maxBytes ?? stat.size))
      let offset = 0
      while (offset < buffer.length) {
        const {bytesRead} = await readPin.handle.read(buffer, offset, buffer.length - offset, offset)
        if (!bytesRead) break
        offset += bytesRead
      }
      return buffer.subarray(0, offset).toString('base64')
    }
    if (request.kind === 'readChunk') {
      if (!Number.isSafeInteger(request.offset) || request.offset < 0) throw new Error('Invalid file-I/O chunk offset')
      const buffer = Buffer.alloc(64 * 1024)
      const {bytesRead} = await readPin.handle.read(buffer, 0, buffer.length, request.offset)
      return buffer.subarray(0, bytesRead).toString('base64')
    }
    if (request.kind === 'range') return rangeReader.readRange(readPin.canonicalPath, request.offset, request.limit, request.maxBytes, undefined, {handle: readPin.handle, maxSelectedBytes: request.maxSelectedBytes, truncateOnByteLimit: request.truncateOnByteLimit})
    if (request.kind === 'stat') return {size: stat.size, mtimeMs: stat.mtimeMs, regular: stat.isFile(), directory: stat.isDirectory()}
    if (request.kind === 'mtime') return Math.floor(stat.mtimeMs)
    throw new Error('Read-only file-I/O handle does not admit mutation')
  }
  if (!pin) throw new Error('Missing file mutation pin')
  switch (request.kind) {
    case 'read': {
      // The original reader opens through confinedPromises: the actual file
      // descriptor, not a preceding pathname stat, enforces the hardlink gate.
      return pin.readExisting(request.maxBytes)
    }
    case 'stat': {
      const stat = await io.stat(target.ioPath)
      return {size: stat.size, mtimeMs: stat.mtimeMs, regular: stat.isFile(), directory: stat.isDirectory()}
    }
    case 'range': throw new Error('Range reads require a read-only pin')
    case 'readChunk': throw new Error('Chunk reads require a read-only pin')
    case 'readAt': case 'identityStat': case 'realpath': case 'readlink':
      throw new Error('Remote descriptor operations require a read-only pin')
    case 'mtime': return io.mtime(pin.ioPath)
    case 'readBytes': {
      await pin.recheckBeforeWrite()
      const handle = await fsPromises.open(pin.ioPath, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW | fs.constants.O_NONBLOCK)
      try {
        const stat = await handle.stat()
        if (!stat.isFile() || stat.nlink !== 1) throw new Error('File-I/O byte read requires a singly-linked regular file')
        const bytes = request.maxBytes === undefined ? await handle.readFile()
          : await io.fs.readFileBytes(pin.ioPath, request.maxBytes)
        return bytes.toString('base64')
      } finally {await handle.close()}
    }
    case 'recheck': await pin.recheckBeforeWrite(); return null
    case 'write': {
      await pin.recheckBeforeWrite()
      const content = request.lineEndings === 'CRLF'
        ? request.content.replaceAll('\r\n', '\n').split('\n').join('\r\n') : request.content
      await atomic.write(pin.ioPath, content, {encoding: request.encoding, refuseHardLinkedInPlace: true})
      const size = Buffer.byteLength(content, request.encoding)
      const stat = await io.stat(pin.ioPath)
      if (stat.size !== size) {
        const error = new Error(`Write verification failed: ${pin.canonicalPath} is ${stat.size} bytes on disk, expected ${size}. The filesystem may have silently truncated the write (network drive / cloud sync).`)
        Object.assign(error, {telemetryMessage: 'writeTextContent: on-disk size mismatch after write'})
        throw error
      }
      return Math.floor(stat.mtimeMs)
    }
  }
}
function errorFrame(value: unknown): FileIoError287 {
  const error = value instanceof Error ? value : new Error('File I/O failed')
  return {name: error.name, message: error.message,
    ...(typeof Reflect.get(error, 'code') === 'string' ? {code: Reflect.get(error, 'code')} : {}),
    ...Object.fromEntries(['sizeInBytes', 'maxSizeBytes', 'selectedBytes', 'maxSelectedBytes'].filter(key => typeof Reflect.get(error, key) === 'number').map(key => [key, Reflect.get(error, key)])),
    ...(typeof Reflect.get(error, 'telemetryMessage') === 'string' ? {telemetryMessage: Reflect.get(error, 'telemetryMessage')} : {}),
  }
}
const lines = createInterface({input: process.stdin})
try {
  for await (const line of lines) {
    let reply: FileIoReply287
    try {reply = {ok: true, value: await operate(JSON.parse(line) as FileIoRequest287)}}
    catch (error) {reply = {ok: false, error: errorFrame(error)}}
    await new Promise<void>((resolve, reject) => process.stdout.write(JSON.stringify(reply) + '\n', error => error ? reject(error) : resolve()))
    if (closed) break
  }
} finally {lines.close(); if (!closed) await close()}
