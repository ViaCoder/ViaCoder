// Exact 2.1.287 declarations; generated from manifest-pinned official modules.
export function createApiKeyRead_darwin_arm64_287(ports){
const {Jl,wtr,jF,iEe,Xk,t,le,U,f8}=ports;
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
class Ak{value=void 0;promise=null;clear(){this.value=void 0,this.promise=null}}
var nns=new V(()=>new Ak);
function _K(){if(Jl())return null;{let n=wtr();if(n){if(n.stdout)return{key:n.stdout,source:"/login managed key"}}else{let r=jF();try{let s=iEe(`security find-generic-password -a "${Xk()}" -w -s "${r}"`);if(s)return{key:s,source:"/login managed key"}}catch(s){t(`Failed to read API key from macOS keychain: ${s}`,{level:"error"})}}}let e=le();if(!e.primaryApiKey)return null;return{key:e.primaryApiKey,source:"/login managed key"}}
function _i(){return nns.of(U().host)}
function jQn(){if(f8())return null;let e=_i();if(e.value!==void 0)return e.value;let n=_K();return e.value=n,n}
return {read:jQn,cell:host=>nns.of(host)};
}
export function createApiKeyRead_darwin_x64_287(ports){
const {Jl,wtr,jF,iEe,XT,t,le,U,f8}=ports;
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
class Fk{value=void 0;promise=null;clear(){this.value=void 0,this.promise=null}}
var nns=new V(()=>new Fk);
function uK(){if(Jl())return null;{let n=wtr();if(n){if(n.stdout)return{key:n.stdout,source:"/login managed key"}}else{let r=jF();try{let s=iEe(`security find-generic-password -a "${XT()}" -w -s "${r}"`);if(s)return{key:s,source:"/login managed key"}}catch(s){t(`Failed to read API key from macOS keychain: ${s}`,{level:"error"})}}}let e=le();if(!e.primaryApiKey)return null;return{key:e.primaryApiKey,source:"/login managed key"}}
function _i(){return nns.of(U().host)}
function jQn(){if(f8())return null;let e=_i();if(e.value!==void 0)return e.value;let n=uK();return e.value=n,n}
return {read:jQn,cell:host=>nns.of(host)};
}
export function createApiKeyRead_linux_arm64_287(ports){
const {Xl,le,U,B}=ports;
class q{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
function $H(){if(Xl())return null;let e=le();if(!e.primaryApiKey)return null;return{key:e.primaryApiKey,source:"/login managed key"}};
function _i(){return Sts.of(B().host)};
var Sts=new q(()=>new xk);
class xk{value=void 0;promise=null;clear(){this.value=void 0,this.promise=null}};
return Object.assign($H,{cell:host=>Sts.of(host)});
}
export function createApiKeyRead_linux_x64_287(ports){
const {Xl,le,U,B}=ports;
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
function xH(){if(Xl())return null;let e=le();if(!e.primaryApiKey)return null;return{key:e.primaryApiKey,source:"/login managed key"}};
function _i(){return Sts.of(U().host)};
var Sts=new V(()=>new Rk);
class Rk{value=void 0;promise=null;clear(){this.value=void 0,this.promise=null}};
return Object.assign(xH,{cell:host=>Sts.of(host)});
}
export function createApiKeyRead_win32_arm64_287(ports){
const {Xl,le,U,B}=ports;
class q{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
function KH(){if(Xl())return null;let e=le();if(!e.primaryApiKey)return null;return{key:e.primaryApiKey,source:"/login managed key"}};
function _i(){return kts.of(B().host)};
var kts=new q(()=>new Ok);
class Ok{value=void 0;promise=null;clear(){this.value=void 0,this.promise=null}};
return Object.assign(KH,{cell:host=>kts.of(host)});
}
export function createApiKeyRead_win32_x64_287(ports){
const {Xl,le,U,B}=ports;
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
function sK(){if(Xl())return null;let e=le();if(!e.primaryApiKey)return null;return{key:e.primaryApiKey,source:"/login managed key"}};
function _i(){return Ets.of(U().host)};
var Ets=new V(()=>new Tk);
class Tk{value=void 0;promise=null;clear(){this.value=void 0,this.promise=null}};
return Object.assign(sK,{cell:host=>Ets.of(host)});
}
