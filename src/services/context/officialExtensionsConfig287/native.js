// Whole original accessors; the existing host _e instance is the only storage owner.
export function createExtensionsConfigAccessors287(ports){const n=ports.execution;
function Bz(e){n().host.extensionsConfig.replaceInlinePlugins(e)}
function ov(){return n().host.extensionsConfig.inlinePlugins()}
function U3t(e){n().host.extensionsConfig.replaceInlinePluginsNoMcp(e)}
function xL(){return n().host.extensionsConfig.inlinePluginsNoMcp()}
function uto(e){n().host.extensionsConfig.replaceInlinePluginUrls(e)}
function KOe(){return n().host.extensionsConfig.inlinePluginUrls()}
return {setInlinePlugins:Bz,getInlinePlugins:ov,setInlinePluginsNoMcp:U3t,getInlinePluginsNoMcp:xL,setInlinePluginUrls:uto,getInlinePluginUrls:KOe};
}
