import type {ReactNode} from 'react'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
interface OriginalVoiceIndicator287 {sve(props:{voiceState:'idle'|'recording'|'processing'}):ReactNode;ive():ReactNode}
function original():OriginalVoiceIndicator287{return getOriginalModsLifecycle287().clearSourceModule287('chunk-2t7nhzwg.js') as unknown as OriginalVoiceIndicator287}
export function VoiceIndicator(props:{voiceState:'idle'|'recording'|'processing'}):ReactNode{return original().sve(props)}
export function VoiceWarmupHint():ReactNode{return original().ive()}
