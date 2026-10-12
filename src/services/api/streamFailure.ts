import {APIError} from '@anthropic-ai/sdk'
import {createOfficialStreamFailurePredicates286} from './officialByteWatchdog286/failure.runtime.js'
import {createOfficialPartialFinal286} from './officialByteWatchdog286/partial.runtime.js'
import {createAssistantAPIErrorMessage} from '../../utils/messages.js'
import {API_ERROR_MESSAGE_PREFIX} from './errors.js'
import {createOfficialOverloaded286} from './officialByteWatchdog286/decision.runtime.js'

export const streamFailurePredicates286=createOfficialStreamFailurePredicates286({
 Pt:APIError,
})
export const isOverloadedStreamError286=createOfficialOverloaded286({Pt:APIError})
export const StreamMalformedEventError286=streamFailurePredicates286.MalformedStreamError

export function partialStreamFinal286(flags:{
 hasOutput:boolean;stalled:boolean;serverError:boolean;malformed:boolean;
 unstartedBlock:boolean;suspended:boolean;hasTool:boolean
}) {
 return createOfficialPartialFinal286({
  Zs:flags.hasOutput,ug:flags.stalled,Pa:API_ERROR_MESSAGE_PREFIX,
  zd:flags.serverError,$u:flags.malformed,ef:flags.unstartedBlock,
  jpe:flags.suspended,xT:flags.hasTool,
  Ko:({truncatedAfterOutput,...message})=>({
   ...createAssistantAPIErrorMessage(message),
   ...(truncatedAfterOutput!==undefined&&{truncatedAfterOutput}),
  }),
 })
}
