// Original zOr xs/gi share the real commandQueue; Ge uses the same execution identity.
export function createAttachmentWakeQueue287(ports){const g=ports.commands,G=ports.count,n=ports.execution,c=ports.legacy,K=ports.notify,s=ports.log;
const q8e=ports.sourceBindings?.["q8e"];
const Y8e=ports.sourceBindings?.["Y8e"];
const Nmn=ports.sourceBindings?.["Nmn"];
const Bmn=ports.sourceBindings?.["Bmn"];
const R2n=ports.sourceBindings?.["R2n"];
const $mn=ports.sourceBindings?.["$mn"];
const eUo=ports.sourceBindings?.["eUo"];
const jmn=ports.sourceBindings?.["jmn"];
const P=ports.sourceBindings?.["P"];
const m=ports.sourceBindings?.["m"];
const j_e=ports.sourceBindings?.["j_e"];
const X1e=ports.sourceBindings?.["X1e"];
const oue=ports.sourceBindings?.["oue"];
const Q8e=ports.sourceBindings?.["Q8e"];
const lSe=ports.sourceBindings?.["lSe"];
const tb=ports.sourceBindings?.["tb"];
const YUr=ports.sourceBindings?.["YUr"];
async function br(Yo){dr(1);let{command:qr,delivered:Lr}=or(Yo,void 0);return g.push(qr),K(),s("enqueue",qr.pollEvent?.envelope),Lr}
async function xo(Yo){if(dr(Yo.length),Yo.length===0||Yo.length>X1e||Yo.some((nr)=>nr.wake===!1))throw m("poll_event_delivery","group_refused"),new P(`poll event rejected: a group holds 1 to ${X1e} events, none of them wake: false`,"poll event rejected: group shape");let qr=j_e(),Lr=Yo.map((nr)=>or(nr,qr)),Kr=Lr.reduce((nr,{command:hs})=>nr+Buffer.byteLength(hs.pollEvent?.envelope??"","utf8"),0);if(Kr>oue)throw m("poll_event_delivery","group_too_large"),new P(`poll event rejected: the group is ${Kr} bytes after nonce stamping (cap ${oue})`,"poll event rejected: group too large");let vr=Yo.reduce((nr,hs)=>nr+(hs.declared===void 0?0:Q8e(hs.declared.fields)),0);if(vr>oue)throw m("poll_event_delivery","group_too_large"),new P(`poll event rejected: the group's fields are ${vr} bytes as sent (cap ${oue})`,"poll event rejected: group too large");g.push(...Lr.map(({command:nr})=>nr)),K();for(let{command:nr}of Lr)s("enqueue",nr.pollEvent?.envelope);await Promise.all(Lr.map(({delivered:nr})=>nr))}
function dr(Yo){let qr=G(g,tb);if(qr+Yo>lSe)throw m("poll_event_delivery","queue_cap"),new P(Yo===1?`poll event rejected: ${lSe} events already queued`:`poll event rejected: the queue holds at most ${lSe} events (${qr} queued, ${Yo} arriving)`,"poll event rejected: queue depth cap")}
function or(Yo,qr){if(!q8e(Yo.kind))throw m("poll_event_delivery","invalid_kind"),new P("poll event rejected: invalid kind (a lowercase letter, then lowercase letters, digits and hyphens, at most 64 characters)","poll event rejected: invalid kind");if(Y8e(Yo.kind)&&Yo.allowReservedKind!==!0)throw m("poll_event_delivery","reserved_kind"),new P(`poll event rejected: kind "${Yo.kind}" is reserved for a trusted in-process producer`,"poll event rejected: reserved kind");let Lr,Kr="element",vr;if(Yo.element!==void 0){if(Yo.content!==void 0||Yo.declared!==void 0)throw Error("poll event: pass one of content, element, declared");let ua=Buffer.byteLength(Yo.element,"utf8");if(ua>Nmn(Yo.kind))throw m("poll_event_delivery","envelope_too_large"),new P(`poll event rejected: envelope is ${ua} bytes (cap ${Nmn(Yo.kind)})`,"poll event rejected: envelope too large");let Tl=Bmn(Yo.element);if(!Tl.ok)throw m("poll_event_delivery","validation_failed"),new P(`poll event rejected: ${Tl.reason}`,"poll event rejected: element failed validation");if(Tl.kind!==Yo.kind)throw m("poll_event_delivery","kind_mismatch"),new P(`poll event rejected: element kind "${Tl.kind}" does not match declared kind "${Yo.kind}"`,"poll event rejected: kind mismatch");Lr=Yo.element}else if(Yo.declared!==void 0){if(Yo.content!==void 0)throw Error("poll event: pass one of content, element, declared");let ua=R2n(Yo.declared);if(!ua.ok||Yo.declared.declaration.kind!==Yo.kind)throw m("poll_event_delivery","fields_invalid"),new P(`poll event rejected: ${ua.ok?"declaration is for another kind":ua.reason}`,"poll event rejected: fields failed validation");Lr=ua.envelope,Kr="json",vr={at:Yo.declared.at,fields:ua.fields}}else if(Yo.content!==void 0)Lr=$mn({kind:Yo.kind,at:new Date().toISOString(),content:Yo.content});else throw Error("poll event: content, element or declared is required");let nr=eUo();Lr=jmn(Lr,nr,Kr);let hs=Buffer.byteLength(Lr,"utf8");if(hs>Nmn(Yo.kind))throw m("poll_event_delivery","envelope_too_large"),new P(`poll event rejected: envelope is ${hs} bytes after nonce stamping (cap ${Nmn(Yo.kind)})`,"poll event rejected: envelope too large");let Rr=Yo.wake??!0,Vr,ti,oi=new Promise((ua,Tl)=>{Vr=ua,ti=Tl});return{command:{value:Lr,mode:"poll-event",agentId:Ge(),priority:Rr?"next":"later",uuid:j_e(),isMeta:!0,...!1,timestamp:new Date().toISOString(),pollEvent:{kind:Yo.kind,envelope:Lr,...!1,...Yo.media!==void 0&&Yo.media.length>0&&{media:Yo.media},...!1,...!1,...!1,wake:Rr,...!1,...!1,settleDelivered:Vr,settleDropped:ti,provenance:Yo.provenance,...vr!==void 0&&{declared:vr},...qr!==void 0&&{group:qr}}},delivered:oi}}
function Wr(){let Yo=g.filter(J1e);if(Yo.length===0)return{commands:[],remainingWakeCount:0};let qr=YUr(Yo),Lr=new Set(qr),Kr=g.filter((vr)=>!Lr.has(vr));g.length=0,g.push(...Kr),K();for(let vr of Lr)if(!vr.unlogged)s("dequeue");return{commands:qr,remainingWakeCount:gi()}}
function xs(Yo){let qr=G(Yo,(Lr)=>Lr.pollEvent?.wake===!0);return Math.max(0,gi()-qr)}
function gi(){return G(g,(Yo)=>J1e(Yo)&&Yo.pollEvent?.wake===!0)}
function J1e(e){return e.mode==="poll-event"&&e.agentId===Ge()}
function eYe(e){for(let n of e)n.pollEvent?.settleDelivered?.()}
function vre(e,n){let r=!1;for(let s of e){if(s.pollEvent===void 0)continue;r=!0,s.pollEvent.settleDropped?.(new P(`poll event discarded undelivered: ${n}`,"poll event discarded undelivered"))}if(r)m("poll_event_delivery","discarded")}
function Ge(){let e=c()?.sessionId;if(e)return yo(e);let t=n();return t.identity.mainAgentId(t.id)}
function yo(t){return t}
return {countRemainingWakePollEventsAfter:xs,countWakePollEvents:gi,currentAgentId:Ge,enqueuePollEvent:br,enqueuePollEventGroup:xo,takeWakePollEvents:Wr,settleDelivered:eYe,settleDropped:vre,selectPollEvents:YUr};}
