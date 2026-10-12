import type Anthropic from '@anthropic-ai/sdk'
import type {ClientOptions} from '@anthropic-ai/sdk'
export type SdkProxyOptionsInput287={forAnthropicAPI:boolean;hasBodyIdleWatchdog:boolean;url?:string}
export type SdkAuthInheritance287={__auth:{provider:null;tokenCache:null;resolution:null;error:null;extraHeaders:Record<string,string>}}
export type SdkClientCommon287=ClientOptions&SdkAuthInheritance287&{defaultHeaders:Record<string,string|undefined>}
export interface SdkClientFactory287 {
 transportURL(provider:string,model?:string,region?:string):string|undefined
 logger():NonNullable<ClientOptions['logger']>
 stripAuthorization<T>(headers:Record<string,T>):{value:T|undefined;rest:Record<string,T>}
 integerDefault(value:unknown,fallback:number):number
 validateGooglePath(name:string,value:string|undefined):void
 readonly googleConstructor:new(options:ClientOptions&{project?:string;location?:string;workspaceId?:string;skipAuth?:boolean;bearerTokenProvider?:()=>Promise<string>;googleAuth?:unknown;authClient?:unknown})=>Anthropic&{ready:Promise<void>;project:string|null;location:string|null;workspaceId:string;skipAuth:boolean}
 commonOptions(input:{headers:Record<string,string|undefined>;maxRetries:number;fetch?:ClientOptions['fetch'];provider:string;model?:string;region?:string},proxyOptions?:(input:SdkProxyOptionsInput287)=>ClientOptions['fetchOptions']):SdkClientCommon287
 constructGoogle(options:SdkClientCommon287):Anthropic&{ready:Promise<void>;project:string|null;location:string|null;workspaceId:string;skipAuth:boolean}
 constructFirstParty(input:{auth:{apiKey:string|null;authToken:string|null};options:SdkClientCommon287}):Anthropic
}
export interface SdkClientFactoryPorts287 {
 environment:{ANTHROPIC_FOUNDRY_RESOURCE?:string;ANTHROPIC_FOUNDRY_BASE_URL?:string;ANTHROPIC_GOOGLE_CLOUD_BASE_URL?:string;ANTHROPIC_BASE_URL?:string;CLAUDE_CODE_SKIP_ANTHROPIC_GOOGLE_CLOUD_AUTH:boolean}
 proxyOptions:(input:SdkProxyOptionsInput287)=>ClientOptions['fetchOptions']
 bodyWatchdogEnabled:(provider:string)=>boolean
 gatewayAuth:()=>{url:string}|null|undefined
 oauthConfig:()=>{BASE_API_URL:string}
 vertexRegion:(model?:string)=>string
 errorBase:new(message:string,telemetryMessage?:string)=>Error
 authInheritance:SdkAuthInheritance287
 sdkConstructor:typeof Anthropic
 gatewayAuthOverrides:()=>Record<string,string|undefined>
 debugEnabled:()=>boolean
 googleAuthModule:()=>unknown
 sdkError:typeof Anthropic.AnthropicError
}
export declare function createSdkClientFactory287(ports:SdkClientFactoryPorts287):SdkClientFactory287
