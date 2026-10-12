import type {SpawnSyncOptionsWithStringEncoding, SpawnSyncReturns} from 'node:child_process'
import type {Stats} from 'node:fs'

/** Exact options supplied by upstream uor to execFileSync/its spawnSync bridge. */
export type WindowsWhereOptions287 = SpawnSyncOptionsWithStringEncoding & {
  stdio: 'pipe'
  encoding: 'utf8'
  timeout: 5000
  windowsHide: true
  env: NodeJS.ProcessEnv
}

export interface WindowsExecutableDiscoveryPorts287 {
  /** Return the CURRENT context runtime cache, never a captured pre-reset object. */
  getCache(): object
  getEnv(): NodeJS.ProcessEnv
  cwd(): string
  homedir(): string
  lstatSync(path: string, options: {throwIfNoEntry: false}): Stats | undefined
  realpathSyncNative(path: string): string
  spawnSync(file: string, args: string[], options: WindowsWhereOptions287): SpawnSyncReturns<string>
}

export interface WindowsExecutableDiscovery287 {
  /** forceRefresh clears a cached null, but still accepts a non-stale cached path. */
  findExecutable(name: string, forceRefresh?: boolean): string | null
}

/** Full pinned uor, its original WeakMap/Map caches and complete cwd-filter closure. */
export function createWindowsExecutableDiscovery287(
  ports: WindowsExecutableDiscoveryPorts287,
): WindowsExecutableDiscovery287
