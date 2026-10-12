// Official npm 2.1.283 chunk-m8zvc9bg.js: exact assistant usage parser and skill accumulator.
var p=new TextEncoder;
var se=p.encode('"type":"assistant"');
var ve=p.encode('"usage":{');
var re=p.encode('"timestamp":"');
var De=p.encode('"sessionId":"');
var Pe=p.encode('"model":"');
var xe=p.encode('"requestId":"');
var z=p.encode('"id":"');
var Be=p.encode("msg_");
var ie=p.encode('"uuid":"');
var Ue=p.encode('"input_tokens":');
var Fe=p.encode('"output_tokens":');
var He=p.encode('"cache_creation_input_tokens":');
var Ke=p.encode('"cache_read_input_tokens":');
var Ge=p.encode('"isSidechain":true');
var qe=p.encode('"isSidechain": true');
var $e=p.encode('"attribution');
var We=p.encode('"attributionAgent":"');
var Ye=p.encode('"attributionSkill":"');
var je=p.encode('"attributionPlugin":"');
var ze=p.encode('"attributionMcpServer":"');
var q=34;
var K=48;
var ae=57;
function g(e,n,o,s){let r=e.subarray(o,s).indexOf(n);return r<0?-1:o+r}
function E(e,n,o,s){let r=g(e,n,o,s);if(r<0)return;let i=r+n.length,c=i;while(c<s&&e[c]!==q)c++;return e.toString("utf8",i,c)}
function yn(e,n,o){let s=n;while(!0){if(s=g(e,z,s,o),s<0)return;let r=s+z.length;if(g(e,Be,r,r+4)===r){let i=r;while(i<o&&e[i]!==q)i++;return e.toString("utf8",r,i)}s=r}}
function I(e,n,o,s){let r=g(e,n,o,s);if(r<0)return 0;let i=r+n.length,c=0;while(i<s&&e[i]>=K&&e[i]<=ae)c=c*10+(e[i]-K),i++;return c}
function An(e){if(!e)return 3;let n=e.toLowerCase();if(n.includes("fable"))return 10;if(n.includes("opus"))return 5;if(n.includes("haiku"))return 1;return 3}
function Nn(e,n){if(!n.attributionSkill)return;e.set(n.attributionSkill,(e.get(n.attributionSkill)??0)+n.cached+n.cacheCreate+n.uncached+n.output)}
function Kn(e,n,o,s){if(g(e,se,n,o)<0)return;if(g(e,ve,n,o)<0)return;let r=E(e,re,n,o),i=E(e,De,n,o);if(!r||!i)return;let c=Date.parse(r);if(Number.isNaN(c)||c<s)return;let a=I(e,Ue,n,o),m=I(e,Fe,n,o),_=I(e,He,n,o),u=I(e,Ke,n,o);if(a+m+_+u===0)return;let T=g(e,$e,n,o)>=0,h=E(e,Pe,n,o);return{ts:c,sessionId:i,cached:u,cacheCreate:_,uncached:a,output:m,isSubagent:g(e,Ge,n,o)>=0||g(e,qe,n,o)>=0,modelTier:An(h),model:h,uuid:E(e,xe,n,o)??yn(e,n,o)??E(e,ie,n,o)??"",...T&&{attributionAgent:E(e,We,n,o),attributionSkill:E(e,Ye,n,o),attributionPlugin:E(e,je,n,o),attributionMcpServer:E(e,ze,n,o)}}}
export { Kn as parseOfficialUsageRecord, Nn as accumulateOfficialSkillTokens };
