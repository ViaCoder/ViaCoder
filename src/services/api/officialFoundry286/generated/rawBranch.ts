// Generated from verified raw ASTs by scripts/official/vendor-foundry-286.mjs.
// @ts-nocheck -- original minified declarations are retained without body/type rewriting.
export async function runOfficialFoundry286RawBranch(ports: Record<string, any>): Promise<any> {
  const { provider: Ve, authEnvironment: a, env: process, hostManagedError: FUt, commonOptions: $e, gatewayAuthOverrides: gy, shouldLogSdk: UG, logger: cs, isHostManaged: cc } = ports
  var HPr=/^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])$/i;
  function Gh(e){return e!==void 0&&HPr.test(e)?e:void 0}
  function Ho(e){let n={},r;for(let[s,h]of Object.entries(e))if(s.toLowerCase()==="authorization")r=h;else n[s]=h;return{value:r,rest:n}}
  if(Ve==="foundry"){let{AnthropicFoundry:Ge}=await import("../foundrySdk.js"),Ye,mt=!1;if(a.ANTHROPIC_FOUNDRY_AUTH_TOKEN)Ye=async()=>a.ANTHROPIC_FOUNDRY_AUTH_TOKEN??"";else if(!process.env.ANTHROPIC_FOUNDRY_API_KEY)if(a.CLAUDE_CODE_SKIP_FOUNDRY_AUTH)mt=!0,Ye=()=>Promise.resolve("skip-foundry-auth");else if(cc())throw FUt("Foundry");else{let{DefaultAzureCredential:Yt,getBearerTokenProvider:kt}=await import("../azureIdentity.js");Ye=kt(new Yt,"https://cognitiveservices.azure.com/.default")}let wt=a.ANTHROPIC_FOUNDRY_RESOURCE;if(wt!==void 0&&a.ANTHROPIC_FOUNDRY_BASE_URL===void 0&&Gh(wt)===void 0)throw Error("ANTHROPIC_FOUNDRY_RESOURCE must be a Foundry resource name (2-64 letters, digits and hyphens, not starting or ending with a hyphen, such as my-resource), not a URL or host name. To use a full URL, set ANTHROPIC_FOUNDRY_BASE_URL instead.");let Tt=Ho($e.defaultHeaders),Qt={...$e,...wt!==void 0&&{resource:wt},defaultHeaders:{...Tt.rest,...gy(),Authorization:null},...Ye&&{azureADTokenProvider:Ye,apiKey:null,defaultHeaders:mt?{...Tt.rest,...Tt.value!==void 0&&{Authorization:Tt.value}}:{...Tt.rest,...gy()}},...UG()&&{logger:cs()}};return new Ge(Qt)}
  return null
}

export function createOfficialFoundryHostPredicate286(a: Record<string, any>): () => boolean {
  function cc(){return a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST}
  return cc
}
