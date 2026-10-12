export function create(ports){const {requireOriginal287,importOriginal287,de,tWe,ke,me}=ports;
var P=104857600;
async function AZe(e){let{size:i}=await de(e);if(i<=P)return tWe(await ke(e));await using r=await me(e,"r");let n=Buffer.allocUnsafe(P),l=0,s=i-P;while(l<P){let{bytesRead:f}=await r.read(n,l,P-l,s+l);if(f===0)break;l+=f}let u=n.indexOf(10);if(u!==-1&&u<l-1)return tWe(n.subarray(u+1,l));return tWe(n.subarray(0,l))};
return {"P":P,"AZe":AZe};}
