import type React from 'react'
import {jsx} from 'react/jsx-runtime'
import type {Root} from '../../ink.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {getGlobalConfig} from '../../utils/config.js'
import {getAllowedChannels,setAllowedChannels,setHasDevChannels,type ChannelEntry} from '../../bootstrap/state.js'
import {checkGate_CACHED_OR_BLOCKING} from '../../services/analytics/growthbook.js'
import type {PermissionMode} from '../../utils/permissions/PermissionMode.js'
import {createPublicStartupStages287,type PublicStartupStages287,type PublicStartupPorts287,type StartupStage287,type PublicStartupResult287} from './native.js'
import proof from './provenance.json'
export type {PublicStartupResult287,StartupApprovalWarning287} from './native.js'

function namespace(file:string):Record<string,unknown>{return getOriginalModsLifecycle287().clearSourceModule287(file)}
function requiredFunction(file:string,name:string):Function {
 const fn=namespace(file)[name];if(typeof fn!=='function')throw Error('Public startup original import missing: '+file+':'+name);return fn
}
/** Read original ESM aliases through the one canonical local namespace. The
 * getters deliberately do not instantiate unused exports or secondary caches. */
async function importStartupModule287(file:string):Promise<Record<string,unknown>>{
 const module=proof.dynamicExports[file as keyof typeof proof.dynamicExports]
 if(!module)throw Error('Unselected startup import: '+file)
 const result:Record<string,unknown>={}
 for(const[name,local]of Object.entries(module.bindings))Object.defineProperty(result,name,{enumerable:true,get:()=>{
  const value=namespace(file)[local];if(value===undefined)throw Error('Missing original startup export '+file+':'+local);return value
 }})
 return result
}
function importedReader<K extends 'OWt'|'Wj'|'He'>(name:K):PublicStartupPorts287[K]{
 const binding=proof.importBindings[name]
 return requiredFunction(binding.file,binding.name) as PublicStartupPorts287[K]
}
export interface PublicStartupScope287 {
 permissionMode?:PermissionMode;allowDangerouslySkipPermissions?:boolean;claudeInChrome?:boolean;devChannels?:ChannelEntry[];storageV5?:unknown
}
export function getPublicStartupStages287(result:PublicStartupResult287,scope:PublicStartupScope287={}):PublicStartupStages287 {
 const Aro=requiredFunction('chunk-f5w4pbxy.js','Aro') as PublicStartupPorts287['Aro']
 return createPublicStartupStages287({a:process.env,Aro,T:scope.storageV5,P:result,e:jsx,o:getExecutionSession287(),x:undefined,
  OTo:requiredFunction('chunk-mphp7acd.js','OTo') as PublicStartupPorts287['OTo'],vw:requiredFunction('chunk-mphp7acd.js','vw') as PublicStartupPorts287['vw'],rHt:requiredFunction('chunk-mphp7acd.js','rHt') as PublicStartupPorts287['rHt'],OWt:importedReader('OWt'),Wj:importedReader('Wj'),He:importedReader('He'),
  l:scope.permissionMode??'default',h:scope.allowDangerouslySkipPermissions??false,lh:getAllowedChannels,C:scope.devChannels,v_:checkGate_CACHED_OR_BLOCKING,JOe:setAllowedChannels,eno:setHasDevChannels,S:scope.claudeInChrome,le:getGlobalConfig,importStartupModule287})
}
type OriginalStageRunner287=(root:Root,stages:StartupStage287[],options:{session:ReturnType<typeof getExecutionSession287>;storageV5?:unknown;marksJobBlocked?:boolean})=>Promise<void>
/** Complete original NGe owns progression, suspended mount, failure, once-only
 * callbacks, replacement and torn-down bookkeeping on the existing Ink root. */
export async function runPublicStartupStages287(root:Root,names:(keyof PublicStartupStages287)[],result:PublicStartupResult287,scope:PublicStartupScope287={}):Promise<void>{
 const stages=getPublicStartupStages287(result,scope)
 const run=requiredFunction('chunk-f86hj7zg.js','NGe') as OriginalStageRunner287
 await run(root,names.map(name=>stages[name]),{session:getExecutionSession287(),storageV5:scope.storageV5,marksJobBlocked:true})
}
export interface ExternalIncludesDialogProps287 {onDone():void;isStandaloneDialog?:boolean;externalIncludes?:import('../../utils/claudemd.js').ExternalClaudeMdInclude[]}
export interface ApproveApiKeyProps287 {customApiKeyTruncated:string;onDone(approved:boolean):void}
export interface BypassDialogProps287 {onAccept():void;storageV5?:unknown}
export interface DevChannelsDialogProps287 {channels:ChannelEntry[];onAccept():void}
export interface ChromeOnboardingProps287 {onDone():void}
export function getPublicStartupDialog287(name:'ClaudeMdExternalIncludesDialog'):React.ComponentType<ExternalIncludesDialogProps287>
export function getPublicStartupDialog287(name:'ApproveApiKey'):React.ComponentType<ApproveApiKeyProps287>
export function getPublicStartupDialog287(name:'BypassPermissionsModeDialog'):React.ComponentType<BypassDialogProps287>
export function getPublicStartupDialog287(name:'DevChannelsDialog'):React.ComponentType<DevChannelsDialogProps287>
export function getPublicStartupDialog287(name:'ClaudeInChromeOnboarding'):React.ComponentType<ChromeOnboardingProps287>
export function getPublicStartupDialog287(name:string):unknown {
 const views:Record<string,[string,string]>={ClaudeMdExternalIncludesDialog:['chunk-1jyv7k4m.js','TIn'],ApproveApiKey:['chunk-te71kedv.js','Ykn'],BypassPermissionsModeDialog:['chunk-dmqdtz7f.js','B'],DevChannelsDialog:['chunk-1f369gg9.js','k'],ClaudeInChromeOnboarding:['chunk-5mrx7tm5.js','Y']}
 const binding=views[name];if(!binding)throw Error('Unselected public startup dialog: '+name)
 return requiredFunction(...binding)
}
