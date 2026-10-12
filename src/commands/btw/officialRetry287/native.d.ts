import type {ComponentType} from 'react'
import type {SideQuestionRetry287} from '../../../utils/officialSideQuestion287/native.js'
export type BtwRetryState287=SideQuestionRetry287 & {retryAt:number}
export interface BtwRetryOwner287 {retry?:BtwRetryState287;onRetry?:(retry:BtwRetryState287)=>void}
export interface BtwRetryPorts287 {w:typeof import('react/compiler-runtime')['c'];e:typeof import('react/jsx-runtime')['jsx'];r:typeof import('react/jsx-runtime')['jsxs'];n:typeof import('../../../ink.js')['Text'];s:typeof import('../../../ink.js')['Box'];b:symbol;Nee:typeof import('../../../components/Spinner/SpinnerGlyph.js')['SpinnerGlyph']}
export function createBtwRetry287(ports:BtwRetryPorts287):{View:ComponentType<{frame:number;retry:BtwRetryState287|null}>;statusText:(status:number|undefined)=>string;update:(owner:BtwRetryOwner287,retry:SideQuestionRetry287)=>void;fromProgress:(progress:Record<string,unknown>)=>BtwRetryState287|null}
