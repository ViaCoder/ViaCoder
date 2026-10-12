// Generated from the verified official 2.1.287 Fzo source closure.
export function createNativeFetchLifecycle287(ports) {
  const { Id, Ls } = ports
  function PXe(e){e.cancelIdleDrop?.(),e.cancelIdleDrop=void 0,e.blocks.clear(),e.storedBytes=0,e.generation++}
  var c1e="root";
  var IGr=new Set(["clear","resume","spare_claim","remote_attach"]);
  function Fzo(){return Id((e,t)=>{if(t==="cd"||t==="hydrate")return;let n=Ls();if(n.resetStreamNoEventsWarningLatch(),IGr.has(t)){n.threadDropRecreate.delete(c1e),n.threadRequestEnds.delete(c1e);let r=n.gzipRequestBody;if(PXe(r.blockStore),r.blocksSwitchedOff==="until_next_conversation")r.blocksSwitchedOff=!1}})}
  return Fzo
}
