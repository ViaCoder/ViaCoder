import {createPlanImageConsumer287,type ImagePasteMetadata287} from './native.js'
import type {PastedContent} from '../../../utils/config.js'
export type {ImagePasteMetadata287} from './native.js'
/** Bind the full source consumer to current state and the existing public Ask
 * image ports. This holds no registry, image map, ID counter or writer cache. */
export function pastePlanImage287(base64:string,metadata:ImagePasteMetadata287|undefined,owner:{pastedContents:Record<number,PastedContent>;setPastedContents:import('react').Dispatch<import('react').SetStateAction<Record<number,PastedContent>>>;setAppState:unknown}):void {
 const existing=(import.meta.require('../../../hooks/toolPermission/officialPublicAskMenu287/runtime.js') as typeof import('../../../hooks/toolPermission/officialPublicAskMenu287/runtime.js')).publicAskMenuPorts287()
 const ports=existing as Pick<Parameters<typeof createPlanImageConsumer287>[0],'PC'|'nU'|'Sme'|'bme'>
 createPlanImageConsumer287({...ports,ze:owner.pastedContents,pt:owner.setPastedContents,X:owner.setAppState})(base64,metadata)
}
