// Generated from fixed official 2.1.287; full raw m/a/K, no new state owner.
export function createKeybindingsText287(ports){
const {P,E,yr,Mg,_,ae,C0,mRe,R1e,Vq,i$t,i1r,ate,it,c,f}=ports;
function m(s){let r=new Set(mRe.map((e)=>R1e(e.key)));return s.map((e)=>{let t={};for(let[n,o]of Object.entries(e.bindings))if(!r.has(R1e(n)))t[n]=o;return{context:e.context,bindings:t}}).filter((e)=>Object.keys(e.bindings).length>0)}
function a(){let r={$schema:"https://www.schemastore.org/claude-code-keybindings.json",$docs:"https://code.claude.com/docs/en/keybindings",bindings:m(C0)};return _(r,null,2)+`
`}
async function K(s,r){if(!Vq())return{type:"text",value:"Keybinding customization is disabled in this environment."};let e=i$t(),t=!1,n=r.storageV5;if(n){let i=await n.write(i1r,a(),{precondition:{type:"ifAbsent"}});if(!i.ok)if(i.error.code==="AlreadyExists")t=!0;else throw new P(`keybindings template write failed: ${it(i.error)}`,"keybindings template write failed")}else{await ae().mkdir(f(e));try{await c(e,a(),{encoding:"utf-8",flag:"wx"})}catch(i){if(E(i)==="EEXIST")t=!0;else throw i}}let o=await ate(e);if(o.error)return{type:"text",value:`${t?"Opened":"Created"} ${e}. ${o.error}`};let d=yr()?` (Safe mode: custom keybindings are disabled this session \u2014 changes take effect after you ${Mg()}.)`:"";return{type:"text",value:t?`Opened ${e} in your editor.${d}`:`Created ${e} with template. Opened in your editor.${d}`}}
return {call:K,generateTemplate:a,filterReserved:m};
}
