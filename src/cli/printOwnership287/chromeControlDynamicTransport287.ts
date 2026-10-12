/** Transport the original Chrome dynamic imports to existing canonical owners. */
import {CLAUDE_IN_CHROME_MCP_SERVER_NAME} from '../../utils/claudeInChrome/common.js'
import {getChromeMenuDependency287,getChromeMenuEnvironment287,getChromeMenuSource287} from '../../utils/claudeInChrome/menuRuntime287.js'
import {getChromeStartupRuntime287} from '../../utils/claudeInChrome/startupRuntime287.js'
import {isClaudeAISubscriber} from '../../utils/auth.js'
import {getGlobalConfig} from '../../utils/config.js'
import {logForDebugging} from '../../utils/debug.js'
import {logError} from '../../utils/log.js'
import {isPolicyAllowed} from '../../services/policyLimits/index.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import type {LaunchOptions287} from '../../tools/AgentTool/officialAgentPromptState287/native.js'
import {hasChromeBridgeScope,isChromeExtensionInstalled} from '../../utils/claudeInChrome/setup.js'
import {createChromeDialogAndGate287} from './chromeDialogGatesNative287.js'

type ChromeBridgeModule287={
 callChromeTool:(connection:unknown,name:string,args:Record<string,unknown>)=>Promise<unknown>
 listConnectedBrowsers:(connection:unknown)=>Promise<Array<{deviceId:string;name:string;osPlatform?:string}>>
 noBrowsersWhenUnreachable:(error:unknown)=>unknown
 isChromeBridgeUnreachable:(error:unknown)=>boolean
}
function chromeBridgeModule287():ChromeBridgeModule287{
 const source=getChromeMenuSource287('chunk-g45mcjt4.js')
 if(typeof source.u8t!=='function'||typeof source.FIn!=='function'||typeof source.Ros!=='function'||typeof source.Hnt!=='function')
  throw Error('Canonical Chrome bridge exports are incomplete: chunk-g45mcjt4.js')
 return {callChromeTool:source.u8t,listConnectedBrowsers:source.FIn,noBrowsersWhenUnreachable:source.Ros,isChromeBridgeUnreachable:source.Hnt}
}
function chromeDialogAndGateModule287(){
 const menu=getChromeMenuSource287('chunk-09m4fzsj.js')
 const original=createChromeDialogAndGate287({
  a:getChromeMenuEnvironment287(),
  t:logForDebugging,
  ft:isClaudeAISubscriber,
  le:getGlobalConfig,
  sk:()=>isPolicyAllowed('allow_claude_browser_extension'),
  ac:CLAUDE_IN_CHROME_MCP_SERVER_NAME,
  cH:isChromeExtensionInstalled,
  lH:menu.lH,
  g_e:menu.g_e,
  d:logError,
  Zc:getChromeMenuDependency287('chunk-df0597gf.js','Zc'),
  iJe:hasChromeBridgeScope,
  yr:()=>getChromeStartupRuntime287().yr(),
  AT:()=>{const launchOptions=getExecutionSession287().host.launchOptions as LaunchOptions287&{restrictedSession():boolean};return launchOptions.restrictedSession()},
  yge:()=>getChromeStartupRuntime287().blocked(),
 })
 return original
}
/**
 * Canonical transport for the original four import() specifiers in hI.
 * The returned namespaces are projections of existing module owners: common.ts,
 * menuRuntime287, and exact helper bodies mechanically recovered from raw 287.
 */
export function importPrintChromeModule287(specifier:string):Promise<Readonly<Record<string,unknown>>>{
 switch(specifier){
  case '/$bunfs/root/chunk-1dgevehz.js':
   return Promise.resolve({CLAUDE_IN_CHROME_MCP_SERVER_NAME})
  case '/$bunfs/root/chunk-0mdf5h9g.js':
   return Promise.resolve(chromeBridgeModule287())
  case '/$bunfs/root/chunk-k49nb21r.js':
   return Promise.resolve(chromeDialogAndGateModule287())
  case '/$bunfs/root/chunk-9pwdyydg.js':
   return Promise.resolve(chromeDialogAndGateModule287())
  default:
   throw Error('Unmapped official print Chrome module: '+specifier)
 }
}
