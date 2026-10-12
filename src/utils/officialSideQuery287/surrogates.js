// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQuerySurrogates287(ports){
const {}=ports;
var m=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/;
var a=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;
var l=typeof String.prototype.isWellFormed==="function"?Function.prototype.call.bind(String.prototype.isWellFormed):void 0;
var g=typeof String.prototype.toWellFormed==="function"?Function.prototype.call.bind(String.prototype.toWellFormed):void 0;
function wf(t){if(l)return l(t);return!m.test(t)};
function Fm(t){if(g)return g(t);return t.replace(a,"\uFFFD")};
function OOe(t){let n=!1,e=[t];while(e.length>0){let r=e.pop();if(Array.isArray(r))for(let i=0;i<r.length;i++){let o=r[i];if(typeof o==="string"){if(!wf(o))r[i]=Fm(o),n=!0}else if(o!==null&&typeof o==="object")e.push(o)}else if(r!==null&&typeof r==="object"){let i=r;for(let o of Object.keys(i)){let u=i[o];if(typeof u==="string"){if(!wf(u))i[o]=Fm(u),n=!0}else if(u!==null&&typeof u==="object")e.push(u)}}}return n};
function YTn(t){let n=[t];while(n.length>0){let e=n.pop();if(Array.isArray(e))for(let r=0;r<e.length;r++){let i=e[r];if(typeof i==="string"){if(!wf(i))return!0}else if(i!==null&&typeof i==="object")n.push(i)}else if(e!==null&&typeof e==="object"){let r=e;for(let i of Object.keys(r)){let o=r[i];if(typeof o==="string"){if(!wf(o))return!0}else if(o!==null&&typeof o==="object")n.push(o)}}}return!1};
return {YTn,OOe};
}
