import {createAgentDeliveryNative287} from './agentDeliveryNative287.js'
import {createHash} from 'node:crypto'
import {getCachedFeatureValueWithSource287} from '../../services/analytics/growthbook.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import type {AgentDeliveryNative287} from './agentDeliveryNative287.js'
import {logError} from '../../utils/log.js'
// The sole original d ledger and mo intent closure. P5 records proof only for
// source handback:true after actual live-recipient admission; SendMessage's
// normal peer/coordinator origin deliberately never supplies that flag.
let owner:AgentDeliveryNative287|undefined
function getOwner():AgentDeliveryNative287 {return owner??=createAgentDeliveryNative287(createAgentDeliveryPorts287())}
export function createAgentDeliveryPorts287(){return {surface:()=>(require('../../services/context/surface287.js') as typeof import('../../services/context/surface287.js')).getSurfaceIdentity287(),Dn:authEnvironment,a:authEnvironment,pe:(context:import('../../Tool.js').ToolUseContext)=>(require('../../utils/permissions/confirmWithUser.js') as typeof import('../../utils/permissions/confirmWithUser.js')).readConfirmationPermissionContext(context),mf:()=>(require('../../utils/permissions/autoModeState.js') as typeof import('../../utils/permissions/autoModeState.js')).isAutoModeActive(),Uo:(name:string,fallback:unknown)=>{const result=getCachedFeatureValueWithSource287(name,fallback);return {...result,source:result.source==='live'?'payload':result.source}},N:(value:unknown)=>typeof value==='object'&&value!==null&&!Array.isArray(value),k:<T>(name:string,fallback:T)=>(require('../../services/analytics/growthbook.js') as typeof import('../../services/analytics/growthbook.js')).getFeatureValue_CACHED_MAY_BE_STALE(name,fallback),C:createHash,L:(values:unknown[])=>[...new Set(values)],U:()=>execution(),t:()=>{},Ge:()=>{const s=execution();return s.identity.mainAgentId(s.id)},y(){},p(){},d:logError,logError,event(){},yi:(require('../../Task.js') as typeof import('../../Task.js')).isTerminalTaskStatus,hy:()=>require('../../utils/messageQueueManager.js'),taskSession:()=>{const {taskFileNative287}=require('../GetTaskTool/nativeHost.js') as typeof import('../GetTaskTool/nativeHost.js');const {getExecutionSession287}=require('../../services/context/execution287.js') as typeof import('../../services/context/execution287.js');return taskFileNative287.SessionSlot.of(getExecutionSession287().host)}}}
function execution(){return (require('../../services/context/execution287.js') as typeof import('../../services/context/execution287.js')).getExecutionSession287()}
// Lazily construct the one official ledger/contract/neutralizer namespace,
// avoiding eager execution-root imports while other tools initialise.
export const agentDelivery287=new Proxy({} as AgentDeliveryNative287,{get:(_target,key)=>Reflect.get(getOwner(),key)})
