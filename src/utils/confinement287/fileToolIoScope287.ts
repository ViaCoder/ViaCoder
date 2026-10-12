import {AsyncLocalStorage} from 'node:async_hooks'
import {randomUUID} from 'node:crypto'
import {basename} from 'node:path'
import type {ConfinedFileIo287} from './fileIoProcess287.js'
import type {FileIoError287} from './fileIoProtocol287.js'
import type {WorkspacePolicy287} from './workspacePolicy287.js'

type IoScope = {policy: WorkspacePolicy287; signal: AbortSignal; kind: 'tool' | 'sdk'; handles: Map<string, ConfinedFileIo287>}
const scopes = new AsyncLocalStorage<IoScope>()
/** Internal producer seams only; no protocol endpoint or new authority. */
export function getConfinedFileToolContext287() {
  const scope = scopes.getStore()
  return scope ? {policy: scope.policy, signal: scope.signal, kind: scope.kind} : undefined
}
/** Recheck the captured authority after asynchronous process preparation. */
export function assertConfinedFileToolContext287(context: NonNullable<ReturnType<typeof getConfinedFileToolContext287>>): void {
  if (execution().requireExecutionWorkspaceConfinement287() !== context.policy) throw new Error('File-I/O execution owner changed')
  context.signal.throwIfAborted()
}
export function getConfinedFileToolHandle287(path: string) {
  return scopes.getStore()?.handles.get(path)
}
/** SDK X4t borrows this same per-call scope and worker, not another I/O owner. */
export async function openConfinedSdkRead287(path: string): Promise<ConfinedFileIo287> {
  const scope = scopes.getStore()
  if (!scope || scope.kind !== 'sdk') throw new Error('SDK read has no confined file-I/O scope')
  const handle = await open(scope, path, [path], {readOnly: true})
  scope.handles.set(path, handle)
  scope.handles.set(handle.canonicalPath, handle)
  return handle
}
export function getConfinedSdkRead287(): ConfinedFileIo287 {
  const handle = scopes.getStore()?.handles.values().next().value
  if (!handle) throw new Error('SDK metadata read has no confined descriptor')
  return handle
}
function execution() {
  return (import.meta.require('../../services/context/execution287.js') as typeof import('../../services/context/execution287.js'))
}
function revive(error: FileIoError287): Error {
  // Preserve the original instanceof checks in the canonical tool closures.
  const lifecycle = (import.meta.require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
  const namespace = lifecycle.clearSourceModule287('chunk-0pprbvtw.js')
  const constructorName = {
    SymlinkWriteRefusedError: 'dm', HardLinkWriteRefusedError: 'RAn',
    SymlinkReadRefusedError: 'qwe', StagingDirTamperedError: 'prr',
  }[error.name]
  const rangeConstructor = {FileTooLargeError: 'Tut', SelectedRangeTooLargeError: 'ZLt'}[error.name]
  const constructor = rangeConstructor ? Reflect.get(lifecycle.clearSourceModule287('chunk-09m4fzsj.js'), rangeConstructor) : constructorName ? Reflect.get(namespace, constructorName) : undefined
  // HardLink's original constructor has two path arguments. Use its prototype
  // without calling that formatter on an already formatted error message.
  const result = new Error(error.message)
  if (typeof constructor === 'function') Object.setPrototypeOf(result, constructor.prototype)
  else if (error.telemetryMessage !== undefined) {
    const originalError = Reflect.get(lifecycle.clearSourceModule287('chunk-c9me9cp7.js'), 'P')
    if (typeof originalError === 'function') Object.setPrototypeOf(result, originalError.prototype)
  }
  result.name = error.name
  if (error.code !== undefined) Object.assign(result, {code: error.code})
  if (error.telemetryMessage !== undefined) Object.assign(result, {telemetryMessage: error.telemetryMessage})
  for (const key of ['sizeInBytes', 'maxSizeBytes', 'selectedBytes', 'maxSelectedBytes'] as const) {
    if (error[key] !== undefined) Object.assign(result, {[key]: error[key]})
  }
  return result
}
export async function runWithConfinedFileToolIo287<T>(signal: AbortSignal, callback: () => Promise<T>, kind: 'tool' | 'sdk' = 'tool'): Promise<T> {
  const policy = execution().getExecutionWorkspaceConfinement287()
  if (!policy) return callback()
  const current = scopes.getStore()
  if (current?.policy === policy && current.signal === signal && current.kind === kind) return callback()
  const scope: IoScope = {policy, signal, kind, handles: new Map()}
  return scopes.run(scope, async () => {
    try {return await callback()}
    finally {await Promise.all([...scope.handles.values()].map(handle => handle.close()))}
  })
}
async function open(scope: IoScope, path: string, approvedPaths: string[], options?: {createParents?: boolean; leaf?: 'replace'; readOnly?: boolean; checkedIdentity?: {dev: string; ino: string}}) {
  if (execution().getExecutionWorkspaceConfinement287() !== scope.policy) throw new Error('File-I/O execution owner changed')
  const {openConfinedFileIo287} = await import('./fileIoProcess287.js')
  assertConfinedFileToolContext287(scope)
  return openConfinedFileIo287({path, approvedPaths, ...options}, scope.signal, revive)
}
/** Narrow import seam only. Complete original algorithms, NZ, permission stash,
 * history, cache and LSP stay canonical; sync filesystem APIs are not replaced.
 */
export function wrapOriginalFileIo287(operation: 'openRead' | 'range' | 'pin' | 'readText' | 'readExisting' | 'mtime' | 'writeText' | 'historyCopy' | 'filesystem', original: (...args: any[]) => any) {
  return (...args: any[]) => {
    const scope = scopes.getStore()
    if (!scope) return original(...args)
    if (operation === 'filesystem') {
      const fs = original(...args)
      // Same filesystem owner, only asynchronous tool-content reading is
      // transported. Never substitute Promises into sync metadata APIs.
      return new Proxy(fs, {get(target, key, receiver) {
        if (key === 'readFileBytes') return async (path: string, maxBytes?: number) => {
          const held = scope.handles.get(path)
          if (held) return held.readBytes(maxBytes)
          const handle = await open(scope, path, [path], {readOnly: true})
          try {return await handle.readBytes(maxBytes)} finally {await handle.close()}
        }
        if (key === 'stat') return async (path: string) => {
          const held = scope.handles.get(path)
          if (!held) return target.stat(path)
          const stat = await held.stat()
          return {...stat, isFile: () => stat.regular, isDirectory: () => stat.directory}
        }
        return Reflect.get(target, key, receiver)
      }})
    }
    return (async () => {
      scope.policy.assertRootIdentity()
      if (operation === 'openRead') {
        const identity = args[3] ? {dev: String(args[3].dev), ino: String(args[3].ino)} : undefined
        const handle = await open(scope, args[0], args[1], {readOnly: true, checkedIdentity: identity})
        scope.handles.set(args[0], handle)
        scope.handles.set(handle.canonicalPath, handle)
        return {ioPath: handle.canonicalPath, canonicalPath: handle.canonicalPath, handle: {
          stat: async () => {const stat = await handle.stat(); return {...stat, isFile: () => stat.regular, isDirectory: () => stat.directory}},
        }, close: () => handle.close()}
      }
      if (operation === 'range') {
        const held = scope.handles.get(args[0])
        if (!held) throw new Error('File range read has no confined handle')
        return held.readRange(args[1], args[2], args[3], args[5])
      }
      if (operation === 'historyCopy') {
        // Only the canonical original history destination may be written on
        // the trusted host. No new backup directory or copy scheme is added.
        const lifecycle = (import.meta.require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
        const paths = lifecycle.clearSourceModule287('chunk-mphp7acd.js')
        const backupPath = Reflect.get(paths, 'IP')
        if (typeof backupPath !== 'function' || backupPath(basename(args[1])) !== args[1]) throw new Error('File-I/O history destination is not canonical')
        const handle = await open(scope, args[0], [args[0]])
        try {
          const {writeFile} = await import('node:fs/promises')
          await writeFile(args[1], await handle.readBytes())
          return
        } finally {await handle.close()}
      }
      if (operation === 'pin') {
        const handle = await open(scope, args[0], args[1], args[2])
        const token = `viacoder-file-io://${randomUUID()}`
        scope.handles.set(token, handle)
        return {
          ioPath: token, canonicalPath: handle.canonicalPath,
          readExisting: (maxBytes?: number) => handle.readExisting(maxBytes),
          recheckBeforeWrite: () => handle.recheckBeforeWrite(),
          close: async () => {try {await handle.close()} finally {scope.handles.delete(token)}},
        }
      }
      const held = scope.handles.get(args[0])
      if (operation === 'writeText') {
        if (!held) throw new Error('File commit has no confined pin')
        return held.write(args[1], args[2], args[3])
      }
      if (held) return operation === 'mtime' ? held.mtime() : held.readExisting(args[1])
      const handle = await open(scope, args[0], [args[0]])
      try {
        if (operation === 'mtime') return await handle.mtime()
        const result = await handle.readExisting(operation === 'readExisting' ? args[3] : args[1])
        if (result !== null || operation === 'readExisting') return result
        throw Object.assign(new Error(`ENOENT: no such file or directory, open '${args[0]}'`), {code: 'ENOENT'})
      } finally {await handle.close()}
    })()
  }
}
