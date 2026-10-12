import * as React from 'react'
import {ModelPicker} from '../../components/ModelPicker.js'
import {Text} from '../../ink.js'
import {useAppState} from '../../state/AppState.js'
import type {LocalJSXCommandOnDone} from '../../types/command.js'
import type {SharedSessionCommandHost} from '../../server/sharedSessionCommandHost.js'
import type {EffortLevel} from '../../utils/effort.js'

/** Official picker, with owner-confirmed mutations instead of viewer settings. */
export function SharedModelPicker({host,onDone,signal}:{host:SharedSessionCommandHost;onDone:LocalJSXCommandOnDone;signal:AbortSignal}) {
  const current=useAppState(state=>state.mainLoopModel),[pending,setPending]=React.useState(false)
  const locked=React.useRef(false),alive=React.useRef(true)
  React.useEffect(()=>{alive.current=true;return()=>{alive.current=false}},[])
  async function select(model:string|null,effort:EffortLevel|undefined){
    if(locked.current)return
    locked.current=true;setPending(true)
    let confirmed:string|undefined
    try{
      confirmed=await host.setModel(model??undefined,signal)
      const result=effort===undefined?undefined:await host.effort(effort,signal,confirmed)
      if(alive.current)onDone(`Set model to ${confirmed}${result?`\n${result.message}`:''}`,{display:'system'})
    }catch(error){
      if(alive.current)onDone(`${confirmed?`Model changed to ${confirmed}; effort confirmation failed`:'Model change failed'}: ${error instanceof Error?error.message:String(error)}`,{display:'system'})
    }
  }
  if(pending)return <Text>Waiting for shared session confirmation…</Text>
  return <ModelPicker initial={current} sessionModel={null} skipSettingsWrite isStandaloneCommand
    headerText="Changes apply to this shared session. Other connected views update after owner confirmation."
    onSelect={(model,effort)=>void select(model,effort)}
    onCancel={()=>onDone(`Kept model as ${current??'default'}`,{display:'system'})}/>
}
