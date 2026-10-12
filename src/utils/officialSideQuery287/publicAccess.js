// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQueryPublicAccess287(ports){
const {$5o,RJe,TIe,cc}=ports;
var pJ=["UnrecognizedClientException","ExpiredTokenException","InvalidSignatureException","RequestTimeTooSkewed","TokenRefreshRequired","CredentialsProviderError"];
var mJ="you don't have access to the model with the specified model id";
var hJ="the provided model identifier is invalid";
var gJ="on-demand throughput";
var yJ=/is not authorized to perform: bedrock:InvokeModel/i;
function _J(e){let n=e,r=typeof n?.status==="number"?n.status:void 0,s=typeof n?.message==="string"?n.message:"",h;try{h=n?.headers?.get?.("x-amzn-errortype")??void 0}catch{h=void 0}return{status:r,message:s,errorType:h}};
function bJ(e,n){let r=String(e?.name??"");return RJe(e)||TIe(n.errorType,n.message)||pJ.some((s)=>r.includes(s)||n.message.includes(s)||(n.errorType?.includes(s)??!1))};
function Cut(e,n){let r=_J(n);if(e!=="vertex"&&bJ(n,r))return"credential";if(r.status===401)return"credential";if($5o(n))return"outdated";let s=r.message.toLowerCase();if(e==="bedrock"){if(r.status===403&&s.includes(mJ))return"refused";if(r.status===400&&s.includes(hJ)&&!s.includes(gJ))return"refused";if(r.status===403&&yJ.test(r.message))return"denied";return"unknown"}if(e==="vertex"){if(r.status===404&&r.message.includes("Publisher Model")&&s.includes("not found"))return"refused";return"unknown"}return"unknown"};
function Lut(e,n){let r=cc(e);return r==="bedrock"||r==="vertex"||r==="mantle"?Cut(r,n):"unknown"};
return {Lut};
}
