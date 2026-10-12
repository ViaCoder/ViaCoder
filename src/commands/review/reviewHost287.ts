import type {LocalJSXCommandContext} from '../../types/command.js'
import type {ReviewLaunchResult287} from './officialPublicReview287/native.js'
/** Existing injected host ABI. Results are decoded lifecycle outcomes, never
 * a truthy ContentBlock[] reinterpreted as a launched review. */
export type ReviewHost={launch(args:string,options:{confirm:true;singlePass:true;withholdOverageConsent:true;applyFixes:boolean;postReview:boolean;context:LocalJSXCommandContext;invocation:string}):Promise<ReviewLaunchResult287>}
