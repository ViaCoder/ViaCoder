import * as React from 'react'
import {c as cache} from 'react/compiler-runtime'
import {jsx,jsxs} from 'react/jsx-runtime'
import chalk from 'chalk'
import {valid} from 'semver'
import {homedir} from 'node:os'
import {Box,Text,Link,NoSelect} from '../../ink.js'
import type {Props as TextProps} from '../design-system/ThemedText.js'
import {useTheme} from '../design-system/ThemeProvider.js'
import {TerminalSizeContext} from '../../ink/components/TerminalSizeContext.js'
import {ScreenReaderContext,useScreenReader} from '../../ink/components/ScreenReaderContext.js'
import TerminalFocusContext from '../../ink/components/TerminalFocusContext.js'
import {ClockContext} from '../../ink/components/ClockContext.js'
import {useTerminalSize} from '../../hooks/useTerminalSize.js'
import {useAppState,useAppStateMaybeOutsideOfProvider} from '../../state/AppState.js'
import {officialRltUiEvents287} from '../../state/officialRltUiEvents287.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {env} from '../../utils/env.js'
import {getTheme} from '../../utils/theme.js'
import {getInitialSettings,getSettingsWithErrors} from '../../utils/settings/settings.js'
import {getGlobalConfig,saveGlobalConfig} from '../../utils/config.js'
import {getAPIProvider} from '../../utils/model/providers.js'
import {getOauthAccountInfo,getSubscriptionName,getSubscriptionType,isClaudeAISubscriber} from '../../utils/auth.js'
import {getDirectConnectServerUrl,getOriginalCwd} from '../../bootstrap/state.js'
import {getCwd} from '../../utils/cwd.js'
import {getDisplayPath} from '../../utils/file.js'
import {isEnvTruthy} from '../../utils/envUtils.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {gt,lte} from '../../utils/semver.js'
import {logError} from '../../utils/log.js'
import {logForDebugging} from '../../utils/debug.js'
import {logEvent} from '../../services/analytics/index.js'
import {isFullscreenEnvEnabled} from '../../utils/fullscreen.js'
import {isBridgeEnabled} from '../../bridge/bridgeEnabled.js'
import {isXtermJs} from '../../ink/terminal.js'
import {areWorkflowsEnabled} from '../../tools/WorkflowTool/gate.js'
import {sourceModelSessionController287} from '../../utils/model/officialModelPicker287/session.js'
import {getOfficialModelMenuPolicy287} from '../../utils/model/officialModelPicker287.js'
import {createModelCommandViewsHostPorts287} from '../../utils/model/modelCommandViews287.js'
import {parseUserSpecifiedModel,renderModelSetting} from '../../utils/model/model.js'
import {resolveOfficialSideQueryEffort287} from '../../utils/model/effortWc287.js'
import {getRuntimeMemo287} from '../../services/context/runtimeMemo287.js'
import {stringWidth} from '../../ink/stringWidth.js'
import {getPlatform} from '../../utils/platform.js'
import type {AgentDefinitionsResult} from '../../tools/AgentTool/loadAgentsDir.js'
import {ExecutionSessionProvider287} from '../../context/executionProject287.js'
import {LocalStartupHints} from './LogoV2.js'
import {createBanner287,type BannerRuntime287} from './officialBanner287/native.js'

/** Optional host inputs are carried, never synthesized as a private backend. */
export const BannerRuntimeContext287=React.createContext<{session?:ExecutionSession287;storageV5?:unknown;renderer?:'fullscreen'|'default'}>({})
type BannerHeaderProps287={agentDefinitions?:AgentDefinitionsResult;hideWelcomeChrome?:boolean;latchAnnouncementSlot?:boolean}
export const BannerHeaderInputsContext287=React.createContext<BannerHeaderProps287>({})
/** Whole ga owns live warnings and announcement arbitration; local hints stay C. */
function BannerStartupNotices287(props:{latchAnnouncementSlot?:boolean}){
 const inputs=React.useContext(BannerHeaderInputsContext287)
 const session=React.useContext(BannerRuntimeContext287).session??getExecutionSession287()
 // Lazy import keeps the model/settings/Logo cycle cold until the real Header mounts.
 const {getBannerNotices287}=require('./noticesProduction287.js') as typeof import('./noticesProduction287.js')
 const Notices=getBannerNotices287().Notices
 return <>{!inputs.hideWelcomeChrome&&<LocalStartupHints/>}<ExecutionSessionProvider287 session={session}><Notices latchAnnouncementSlot={props.latchAnnouncementSlot}/></ExecutionSessionProvider287></>
}
/** Original mC/rV/qe keeps zero-height visible notices live; no local viewport cache. */
function OriginalBannerFreeze287(props:{children:React.ReactNode}){
 const {getBannerNotices287}=require('./noticesProduction287.js') as typeof import('./noticesProduction287.js')
 const Freeze=getBannerNotices287().Freeze
 return <Freeze {...props}/>
}
let source:BannerRuntime287|undefined
export function getBannerRuntime287():BannerRuntime287 {return source??=createBanner287(createBannerProductionPorts287())}
export function markBannerRestored287(host:object):void {getBannerRuntime287().markRestored(host)}
function BannerText287(props:Omit<TextProps,'color'>&{color?:TextProps['color']|'effortUltra'}):React.ReactNode {
 const [theme]=useTheme()
 return <Text {...props} color={props.color==='effortUltra'?getBannerRuntime287().theme(theme).effortUltra as TextProps['color']:props.color}/>
}
function selectorPort<T extends (...args:never[])=>unknown>(name:string):T {
 // Resolve at call time: Logo import does not eagerly enter the model/settings cycle.
 const ports=(require('../../utils/model/officialModelPicker287/selector.js') as typeof import('../../utils/model/officialModelPicker287/selector.js')).createActualModelSelectorPorts287()
 const value=ports[name]
 if(typeof value!=='function')throw Error('Missing existing model selector binding: '+name)
 return value as T
}
function modelSubscription287(name:'xp'|'nqo',listener:()=>void):()=>void {
 const subscribe=createModelCommandViewsHostPorts287()[name]
 if(typeof subscribe!=='function')throw Error('Missing original model subscription '+name)
 return (subscribe as (callback:()=>void)=>()=>void)(listener)
}
export function createBannerProductionPorts287() {
 return {
  productMetadata:MACRO,builtins:{process},
  cache,jsx,jsxs,Box,Text:BannerText287,Link,NoSelect,OffscreenFreeze:OriginalBannerFreeze287,
  memo:React.memo,Suspense:React.Suspense,startupNotices:BannerStartupNotices287,
  currentSession:()=>React.useContext(BannerRuntimeContext287).session??getExecutionSession287(),
  useContext:React.useContext,useState:React.useState,useEffect:React.useEffect,useRef:React.useRef,
  useLayoutEffect:React.useLayoutEffect,useReducer:React.useReducer,useCallback:React.useCallback,
  useSyncExternalStore:React.useSyncExternalStore,useEffectEvent:React.useEffectEvent,createContext:React.createContext,
  useTerminalSize,useScreenReader,useTheme,TerminalSizeContext,ScreenReaderContext,ClockContext,
  useStorage:()=>React.useContext(BannerRuntimeContext287),
  useHost:()=> (React.useContext(BannerRuntimeContext287).session??getExecutionSession287()).host,
  useAppState,useOptionalAppState:useAppStateMaybeOutsideOfProvider,
  useEffort:()=>selectorPort<()=>import('../../utils/effort.js').EffortValue|undefined>('hS')(),
  vettedSetting:sourceModelSessionController287.ZHt,defaultModel:()=>getOfficialModelMenuPolicy287().Py(),
  modelRefresh:(listener:()=>void)=>modelSubscription287('xp',listener),tierRefresh:(listener:()=>void)=>modelSubscription287('nqo',listener),
  useMemo:React.useMemo,resolveModel:parseUserSpecifiedModel,displayModel:renderModelSetting,
  resolveEffort:resolveOfficialSideQueryEffort287,
  workflowsEnabled:areWorkflowsEnabled,ultraModel:(model:string)=>selectorPort<(model:string)=>boolean>('xXe')(model),
  environment:new Proxy(authEnvironment,{get:(owner,key)=>key==='terminal'?env.terminal:Reflect.get(owner,key)}),rawEnvironment:process.env,
  background:()=>authEnvironment.CLAUDE_CODE_SESSION_KIND==='bg',
  teammate:()=>getExecutionSession287().host.extensionsConfig.teammateAgentId(),
  execution:getExecutionSession287,
  uiOwner:officialRltUiEvents287 as typeof officialRltUiEvents287 & {clawdEntranceTaken:boolean;startupUpdateSummary:string|null|undefined},
  globalConfig:getGlobalConfig,saveConfig:saveGlobalConfig,initialSettings:()=>getInitialSettings(),
  validSemver:(version:unknown)=>typeof version==='string'&&valid(version)!==null,semverGt:gt,semverLte:lte,
  envTruthy:isEnvTruthy,debug:logForDebugging,errorLog:logError,
  analytics:logEvent,metric:logEvent,
  directConnectUrl:getDirectConnectServerUrl,remote:()=>getExecutionSession287().surfaceCapabilities.caps().workspace==='remote',
  runtimeMemo:getRuntimeMemo287,
  feature:getFeatureValue_CACHED_MAY_BE_STALE,
  tildify:(path:string)=>path===homedir()?'~':path.startsWith(homedir()+'/')?'~'+path.slice(homedir().length):path,
  originalCwd:getOriginalCwd,displayPath:getDisplayPath,cwd:getCwd,
  provider:getAPIProvider,subscriber:isClaudeAISubscriber,subscriptionName:getSubscriptionName,
  subscriptionType:getSubscriptionType,account:getOauthAccountInfo,
  fullscreenEnabled:isFullscreenEnvEnabled,
  renderer:()=>React.useContext(BannerRuntimeContext287).renderer??(isFullscreenEnvEnabled()?'fullscreen':'default'),
  resolvedTheme:()=>{const [theme]=useTheme();return {...getTheme(theme),effortUltra:getBannerRuntime287().theme(theme).effortUltra}},
  terminalFocus:()=>React.useContext(TerminalFocusContext).terminalFocusState,
  accessibilityHost:()=>(getExecutionSession287().surfaceCapabilities.attacherCaps() as {isVscodeTerm?:boolean}|null)?.isVscodeTerm===true||isXtermJs(),
  useClock:()=>{const clock=React.useContext(ClockContext);if(!clock)throw Error('useClock must be used within a ClockProvider');return clock},
  policySettings:getSettingsWithErrors,bridgeEnabled:isBridgeEnabled,
  stringWidth,platform:getPlatform,chalk,
 }
}
export type BannerProductionPorts287=ReturnType<typeof createBannerProductionPorts287>
/** Complete source Hi. No old full-feed/condensed selection remains in the caller. */
export function OriginalBanner287(){const Component=getBannerRuntime287().Hi;return <Component/>}

/** Whole original kee owns visibility, announcement latch and freeze ordering. */
export function OriginalBannerHeader287(props:BannerHeaderProps287){
 const Header=getBannerRuntime287().Header
 return <BannerHeaderInputsContext287.Provider value={props}><Header hideWelcomeChrome={props.hideWelcomeChrome} latchAnnouncementSlot={props.latchAnnouncementSlot}/></BannerHeaderInputsContext287.Provider>
}
