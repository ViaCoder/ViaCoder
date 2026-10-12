import {access} from 'node:fs/promises'
import {constants} from 'node:fs'
import {spawnSync} from 'node:child_process'
import {basename,isAbsolute,resolve} from 'node:path'
import type {LocalJSXCommandContext} from '../../types/command.js'
import {getCwd} from '../../utils/cwd.js'
import {getSessionId,getIsRemoteMode,getProjectRoot} from '../../bootstrap/state.js'
import {flushSessionStorage,getTranscriptPath,recordTranscript} from '../../utils/sessionStorage.js'
import {runCleanupFunctions} from '../../utils/cleanupRegistry.js'
import {createTuiCarry} from './official.js'
import {cleanupTerminalForRelaunch} from '../../utils/gracefulShutdown.js'

// Official cpf7rt77 boot → VKe/QX snapshot; JZ/QZ adds live model/mode/rules.
// Local presentation/inference knobs below are retained, not reset to official defaults.
const configValues:Record<string,string>={'--settings':'settings','--plugin-dir':'pluginDir','--plugin-dir-no-mcp':'pluginDirNoMcp','--add-dir':'addDir','--mcp-config':'mcpConfig'}
const values=new Set(['--name','-n','--advisor','--teammate-mode','--model','--fallback-model','--effort','--permission-mode','--agent','--agents','--append-system-prompt','--thinking','--thinking-display','--max-thinking-tokens','--max-budget-usd','--max-turns','--task-budget','--autocompact','--workload','--debug-file'])
const multi=new Set(['--add-dir','--allowed-tools','--allowedTools','--disallowed-tools','--disallowedTools','--mcp-config','--betas','--channels'])
const switches=new Set(['--brief','--enable-auto-mode','--proactive','--forward-subagent-text','--use-system-ca','--use-openssl-ca','--allow-dangerously-skip-permissions','--dangerously-skip-permissions','--strict-mcp-config','--verbose','--bare','--disable-slash-commands','--chrome','--no-chrome','--ide','--mcp-debug','--debug-to-stderr','--no-session-persistence'])
const restricted:Record<string,string>={'--system-prompt':'systemPrompt','--system-prompt-file':'systemPromptFile','--append-system-prompt-file':'appendSystemPromptFile','--permission-prompt-tool':'permissionPromptTool','--setting-sources':'settingSources','--managed-settings':'managedSettings','--project-config-root':'projectConfigRoot','--tools':'tools'}
const officialCarry=createTuiCarry({kMr:()=>false})
export function carryTuiArgs(argv:readonly string[],baseDirectory=getProjectRoot()):string[]{
 const result:string[]=[],options:any={pluginDir:[],pluginDirNoMcp:[],addDir:[],mcpConfig:[],strictMcpConfig:false,restricted:false}
 for(let i=0;i<argv.length;i++){
  const token=argv[i]!,equal=token.indexOf('='),arg=equal>0?token.slice(0,equal):token,inline=equal>0?token.slice(equal+1):undefined
  if(arg==='--resume'||arg==='-r'){if(inline===undefined&&argv[i+1]&&!argv[i+1]!.startsWith('-'))i++;continue}
  if(arg==='--continue'||arg==='-c'||arg==='--fork-session')continue
  if(arg==='--session-id'){if(inline===undefined)i++;continue}
  if(arg==='--debug'||arg==='-d'||arg==='--prompt-suggestions'){
   result.push(arg);if(inline!==undefined)result.push(inline);else if(argv[i+1]&&!argv[i+1]!.startsWith('-'))result.push(argv[++i]!);continue
  }
  if(arg==='--strict-mcp-config'){options.strictMcpConfig=true;continue}
  if(switches.has(arg)){if(inline!==undefined)throw Error(`Unexpected value for ${arg}`);result.push(arg);continue}
  if(values.has(arg)||multi.has(arg)||configValues[arg]||restricted[arg]){
   const first=inline!==undefined?inline:argv[++i]
   if(first===undefined||first.startsWith('--'))throw Error(`Missing value for ${arg}`)
   const entries=[first]
   if(multi.has(arg)||arg==='--tools')while(argv[i+1]&&!argv[i+1]!.startsWith('-'))entries.push(argv[++i]!)
   if(restricted[arg]){options[restricted[arg]!]=arg==='--tools'?entries:first;continue}
   const key=configValues[arg]
   if(key){if(Array.isArray(options[key]))options[key].push(...entries);else options[key]=first}
   else result.push(arg,...entries)
   continue
  }
  throw Error(`This launch argument needs an explicit restart: ${arg.startsWith('-')?arg:'initial prompt'}`)
 }
 if(officialCarry.restricted(options))throw Error('This launch configuration needs an explicit restart: a custom system prompt, a tool allowlist, or restricted settings')
 return [...officialCarry.argv(officialCarry.resolve(options,(s:string)=>resolve(baseDirectory,s))),...result]
}
export function tuiRelaunchBlocker(context:LocalJSXCommandContext):string|undefined{
 if(getIsRemoteMode()||context.options.isNonInteractiveSession||!process.stdin.isTTY||!process.stdout.isTTY)return 'This connection does not own a standalone interactive terminal.'
 const entry=process.argv[1]
 if(!entry||!isAbsolute(entry)||!['cli.tsx','cli.js'].includes(basename(entry)))return 'This launcher needs an explicit restart.'
 const permissions=context.getAppState().toolPermissionContext
 if((permissions.alwaysDenyRules.session??[]).length||(permissions.alwaysAskRules.session??[]).length||(permissions.alwaysAskRules.cliArg??[]).length)return 'Permission rules set for this session cannot be carried by the launcher.'
 try{carryTuiArgs(process.argv.slice(2))}catch(e){return (e as Error).message}
 return undefined
}
export function buildTuiCarry(context:LocalJSXCommandContext):string[]{
 const state=context.getAppState(),permission=state.toolPermissionContext,args=carryTuiArgs(process.argv.slice(2))
 // These explicit session selections supersede launch values; preferences
 // not explicitly selected stay preferences (no promotion to fixed effort).
 if(state.mainLoopModelForSession)args.push('--model',state.mainLoopModelForSession)
 if(state.effortValue!==undefined)args.push('--effort',String(state.effortValue))
 args.push('--permission-mode',permission.mode)
 for(const dir of permission.additionalWorkingDirectories.values())if(dir.source==='cliArg')args.push('--add-dir',dir.path)
 for(const rule of permission.alwaysAllowRules.cliArg??[])args.push('--allowed-tools',rule)
 for(const rule of permission.alwaysDenyRules.cliArg??[])args.push('--disallowed-tools',rule)
 return args
}
export type RelaunchPorts={preflight():Promise<void>;persist():Promise<void>;hasTranscript():Promise<boolean>;release():Promise<void>;terminal():void;spawn(args:string[],env:NodeJS.ProcessEnv):{status:number|null;error?:Error};exit(code:number):void;error?(message:string):void}
/** koe ordering: preflight → durable transcript → cleanup owner → terminal → new process. */
export async function relaunchTui(target:'default'|'fullscreen',flags:string[],id:string,ports:RelaunchPorts):Promise<void>{
 await ports.preflight();await ports.persist()
 const args=await ports.hasTranscript()?['--resume',id,...flags]:flags
 const env={...process.env,CLAUDE_CODE_TUI_JUST_SWITCHED:target}
 for(const key of ['CLAUDE_CODE_NO_FLICKER','CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN','CLAUDE_CODE_TUI_TRIAL','CLAUDE_BRIDGE_REATTACH_SESSION','CLAUDE_BRIDGE_REATTACH_SEQ','CLAUDE_BRIDGE_REATTACH_OUTBOUND_ONLY','CLAUDE_BRIDGE_REATTACH_GROUPING','CLAUDE_BRIDGE_REATTACH_OWNER_ACCT','CLAUDE_BRIDGE_REATTACH_OWNER_ORG','CLAUDE_BRIDGE_REATTACH_NO_BACKFILL'])delete env[key]
 // After release begins the old UI is no longer a usable owner. Match koe:
 // failure is terminal, not a rejected promise returned to a detached Ink UI.
 try{
  await ports.release();ports.terminal()
  const child=ports.spawn(args,env)
  if(child.error)throw child.error
  ports.exit(child.status??1)
 }catch(error){
  ports.terminal()
  ports.error?.(`Failed to relaunch: ${error instanceof Error?error.message:String(error)}. The session is saved; resume with --resume ${id}.`)
  ports.exit(1)
 }
}
export async function relaunchLocalTui(target:'default'|'fullscreen',flags:string[],context:LocalJSXCommandContext):Promise<void>{
 const executable=process.execPath,entry=process.argv[1]!,runtimeArgs=process.execArgv
 await relaunchTui(target,flags,getSessionId(),{
  preflight:async()=>{await access(executable,constants.X_OK);await access(entry,constants.R_OK)},
  persist:async()=>{await recordTranscript(context.messages);await flushSessionStorage()},
  hasTranscript:async()=>access(getTranscriptPath()).then(()=>true,()=>false),
  release:async()=>{await runCleanupFunctions();await flushSessionStorage()},terminal:cleanupTerminalForRelaunch,
  spawn:(args,env)=>spawnSync(executable,[...runtimeArgs,entry,...args],{cwd:getCwd(),env,stdio:'inherit'}),
  exit:code=>process.exit(code),error:message=>process.stderr.write(message+'\n'),
 })
}
