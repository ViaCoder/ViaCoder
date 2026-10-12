import type {UUID} from 'node:crypto'
import type {AgentId} from '../types/ids.js'
import type {PersistedWorktreeSession,TranscriptMessage,FileHistorySnapshotMessage,AttributionSnapshotMessage,LogOption,CostStateEntry287} from '../types/logs.js'
import type {ContentReplacementRecord} from './toolResultStorage.js'
import type {TranscriptResumeMetadata287} from './officialSessionRestore287/metadata.js'
import {getOriginalModsLifecycle287} from './hooks/modelSwitch287/lifecycleRuntime.js'

/** Original hpn's invocation-local maps, not a second transcript/cache owner. */
export interface ParsedTranscript287 {
 messages:Map<UUID,TranscriptMessage>;summaries:Map<UUID,string>;customTitles:Map<UUID,string>;endedSessions:Set<string>;aiTitles:Map<string,string>;tags:Map<UUID,string>;relocatedCwds:Map<UUID,string>;agentNames:Map<UUID,string>;agentColors:Map<UUID,string>;agentSettings:Map<UUID,string>;
 prNumbers:Map<UUID,number>;prUrls:Map<UUID,string>;prRepositories:Map<UUID,string>;modes:Map<UUID,string>;permissionModes:Map<string,LogOption['permissionMode']>;isolationLatches:Map<string,LogOption['isolationLatch']>;devModsFolders?:Map<string,string>;memoryModeStamps:Map<string,NonNullable<LogOption['memoryModeStamps']>>;atisLatches:Map<string,string>;
 bridgeSessionIds:Map<string,string>;bridgeLastSeqs:Map<string,number>;bridgeDialogKindsBySession:Map<string,string[]>;bridgeSessionGroupingIds:Map<string,string>;bridgeNoBackfill:Map<string,boolean>;bridgeOwnerAccountUuids:Map<string,string>;bridgeOwnerOrganizationUuids:Map<string,string>;historySuppressed:Set<string>;
 worktreeStates:Map<UUID,PersistedWorktreeSession|null>;artifactCommentMonitors:Map<string,LogOption['artifactCommentMonitor']>;artifactAutoReactLedgers:Map<string,LogOption['artifactAutoReactLedger']>;costStates:Map<string,CostStateEntry287>;fileHistorySnapshots:Map<UUID,FileHistorySnapshotMessage>;fileHistoryDeltas:Map<UUID,unknown[]>;attributionSnapshots:Map<UUID,AttributionSnapshotMessage>;contentReplacements:Map<UUID,ContentReplacementRecord[]>;agentContentReplacements:Map<AgentId,ContentReplacementRecord[]>;forkContextRefs:Map<string,unknown>;leafUuids:Set<UUID>;clearedToEmpty:boolean;rewindAnchorUuid?:UUID;
}
export interface TranscriptParser287 {
 processEntry(entry:unknown,normalize?:boolean):void;precede(entries:unknown[]):void;dropPreBoundaryEntries():void;setTailTorn(value:boolean):void;finish():ParsedTranscript287
}
export function createCanonicalTranscriptParser287(keepAllLeaves=false):TranscriptParser287 {
 const source=getOriginalModsLifecycle287().clearLifecycleSource287('chunk-mphp7acd.js','hpn')
 if(typeof source!=='function')throw Error('Original transcript parser hpn missing')
 return source(keepAllLeaves) as TranscriptParser287
}
/** Legacy read ABI is a view over the very same original maps. */
export function transcriptMetadataView287(parsed:ParsedTranscript287):{read(id:string):TranscriptResumeMetadata287} {
 return {read:id=>({isolationLatch:parsed.isolationLatches.get(id),devModsFolder:parsed.devModsFolders?.get(id),atisLatch:parsed.atisLatches.get(id),artifactCommentMonitor:parsed.artifactCommentMonitors.get(id),artifactAutoReactLedger:parsed.artifactAutoReactLedgers.get(id),endedByModel:parsed.endedSessions.has(id),aiTitle:parsed.aiTitles.get(id),permissionMode:parsed.permissionModes.get(id),memoryModeStamps:parsed.memoryModeStamps.get(id),bridgeSessionId:parsed.bridgeSessionIds.get(id),bridgeLastSeq:parsed.bridgeLastSeqs.get(id),bridgeDialogKinds:parsed.bridgeDialogKindsBySession.get(id),bridgeSessionGroupingId:parsed.bridgeSessionGroupingIds.get(id),bridgeNoHistoryBackfill:parsed.bridgeNoBackfill.get(id),bridgeOwnerAccountUuid:parsed.bridgeOwnerAccountUuids.get(id),bridgeOwnerOrganizationUuid:parsed.bridgeOwnerOrganizationUuids.get(id),sessionHistorySuppressed:parsed.historySuppressed.has(id)})}
}
