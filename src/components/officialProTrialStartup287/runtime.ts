import type * as React from 'react'
import {jsx} from 'react/jsx-runtime'
import {logEvent} from '../../services/analytics/index.js'
import {createProTrialStartupStage287,createHeldHooksStartup287,type ProTrialStartProps287,type ProTrialStatus287} from './native.js'

function namespace(file:string):Record<string,unknown>{
 const owner=import.meta.require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')
 return owner.getOriginalModsLifecycle287().clearSourceModule287(file)
}
export function getProTrialStatus287():ProTrialStatus287{
 const read=namespace('chunk-qyp40g3x.js').rnt
 if(typeof read!=='function')throw Error('Original ProTrial status reader missing')
 return (read as ()=>ProTrialStatus287)()
}
export function getProTrialStartScreen287():React.ComponentType<ProTrialStartProps287>{
 const screen=namespace('chunk-sw07razb.js').j
 if(typeof screen!=='function')throw Error('Original ProTrial screen missing')
 return screen as React.ComponentType<ProTrialStartProps287>
}
/** Original fire-and-forget post-trust import consumer and full gas share the
 * existing registry/registration promise. This adapter allocates no hook state. */
export function startHeldHooksStartup287(scope:Pick<ProTrialStartProps287,'storageV5'|'credentials'>={}):Promise<void>{
 return createHeldHooksStartup287({
  T:scope.storageV5,x:scope.credentials,
  d:error=>{
   const fn=namespace('chunk-amhtwhch.js').d
   if(typeof fn!=='function')throw Error('Original error sink missing')
   Reflect.apply(fn,undefined,[error])
  },
  Z:error=>{
   const fn=namespace('chunk-c9me9cp7.js').Z
   if(typeof fn!=='function')throw Error('Original error conversion missing')
   const value:unknown=Reflect.apply(fn,undefined,[error])
   if(!(value instanceof Error))throw Error('Original error conversion returned a non-error')
   return value
  },
  importHeldHooks287:async()=>({loadHooksModulesHeldForTrust:(storageV5,credentials)=>{
   const fn=namespace('chunk-mphp7acd.js').gas
   if(typeof fn!=='function')throw Error('Original held-for-trust hook loader missing')
   Reflect.apply(fn,undefined,[storageV5,credentials])
  }}),
 })()
}
/** The existing setup renderer owns completion. Optional T/x retain the exact
 * original storage/credential props; defaults do not manufacture a host scope. */
export async function showProTrialStartup287(
 show:(renderer:(done:()=>void)=>React.ReactNode)=>Promise<void>,
 scope:Pick<ProTrialStartProps287,'storageV5'|'credentials'>={},
):Promise<boolean>{
 let complete:()=>void=()=>{throw Error('ProTrial startup completed before mount')}
 const stage=createProTrialStartupStage287({
  rnt:getProTrialStatus287,i:logEvent,e:jsx,T:scope.storageV5,x:scope.credentials,
  importScreen287:async()=>({ProTrialStartScreen:getProTrialStartScreen287()}),
 })
 const node=await stage(()=>complete())
 if(node===null)return false
 await show(done=>{complete=done;return node})
 return true
}
