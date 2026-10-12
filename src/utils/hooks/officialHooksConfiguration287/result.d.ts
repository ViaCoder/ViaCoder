import type {SyncHookJSONOutput,PermissionRequestHookSpecificOutput} from '../../../entrypoints/agentSdkTypes.js'
import type {HookResultMessage} from '../../../types/message.js'
import type {ElicitResult} from '@modelcontextprotocol/sdk/types.js'
export interface HookResultInput287<Json=unknown> {
  json:Json;command:string;hookName:string;toolUseID:string;hookEvent:string;
  expectedHookEvent?:string;stdout?:string;stderr?:string;exitCode?:number;durationMs?:number;
}
export interface HookProcessedResult287<Behavior='allow'|'deny'|'ask'|'defer'> {
  message:HookResultMessage;
  permissionBehavior?:Behavior;
  blockingError?:{blockingError:string;command:string};
  preventContinuation?:boolean;stopReason?:string;systemMessage?:string;
  terminalSequence?:string;hookPermissionDecisionReason?:string;
  additionalContext?:string;sessionTitle?:string;suppressOriginalPrompt?:boolean;
  initialUserMessage?:string;watchPaths?:string[];reloadSkills?:unknown;
  updatedInput?:Record<string,unknown>;updatedToolOutput?:unknown;
  updatedMCPToolOutput?:unknown;legacyMcpRewriteSuppressed?:boolean;
  classifierContext?:unknown;retry?:boolean;
  permissionRequestResult?:PermissionRequestHookSpecificOutput['decision'];
  elicitationResponse?:ElicitResult;elicitationResultResponse?:ElicitResult;displayContent?:unknown;
}
export interface HookResultProcessorPorts287 {
 execution():{host:object;surfaceCapabilities:{attacherCaps():{terminal?:string|null;mux?:string|null}|null}};
 environment:{readonly terminal:string|null;readonly TMUX?:string;readonly STY?:string;readonly ZELLIJ?:string};
 attachment(attachment:Extract<HookResultMessage,{type:'attachment'}>['attachment']):Extract<HookResultMessage,{type:'attachment'}>;
 stringify(value:unknown,replacer?:null,space?:number):string;
 debug(message:string):void;
 analytics(name:string,metadata:Record<string,unknown>):void;
 analyticsIdentity(value:string):unknown;
}
export function createHookResultProcessor287(ports:HookResultProcessorPorts287):{
 // The currently accepted SDK input type has no PreToolUse 'defer' variant.
 // Raw/287 callers use the second overload; the recovered source still handles it.
 process(input:HookResultInput287<SyncHookJSONOutput>):HookProcessedResult287<'allow'|'deny'|'ask'>;
 process(input:HookResultInput287):HookProcessedResult287;
 terminalSequence(input:string):string|null;
}
