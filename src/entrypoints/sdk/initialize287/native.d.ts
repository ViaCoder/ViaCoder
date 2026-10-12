import type {Transport} from '@modelcontextprotocol/sdk/shared/transport.js'
import type {JSONRPCMessage} from '@modelcontextprotocol/sdk/types.js'
import type {InternalOptions} from '../runtimeTypes.js'
import type {SDKControlInitializeRequest,SDKControlInitializeResponse} from '../controlTypes.js'
export type SDKMcpManifest287={initializeResult:Record<string,unknown>;toolsListResult?:Record<string,unknown>}
export type SDKInitializationConfig287=Omit<SDKControlInitializeRequest,'subtype'|'hooks'|'sdkMcpServers'|'sdkMcpServerConfigs'|'sdkMcpServerManifests'|'jsonSchema'|'skills'>&{skills?:'all'|string[];captureSdkMcpManifests?:boolean}
export type SDKInitializationMethods287={
 initialize(owner:object,options?:{first:boolean}):Promise<SDKControlInitializeResponse>;
 build(owner:object,manifests?:Record<string,SDKMcpManifest287>):SDKControlInitializeRequest;
 capture(owner:object):Promise<Record<string,SDKMcpManifest287>|undefined>;
 connect(owner:object,name:string,config:{instance:{connect(transport:Transport):Promise<void>};timeout?:number}):void;
 send(owner:object,name:string,message:JSONRPCMessage):void;
 project(options:InternalOptions,context:{isSingleUserTurn:boolean},controller:AbortController):SDKInitializationConfig287;
}
export function isSingletonEmptySystemPrompt287(value:unknown):boolean
export function createSDKInitialization287(debug:(message:string,options?:{level?:string})=>void,track:(name:string,metadata:any)=>void):SDKInitializationMethods287
