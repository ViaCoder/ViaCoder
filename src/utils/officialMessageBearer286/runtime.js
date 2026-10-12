// Official npm 2.1.286 complete declarations; original Messages Authorization selection.
export function createMessageBearer286({BS,a,kr,oUe}){
function QS(){return!1}
function wp(e={}){try{return BS(e)}catch{return{key:null,source:"none"}}}
async function z3(e,n){let r=kr()&&wp({skipRetrievingKeyFromApiKeyHelper:!0}).source==="none",h=QS()&&!r?void 0:a.ANTHROPIC_AUTH_TOKEN,g=h||await oUe(n);if(g)return e.Authorization=`Bearer ${g}`,h?"ANTHROPIC_AUTH_TOKEN":"apiKeyHelper";return null}
return z3;
}
