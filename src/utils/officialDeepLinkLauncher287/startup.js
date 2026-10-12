// The two complete original goo early deep-link blocks, no conditional/body rewrite.
export function createDeepLinkStartup287(ports){
const edr=ports.edr;
const Zcr=ports.Zcr;
const zf=ports.zf;
const Rf=ports.Rf;
const vT=ports.vT;
const jfe=ports.jfe;
const oe=ports.oe;
const CIe=ports.CIe;
const C6t=ports.C6t;
const Whe=ports.Whe;
const Ro=ports.Ro;
const yy=ports.yy;
const F=ports.F;
const j2t=ports.j2t;
const WFe=ports.WFe;
const z7r=ports.z7r;
const MG=ports.MG;
const Kl=ports.Kl;
const X_=ports.X_;
const t=ports.t;
return async function apply(o,b,r){
if(o.deepLinkOrigin&&o.prefillB64!==void 0&&o.prefill===void 0)try{o.prefill=edr(o.prefillB64)}catch(g){t(`Ignoring invalid --prefill-b64: ${g instanceof Error?g.message:g}`,{level:"error"})}
if(o.deepLinkOrigin&&o.deepLinkCwdB64!==void 0)try{Zcr(o.deepLinkCwdB64),zf(o.deepLinkCwdB64),Rf(o.deepLinkCwdB64),vT(oe()),jfe(oe()),CIe(),C6t(),Whe(),Ro(),yy("deeplink: originalCwd changed");let g;using w={[Symbol.dispose]:()=>g?.()};if(F()&&b!==void 0)g=await j2t(b);if(r())WFe(b,"deeplink");if(z7r(),g!==void 0)MG({userLayer:"retain"});else MG();Kl.cache.clear?.(),X_(b)}catch(g){t(`Ignoring invalid --deep-link-cwd-b64: ${g instanceof Error?g.message:g}`,{level:"error"})}
};
}
