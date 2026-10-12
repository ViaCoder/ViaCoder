import type {Command} from '../types/command.js'
import {publicCommandSourcePort287 as read} from '../utils/commandCompletionProducers287.js'

// Commands.ts keeps the lazy startup boundary. The original descriptor and its
// complete report pipeline live once in the shared canonical source namespace.
const insightsCommand=read('chunk-q5ps74rj.js','Qs') as Extract<Command,{type:'prompt'}>
export default insightsCommand

// Retain the existing internal export without a second report implementation.
export const generateUsageReport=read('chunk-q5ps74rj.js','Wt') as
 (options?:{collectRemote?:boolean;storageV5?:unknown;credentials?:unknown;permissionGates?:()=>unknown})=>Promise<unknown>
