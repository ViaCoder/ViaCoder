// Verified original 2.1.286 partial-final marker and synthetic stream close; no body rewrites.
export function createOfficialPartialFinal286({Zs,ug,Pa,zd,$u,ef,jpe,xT,Ko}) {
let nVe=Ko({content:Zs?ug?`${Pa}: The response stopped arriving. The response above may be incomplete.`:zd?`${Pa}: Server error mid-response. The response above may be incomplete.`:$u?ef?`${Pa}: Part of the response never arrived. The response above may be incomplete.`:`${Pa}: The response stream was malformed. The response above may be incomplete.`:jpe?`${Pa}: Your computer went to sleep mid-response. The response above may be incomplete.`:`${Pa}: Connection lost mid-response. The response above may be incomplete.`:ug?`${Pa}: The response stalled before a response was produced. Try again.`:$u?ef?`${Pa}: Part of the response never arrived and no response was produced. Try again.`:`${Pa}: The response stream was malformed and no response was produced. Try again.`:jpe?`${Pa}: Your computer went to sleep before a response was produced. Try again.`:`${Pa}: Connection lost before a response was produced. Try again.`,error:"server_error",truncatedAfterOutput:Zs&&!xT?!0:void 0});
if(ug&&!Zs)nVe.streamWatchdogGaveUp=!0;
return nVe;
}
export function createOfficialStreamClose286({El,Gi}) {
function*Fl(){if(!El)return;if(Gi!==null)yield{type:"stream_event",event:{type:"content_block_stop",index:Gi}};yield{type:"stream_event",event:{type:"message_stop"}}}
return Fl;
}
