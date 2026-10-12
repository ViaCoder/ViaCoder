import type {Message,AssistantMessage} from '../../../types/message.js'
import type {ToolUseContext} from '../../../Tool.js'
import type {CacheSafeParams} from '../../../utils/forkedAgent.js'
import type {AutoCompactTrackingState} from '../autoCompact.js'
export type DeeperPass287='none'|'available'|'spent'
export type CompactCacheSafeParams287=CacheSafeParams&{agentCacheTtlOverride?:'5m'|'1h'}
export interface CompactCacheInput287 {u:CacheSafeParams['systemPrompt'];s:CacheSafeParams['userContext'];g:CacheSafeParams['systemContext'];f:ToolUseContext;w:Message[];lt?:CacheSafeParams['stickyBetas'];W?:'5m'|'1h'}
export interface QueryCompactStageInput287 {ws:boolean;No:boolean;N:{transition?:{reason:string}};ur:boolean;b:string;w:Message[];qt:unknown;In:number;f:ToolUseContext;po:string;u:CacheSafeParams['systemPrompt'];s:CacheSafeParams['userContext'];g:CacheSafeParams['systemContext'];lt?:CacheSafeParams['stickyBetas'];W?:'5m'|'1h'}
export type QueryCompactCallerPorts287=Record<"Lan"|"UIr"|"BIr"|"FIr"|"rs"|"jm"|"EOr"|"Nue"|"kjn"|"FDt"|"St"|"xc"|"go"|"no"|"of"|"KM"|"d"|"EY"|"mR"|"Ei"|"OIr"|"Uxo"|"Hlt"|"ug"|"i"|"c"|"C6"|"S"|"Fxr"|"nko"|"pFe"|"uo"|"IIr",unknown>
export function createQueryCompactLifecycle287(ports:QueryCompactCallerPorts287):{
 automaticCacheSafeParams(input:CompactCacheInput287):CompactCacheSafeParams287;
 reactiveCacheSafeParams(input:CompactCacheInput287&{ot:ToolUseContext}):CompactCacheSafeParams287;
 observerLifetime(input:{f:ToolUseContext;b:string}):{disarm():void;[Symbol.dispose]():void}|undefined;
 markTurnActive(input:{vs:unknown;w:Message[];f:ToolUseContext;N:{transition?:{reason:string}}}):void;
 impossibleConversation(input:{h:AssistantMessage;ne:boolean;b:string;f:ToolUseContext;w:Message[];H:boolean;on:DeeperPass287;I:{now:()=>string;uuid:()=>string}}):Generator<AssistantMessage,{reason:'image_error'|'prompt_too_long'}|undefined,void>;
 surfaceFailure(input:{v:boolean;Uo?:{reason:string;detail?:string};h:AssistantMessage;I:{now:()=>string;uuid:()=>string}}):AssistantMessage;
 stickyBetas(input:{e:{stickyBetas?:CacheSafeParams['stickyBetas']};po:string|undefined}):CacheSafeParams['stickyBetas'];
 isPreFirstCompactFork(input:{f:ToolUseContext;Ve?:AutoCompactTrackingState;b:string}):boolean;
 estimate(input:QueryCompactStageInput287):void;
 response(input:QueryCompactStageInput287&{Q:AssistantMessage[];to:number;be:unknown;vt:unknown[]}):void;
 retryGate(input:{v:boolean;No:boolean;on:DeeperPass287;N:{transition?:{reason:string}};Ve?:AutoCompactTrackingState}):{deeper:boolean;hasAttempted:boolean;rapid:{action:'proceed'|'trip';consecutiveRapidRefills:number};consecutiveRapidRefills:number};
 retryState(input:{ue:boolean;At?:unknown;v:boolean;on:DeeperPass287;ut:Message[];Ae:{hasAttemptedReactiveCompact:boolean;reactiveCompactDeeperPass:DeeperPass287};f:ToolUseContext;Ve:AutoCompactTrackingState;qe?:boolean}):{guards:{hasAttemptedReactiveCompact:boolean;reactiveCompactDeeperPass:DeeperPass287};messages:Message[];toolUseContext:ToolUseContext;compactTracking:AutoCompactTrackingState;resumeIncompleteThinking?:boolean;transition:{reason:'precomputed_compact_swap'|'reactive_compact_retry'}}
}
