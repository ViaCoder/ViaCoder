import React from 'react'
import * as compiler from 'react/compiler-runtime'
import {jsx,jsxs,Fragment} from 'react/jsx-runtime'
import {z} from 'zod/v4'
import * as fsPromises from 'node:fs/promises'
import * as path from 'node:path'
import {homedir} from 'node:os'
import {quote} from 'shell-quote'
import {chromeSourceArgs} from './sourceEntrypoint.js'
import {isInBundledMode} from '../bundledMode.js'
import {execFileNoThrowWithCwd} from '../execFileNoThrow.js'
import {Box,Text,Link} from '../../ink.js'
import {useAppState} from '../../state/AppState.js'
import type {AppState} from '../../state/AppStateStore.js'
import {getOriginalModsLifecycle287} from '../hooks/modelSwitch287/lifecycleRuntime.js'
import {getOutsideHookRuntime287} from '../hooks/outsideRuntime287.js'
import {getMcpConnectedProducer287} from '../../services/mcp/connectedProducer287.js'
import {getConnectedMcpClient} from '../../services/mcp/connectionAccess.js'
import type {ConnectedMcpServer,ConnectedMCPServerV2} from '../../services/mcp/types.js'
import type {CallToolRequest} from '@modelcontextprotocol/sdk/types.js'
import {getGlobalConfig,saveGlobalConfig} from '../config.js'
import {getClaudeAIOAuthTokens,isClaudeAISubscriber} from '../auth.js'
import {getIsInteractive,getIsNonInteractiveSession,getChromeFlagOverride,getSessionBypassPermissionsMode} from '../../bootstrap/state.js'
import {authEnvironment} from '../authEnvironment.js'
import {getClaudeConfigHomeDir,isBareMode} from '../envUtils.js'
import {env} from '../env.js'
import {isPolicyAllowed} from '../../services/policyLimits/index.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {lazySchema} from '../lazySchema.js'
import {jsonParse,jsonStringify} from '../slowOperations.js'
import {logForDebugging} from '../debug.js'
import {logError} from '../log.js'
import {toError,getErrnoCode,isENOENT,isFsInaccessible,TelemetrySafeError_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS} from '../errors.js'
import {getPlatform} from '../platform.js'
import {openInChrome,getAllBrowserDataPaths,getAllNativeMessagingHostsDirs,getAllWindowsRegistryKeys,CLAUDE_IN_CHROME_MCP_SERVER_NAME} from './common.js'
import {configStorageFromPin,telemetrySuccess,telemetryFailure} from '../../vendor/official-chrome-ui/host.js'
import * as source from './officialMenu287/native.js'
import proof from './officialMenu287/provenance.json' with {type:'json'}

type Namespace=Record<string,any>
const namespaces:Record<string,Namespace>={}
export type ChromeConnection=ConnectedMcpServer|{client:import('@modelcontextprotocol/sdk/client/index.js').Client}
/** Original GN body; only its literal accessor resolves the already restored
 * raw SDK tree. Modern connections are not cast/retried through the V1 client. */
function invokeRaw(connection:ChromeConnection,request:CallToolRequest['params'],options?:unknown):Promise<unknown>{
 const access=getConnectedMcpClient(connection as ConnectedMcpServer)
 const native=source.module3({get:readDependency,module:()=>({mcpClientModule:()=>({invokeToolRaw:(client:unknown,args:unknown,opts:unknown)=>{
  const owner=getOutsideHookRuntime287()
  return access.generation==='v2'?owner.invokeModern(client,args,opts):owner.invokeLegacy(client,args,opts)
 }})})})
 return native.GN({client:access.client},request,options)
}
export function getChromeMenuSource287(file='chunk-d4reyqpd.js'):Namespace{
 if(namespaces[file])return namespaces[file]
 const group=(proof.groups as Record<string,{factory:string}>)[file]
 if(!group)throw Error('Unselected Chrome menu namespace: '+file)
 const factory=(source as unknown as Record<string,(ports:{get:typeof readDependency;module(file:string):unknown;sourceEntryArgs(flag:string):string[]})=>Namespace>)[group.factory]
 return namespaces[file]=factory({get:readDependency,module:()=>{throw Error('GN raw accessor must select actual connection generation')},sourceEntryArgs:flag=>isInBundledMode()?[flag]:chromeSourceArgs(flag as '--chrome-native-host'|'--claude-in-chrome-mcp')})
}
/** Narrow access to existing mapped dependencies; these adapters add no owner/state. */
export function getChromeMenuEnvironment287():{isWslEnvironment():boolean}{
 return readDependency('chunk-mbfze585.js','a') as {isWslEnvironment():boolean}
}
export function getChromeMenuDependency287(file:'chunk-df0597gf.js',name:'Zc'):()=>{wiredThisSession:boolean}{
 return readDependency(file,name) as ()=>{wiredThisSession:boolean}
}
function readDependency(file:string,name:string):unknown{
 // lLr's remote-host discriminator belongs to the existing canonical
 // nank namespace, not the local admission-only iJe/tA selection.
 if(file==='chunk-nankzm0s.js'&&name==='aZ'){
  const value=getOriginalModsLifecycle287().clearSourceModule287(file).aZ
  if(typeof value!=='function')throw Error('Canonical Chrome adoption discriminator missing')
  return value
 }
 if(file==='chunk-rgcp4trk.js'&&name==='GN')return invokeRaw
 if(file==='chunk-bgj860b4.js'&&name==='w')return (compiler as unknown as {c(size:number):unknown[]}).c
 if(file==='chunk-870yz02b.js'&&name==='b')return Symbol.for('react.memo_cache_sentinel')
 if(file==='chunk-ysm7k028.js')return ({e:jsx,r:jsxs,K:Fragment} as Record<string,unknown>)[name]
 if(file==='chunk-1y575bx8.js')return ({R:React.useEffect,A:React.useRef,g:React.useState} as Record<string,unknown>)[name]
 if(file==='chunk-jkt292h5.js')return ({s:Box,n:Text,It:Link} as Record<string,unknown>)[name]
 if(file==='chunk-t1n6x7q0.js'&&name==='z')return useChromeClients287
 if(file==='chunk-038c023k.js'&&name==='Te')return configStorageFromPin
 if(file==='chunk-mbfze585.js'&&name==='a')return new Proxy(authEnvironment,{get(target,key){if(key==='isWslEnvironment')return env.isWslEnvironment;return Reflect.get(target,key)}})
 if(file==='chunk-q80zaav8.js')return name==='Y'?jsonParse:name==='_'?jsonStringify:logForDebugging
 if(file==='chunk-amhtwhch.js')return name==='O'?getPlatform:logError
 if(file==='chunk-c9me9cp7.js')return ({E:getErrnoCode,W:isENOENT,Z:toError,P:TelemetrySafeError_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,Ht:isFsInaccessible} as Record<string,unknown>)[name]
 if(file==='chunk-nankzm0s.js'){
  const values:Record<string,unknown>={le:getGlobalConfig,Ae:saveGlobalConfig,ft:isClaudeAISubscriber,k:getFeatureValue_CACHED_MAY_BE_STALE,fn:()=>getClaudeAIOAuthTokens()}
  if(Object.hasOwn(values,name))return values[name]
 }
 if(file==='chunk-bn3p37gv.js')return ({Ce:getIsNonInteractiveSession,Wu:getIsInteractive,A6e:getChromeFlagOverride,r4:getSessionBypassPermissionsMode} as Record<string,unknown>)[name]
 if(file==='chunk-brnn4zwp.js')return name==='xr'?isBareMode:getClaudeConfigHomeDir
 if(file==='chunk-b5kmgz2n.js'&&name==='on')return isPolicyAllowed
 if(file==='chunk-9d2ykxmy.js')return name==='Br'?getChromeMenuSource287(file).Br:name==='y'?telemetrySuccess:telemetryFailure
 if(file==='chunk-ag87p919.js'&&name==='ac')return CLAUDE_IN_CHROME_MCP_SERVER_NAME
 if(file==='chunk-df0597gf.js'){
  if(name==='gSe')return openInChrome
  if(name==='JBr')return getAllNativeMessagingHostsDirs
  if(name==='QBr')return getAllWindowsRegistryKeys
  if(name==='Zc')return ()=>{const value=getMcpConnectedProducer287().sourceModule(file).Zc;if(typeof value!=='function')throw Error('Canonical Chrome Zc missing');return value()}
 }
 if(file==='chunk-09m4fzsj.js'){
  if(name==='JT')return getAllBrowserDataPaths
 }
 if(file==='chunk-ejqjra50.js'){
  if(name==='dmt')return isInBundledMode
  if(name==='iUe')return ()=>process.execPath
  if(name==='QRe')return ()=>({cmd:process.execPath,prefixArgs:isInBundledMode()?[]:chromeSourceArgs('--chrome-native-host').slice(0,-1),target:process.execPath})
 }
 if(file==='chunk-fmv8bhm3.js'&&name==='Je')return execFileNoThrowWithCwd
 if(file==='chunk-kby37ryb.js'&&name==='Ur')return quote
 if(file==='os'&&name==='homedir')return homedir
 if(file==='promises'&&Object.hasOwn(fsPromises,name))return (fsPromises as unknown as Record<string,unknown>)[name]
 if(file==='path'&&Object.hasOwn(path,name))return (path as unknown as Record<string,unknown>)[name]
 if(file==='chunk-aybmj3t4.js')return ({o:z.string,T:z.array,u:z.object} as Record<string,unknown>)[name]
 if(file==='chunk-5qqrzb2c.js'&&name==='f')return lazySchema
 if(Object.hasOwn(proof.groups,file))return getChromeMenuSource287(file)[name]
 // Reuse canonical Select/list/Dialog/status components, and their existing
 // Ink focus/keybinding/context ABI. No copy of the old 283 list or provider.
 const namespace=getOriginalModsLifecycle287().clearSourceModule287(file)
 if(namespace[name]!==undefined)return namespace[name]
 throw Error('Chrome menu dependency missing '+file+':'+name)
}
/** ABI projection only: preserve both actual client instances in the existing
 * AppState owner. Original No/Po see connected rows; no V2 status cast as V1,
 * transport allocation or shadow client registry. */
type ChromeMenuClientProjection287={mcp:{clients:readonly (AppState['mcp']['clients'][number]|ConnectedMCPServerV2)[]}}
function useChromeClients287(selector:(state:ChromeMenuClientProjection287)=>unknown):unknown {
 const mcp=useAppState(state=>state.mcp)
 return React.useMemo(()=>selector({mcp:{clients:[...mcp.clients,...mcp.v2Clients]}}),[mcp,selector])
}
export type ChromeMenuProps287={onDone:(result?:string)=>void;isExtensionInstalled:boolean;configEnabled:boolean|undefined;isClaudeAISubscriber:boolean;isWSL:boolean}
export function ChromeMenu287(props:ChromeMenuProps287):React.ReactNode{return React.createElement(getChromeMenuSource287().Ge,props)}
export function ChromeBrowserPicker287(props:{chromeClient:ChromeConnection;onDone:(result?:string)=>void}):React.ReactNode{return React.createElement(getChromeMenuSource287().re,props)}
export async function callChromeMenu287(onDone:(result?:string)=>void):Promise<React.ReactNode>{return getChromeMenuSource287().yn(onDone)}
export function listChromeBrowsers287(connection:ChromeConnection):Promise<{deviceId:string;name:string;osPlatform?:string}[]>{return getChromeMenuSource287('chunk-g45mcjt4.js').FIn(connection)}
export function callChromeTool287(connection:ChromeConnection,name:string,args:Record<string,unknown>):Promise<string|undefined>{return getChromeMenuSource287('chunk-g45mcjt4.js').u8t(connection,name,args)}
