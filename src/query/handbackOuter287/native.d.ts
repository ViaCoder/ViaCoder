import type {Message,AssistantMessage,StreamEvent,RequestStartEvent,TombstoneMessage,ToolUseSummaryMessage,ActiveGoalEvent} from '../../types/message.js'
import type {ToolUseContext} from '../../Tool.js'
import type {QuerySource} from '../../constants/querySource.js'
import type {SystemPrompt} from '../../utils/systemPromptType.js'
import type {GoalPass} from '../transitions.js'
import type {ToolUseBlock} from '@anthropic-ai/sdk/resources/index.mjs'
export type OriginalStopResult287={blockingErrors:Message[];preventContinuation:boolean;goalPass?:GoalPass}
export type OriginalEndTurnInput287={endTurnSource:'tool'|'mcp_meta';messagesForQuery:Message[];assistantMessages:AssistantMessage[];toolResults:Message[];toolUseBlocks:ToolUseBlock[];systemPrompt:SystemPrompt;userContext:Record<string,string>;systemContext:Record<string,string>;toolUseContext:ToolUseContext;updatedToolUseContext:ToolUseContext;querySource:QuerySource;stopHookActive?:boolean;stickyBetas?:unknown;queryChainIdForAnalytics?:unknown;queryDepth?:number;deps:{uuid():string;now():number}}
export interface HandbackOuterNative287 {
 la(messages:Message[],assistant:AssistantMessage[],prompt:SystemPrompt,userContext:Record<string,string>,systemContext:Record<string,string>,context:ToolUseContext,querySource:QuerySource,stopHookActive:boolean|undefined,stickyBetas:unknown,hasPendingEnd:()=>boolean,classifierJob?:unknown):AsyncGenerator<Message|StreamEvent|RequestStartEvent|TombstoneMessage|ToolUseSummaryMessage|ActiveGoalEvent,OriginalStopResult287>
 fc(input:OriginalEndTurnInput287):AsyncGenerator<Message|StreamEvent|RequestStartEvent|TombstoneMessage|ToolUseSummaryMessage|ActiveGoalEvent>
 go(context:ToolUseContext):unknown;no(context:ToolUseContext,querySource:QuerySource):void;aa:Function;es:Function;
 It(context:ToolUseContext,messages:Message[],options:{stopHookActive?:boolean}):AsyncGenerator<Message,void>
}
export function createHandbackOuterNative287(ports:Record<string,unknown>):HandbackOuterNative287
