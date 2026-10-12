// Generated from manifest-verified official 2.1.286 declarations; do not hand-edit.
export function createOfficialStreamFailurePredicates286({Pt}) {
function jOe(e){return e instanceof Pt&&e.status!==void 0&&e.status>=500&&e.status<600&&e.status!==529}
function tB(e){return e.type==="fallback"}
var XVn="Output blocked by content filtering policy";
function CF(e){if(!(e instanceof Error)||!e.message.includes(XVn))return!1;let n="originalError"in e&&e.originalError instanceof Error?e.originalError:e,r=n instanceof Pt?c7n(n):void 0;return r===void 0||r===400}
function vIo({previous:e,closedContentBlocks:n,started:r}){return e!==void 0&&n.has(e)&&"id"in e&&"id"in r&&e.id===r.id}
function O1(e){if(!(e instanceof Pt))return!1;return e.status===529||(e.message?.includes('"type":"overloaded_error"')??!1)}
function he(e){if(!(e instanceof Pt))return!1;return e.status===429||(e.message?.includes('"type":"rate_limit_error"')??!1)}
var BSe="dlp_request_denied";
function iBe(e){return TSn(e)===BSe}
function Tht(e){return!1}
function TSn(e){if(!(e instanceof Pt)||!N(e))return;return e.error?.error?.details?.error_code}
function N(e){return typeof e==="object"&&e!==null&&"error"in e&&typeof e.error==="object"&&e.error!==null}
function c7n(e){if(typeof e.status==="number")return e.status;if(O1(e))return 529;if(he(e))return 429;return}
var kht=new Set(["UNABLE_TO_VERIFY_LEAF_SIGNATURE","UNABLE_TO_GET_ISSUER_CERT","UNABLE_TO_GET_ISSUER_CERT_LOCALLY","CERT_SIGNATURE_FAILURE","CERT_NOT_YET_VALID","CERT_HAS_EXPIRED","CERT_REVOKED","CERT_REJECTED","CERT_UNTRUSTED","DEPTH_ZERO_SELF_SIGNED_CERT","SELF_SIGNED_CERT_IN_CHAIN","CERT_CHAIN_TOO_LONG","PATH_LENGTH_EXCEEDED","ERR_TLS_CERT_ALTNAME_INVALID","HOSTNAME_MISMATCH"]);
var Ce=new Set([...kht,"ERR_TLS_HANDSHAKE_TIMEOUT","ERR_SSL_WRONG_VERSION_NUMBER","ERR_SSL_DECRYPTION_FAILED_OR_BAD_RECORD_MAC"]);
var D1=new Set(["ECONNRESET","EPIPE","ConnectionClosed","UND_ERR_SOCKET","ETIMEDOUT","ECONNABORTED","ERR_SOCKET_CLOSED","StreamSuspended","StreamTruncated"]);
var vM=new Set(["ECONNREFUSED","ConnectionRefused","ENOTFOUND","ENETUNREACH","ENETDOWN","EHOSTUNREACH","EHOSTDOWN","EAI_AGAIN","FailedToOpenSocket","ERR_PROXY_TUNNEL"]);
function Qm(e){if(!e||typeof e!=="object")return null;let r=e,n=5,s=0;while(r&&s<n){if(r instanceof Error){if("code"in r&&typeof r.code==="string"){let a=r.code,o=Ce.has(a);return{code:a,message:r.message,isSSLError:o}}if(r.message.startsWith(Tzt))return{code:"ConnectionClosed",message:r.message,isSSLError:!1}}if(r instanceof Error&&"cause"in r&&r.cause!==r)r=r.cause,s++;else break}return null}
var Tzt="The socket connection was closed unexpectedly";
class cjt extends Error{constructor(){super("Stream ended without receiving any events");this.name="StreamNoEventsError"}}
class x9 extends Error{blockState;constructor(e){super("Content block not found");if(this.name="StreamMalformedEventError",this.blockState=e,e==="closed")this.message="Content block already closed";if(e==="unreadable")this.message="Stream event unreadable"}}
class d7n extends Error{code="StreamTruncated";constructor(){super("Stream ended before the response was complete");this.name="StreamTruncatedError"}}
const connectionFlags = error => {
 const fl=Qm(error),Ls=fl!==null&&D1.has(fl.code),Op=fl!==null&&(Ls||vM.has(fl.code));
 return {connectionDetails:fl,isStaleConnection:Ls,isConnectionError:Op};
};
const malformedStream = error => error instanceof x9 || error instanceof SyntaxError;
return {jOe,tB,vIo,Qm,D1,vM,x9,CF,iBe,Tht,cjt,d7n,
 serverError:jOe,fallbackBlock:tB,denied:iBe,connectionFlags,
 MalformedStreamError:x9,TruncatedStreamError:d7n,NoEventsError:cjt,malformedStream};
}
