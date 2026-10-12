// Complete original 2.1.287 launch accessors; native host is the sole installed owner.
export function createLaunchOptionsAccessors287(ports){
const n=ports.executionContext;
function Ce(){return!n().host.launchOptions.isInteractive()}
function Wu(){return n().host.launchOptions.isInteractive()}
function heo(e){n().host.launchOptions.replaceIsInteractive(e)}
function EI(){return n().host.launchOptions.permissionPromptToolName()}
function _eo(e){n().host.launchOptions.replacePermissionPromptToolName(e)}
function R3t(){return n().host.launchOptions.clientType()}
function Teo(e){n().host.launchOptions.replaceClientType(e)}
function WOe(){return n().host.launchOptions.sdkAgentProgressSummariesEnabled()}
function keo(e){n().host.launchOptions.replaceSdkAgentProgressSummariesEnabled(e)}
function P3t(){return n().host.launchOptions.strictToolResultPairing()}
function $3t(){return Ce()&&n().host.launchOptions.clientType()!=="claude-vscode"}
function q3t(e){n().host.launchOptions.replaceSessionBypassPermissionsMode(e)}
function r4(){return n().host.launchOptions.sessionBypassPermissionsMode()}
function Tto(e){n().host.launchOptions.replaceSessionPersistenceDisabled(e)}
function hR(){return n().host.launchOptions.sessionPersistenceDisabled()}
function xY(e){n().host.launchOptions.replaceScheduledTasksEnabled(e)}
function K3t(){return n().host.launchOptions.scheduledTasksEnabled()}
return {"getIsNonInteractiveSession":Ce,"getIsInteractive":Wu,"setIsInteractive":heo,"getPermissionPromptToolName":EI,"setPermissionPromptToolName":_eo,"getClientType":R3t,"setClientType":Teo,"getSdkAgentProgressSummariesEnabled":WOe,"setSdkAgentProgressSummariesEnabled":keo,"getStrictToolResultPairing":P3t,"preferThirdPartyAuthentication":$3t,"setSessionBypassPermissionsMode":q3t,"getSessionBypassPermissionsMode":r4,"setSessionPersistenceDisabled":Tto,"isSessionPersistenceDisabled":hR,"setScheduledTasksEnabled":xY,"getScheduledTasksEnabled":K3t};
}
