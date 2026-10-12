import type {ClaudeWorkSecretOwner287} from './claudeOAuthControls287.native.js'
export interface WorkSecretEnableState287 {
 readonly failureDetail:string|undefined;readonly failureKind:string|undefined;
 setEpoch(value:number|undefined):void;
 onStateChange(state:string,detail?:string,kind?:string):void;
}
export interface WorkSecretCaller287 {
 readonly Ir:ClaudeWorkSecretOwner287|undefined;
 noteModeChoice(mode:string):void;
 applyModelPick(model:string|undefined):unknown;
 applyEffortSeed(effort:string):{ok:boolean;error?:string};
 prepare(secret:string|undefined):Promise<void>;
 attached(secret:string|undefined,handle:import('../../bridge/replBridge.js').ReplBridgeHandle):void;
 undo():void;turnMountJoin():Promise<void>|null;
 onProjectsBindingHint():void;
 onWorkSecretRefresh(sessionId:string):Promise<string|null>;
 enableState(snapshot:import('../../types/message.js').Message[]|undefined,secret:string|undefined):WorkSecretEnableState287;
}
export function createWorkSecretCallerNative287(ports:object):WorkSecretCaller287
export function createWorkSecretLeafNative287(file:string,name:string,ports:object):unknown

export function createWorkSecretRequestNative287(ports:object):(this:object,sessionId:string)=>Promise<string|null>

/** Stateless whole original hI.xp, sharing the existing output and identity ports. */
export type WorkSecretBridgeStateWriter287=(state:import('../../entrypoints/sdk/coreTypes.js').SDKBridgeStateMessage287['state'],detail?:string,epoch?:number,failureKind?:string)=>void;
export function createWorkSecretBridgeStateWriter287(ports:{
 ht:{enqueue(message:import('../../entrypoints/sdk/coreTypes.js').SDKBridgeStateMessage287):void};
 eo():import('node:crypto').UUID;q():string;
}):WorkSecretBridgeStateWriter287
