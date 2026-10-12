import type {ComponentType} from 'react'
import type {Message} from '../../../types/message.js'
import type {LocalJSXCommandOnDone} from '../../../types/command.js'
import type {EffortLevel} from '../../effort.js'
import type {SessionEffort} from '../effortSettings.js'
export type ModelSwitchHookDecision287={decision:'proceed'|'block'|'ask';skipConfirm?:boolean;messages:string[];reason?:string}
export type ModelCommandSession287={id:string}
export type ModelCommandInput287={getMessages:()=>Message[];onDone:LocalJSXCommandOnDone;storageV5?:unknown;session:ModelCommandSession287;onQueryEvent?:unknown}
export type SourceModelCommandFunction287=(...args:unknown[])=>unknown
export function createModelCommandCommand287(ports:Record<string,unknown>):{jt:ComponentType<ModelCommandInput287>}
export function createModelCommandHelpers287(ports:Record<string,unknown>):{
 mE:(session:ModelCommandSession287,getState:()=>unknown,model:string|null,source:string,options?:{signal?:AbortSignal;revalidating?:boolean})=>Promise<ModelSwitchHookDecision287>;
 Bst:(model:string|null,storage?:unknown,timeout?:number)=>Promise<{kind:'saved'|'unconfirmed'}|{kind:'failed';error:Error}>;
 jst:(result:unknown)=>string;lEr:(model:string|null)=>string;cEr:(model:string|null)=>string;gE:(model:string|null)=>string;bte:(model:string|null)=>string;
 INn:SourceModelCommandFunction287;KZt:(model:string|null)=>boolean;iN:(model:string|null,reason:string|undefined,messages:string[])=>string;Ld:(value:string)=>string;Kge:SourceModelCommandFunction287;
}
export function createModelCommandSession287(ports:Record<string,unknown>):{j_:<T>(session:ModelCommandSession287,work:()=>Promise<T>)=>Promise<T>;YD:(state:unknown)=>string;eDt:(model:string|null,mode:string)=>string;k5:(state:unknown)=>string|null;B_:(session:ModelCommandSession287,state:unknown,model:string|null,source:string)=>void;Ojn:(messages:Message[],now?:number)=>unknown;one:(messages:Message[],now?:number)=>boolean}
export function createModelCommandEffort287(ports:Record<string,unknown>):{w3:(effort:EffortLevel|undefined,model:string,persist?:boolean,storage?:unknown)=>Promise<Error|undefined>;Yxe:SourceModelCommandFunction287;U9:(effort:EffortLevel)=>SessionEffort;jb:SourceModelCommandFunction287;b3:SourceModelCommandFunction287}
export function createModelCommandConfirmation287(ports:Record<string,unknown>):{Mee:ComponentType<{kind:'model'|'effort';model:string|null;effort?:EffortLevel;hookReason?:string;onConfirm:()=>void;onCancel:()=>void}>}
export function createModelCommandPending287(ports:Record<string,unknown>):{Eee:ComponentType<{message:string;onCancel:()=>void}>;lme:(fast:boolean,model:string|null)=>boolean}
export function createModelCommandConsent287(ports:Record<string,unknown>):{ctt:ComponentType<Record<string,unknown>>}
export function createModelCommandTimers287(ports:Record<string,unknown>):{lt:<T>(promise:Promise<T>,milliseconds:number)=>Promise<T|undefined>}
export function createModelCommandConsentGate287(ports:Record<string,unknown>):{fOo:()=>boolean}
export function createModelCommandButtons287(ports:Record<string,unknown>):{qn:ComponentType<Record<string,unknown>>}
export function createModelCommandConfirmText287(ports:Record<string,unknown>):{itt:(text:string,width:number,lines?:number)=>string}

export function createModelCommandJournal287(ports:Record<string,unknown>):{Ret:()=>number|null;PEe:()=>number|null;t4:()=>number|null;sKt:(model:string)=>Set<string>|undefined;die:()=>void}

export function createModelCommandNotices287(ports:Record<string,unknown>):{Ibn:(model:string|null)=>string|null;Jyt:()=>{model:string;kind:string}|null;FH:(model:string,lane?:string)=>string|null}
export function createModelCommandLabels287(ports:Record<string,unknown>):{F9:(effort:unknown)=>string}
export function createModelCommandPad287(ports:Record<string,unknown>):{RD:number;mB:number;yC:number}

export function createModelCommandSurface287(ports:Record<string,unknown>):{pr:()=>unknown;Ia:()=>boolean}
export function createModelCommandArm287(ports:Record<string,unknown>):{kr:SourceModelCommandFunction287}
export function createModelCommandArmDefaults287(ports:Record<string,unknown>):Record<string,unknown>
export function createModelCommandSanitize287(ports:Record<string,unknown>):{wl:(value:string)=>string;Q2t:(value:string)=>string;Ks:(value:string)=>string;Ti:(value:string)=>{text:string;needsGutter:boolean}}
export function createModelCommandAnsi287(ports:Record<string,unknown>):{Bs:(value:string)=>string}
export function createModelCommandTruncate287(ports:Record<string,unknown>):Record<string,unknown>
export function createModelCommandTextParser287(ports:Record<string,unknown>):Record<string,unknown>
export function createModelCommandPathLabel287(ports:Record<string,unknown>):{Qs:(value:string)=>string}

export function createModelCommandButtonInput287(ports:Record<string,unknown>):{b0n:ComponentType<Record<string,unknown>>;Ci:symbol}

export function createModelCommandTextBrand287(ports:Record<string,unknown>):{iK:(value:string)=>string}

export function createModelCommandToolModel287(ports:Record<string,unknown>):{tm:(context:{options:{mainLoopModel:string};permissionLayers?:readonly {kind:string;mainLoopModel?:string}[]})=>string}

export function createModelCommandInputClock287(ports:Record<string,unknown>):Record<string,unknown>
export function createModelCommandInputWindow287(ports:Record<string,unknown>):Record<string,unknown>

export function createModelCommandModelViews287(ports:Record<string,unknown>):{qie:()=>string|null;ld:()=>string}

export function createModelCommandClassification287(ports:Record<string,unknown>):Record<string,unknown>

export type ModelAdmissionQueue287={pending:number;tail:Promise<unknown>}
export function createModelCommandAdmission287(ports:Record<string,unknown>):{JO:{of:(session:ModelCommandSession287)=>ModelAdmissionQueue287};j_:<T>(session:ModelCommandSession287,work:()=>Promise<T>)=>Promise<T>}
