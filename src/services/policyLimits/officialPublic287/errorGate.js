// Complete pinned 2.1.287 declarations; see controller-provenance.json.
export function createPolicyErrorGate287(ports){
const {Rc,Z_,fA,g8,im,on,p7n,vh}=ports;
function YGr(){let e=Z_();if(!on("allow_error_reporting")){if(e===null)return"blocked_cache_miss";return e.restrictions.allow_error_reporting?.allowed===!1?"blocked_restriction":"blocked_tainted"}let o=p7n();if(e!==null)return o?"allowed_taints_clean":"blocked_unsettled";if(im()&&!g8(fA))return"blocked_scopeless_oauth";if(Rc().source==="ANTHROPIC_AUTH_TOKEN")return"blocked_auth_token_env";if(vh())return"blocked_api_key_helper";return o?"allowed_untaintable":"blocked_unsettled"};
return {YGr};
}
