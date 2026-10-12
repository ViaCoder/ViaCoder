import type {PastedContent} from '../../../utils/config.js'
import type {ImageDimensions} from '../../../utils/imageResizer.js'
export type ImagePasteMetadata287={mediaType?:string;filename?:string;dimensions?:ImageDimensions;sourcePath?:string;continuesGesture?:boolean}
export function createPlanImageConsumer287(ports:{PC(text:string|undefined,pasted:Record<number,PastedContent>):number;ze:Record<number,PastedContent>;pt:import('react').Dispatch<import('react').SetStateAction<Record<number,PastedContent>>>;X:unknown;nU(setter:unknown,key:string):unknown;Sme(content:PastedContent,setter:unknown):unknown;bme(content:PastedContent,setter:unknown):unknown}):(base64:string,metadata?:ImagePasteMetadata287)=>void
