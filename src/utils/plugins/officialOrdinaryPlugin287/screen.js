class Cr{#n=Me();#e;#o=!1;constructor(a){this.#e={viewState:a,result:null,error:null}}subscribe=(a)=>this.#n.subscribe(a);getSnapshot=()=>this.#e;get viewState(){return this.#e.viewState}get result(){return this.#e.result}get error(){return this.#e.error}setViewState=(a)=>{this.#t({viewState:a})};setResult=(a)=>{this.#t({result:a})};setError=(a)=>{this.#t({error:a})};markDiscoverLoaded=()=>{let a=this.#o;return this.#o=!0,a};#t(a){let h=this.#e,v={...h,...a};if(Object.is(v.viewState,h.viewState)&&v.result===h.result&&v.error===h.error)return;this.#e=v,this.#n.emit()}};
var s=globalThis.process?.getBuiltinModule?.("async_hooks");
var wKt=s?(e)=>s.AsyncResource.bind(e):(e)=>e;
function Me(){let e=new Set;return{subscribe(n){let r=wKt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,"Signal listener(s) threw")},clear(){e.clear()}}};
export {Cr as OriginalPluginScreen287};
