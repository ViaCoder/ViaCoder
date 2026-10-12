/** Complete original xge image callbacks; current state and same image owner supplied. */
export function createAskImageConsumer287({X,PC,Wt,nU,qt,Sme,bme,Yt}){
function No(lo,to,wo){if(!X()){return}let ko=PC(void 0,Wt[lo]);let so={id:ko,type:"image",content:to,mediaType:wo?.mediaType||"image/png",filename:wo?.filename||"Pasted image",dimensions:wo?.dimensions};let Ro=nU(qt,"storedImagePaths");Sme(so,Ro),bme(so,Ro),Yt((co)=>({...co,[lo]:{...co[lo]??{},[ko]:so}}))}
const Uo=(Wo,Eo)=>{if(!X()){return!1}Yt((Mo)=>{let zo={...Mo[Wo]??{}};return delete zo[Eo],{...Mo,[Wo]:zo}})};
return {No,Uo}
}
export function createAskQuestionSelection287({v,bn,gn,Ne,D,_e,Ve}){
function FZt(Ms){return Ms!=="__other__"}
const inputChanged=(An)=>{if(!v()){return!1}bn.current={question:gn,value:An},Ne(gn,{textInputValue:An},D.multiSelect??!1)};
const multiChanged=(nr)=>{if(!v()){return!1}Ne(gn,{selectedValue:nr},!0);let Dr=nr.includes("__other__")?bn.current?.question===gn?bn.current.value:_e[gn]?.textInputValue:void 0;let Br=nr.filter(FZt).concat(Dr?[Dr]:[]);Ve(gn,Br,void 0,!1)};
return {inputChanged,multiChanged}
}
