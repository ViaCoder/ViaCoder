export function create(ports){const {requireOriginal287,importOriginal287,Wp,pb,aF,Kr,J,gfe}=ports;
function PGe(m,l){if(!m)return null;let p=Wp(m)??pb(m),h=l===void 0?void 0:typeof l==="number"?void 0:aF(l);return h!==void 0?`${p} (${h})`:p};
function Hdr(m){if(m==="running")return Kr;if(m==="completed")return J.tick;if(m==="failed"||m==="killed")return J.cross;if(m==="paused")return gfe;return J.circle};
function Ddr(m){if(m==="completed")return"success";if(m==="failed")return"error";if(m==="killed")return"warning";if(m==="paused")return"warning";return"background"};
return {"PGe":PGe,"Hdr":Hdr,"Ddr":Ddr};}
