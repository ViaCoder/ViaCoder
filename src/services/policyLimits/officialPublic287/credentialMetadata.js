// Complete pinned 2.1.287 declarations; see controller-provenance.json.
export function createPolicyCredentialMetadata287(ports){
const {Gfe,IWt,Rc,a,vl}=ports;
var Qts=new Set(["claude-desktop","local-agent","claude-vscode"]);
function s_t(){return Boolean(a.CLAUDE_CODE_SDK_HAS_OAUTH_REFRESH)&&Qts.has(a.CLAUDE_CODE_ENTRYPOINT??"")};
function hl(){return Boolean(a.CLAUDE_CODE_REMOTE_SESSION_ID)};
function Lqo(){return Boolean(a.CLAUDE_CODE_OAUTH_TOKEN)&&!hl()&&!a.ANTHROPIC_UNIX_SOCKET};
function l_t(){if(Gfe()!==null||s_t())return"sdk_host_refresh";if(hl())return"runner_rotation";return Lqo()?"none":void 0};
function WWt(){try{let{source:e}=Rc();switch(e){case"claude.ai":case"CLAUDE_CODE_OAUTH_TOKEN":case"CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR":case"CCR_OAUTH_TOKEN_FILE":if(!vl())return IWt()?"api_key":"none";return e==="claude.ai"?"claude_ai_oauth":e==="CLAUDE_CODE_OAUTH_TOKEN"?"oauth_token_env":"oauth_token_fd";case"ANTHROPIC_AUTH_TOKEN":return"auth_token_env";case"apiKeyHelper":return"api_key_helper";case"profile":return"wif";case"none":return IWt()?"api_key":"none"}}catch{return"none"}};
return {l_t,WWt};
}
