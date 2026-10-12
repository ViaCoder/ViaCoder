import type {Message} from '../../../types/message.js'
import type {ToolUseContext} from '../../../Tool.js'
export type EnvironmentSnapshot={workingDirectory?:string;isWorktree:boolean;isGitRepo:boolean;additionalWorkingDirectories:string[];platform:string;shell?:string;osVersion?:string;scratchpadDirectory?:string}
export type EnvironmentChange={field:'workingDirectory';from?:string}|{field:'isWorktree'|'isGitRepo'|'scratchpadDirectory'}|{field:'additionalWorkingDirectories';added:string[];removed:string[]}
export type ModelIdentity={modelId:string;marketingName:string|null;knowledgeCutoff:string|null}
export type RuntimeAttachment={type:'environment';snapshot:EnvironmentSnapshot;changes?:EnvironmentChange[]}|{type:'model';identity:ModelIdentity;text?:string|null}|{type:'total_tokens_reminder';text:string}
export type SessionRoot={root:object}
export type BudgetTracker={rollOverContext(branch:string,used:number):void;reanchorTaskBudget(branch:string,used:number):void;cumulativeUsed(branch:string,used:number):number;remaining(branch:string,used:number,budget:number):number}
export type RuntimeSettings={totalTokensReminder?:'off'|'infinite'|'fixed'|'countdown'|'padded-countdown';totalTokensReminderBudget?:number;totalTokensReminderAfterUserTurn?:boolean}
export type RuntimeCache={gitBashPath?:string|null;shellDescription?:string;agentProxyNote?:string|null;totalTokensReminderMode?:string;totalTokensReminderBudget?:number;totalTokensReminderAfterUserTurn?:boolean}
export type ToolsMachineSnapshot={platform:string;directory?:{path:string;isGitRepo:boolean};said?:boolean;unvouched?:string}
export type RuntimeHost={
 toolsMachine():ToolsMachineSnapshot|undefined;B6e():string|null|undefined;Be(model:string):string;Em():string[]|undefined;Fo:typeof import('zod').z.discriminatedUnion;
 Gg(model:string,betas:string[]|undefined):number;Jf:typeof import('../../../utils/model/model.js').getRuntimeMainLoopModel;
 M2(cwd:string):boolean;NR():Promise<boolean>;O:typeof import('zod').z.boolean;Ppn():string;R:typeof import('zod').z.literal;Rc():unknown|null;
 S7e():Map<string,string|null>;Ta():boolean;U6e():string;Va(model:string):{knowledge_cutoff?:string}|undefined;Vb():boolean;
 Xe():RuntimeSettings;Y5r(key:string,value:string|null):void;Yb():unknown;_(text:string):string;
 a:{platform:string;SHELL?:string;CLAUDE_CODE_DISABLE_ATTACHMENTS?:boolean;CLAUDE_CODE_SIMPLE?:boolean;CLAUDE_CODE_SESSION_KIND?:string;CLAUDE_CODE_TOTAL_TOKENS_REMINDER?:string;CLAUDE_CODE_TOTAL_TOKENS_REMINDER_BUDGET?:number;CLAUDE_CODE_TOTAL_TOKENS_REMINDER_AFTER_USER_TURN?:boolean};
 c(text:string):string;d:typeof import('zod').z.object;dmn(name:string,text:string|null):Promise<string|null>;
 i(name:string,fields:Record<string,unknown>):void;ji(values:{content:string;isMeta:true}[]):{content:string;isMeta:true}[];
 jw():string|null|undefined;k:typeof import('zod').z.array;ke(value:{content:string;isMeta:true}):{content:string;isMeta:true};ko():RuntimeCache;
 md():Record<string,unknown>|null;mp(model:string):string|undefined;nm():string|null;o:typeof import('zod').z.string;p<T>(load:()=>T):()=>T;
 pe(context:ToolUseContext):{mode:import('../../../types/permissions.js').PermissionMode;additionalWorkingDirectories:ReadonlyMap<string,unknown>};qf(context:ToolUseContext):string;
 t(text:string,options:{level:'warn'}):void;tQ():number;x<T>(name:string,fallback:T):T;xpn():string;
}
export type ContextRuntimeKernel={
 environment(ctx:ToolUseContext,messages?:Message[]):Promise<RuntimeAttachment[]>;model(ctx:ToolUseContext,messages?:Message[]):Promise<RuntimeAttachment[]>;
 environmentSchema():import('zod').ZodType<EnvironmentSnapshot>;changesSchema():import('zod').ZodType<EnvironmentChange>;modelSchema():import('zod').ZodType<ModelIdentity>;
 readEnvironment(messages:Message[]):unknown;readModel(messages:Message[]):RuntimeAttachment|undefined;
 restoreEnvironment(before:Message[],after:Message[],retainDirectory:boolean):RuntimeAttachment[];restoreModel(before:Message[],after:Message[]):RuntimeAttachment[];
 formatEnvironment(value:EnvironmentSnapshot):string;formatEnvironmentChanges(value:EnvironmentSnapshot,changes:EnvironmentChange[]):string;
 modelIdentity(model:string):ModelIdentity;formatModel(value:ModelIdentity):string;totalTokens(session:SessionRoot,messages:Message[],model:string,agent?:string,reanchor?:boolean):RuntimeAttachment[];
 totalTokensMode():string;totalTokensAfterUserTurn():boolean;agentSystemTokenReminder(model:string):string|null;usage(messages:Message[]):number;
 budgets:{of(root:SessionRoot):BudgetTracker;drop(root:SessionRoot):void};normalizers:Record<RuntimeAttachment['type'],(attachment:unknown)=>{content:string;isMeta:true}[]>;
}
export function createContextRuntime287(host:RuntimeHost):ContextRuntimeKernel
