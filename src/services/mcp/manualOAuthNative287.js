// Complete original 287 manual callback and registry lifecycle. qt is the existing AP state.
const registryFactory=new Function("p","with(p){function Sis(e){return qt().oauthCallbackSubmitters.get(e)};function bis(e,t){let n=qt().activeOAuthFlows;n.set(e,t),t.finally(()=>{if(n.get(e)===t)n.delete(e)}).catch(()=>{})};function wis(e){return qt().activeOAuthFlows.get(e)};return {getOAuthCallbackSubmitter:Sis,setActiveOAuthPromise:bis,getActiveOAuthPromise:wis}}");
const callbackFactory=new Function("p","with(p){{let x=(X)=>{try{let H=new URL(X),V=H.searchParams.get(\"code\"),ce=H.searchParams.get(\"state\"),q=H.searchParams.get(\"error\");if(!V&&!q)return!1;if(ce!==J)return te(e,\"Ignoring manual callback URL whose state belongs to a different flow\"),!1;if(q){let Z=H.searchParams.get(\"error_description\")||\"\";return W(),G(Error(`OAuth error: ${q} - ${Z}`)),!0}if(!V)return!1;return te(e,\"Received auth code via manual callback URL\"),W(),ve(V),!0}catch{return!1}};_e=x,w.oauthCallbackSubmitters.set(e,x),d?.onWaitingForCallback?.(x,M,J)};return _e}");
const cleanupFactory=new Function("p","with(p){if(w.oauthCallbackSubmitters.get(e)===_e)w.oauthCallbackSubmitters.delete(e);;if(w.oauthCallbackListeners.get(M)===N)w.oauthCallbackListeners.delete(M);}");
const listenerFactory=new Function("p","with(p){let N=new AbortController;if(!R)w.oauthCallbackListeners.get(M)?.abort(),w.oauthCallbackListeners.set(M,N);;return N}");
export const createOriginalManualOAuthRegistry287=p=>registryFactory(p);
export const installOriginalManualCallback287=p=>callbackFactory(p);
export const clearOriginalManualCallback287=p=>cleanupFactory(p);
export const adoptOriginalManualListener287=p=>listenerFactory(p);
