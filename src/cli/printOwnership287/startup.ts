import {randomUUID} from 'node:crypto'
import {EMPTY_USAGE} from '../../services/api/logging.js'
import {Option} from '@commander-js/extra-typings'
import {getExecutionSession287,executionSessionRegistryConstructor287} from '../../services/context/execution287.js'
import {isEnvTruthy} from '../../utils/envUtils.js'
import {createPrintClaimUserError287,createPrintClaimAdmission287,createPrintClaimStartup287} from './native.js'

export const printClaimStartup287=createPrintClaimStartup287({
 Option,executionContext:getExecutionSession287,
 scrub:()=>isEnvTruthy(process.env.CLAUDE_CODE_SUBPROCESS_ENV_SCRUB),
 reject:message=>{process.stderr.write(message+'\n');process.exit(1)},
})
const admission=createPrintClaimAdmission287({})
export const printClaimUserResult287=createPrintClaimUserError287({lp:EMPTY_USAGE,o:randomUUID})
export function printClaimAdmissionError287(subtype:unknown):string|undefined {
 const state=printClaimStartup287.state()
 return (state==='parked'||state==='failed')&&!admission.allows(subtype)
  ? state==='failed'?admission.failedError:admission.parkedError:undefined
}
export function printClaimUserError287():string|undefined {
 const state=printClaimStartup287.state()
 if(state==='failed')return 'not_claimed: the claim of this spare failed; discard it and start the session normally'
 if(state==='parked')return 'not_claimed: this process was started with --await-claim and has not been claimed; send claim_session before the first message'
}

export interface PrintClaimStartupContract287 {
 awaitClaim?:boolean;permissionModeSuppliedOnInvocation?:boolean;
 connectClaimMcpServers?:(configs:Record<string,import('../../services/mcp/types.js').ScopedMcpServerConfig>)=>Promise<void>;
 startDeferredMcpServers?:(alreadyStarted:Set<string>)=>Promise<string[]>;
 startDeferredSessionRegistration?:()=>Promise<boolean>;
 startDeferredSessionStartHooks?:()=>ReturnType<typeof import('../../utils/sessionStart.js').processSessionStartHooks>
}

import {createPrintClaimModelSteer287} from './native.js'
export const printClaimModelSteer287=createPrintClaimModelSteer287({U:getExecutionSession287,Tt:executionSessionRegistryConstructor287})
