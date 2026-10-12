// Exact public normalization/truncation closure; no handwritten text ports.
export function createOfficialGatewayText287(){
function re(t,n){if(n<=0)return"";if(t.length<=n)return t;let e=t.slice(0,n),r=e.charCodeAt(n-1);return f(r>=55296&&r<=56319?e.slice(0,-1):e)}
function f(t){if(typeof Buffer<"u")return Buffer.from(t,"utf16le").toString("utf16le");return x(t)}
function x(t){let e=[];for(let r=0;r<t.length;r+=8192){let i=Math.min(r+8192,t.length),o=new Uint16Array(i-r);for(let u=r;u<i;u++)o[u-r]=t.charCodeAt(u);e.push(String.fromCharCode(...o))}return e.join("")}
var a=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;
var l=typeof String.prototype.isWellFormed==="function"?Function.prototype.call.bind(String.prototype.isWellFormed):void 0;
function Nz(t){if(l&&l(t))return t;return t.replace(a,"")}
function en(e){return Bun.stripANSI(e)}
var u="\\p{Default_Ignorable_Code_Point}\\u2800";
var SW=`\\p{Cc}\\p{Cf}\\p{Cs}\\p{Co}\\p{Cn}\\u2028\\u2029${u}`;
var p=new RegExp(`[${SW}]+`,"gu");
function nee(e){return Nz(en(e)).replace(p," ")}
function ei(e,n){let r=nee(e);if(n?.drop)r=r.replace(n.drop,"");if(r=r.replace(/\s+/g," ").trim(),n?.maxCodeUnits!==void 0)r=re(r,n.maxCodeUnits).trim();return r}
var r6e=255;
function gA(e){let n=ei(e,{drop:/[`<>]/g}).replace(/\]\(/g,"] (").replace(/!\[/g,"! [").replace(/\]\[/g,"] [").replace(/\]:/g,"] :");return re(n,r6e).trim()}
var Gqt=2048;
function bY(e){let n=ei(e).replace(/\]\(/g,"] (").replace(/!\[/g,"! [").replace(/\]\[/g,"] [").replace(/\]:/g,"] :").replace(/</g,"< ").replace(/\s+/g," ").trim();return re(n,Gqt).trim()}
return {gA,bY,ei,re};
}
