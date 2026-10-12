export function createInstructionsHookPredicate287(ports){
function module0(imports){

function N(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)};
return {N};
}
function module1(imports){
const N=imports["N"];
const W=imports["W"];
function gF(r){if(!N(r))return!1;let o=Object.getPrototypeOf(r);return o===null||!W(o)&&Object.getPrototypeOf(o)===null};
function i(r){if(typeof r!=="object"||!r)return!1;try{return Reflect.get(RegExp.prototype,"source",r),!0}catch{return!1}};
function s(r,o,t){if(Array.isArray(r))return Array.prototype.some.call(r,(e)=>s(e,o,t));if(Array.isArray(o))return Array.prototype.some.call(o,(e)=>s(r,e,t));if(typeof r!=="object"||r===null)return r===o;if(gF(r)){if(typeof o!=="object"||!o)return!1;for(let e of Object.keys(r))if(!Object.hasOwn(o,e)||!s(r[e],o[e],t))return!1;return!0}return i(r)&&t(r,String(o))};
var KVr=(r,o)=>s(r,o,()=>!0);
var FQ=(r,o,t)=>Array.isArray(r)?r.some((e)=>FQ(e,o,t)):!gF(r)||!Object.hasOwn(r,o)||KVr(r[o],t);
return {gF,i,s,KVr,FQ};
}
function module2(imports){
const ut=imports["ut"];
const FQ=imports["FQ"];
var dd=(o,e,s)=>(s??ut().loadedModules).some((r)=>r.hooks(o)&&(e===void 0||Object.entries(e).every(([t,d])=>FQ(r.matcherFor(o),t,d))));
return {dd};
}
function module3(imports){
const V9=imports["V9"];
const Ty=imports["Ty"];
const LEe=imports["LEe"];
const S$=imports["S$"];
const dd=imports["dd"];
var MQ=(e)=>dd(`classic.${e}`);
function yGn(){let e=V9()?.InstructionsLoaded;if(e&&e.length>0)return!0;if(!Ty()){let r=LEe()?.InstructionsLoaded;if(r&&r.length>0)return!0}let n=S$()?.InstructionsLoaded;if(n&&n.length>0)return!0;return MQ("InstructionsLoaded")};
return {MQ,yGn};
}
const m0=module0({});
const m1=module1({"N":m0["N"],"W":ports["types"]["isProxy"]});
const m2=module2({"ut":ports["mods"],"FQ":m1["FQ"]});
const m3=module3({"V9":ports["snapshot"],"Ty":ports["managedOnly"],"LEe":ports["agentHooks"],"S$":ports["registered"],"dd":m2["dd"]});
return {"hasInstructions":m3.yGn};
}
