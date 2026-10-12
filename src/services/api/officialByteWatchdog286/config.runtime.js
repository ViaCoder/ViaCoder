// Complete manifest-verified 2.1.286 watchdog configuration; zero body rewrites.
export function createOfficialWatchdogConfiguration286({JM,a,R,Us}) {
function kOt(){return Math.max(JM(process.env.CLAUDE_STREAM_IDLE_TIMEOUT_MS)||0,300000)}
var mw=1e4;
var VM=1800000;
var V3=180000;
function q3(e){let n=kOt(),r=e==="firstParty"?V3:n,s=n,h=JM(process.env.CLAUDE_BYTE_STREAM_IDLE_TIMEOUT_MS),g=JM(process.env.CLAUDE_STREAM_IDLE_TIMEOUT_MS)>0;if(Number.isFinite(h)&&h>0)s=h;else if(!g){s=r;let b=R("tengu_byte_stream_idle_timeout_ms",r);if(typeof b==="number"&&Number.isFinite(b)&&b>0)s=b}return Math.min(Math.max(s,mw),VM)}
function uWn(e){return q3(gw(e)?e:void 0)}
function Y3(e){let n=a.CLAUDE_STREAM_FIRST_BYTE_TIMEOUT_MS;if(n!==void 0)return Math.min(Math.max(n,mw),VM);return uWn(e)}
function hw(){let e=a.CLAUDE_ENABLE_BYTE_WATCHDOG;if(e!==void 0)return e;return R("tengu_stream_watchdog_default_on",!0)}
function gw(e){return e==="firstParty"&&Us()||e==="anthropicAws"&&!process.env.ANTHROPIC_AWS_BASE_URL}
return {kOt,q3,uWn,Y3,hw,gw}
}
