import type {PersistedWorktreeSession} from '../../types/logs.js'
import type {WorktreeResumeFailure287} from './state.js'
export interface RestoreWorktree287 {
 restore(value:PersistedWorktreeSession|null|undefined,projectPath?:string,options?:{preserveBinding?:boolean;liveLaunchDir?:string;storageV5?:undefined}):WorktreeResumeFailure287|null
 warning(value:WorktreeResumeFailure287):string
 ancestry(path:string):Promise<boolean>
 network(path:string):boolean;nt(path:string):boolean;networkRoot(path:string):boolean;dot(path:string):boolean
}
export function createRestoreWorktree287(ports:ReturnType<typeof import('../resumeWorktree287.js').createRestoreWorktreePorts287>):RestoreWorktree287
