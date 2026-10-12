import type {AppState} from '../../state/AppState.js'
import type {InProcessTeammateTaskState} from '../../tasks/InProcessTeammateTask/types.js'
export function createTeammateRetryDispatcher287(ports:{pge(id:string,tasks:AppState['tasks']):InProcessTeammateTaskState|undefined}):(tasks:AppState['tasks'],name:string,team:string)=>void
