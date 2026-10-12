import type {StreamEvent} from '../../../types/message.js'
export type StreamBoundaryState287={envelopeOpen:boolean;activeBlock:number|null;hiddenBlock:boolean}
export declare function isHiddenStreamBlock287(type:string):boolean
export declare function isRevokedOAuthToken287(error:unknown):boolean
export declare function createStreamBoundary287(state:StreamBoundaryState287):()=>Generator<StreamEvent,void>
