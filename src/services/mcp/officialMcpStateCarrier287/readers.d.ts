import type {Context} from 'react'
import type {AppState} from '../../../state/AppStateStore.js'
import type {ScopedMcpServerConfig,ConnectedMCPServerV2} from '../types.js'
import type {PrintMcpClient287,PrintMcpState287} from '../officialPrintScheduler287/native.js'
export type McpCarrierClient287=PrintMcpClient287&{v2Connection?:ConnectedMCPServerV2|null}
export type McpCarrierState287=Omit<PrintMcpState287,'clients'|'suppressedClaudeAiConnectors'>&{clients:McpCarrierClient287[];clientsInitialized?:boolean;reservedNameRefusals?:{scope:string;name:string}[];suppressedClaudeAiConnectors?:{name:string;duplicateOf:string}[]}
export type McpQueuedInput287=McpCarrierClient287&Partial<Pick<McpCarrierState287,'tools'|'commands'>>&{
 resources?:import('../types.js').ServerResource[];
 resourceTemplates?:import('../types.js').ServerResourceTemplate[];
 replaceOnly?:boolean
}
export type McpQueuedUpdate287=McpQueuedInput287&{epoch:number}
export interface McpStateCarrier287 {
 get():McpCarrierState287;
 markNeedsAuth(name:string):void;clearNeedsAuth(name:string):Promise<void>;
 adoptServer(name:string,result:{client:McpCarrierClient287;tools:McpCarrierState287['tools'];commands:McpCarrierState287['commands'];resources?:import('../types.js').ServerResource[];resourceTemplates?:import('../types.js').ServerResourceTemplate[]},options?:{appendIfAbsent?:boolean}):void;
 swapServerTools(name:string,tools:McpCarrierState287['tools']):boolean;
 setSuppressedClaudeAiConnectors(names:{name:string;duplicateOf:string}[]):void;
 setReservedNameRefusals(refusals:{scope:string;name:string}[]):void;
 addPendingServers(configs:Record<string,ScopedMcpServerConfig>):void;
 reconcileConfiguredServers(configs:Record<string,ScopedMcpServerConfig>,workspaceRoot:string|undefined,onStale:(rows:McpCarrierClient287[])=>void):void;
 applyIdentityBoundary(reset:Set<string>,removed:Set<string>):void;
 applyQueuedUpdates(updates:readonly McpQueuedUpdate287[],options:{currentEpoch:number;onDoorDenied(name:string):void;onOrphanedDisable(name:string):void}):void;
}
export type McpCarrierHostState287=Omit<AppState,'mcp'>&{mcp:McpCarrierState287}
export function readMcpStateCarrier287():{
 QGe:{over(store:{getState():McpCarrierHostState287;setState(update:(state:McpCarrierHostState287)=>McpCarrierHostState287):void}):McpStateCarrier287};
 L0n:Context<McpStateCarrier287|null>;
 RAt():McpStateCarrier287;gr():number;Ike(name:string):void;
 tZe(current:McpCarrierClient287|undefined,next:McpCarrierClient287):boolean
}
