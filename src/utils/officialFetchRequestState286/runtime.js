// Original 287 state replaces the 286 class on the same public accessor path.
import {LRUCache} from 'lru-cache'
import {getOAuthResetExecutionContext286} from '../officialHttpWif286/runtime.js'
import {createNativeFetchRequestState287} from './native.js'
const owner=createNativeFetchRequestState287({LRUCache,context:getOAuthResetExecutionContext286})
export function getFetchRequestState286(){return owner.get()}
/** Exact native account-change statement, using the same production state. */
export function clearGzipBlockStore287(){owner.clearBlockStore(owner.get().gzipRequestBody.blockStore)}
export function createFetchRequestState286ForTest(j){
 if(typeof j!=='function')throw new TypeError('j must be the exact native context accessor')
 return {get:()=>owner.cell.of(j()),peek:()=>owner.cell.peek(j()),drop:()=>owner.cell.drop(j())}
}
export const NativeRootContextCell286=owner.RootCell
