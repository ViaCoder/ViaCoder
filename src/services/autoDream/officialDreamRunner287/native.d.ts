import type {REPLHookContext} from '../../../utils/hooks/postSamplingHooks.js'
import type {ToolUseContext} from '../../../Tool.js'
import type {Message} from '../../../types/message.js'
import type {CanUseToolFn} from '../../../hooks/useCanUseTool.js'
import type {AgentTaskRegistry287} from '../../../tools/AgentTool/agentAdmissionNative287.js'
import type {DreamTaskRegistry287} from '../officialDreamTaskPrompt287/native.js'
import type {DreamStorageKey287,DreamStorageResult287} from '../officialDreamLock287/native.js'
export interface DreamDailyLogStorage287 {
 listRecursive(key:DreamStorageKey287,options?:{cursor:string}):Promise<DreamStorageResult287<{items:{key:DreamStorageKey287}[];cursor?:string}>>
}
export type DreamRunnerContext287=REPLHookContext & {toolUseContext:ToolUseContext & {session:{host:object};taskRegistry:AgentTaskRegistry287}}
export type DreamAppend287=NonNullable<ToolUseContext['appendSystemMessage']>
export interface DreamRunner287 {
 init(host:object):void;execute(context:DreamRunnerContext287,append?:DreamAppend287):Promise<void>;
 countDailyLogs(root:string,storage?:DreamDailyLogStorage287):Promise<number>;
 dailyLogKey(root:string):DreamStorageKey287|undefined;
 collectFailures(message:Message,failed:Set<string>):void;
 observe(id:string,registry:DreamTaskRegistry287,root:string):(message:Message)=>void;
 skipCacheWrite():boolean;
}
export interface DreamRunnerPorts287 {
 k<T>(name:string,fallback:T):T;pr():unknown;qd():boolean;a3():boolean;$ze():boolean;
 Wze:typeof import('../consolidationLock.js').readLastConsolidatedAt;
 dpo:typeof import('../consolidationLock.js').listSessionsTouchedSince;
 cpo:typeof import('../consolidationLock.js').tryAcquireConsolidationLock;
 Rrt:typeof import('../consolidationLock.js').rollbackConsolidationLock;
 l:typeof import('../../../utils/errors.js').errorMessage;t:typeof import('../../../utils/debug.js').logForDebugging;
 q:typeof import('../../../bootstrap/state.js').getSessionId;Xs:typeof import('../../../memdir/paths.js').getAutoMemPath;
 Nt:typeof import('../../../utils/messages.js').createSystemMessage;
 i(event:string,metadata:Record<string,unknown>):void;S(value:string):string;c(value:string):string;OL(error:Error):string;
 z1:typeof import('../../../memdir/teamMemPaths.js').isTeamMemoryEnabled;
 te:ReturnType<typeof import('../../../tasks/DreamTask/DreamTask.js').getDreamTaskHelpers287>['register'];
 oe:ReturnType<typeof import('../../../tasks/DreamTask/DreamTask.js').getDreamTaskHelpers287>['complete'];
 se:ReturnType<typeof import('../../../tasks/DreamTask/DreamTask.js').getDreamTaskHelpers287>['fail'];
 Y:ReturnType<typeof import('../../../tasks/DreamTask/DreamTask.js').getDreamTaskHelpers287>['isDreamTask'];
 re:ReturnType<typeof import('../../../tasks/DreamTask/DreamTask.js').getDreamTaskHelpers287>['addTurn'];
 qh:typeof import('../../../utils/sessionStorage.js').getProjectDir;Ee:typeof import('../../../bootstrap/state.js').getOriginalCwd;
 ee:typeof import('../consolidationPrompt.js').buildConsolidationPrompt;vhn():boolean;
 IC:typeof import('../../../utils/forkedAgent.js').runForkedAgent;
 Re:typeof import('../../../utils/messages.js').createUserMessage;aq:typeof import('../../../utils/forkedAgent.js').createCacheSafeParams;
 PHn(root:string,kept:unknown,options:{fork:'dream';onWriteAllowed(path:string,id:string):void}):CanUseToolFn;
 Ot:string;Sn:string;J_:string[];Grt:typeof import('../autoDreamToolPolicy.js').isDreamMemoryMarkdownPath;
 Aln:typeof import('../../../utils/messages.js').createMemorySavedMessage;
 OXt:typeof import('../../../utils/memoryUpdates287.js').publishBackgroundMemoryUpdate287;
 he:typeof import('node:fs/promises').readdir;ge:typeof import('node:path').join;
 G<T>(values:T[],predicate:(value:T)=>boolean):number;
 Ht:typeof import('../../../utils/errors.js').isENOENT;
 ae:typeof import('node:path').basename;W:typeof import('node:path').dirname;
 Bd:typeof import('../../../utils/sessionStorage.js').getProjectsDir;Xn:typeof import('../consolidationLock.js').isDreamStorageProjectKey287;
 a:{readonly CLAUDE_CODE_ENTRYPOINT?:string;readonly CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS?:boolean};
 He:typeof import('../../../utils/model/providers.js').getAPIProvider;ol(name:'hipaa'):boolean;
}
export declare function createDreamRunner287(ports:DreamRunnerPorts287):DreamRunner287;
