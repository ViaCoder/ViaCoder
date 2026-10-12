// Original 2.1.286 slow first parsed event warning; no body rewrites.
export function createOfficialSlowResponseWarning286({B,D,rc,t,i,bt,PA}) {
let nH=null;
function oH(){if(nH!==null)nH(),nH=null}
function start(oy,Lu) {
oH();
let Ls=rc(process.env.CLAUDE_SLOW_FIRST_BYTE_MS)||30000;
nH=B.setTimeout(()=>{nH=null;let sa=B.monotonicNow()-oy;t(`Slow first byte: no stream chunk ${(sa/1000).toFixed(1)}s after request sent (attempt ${Lu})`,{level:"warn"}),i("tengu_api_slow_first_byte",{model:bt(D.model),provider:PA(),attempt:Lu,elapsed_ms:Math.round(sa)})},Ls);
}
return {start,clear:oH};
}
