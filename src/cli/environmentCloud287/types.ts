import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import type {ToolUseContext,Tools} from '../../Tool.js'
import type {Root} from '../../ink.js'
import type {Command} from '../../commands.js'
import type {ThinkingConfig} from '../../utils/thinking.js'
import type {AgentDefinition,AgentDefinitionsResult} from '../../tools/AgentTool/loadAgentsDir.js'
import type {TerminalInput287} from '../../utils/terminalInput287.js'

/** Every field of the original prepared destructure is explicit and required;
 * optional values retain undefined/null. Qualified metadata is opaque, never dropped. */
export interface PreparedPoolHeadless287 {
 autoCompactWindow: unknown;
 claudeaiConfigPromise: unknown;
 jsonSchema: unknown;
 allowedTools: unknown;
 thinkingConfig: ThinkingConfig;
 thinkingConfigExplicit: boolean | undefined;
 systemPrompt: string | undefined;
 appendSystemPrompt: string | undefined;
 appendSystemPromptHead: string | undefined;
 sdkUrl: unknown;
 sessionMirror: unknown;
 advisorModel: string | undefined;
 agentCli: string | undefined;
 agentDefinitions: AgentDefinitionsResult;
 cliAgents: AgentDefinition[];
 cloudAttachId: string | null;
 commands: Command[];
 correlationId: string | null;
 deferredCommandsPromise: unknown;
 disableSlashCommands: boolean | undefined;
 effectiveForwardSubagentText: boolean | undefined;
 effectiveIncludePartialMessages: boolean | undefined;
 effectiveModel: string | undefined;
 effectiveReplayUserMessages: boolean | undefined;
 headlessCloud: boolean | undefined;
 initialMainLoopModel: string | undefined;
 inputPrompt: string | AsyncIterable<string> | undefined;
 mcpClients: ToolUseContext['options']['mcpClients'];
 mcpCommands: Command[];
 mcpConfigFlagServers: unknown;
 mcpTools: Tools;
 noMonorepo: boolean | undefined;
 outputFormat: 'text' | 'json' | 'stream-json' | undefined;
 permissionModeCli: unknown;
 poolId: string | null;
 poolOnBranch: string | null;
 poolRef: string | null;
 rawModelRequest: string | undefined;
 regularMcpConfigs: unknown;
 resolvedInitialModel: string | undefined;
 resolvedMaxTurns: number | undefined;
 restrictedModel: string | undefined;
 sdkBetas: unknown;
 sdkMcpConfigs: unknown;
 session: ExecutionSession287;
 sessionNameArg: string | undefined;
 sessionTeamContext: unknown;
 setupTrigger: unknown;
 strictMcpConfig: boolean | undefined;
 teleport: string | true | null;
 toolPermissionContext: ToolUseContext['getAppState'] extends (...args:never[])=>infer S ? S extends {toolPermissionContext:infer P} ? P : never : never;
 tools: Tools;
 userSpecifiedFallbackModel: string | undefined;
 verbose: boolean | undefined;
 storageV5: ToolUseContext['storageV5'];
 credentials: ToolUseContext['credentials'];
}
export interface PreparedEnvironmentInteractive287 {
 agentCli: string | undefined;
 effectiveModel: string | undefined;
 mainThreadAgentDefinition: AgentDefinition | undefined;
 remote: string | null;
 advisorModel: string | undefined;
 agentDefinitions: AgentDefinitionsResult;
 agentSetting: string | undefined;
 appendSystemPrompt: string | undefined;
 autoCompactWindow: unknown;
 cliAgents: AgentDefinition[];
 cloudDefaultNotAllowed: boolean | undefined;
 commands: Command[];
 correlationId: string | null;
 currentCwd: string | undefined;
 dangerouslySkipPermissions: boolean | undefined;
 debug: boolean | undefined;
 defaultedToCloud: boolean | undefined;
 disableSlashCommands: boolean | undefined;
 dynamicMcpConfig: unknown;
 fileDownloadPromise: Promise<unknown> | undefined;
 forwardHomeSettings: boolean | undefined;
 homeSettingsConsent: 'forward' | null;
 getFpsMetrics: (() => unknown) | undefined;
 ide: boolean | undefined;
 initialFocusView: unknown;
 initialMainLoopModel: string | undefined;
 inputPrompt: string | AsyncIterable<string> | undefined;
 mcpApprovalSkipWarning: unknown;
 mcpClients: ToolUseContext['options']['mcpClients'];
 mcpCommands: Command[];
 mcpTools: Tools;
 modelProvenance: unknown;
 monorepo: boolean | undefined;
 noMonorepo: boolean | undefined;
 permissionModeCli: unknown;
 permissionModeNotification: string | undefined;
 persistentVolume: boolean | undefined;
 poolId: string | null;
 poolOnBranch: string | null;
 poolPromotedRemote: boolean | undefined;
 poolRef: string | null;
 preDecorationInputPrompt: string | null;
 proactivityLevel: string | undefined;
 projectBrowse: unknown;
 projectForRemoteControl: boolean | undefined;
 rawModelRequest: string | undefined;
 remoteControl: boolean | undefined;
 remoteControlName: string | undefined;
 remoteDroppedMcpMessages: import('../../types/message.js').Message[];
 resolvedInitialModel: string | undefined;
 restrictedModel: string | undefined;
 root: Root;
 session: ExecutionSession287;
 sessionGroupingId: string | null | undefined;
 sessionNameArg: string | undefined;
 sessionStartHooks: Promise<unknown> | undefined;
 sessionTeamContext: unknown;
 stats: unknown;
 storageV5: ToolUseContext['storageV5'];
 credentials: ToolUseContext['credentials'];
 strictMcpConfig: boolean | undefined;
 structuredOutputTool: Tools[number] | undefined;
 systemPrompt: string | undefined;
 teleport: string | true | null;
 terminalInput: TerminalInput287;
 thinkingConfig: ThinkingConfig;
 thinkingConfigExplicit: boolean | undefined;
 thinkingDisplayFlag: unknown;
 thinkingEnabled: boolean | undefined;
 toolPermissionContext: ToolUseContext['getAppState'] extends (...args:never[])=>infer S ? S extends {toolPermissionContext:infer P} ? P : never : never;
 userSpecifiedFallbackModel: string | undefined;
 verbose: boolean | undefined;
 wasPersistedTrustedBeforeSetup: boolean | undefined;
 wasTrustedBeforeSetup: boolean | undefined;
}
export interface EnvironmentActionOptions287 extends Record<string,unknown> {
 model?:string;effort?:string;proactivity?:string;replyOnResume?:boolean;
 continue?:boolean;resume?:string | boolean;forkSession?:boolean;
}
export interface OriginalCloudSession287 {id:string;title:string;withheldInitialMessage?:unknown;homeSeed?:unknown}
/** Original pHr options; all create inputs are forwarded, including qualified
 * device, consent and storage values. This is not another create implementation. */
export interface EnvironmentLaunchOptions287 {
 description:string|null;descriptionUuid?:string;signal:AbortSignal;source:string;
 showTeleportErrors:(root:Root,requirements:Set<string>)=>unknown;
 branchName?:string;branchFromHead?:boolean;explicitRef?:string;reuseOutcomeBranch?:string;
 poolId?:string;correlationId?:string;title?:string;permissionMode?:string;
 proactivityLevel?:string;effort?:string;disallowedTools?:string[];builtinTools?:string[];
 model?:string;environmentVariables?:Record<string,string>;appendSystemPrompt?:string;
 persistentVolume?:boolean;monorepo?:boolean;noMonorepo?:boolean;sessionGroupingId?:string;
 deviceBinding?:unknown;connectedSession?:boolean;firstUpload?:unknown;staysAttached?:boolean;
 deferInitialMessage?:boolean;forwardHomeSettings?:boolean;homeSettingsConsent?:'forward';
 storageV5:ToolUseContext['storageV5'];credentials:ToolUseContext['credentials'];
 onProgress?:(progress:unknown)=>void;
}
export type EnvironmentLaunchResult287={ok:true;session:OriginalCloudSession287;notices:string[]}|{ok:false;failReason:string;failMessage?:string;failDetail?:unknown}
/** These must be supplied by the original active owner, not fixture/default state.
 * No implicit initialization, cloned cache, second session or no-op host. */
export interface EnvironmentOwnerSuppliers287 {
 state:Readonly<Record<string,unknown>>;
 hasNamespace(specifier:string):boolean;
 requireNamespace(specifier:string):Readonly<Record<string,unknown>>;
 importNamespace(specifier:string):Promise<Readonly<Record<string,unknown>>>;
}
