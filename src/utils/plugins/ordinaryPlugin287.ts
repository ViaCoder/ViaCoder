/** Public plugin operations borrow the one canonical installed/consent owner. */
import type {PluginScope} from './schemas.js'
import type {ReactNode} from 'react'
import {createElement} from 'react'

export type EntryHelperDisclosure287 = {command:string;archiveUrl:string}
export type ExplicitPluginUpdateOptions287 = {
 skipMarketplaceRefresh?:boolean
 skipCommandSources?:boolean
 explicit?:boolean
 announceCommandSource?:(pluginId:string,entry:unknown,acceptedCommand?:string)=>Promise<string|undefined>
 consentedEntryHelper?:EntryHelperDisclosure287|null
 onEntryHelperDisclosure?:(disclosure:string,entry:unknown,context:unknown)=>Promise<'accepted'|'declined'|'unattended'>
}
export type OrdinaryPluginUpdateResult287 = {
 outcome:'failed'|'skipped'|'up_to_date'|'updated'
 message:string;pluginId?:string;scope?:PluginScope;newVersion?:string;oldVersion?:string
 failureCode?:string;skipReason?:string;blockedBy?:string[]
}
export type OrdinaryPluginUpdateCliOptions287 = {yes?:boolean;json?:boolean;acceptCommand?:string}
export type OrdinaryPluginInstallOptions287 = {
 shownSourceCommand?:string;shownEntryHelper?:EntryHelperDisclosure287|null;
 announceRefreshResult?:unknown;replaceInstalledCopy?:boolean;
 replaceOnlyPluginIds?:string[];carrySettingsFrom?:unknown;
 surface?:string;npmRegistry?:string
}
export type OrdinaryPluginInstallCliOptions287 = {scope?:string;cowork?:boolean;yes?:boolean;json?:boolean;acceptCommand?:string;config?:string[];replace?:boolean;registry?:string}
export function installOrdinaryPluginCli287(getRoot:()=>Promise<import('../../ink.js').Root>,plugin:string,options:OrdinaryPluginInstallCliOptions287={},storage?:unknown):Promise<void> {
 const run=ordinaryPluginSource287('chunk-3q8hrxfm.js').ga as (getRoot:()=>Promise<import('../../ink.js').Root>,plugin:string,options:OrdinaryPluginInstallCliOptions287,storage?:unknown)=>Promise<void>
 return run(getRoot,plugin,options,storage)
}
export type OrdinaryPluginUninstallCliOptions287={scope?:string;cowork?:boolean;keepData?:boolean;json?:boolean;prune?:boolean;yes?:boolean}
export type OrdinaryPluginPruneCliOptions287={scope?:string;cowork?:boolean;dryRun?:boolean;yes?:boolean}
export type OrdinaryPluginEnableCliOptions287={scope?:string;cowork?:boolean;json?:boolean}
export type OrdinaryPluginDisableCliOptions287=OrdinaryPluginEnableCliOptions287&{all?:boolean}
/** Complete public callbacks share the same canonical installed/settings owner. */
export function uninstallOrdinaryPluginCli287(getRoot:()=>Promise<import('../../ink.js').Root>,plugin:string,options:OrdinaryPluginUninstallCliOptions287={},storage?:unknown):Promise<void>{
 const run=ordinaryPluginSource287('chunk-3q8hrxfm.js').fa as (getRoot:()=>Promise<import('../../ink.js').Root>,plugin:string,options:OrdinaryPluginUninstallCliOptions287,storage?:unknown)=>Promise<void>
 return run(getRoot,plugin,options,storage)
}
export function pruneOrdinaryPluginCli287(root:import('../../ink.js').Root,options:OrdinaryPluginPruneCliOptions287={},storage?:unknown):Promise<void>{
 const run=ordinaryPluginSource287('chunk-3q8hrxfm.js').ma as (root:import('../../ink.js').Root,options:OrdinaryPluginPruneCliOptions287,storage?:unknown)=>Promise<void>
 return run(root,options,storage)
}
export function enableOrdinaryPluginCli287(getRoot:()=>Promise<import('../../ink.js').Root>,plugin:string,options:OrdinaryPluginEnableCliOptions287={},storage?:unknown):Promise<void>{
 const run=ordinaryPluginSource287('chunk-3q8hrxfm.js').ha as (getRoot:()=>Promise<import('../../ink.js').Root>,plugin:string,options:OrdinaryPluginEnableCliOptions287,storage?:unknown)=>Promise<void>
 return run(getRoot,plugin,options,storage)
}
export function disableOrdinaryPluginCli287(getRoot:()=>Promise<import('../../ink.js').Root>,plugin:string|undefined,options:OrdinaryPluginDisableCliOptions287={},storage?:unknown):Promise<void>{
 const run=ordinaryPluginSource287('chunk-3q8hrxfm.js').ka as (getRoot:()=>Promise<import('../../ink.js').Root>,plugin:string|undefined,options:OrdinaryPluginDisableCliOptions287,storage?:unknown)=>Promise<void>
 return run(getRoot,plugin,options,storage)
}
export function installOrdinaryPlugin287<T>(plugin:string,scope:PluginScope='user',options:OrdinaryPluginInstallOptions287={},storage?:unknown):Promise<T> {
 const run=ordinaryPluginSource287('chunk-rj9er4xt.js').Ytt as (plugin:string,scope:PluginScope,options:OrdinaryPluginInstallOptions287,storage?:unknown)=>Promise<T>
 return run(plugin,scope,options,storage)
}
export function installOrdinaryResolvedPlugin287<T>(options:object):Promise<T> {
 const run=ordinaryPluginSource287('chunk-mphp7acd.js').lLt as (options:object)=>Promise<T>
 return run(options)
}
export function installOrdinaryMarketplacePlugin287<T>(options:object):Promise<T> {
 const run=ordinaryPluginSource287('chunk-mphp7acd.js').Pdt as (options:object)=>Promise<T>
 return run(options)
}
export function ordinaryPluginSource287(file:string):Record<string,unknown> {
 return (import.meta.require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287(file)
}
export function updateOrdinaryPlugin287(plugin:string,scope?:PluginScope,options:ExplicitPluginUpdateOptions287={},storage?:unknown):Promise<OrdinaryPluginUpdateResult287> {
 const run=ordinaryPluginSource287('chunk-rj9er4xt.js').yGe as (plugin:string,scope:PluginScope|undefined,options:ExplicitPluginUpdateOptions287,storage?:unknown)=>Promise<OrdinaryPluginUpdateResult287>
 return run(plugin,scope,options,storage)
}
export function updateOrdinaryPluginCli287(plugin:string,scope?:PluginScope,options:OrdinaryPluginUpdateCliOptions287={},storage?:unknown):Promise<void> {
 const run=ordinaryPluginSource287('chunk-5ka0mc07.js').yro as (plugin:string,scope:PluginScope|undefined,options:OrdinaryPluginUpdateCliOptions287,storage?:unknown)=>Promise<void>
 return run(plugin,scope,options,storage)
}
export function renderOrdinaryManagePlugins287(props:object):ReactNode {
 const render=ordinaryPluginSource287('chunk-yv06fjzd.js').Jl as (props:object)=>ReactNode
 return createElement(render,props)
}
export function renderOrdinaryPluginSettings287(props:object):ReactNode {
 const render=ordinaryPluginSource287('chunk-yv06fjzd.js').zvt as (props:object)=>ReactNode
 return createElement(render,props)
}

export function callOrdinaryPluginSettings287(onDone:import('../../types/command.js').LocalJSXCommandOnDone,context:import('../../types/command.js').LocalJSXCommandContext,args?:string):Promise<ReactNode> {
 const call=ordinaryPluginSource287('chunk-6tpvax5k.js').p as (onDone:import('../../types/command.js').LocalJSXCommandOnDone,context:import('../../types/command.js').LocalJSXCommandContext,args?:string)=>Promise<ReactNode>
 return call(onDone,context,args)
}
