import type {QueuedCommand} from '../../types/textInputTypes.js'
export type PrintDispatchCommand287=QueuedCommand&{shouldQuery?:boolean;queryHeldForNextTurn?:boolean;pollEmptyDispatch?:boolean;passive?:boolean}
export declare function commandLacksUserIntent287(command:PrintDispatchCommand287):boolean
