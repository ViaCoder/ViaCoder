// Complete 287 request header closures; host adapters supply the original imported identities.
export declare function createMessageBareSourceGate287():()=>boolean;
export declare function createMessageApiKeySource287(bindings:{mb:(options?:{skipRetrievingKeyFromApiKeyHelper?:boolean})=>{key:string|null;source:string}}):(options?:{skipRetrievingKeyFromApiKeyHelper?:boolean})=>{key:string|null;source:string};
export declare function createMessageBearer287(bindings:{Cb:()=>boolean;Gp:(options?:{skipRetrievingKeyFromApiKeyHelper?:boolean})=>{key:string|null;source:string};xr:()=>boolean;a:{ANTHROPIC_AUTH_TOKEN?:string};a2e:(nonInteractive:boolean)=>Promise<string|null>}):(headers:Record<string,string|undefined>,nonInteractive:boolean)=>Promise<string|null>;
export declare function createOAuthHeldAccountReader287(bindings:{fn:()=>{refreshToken?:string}|null;gi:Map<string,string>}):()=>{url:string}|null;
export declare function createOAuthHeldAccountError287():new(url:string)=>Error&{url:string};
export declare function createOAuthLockTimeoutError287():new()=>Error;
export declare function createOAuthConstructorGuard287(bindings:{l2e:()=>{url:string}|null;ose:new(url:string)=>Error;H5e:new()=>Error;k:(feature:string,fallback:boolean)=>unknown}):(subscriber:boolean,outcome:string,tokens:{expiresAt:number}|null)=>void;
export declare function createSdkAuthInheritance287():{__auth:{provider:null;tokenCache:null;resolution:null;error:null;extraHeaders:Record<string,string>}};
export declare function createSdkAuthentication287():(input:{isSubscriber:boolean;apiKey:string|null;oauthAccessToken?:string|null})=>{apiKey:string|null;authToken:string|null};
export declare function createSdkSubscriber287(bindings:{fA:string}):(input:{anthropicAuthEnabled:boolean;oauthScopes?:string[]})=>boolean;
export declare function createRequestClassification287(): {requestClass:(source:string|undefined,agent:{agentType?:string;workflowRunId?:string})=>string|undefined;agentType:(source:string|undefined,agent:{agentType?:string})=>string|undefined;isMain:(agent:{agentType?:string})=>boolean};
export declare function createHeaderValidationErrorBase287():new(message:string,telemetryMessage?:string,errorClass?:string)=>Error;
export declare function createHeaderValidationText287():{LSt:(value:string)=>unknown;onr:(reason:unknown,stats:unknown)=>string;rnr:(value:string)=>{length:number;lineCount:number}};
export declare function createOutgoingHeaderValidation287(bindings:{P:new(message:string,telemetryMessage?:string,errorClass?:string)=>Error;LSt:(value:string)=>unknown;onr:(reason:unknown,stats:unknown)=>string;rnr:(value:string)=>{length:number;lineCount:number}}):(input:{apiKey:string|null;getApiKeySource:()=>string;authToken:string|null;getAuthTokenSource:()=>string;defaultHeaders:Record<string,string|undefined>;authorizationSource:string|null;customHeaderNames:string[];envSuppliedHeaderNames:Set<string>})=>void;
export declare function createRequestHintGate287(bindings:{a:{CLAUDE_CODE_GATEWAY_HINT_HEADERS?:boolean};ja:()=>boolean;He:()=>string;k:(flag:string,fallback:boolean)=>unknown}):()=>boolean|undefined;
export declare function createAgentHeaderEncoding287():(value:string)=>string;
export declare function createPromptIdValidator287():(value:unknown)=>string|null;
