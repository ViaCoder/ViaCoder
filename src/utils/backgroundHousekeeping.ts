import * as fs from 'node:fs/promises'
import {stat, writeFile, utimes} from 'node:fs/promises'
import {join} from 'node:path'
import {getIsInteractive, getLastInteractionTime} from '../bootstrap/state.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {initAutoDream} from '../services/autoDream/autoDream.js'
import {initExtractMemories} from '../services/extractMemories/extractMemories.js'
import {getClaudeConfigHomeDir} from './envUtils.js'
import {logForDebugging} from './debug.js'
import {logError} from './log.js'
import {getDevModsMetadataOwner287} from './sessionStorage.js'
import {isStorageV5PinnedOn, type StorageV5Backend, type StorageV5Key} from './secureStorage/storageV5.js'
import {cleanupOldMessageFilesInBackground} from './cleanup.js'
import {cleanupOldVersions} from './nativeInstaller/index.js'
import {autoUpdateMarketplacesAndPluginsInBackground} from './plugins/pluginAutoupdate.js'
import {ensureDeepLinkProtocolRegistered} from './deepLink/registerProtocol.js'
import {logEvent} from '../services/analytics/index.js'
import {createHousekeepingMarkers287, createBackgroundHousekeeping287, type HousekeepingHost287, type HousekeepingPorts287} from './officialBackgroundHousekeeping287/native.js'

function sourceModule(file: string) {
  return (require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287(file)
}


// Bind the original scheduler to existing owners; no parallel housekeeping flag,
// transcript writer, settings cache or Memory runner is introduced here.
export function createBackgroundHousekeepingPorts287(): HousekeepingPorts287 {
  const De = {state: (name: string) => (sourceModule('chunk-2z86j2rq.js').De as {state(name: string): StorageV5Key}).state(name)}
  const markers = createHousekeepingMarkers287({De, we: getClaudeConfigHomeDir, t: logForDebugging, i: (name, metadata) => logEvent(name, metadata as Parameters<typeof logEvent>[1]), j: fs, h: join})
  return {
    F: isStorageV5PinnedOn, De,
    we: getClaudeConfigHomeDir, Y: stat, N: join, z: writeFile,
    t: logForDebugging, d: logError,
    Zmr: initExtractMemories, Muo: initAutoDream,
    D: autoUpdateMarketplacesAndPluginsInBackground,
    Wu: getIsInteractive, Hg: getLastInteractionTime,
    wso: ensureDeepLinkProtocolRegistered, NBn: cleanupOldVersions,
    // Preserve the accepted local full-history retention policy in the sweep.
    fSr: cleanupOldMessageFilesInBackground,
    ...markers,
    js: getDevModsMetadataOwner287,
    My: path => (sourceModule('chunk-mphp7acd.js').My as (path: string) => StorageV5Key | undefined)(path),
    wfn: utimes,
    setTimeout: (callback, delay) => setTimeout(callback, delay),
    setInterval: (callback, delay, storage) => setInterval(callback, delay, storage),
  }
}
const scheduler = createBackgroundHousekeeping287(createBackgroundHousekeepingPorts287())

export function startBackgroundHousekeeping(
  host: HousekeepingHost287 = getExecutionSession287().host as unknown as HousekeepingHost287,
  storage?: StorageV5Backend,
): Promise<void> {
  return scheduler.start(host, storage)
}

