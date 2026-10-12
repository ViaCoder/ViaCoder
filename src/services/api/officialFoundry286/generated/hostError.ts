// Generated from verified raw AST; complete P/Bhn/FUt lexical closure.
// @ts-nocheck -- complete original declarations, no body rewriting.
export function createOfficialFoundryHostError286() {
class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}}
class Bhn extends P{}
function FUt(e,n="The app may have quit or its credential file is stale \u2014 restart the desktop app."){return new Bhn(`${e} credentials are managed by the desktop app, but none are available. ${n}`,"host-managed provider credentials unavailable \u2014 restart desktop app")}
return FUt
}
