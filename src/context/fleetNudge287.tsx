import React,{useContext,useState} from 'react'
import {getOriginalModsLifecycle287} from '../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import type {ToolUseContext} from '../Tool.js'
/** The original be provider's one fleet owner. An already supplied remote
 * owner is reused, never a second store, context or roster implementation. */
export function FleetNudgeProvider287({children}:{children:React.ReactNode}):React.ReactNode {
 const source=getOriginalModsLifecycle287()
 const fleet=source.clearSourceModule287('chunk-1rsf5e19.js') as {
  p8t:React.Context<object|null>
  gDe:new(options:{storageV5?:ToolUseContext['storageV5']})=>object
 }
 const storage=source.clearSourceModule287('chunk-038c023k.js').Te as ()=>{storageV5?:ToolUseContext['storageV5']}
 const supplied=useContext(fleet.p8t),{storageV5}=storage()
 // Original be: h=()=>l??new gDe({storageV5:s}); let[S]=g(h).
 const [owner]=useState(()=>supplied??new fleet.gDe({storageV5}))
 return <fleet.p8t.Provider value={owner}>{children}</fleet.p8t.Provider>
}
