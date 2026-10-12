import React,{useCallback,useSyncExternalStore} from 'react'
import {jsx,jsxs} from 'react/jsx-runtime'
import * as compiler from 'react/compiler-runtime'
import chalk from 'chalk'
import {homedir} from 'node:os'
import {sep} from 'node:path'
import {ClockContext} from '../../../ink/components/ClockContext.js'
import {getGraphemeSegmenter} from '../../intl.js'
import {Box,Text} from '../../../ink.js'
import {Dialog} from '../../../components/design-system/Dialog.js'
import {ModelPicker} from '../../../components/ModelPicker.js'
import {KeyboardShortcutHint} from '../../../components/design-system/KeyboardShortcutHint.js'
import {useKeybinding} from '../../../keybindings/useKeybinding.js'
import {useTerminalSize} from '../../../hooks/useTerminalSize.js'
import {useScreenReader} from '../../../ink/components/ScreenReaderContext.js'
import {useNotifications} from '../../../context/notifications.js'
import {useAppState,useSetAppState,useAppStateStore,type AppState} from '../../../state/AppState.js'
import {getExecutionSession287} from '../../../services/context/execution287.js'
import {getSettingsForSource,getSettingsFilePathForSource,updateSettingsForSource,getSettingsWithSources} from '../../settings/settings.js'
import {type SettingSource,getSourceDisplayName} from '../../settings/constants.js'
import {getTotalOutputTokens} from '../../../bootstrap/state.js'
import {getMainLoopModel,renderDefaultModelSetting} from '../model.js'
import {getModelBehaviorName287} from '../behavior287.js'
import {getOfficialModelMenuPolicy287,createOfficialModelMenuPolicyPorts287} from '../officialModelPicker287.js'
import {sourceModelAdmission287} from '../modelAdmissionOwner287.js'
import {sourceModelCommandViews287,createModelCommandViewsHostPorts287} from '../modelCommandViews287.js'
import {sourceModelSessionController287} from '../officialModelPicker287/session.js'
import {createModelSelectorSourceHostPorts287} from '../officialModelPicker287/selector.js'
import {createModelSelectorListHostPorts287,originalModelSelectorList287} from '../officialModelPicker287/selectorList.js'
import {bindOfficialEffortWc287Imports287,supportsOfficialHookEffort287} from '../effortWc287.js'
import {decodeSessionEffort,encodeSessionEffort,getSettingsEffortTable,type SessionEffort} from '../effortSettings.js'
import {syncAppStateEffortSnapshot287} from '../officialEffortOwner287.js'
import {isFastModeEnabled,isFastModeAvailable,isFastModeSupportedByModel,clearFastModeCooldown,shouldRetainFastModeForModel287,isFastModeForModelActive287,onFastModeModelRejectionsChanged287,notifyFastModeModelSwitch287} from '../../fastMode.js'
import {getCacheControl} from '../../../services/api/claude.js'
import {logEvent} from '../../../services/analytics/index.js'
import {logError} from '../../log.js'
import {logForDebugging} from '../../debug.js'
import {getModelCatalogSource287} from '../servedCatalog.js'
import {createSelectorHostMap287} from '../officialModelPicker287/selector.native.js'
import {dispatchOriginalPreModelSwitch287,dispatchOriginalModelChange287} from './hooks.js'
import {createModelCommandClassification287,createModelCommandInputClock287,createModelCommandInputWindow287,createModelCommandTextBrand287,createModelCommandButtonInput287,createModelCommandSurface287,createModelCommandArm287,createModelCommandArmDefaults287,createModelCommandSanitize287,createModelCommandAnsi287,createModelCommandTruncate287,createModelCommandTextParser287,createModelCommandPathLabel287,createModelCommandNotices287,createModelCommandLabels287,createModelCommandPad287,createModelCommandJournal287,createModelCommandCommand287,createModelCommandHelpers287,createModelCommandSession287,createModelCommandEffort287,createModelCommandConfirmation287,createModelCommandPending287,createModelCommandConsent287,createModelCommandTimers287,createModelCommandConsentGate287,createModelCommandButtons287,createModelCommandConfirmText287,type ModelCommandInput287} from './native.js'

type SourceState=AppState&{sessionEffort:SessionEffort;settingsEffortTable:ReturnType<typeof getSettingsEffortTable>;cacheMissAckedAtOutputTokens?:number}
export function modelCommandState287(state:AppState):SourceState{return {...state,sessionEffort:decodeSessionEffort(state.effortValue),settingsEffortTable:getSettingsEffortTable()}}
function useSourceState<T>(select:(state:SourceState)=>T){return useAppState(state=>select(modelCommandState287(state)))}
function useSourceStore(){const store=useAppStateStore();return {...store,getState:()=>modelCommandState287(store.getState())}}
function useSourceWriter(){const set=useSetAppState();return useCallback((update:(state:SourceState)=>SourceState)=>set(previous=>{
 const next=update(modelCommandState287(previous)),{sessionEffort,settingsEffortTable,...state}=next
 const effortValue=encodeSessionEffort(sessionEffort)
 return {...state,effortValue}
 }),[set])}
export class ModelCommandPortPending287 extends Error{constructor(name:string){super('Original model command host port is not connected: '+name)}}
function pendingPorts(ports:Record<string,unknown>):Record<string,unknown>{return new Proxy(ports,{get:(target,key)=>key in target?target[String(key)]:(..._args:unknown[])=>{throw new ModelCommandPortPending287(String(key))}})}
function requiredPolicy(name:string){return (...args:unknown[])=>{const fn=getOfficialModelMenuPolicy287()[name];if(typeof fn!=='function')throw new ModelCommandPortPending287(name);return fn(...args)}}
const event=(name:string,details?:unknown)=>logEvent(name,details as never)
const settingsWrite=async(source:SettingSource,patch:Parameters<typeof updateSettingsForSource>[1],_opts?:unknown,storage?:unknown)=>{
 if(storage!==undefined)throw new ModelCommandPortPending287('explicit storageV5 settings writer')
 if(source!=='userSettings'&&source!=='projectSettings'&&source!=='localSettings')throw Error('Model command writes require an editable settings source')
 return updateSettingsForSource(source,patch)
}
function settingOrigin(name:string){return getSettingsWithSources().sources.toReversed().find(row=>Object.hasOwn(row.settings,name))?.source}
// Assemble the full original command only when it is used. Cold config cleanup
// can load this module before the model policy finishes its own import cycle.
function createModelCommandRuntime287(){
const base={e:jsx,r:jsxs,g:React.useState,A:React.useRef,Q:React.useMemo,R:React.useEffect,ce:React.useCallback,
 w:(compiler as unknown as {c:(n:number)=>unknown[]}).c,b:Symbol.for('react.memo_cache_sentinel'),s:Box,n:Text,K:React.Fragment}
const hostMap=createSelectorHostMap287({})
const sourcePolicyPorts=Object.fromEntries(['Ko','xy','d8','Ub','QBe','EQn','Lb','bQn','vbn'].map(name=>[name,requiredPolicy(name)]))
const textBrand=createModelCommandTextBrand287({})
const textParser=createModelCommandTextParser287({_a:getGraphemeSegmenter})
const truncate=createModelCommandTruncate287({})
const ansi=createModelCommandAnsi287({...textParser,...createModelSelectorListHostPorts287(),_a:getGraphemeSegmenter})
const sanitize=createModelCommandSanitize287({...ansi,...truncate,ie:(s:string)=>Bun.stringWidth(s,{ambiguousIsNarrow:true}),...textBrand})
const pathLabel=createModelCommandPathLabel287({c:homedir,S:sep})
const surface=createModelCommandSurface287({b$:()=>getExecutionSession287().surfaceCapabilities.caps()})
const armDefaults=createModelCommandArmDefaults287({})
const inputClock=createModelCommandInputClock287({jt:React.createContext})
const inputWindow=createModelCommandInputWindow287({})
const arm=createModelCommandArm287({...base,...inputClock,...armDefaults,ke:React.useContext,kt:useSyncExternalStore,xb:ClockContext})
const sharedPorts=pendingPorts({...createModelSelectorSourceHostPorts287(),...bindOfficialEffortWc287Imports287(),...createModelSelectorListHostPorts287(),...base,
 ...sourcePolicyPorts,...sourceModelAdmission287,Ny:createOfficialModelMenuPolicyPorts287().Ny,...createModelCommandViewsHostPorts287(),...textBrand,...textParser,...truncate,...sanitize,...pathLabel,...surface,...armDefaults,...inputClock,...inputWindow,...arm,jt:React.createContext,...hostMap,Tt:hostMap.V,_a:getGraphemeSegmenter,xb:ClockContext,b$:()=>getExecutionSession287().surfaceCapabilities.caps(),a:process.env,z:useSourceState,Tr:useSourceStore,En:useSourceWriter,_o:useNotifications,
 vf:getTotalOutputTokens,rt:getMainLoopModel,Ma:'<synthetic>',Tk:3600000,g3:300000,
 QD:(source:string)=>getCacheControl({querySource:source as 'repl_main_thread'}).ttl==='1h',
 tDt:sourceModelSessionController287.tDt,vTe:sourceModelSessionController287.vTe,
 Be:getModelBehaviorName287,Db:chalk.bold,W3:renderDefaultModelSetting,XG:renderDefaultModelSetting,Fn:(s:string)=>s.replace(/\[(1|2)m\]/gi,''),

 hn:settingsWrite,Zn:getSettingsFilePathForSource,Nx:settingOrigin,dO:getSourceDisplayName,ge:getSettingsForSource,
 E:(error:Error)=>'code' in error?String(error.code):undefined,Z:(error:unknown)=>error instanceof Error?error:new Error(String(error)),l:(error:unknown)=>error instanceof Error?error.message:String(error),
 FPr:dispatchOriginalPreModelSwitch287,l$o:dispatchOriginalModelChange287,To:isFastModeEnabled,tT:isFastModeAvailable,Ry:isFastModeSupportedByModel,
 Lk:shouldRetainFastModeForModel287,fU:clearFastModeCooldown,
 jw:supportsOfficialHookEffort287,d:logError,t:logForDebugging,i:event,p:event,m:event,y:event,fe:chalk,
 qie:sourceModelCommandViews287.qie,S:(s:string)=>s,Et:(s:unknown)=>s,CTe:'Set model to ',nFe:'Kept model as ',
 mHe:(props:React.ComponentProps<typeof ModelPicker>)=><ModelPicker {...props} skipSettingsWrite/>,
 We:useKeybinding,ve:useTerminalSize,Ze:useScreenReader,he:Dialog,
 j:({chord,action}:{chord:string;action:string})=><KeyboardShortcutHint shortcut={chord} action={action}/>,
 kt:useSyncExternalStore,zPe:onFastModeModelRejectionsChanged287,
 kbe:isFastModeForModelActive287,
 ppe:getModelCatalogSource287,
})
const classification=createModelCommandClassification287(sharedPorts)
const notices=createModelCommandNotices287(pendingPorts({...sharedPorts,...classification}))
const labels=createModelCommandLabels287(sharedPorts)
const pad=createModelCommandPad287(sharedPorts)
const journal=createModelCommandJournal287({n:getExecutionSession287})
const timers=createModelCommandTimers287(sharedPorts)
const consentGate=createModelCommandConsentGate287(sharedPorts)
const session=createModelCommandSession287(pendingPorts({...sharedPorts,...journal,l$o:dispatchOriginalModelChange287}))
const effort=createModelCommandEffort287(sharedPorts)
const helpers=createModelCommandHelpers287(pendingPorts({...sharedPorts,...timers,...consentGate,...journal,...session,...effort,...classification,...notices,...labels,...pad}))
const confirmText=createModelCommandConfirmText287(pendingPorts({...sharedPorts,...pad}))
const buttonInput=createModelCommandButtonInput287(sharedPorts)
const buttons=createModelCommandButtons287(pendingPorts({...sharedPorts,...buttonInput,$e:originalModelSelectorList287.$e}))
const confirmation=createModelCommandConfirmation287(pendingPorts({...sharedPorts,...helpers,...confirmText,...buttonInput,...buttons,...labels}))
const pending=createModelCommandPending287(sharedPorts)
const consent=createModelCommandConsent287(sharedPorts)
function createModelCommandHostPorts287():Record<string,unknown>{return pendingPorts({...sharedPorts,...timers,...consentGate,...journal,...session,...effort,...classification,...notices,...labels,...helpers,...confirmText,...buttonInput,...buttons,...confirmation,...pending,...consent,
 kd:(state:SourceState)=>{const read=createModelSelectorSourceHostPorts287().kd as (s:SourceState)=>unknown;return read(state)},
 Nk:notifyFastModeModelSwitch287,
 })}
 return {source:createModelCommandCommand287(createModelCommandHostPorts287()),helpers,effort,createModelCommandHostPorts287}
}
var modelCommandRuntime287:ReturnType<typeof createModelCommandRuntime287>|undefined
function getModelCommandRuntime287(){return modelCommandRuntime287??=createModelCommandRuntime287()}
export function createModelCommandHostPorts287():Record<string,unknown>{return getModelCommandRuntime287().createModelCommandHostPorts287()}
/** SDK and /model persist through the same original w3/_e writer. */
export const persistModelCommandEffort287:ReturnType<typeof createModelCommandEffort287>['w3']=(...args)=>getModelCommandRuntime287().effort.w3(...args)
export function OriginalModelCommand287(props:ModelCommandInput287){return React.createElement(getModelCommandRuntime287().source.jt,props)}
export const sourceModelCommand287={jt:OriginalModelCommand287}
// Same late namespace bridge used by the original selector adapter; the full
// helper factory is constructed once and its methods retain their identities.
export const sourceModelCommandHelpers287=new Proxy({} as ReturnType<typeof createModelCommandHelpers287>,{
 get:(_target,key)=>Reflect.get(getModelCommandRuntime287().helpers,key),
 has:(_target,key)=>Reflect.has(getModelCommandRuntime287().helpers,key),
 ownKeys:()=>Reflect.ownKeys(getModelCommandRuntime287().helpers),
 getOwnPropertyDescriptor:(_target,key)=>Object.getOwnPropertyDescriptor(getModelCommandRuntime287().helpers,key),
})
