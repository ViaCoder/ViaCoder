import {getOriginalModsLifecycle287} from '../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {KeyboardEvent} from '../ink/events/keyboard-event.js'
import {useInput} from '../ink.js'
export type InterimRange287={start:number;end:number}|null
// Same existing pV / hotDraft owner. submit returns synchronous admission,
// not Promise completion. Getters must read current value/cursor at call time.
export interface VoiceComposer287 {
 readonly value:string;readonly cursorOffset:number
 setValueWithCursor(value:string,cursor:number):void
 submit?(input:string,flag:boolean):boolean
 setInterimRange?(range:InterimRange287):void
}
export interface VoiceIntegrationResult287 {
 stripTrailing(maxStrip:number,options?:{char?:string;anchor?:boolean;floor?:number}):number
 resetAnchor():void;handleKeyEvent(fallbackMs?:number):void;cancelRecording():void
 interimRange:InterimRange287
}
export interface VoiceKeybindingProps287 {
 voiceHandleKeyEvent:VoiceIntegrationResult287['handleKeyEvent']
 voiceCancelRecording:VoiceIntegrationResult287['cancelRecording']
 stripTrailing:VoiceIntegrationResult287['stripTrailing'];resetAnchor:()=>void
 isActive:boolean;composerTakesTypedKeys?:boolean;composer:VoiceComposer287
}
interface OriginalVoiceConsumers287 {
 lGe(options:{composer:VoiceComposer287;isActive?:boolean}):VoiceIntegrationResult287
 HHe(options:VoiceKeybindingProps287):{handleKeyDown:(event:KeyboardEvent)=>void;voiceKeyDisplay:string|null}
}
function original():OriginalVoiceConsumers287{return getOriginalModsLifecycle287().clearSourceModule287('chunk-2t7nhzwg.js') as unknown as OriginalVoiceConsumers287}
export function useVoiceIntegration(options:{composer:VoiceComposer287;isActive?:boolean}):VoiceIntegrationResult287{return original().lGe(options)}
export function useVoiceKeybindingHandler(options:VoiceKeybindingProps287){return original().HHe(options)}
// Keep current typed REPL transport only; original HHe decides all activation,
// cancellation, tap/hold/double-tap and modal/typed-input gates.
export function VoiceKeybindingHandler(options:VoiceKeybindingProps287):null{
 const {handleKeyDown}=useVoiceKeybindingHandler(options)
 useInput((_input,_key,event)=>{
  const keyboardEvent=new KeyboardEvent(event.keypress)
  handleKeyDown(keyboardEvent)
  if(keyboardEvent.didStopImmediatePropagation())event.stopImmediatePropagation()
 },{isActive:options.isActive})
 return null
}
