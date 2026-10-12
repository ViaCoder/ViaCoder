/** Fixed287 source facades. Threshold cache belongs to raw ldo.of(host),
 * description cache to YL/jqn, and deferral/declared state to canonical je. */
import type {Tools,ToolPermissionContext} from '../Tool.js'
import {toolMatchesName} from '../Tool.js'
import type {AgentDefinition} from '../tools/AgentTool/loadAgentsDir.js'
import {TOOL_SEARCH_TOOL_NAME} from '../tools/ToolSearchTool/prompt.js'
import type {Message} from '../types/message.js'
import {getToolSchemaRuntime287,toolSearchMode287,toolSearchModelSupported287,toolSearchOptimistic287} from './toolSchema287.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'
import type {DeclaredToolSet287} from './officialMcpAttachments287/native.js'
import type {StickyBetas287} from '../services/context/officialExecutionOwners287/native.js'
export type ToolSearchMode='tst'|'tst-auto'|'standard'
export const getToolSearchMode=toolSearchMode287
export const modelSupportsToolReference=toolSearchModelSupported287
export const isToolSearchEnabledOptimistic=toolSearchOptimistic287
export function getAutoToolSearchCharThreshold(model:string):number{return getToolSchemaRuntime287().searchCharThreshold(model)}
export function isToolSearchToolAvailable(tools:readonly {name:string}[]):boolean{return tools.some(tool=>toolMatchesName(tool,TOOL_SEARCH_TOOL_NAME))}
export async function isToolSearchEnabled(model:string,tools:Tools,permissions:()=>Promise<ToolPermissionContext>,agents:AgentDefinition[],source?:string,credentials?:import('./officialSecureStorage/runtime.js').CredentialStore):Promise<boolean>{return getToolSchemaRuntime287().searchEnabled(model,tools,permissions,agents,source,credentials)}
export function isToolReferenceBlock(value:unknown):boolean{return typeof value==='object'&&value!==null&&Reflect.get(value,'type')==='tool_reference'}
export function extractDiscoveredToolNames(messages:Message[],options?:{surfaced:Set<string>|{exceptAnnouncements:Set<string>}}):Set<string>{return getToolSchemaRuntime287().searchDiscovered(messages,options)}
export type DeferredToolsDelta={addedNames:string[];addedLines:string[];removedNames:string[];wireHiddenNames:string[];readdedNames:string[];pendingMcpServers?:string[];needsAuthMcpServers?:string[];failedMcpServers?:{name:string;errorCode?:string;error?:string}[];retractedTools?:{name:string;cause:string}[];restoredNames?:string[];surfacedNames?:string[];toolSearchAbsent?:true}
export type DeferredToolsDeltaScanContext={callSite:'attachments_main'|'attachments_subagent'|'compact_full'|'compact_partial'|'reactive_compact';querySource?:string}
/** Keep the established public C opt-in for delta attachments. */
export function isDeferredToolsDeltaEnabled():boolean{return process.env.USER_TYPE==='ant'||getFeatureValue_CACHED_MAY_BE_STALE('tengu_glacier_2xr',false)}
export function getDeferredToolsDelta(tools:Tools,messages:Message[],scanContext?:DeferredToolsDeltaScanContext,pending?:Iterable<string>,needsAuth?:Iterable<string>,failed?:{name:string;errorCode?:string;error?:string}[],departures?:{revoked:{name:string;cause:string}[];causeCounts?:Record<string,number>},declared?:DeclaredToolSet287,sticky?:Pick<StickyBetas287,'nameOnlyAnnouncements'>,announcements?:Set<string>):DeferredToolsDelta|null{return getToolSchemaRuntime287().searchDelta(tools,messages,scanContext,pending,needsAuth,failed,departures,declared,sticky,announcements)}
