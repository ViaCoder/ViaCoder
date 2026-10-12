// Official 2.1.287 complete declaration bodies. Only compiled build-macro reads are restored to the caller's build metadata; see provenance.
import {createHash} from 'node:crypto'
export function createBillingAttribution287({provider,base,scope,optOut,workload,logger,a,process,buildMetadata}) {
const He=provider,tg=base,Js=scope,gs=optOut,nZn=workload,t=logger
function QGr(e,n,i,r,s,c,d){let m=He();if(!(d?.ignoreEnvOptOut===!0&&m==="firstParty"&&tg()&&!a.ANTHROPIC_UNIX_SOCKET)&&gs(process.env.CLAUDE_CODE_ATTRIBUTION_HEADER))return"";let g=`${buildMetadata.VERSION}.${e}`,y=process.env.CLAUDE_CODE_ENTRYPOINT??"unknown",S=m==="firstParty"&&Js()||m==="vertex"?" cch=00000;":"",b=nZn(),Be=b?` cc_workload=${b};`:"",Ke=zv(n)&&!n.isMainSession?" cc_is_subagent=true;":"",ze=i!==void 0&&/^req_[A-Za-z0-9_-]{1,36}$/.test(i)&&m==="firstParty"&&Js()?` cc_prev_req=${i};`:"",Ve=r!==void 0&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(r)&&m==="firstParty"&&Js()?` cc_prompt_id=${r};`:"",$e=typeof s==="string"&&/^[a-z][a-z_]{0,31}$/.test(s)&&m==="firstParty"&&Js()?` cc_turn_origin=${s};`:"",oe=c?.promptIndex,ae=c?.turnIndex,We=ce(oe,0)&&ce(ae,1)&&m==="firstParty"&&Js()?` cc_prompt_index=${oe}; cc_turn_index=${ae};`:"",le=`x-anthropic-billing-header: cc_version=${g}; cc_entrypoint=${y};${S}${Be}${Ke}${ze}${Ve}${$e}${We}`;return t(`attribution header ${le}`),le}
function ce(e,n){return typeof e==="number"&&Number.isInteger(e)&&e>=n&&e<=1e7}
function zv(e){return e.agentType==="subagent"}
return {format:QGr}
}
export function createFingerprint287({buildMetadata}) {
const NQ=createHash
var HQ="59cf53e54c78";
function BQ(e){let n=e.find((s)=>s.type==="user"&&!s.isMeta);if(!n)return"";let r=n.message.content;if(typeof r==="string")return r;if(Array.isArray(r)){let s=r.find((h)=>h.type==="text");if(s&&s.type==="text")return s.text}return""}
function qw(e,n){let s=[4,7,20].map((b)=>e[b]||"0").join(""),h=`${HQ}${s}${n}`;return NQ("sha256").update(h).digest("hex").slice(0,3)}
function eDo(e){let n=BQ(e);return qw(n,buildMetadata.VERSION)}
return {firstMessageText:BQ,fingerprint:qw,fingerprintFromMessages:eDo}
}
