import type {ReactNode} from 'react'
import type {ProcessUserInputContext} from '../../../utils/processUserInput/processUserInput.js'
import type {LocalJSXCommandOnDone} from '../../../types/command.js'
import type {BtwHistory,BtwInFlight,BtwOutcome} from '../history.js'
import type {ExecutionSession287} from '../../../services/context/officialExecutionOwners287/native.js'
export type BtwPanelContext287=ProcessUserInputContext & {session:ExecutionSession287}
export type BtwPanelOutcome287=BtwOutcome | {response:string;synthetic:boolean;fallbackNotice?:string}
export type BtwPanelCanonicalBindings287={"Ge":unknown;"wW":unknown;"l":unknown;"t":unknown;"Pt":unknown;"uu":unknown;"Ae":unknown;"w":unknown;"f":unknown;"pT":unknown;"pr":unknown;"Ia":unknown;"nt":unknown;"s":unknown;"n":unknown;"oi":unknown;"kr":unknown;"xw":unknown;"ce":unknown;"R":unknown;"A":unknown;"g":unknown;"ugr":unknown;"be":unknown;"j":unknown;"Qe":unknown;"Jc":unknown;"Re":unknown;"y1":unknown;"Ev":unknown;"Aw":unknown;"Jg":unknown;"Yo":unknown;"ve":unknown;"ea":unknown;"$ie":unknown;"z6e":unknown;"zY":unknown;"z8t":unknown;"V8t":unknown;"A0n":unknown;"k0n":unknown;"R0n":unknown;"x0n":unknown;"P0n":unknown;"bA":unknown;"urt":unknown;"xo":unknown;"K":unknown;"e":unknown;"r":unknown;"MD":unknown;"Ea":unknown;"o":unknown;"se":unknown;"u":unknown;"b":unknown;"Ue":unknown;"mt":unknown;"qe":unknown;"$e":unknown}
export interface BtwPanelPorts287 extends BtwPanelCanonicalBindings287 {
 ownedTask287(history:BtwHistory,question:string,run:(controller:AbortController)=>Promise<BtwPanelOutcome287>):BtwInFlight;
 adoptTask287(history:BtwHistory,task:BtwInFlight):void;cancelTask287(history:BtwHistory,task:BtwInFlight):void;detachTask287(history:BtwHistory,task:BtwInFlight):void;
 importOriginal287(file:string):Promise<Record<string,unknown>>;
}
export interface BtwPanelProps287 {question:string;context:BtwPanelContext287;onDone:LocalJSXCommandOnDone;initialResponse?:string;initialFallbackNotice?:string;inFlight?:BtwInFlight}
export function createBtwPanel287(ports:BtwPanelPorts287):{Panel:(props:BtwPanelProps287)=>ReactNode;call:(onDone:LocalJSXCommandOnDone,context:BtwPanelContext287,args:string)=>Promise<ReactNode>;startUnwatched:(question:string,context:BtwPanelContext287)=>Promise<void>;eligible:()=>boolean;canHandBack:()=>boolean;reopen:(history:BtwHistory)=>void};
