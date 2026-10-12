// Fixed official 2.1.287 narrow complete /copy closure. See provenance.json.
export function createCopyCommand287(ports){
const {Qf,pi,Vt,le,i,ie,hpn,xw,Jg,U7,fo,e,Ce,Y}=ports;
var Q="response.md",Ee=20;
function Xe(o){let c=Qf.lexer(U7(o)),t=[];for(let a of c)if(a.type==="code"){let d=a;t.push({code:d.text,lang:d.lang})}return t}
function ce(o){return o.tokens.map((c)=>c.raw).join("")}
function ze(o){let c=[o.header.map(ce),...o.rows.map((m)=>m.map(ce))].map((m)=>m.map((u)=>u.replace(/\|/g,"\\|").replace(/[\r\n]/g," "))),t=c[0].map((m,u)=>Math.max(3,...c.map((h)=>ie(h[u]??"")))),a=(m)=>`| ${m.map((u,h)=>u+" ".repeat(Math.max(0,t[h]-ie(u)))).join(" | ")} |`,d=(m,u)=>{switch(u){case"center":return`:${pi("-",m-2)}:`;case"right":return`${pi("-",m-1)}:`;case"left":return`:${pi("-",m-1)}`;default:return"-".repeat(m)}},f=`| ${t.map((m,u)=>d(m,o.align[u]??null)).join(" | ")} |`,[l,...p]=c;return[a(l),f,...p.map(a)].join(`
`)}
function Ue(o){let c=Qf.lexer(o),t=o,a=0,d=0;for(let f of c){let l=o.indexOf(f.raw,a);if(l===-1)continue;if(a=l+f.raw.length,f.type!=="table")continue;let p=f.raw.match(/\n*$/)?.[0]??"",m=ze(f)+p;t=t.slice(0,l+d)+m+t.slice(l+f.raw.length+d),d+=m.length-f.raw.length}return t}
function Je(o){let c=[];for(let t=o.length-1;t>=0&&c.length<Ee;t--){let a=o[t];if(a?.type!=="assistant"||a.isApiErrorMessage)continue;let d=a.message.content;if(!Array.isArray(d))continue;let f=fo(d,`

`);if(f)c.push(f)}return c}
async function S(o,c){let t=await xw(o);if(t)process.stdout.write(t);let a=Vt(o,`
`)+1,f=`Copied to clipboard (${o.length} characters, ${a} lines)`,l=hpn(o);try{let p=await Y(o,c),m=l?`
\u26A0 ${l}; the file below is unaffected`:"";return`${f}${m}
Also written to ${p}`}catch{let p=l?`
\u26A0 ${l}`:"";return`${f}${p}`}}
var Wt=async(o,c,t)=>{let a=Je(c.messages);if(a.length===0)return o("No assistant message to copy"),null;let d=0,f=t?.trim();if(f){let u=Number(f);if(!Number.isInteger(u)||u<1)return o(`Usage: /copy [N] where N is 1 (latest), 2, 3, \u2026 Got: ${f}`),null;if(u>a.length)return o(`Only ${a.length} assistant ${a.length===1?"message":"messages"} available to copy`),null;d=u-1}let l=Ue(Jg(a[d])),p=Xe(l),m=le();if(p.length===0||m.copyFullResponse){i("tengu_copy",{always:m.copyFullResponse,block_count:p.length,message_age:d});let u=await S(l,Q);return o(u),null}return e(Ce,{fullText:l,codeBlocks:p,messageAge:d,onDone:o})};
return {call:Wt,copy:S,collect:Je};
}
