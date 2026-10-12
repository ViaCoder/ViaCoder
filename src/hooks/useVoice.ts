import {getOriginalModsLifecycle287} from '../utils/hooks/modelSwitch287/lifecycleRuntime.js'
export type UseVoiceOptions287={onTranscript:(text:string)=>void;onError:(message:string)=>void;enabled:boolean;focusMode:boolean;mode?:'hold'|'tap'}
export type UseVoiceReturn287={state:'idle'|'recording'|'processing';handleKeyEvent:(fallbackMs?:number)=>void;cancelRecording:()=>void}
interface OriginalVoiceHooks287 {Le(options:UseVoiceOptions287):UseVoiceReturn287;X(chunk:Buffer):number}
function original():OriginalVoiceHooks287{return getOriginalModsLifecycle287().clearSourceModule287('chunk-f7efz03r.js') as unknown as OriginalVoiceHooks287}
// Original host/clock/credential provider/store readers and complete controller.
export function useVoice(options:UseVoiceOptions287):UseVoiceReturn287{return original().Le(options)}
export function computeLevel(chunk:Buffer):number{return original().X(chunk)}
export const FIRST_PRESS_FALLBACK_MS=2000
export function normalizeLanguageForSTT(language:string|undefined):{code:string;fellBackFrom?:string}{
 return (getOriginalModsLifecycle287().clearSourceModule287('chunk-4s38z9x2.js') as unknown as {sHe(language:string|undefined):{code:string;fellBackFrom?:string}}).sHe(language)
}
