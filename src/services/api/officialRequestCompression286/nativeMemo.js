// Generated complete native schema-memo helper from verified 2.1.286 chunk-2143w8bm.js.
class i{resetters=[];built=[];lazy(e){let t,r=()=>{t=void 0};return this.resetters.push(r),()=>{if(t===void 0)t=e(),this.built.push(r);return t}}builtCount(){return this.built.length}releaseBuiltSince(e){for(let t of this.built.splice(e))t()}reset(){for(let e of this.resetters)e();this.built.length=0}}
var nQn=new i;
function f(e){return nQn.lazy(e)}
export {f, nQn}
