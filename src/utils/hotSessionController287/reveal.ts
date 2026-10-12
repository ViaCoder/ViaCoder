import {useCallback,useEffect,useImperativeHandle,useRef} from 'react'
import {createHotTranscriptRevealHook287} from './revealNative.js'
import {getHotSessionLeaves287} from './runtime.js'
// A hook ABI projection only: the row/element map and clock belong to the
// currently mounted native C virtual list, not a second transcript/cache.
let hook:ReturnType<typeof createHotTranscriptRevealHook287>|undefined
export function useHotTranscriptReveal287(...args:Parameters<ReturnType<typeof createHotTranscriptRevealHook287>>){
 if(!hook){const leaves=getHotSessionLeaves287();hook=createHotTranscriptRevealHook287({A:useRef,ce:useCallback,R:useEffect,Pde:useImperativeHandle,cb:leaves.transcriptRevealFind,L_:leaves.transcriptRevealLandMs,U_:leaves.transcriptRevealGiveUpMs})}
 return hook(...args)
}
