import {APIConnectionError, APIError} from '@anthropic-ai/sdk'
import {isRevokedOAuthToken287} from '../officialStreamBoundary287/native.js'

// AST-emitted native 2.1.286 declarations. Host/auth ownership stays with the caller.
export const NPo = 2
export const $Po = 2

export function createOfficialCredentialRetry286({a,Bn,gE,hre,UOe,BPe,WOe,SF}) {
  const Pt = APIError
  const lu = APIConnectionError
function FI(e){return a.CLAUDE_CODE_REMOTE&&e instanceof Pt&&(e.status===401||e.status===403)}
function vse(e){return!FI(e)&&e instanceof Pt&&(e.status===401||e.status===403)&&Bn()&&!gE()&&hre()}
function DLt(e,n){return e instanceof Pt&&e.status===401||vse(e)||UOe(e)!==void 0&&Boolean(BPe())||VJ(e)||WOe(e,n)||SF(e)}
const VJ=isRevokedOAuthToken287;
  return {FI,vse,DLt,VJ,APIError:Pt,APIConnectionError:lu}
}
