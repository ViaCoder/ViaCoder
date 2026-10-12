import React from 'react'
import {getNativeFocusedUI287} from './assistantRender287.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getExecutionSession287} from '../../services/context/execution287.js'

export type NativePublicPluginPromptProps287={
 survey:boolean
 working:boolean
 setInputValue:(value:string)=>void
 promptOwnsEscape:boolean
 docked:boolean
 onHoldsBandChange?:(holds:boolean)=>void
}

/** Original OIe and ree/Sw/aV roots. Inputs come from the live REPL draft,
 * survey and turn; pane placement/focus/fields come from canonical kg. */
export function NativePublicPluginPrompt287(props:NativePublicPluginPromptProps287):React.ReactNode{
 const source=getNativeFocusedUI287()
 return <NativeFocusedSessionHost287><>
  {React.createElement(source.OIe,{survey:props.survey,working:props.working,setInputValue:props.setInputValue,onHoldsBandChange:props.onHoldsBandChange})}
  {React.createElement(source.ree,{working:props.working,promptOwnsEscape:props.promptOwnsEscape,docked:props.docked})}
 </></NativeFocusedSessionHost287>
}

/** Original y0n and _r use the already selected session context and actual
 * execution session. This is a provider bridge, not a second session owner. */
export function NativeFocusedSessionHost287({children}:{children:React.ReactNode}):React.ReactNode{
 const Provider=getOriginalModsLifecycle287().clearSourceModule287('chunk-k01ybgd6.js').y0n as React.ComponentType<{session:ReturnType<typeof getExecutionSession287>;children:React.ReactNode}>
 return <Provider session={getExecutionSession287()}>{children}</Provider>
}
