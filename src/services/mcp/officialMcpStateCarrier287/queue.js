// Complete original fbe Uo/Do/bo closures; existing owner refs and Ink clock.
export function useMcpQueuedUpdates287(ports){
const {ce,Ie,Mo,zo,gr,Ike,to,Ro,Ct,Ut,tZe}=ports,Eo=16;
let Uo=ce(()=>{zo.current=null;let Zt=Mo.current;if(Zt.length===0)return;Mo.current=[],Ie.applyQueuedUpdates(Zt,{currentEpoch:gr(),onDoorDenied:Ike,onOrphanedDisable:(gn)=>{to.current.delete(gn),Ro.current.delete(gn);let Jo=Ct.current.get(gn);if(Jo)Jo(),Ct.current.delete(gn)}})},[Ie]),Do=ce((Zt)=>{if(Mo.current.push({...Zt,epoch:gr()}),zo.current===null)zo.current=Ut.setTimeout(Uo,Eo)},[Ut,Uo]),bo=ce((Zt)=>{let gn=Ie.get().clients.find((Jo)=>Jo.name===Zt);for(let Jo of Mo.current)if(Jo.name===Zt&&tZe(gn,Jo))gn=Jo;return gn},[Ie]);
return {flush:Uo,enqueue:Do,current:bo};
}
