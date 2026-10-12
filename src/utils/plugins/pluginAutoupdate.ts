/**
 * Background plugin autoupdate functionality
 *
 * At startup, this module:
 * 1. First updates marketplaces that have autoUpdate enabled
 * 2. Then checks all installed plugins from those marketplaces and updates them
 *
 * Regular updates are disk-only; original command re-resolves may reload
 * in-session through Wot after the original cache-impact preflight.
 * Official Anthropic marketplaces have autoUpdate enabled by default,
 * but users can disable it per-marketplace.
 */

import type {StorageV5Backend} from '../secureStorage/storageV5.js'
import {getPendingUpdatesDetails,hasPendingUpdates} from './installedPluginsManager.js'
import {parsePluginIdentifier} from './pluginIdentifier.js'

export interface PluginAutoupdateNotice287 {
 type:string;source:string;plugin?:string;message?:string;error?:string
 heldAt?:string;blockedBy?:string[];disabledPinners?:string[]
}
export type PluginAutoUpdateCallback=(updated:string[],blocked:PluginAutoupdateNotice287[],reresolved:string[],announce:boolean)=>void
export interface PluginAutoupdatePass287 {
 updated:string[];blocked:PluginAutoupdateNotice287[];updateFailedCount:number
 commandSourceSkipped:string[]
 directory:{updated:number;updateFailed:number;stuck:number;identityChanged:number}
}
export interface CommandSourceReresolve287 {
 attemptedCount:number;commandSourced:Set<string>;updated:string[]
 blocked:PluginAutoupdateNotice287[];failedCount:number
}
export interface PluginAutoupdateOwner287 {
 D(storage?:StorageV5Backend):Promise<void>
 bso(listener:PluginAutoUpdateCallback):()=>void
 Plr(marketplaces:Set<string>,excluded?:Set<string>,options?:{skipCommandSources?:boolean},storage?:StorageV5Backend):Promise<PluginAutoupdatePass287>
 fxn(updated:string[],blocked:PluginAutoupdateNotice287[],reresolved?:string[],options?:{announce?:boolean}):void
 Ilr(storage?:StorageV5Backend):Promise<CommandSourceReresolve287>
}
/** The full original closures live in the one canonical namespace. No local
 * listener, pending queue, reresolve promise, plugin snapshot or disk cache. */
export function getPluginAutoupdateOwner287():PluginAutoupdateOwner287 {
 return (import.meta.require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js'))
  .getOriginalModsLifecycle287().clearSourceModule287('chunk-v77qmtr0.js') as unknown as PluginAutoupdateOwner287
}
export function onPluginsAutoUpdated(callback:PluginAutoUpdateCallback):()=>void {
 return getPluginAutoupdateOwner287().bso(callback)
}
/** Compatibility reader only; disk/snapshot still belongs to installed owner. */
export function getAutoUpdatedPluginNames():string[] {
 return hasPendingUpdates()?getPendingUpdatesDetails().map(detail=>parsePluginIdentifier(detail.pluginId).name):[]
}
/** Existing manual marketplace caller retains its string[] ABI; the whole
 * original Plr performs the update, scope, pin and command-source decisions. */
export async function updatePluginsForMarketplaces(marketplaces:Set<string>,storage?:StorageV5Backend):Promise<string[]> {
 return (await getPluginAutoupdateOwner287().Plr(marketplaces,undefined,undefined,storage)).updated
}
/** Actual Hlr D port, including its optional StorageV5 hand-in. Unlike the old
 * fire-and-forget wrapper this returns the real original pass completion. */
export function autoUpdateMarketplacesAndPluginsInBackground(storage?:StorageV5Backend):Promise<void> {
 return getPluginAutoupdateOwner287().D(storage)
}
