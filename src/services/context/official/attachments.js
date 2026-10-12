// Official npm 2.1.285 lexical closures. Generated; raw declarations and handler bodies unchanged.
import {neutralizeMemoryContent287} from './memoryNeutralizer287/native.js'
export function createOfficialContext(host) {
const factories = {
"chunk-59zy4j10.js": ({Egt,F3n,G,LLe,O,Oke,d,ji,k,ke,o,p}) => {
var S9=["session_start","compaction","policy_refresh","directory_added","settings_sync","account_change","hooks_invalidate","policy_verdict","memory_paused","memory_resumed","auto_memory_off","auto_memory_back_on"];
function rL(e){switch(e){case"session_start":return"when this session started";case"compaction":return"after the conversation was compacted";case"policy_refresh":return"after the organization's managed settings changed";case"directory_added":return"after a working directory was added";case"settings_sync":return"after settings were synced onto this machine";case"account_change":return"after the account changed";case"hooks_invalidate":return"after a plugin had the context re-read";case"policy_verdict":return"after the organization's policy arrived";case"memory_paused":return"after memory was paused for this session";case"memory_resumed":return"after memory was resumed for this session";case"auto_memory_off":return"after auto-memory was turned off for this session";case"auto_memory_back_on":return"after auto-memory was turned back on for this session"}}
var TQt=["userEmail","attachedProject","gitStatus","perforceMode"];
var GW=p(()=>Egt(G(TQt),o()));
var g5e=p(()=>G(S9));
var zW=p(()=>d({date:o(),changed:O().optional()}));
function h5e(e,n,r){let s=TQt.flatMap((h)=>e[h]?[`# ${h}
${e[h]}`]:[]);if(s.length===0)return n?`The session context was re-read${r?` ${rL(r)}`:""}; the values announced earlier (account, project, git status) no longer apply.`:"";return`${n?r?`The session context was re-read ${rL(r)}; these values replace the earlier ones:`:"The session context has changed; these values replace the earlier ones:":"As you answer the user's questions, you can use the following context:"}
${s.join(`
`)}

Claude Code attached this context automatically; it isn't part of the user's message. It describes the user's own account and workspace, so they don't need it reported back.`}
function y5e(e){return e.changed?`The date has changed. Today's date is now ${e.date}. No need to announce the new date \u2014 the user's own clock shows it.`:`Today's date is ${e.date}.`}
function bmo(e,n){return TQt.every((r)=>e[r]===n[r])}
function Amn(e){return e.type==="attachment"&&e.attachment.type==="session_context"}
function Pmn(e){return e.type==="attachment"&&e.attachment.type==="date"}
function XMn(e){return GW().safeParse(e.findLast(Amn)?.attachment.context).data}
function wmo(e){return zW().safeParse(e.findLast(Pmn)?.attachment).data?.date}
var k9=["User","Project","Local","Managed","AutoMem"];
var Mmn=p(()=>d({path:o(),type:G([...k9,"AutoMemPinned"]).catch("User"),content:o()}));
var sL=p(()=>d({files:k(Mmn()),removed:k(o()).optional(),changed:O().optional(),reason:G(S9).optional().catch(void 0)}));
function Emo(e){return e.map(({path:n,type:r,content:s})=>({path:n,type:r,content:s.trim()}))}
function b5e(e){if(!e.changed)return Oke(e.files);let n=F3n(e.files),r=(e.removed??[]).map((g)=>`Instructions no longer present: ${g}`),s=e.reason?`Instruction files were re-read ${rL(e.reason)}; these differ from their earlier copies`:"These instruction files changed";return[...n===""?[]:[`${s} \u2014 each replaces its earlier copy, and the instructions preamble above still applies:

${n}`],...r.length>0&&n===""&&e.reason?[`Instruction files were re-read ${rL(e.reason)}.`]:[],...r].join(`

`)}
function _5e(e){return e.type==="attachment"&&e.attachment.type==="instructions"}
function JMn(e){let n=e.findLastIndex((s)=>_5e(s)&&!s.attachment.changed&&sL().safeParse(s.attachment).success);if(n===-1)return;let r=new Map;for(let s=n;s<e.length;s++){let g=e[s];if(!_5e(g))continue;let h=sL().safeParse(g.attachment);if(!h.success)continue;for(let b of h.data.files)r.set(b.path,b);for(let b of h.data.removed??[])r.delete(b)}return r}
function vmo(e,n){if(!n)return e.length===0?void 0:{files:e.slice()};let r=e.filter((h)=>{let b=n.get(h.path);return!b||b.content!==h.content||b.type!==h.type}),s=new Set(e.map((h)=>h.path)),g=[...n.keys()].filter((h)=>!s.has(h));if(r.length===0&&g.length===0)return;return{files:r,...g.length>0&&{removed:g},changed:!0}}
var DRt=p(()=>d({content:o(),changed:O().optional()}));
var LRt=p(()=>d({sections:k(d({name:o(),text:o()}))}));
var rP="This is ambient context \u2014 do not narrate it to the user unless they ask or it is directly relevant to their request.";
var normalizers={session_context:(e)=>{let n=GW().safeParse(e.context);if(!n.success)return[];let r=h5e(n.data,e.changed===!0,g5e().safeParse(e.reason).data);if(r==="")return[];return ji([ke({content:r,isMeta:!0})])},coordinator_context:(e)=>{let n=DRt().safeParse(e);if(!LLe()||!n.success)return[];let{content:r,changed:s}=n.data;if(r==="")return s===!0?ji([ke({content:"Coordinator mode has ended; the earlier list of worker tools no longer applies.",isMeta:!0})]):[];return ji([ke({content:`${s===!0?`The worker tools have changed; this replaces the earlier list.

`:""}${r}

${rP}`,isMeta:!0})])},context_sections:(e)=>{let n=LRt().safeParse(e);if(!n.success)return[];let{sections:r}=n.data;if(r.length===0)return[];let s=r.map((g)=>`# ${g.name}
${g.text}`).join(`
`);return ji([ke({content:`${s}

${rP}`,isMeta:!0})])},instructions:(e)=>{let n=sL().safeParse(e);if(!n.success)return[];let r=b5e(n.data);if(r==="")return[];return ji([ke({content:r,isMeta:!0})])},date:(e)=>{let n=zW().safeParse(e);if(!n.success)return[];return ji([ke({content:y5e(n.data),isMeta:!0})])}};
return {Emo,JMn,_5e,sL,Mmn,k9,S9,vmo,XMn,GW,TQt,Amn,wmo,zW,Pmn,bmo,h5e,rL,g5e,DRt,rP,LRt,b5e,y5e,normalizers};
},
"chunk-hqp4xfxx.js": ({No,T$e,V1e,iq}) => {
var ms="Codebase and user instructions are shown below. Be sure to adhere to these instructions. IMPORTANT: These instructions OVERRIDE any default behavior and you MUST follow them exactly as written.";
function cs(e){switch(e){case"Project":return" (project instructions, checked into the codebase)";case"Local":return" (user's private project instructions, not checked in)";case"AutoMem":case"AutoMemPinned":return" (user's auto-memory, persists across conversations)";case"Managed":return" (organization-managed policy instructions)";case"User":return" (user's private global instructions for all projects)"}}
var us=(e)=>No(T$e(e));
var ds="# Pinned memories (apply to every conversation)";
var Xo=(e)=>[ds,...e.map((t)=>`<pinned-memory path="${us(t.path)}">
${V1e("pinned-memory",iq(t.content).trim())}
</pinned-memory>`)].join(`

`);
function F3n(e){let t=[],o=[];for(let r of e){if(r.type==="AutoMemPinned"){o.push(r);continue}if(o.length>0)t.push(Xo(o)),o=[];t.push(`Contents of ${r.path}${cs(r.type)}:

`+(r.type==="AutoMem"?iq(r.content).trim():r.content.trim()))}if(o.length>0)t.push(Xo(o));return t.join(`

`)}
function Oke(e){let t=F3n(e);return t===""?"":`${ms}

${t}`}
return {Oke,F3n,Xo,ds,us,cs,ms,iq};
},
"chunk-vc06pma6.js": ({}) => {
var N=new Map([["a","aA\uFF21\uFF41\uD835\uDC00\uD835\uDC1A\uD835\uDC34\uD835\uDC4E\uD835\uDC68\uD835\uDC82\uD835\uDC9C\uD835\uDCB6\uD835\uDCD0\uD835\uDCEA\uD835\uDD04\uD835\uDD1E\uD835\uDD38\uD835\uDD52\uD835\uDD6C\uD835\uDD86\uD835\uDDA0\uD835\uDDBA\uD835\uDDD4\uD835\uDDEE\uD835\uDE08\uD835\uDE22\uD835\uDE3C\uD835\uDE56\uD835\uDE70\uD835\uDE8A\u24B6\u24D0\u0430\u03B1\u1D00\u0251\uAB7A\uA4EE\u2C81\u0410\u0391\u2C6D\u13AA\u2C80\xC0\xC1\xC2\xC3\xC4\xC5\xE0\xE1\xE2\xE3\xE4\xE5\u0100\u0101\u0102\u0103\u0104\u0105\u01CD\u01CE\u01DE\u01DF\u01E0\u01E1\u01FA\u01FB\u0200\u0201\u0202\u0203\u0226\u0227\u1E00\u1E01\u1EA0\u1EA1\u1EA2\u1EA3\u1EA4\u1EA5\u1EA6\u1EA7\u1EA8\u1EA9\u1EAA\u1EAB\u1EAC\u1EAD\u1EAE\u1EAF\u1EB0\u1EB1\u1EB2\u1EB3\u1EB4\u1EB5\u1EB6\u1EB7\u212B\uD835\uDC00\uD835\uDC1A\uD835\uDC34\uD835\uDC4E\uD835\uDC68\uD835\uDC82\uD835\uDC9C\uD835\uDCB6\uD835\uDCD0\uD835\uDCEA\uD835\uDD04\uD835\uDD1E\uD835\uDD38\uD835\uDD52\uD835\uDD6C\uD835\uDD86\uD835\uDDA0\uD835\uDDBA\uD835\uDDD4\uD835\uDDEE\uD835\uDE08\uD835\uDE22\uD835\uDE3C\uD835\uDE56\uD835\uDE70\uD835\uDE8A\uD835\uDEA8\uD835\uDEC2\uD835\uDEE2\uD835\uDEFC\uD835\uDF1C\uD835\uDF36\uD835\uDF56\uD835\uDF70\uD835\uDF90\uD835\uDFAA\u1D2C\u1D43\u1D45\u2090"],["b","bB\uFF22\uFF42\uD835\uDC01\uD835\uDC1B\uD835\uDC35\uD835\uDC4F\uD835\uDC69\uD835\uDC83\uD835\uDC9D\uD835\uDCB7\uD835\uDCD1\uD835\uDCEB\uD835\uDD05\uD835\uDD1F\uD835\uDD39\uD835\uDD53\uD835\uDD6D\uD835\uDD87\uD835\uDDA1\uD835\uDDBB\uD835\uDDD5\uD835\uDDEF\uD835\uDE09\uD835\uDE23\uD835\uDE3D\uD835\uDE57\uD835\uDE71\uD835\uDE8B\u24B7\u24D1\u212C\u0412\u0392\u0299\uAB9F\u13FC\uA4D0\u2C83\u13CF\u13F4\u2C82\u1E02\u1E03\u1E04\u1E05\u1E06\u1E07\uD835\uDC01\uD835\uDC1B\uD835\uDC35\uD835\uDC4F\uD835\uDC69\uD835\uDC83\uD835\uDCB7\uD835\uDCD1\uD835\uDCEB\uD835\uDD05\uD835\uDD1F\uD835\uDD39\uD835\uDD53\uD835\uDD6D\uD835\uDD87\uD835\uDDA1\uD835\uDDBB\uD835\uDDD5\uD835\uDDEF\uD835\uDE09\uD835\uDE23\uD835\uDE3D\uD835\uDE57\uD835\uDE71\uD835\uDE8B\uD835\uDEA9\uD835\uDEE3\uD835\uDF1D\uD835\uDF57\uD835\uDF91\u1D2E\u1D47"],["c","cC\uFF23\uFF43\uD835\uDC02\uD835\uDC1C\uD835\uDC36\uD835\uDC50\uD835\uDC6A\uD835\uDC84\uD835\uDC9E\uD835\uDCB8\uD835\uDCD2\uD835\uDCEC\uD835\uDD06\uD835\uDD20\uD835\uDD3A\uD835\uDD54\uD835\uDD6E\uD835\uDD88\uD835\uDDA2\uD835\uDDBC\uD835\uDDD6\uD835\uDDF0\uD835\uDE0A\uD835\uDE24\uD835\uDE3E\uD835\uDE58\uD835\uDE72\uD835\uDE8C\u24B8\u24D2\u2102\u212D\u0441\u1D04\uABAF\uA4DA\u03F2\u2CA5\u0421\u13DF\u03F9\u2CA4\xC7\xE7\u0106\u0107\u0108\u0109\u010A\u010B\u010C\u010D\u1E08\u1E09\uD835\uDC02\uD835\uDC1C\uD835\uDC36\uD835\uDC50\uD835\uDC6A\uD835\uDC84\uD835\uDC9E\uD835\uDCB8\uD835\uDCD2\uD835\uDCEC\uD835\uDD20\uD835\uDD54\uD835\uDD6E\uD835\uDD88\uD835\uDDA2\uD835\uDDBC\uD835\uDDD6\uD835\uDDF0\uD835\uDE0A\uD835\uDE24\uD835\uDE3E\uD835\uDE58\uD835\uDE72\uD835\uDE8C\u1D9C\u216D\u217D\uA7F2"],["d","dD\uFF24\uFF44\uD835\uDC03\uD835\uDC1D\uD835\uDC37\uD835\uDC51\uD835\uDC6B\uD835\uDC85\uD835\uDC9F\uD835\uDCB9\uD835\uDCD3\uD835\uDCED\uD835\uDD07\uD835\uDD21\uD835\uDD3B\uD835\uDD55\uD835\uDD6F\uD835\uDD89\uD835\uDDA3\uD835\uDDBD\uD835\uDDD7\uD835\uDDF1\uD835\uDE0B\uD835\uDE25\uD835\uDE3F\uD835\uDE59\uD835\uDE73\uD835\uDE8D\u24B9\u24D3\u2145\u2146\u0501\u1D05\uAB70\uABB7\uA4D3\u0500\u13A0\u13E7\u010E\u010F\u1E0A\u1E0B\u1E0C\u1E0D\u1E0E\u1E0F\u1E10\u1E11\u1E12\u1E13\uD835\uDC03\uD835\uDC1D\uD835\uDC37\uD835\uDC51\uD835\uDC6B\uD835\uDC85\uD835\uDC9F\uD835\uDCB9\uD835\uDCD3\uD835\uDCED\uD835\uDD07\uD835\uDD21\uD835\uDD3B\uD835\uDD55\uD835\uDD6F\uD835\uDD89\uD835\uDDA3\uD835\uDDBD\uD835\uDDD7\uD835\uDDF1\uD835\uDE0B\uD835\uDE25\uD835\uDE3F\uD835\uDE59\uD835\uDE73\uD835\uDE8D\u1D30\u1D48\u216E\u217E"],["e","eE\uFF25\uFF45\uD835\uDC04\uD835\uDC1E\uD835\uDC38\uD835\uDC52\uD835\uDC6C\uD835\uDC86\uD835\uDCA0\uD835\uDCBA\uD835\uDCD4\uD835\uDCEE\uD835\uDD08\uD835\uDD22\uD835\uDD3C\uD835\uDD56\uD835\uDD70\uD835\uDD8A\uD835\uDDA4\uD835\uDDBE\uD835\uDDD8\uD835\uDDF2\uD835\uDE0C\uD835\uDE26\uD835\uDE40\uD835\uDE5A\uD835\uDE74\uD835\uDE8E\u24BA\u24D4\u212F\u2130\u2147\u0435\u03B5\u1D07\uAB7C\uA4F0\u2C89\u0415\u0395\u13AC\u2C88\xC8\xC9\xCA\xCB\xE8\xE9\xEA\xEB\u0112\u0113\u0114\u0115\u0116\u0117\u0118\u0119\u011A\u011B\u0204\u0205\u0206\u0207\u0228\u0229\u1E14\u1E15\u1E16\u1E17\u1E18\u1E19\u1E1A\u1E1B\u1E1C\u1E1D\u1EB8\u1EB9\u1EBA\u1EBB\u1EBC\u1EBD\u1EBE\u1EBF\u1EC0\u1EC1\u1EC2\u1EC3\u1EC4\u1EC5\u1EC6\u1EC7\uD835\uDC04\uD835\uDC1E\uD835\uDC38\uD835\uDC52\uD835\uDC6C\uD835\uDC86\uD835\uDCD4\uD835\uDCEE\uD835\uDD08\uD835\uDD22\uD835\uDD3C\uD835\uDD56\uD835\uDD70\uD835\uDD8A\uD835\uDDA4\uD835\uDDBE\uD835\uDDD8\uD835\uDDF2\uD835\uDE0C\uD835\uDE26\uD835\uDE40\uD835\uDE5A\uD835\uDE74\uD835\uDE8E\uD835\uDEAC\uD835\uDEC6\uD835\uDEDC\uD835\uDEE6\uD835\uDF00\uD835\uDF16\uD835\uDF20\uD835\uDF3A\uD835\uDF50\uD835\uDF5A\uD835\uDF74\uD835\uDF8A\uD835\uDF94\uD835\uDFAE\uD835\uDFC4\u1D31\u1D49\u2091"],["f","fF\uFF26\uFF46\uD835\uDC05\uD835\uDC1F\uD835\uDC39\uD835\uDC53\uD835\uDC6D\uD835\uDC87\uD835\uDCA1\uD835\uDCBB\uD835\uDCD5\uD835\uDCEF\uD835\uDD09\uD835\uDD23\uD835\uDD3D\uD835\uDD57\uD835\uDD71\uD835\uDD8B\uD835\uDDA5\uD835\uDDBF\uD835\uDDD9\uD835\uDDF3\uD835\uDE0D\uD835\uDE27\uD835\uDE41\uD835\uDE5B\uD835\uDE75\uD835\uDE8F\u24BB\u24D5\u2131\uA730\uA4DD\u1E1E\u1E1F\uD835\uDC05\uD835\uDC1F\uD835\uDC39\uD835\uDC53\uD835\uDC6D\uD835\uDC87\uD835\uDCBB\uD835\uDCD5\uD835\uDCEF\uD835\uDD09\uD835\uDD23\uD835\uDD3D\uD835\uDD57\uD835\uDD71\uD835\uDD8B\uD835\uDDA5\uD835\uDDBF\uD835\uDDD9\uD835\uDDF3\uD835\uDE0D\uD835\uDE27\uD835\uDE41\uD835\uDE5B\uD835\uDE75\uD835\uDE8F\u1DA0\uA7F3"],["g","gG\uFF27\uFF47\uD835\uDC06\uD835\uDC20\uD835\uDC3A\uD835\uDC54\uD835\uDC6E\uD835\uDC88\uD835\uDCA2\uD835\uDCBC\uD835\uDCD6\uD835\uDCF0\uD835\uDD0A\uD835\uDD24\uD835\uDD3E\uD835\uDD58\uD835\uDD72\uD835\uDD8C\uD835\uDDA6\uD835\uDDC0\uD835\uDDDA\uD835\uDDF4\uD835\uDE0E\uD835\uDE28\uD835\uDE42\uD835\uDE5C\uD835\uDE76\uD835\uDE90\u24BC\u24D6\u210A\u0262\u0261\uAB90\uA4D6\u0581\uA7AC\u13C0\u0551\u011C\u011D\u011E\u011F\u0120\u0121\u0122\u0123\u01E6\u01E7\u01F4\u01F5\u1E20\u1E21\uD835\uDC06\uD835\uDC20\uD835\uDC3A\uD835\uDC54\uD835\uDC6E\uD835\uDC88\uD835\uDCA2\uD835\uDCD6\uD835\uDCF0\uD835\uDD0A\uD835\uDD24\uD835\uDD3E\uD835\uDD58\uD835\uDD72\uD835\uDD8C\uD835\uDDA6\uD835\uDDC0\uD835\uDDDA\uD835\uDDF4\uD835\uDE0E\uD835\uDE28\uD835\uDE42\uD835\uDE5C\uD835\uDE76\uD835\uDE90\u1D33\u1D4D\u1DA2"],["h","hH\uFF28\uFF48\uD835\uDC07\uD835\uDC21\uD835\uDC3B\uD835\uDC55\uD835\uDC6F\uD835\uDC89\uD835\uDCA3\uD835\uDCBD\uD835\uDCD7\uD835\uDCF1\uD835\uDD0B\uD835\uDD25\uD835\uDD3F\uD835\uDD59\uD835\uDD73\uD835\uDD8D\uD835\uDDA7\uD835\uDDC1\uD835\uDDDB\uD835\uDDF5\uD835\uDE0F\uD835\uDE29\uD835\uDE43\uD835\uDE5D\uD835\uDE77\uD835\uDE91\u24BD\u24D7\u210B\u210C\u210D\u210E\u04BB\u041D\u0397\u029C\uAB8B\uAB92\uA4E7\u0570\u2C8F\u04BA\u13BB\u13C2\u0540\u2C8E\u0124\u0125\u021E\u021F\u1E22\u1E23\u1E24\u1E25\u1E26\u1E27\u1E28\u1E29\u1E2A\u1E2B\u1E96\uD835\uDC07\uD835\uDC21\uD835\uDC3B\uD835\uDC6F\uD835\uDC89\uD835\uDCBD\uD835\uDCD7\uD835\uDCF1\uD835\uDD25\uD835\uDD59\uD835\uDD73\uD835\uDD8D\uD835\uDDA7\uD835\uDDC1\uD835\uDDDB\uD835\uDDF5\uD835\uDE0F\uD835\uDE29\uD835\uDE43\uD835\uDE5D\uD835\uDE77\uD835\uDE91\uD835\uDEAE\uD835\uDEE8\uD835\uDF22\uD835\uDF5C\uD835\uDF96\u02B0\u1D34\u2095"],["i","iI\uFF29\uFF49\uD835\uDC08\uD835\uDC22\uD835\uDC3C\uD835\uDC56\uD835\uDC70\uD835\uDC8A\uD835\uDCA4\uD835\uDCBE\uD835\uDCD8\uD835\uDCF2\uD835\uDD0C\uD835\uDD26\uD835\uDD40\uD835\uDD5A\uD835\uDD74\uD835\uDD8E\uD835\uDDA8\uD835\uDDC2\uD835\uDDDC\uD835\uDDF6\uD835\uDE10\uD835\uDE2A\uD835\uDE44\uD835\uDE5E\uD835\uDE78\uD835\uDE92\u24BE\u24D8\u2110\u2111\u2139\u2148\u0456\u03B9\u026A\u0131\uA4F2\u0269\u2C93\u0406\u0399\uA7AE\u0196\u2C92\xCC\xCD\xCE\xCF\xEC\xED\xEE\xEF\u0128\u0129\u012A\u012B\u012C\u012D\u012E\u012F\u0130\u01CF\u01D0\u0208\u0209\u020A\u020B\u1E2C\u1E2D\u1E2E\u1E2F\u1EC8\u1EC9\u1ECA\u1ECB\uD835\uDC08\uD835\uDC22\uD835\uDC3C\uD835\uDC56\uD835\uDC70\uD835\uDC8A\uD835\uDCBE\uD835\uDCD8\uD835\uDCF2\uD835\uDD26\uD835\uDD40\uD835\uDD5A\uD835\uDD74\uD835\uDD8E\uD835\uDDA8\uD835\uDDC2\uD835\uDDDC\uD835\uDDF6\uD835\uDE10\uD835\uDE2A\uD835\uDE44\uD835\uDE5E\uD835\uDE78\uD835\uDE92\uD835\uDEA4\uD835\uDEB0\uD835\uDECA\uD835\uDEEA\uD835\uDF04\uD835\uDF24\uD835\uDF3E\uD835\uDF5E\uD835\uDF78\uD835\uDF98\uD835\uDFB2\u1D35\u1D62\u1DA5\u1DA6\u2071\u2160\u2170"],["j","jJ\uFF2A\uFF4A\uD835\uDC09\uD835\uDC23\uD835\uDC3D\uD835\uDC57\uD835\uDC71\uD835\uDC8B\uD835\uDCA5\uD835\uDCBF\uD835\uDCD9\uD835\uDCF3\uD835\uDD0D\uD835\uDD27\uD835\uDD41\uD835\uDD5B\uD835\uDD75\uD835\uDD8F\uD835\uDDA9\uD835\uDDC3\uD835\uDDDD\uD835\uDDF7\uD835\uDE11\uD835\uDE2B\uD835\uDE45\uD835\uDE5F\uD835\uDE79\uD835\uDE93\u24BF\u24D9\u2149\u0458\u03F3\u1D0A\uAB7B\uA4D9\u0408\u037F\u13AB\u0134\u0135\u01F0\uD835\uDC09\uD835\uDC23\uD835\uDC3D\uD835\uDC57\uD835\uDC71\uD835\uDC8B\uD835\uDCA5\uD835\uDCBF\uD835\uDCD9\uD835\uDCF3\uD835\uDD0D\uD835\uDD27\uD835\uDD41\uD835\uDD5B\uD835\uDD75\uD835\uDD8F\uD835\uDDA9\uD835\uDDC3\uD835\uDDDD\uD835\uDDF7\uD835\uDE11\uD835\uDE2B\uD835\uDE45\uD835\uDE5F\uD835\uDE79\uD835\uDE93\u02B2\u1D36"],["k","kK\uFF2B\uFF4B\uD835\uDC0A\uD835\uDC24\uD835\uDC3E\uD835\uDC58\uD835\uDC72\uD835\uDC8C\uD835\uDCA6\uD835\uDCC0\uD835\uDCDA\uD835\uDCF4\uD835\uDD0E\uD835\uDD28\uD835\uDD42\uD835\uDD5C\uD835\uDD76\uD835\uDD90\uD835\uDDAA\uD835\uDDC4\uD835\uDDDE\uD835\uDDF8\uD835\uDE12\uD835\uDE2C\uD835\uDE46\uD835\uDE60\uD835\uDE7A\uD835\uDE94\u24C0\u24DA\u212A\u043A\u03BA\u1D0B\uABB6\uA4D7\u2C95\u041A\u039A\u13E6\u2C94\u0136\u0137\u01E8\u01E9\u1E30\u1E31\u1E32\u1E33\u1E34\u1E35\uD835\uDC0A\uD835\uDC24\uD835\uDC3E\uD835\uDC58\uD835\uDC72\uD835\uDC8C\uD835\uDCA6\uD835\uDCC0\uD835\uDCDA\uD835\uDCF4\uD835\uDD0E\uD835\uDD28\uD835\uDD42\uD835\uDD5C\uD835\uDD76\uD835\uDD90\uD835\uDDAA\uD835\uDDC4\uD835\uDDDE\uD835\uDDF8\uD835\uDE12\uD835\uDE2C\uD835\uDE46\uD835\uDE60\uD835\uDE7A\uD835\uDE94\uD835\uDEB1\uD835\uDECB\uD835\uDEDE\uD835\uDEEB\uD835\uDF05\uD835\uDF18\uD835\uDF25\uD835\uDF3F\uD835\uDF52\uD835\uDF5F\uD835\uDF79\uD835\uDF8C\uD835\uDF99\uD835\uDFB3\uD835\uDFC6\u1D37\u1D4F\u2096"],["l","lL\uFF2C\uFF4C\uD835\uDC0B\uD835\uDC25\uD835\uDC3F\uD835\uDC59\uD835\uDC73\uD835\uDC8D\uD835\uDCA7\uD835\uDCC1\uD835\uDCDB\uD835\uDCF5\uD835\uDD0F\uD835\uDD29\uD835\uDD43\uD835\uDD5D\uD835\uDD77\uD835\uDD91\uD835\uDDAB\uD835\uDDC5\uD835\uDDDF\uD835\uDDF9\uD835\uDE13\uD835\uDE2D\uD835\uDE47\uD835\uDE61\uD835\uDE7B\uD835\uDE95\u24C1\u24DB\u2112\u2113\u04CF\u029F\uABAE\uA4E1\u04C0\u13DE\u0139\u013A\u013B\u013C\u013D\u013E\u1E36\u1E37\u1E38\u1E39\u1E3A\u1E3B\u1E3C\u1E3D\uD835\uDC0B\uD835\uDC25\uD835\uDC3F\uD835\uDC59\uD835\uDC73\uD835\uDC8D\uD835\uDCC1\uD835\uDCDB\uD835\uDCF5\uD835\uDD0F\uD835\uDD29\uD835\uDD43\uD835\uDD5D\uD835\uDD77\uD835\uDD91\uD835\uDDAB\uD835\uDDC5\uD835\uDDDF\uD835\uDDF9\uD835\uDE13\uD835\uDE2D\uD835\uDE47\uD835\uDE61\uD835\uDE7B\uD835\uDE95\u02E1\u1D38\u1DAB\u2097\u216C\u217C"],["m","mM\uFF2D\uFF4D\uD835\uDC0C\uD835\uDC26\uD835\uDC40\uD835\uDC5A\uD835\uDC74\uD835\uDC8E\uD835\uDCA8\uD835\uDCC2\uD835\uDCDC\uD835\uDCF6\uD835\uDD10\uD835\uDD2A\uD835\uDD44\uD835\uDD5E\uD835\uDD78\uD835\uDD92\uD835\uDDAC\uD835\uDDC6\uD835\uDDE0\uD835\uDDFA\uD835\uDE14\uD835\uDE2E\uD835\uDE48\uD835\uDE62\uD835\uDE7C\uD835\uDE96\u24C2\u24DC\u2133\u041C\u039C\u1D0D\u043C\uAB87\uA4DF\u2C99\u13B7\u2C98\u1E3E\u1E3F\u1E40\u1E41\u1E42\u1E43\uD835\uDC0C\uD835\uDC26\uD835\uDC40\uD835\uDC5A\uD835\uDC74\uD835\uDC8E\uD835\uDCC2\uD835\uDCDC\uD835\uDCF6\uD835\uDD10\uD835\uDD2A\uD835\uDD44\uD835\uDD5E\uD835\uDD78\uD835\uDD92\uD835\uDDAC\uD835\uDDC6\uD835\uDDE0\uD835\uDDFA\uD835\uDE14\uD835\uDE2E\uD835\uDE48\uD835\uDE62\uD835\uDE7C\uD835\uDE96\uD835\uDEB3\uD835\uDEED\uD835\uDF27\uD835\uDF61\uD835\uDF9B\u1D39\u1D50\u2098\u216F\u217F"],["n","nN\uFF2E\uFF4E\uD835\uDC0D\uD835\uDC27\uD835\uDC41\uD835\uDC5B\uD835\uDC75\uD835\uDC8F\uD835\uDCA9\uD835\uDCC3\uD835\uDCDD\uD835\uDCF7\uD835\uDD11\uD835\uDD2B\uD835\uDD45\uD835\uDD5F\uD835\uDD79\uD835\uDD93\uD835\uDDAD\uD835\uDDC7\uD835\uDDE1\uD835\uDDFB\uD835\uDE15\uD835\uDE2F\uD835\uDE49\uD835\uDE63\uD835\uDE7D\uD835\uDE97\u24C3\u24DD\u2115\u039D\u0274\uA4E0\u0578\u2C9B\u0548\u2C9A\xD1\xF1\u0143\u0144\u0145\u0146\u0147\u0148\u01F8\u01F9\u1E44\u1E45\u1E46\u1E47\u1E48\u1E49\u1E4A\u1E4B\uD835\uDC0D\uD835\uDC27\uD835\uDC41\uD835\uDC5B\uD835\uDC75\uD835\uDC8F\uD835\uDCA9\uD835\uDCC3\uD835\uDCDD\uD835\uDCF7\uD835\uDD11\uD835\uDD2B\uD835\uDD5F\uD835\uDD79\uD835\uDD93\uD835\uDDAD\uD835\uDDC7\uD835\uDDE1\uD835\uDDFB\uD835\uDE15\uD835\uDE2F\uD835\uDE49\uD835\uDE63\uD835\uDE7D\uD835\uDE97\uD835\uDEB4\uD835\uDEEE\uD835\uDF28\uD835\uDF62\uD835\uDF9C\u1D3A\u1DB0\u207F\u2099"],["o","oO\uFF2F\uFF4F\uD835\uDC0E\uD835\uDC28\uD835\uDC42\uD835\uDC5C\uD835\uDC76\uD835\uDC90\uD835\uDCAA\uD835\uDCC4\uD835\uDCDE\uD835\uDCF8\uD835\uDD12\uD835\uDD2C\uD835\uDD46\uD835\uDD60\uD835\uDD7A\uD835\uDD94\uD835\uDDAE\uD835\uDDC8\uD835\uDDE2\uD835\uDDFC\uD835\uDE16\uD835\uDE30\uD835\uDE4A\uD835\uDE64\uD835\uDE7E\uD835\uDE98\u24C4\u24DE\u2134\u043E\u03BF\u1D0F\uA4F3\u0585\u2C9F\u041E\u039F\u0555\u2C9E\xD2\xD3\xD4\xD5\xD6\xF2\xF3\xF4\xF5\xF6\u014C\u014D\u014E\u014F\u0150\u0151\u01A0\u01A1\u01D1\u01D2\u01EA\u01EB\u01EC\u01ED\u020C\u020D\u020E\u020F\u022A\u022B\u022C\u022D\u022E\u022F\u0230\u0231\u1E4C\u1E4D\u1E4E\u1E4F\u1E50\u1E51\u1E52\u1E53\u1ECC\u1ECD\u1ECE\u1ECF\u1ED0\u1ED1\u1ED2\u1ED3\u1ED4\u1ED5\u1ED6\u1ED7\u1ED8\u1ED9\u1EDA\u1EDB\u1EDC\u1EDD\u1EDE\u1EDF\u1EE0\u1EE1\u1EE2\u1EE3\uD835\uDC0E\uD835\uDC28\uD835\uDC42\uD835\uDC5C\uD835\uDC76\uD835\uDC90\uD835\uDCAA\uD835\uDCDE\uD835\uDCF8\uD835\uDD12\uD835\uDD2C\uD835\uDD46\uD835\uDD60\uD835\uDD7A\uD835\uDD94\uD835\uDDAE\uD835\uDDC8\uD835\uDDE2\uD835\uDDFC\uD835\uDE16\uD835\uDE30\uD835\uDE4A\uD835\uDE64\uD835\uDE7E\uD835\uDE98\uD835\uDEB6\uD835\uDED0\uD835\uDEF0\uD835\uDF0A\uD835\uDF2A\uD835\uDF44\uD835\uDF64\uD835\uDF7E\uD835\uDF9E\uD835\uDFB8\u1D3C\u1D52\u2092"],["p","pP\uFF30\uFF50\uD835\uDC0F\uD835\uDC29\uD835\uDC43\uD835\uDC5D\uD835\uDC77\uD835\uDC91\uD835\uDCAB\uD835\uDCC5\uD835\uDCDF\uD835\uDCF9\uD835\uDD13\uD835\uDD2D\uD835\uDD47\uD835\uDD61\uD835\uDD7B\uD835\uDD95\uD835\uDDAF\uD835\uDDC9\uD835\uDDE3\uD835\uDDFD\uD835\uDE17\uD835\uDE31\uD835\uDE4B\uD835\uDE65\uD835\uDE7F\uD835\uDE99\u24C5\u24DF\u2119\u0440\u03C1\u1D18\uABB2\uA4D1\u2CA3\u0420\u03A1\u13E2\u2CA2\u1E54\u1E55\u1E56\u1E57\uD835\uDC0F\uD835\uDC29\uD835\uDC43\uD835\uDC5D\uD835\uDC77\uD835\uDC91\uD835\uDCAB\uD835\uDCC5\uD835\uDCDF\uD835\uDCF9\uD835\uDD13\uD835\uDD2D\uD835\uDD61\uD835\uDD7B\uD835\uDD95\uD835\uDDAF\uD835\uDDC9\uD835\uDDE3\uD835\uDDFD\uD835\uDE17\uD835\uDE31\uD835\uDE4B\uD835\uDE65\uD835\uDE7F\uD835\uDE99\uD835\uDEB8\uD835\uDED2\uD835\uDEE0\uD835\uDEF2\uD835\uDF0C\uD835\uDF1A\uD835\uDF2C\uD835\uDF46\uD835\uDF54\uD835\uDF66\uD835\uDF80\uD835\uDF8E\uD835\uDFA0\uD835\uDFBA\uD835\uDFC8\u1D3E\u1D56\u1D68\u209A"],["q","qQ\uFF31\uFF51\uD835\uDC10\uD835\uDC2A\uD835\uDC44\uD835\uDC5E\uD835\uDC78\uD835\uDC92\uD835\uDCAC\uD835\uDCC6\uD835\uDCE0\uD835\uDCFA\uD835\uDD14\uD835\uDD2E\uD835\uDD48\uD835\uDD62\uD835\uDD7C\uD835\uDD96\uD835\uDDB0\uD835\uDDCA\uD835\uDDE4\uD835\uDDFE\uD835\uDE18\uD835\uDE32\uD835\uDE4C\uD835\uDE66\uD835\uDE80\uD835\uDE9A\u24C6\u24E0\u211A\u051B\u0566\u051A\u0536\uD835\uDC10\uD835\uDC2A\uD835\uDC44\uD835\uDC5E\uD835\uDC78\uD835\uDC92\uD835\uDCAC\uD835\uDCC6\uD835\uDCE0\uD835\uDCFA\uD835\uDD14\uD835\uDD2E\uD835\uDD62\uD835\uDD7C\uD835\uDD96\uD835\uDDB0\uD835\uDDCA\uD835\uDDE4\uD835\uDDFE\uD835\uDE18\uD835\uDE32\uD835\uDE4C\uD835\uDE66\uD835\uDE80\uD835\uDE9A\uA7F4"],["r","rR\uFF32\uFF52\uD835\uDC11\uD835\uDC2B\uD835\uDC45\uD835\uDC5F\uD835\uDC79\uD835\uDC93\uD835\uDCAD\uD835\uDCC7\uD835\uDCE1\uD835\uDCFB\uD835\uDD15\uD835\uDD2F\uD835\uDD49\uD835\uDD63\uD835\uDD7D\uD835\uDD97\uD835\uDDB1\uD835\uDDCB\uD835\uDDE5\uD835\uDDFF\uD835\uDE19\uD835\uDE33\uD835\uDE4D\uD835\uDE67\uD835\uDE81\uD835\uDE9B\u24C7\u24E1\u211B\u211C\u211D\u0280\uAB71\uABA2\uA4E3\u01A6\u13A1\u13D2\u0154\u0155\u0156\u0157\u0158\u0159\u0210\u0211\u0212\u0213\u1E58\u1E59\u1E5A\u1E5B\u1E5C\u1E5D\u1E5E\u1E5F\uD835\uDC11\uD835\uDC2B\uD835\uDC45\uD835\uDC5F\uD835\uDC79\uD835\uDC93\uD835\uDCC7\uD835\uDCE1\uD835\uDCFB\uD835\uDD2F\uD835\uDD63\uD835\uDD7D\uD835\uDD97\uD835\uDDB1\uD835\uDDCB\uD835\uDDE5\uD835\uDDFF\uD835\uDE19\uD835\uDE33\uD835\uDE4D\uD835\uDE67\uD835\uDE81\uD835\uDE9B\u02B3\u1D3F\u1D63"],["s","sS\uFF33\uFF53\uD835\uDC12\uD835\uDC2C\uD835\uDC46\uD835\uDC60\uD835\uDC7A\uD835\uDC94\uD835\uDCAE\uD835\uDCC8\uD835\uDCE2\uD835\uDCFC\uD835\uDD16\uD835\uDD30\uD835\uDD4A\uD835\uDD64\uD835\uDD7E\uD835\uDD98\uD835\uDDB2\uD835\uDDCC\uD835\uDDE6\uD835\uDE00\uD835\uDE1A\uD835\uDE34\uD835\uDE4E\uD835\uDE68\uD835\uDE82\uD835\uDE9C\u24C8\u24E2\u0455\uA731\uABAA\uA4E2\u0405\u13DA\u015A\u015B\u015C\u015D\u015E\u015F\u0160\u0161\u017F\u0218\u0219\u1E60\u1E61\u1E62\u1E63\u1E64\u1E65\u1E66\u1E67\u1E68\u1E69\u1E9B\uD835\uDC12\uD835\uDC2C\uD835\uDC46\uD835\uDC60\uD835\uDC7A\uD835\uDC94\uD835\uDCAE\uD835\uDCC8\uD835\uDCE2\uD835\uDCFC\uD835\uDD16\uD835\uDD30\uD835\uDD4A\uD835\uDD64\uD835\uDD7E\uD835\uDD98\uD835\uDDB2\uD835\uDDCC\uD835\uDDE6\uD835\uDE00\uD835\uDE1A\uD835\uDE34\uD835\uDE4E\uD835\uDE68\uD835\uDE82\uD835\uDE9C\u02E2\u209B\uA7F1"],["t","tT\uFF34\uFF54\uD835\uDC13\uD835\uDC2D\uD835\uDC47\uD835\uDC61\uD835\uDC7B\uD835\uDC95\uD835\uDCAF\uD835\uDCC9\uD835\uDCE3\uD835\uDCFD\uD835\uDD17\uD835\uDD31\uD835\uDD4B\uD835\uDD65\uD835\uDD7F\uD835\uDD99\uD835\uDDB3\uD835\uDDCD\uD835\uDDE7\uD835\uDE01\uD835\uDE1B\uD835\uDE35\uD835\uDE4F\uD835\uDE69\uD835\uDE83\uD835\uDE9D\u24C9\u24E3\u0422\u03C4\u1D1B\u0442\uAB72\uA4D4\u2CA7\u03A4\u13A2\u2CA6\u0162\u0163\u0164\u0165\u021A\u021B\u1E6A\u1E6B\u1E6C\u1E6D\u1E6E\u1E6F\u1E70\u1E71\u1E97\uD835\uDC13\uD835\uDC2D\uD835\uDC47\uD835\uDC61\uD835\uDC7B\uD835\uDC95\uD835\uDCAF\uD835\uDCC9\uD835\uDCE3\uD835\uDCFD\uD835\uDD17\uD835\uDD31\uD835\uDD4B\uD835\uDD65\uD835\uDD7F\uD835\uDD99\uD835\uDDB3\uD835\uDDCD\uD835\uDDE7\uD835\uDE01\uD835\uDE1B\uD835\uDE35\uD835\uDE4F\uD835\uDE69\uD835\uDE83\uD835\uDE9D\uD835\uDEBB\uD835\uDED5\uD835\uDEF5\uD835\uDF0F\uD835\uDF2F\uD835\uDF49\uD835\uDF69\uD835\uDF83\uD835\uDFA3\uD835\uDFBD\u1D40\u1D57\u209C"],["u","uU\uFF35\uFF55\uD835\uDC14\uD835\uDC2E\uD835\uDC48\uD835\uDC62\uD835\uDC7C\uD835\uDC96\uD835\uDCB0\uD835\uDCCA\uD835\uDCE4\uD835\uDCFE\uD835\uDD18\uD835\uDD32\uD835\uDD4C\uD835\uDD66\uD835\uDD80\uD835\uDD9A\uD835\uDDB4\uD835\uDDCE\uD835\uDDE8\uD835\uDE02\uD835\uDE1C\uD835\uDE36\uD835\uDE50\uD835\uDE6A\uD835\uDE84\uD835\uDE9E\u24CA\u24E4\u03C5\u1D1C\uAB9C\uA4F4\u057D\u13CC\u054D\xD9\xDA\xDB\xDC\xF9\xFA\xFB\xFC\u0168\u0169\u016A\u016B\u016C\u016D\u016E\u016F\u0170\u0171\u0172\u0173\u01AF\u01B0\u01D3\u01D4\u01D5\u01D6\u01D7\u01D8\u01D9\u01DA\u01DB\u01DC\u0214\u0215\u0216\u0217\u1E72\u1E73\u1E74\u1E75\u1E76\u1E77\u1E78\u1E79\u1E7A\u1E7B\u1EE4\u1EE5\u1EE6\u1EE7\u1EE8\u1EE9\u1EEA\u1EEB\u1EEC\u1EED\u1EEE\u1EEF\u1EF0\u1EF1\uD835\uDC14\uD835\uDC2E\uD835\uDC48\uD835\uDC62\uD835\uDC7C\uD835\uDC96\uD835\uDCB0\uD835\uDCCA\uD835\uDCE4\uD835\uDCFE\uD835\uDD18\uD835\uDD32\uD835\uDD4C\uD835\uDD66\uD835\uDD80\uD835\uDD9A\uD835\uDDB4\uD835\uDDCE\uD835\uDDE8\uD835\uDE02\uD835\uDE1C\uD835\uDE36\uD835\uDE50\uD835\uDE6A\uD835\uDE84\uD835\uDE9E\uD835\uDED6\uD835\uDF10\uD835\uDF4A\uD835\uDF84\uD835\uDFBE\u1D41\u1D58\u1D64\u1DB8"],["v","vV\uFF36\uFF56\uD835\uDC15\uD835\uDC2F\uD835\uDC49\uD835\uDC63\uD835\uDC7D\uD835\uDC97\uD835\uDCB1\uD835\uDCCB\uD835\uDCE5\uD835\uDCFF\uD835\uDD19\uD835\uDD33\uD835\uDD4D\uD835\uDD67\uD835\uDD81\uD835\uDD9B\uD835\uDDB5\uD835\uDDCF\uD835\uDDE9\uD835\uDE03\uD835\uDE1D\uD835\uDE37\uD835\uDE51\uD835\uDE6B\uD835\uDE85\uD835\uDE9F\u24CB\u24E5\u03BD\u1D20\u0475\uABA9\uA4E6\u0474\u13D9\u1E7C\u1E7D\u1E7E\u1E7F\uD835\uDC15\uD835\uDC2F\uD835\uDC49\uD835\uDC63\uD835\uDC7D\uD835\uDC97\uD835\uDCB1\uD835\uDCCB\uD835\uDCE5\uD835\uDCFF\uD835\uDD19\uD835\uDD33\uD835\uDD4D\uD835\uDD67\uD835\uDD81\uD835\uDD9B\uD835\uDDB5\uD835\uDDCF\uD835\uDDE9\uD835\uDE03\uD835\uDE1D\uD835\uDE37\uD835\uDE51\uD835\uDE6B\uD835\uDE85\uD835\uDE9F\uD835\uDECE\uD835\uDF08\uD835\uDF42\uD835\uDF7C\uD835\uDFB6\u1D5B\u1D65\u2164\u2174"],["w","wW\uFF37\uFF57\uD835\uDC16\uD835\uDC30\uD835\uDC4A\uD835\uDC64\uD835\uDC7E\uD835\uDC98\uD835\uDCB2\uD835\uDCCC\uD835\uDCE6\uD835\uDD00\uD835\uDD1A\uD835\uDD34\uD835\uDD4E\uD835\uDD68\uD835\uDD82\uD835\uDD9C\uD835\uDDB6\uD835\uDDD0\uD835\uDDEA\uD835\uDE04\uD835\uDE1E\uD835\uDE38\uD835\uDE52\uD835\uDE6C\uD835\uDE86\uD835\uDEA0\u24CC\u24E6\u051D\u1D21\uAB83\uABA4\uA4EA\u051C\u13B3\u13D4\u0174\u0175\u1E80\u1E81\u1E82\u1E83\u1E84\u1E85\u1E86\u1E87\u1E88\u1E89\u1E98\uD835\uDC16\uD835\uDC30\uD835\uDC4A\uD835\uDC64\uD835\uDC7E\uD835\uDC98\uD835\uDCB2\uD835\uDCCC\uD835\uDCE6\uD835\uDD00\uD835\uDD1A\uD835\uDD34\uD835\uDD4E\uD835\uDD68\uD835\uDD82\uD835\uDD9C\uD835\uDDB6\uD835\uDDD0\uD835\uDDEA\uD835\uDE04\uD835\uDE1E\uD835\uDE38\uD835\uDE52\uD835\uDE6C\uD835\uDE86\uD835\uDEA0\u02B7\u1D42"],["x","xX\uFF38\uFF58\uD835\uDC17\uD835\uDC31\uD835\uDC4B\uD835\uDC65\uD835\uDC7F\uD835\uDC99\uD835\uDCB3\uD835\uDCCD\uD835\uDCE7\uD835\uDD01\uD835\uDD1B\uD835\uDD35\uD835\uDD4F\uD835\uDD69\uD835\uDD83\uD835\uDD9D\uD835\uDDB7\uD835\uDDD1\uD835\uDDEB\uD835\uDE05\uD835\uDE1F\uD835\uDE39\uD835\uDE53\uD835\uDE6D\uD835\uDE87\uD835\uDEA1\u24CD\u24E7\u0445\u03C7\uA4EB\u2CAD\u0425\u03A7\u2CAC\u1E8A\u1E8B\u1E8C\u1E8D\uD835\uDC17\uD835\uDC31\uD835\uDC4B\uD835\uDC65\uD835\uDC7F\uD835\uDC99\uD835\uDCB3\uD835\uDCCD\uD835\uDCE7\uD835\uDD01\uD835\uDD1B\uD835\uDD35\uD835\uDD4F\uD835\uDD69\uD835\uDD83\uD835\uDD9D\uD835\uDDB7\uD835\uDDD1\uD835\uDDEB\uD835\uDE05\uD835\uDE1F\uD835\uDE39\uD835\uDE53\uD835\uDE6D\uD835\uDE87\uD835\uDEA1\uD835\uDEBE\uD835\uDED8\uD835\uDEF8\uD835\uDF12\uD835\uDF32\uD835\uDF4C\uD835\uDF6C\uD835\uDF86\uD835\uDFA6\uD835\uDFC0\u02E3\u1D61\u1D6A\u2093\u2169\u2179"],["y","yY\uFF39\uFF59\uD835\uDC18\uD835\uDC32\uD835\uDC4C\uD835\uDC66\uD835\uDC80\uD835\uDC9A\uD835\uDCB4\uD835\uDCCE\uD835\uDCE8\uD835\uDD02\uD835\uDD1C\uD835\uDD36\uD835\uDD50\uD835\uDD6A\uD835\uDD84\uD835\uDD9E\uD835\uDDB8\uD835\uDDD2\uD835\uDDEC\uD835\uDE06\uD835\uDE20\uD835\uDE3A\uD835\uDE54\uD835\uDE6E\uD835\uDE88\uD835\uDEA2\u24CE\u24E8\u0443\u03A5\u028F\uAB79\uA4EC\u2CA9\u0423\u13A9\u2CA8\xDD\xFD\xFF\u0176\u0177\u0178\u0232\u0233\u1E8E\u1E8F\u1E99\u1EF2\u1EF3\u1EF4\u1EF5\u1EF6\u1EF7\u1EF8\u1EF9\uD835\uDC18\uD835\uDC32\uD835\uDC4C\uD835\uDC66\uD835\uDC80\uD835\uDC9A\uD835\uDCB4\uD835\uDCCE\uD835\uDCE8\uD835\uDD02\uD835\uDD1C\uD835\uDD36\uD835\uDD50\uD835\uDD6A\uD835\uDD84\uD835\uDD9E\uD835\uDDB8\uD835\uDDD2\uD835\uDDEC\uD835\uDE06\uD835\uDE20\uD835\uDE3A\uD835\uDE54\uD835\uDE6E\uD835\uDE88\uD835\uDEA2\uD835\uDEBC\uD835\uDEF6\uD835\uDF30\uD835\uDF6A\uD835\uDFA4\u02B8"],["z","zZ\uFF3A\uFF5A\uD835\uDC19\uD835\uDC33\uD835\uDC4D\uD835\uDC67\uD835\uDC81\uD835\uDC9B\uD835\uDCB5\uD835\uDCCF\uD835\uDCE9\uD835\uDD03\uD835\uDD1D\uD835\uDD37\uD835\uDD51\uD835\uDD6B\uD835\uDD85\uD835\uDD9F\uD835\uDDB9\uD835\uDDD3\uD835\uDDED\uD835\uDE07\uD835\uDE21\uD835\uDE3B\uD835\uDE55\uD835\uDE6F\uD835\uDE89\uD835\uDEA3\u24CF\u24E9\u2124\u2128\u0396\u1D22\uAB93\uA4DC\u2C8D\u13C3\u2C8C\u0179\u017A\u017B\u017C\u017D\u017E\u1E90\u1E91\u1E92\u1E93\u1E94\u1E95\uD835\uDC19\uD835\uDC33\uD835\uDC4D\uD835\uDC67\uD835\uDC81\uD835\uDC9B\uD835\uDCB5\uD835\uDCCF\uD835\uDCE9\uD835\uDD03\uD835\uDD37\uD835\uDD6B\uD835\uDD85\uD835\uDD9F\uD835\uDDB9\uD835\uDDD3\uD835\uDDED\uD835\uDE07\uD835\uDE21\uD835\uDE3B\uD835\uDE55\uD835\uDE6F\uD835\uDE89\uD835\uDEA3\uD835\uDEAD\uD835\uDEE7\uD835\uDF21\uD835\uDF5B\uD835\uDF95\u1DBB"]]);
function $t(u){return u.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}
function No(u){return $t(u).replaceAll('"',"&quot;").replaceAll("'","&apos;")}
var U9n="\\u00ad\\u034f\\u0600-\\u0605\\u061c\\u06dd\\u070f\\u0890\\u0891\\u08e2\\u115f\\u1160\\u17b4\\u17b5\\u180b-\\u180f\\u200b-\\u200f\\u202a-\\u202e\\u2060-\\u206f\\u3164\\ufe00-\\ufe0f\\ufeff\\uffa0\\ufff0-\\ufffb\\u{110bd}\\u{110cd}\\u{13430}-\\u{1343f}\\u{1bca0}-\\u{1bca3}\\u{1d173}-\\u{1d17a}\\u{16fe4}\\u{e0000}-\\u{e0fff}";
var O={"\uFF1C":"<","\uFF1E":">","\uFE64":"<","\uFE65":">","\u2329":"<","\u232A":">","\u27E8":"<","\u27E9":">","\u3008":"<","\u3009":">","\u2039":"<","\u203A":">","\u02C2":"<","\u02C3":">","\u1438":"<","\u1433":">","\u276C":"<","\u276D":">","\u276E":"<","\u276F":">","\u2770":"<","\u2771":">","\u29FC":"<","\u29FD":">","\u226E":"<","\u226F":">","\u227A":"<","\u227B":">","\u22D6":"<","\u22D7":">","\uFF0F":"/","\u2215":"/","\u2044":"/"};
var V="\\u0300-\\u0344\\u0346-\\u036f\\u0483-\\u0489\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u064b-\\u065f\\u0670\\u06d6-\\u06dc\\u06df-\\u06e4\\u06e7\\u06e8\\u06ea-\\u06ed\\u1ab0-\\u1aff\\u1dc0-\\u1dff\\u20d0-\\u20ff\\u3099\\u309a\\ufe20-\\ufe2f";
var x=`${U9n}${V}\\x00-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f-\\x9f\\u2028\\u2029`;
var uu="\\x0b\\x0c\\x1c-\\x1f\\x85\\u2028\\u2029\\u115f\\u1160\\u3164\\uffa0";
var C="A-Za-z0-9_\\-";
var z=`(?:[^${C}]|$)`;
var Cmt="\\p{Pd}\\u2212\\u207b\\u208b\\u02d7\\u2796\\u2043\\u30fc\\uff70";
var oxe=":\\uff1a\\ufe55\\ufe13\\ua789\\u2236\\u02d0\\u02f8\\u05c3\\u0589\\u0703\\u0704\\u16ec\\u1803\\u1809\\u205a\\ua4fd\\ufe30";
var F="=\\u207c\\u208c\\ufe66\\uff1d\\ua78a\\u2550\\u268c\\ua4ff\\u{1f7f0}";
var B="\u2E40\u30A0\u1400";
var U=`\\s\\u2800${x}`;
var B9n=`_\\p{Pc}\\u2017\\u02cd\\u07fa\\u0640${Cmt}`;
var G=`[${B9n}]`;
var i=(()=>{let u={"<":"<",">":">","/":"/"};for(let[d,e]of Object.entries(O))u[e]+=d;return{open:u["<"],close:u[">"],slash:u["/"],filler:`^${C}${u["<"]}${u[">"]}`,lookalikePattern:new RegExp(`[${Object.keys(O).join("")}]`,"g"),invisiblePattern:new RegExp(`[${U9n}]`,"gu")}})();
function sxe(u,d){return`(?=([${u}]*))(?:\\${d})`}
function Amt(u){return sxe(x,u)}
var _=new Map;
var du=64;
function h(u,d){let e=`${d?"/":""}${u}`,a=_.get(e);if(a)return a;let c=H({tags:[u],closeOnly:d,fillerClass:i.filler,spell:(n)=>n==="-"||n==="_"?G:n,tail:void 0});if(_.size>=du)_.clear();return _.set(e,c),c}
function H({tags:u,closeOnly:d,fillerClass:e,spell:a,tail:c}){let{open:n,slash:f}=i,t=0,o=d?`${sxe(`${e}${f}`,++t)}[${f}]${sxe(e,++t)}`:sxe(e,++t),r=u.map((l)=>[...l].map((p,s)=>(s===0?"":Amt(++t))+a(p)).join("")),b=c===void 0?z:`${Amt(++t)}${c}`;return new RegExp(`[${n}](?!\\\\)(?=${o}(?:${r.join("|")})${b})`,"giu")}
function V1e(u,d){return d.replace(h(u,!1),"<\\")}
var M={"\u0430":"a","\u0435":"e","\u043E":"o","\u0440":"p","\u0441":"c","\u0443":"y","\u0445":"x","\u043A":"k","\u0456":"i","\u0458":"j","\u0455":"s","\u0501":"d","\u051B":"q","\u051D":"w","\u04BB":"h","\u04CF":"l","\u0412":"b","\u041C":"m","\u041D":"h","\u0422":"t","\u03B1":"a","\u03B5":"e","\u03B9":"i","\u03BA":"k","\u03BD":"v","\u03BF":"o","\u03C1":"p","\u03C4":"t","\u03C5":"u","\u03C7":"x","\u03F3":"j","\u0392":"b","\u0396":"z","\u0397":"h","\u039C":"m","\u039D":"n","\u03A5":"y","\u1D00":"a","\u0299":"b","\u1D04":"c","\u1D05":"d","\u1D07":"e","\uA730":"f","\u0262":"g","\u029C":"h","\u026A":"i","\u1D0A":"j","\u1D0B":"k","\u029F":"l","\u1D0D":"m","\u0274":"n","\u1D0F":"o","\u1D18":"p","\u0280":"r","\uA731":"s","\u1D1B":"t","\u1D1C":"u","\u1D20":"v","\u1D21":"w","\u028F":"y","\u1D22":"z","\u0251":"a","\u0261":"g","\u0131":"i","\u0475":"v","\u0442":"t","\u043C":"m","\uAB70":"d","\uAB71":"r","\uAB72":"t","\uAB79":"y","\uAB7A":"a","\uAB7B":"j","\uAB7C":"e","\uAB83":"w","\uAB87":"m","\uAB8B":"h","\uAB90":"g","\uAB92":"h","\uAB93":"z","\uAB9C":"u","\uAB9F":"b","\uABA2":"r","\uABA4":"w","\uABA9":"v","\uABAA":"s","\uABAE":"l","\uABAF":"c","\uABB2":"p","\uABB6":"k","\uABB7":"d","\u13FC":"b","\uA4D0":"b","\uA4D1":"p","\uA4D3":"d","\uA4D4":"t","\uA4D6":"g","\uA4D7":"k","\uA4D9":"j","\uA4DA":"c","\uA4DC":"z","\uA4DD":"f","\uA4DF":"m","\uA4E0":"n","\uA4E1":"l","\uA4E2":"s","\uA4E3":"r","\uA4E6":"v","\uA4E7":"h","\uA4EA":"w","\uA4EB":"x","\uA4EC":"y","\uA4EE":"a","\uA4F0":"e","\uA4F2":"i","\uA4F3":"o","\uA4F4":"u","\u0566":"q","\u0570":"h","\u0578":"n","\u057D":"u","\u0581":"g","\u0585":"o","\u03F2":"c","\u2CA5":"c","\u0269":"i","\u2C81":"a","\u2C83":"b","\u2C89":"e","\u2C8F":"h","\u2C93":"i","\u2C95":"k","\u2C99":"m","\u2C9B":"n","\u2C9F":"o","\u2CA3":"p","\u2CA7":"t","\u2CA9":"y","\u2CAD":"x","\u2C8D":"z"};
var eu=(()=>{let u={...M};for(let[d,e]of Object.entries(M)){let a=d.toUpperCase();if(a!==d&&[...a].length===1&&!(a in u)&&!/^[A-Za-z]$/.test(a))u[a]=e}return{table:u,pattern:new RegExp(`[${Object.keys(u).join("")}]`,"gu")}})();
function wYe(u){let{table:d,pattern:e}=eu,a=(c)=>c.replace(e,(n)=>d[n]??n);return a(au(a(u)).normalize("NFKC"))}
function au(u){return u.normalize("NFKD").replace(/\p{M}+/gu,"")}
function PWr({name:u,close:d,span:e=(c)=>`[^${d}]{0,${c}}`,assign:a=(c)=>`${c}(?=(?<assignGap>[${U}]*))\\k<assignGap>[${F}${B}]`}){return`(?:(?![${u}])|(?<=[${uu}][${x}]*))${e(120)}(?<![\\w-])${a("source")}`}
var fu=/[\u0080-\u{10ffff}]/u;
var cu=new RegExp(`[${i.open}]`,"u");
var nu=new RegExp(`[${Cmt}]`,"gu");
var tu=new RegExp(`^[${B9n}]$`,"u");
var ru=String.fromCharCode(65533);
var y=57344;
var ou=y+32;
var su=y+126;
var P=57856;
var v=P+32;
var K=P+126;
var I=`${String.fromCharCode(v)}-${String.fromCharCode(K)}`;
var X=["nv","uy"];
var S=57600;
var bu=S+255;
var k=String.fromCharCode(S+240);
var T=new Map;
var iu=32768;
var q=new Uint8Array(4352);
var m;
function A(u){return String.fromCharCode(y+u.charCodeAt(0))}
function L(u){return String.fromCharCode(P+u.charCodeAt(0))}
function lu(u){let d=T.get(u);if(d!==void 0)return d;let e=W(u);if(T.size>=iu)T.clear();return T.set(u,e),e}
function W(u){let d=u.codePointAt(0),e=u;if(d>=ou&&d<=su||d>=v&&d<=K||d>=S&&d<=bu)e=ru;else if(B.includes(u))e=k;else{if(m===void 0){m=new Map;for(let[f,t]of N)for(let o of t)m.set(o,f)}let a=new Set;for(let f of[u,u.toLowerCase(),u.toUpperCase(),u.toUpperCase().toLowerCase(),u.toLowerCase().toUpperCase()]){let t=m.get(f);if(t!==void 0)a.add(t)}let c=[...a].sort().join(""),n=c||wYe(u).replace(nu,"-").toLowerCase().replace(/\u00DF/g,"ss");if(a.size>1){let f=X.indexOf(c);e=f===-1?A(c):String.fromCharCode(S+f)}else if(/^[a-z0-9_-]+$/.test(n))e=[...n].map((f,t)=>t===0?A(f):L(f)).join("");else if(tu.test(u))e=A("_")}return e}
var gu=256;
function pu(u){let d=1;for(let e=Math.max(u<<8,128);e<u+1<<8;e++){let a=String.fromCodePoint(e);if(W(a)!==a){d=2;break}}return q[u]=d,d}
function Au(u){if(/^[a-z0-9]$/.test(u)){let d=X.flatMap((e,a)=>e.includes(u)?[String.fromCharCode(S+a)]:[]);return`[${u}${A(u)}${L(u)}${d.join("")}]`}if(u==="-"||u==="_")return`[_\\-${A("_")}${A("-")}${L("_")}${L("-")}${k}]`;throw Error("createTagFormScrub: tag names are lowercase [a-z0-9_-]")}
function Eu({tags:u,tail:d}){let{open:e,close:a,filler:c}=i,n=0,f=(r)=>[...r].map((b,l)=>(l===0?"":Amt(++n))+Au(b)).join(""),t=u.map(f),o=d===void 0?z:`${Amt(++n)}${d({name:C,close:a,colon:oxe,span:(r)=>`[${I}]*(?:[^${a}${I}][${I}]*){0,${r}}`,spell:f,assign:(r)=>`${f(r)}${sxe(U,++n)}[${F}${k}]`})}`;return new RegExp(`[${e}](?!\\\\)(?=[${c}]*?(?:${t.join("|")})${o})`,"giu")}
function HWr(u){let d=u.filter((e)=>e.tags.length>0).map(Eu);return{openerOffsets(e){return D(e,d)},neutralize(e){let a="",c=0;for(let n of D(e,d))a+=`${e.slice(c,n)}<\\`,c=n+1;return a+e.slice(c)}}}
function Su(u){let d=[],e=[],a,c="",n=0;for(let f=0;f<u.length;f++){let t=u.charCodeAt(f);if(t<128)continue;let o=u.charCodeAt(f+1),r=t>=55296&&t<=56319&&o>=56320&&o<=57343?2:1,b=(r===2?u.codePointAt(f):t)>>8,l=q[b];if(l===0){if(a??=new Uint16Array(4352),++a[b]>=gu)l=pu(b)}if(l===1){f+=r-1;continue}let p=lu(u.slice(f,f+r));if(c+=u.slice(n,f)+p,n=f+r,p.length!==r)d.push(c.length),e.push(p.length-r+(e.at(-1)??0));f+=r-1}return c+=u.slice(n),{reading:c,offsetInText(f){let t=0,o=d.length;while(t<o){let r=t+o>>1;if(d[r]<=f)t=r+1;else o=r}return t===0?f:f-e[t-1]}}}
function D(u,d){if(!cu.test(u))return[];let e=fu.test(u)?Su(u):void 0,a=e?.reading??u,c=new Set;for(let n of d)for(let f of a.matchAll(n))c.add(e?e.offsetInText(f.index):f.index);return[...c].sort((n,f)=>n-f)}
return {No,$t,HWr,Eu,i,O,C,U9n,Amt,sxe,x,V,Au,X,S,A,y,L,P,k,z,oxe,I,v,K,U,F,D,cu,fu,Su,q,gu,pu,W,ou,su,bu,ru,B,m,N,wYe,eu,M,au,nu,Cmt,tu,B9n,lu,T,iu,PWr,uu,V1e,h,_,H,G,du};
},
"chunk-zegtp56y.js": ({neutralizeMemoryContent287}) => {
function iq(t){return neutralizeMemoryContent287(t)}
function T$e(t){return iq(t.replace(/[\t\n\r\u2028\u2029]/g,""))}
var R1r=new Set([8204,8205,65038,65039]);
var i=/^[\p{Cf}\p{Co}\p{Cn}\p{Cs}\p{DI}]$/u;
function D9e(t){let r=t.codePointAt(0);if(R1r.has(r)||r===9||r===10||r===13)return!1;return i.test(t)||r<32||r>=127&&r<=159}
function s(t){let r="";for(let n of t.replace(/\r\n?|[\u2028\u2029]/g,`
`)){if(D9e(n))continue;r+=n}return r}
return {T$e,iq,s,D9e,R1r,i};
},
"chunk-v9v7yqrh.js": ({HWr,PWr,a0,jJ}) => {
var B;
function K(){return B??=HWr([{tags:jJ.filter((e)=>e!==a0)},{tags:[a0],tail:PWr},{tags:["antml"],tail:({colon:e})=>`[${e}]`}]),B}
function VRe(e){return K().neutralize(e)}
return {VRe,K,B};
},
"chunk-zwbw6dvp.js": ({}) => {
var jXe="cowritten-artifact-html";
var EPe="artifact-file-content";
var Tue="artifact-type-instructions";
var vPe="artifact-origin-notes";
var oht="artifact-stored-declaration";
var mf="command-name";
var bm="command-message";
var FSe="command-args";
var sht="bash-input";
var noe="bash-stdout";
var S1="bash-stderr";
var _7n="bash-exit-code";
var kd="local-command-stdout";
var wp="local-command-stderr";
var F2="local-command-caveat";
var xBe=[sht,noe,S1,_7n,kd,wp,F2];
var m3="tick";
var _u="task-notification";
var jSn="remote-review";
var qN="teammate-message";
var a0="channel";
var U2="cross-session-message";
var D="slack-ping";
var x="slack-tag-message";
var Djt="agent-message";
var CPe="fetched-web-content";
var cht="coordinator-relay";
var APe=[_u,Djt,qN,U2,jSn,D,x,m3,CPe,cht,Tue,jXe,EPe,vPe,oht];
var jJ=[...xBe,mf,bm,FSe,...APe,a0,"system-reminder","system_reminder","function_results","tool_use_error","sandbox_violations","persisted-output","total_tokens","user-prompt-submit-hook"];
return {jJ,xBe,sht,noe,S1,_7n,kd,wp,F2,mf,bm,FSe,APe,_u,Djt,qN,U2,jSn,D,x,m3,CPe,cht,Tue,jXe,EPe,vPe,oht,a0};
},
};
const cache=new Map();
function instantiate(file) {
if(cache.has(file)) return cache.get(file);
const inputs={};
switch(file) {
case "chunk-59zy4j10.js":
inputs["p"]=host["chunk-dsp1md5e.js"]["p"];
inputs["d"]=host["chunk-g4gq2k0z.js"]["d"];
inputs["k"]=host["chunk-g4gq2k0z.js"]["k"];
inputs["o"]=host["chunk-g4gq2k0z.js"]["o"];
inputs["G"]=host["chunk-g4gq2k0z.js"]["G"];
inputs["O"]=host["chunk-g4gq2k0z.js"]["O"];
inputs["Egt"]=host["chunk-g4gq2k0z.js"]["Egt"];
inputs["Oke"]=instantiate("chunk-hqp4xfxx.js")["Oke"];
inputs["F3n"]=instantiate("chunk-hqp4xfxx.js")["F3n"];
inputs["ji"]=host["chunk-59zy4j10.js"]["ji"];
inputs["ke"]=host["chunk-59zy4j10.js"]["ke"];
inputs["LLe"]=host["chunk-59zy4j10.js"]["LLe"];
break;
case "chunk-hqp4xfxx.js":
inputs["No"]=instantiate("chunk-vc06pma6.js")["No"];
inputs["T$e"]=instantiate("chunk-zegtp56y.js")["T$e"];
inputs["V1e"]=instantiate("chunk-vc06pma6.js")["V1e"];
inputs["iq"]=instantiate("chunk-zegtp56y.js")["iq"];
break;
case "chunk-vc06pma6.js":
break;
case "chunk-zegtp56y.js":
inputs["neutralizeMemoryContent287"]=neutralizeMemoryContent287;
break;
case "chunk-v9v7yqrh.js":
inputs["HWr"]=instantiate("chunk-vc06pma6.js")["HWr"];
inputs["jJ"]=instantiate("chunk-zwbw6dvp.js")["jJ"];
inputs["a0"]=instantiate("chunk-zwbw6dvp.js")["a0"];
inputs["PWr"]=instantiate("chunk-vc06pma6.js")["PWr"];
break;
case "chunk-zwbw6dvp.js":
break;
}
const result=factories[file](inputs); cache.set(file,result); return result;
}
const main=instantiate("chunk-59zy4j10.js"), formatter=instantiate("chunk-hqp4xfxx.js");
return {normalizers:main.normalizers, snapshotInstructions:main.Emo, readInstructions:main.JMn, diffInstructions:main.vmo, readSessionContext:main.XMn, readDate:main.wmo, sameSessionContext:main.bmo, formatInstructions:formatter.Oke, sanitizeMemoryContent:formatter.iq, contextSectionsSchema:main.LRt, coordinatorContextSchema:main.DRt};
}
