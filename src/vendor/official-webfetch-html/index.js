// Official npm 2.1.283 declarations. See provenance.json and NOTICE.
export function createOfficialHTMLConverter({t}) {
var t8n;
var __t=1048576;
function n8n(){return t8n??=import("./chunk-qht6ejf7.js").then((e)=>{let r=new e.default;return r.remove(["style","script","noscript","iframe"]),r})}
async function sRt(e){try{let n=(await n8n()).turndown(e.slice(0,__t));if(e.length>__t)n+=`

[Content truncated due to length...]`;return n}catch(n){return t(`Turndown failed, falling back to raw HTML: ${n instanceof Error?n.message:String(n)}`,{level:"error"}),e}}
return {convert:sRt};
}
