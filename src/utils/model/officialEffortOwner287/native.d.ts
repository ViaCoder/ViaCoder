import type {EffortLevel} from '../../../entrypoints/sdk/runtimeTypes.js'
import type {SessionEffort,SettingsEffortTable} from '../effortSettings.js'
export interface EffortOwnerSnapshotSource287 {readonly sessionEffort:SessionEffort;readonly settingsEffortTable:SettingsEffortTable;readonly mainLoopModelForSession?:string|null;readonly mainLoopModel?:string|null}
export interface EffortOwnerSourcePorts287 {resolveSettingsEffort(table:SettingsEffortTable,model:string):EffortLevel|undefined;sourceDefaultModel():string}
export interface EffortOwnerSourceRuntime287 {read(snapshot:Partial<EffortOwnerSnapshotSource287>,model?:string|null):EffortLevel|number|undefined}
export function createEffortOwnerSource287(ports:EffortOwnerSourcePorts287):EffortOwnerSourceRuntime287
export function shouldPublishEffortOwner287(next:EffortOwnerSnapshotSource287,previous:EffortOwnerSnapshotSource287):boolean
