import type {Command,CommandArgumentCompletion287} from '../../types/command.js'
import type {SuggestionItem} from '../../components/PromptInput/PromptInputFooterSuggestions.js'
export type ArgumentProducer287=(args:string[],prefix:string,storage?:unknown)=>Promise<CommandArgumentCompletion287[]>|CommandArgumentCompletion287[]
export interface ArgumentSuggestion287 extends SuggestionItem {query?:string;metadata:{replacement:string;partial:boolean}}
export interface ArgumentAccept287 {suggestion:SuggestionItem|string;shouldExecute:boolean;commands:Command[];onInputChange(value:string):void;setCursorOffset(offset:number):void;onSubmit(value:string,slashCommand?:boolean):void}
export function createArgumentsComplete287(ports:{Is(name:string,commands:Command[]):Command|undefined;ILt(name:string,commands:Command[]):Command;COt(command:Command):string|undefined}):{suggest(input:string,producer:ArgumentProducer287,storage?:unknown):Promise<ArgumentSuggestion287[]>;metadata(value:unknown):{replacement:string;partial:boolean}|null;accept(input:ArgumentAccept287):{newInput:string;reSuggest:boolean;submitted:boolean}|null}
export function createLookupComplete287(ports:{Lo(command:Command):string}):{Is(name:string,commands:Command[]):Command|undefined;ILt(name:string,commands:Command[]):Command}
export function createAliasComplete287(ports:{Gjt(alias:string):boolean}):{COt(command:Command):string|undefined}
export function createPluginComplete287(ports:Record<string,unknown>):{complete:ArgumentProducer287;state:{of(host:object):{key:string|null;candidates:unknown[]}}}
export function createConfigComplete287(ports:Record<string,unknown>):{complete:ArgumentProducer287;state:{of(host:object):{lookup():{id:string;options?:string[];hint?:string}[]}}}
export function createMetadataComplete287(ports:Record<string,unknown>):Record<string,Command>
export function createHeadlessFocusComplete287(ports:Record<string,unknown>):{call:import('../../types/command.js').LocalCommandCall}
export function createFocusReadComplete287(ports:{Ce():boolean;ge(source:'flagSettings'):{viewMode?:string}|null;kSe():boolean}):{enabled():boolean}
export function createSubmissionComplete287(ports:Record<string,unknown>):{SYe(context:{submittedOnLocalStdin?:boolean;dispatchedOverBridge?:boolean;submissionVerifiedSlackHumanTurn?:boolean}):boolean;qJ(context:{dispatchedOverBridge?:boolean;submissionVerifiedSlackHumanTurn?:boolean}):boolean}
export function createRadioBrowserComplete287(ports:Record<string,unknown>):{open(url:string):Promise<boolean>;dispatch(url:string):Promise<{ok:boolean;reason?:string;detail?:string}>}
export function createRadioComplete287(ports:{ls(url:string):Promise<boolean>}):{call:import('../../types/command.js').LocalCommandCall}

export function createOnboardingComplete287(ports:Record<string,unknown>):{command:import('../../types/command.js').PromptCommand}
export function createRegistryFactoriesComplete287(ports:Record<string,unknown>):{createDesignLogin():Command}

export interface ConfigWriteResult287 {error?:Error;messageSuffix?:string}
export interface ConfigSetting287 {id:string;label:string;searchText?:string;labelBoldSuffix?:string;value:unknown;type:'boolean'|'enum'|'managedEnum';options?:string[];optionsHint?:string;pickToCommit?:boolean;consentGated?:boolean;canWithdraw?():boolean;provided?:{plugin:string;pluginId:string;description:string;kind:string};lock?:{reason:string;source:string;writableWhileLocked?:string[];reasonShipsOffBox?:boolean};coerce?(value:string):string|undefined;onChange(value:any):void|ConfigWriteResult287|Promise<void|ConfigWriteResult287>}
export interface ConfigRowHandle287 {
 row:{key:string;label:string;description?:string;kind:'boolean'|'choice'|'number'|'text';value:unknown;options?:string[];provider:unknown;isLocked:boolean}
 lockReason?:string
 write(value:unknown):Promise<string|undefined>
}
export interface ConfigWriterController287 {
 apply(assignments:{key:string;raw:string}[],context:import('../../types/command.js').LocalJSXCommandContext,options?:unknown):Promise<{ok:boolean;kind:'refusal'|'locked'|'save-failure';message:string}[]>
 parse(input:string):{key:string;raw:string}[]|null
 format(result:{kind:string;message:string},offBox:boolean):string
 list(context:import('../../types/command.js').LocalJSXCommandContext):string
 rows(context:import('../../types/command.js').LocalJSXCommandContext):ConfigRowHandle287[]
 joinPluginRows(rows:ConfigSetting287[],context:import('../../types/command.js').LocalJSXCommandContext):ConfigSetting287[]
 pluginRows(plugins:unknown[],options?:Record<string,unknown>):ConfigSetting287[]
 display(row:ConfigSetting287):string
 decorate(row:ConfigSetting287,origin?:unknown):ConfigSetting287
 change(row:ConfigSetting287|undefined,value:unknown,write:(value:any)=>unknown):unknown
 isLocked(row:ConfigSetting287,raw:string):boolean
 labels(rows:ConfigSetting287[]):Promise<Map<string,{label:string;hidden:boolean}>>
 descriptors(inputs:Record<string,unknown>):{settings:ConfigSetting287[];helpers:Record<string,(...args:any[])=>any>}
 inputs(context:import('../../types/command.js').LocalJSXCommandContext,options?:unknown):Record<string,unknown>
 readGlobal():import('../config.js').GlobalConfig
 sourceInputs():Record<string,unknown>
 notificationKeys:readonly {id:string;label:string;key:string}[]
 grantBlockerMessages:Record<string,string>
}
export function createConfigWriterComplete287(ports:Record<string,unknown>):ConfigWriterController287
export function createConfigCallComplete287(ports:Record<string,unknown>):{call:import('../../types/command.js').LocalCommandCall}
export function createBriefComplete287(ports:Record<string,unknown>):{command:Command}
export function createGoalRegistrationComplete287(ports:Record<string,unknown>):{command:Command;interactive:Command}
export function createGoalCallComplete287(ports:Record<string,unknown>):{call:import('../../types/command.js').LocalCommandCall}
export function createWebRegistrationComplete287(ports:Record<string,unknown>):{command:Command}
export function createConfigPresentationComplete287(ports:Record<string,unknown>):{key(rows:ConfigSetting287[]):string}

export interface OriginalConfigUiProps287 {
 onClose:import('../../types/command.js').LocalJSXCommandOnDone
 mcpClients:import('../../Tool.js').ToolUseContext['options']['mcpClients']
 messages:import('../../types/message.js').Message[]
 setTabsHidden(hidden:boolean):void
 onIsSearchModeChange(active:boolean):void
 unclaimedPaneClick:{subscribe(listener:()=>void):()=>void}
 contentHeight?:number
}
export function createConfigUiComplete287(ports:Record<string,unknown>):{Config:import('react').ComponentType<OriginalConfigUiProps287>}
export function createGoalUiComplete287(ports:Record<string,unknown>):{call:import('../../types/command.js').LocalJSXCommandCall;GoalDialog:import('react').ComponentType<{messages:import('../../types/message.js').Message[];onDone():void}>}
