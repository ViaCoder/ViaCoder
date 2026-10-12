/** Complete original plan image consumer; existing image owner supplied. */
export function createPlanImageConsumer287({PC,ze,pt,X,nU,Sme,bme}){
function Tn(nr,Dr){let Br=PC(void 0,ze),Or={id:Br,type:"image",content:nr,mediaType:Dr?.mediaType||"image/png",filename:Dr?.filename||"Pasted image",dimensions:Dr?.dimensions},vs=nU(X,"storedImagePaths");Sme(Or,vs),bme(Or,vs),pt((Dn)=>({...Dn,[Br]:Or}))}
return Tn
}
