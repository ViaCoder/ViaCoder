import type * as React from 'react'
import {jsx} from 'react/jsx-runtime'
import {createPowerupStartupStage287,type PowerupDiscoveryProps287} from './native.js'

function namespace(file:string):Record<string,unknown>{
 const owner=import.meta.require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')
 return owner.getOriginalModsLifecycle287().clearSourceModule287(file)
}
export function resolvePowerupDiscoveryArm287():unknown{
 const fn=namespace('chunk-srdsfpp4.js').hdr
 if(typeof fn!=='function')throw Error('Original Powerup discovery reader missing')
 return fn()
}
export function getPowerupDiscoveryStep287():React.ComponentType<PowerupDiscoveryProps287>{
 const fn=namespace('chunk-zyygk00j.js').k
 if(typeof fn!=='function')throw Error('Original Powerup discovery component missing')
 return fn as React.ComponentType<PowerupDiscoveryProps287>
}
/** The original asynchronous stage resolves before the existing setup renderer
 * mounts. This sole callback hand-in preserves that renderer's completion owner. */
export async function showPowerupStartup287(
 onboardingShown:boolean,
 show:(renderer:(done:()=>void)=>React.ReactNode)=>Promise<void>,
):Promise<boolean>{
 let complete:()=>void=()=>{throw Error('Powerup startup completed before mount')}
 const stage=createPowerupStartupStage287({
  P:{onboardingShown},e:jsx,
  importDiscovery287:async()=>({resolvePowerupDiscoveryArm:resolvePowerupDiscoveryArm287}),
  importStep287:async()=>({PowerupDiscoveryStep:getPowerupDiscoveryStep287()}),
 })
 const node=await stage(()=>complete())
 if(node===null)return false
 await show(done=>{complete=done;return node})
 return true
}
