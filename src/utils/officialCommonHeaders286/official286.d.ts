// Factories for original Claude Code 2.1.286 native header declarations.
export type Native286Environment = { CLAUDE_CODE_SESSION_KIND?: string; CLAUDE_AGENT_SDK_CLIENT_APP?: string; CLAUDE_CODE_ENTRYPOINT?: string };
export declare function createNativeSessionRole286(bindings: { a: Native286Environment }): () => boolean;
export declare function createNativeUserAgent286(bindings: { a: Native286Environment; Ug: { getStore(): { workload?: string } | undefined } }): () => string;
export declare function getNativeSessionHeaderName286(): string;
export declare function createNativeSessionIdAccessor286(bindings: { b: () => { sessionId?: string; session?: { id: string } } | undefined; S: { id: string } }): () => string;
export declare function createCommonHeaders286(bindings: { Rt: () => boolean; QI: () => string; Nmt: string; V: () => string }): () => { 'x-app': string; 'User-Agent': string; [key: string]: string };
