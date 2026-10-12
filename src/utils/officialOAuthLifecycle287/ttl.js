// Generated complete original 2.1.287 declarations. See provenance.json.
export function createOAuthTtl287(ports){
const {_,t}=ports;
function aY(e,i=300000,s){let n=(o)=>typeof i==="function"?i(o):i,r=new Map,h=new Map,l=async(...o)=>{let a=_(o),f=r.get(a);if(f&&s&&!s(f.value,f.timestamp)){if(f.refreshPromise)return f.refreshPromise;r.delete(a),f=void 0}let d=Date.now();if(!f){let g=h.get(a);if(g)return g;let u=e(...o);h.set(a,u);try{let w=await u;if(h.get(a)===u)r.set(a,{value:w,timestamp:Date.now(),refreshing:!1,lifetimeMs:n(w)});return w}finally{if(h.get(a)===u)h.delete(a)}}if(f&&d-f.timestamp>f.lifetimeMs&&!f.refreshing){f.refreshing=!0;let g=f,u=e(...o);return g.refreshPromise=u,u.then((w)=>{if(r.get(a)===g)r.set(a,{value:w,timestamp:Date.now(),refreshing:!1,lifetimeMs:n(w)})}).catch((w)=>{if(t(String(w),{level:"error"}),r.get(a)===g)r.delete(a)}),f.value}return r.get(a).value};return l.cache={clear:()=>{r.clear(),h.clear()}},l};
return {aY};
}
