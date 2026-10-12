import type {Option} from '@commander-js/extra-typings'
import type {z} from 'zod/v4'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'

export interface ClaimSessionRequest287 {
 subtype:'claim_session';cwd:string;env?:Record<string,string>;additional_directories?:string[];
 permission_mode?:string;system_prompt?:string[];append_system_prompt?:string;
 agents?:Record<string,unknown>;title?:string;sdk_mcp_servers?:string[];include_initialize?:boolean;
 workspace_trust?:{accepted:boolean;directory:string}
}
export interface ClaimStartupOptions287 {awaitClaim?:boolean;continue?:boolean;resume?:unknown;forkSession?:boolean}
export interface PrintClaimStartup287 {
 option():Option<'--await-claim'>;gate(options:ClaimStartupOptions287,input:unknown,output:unknown):void;
 state():string;isParked():boolean;fail():void
}
export declare function createPrintClaimStartup287(ports:{Option:typeof Option;executionContext():ExecutionSession287;scrub():boolean;reject(message:string):never}):PrintClaimStartup287
export declare function createPrintClaimAdmission287(ports:Record<string,never>):{allows(subtype:unknown):boolean;parkedError:string;failedError:string}
export declare function createPrintClaimSchema287(ports:{H:typeof z.boolean;T:typeof z.array;de:typeof z.record;f:<T>(loader:()=>T)=>()=>T;o:typeof z.string;se:typeof z.unknown;u:typeof z.object;x:typeof z.literal}):{schema():z.ZodType<ClaimSessionRequest287>}
export interface ClaimRelocationResult287 {
 modelMessage:string;transcriptRelocated:boolean;projectGrantsGated:boolean;gatedNotice:string;
 departedAdditionalDirectories:string[];freshSession:boolean
}
/** Every generated free port is mandatory. No runtime defaults. */
export declare function createPrintRelocation287(ports:Record<'A'|'AX'|'CIe'|'Dbt'|'ET'|'Ee'|'Elt'|'F3t'|'G'|'I4e'|'ITo'|'Ki'|'Kl'|'L'|'LBt'|'MG'|'MTo'|'Msn'|'PTo'|'Pm'|'QVt'|'Rf'|'TFt'|'UVt'|'VH'|'WMt'|'X_'|'Xe'|'Yh'|'a'|'aTe'|'ap'|'c'|'cl'|'eHt'|'ge'|'i'|'je'|'jfe'|'jle'|'kC'|'mun'|'oe'|'sc'|'t'|'tY'|'vT'|'vlt'|'vw'|'z2n'|'zUt'|'zV'|'zf',unknown>):{
 relocate(session:ExecutionSession287,cwd:string,source:string,options?:{storageV5?:unknown;credentials?:unknown;freshSession?:boolean;confirmFresh?:()=>boolean;requestBuilt?:()=>boolean}):Promise<ClaimRelocationResult287>;
 isInvisible(cwd:string):boolean
}
export interface ClaimHost287 {
 session:ExecutionSession287;storageV5?:unknown;credentials?:unknown;permissionModeSuppliedOnInvocation:boolean;
 isBusy():boolean;isFreshSession():boolean;startDeferredMcpServers():Promise<void>;
 rehomePluginsAndMcp():Promise<void>;getToolPermissionContext():unknown;setToolPermissionContext(context:unknown):void;
 retireDepartedAdditionalDirectories(directories:string[]):void;
 applyPromptOptions(options:{systemPrompt?:string[];appendSystemPrompt?:string;title?:string;agents?:Record<string,unknown>}):void;
 currentPermissionMode():string;checkPermissionMode(mode:string):string|undefined;applyPermissionMode(mode:string):string|undefined;
 recheckAutoModeGate():void;applyWorkspaceTrust(trust?:{accepted:boolean;directory:string}):Promise<boolean|undefined>;
 sdkMcpSettled():boolean;setSdkMcpServers(names:string[]):void;startSessionStartHooks():void;
 announceStartingChange():void;buildInitializePayload(trust?:boolean):Promise<unknown>
}
export declare function createPrintClaim287(ports:Record<'CB'|'CW'|'Gf'|'HD'|'Ht'|'Kt'|'NWt'|'Pd'|'REn'|'Tbe'|'U_n'|'Xe'|'Yr'|'ZHn'|'bI'|'bO'|'ed'|'i'|'iD'|'m6t'|'not'|'nw'|'q'|'q3t'|'t'|'tr'|'vW'|'wD'|'wK'|'xu'|'executionContext',unknown>):{
 handleClaimSessionRequest(request:unknown,host:ClaimHost287):Promise<{kind:'error';message:string}|{kind:'ok';response:Record<string,unknown>}>;
 park():void;state():string;fail():void
}
export declare function createPrintDetached287(ports:Record<string,unknown>):Record<string,unknown>

export declare function createPrintClaimUserError287(ports:{lp:typeof import('../../services/api/logging.js').EMPTY_USAGE;o:()=>string}):(sessionId:import('../../types/ids.js').SessionId,errors:string[],userMessageId?:string)=>import('../../entrypoints/sdk/controlTypes.js').StdoutMessage
export declare function createPrintClaimScreen287(ports:{O():string;SR(path:string):boolean;Xe(path:string,base?:string):string;ca(path:string):boolean;hY(path:string):{paths:string[];vetted:boolean};jx(path:string):string;qe:typeof import('node:path').posix;tt:typeof import('node:path')}):{screen(raw:string,expanded:string,trusted?:ReadonlyMap<string,readonly string[]>):{ok:boolean;reason?:string;pathsToCheck?:string[]};unsafe(path:string,trusted?:ReadonlyMap<string,readonly string[]>):string|undefined}
export interface ClaimContextEntry287 {gitStatusPrefetch?:Promise<string|null>;userContext?:Promise<Record<string,string>>;userContextMemoryFiles?:Promise<import('../../utils/claudemd.js').MemoryFileInfo[]>;userContextInstructionFiles?:Promise<import('../../services/context/official/attachments.js').InstructionFile[]|undefined>;refreshReason:string;systemContextByPhrase:Map<string,Promise<Record<string,string>>>}
export interface ClaimContextRegistryState287 {byId:Map<ExecutionSession287['id'],ClaimContextEntry287>;userContextBuildsStarted:number;classifierClaudeMdBuildOrdinal:number;hasLoggedPluginInstructionFiles:boolean}
export type ClaimContextRegistry287=import('../../services/context/officialExecutionOwners287/native.js').ExecutionSessionRegistry287<ClaimContextRegistryState287>
export declare function createPrintClaimContextRegistry287(Tt:import('../../services/context/officialExecutionOwners287/native.js').ExecutionSessionRegistryConstructor287):ClaimContextRegistry287
export declare function createPrintClaimContext287(ports:{registry?:ClaimContextRegistry287;AJ:readonly never[];B0n():void;Exr():boolean;F3t(value:string|null):void;H0n(session:ExecutionSession287,storage?:unknown,credentials?:unknown):Promise<{blocks:Record<string,string>;claudeMd:string|null;memoryFiles:import('../../utils/claudemd.js').MemoryFileInfo[];instructionFiles:import('../../services/context/official/attachments.js').InstructionFile[]|undefined;pluginInstructionFiles?:{fileCount:number;totalContentLength:number}}>;L6o():void;Mat():void;Tt:import('../../services/context/officialExecutionOwners287/native.js').ExecutionSessionRegistryConstructor287;V2n():Promise<string|null>;d(error:unknown):void;i:typeof import('../../services/analytics/index.js').logEvent}):{registry:ClaimContextRegistry287;entry(session:ExecutionSession287):ClaimContextEntry287;reset(session:ExecutionSession287):void;invalidate(session:ExecutionSession287,reason:string):void;resetPluginMetrics(session:ExecutionSession287):void;prefetch(session:ExecutionSession287,storage?:unknown,credentials?:unknown):Promise<Record<string,string>>;prefetchGit(session:ExecutionSession287):void}
export declare function createPrintClaimModelSteer287(ports:{U():ExecutionSession287;Tt:import('../../services/context/officialExecutionOwners287/native.js').ExecutionSessionRegistryConstructor287}):{reset():void;owner():{modelSteerFloor:string|null;promptModel?:string;latched?:string;resetLatch():void}}

export interface ClaimDateOwner287 {get():string;clear():void;readonly captured:boolean}
export declare function createPrintClaimDate287(ports:{Tt:import('../../services/context/officialExecutionOwners287/native.js').ExecutionSessionRegistryConstructor287;WWr():string}):{owner:import('../../services/context/officialExecutionOwners287/native.js').ExecutionSessionRegistry287<ClaimDateOwner287>;date(session:ExecutionSession287):string}



export interface WorkspaceTrustContext287 {cwd:string;trustedNetworkDirectories?:ReadonlyMap<string,readonly string[]>;storageV5?:unknown}
export declare function createPrintClaimWorkspaceTrust287(ports:Record<'B'|'CB'|'CIe'|'Ee'|'GE'|'HD'|'KE'|'Ki'|'MG'|'Nc'|'O'|'VE'|'Xe'|'c'|'i'|'l'|'le'|'me'|'n'|'nw'|'t'|'u'|'ue'|'x',unknown>):{apply(trust:unknown,context:WorkspaceTrustContext287):Promise<boolean|undefined>;record(directory:string,storage?:unknown):Promise<boolean>;reapply():void;key(directory:string):string;isTrusted(directory:string):boolean;unsafe(path:string):boolean}

export type PrintSetCwdRequest287=Extract<import('../../entrypoints/sdk/controlTypes.js').SDKControlRequestInner,{subtype:'set_cwd'}>;
export interface PrintSetCwdHost287 {
 session:ExecutionSession287;storageV5?:import('../../Tool.js').ToolUseContext['storageV5'];credentials?:import('../../Tool.js').ToolUseContext['credentials'];
 isBusy():boolean;isFreshSession():boolean;requestBuilt?():boolean;
 toolPermissionContext:import('../../Tool.js').ToolPermissionContext;
 retireDepartedAdditionalDirectories?(directories:string[]):void;enqueueMoveNotice(message:string):void;
}
export type PrintSetCwdResult287=
 |{kind:'invalid';message:string}
 |{kind:'response';freshSession?:boolean;response:{status:'ok';cwd:string;changed:boolean;transcript_relocated:boolean}|{status:'rejected';reason:string;message:string}|{status:'needs_trust';directory:string;trust_root?:string}};
export function createPrintSetCwd287(ports:Record<'A'|'CB'|'E'|'ETe'|'Ee'|'HD'|'Ht'|'L'|'Mn'|'No'|'O'|'On'|'Q0'|'Su'|'Xe'|'ZN'|'_ae'|'d'|'dBt'|'kxe'|'not'|'nw'|'oe'|'sXe'|'t'|'x',unknown>):{
 handleSetCwdControlRequest(request:PrintSetCwdRequest287,host:PrintSetCwdHost287):Promise<PrintSetCwdResult287>;
 safeWireMessage(message:string,fallback:string):string;
};
