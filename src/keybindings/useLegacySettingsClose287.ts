import {useLayoutEffect} from 'react'
import {useOptionalKeybindingContext} from './KeybindingContext.js'
import {useKeybinding} from './useKeybinding.js'

/** Only the still-mounted typed Config keeps Enter-save semantics. Canonical
 * Settings Enter stays select:accept for original components. Null/custom
 * user bindings are respected; Space remains toggle. Same provider registry. */
export function useLegacySettingsClose287(handler:()=>void|false|Promise<void>,isActive:boolean):void {
  const context=useOptionalKeybindingContext()
  useKeybinding('settings:close',handler,{context:'Settings',isActive})
  useLayoutEffect(()=>{
    if(!context||!isActive)return
    const stop=context.registerPreDispatch({handler(input,key){
      if(!key.return)return false
      const result=context.resolve(input,key,['Settings','Global'])
      if(result.type!=='match'||result.action!=='select:accept')return false
      return handler()!==false
    }})
    return ()=>{stop()}
  },[context,handler,isActive])
}
