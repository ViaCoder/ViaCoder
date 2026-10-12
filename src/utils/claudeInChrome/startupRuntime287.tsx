import React from 'react'
import * as compiler from 'react/compiler-runtime'
import {jsx,jsxs,Fragment} from 'react/jsx-runtime'
import {getChromeMenuSource287} from './menuRuntime287.js'
import {createChromeStartup287,createChromeOfferDialog287} from './officialStartup287/native.js'
import type {StartupFrame287,StartupResult287,AcceptedFrame287,OfferFrame287,OfferResult287,SuppressOffer287} from './officialStartup287/native.js'
import {getOriginalModsLifecycle287} from '../hooks/modelSwitch287/lifecycleRuntime.js'
import {getOutsideHookRuntime287} from '../hooks/outsideRuntime287.js'
import {getEnterpriseMcpFilePath} from '../../services/mcp/config.js'
import {getMcpConnectedProducer287} from '../../services/mcp/connectedProducer287.js'
import {getGlobalConfig,saveGlobalConfig} from '../config.js'
import {isClaudeAISubscriber} from '../auth.js'
import {authEnvironment} from '../authEnvironment.js'
import {getPolicyPublicClient287} from '../../services/policyLimits/publicBindings287.js'
import {isPolicyAllowed} from '../../services/policyLimits/index.js'
import {getFeatureValue_CACHED_MAY_BE_STALE,initializeGrowthBook} from '../../services/analytics/growthbook.js'
import {logForDebugging} from '../debug.js'
import {logError} from '../log.js'
import {logEvent} from '../../services/analytics/index.js'
import {getPlatform} from '../platform.js'
import {isEnvTruthy} from '../envUtils.js'
import {Box,Text} from '../../ink.js'
import {configStorageFromPin,telemetrySuccess,telemetryFailure} from '../../vendor/official-chrome-ui/host.js'
import {CLAUDE_IN_CHROME_MCP_SERVER_NAME} from './common.js'
import type {Root} from '../../ink.js'
import type {PermissionMode} from '../permissions/PermissionMode.js'

export type {StartupFrame287,StartupResult287,OfferResult287,SuppressOffer287}
function canonical(file:string,name:string):any {
 const value=getOriginalModsLifecycle287().clearSourceModule287(file)[name]
 if(value===undefined)throw Error('Chrome startup canonical dependency missing '+file+':'+name)
 return value
}
function connected(file:string,name:string,...args:unknown[]):any {
 const value=getMcpConnectedProducer287().sourceModule(file)[name]
 if(typeof value!=='function')throw Error('Chrome startup MCP owner dependency missing '+file+':'+name)
 return value(...args)
}
/** Resolve original functions lazily at invocation, so merely importing main
 * never boots the generated UI graph or a second managed-config owner. */
export function getChromeStartupRuntime287(){
 const chrome=(name:string)=>(...args:unknown[])=>getChromeMenuSource287('chunk-09m4fzsj.js')[name](...args)
 const yr=()=>isEnvTruthy(process.env.CLAUDE_CODE_SAFE_MODE)||process.argv.includes('--safe-mode')
 const runtime=createChromeStartup287({
  lLr:chrome('lLr'),cLr:chrome('cLr'),pNt:chrome('pNt'),sLr:chrome('sLr'),b$e:chrome('b$e'),vqn:chrome('vqn'),
  sk:()=>isPolicyAllowed('allow_claude_browser_extension'),ft:()=>isClaudeAISubscriber(),a:authEnvironment,
  op:(...args:Parameters<ReturnType<typeof getPolicyPublicClient287>['op']>)=>getPolicyPublicClient287().op(...args),
  t:logForDebugging,zC:(text:string)=>process.stderr.write(text+'\n'),
  ac:CLAUDE_IN_CHROME_MCP_SERVER_NAME,lfe:()=>getChromeMenuSource287('chunk-ag87p919.js').lfe(),
  Vye:(...args:unknown[])=>connected('chunk-mphp7acd.js','Vye',...args),
  Unt:()=>connected('chunk-mphp7acd.js','Unt'),
  Hcn:getEnterpriseMcpFilePath,
  _y:()=>connected('chunk-mphp7acd.js','_y'),
  OSt:()=>canonical('chunk-f1vb7bx7.js','OSt')(),
  qt:()=>getOutsideHookRuntime287().mcpState(),
  Zw:(...args:unknown[])=>canonical('chunk-ag87p919.js','Zw')(...args),
  RZn:(...args:unknown[])=>canonical('chunk-nankzm0s.js','RZn')(...args),
  yr,
  S:(...args:unknown[])=>canonical('chunk-n4qghq20.js','S')(...args),bn:(...args:unknown[])=>canonical('chunk-n4qghq20.js','bn')(...args),O:getPlatform,i:logEvent,d:logError,
  Yt:(text:string)=>{process.stderr.write(text+'\n');process.exit(1)},
  zr:(value:Record<string,unknown>,predicate:(value:unknown,key:string)=>boolean)=>Object.fromEntries(Object.entries(value).filter(([key,v])=>predicate(v,key))),
  le:getGlobalConfig,k:getFeatureValue_CACHED_MAY_BE_STALE,Vd:initializeGrowthBook,e:jsx,
  commands:async(_storage:unknown,cwd:string)=>(await import('../../commands.js')).getCommands(cwd),
  import:async(file:string)=>{
   if(file==='chunk-19f3z1s7.js')return {isChromeExtensionInstalled:chrome('cH'),isClaudeInChromeAllowed:()=>isPolicyAllowed('allow_claude_browser_extension')}
   if(file==='chunk-1mrdqce6.js')return {isChromeServerPolicyDenied:()=>getChromeStartupRuntime287().blocked()}
   if(file==='chunk-0r035vkf.js')return {ChromeAutoEnableDialog:ChromeAutoEnableDialog287}
   throw Error('Unexpected Chrome offer source import '+file)
  },
 })
 return Object.assign(runtime,{yr})
}
export function resolveChromeStartup287(frame:StartupFrame287):StartupResult287{return getChromeStartupRuntime287().startup(frame)}
export function applyAcceptedChromeOffer287(frame:AcceptedFrame287){return getChromeStartupRuntime287().accepted(frame)}
function readDialog(file:string,name:string):unknown{
 if(file==='chunk-bgj860b4.js'&&name==='w')return (compiler as unknown as {c(size:number):unknown[]}).c
 if(file==='chunk-870yz02b.js'&&name==='b')return Symbol.for('react.memo_cache_sentinel')
 if(file==='chunk-ysm7k028.js')return ({e:jsx,r:jsxs,K:Fragment} as Record<string,unknown>)[name]
 if(file==='chunk-1y575bx8.js')return ({R:React.useEffect,A:React.useRef} as Record<string,unknown>)[name]
 if(file==='chunk-jkt292h5.js')return ({s:Box,n:Text} as Record<string,unknown>)[name]
 if(file==='chunk-038c023k.js'&&name==='Te')return configStorageFromPin
 if(file==='chunk-nankzm0s.js'&&name==='Ae')return saveGlobalConfig
 if(file==='chunk-6hnyhakg.js'&&name==='i')return logEvent
 if(file==='chunk-9d2ykxmy.js')return name==='y'?telemetrySuccess:telemetryFailure
 return canonical(file,name)
}
export function ChromeAutoEnableDialog287(props:{onDone(accepted:boolean):void;isDontAskMode:boolean;isAutoMode:boolean}):React.ReactNode{
 return React.createElement(createChromeOfferDialog287({get:readDialog}).ChromeAutoEnableDialog,props)
}
/** The original final onboarding step runs only after the existing trust
 * dialogs. No startup installation occurs unless its actual result accepts. */
export async function showChromeStartupOffer287(root:Root,permissionMode:PermissionMode,offer:boolean,result:OfferResult287):Promise<void>{
 const step=getChromeStartupRuntime287().offer({offer,result,permissionMode} satisfies OfferFrame287)
 const {showSetupDialog}=await import('../../interactiveHelpers.js')
 let finish:()=>void=()=>{throw Error('Chrome offer completed before its actual dialog was mounted')}
 const node=await step(()=>finish())
 if(node!==null)await showSetupDialog(root,done=>{finish=done;return node})
}
