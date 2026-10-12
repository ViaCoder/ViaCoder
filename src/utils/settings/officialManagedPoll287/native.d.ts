import type {MdmPolicyRead287,ConsumedMdm287} from '../officialPolicyParser287/native.js'
export interface ManagedPollPorts287 {
 _(value:unknown):string
 U8():MdmPolicyRead287;gje():MdmPolicyRead287;IU():boolean
 H9r(hint?:unknown):Promise<string>;Ne:unknown
 ce:boolean;he:string|null;te:ReturnType<typeof setInterval>|null
 LQe(hint?:unknown):Promise<ConsumedMdm287>
 hje(mdm:MdmPolicyRead287,hkcu:MdmPolicyRead287,wslInherits:boolean):void
 t:typeof import('../../debug.js').logForDebugging
 l:typeof import('../../errors.js').errorMessage
 Lt(source:'policySettings'):void;s:number
}
export interface ManagedPoll287 {
 start():Promise<void>
 snapshot(mdm:MdmPolicyRead287,hkcu:MdmPolicyRead287,wslInherits:boolean,windowsFile:string):string
}
export function createManagedPoll287(ports:ManagedPollPorts287):ManagedPoll287
