// Complete original 287 retention cutoff; no settings owner or cache.
export function createCleanupCutoff287({er,T1t}){
function $_(e){let n=(er()||{}).cleanupPeriodDays??T1t;if(n===0)return null;if(e!==void 0&&e<n)n=e;let s=n*24*60*60*1000;return new Date(Date.now()-s)}
return $_;
}
