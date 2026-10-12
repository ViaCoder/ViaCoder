import type React from 'react'
import type {Store} from '../state/store.js'
import {getOriginalModsLifecycle287} from '../utils/hooks/modelSwitch287/lifecycleRuntime.js'
export type VoiceState = {
  voiceState: 'idle' | 'recording' | 'processing';
  voiceError: string | null;
  voiceInterimTranscript: string;
  voiceAudioLevels: number[];
  voiceWarmingUp: boolean;
  awaitingVoiceSubmitDoubleTap: boolean;
};
interface OriginalVoice287 {
  H0n(props:{children:React.ReactNode}):React.ReactNode
  TDe():Store<VoiceState>
  Bpr():{next(value:number,weight:number):number;reset():void}
  fh<T>(selector:(state:VoiceState)=>T):T
  Q8t():Store<VoiceState>['setState']
  Ove():Store<VoiceState>['getState']
}
// All public hooks and the passive root provider share original i/x/Ls.
// Speech/keybinding feature admission stays at its existing callers.
function original():OriginalVoice287 {
  return getOriginalModsLifecycle287().clearSourceModule287('chunk-e4kmgj7a.js') as unknown as OriginalVoice287
}
export function VoiceProvider(props:{children:React.ReactNode}):React.ReactNode {return original().H0n(props)}
export function useVoiceState<T>(selector:(state:VoiceState)=>T):T {return original().fh(selector)}
export function useSetVoiceState():Store<VoiceState>['setState'] {return original().Q8t()}
export function useGetVoiceState():Store<VoiceState>['getState'] {return original().Ove()}
export function useVoiceLevelSmoother287():ReturnType<OriginalVoice287['Bpr']> {return original().Bpr()}
