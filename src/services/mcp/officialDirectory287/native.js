// Full original public directory paging/error protocol. No client, registry or cache.
export function createModernDirectoryRead287(ports){
const {EAe,Fs,_l,te,Y1t,Ja,Os}=ports;
var a=20;
function c(r){let e=r?.extensions?.[Y1t];return e!=null&&typeof e==="object"&&"directoryRead"in e&&e.directoryRead===!0};
async function R(r,e){if(!c(r.capabilities))throw Error("readMcpDirectory called on a server without directoryRead capability");let t=[],o,s=0;do{let i;try{i=await Os(r.client).request({method:"resources/directory/read",params:{uri:e,...o&&{cursor:o}}},EAe,{timeout:Ja()})}catch(n){if(s===0||!(n instanceof _l&&n.code===Fs.InvalidParams))throw n;return te(r.name,`resources/directory/read ${e}: page ${s+1} returned InvalidParams on cursor; returning ${t.length} entries from prior pages`),t}t.push(...i.resources),o=i.nextCursor,s++}while(o&&s<a);if(o)te(r.name,`resources/directory/read ${e}: stopped at ${a} pages with more pending`);return t};
return {readMcpDirectory:R,serverDeclaresDirectoryRead:c};
}

export function createLegacyDirectoryRead287(ports){
const {$s,ZLe,Ps,te,Y1t,Ja,Os}=ports;
var n=20;
function c(r){let e=r?.extensions?.[Y1t];return e!=null&&typeof e==="object"&&"directoryRead"in e&&e.directoryRead===!0};
async function R(r,e){if(!c(r.capabilities))throw Error("readMcpDirectory called on a server without directoryRead capability");let o=[],t,s=0;do{let i;try{i=await Os(r.client).request({method:"resources/directory/read",params:{uri:e,...t&&{cursor:t}}},ZLe,{timeout:Ja()})}catch(a){if(s===0||!(a instanceof Ps&&a.code===$s.InvalidParams))throw a;return te(r.name,`resources/directory/read ${e}: page ${s+1} returned InvalidParams on cursor; returning ${o.length} entries from prior pages`),o}o.push(...i.resources),t=i.nextCursor,s++}while(t&&s<n);if(t)te(r.name,`resources/directory/read ${e}: stopped at ${n} pages with more pending`);return o};
return {readMcpDirectory:R,serverDeclaresDirectoryRead:c};
}

export function createModernMcpErrorClassification287(ports){
const {Fs,_l}=ports;
var n=new Set([-32002,Fs.InvalidParams]);
function e(o){return o instanceof _l?o.code:void 0};
function t(o){return o instanceof _l&&o.code===Fs.MethodNotFound};
function c(o){return o instanceof _l&&(o.code===Fs.MethodNotFound||o.code===Fs.InvalidParams)};
function i(o){return o instanceof _l&&n.has(o.code)};
function u(o){return o instanceof _l&&o.code===Fs.InvalidParams};
function d(o){return o instanceof _l&&o.code===Fs.UrlElicitationRequired};
return {getMcpErrorCode:e,isMcpMethodNotFoundError:t,isMcpNotADirectoryError:u,isMcpResourceNotFoundError:i,isMcpUnknownMethodError:c,isUrlElicitationRequiredMcpError:d};
}

export function createLegacyMcpErrorClassification287(ports){
const {$s,Ps}=ports;
var o=new Set([-32002,$s.InvalidParams]);
function e(n){return n instanceof Ps?n.code:void 0};
function t(n){return n instanceof Ps&&n.code===$s.MethodNotFound};
function i(n){return n instanceof Ps&&(n.code===$s.MethodNotFound||n.code===$s.InvalidParams)};
function c(n){return n instanceof Ps&&o.has(n.code)};
function u(n){return n instanceof Ps&&n.code===$s.InvalidParams};
function d(n){return n instanceof Ps&&n.code===$s.UrlElicitationRequired};
return {getMcpErrorCode:e,isMcpMethodNotFoundError:t,isMcpNotADirectoryError:u,isMcpResourceNotFoundError:c,isMcpUnknownMethodError:i,isUrlElicitationRequiredMcpError:d};
}
