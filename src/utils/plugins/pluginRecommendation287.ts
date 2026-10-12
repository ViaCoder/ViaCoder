/** Recommendation consumers borrow the original closure and installed owner. */
import type {useNotifications} from '../../context/notifications.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {useExecutionHost287} from '../../context/executionProject287.js'
import type {ExecutionHost287} from '../../services/context/officialExecutionOwners287/native.js'
import type {getPluginById} from './marketplaceManager.js'
import type {LspPluginRecommendation} from './lspRecommendation.js'
import {ordinaryPluginSource287} from './ordinaryPlugin287.js'

type AddNotification = ReturnType<typeof useNotifications>['addNotification']
type PluginData = NonNullable<Awaited<ReturnType<typeof getPluginById>>>
export type LspRecommendationResponse287 = 'yes'|'no'|'timeout'|'never'|'disable'|'cancelled'

export function usePluginRecommendationContext287():{host:ExecutionHost287;storageV5?:unknown} {
 const host=useExecutionHost287()
 const read=ordinaryPluginSource287('chunk-038c023k.js').Te as ()=>{storageV5?:unknown}
 return {host,storageV5:read().storageV5}
}
export function getMatchingLspRecommendations287(file:string,storageV5?:unknown,host:ExecutionHost287=getExecutionSession287().host):Promise<LspPluginRecommendation[]> {
 const resolve=ordinaryPluginSource287('chunk-f2cpzzp9.js').Mbe as (host:ReturnType<typeof getExecutionSession287>['host'],file:string,storageV5?:unknown)=>Promise<LspPluginRecommendation[]>
 return resolve(host,file,storageV5)
}
export function respondToLspRecommendation287(rec:{pluginId:string;pluginName:string},response:string,notify:AddNotification,storageV5?:unknown):void {
 const respond=ordinaryPluginSource287('chunk-f2cpzzp9.js').nrt as (rec:{pluginId:string;pluginName:string},response:string,notify:AddNotification,storageV5?:unknown)=>void
 respond(rec,response,notify,storageV5)
}
export function installPluginRecommendation287(id:string,name:string,key:string,notify:AddNotification,install:(data:PluginData)=>Promise<void>,storageV5?:unknown):Promise<void> {
 const run=ordinaryPluginSource287('chunk-f2cpzzp9.js').GH as (id:string,name:string,key:string,notify:AddNotification,install:(data:PluginData)=>Promise<void>,storageV5?:unknown)=>Promise<void>
 return run(id,name,key,notify,install,storageV5)
}
