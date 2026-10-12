// Complete pinned official 2.1.287 extract lifecycle; see provenance.json.
export function createExtractVersionWellFormed287(ports){
const {}=ports;
var a=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;
var l=typeof String.prototype.isWellFormed==="function"?Function.prototype.call.bind(String.prototype.isWellFormed):void 0;
function Nz(t){if(l&&l(t))return t;return t.replace(a,"")};
return {Nz};
}
