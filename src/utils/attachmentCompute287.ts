import {createAttachmentCompute287,type AttachmentComputePorts287} from './officialAttachmentAssembler287/native.js'
import {logAntError,logForDebugging} from './debug.js'
import {toError} from './errors.js'
import {logError} from './log.js'
import {jsonStringify} from './slowOperations.js'
import {ImageResizeError} from './imageResizer.js'
import {logEvent,type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS} from '../services/analytics/index.js'
/** Original _l uses these existing production consumers and the same image-error
 * constructor. The C telemetry cancellation remains in the analytics owner. */
export function createAttachmentComputeProductionPorts287():AttachmentComputePorts287 {return {
 SY:logAntError,Z:toError,_:jsonStringify,d:(error:unknown)=>logError(error),t:logForDebugging,ux:ImageResizeError,
 i:(name,metadata)=>logEvent(name,metadata as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS),
}}
let compute:ReturnType<typeof createAttachmentCompute287>|undefined
export function computeAttachment287<A>(label:string,producer:()=>Promise<A[]>):Promise<A[]> {
 return (compute??=createAttachmentCompute287(createAttachmentComputeProductionPorts287()))(label,producer)
}
