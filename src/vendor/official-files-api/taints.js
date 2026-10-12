// Official npm 2.1.283: complete unchanged declarations.
import {K,j,Oe,M} from './stateHost.js';
var n=new Set(["hipaa"]);
class o{latched=new Set;latchedTaints=[];taints=[];current=[];changed=Oe();verdict=void 0;replaceTaints(t){this.current=M(t).sort();for(let i of t)if(n.has(i))this.latched.add(i);if(this.latched.size!==this.latchedTaints.length)this.latchedTaints=Array.from(this.latched).sort();return this.refreshEffectiveTaints()}latchTaints(t){let i=!1;for(let r of t)if(n.has(r)&&!this.latched.has(r))this.latched.add(r),i=!0;if(!i)return!1;return this.latchedTaints=Array.from(this.latched).sort(),this.refreshEffectiveTaints()}refreshEffectiveTaints(){let t=M([...this.latchedTaints,...this.current]).sort();if(t.length===this.taints.length&&t.every((i,r)=>i===this.taints[r]))return!1;return this.taints=t,this.changed.emit(this.taints),!0}registerVerdict(t){this.verdict=t}resetForTesting(){this.latched.clear(),this.latchedTaints=[],this.taints=[],this.current=[]}}
var a=new K(()=>new o);
function e(){return a.of(j().host)}
function F4n(t){return e().replaceTaints(t)}
function SNo(t){return e().latchTaints(t)}
function oc(t){return e().taints.includes(t)}
function C$(){return e().taints}
function fRe(){return e().current}
function $4n(){return e().latchedTaints}
function m5(t){return e().changed.subscribe(t)}
function wNo(){e().resetForTesting()}
export {F4n,SNo,oc,C$,fRe,$4n,m5,wNo};
