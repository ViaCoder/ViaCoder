import type {ToolUseContext} from '../../Tool.js'
import type {Message,UserMessage} from '../../types/message.js'
import type {OutputStyleConfig} from '../../constants/outputStyles.js'
export type SessionSettingsAttachment287={type:'output_style_instructions';style:{name:string;prompt:string}|null}|{type:'language';language:string|null}
export type StyleReminderAttachment287={type:'output_style';style:string;turnReminder?:string}
export type SessionSettingsContext287={options:ToolUseContext['options'];agentContext:{agentType:'main'|'teammate'|'subagent';isMainSession?:boolean};agentId?:ToolUseContext['agentId'];taskRegistry:{all():Record<string,unknown>}}
export interface SessionSettingsPorts287 {
 environment:{CLAUDE_CODE_SIMPLE?:boolean};execution:typeof import('../../services/context/execution287.js').getExecutionSession287;
 lazySchema:typeof import('../lazySchema.js').lazySchema;object:typeof import('zod/v4').z.object;string:typeof import('zod/v4').z.string;
 settings:()=>{language?:string;outputStyle?:string};outputStyle:()=>Promise<OutputStyleConfig|null>;figures:typeof import('figures').default;
 createUserMessage:typeof import('../messages.js').createUserMessage;wrapMessages:typeof import('../messages.js').wrapMessagesInSystemReminder;
 debug:typeof import('../debug.js').logForDebugging;
}
export interface SessionSettings287 {
 builtinStyles:Record<string,OutputStyleConfig|null>;
 sessionSettings(ctx:SessionSettingsContext287,messages?:Message[]):Promise<SessionSettingsAttachment287[]>;
 eligible(ctx:SessionSettingsContext287):boolean;contextEligible(options:ToolUseContext['options']):boolean;
 styleReminder(ctx:SessionSettingsContext287):Promise<StyleReminderAttachment287[]>;
 restore(before:Message[],after:Message[]):SessionSettingsAttachment287[];
 readStyle(messages:Message[]):{value:{name:string;prompt:string}|null}|undefined;readLanguage(messages:Message[]):{value:string|null}|undefined;
 formatStyle(style:{name:string;prompt:string}|null):string;formatLanguage(language:string|null):string;
 styleSchema():import('zod/v4').z.ZodType<{name:string;prompt:string}|null>;languageSchema():import('zod/v4').z.ZodType<string|null>;
 trimHistory(messages:Message[]):Message[];
 normalizers:{output_style:(a:StyleReminderAttachment287)=>UserMessage[];output_style_instructions:(a:Extract<SessionSettingsAttachment287,{type:'output_style_instructions'}>)=>UserMessage[];language:(a:Extract<SessionSettingsAttachment287,{type:'language'}>)=>UserMessage[]};
}
export function createSessionSettings287(ports:SessionSettingsPorts287):SessionSettings287
