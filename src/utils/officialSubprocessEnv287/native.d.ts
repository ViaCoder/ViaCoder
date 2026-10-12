import type {authEnvironment} from '../authEnvironment.js'
import type {SubprocessPolicy287} from '../permissions/officialReadPermissions287/native.js'
export interface SubprocessHost287 {
 getAgentProxyEnv:(()=>Record<string,string>)|undefined
 getGhStandinDir:(()=>string)|undefined
 settingsColorEnv:Record<string,string>
 hipaaTierNoticeGiven:boolean
}
export interface SubprocessEnvironment287 {
 subprocessEnv():NodeJS.ProcessEnv
 publishSettingsColor(env:Record<string,string>):void
 registerProxy(read:()=>Record<string,string>):void
 registerGhStandin(read:()=>string):void
}
export function createSubprocessEnvironment287(ports:{
 hostRegistry:{of(host:object):SubprocessHost287}
 execution():{host:object}
 environment:typeof authEnvironment
 subprocessScrubState:SubprocessPolicy287
 bridgeCarrierOwner:{readonly bridgeCarrier:unknown}
 taintRegistry:{of(host:object):{taints:string[]}}
 scrubPathNames():string[]
 containsCredential(value:string):boolean
 scrubCommand(name:string,value:string):string|undefined
 debug:typeof import('../debug.js').logForDebugging
}):SubprocessEnvironment287
