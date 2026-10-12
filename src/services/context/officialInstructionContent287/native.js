// Generated complete original F3t/dto; owners remain execution/legacy scopes.
export function createInstructionContentAccessors287(ports){
const n=ports.execution,c=ports.legacy;
function F3t(e){let t=c();if(t)t.cachedClaudeMdContent=e;else n().sessionFlags.replaceCachedClaudeMdContent(e)}
function dto(){let e=c();return e?e.cachedClaudeMdContent:n().sessionFlags.cachedClaudeMdContent()}
return{set:F3t,get:dto};
}
