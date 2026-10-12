// Generated factory API for complete official 2.1.286 declarations.
export declare function createCustomHeaderOverrides286(bindings: {a:{ANTHROPIC_CUSTOM_HEADERS?:string};Ca:(regime:string)=>boolean}): {beta:()=>Record<string,string|undefined>;gatewayAuth:()=>Record<string,string|undefined>};
export declare function createSdkAuthInheritance286(): {__auth:{provider:null;tokenCache:null;resolution:null;error:null;extraHeaders:Record<string,string>}};
export declare function createSdkAuthentication286(): (input: {isSubscriber: boolean; apiKey: string | null; oauthAccessToken?: string | null}) => {apiKey: string | null; authToken: string | null};
export declare function createSdkSubscriber286(bindings: {PC:string}): (input: {anthropicAuthEnabled:boolean;oauthScopes?:string[]}) => boolean;
export declare function createRequestClassification286(bindings?: Record<string, unknown>): { requestClass: (source: string | undefined, agent?: { agentType?: string; workflowRunId?: string }) => string | undefined; agentType: (source: string | undefined, agent?: { agentType?: string }) => string | undefined; isMain: (agent: {agentType?:string}) => boolean };
export declare function createOutgoingHeaderValidation286(bindings: Record<string, unknown>): (input: { apiKey: string | null; getApiKeySource: () => string; authToken: string | null; getAuthTokenSource: () => string; defaultHeaders: Record<string, string | undefined>; authorizationSource: string | null; customHeaderNames: string[]; envSuppliedHeaderNames: Set<string> }) => void;
export declare function createHeaderValidationText286(bindings?: Record<string, unknown>): { $ht: (value: string) => unknown; V7n: (reason: unknown, stats: unknown) => string; z7n: (value: string) => { length: number; lineCount: number } };
export declare function createHeaderValidationErrorBase286(bindings?: Record<string, unknown>): new (...args: any[]) => Error;
export declare function createRequestHintGate286(bindings: { a: { CLAUDE_CODE_GATEWAY_HINT_HEADERS?: boolean }; Ia: () => boolean; He: () => string; R: (flag: string, fallback: boolean) => unknown }): () => boolean | undefined;
export declare function createMessageHeaders286(bindings: { cM: () => boolean; iEn: () => string | undefined; t: (...args: unknown[]) => void }): () => Record<string, string>;
export declare function createCompliancePolicy286(bindings: { Ca: (regime: string) => boolean }): () => boolean;
export declare function createAgentHeaderEncoding286(bindings?: Record<string, unknown>): (value: string) => string;
export declare function createPromptIdValidator286(bindings?: Record<string, unknown>): (value: string) => string | null;
export declare function createDesktopVersion286(bindings: { a: { CLAUDE_CODE_ENTRYPOINT?: string; CLAUDE_CODE_DESKTOP_APP_VERSION?: string } }): () => string | undefined;
