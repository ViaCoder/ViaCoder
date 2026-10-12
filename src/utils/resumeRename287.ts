import {createResumeRename287} from './officialSessionRestore287/rename.js'
import {getSessionRenameRegistry,whenSessionRenameHostReady} from './sessionRename/host.js'
import {cleanTitle,nameKey,chooseName,suffix,truncateBase,type LiveName,type NameSource} from './sessionRename/names.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'
import {logForDebugging} from './debug.js'
import type {LocalRenameRegistry} from './sessionRename/registry.js'
function owner():LocalRenameRegistry {const registry=getSessionRenameRegistry();if(!registry)throw Error('Resume name registration is not available');return registry}
export function createResumeRenamePorts287(){return {
 v:{whenRegistered:()=>owner().whenRegistered(),listLive:()=>owner().listLive()},Si:cleanTitle,Ir:nameKey,GH:owner,
 qv:()=>owner().current,
 Iw:()=>({get lastYield(){return owner().yieldHistory},set lastYield(value:{base:string;name:string}|undefined){owner().yieldHistory=value},get userTypedName(){return owner().userTypedName},set userTypedName(value:string|undefined){owner().userTypedName=value},announceYield:(name:string,previous:string)=>owner().announceYield(name,previous)}),
 yU:async(name:string,_storage:undefined,source:NameSource='user')=>{const registry=owner();if(source==='auto'&&registry.current&&registry.current.source!=='auto'&&registry.current.source!=='derived')return;await registry.setName(name,source)},
 x:()=>getFeatureValue_CACHED_MAY_BE_STALE('tengu_session_name_uniqueness',true),
 B:(options:{desiredName:string;self:LiveName;live:LiveName[];moment:'rename'|'recheck';slug?:()=>string;suffixBase:string})=>{const name=chooseName(options.desiredName,options.self,options.live,options.moment,options.suffixBase,options.slug);return name===undefined?{kind:'keep' as const}:{kind:'yield' as const,newName:name,holders:options.live.filter(row=>row.pid!==options.self.pid&&row.name&&nameKey(row.name)===nameKey(options.desiredName))}},
 A:suffix,re:truncateBase,Kk:200,t:logForDebugging,y:(event:string)=>logForDebugging('[session-name] '+event),m:(event:string,outcome:string)=>logForDebugging(`[${event}] ${outcome}`),l:(error:unknown)=>error instanceof Error?error.message:String(error),
}}
let native:ReturnType<typeof createResumeRename287>|undefined
export function getResumeRename287(){return native??=createResumeRename287(createResumeRenamePorts287())}
/** A missing/unregistered real PID host is a real unsuccessful admission, not
 * a fresh registry or synthesized whenRegistered() success. */
export async function restoreResumeName287(name:string|undefined,storage:undefined,options:{autoOnly:boolean}):Promise<void>{
 if(!name)return
 const status=await whenSessionRenameHostReady();if(!status.available)return
 await getResumeRename287().restore(name,storage,options)
}
