import type {Dispatch,SetStateAction} from 'react'
import type {Tool,ToolUseContext,ToolPermissionContext} from '../Tool.js'
import type {Message} from '../types/message.js'
import type {SpinnerMode} from '../components/Spinner/types.js'
import type {PermissionMode} from '../types/permissions.js'
import type {CcrControlOptions287,CcrManagerConfig287} from '../remote/publicClient287.js'
import type {SDKControlRequest} from '../entrypoints/sdk/controlTypes.js'
import type {RemoteMessageContent} from '../utils/teleport/api.js'
import type {HotTurnStream287} from '../utils/hotSessionController287/native.js'
import {getOriginalModsLifecycle287} from '../utils/hooks/modelSwitch287/lifecycleRuntime.js'

/** Exact jRn shape, owned by the existing p9; this interface creates no state. */
export interface PublicCcrRetraction287 {
 retracted:Set<string>;inProgressToolUses:Map<string,string>;
 evictedToolUses:Set<string>;nestedUuidAliases:Map<string,string[]>;
}
export type PublicCcrToolUseChange287={action:'clear'}|{action:'add'|'remove';ids:string[]}
/** Complete MRe sink is the actual mounted p9, not a callback/state mapper. */
export interface PublicCcrSink287 {
 setMessages:Dispatch<SetStateAction<Message[]>>;
 setIsLoading(loading:boolean):void;getIsLoading():boolean;
 onInit(input:{slash_commands?:string[];model?:string;skills?:string[];plugins?:string[]}):void;
 onPermissionModeChange(mode:PermissionMode,origin?:'worker'|'client'):void;
 noteOwnPermissionModePush(mode:PermissionMode):()=>void;
 noteOwnPermissionModeAnswer(mode:PermissionMode):void;
 readonly streaming:HotTurnStream287&{
  addResponseLength(length:number):void;resetMetrics():void;
 };
 setStreamMode(mode:SpinnerMode):void;
 setInProgressToolUseIDs(change:PublicCcrToolUseChange287):void;
 onTurnComplete():void;onOtherTurnComplete(time:number):void;
 onConversationReset(id:string):void;
 readonly retraction:PublicCcrRetraction287;
}
export interface PublicCcrSessionProps287 {
 config:CcrManagerConfig287|undefined;
 adoptRateLimits:boolean;
 sink:PublicCcrSink287;
 requestDialog:NonNullable<ToolUseContext['requestDialog']>;
 toolPermissionContext:ToolPermissionContext;
 tools:Tool[];
}
export interface PublicCcrSessionResult287 {
 isRemoteMode:boolean;
 sendMessage(content:RemoteMessageContent,options?:{uuid?:string;clearsConversation?:boolean},submittedAtMs?:number):Promise<boolean>;
 cancelRequest():void;cancelHeldMessages():boolean;disconnect():void;
 sendControlRequest(request:SDKControlRequest['request'],options?:CcrControlOptions287):Promise<unknown>;
}
export type PublicCcrHook287=(props:PublicCcrSessionProps287)=>PublicCcrSessionResult287;

/** Whole source MRe and its lexical AHe/ye live in the sole canonical graph.
 * No second factory instance, manager, pending map, context or timer is made by
 * this namespace view. In particular, no wsUrl/local Serve config is projected
 * into the unrelated public CCR config ABI. */
export function getOfficialPublicCcrHook287():PublicCcrHook287 {
 const namespace=getOriginalModsLifecycle287().clearSourceModule287('chunk-f2cpzzp9.js') as {MRe:PublicCcrHook287}
 return namespace.MRe;
}
