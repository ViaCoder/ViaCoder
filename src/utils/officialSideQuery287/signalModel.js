// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQuerySignalModel287(ports){
const {Et,Fn,Moe,NPe,Z,_,a,cee,d,i,oee,rl,rs,st,t,y$}=ports;
var Wco="[claude-code:unrecognized_model]";
function Fre(e,n){try{if(n==="model_validation")return;if(NPe(e))return;let r=Fn(e);if(!rl().claim(`unrecognized-model-signal:${r}`))return;if(Moe(e)||Moe(r))return;i("tengu_api_unrecognized_model",{model:Et(e),querySource:rs(n)});let s=`${Wco} ${_({model:e,query_source:n})}`.replace(oee,"");if(cee()!==null&&a.CLAUDE_CODE_SESSION_KIND!=="bg")y$(`${s}
`);else t(s,{level:"warn"})}catch(r){d(st(Z(r),"unrecognized-model signal failed"))}};
return {Fre};
}
