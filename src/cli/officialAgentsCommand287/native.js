// Official 2.1.287 complete Y. Imports are fixed transports to the existing owners.
export function createAgentsCommand287(ports){
const process=ports.process;
const U=ports.sourceModule("chunk-bn3p37gv.js")["U"];
const p3t=ports.sourceModule("chunk-bn3p37gv.js")["p3t"];
const H3t=ports.sourceModule("chunk-bn3p37gv.js")["H3t"];
const Bz=ports.sourceModule("chunk-bn3p37gv.js")["Bz"];
const U3t=ports.sourceModule("chunk-bn3p37gv.js")["U3t"];
const i=ports.sourceModule("chunk-6hnyhakg.js")["i"];
const SI=ports.sourceModule("chunk-vm1241f9.js")["SI"];
const HY=ports.sourceModule("chunk-brnn4zwp.js")["HY"];
const Kn=ports.sourceModule("chunk-mphp7acd.js")["Kn"];
const yy=ports.sourceModule("chunk-mphp7acd.js")["yy"];
const mse=ports.sourceModule("chunk-s3exmmq6.js")["mse"];
const I_e=ports.sourceModule("chunk-scj3bw9g.js")["I_e"];
const JS=ports.sourceModule("chunk-b60bqfbx.js")["JS"];
const rft=ports.sourceModule("chunk-b60bqfbx.js")["rft"];
const m1e=ports.sourceModule("chunk-b60bqfbx.js")["m1e"];
const a$r=ports.sourceModule("chunk-b60bqfbx.js")["a$r"];
const l$r=ports.sourceModule("chunk-b60bqfbx.js")["l$r"];
const ePn=ports.sourceModule("chunk-2qkrgkcd.js")["ePn"];
const k$=ports.sourceModule("chunk-2qkrgkcd.js")["k$"];
const Hvt=ports.sourceModule("chunk-2qkrgkcd.js")["Hvt"];
const Gw=ports.sourceModule("chunk-z6bxsds6.js")["Gw"];
const a7e=ports.sourceModule("chunk-z91ttcdt.js")["a7e"];
const l7e=ports.sourceModule("chunk-z91ttcdt.js")["l7e"];
const DQ=ports.sourceModule("chunk-z91ttcdt.js")["DQ"];
const E=ports.resolve;
async function Y(e,p={},o,c){if(e.json){if(await rft(),!JS()){m1e("claude agents --json",void 0);return}let{printAgentsJson:n}=await ports.importSource("chunk-jxk14c94.js");await n(e.cwd,e.all===!0,o),Gw()}if(process.stdout.isTTY){if(await rft(),JS()){let n=l$r();i("tengu_fleetview",{viaCommander:!0,relaunch:n});let t={...a7e(process.argv.slice(2)).config,settings:SI("--settings"),managedSettings:SI("--managed-settings"),settingSources:mse()};t.restricted||=HY();let l=k$(t.pluginDir,Hvt(ePn(),t.pluginDirNoMcp));if(l.length>0||t.pluginDirNoMcp.length>0)Bz(l),U3t(t.pluginDirNoMcp),yy("claude agents --plugin-dir (commander action)");p3t(I_e({...p,...t}));let[{mountFleetViewWithComposerBack:d},{applyFleetViewHostWindowsEnv:f},{createRoot:h},{getBaseRenderOptions:w}]=await Promise.all([ports.importSource("chunk-b5wgfjk8.js"),ports.importSource("chunk-6e2q7fgx.js"),ports.importSource("chunk-aatcqh6b.js"),ports.importSource("chunk-31xz0e80.js")]);f(),ports.importSource("chunk-n5n26kcd.js").then((s)=>s.startBackgroundHousekeeping(U().host,o));let m=e.dangerouslySkipPermissions?"bypassPermissions":e.permissionMode,u={permissionMode:m??e.inheritPermissionMode,...!m&&e.inheritPermissionMode&&{permissionModeInherited:!0},model:e.model,effort:e.effort,agent:e.agent,allowBypass:e.allowDangerouslySkipPermissions},{refuseBypassUnderRoot:S,applyBypassPolicyGate:C,ensureAgentsBypassConsent:y}=await ports.importSource("chunk-qtcqcpaq.js");S(u);let g=C(u),r=await h(w(!1)),{ensureAgentsWorkspaceTrust:P,agentsTrustDecision:v}=await ports.importSource("chunk-k9pwjc27.js");await P(r,v(),o),H3t("agents_view");let{checkHasTrustDialogAccepted:T}=await ports.importSource("chunk-5d0c5s4c.js");if(T()){let[{applyConfigEnvironmentVariables:s},{initializeTelemetryAfterTrust:D}]=await Promise.all([ports.importSource("chunk-dnxk7stv.js"),ports.importSource("chunk-d9en3kbj.js")]);s(),D(o)}await y(r,g,o);let A={cwdFilter:e.cwd,dispatchExtraArgs:DQ(l7e(t,E)),dispatchDefaults:g,entryChannel:a$r()?"list_return":"cli_agents",storageV5:o,credentials:c};await d(r,A),await Kn(0,"other",{suppressResumeHint:!0});return}}m1e("claude agents",process.stdout.isTTY?void 0:"requires an interactive terminal (stdout is not a TTY) \u2014 use 'claude agents --json' for a machine-readable listing")}
return {agentsCommandHandler:Y};
}
