import {AsyncLocalStorage} from 'node:async_hooks'
import os from 'node:os'
import fs from 'node:fs'
import {spawnSync} from 'node:child_process'
import {getPlatform} from '../../utils/platform.js'
import {createWindowsExecutableDiscovery287} from './officialWindowsShell287/executableDiscovery.js'
import {createCachedWindowsGitBashPath287,createWindowsGitBashDiscovery287} from './officialWindowsShell287/gitBashDiscovery.js'
import {createWindowsShell287Ports} from './windowsShell287.js'
import {z} from 'zod'
import type {ToolUseContext} from '../../Tool.js'
import type {Message} from '../../types/message.js'
import {getSystemPromptSectionCache,setSystemPromptSectionCacheEntry,getSystemPromptSectionEpoch,getSdkBetas} from '../../bootstrap/state.js'
import {getCwd} from '../../utils/cwd.js'
import {findGitRoot,findCanonicalGitRoot} from '../../utils/git.js'
import {getCurrentWorktreeSession} from '../../utils/worktree.js'
import {getScratchpadDir} from '../../utils/permissions/filesystem.js'
import {getRuntimeMainLoopModel,getMarketingNameForModel} from '../../utils/model/model.js'
import {getCatalogEntry} from '../../utils/model/catalog.js'
import {getModelBehaviorName287} from '../../utils/model/behavior287.js'
import {getContextWindowForModel} from '../../utils/context.js'
import {getInitialSettings} from '../../utils/settings/settings.js'
import {getClientData} from '../../utils/clientData.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../analytics/growthbook.js'
import {logForDebugging} from '../../utils/debug.js'
import {lazySchema} from '../../utils/lazySchema.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {createAttachmentMessage} from '../../utils/attachments.js'
import {createContextRuntime287,type RuntimeCache,type RuntimeAttachment} from './officialRuntime287/native.js'
import {getExecutionSession287} from './execution287.js'
import {getRuntimeMemo287} from './runtimeMemo287.js'

const scope=new AsyncLocalStorage<ToolUseContext>()
function runtimeCwd(){const read=scope.getStore()?.contextRuntime?.workingDirectory;return read?read():getCwd()}
const env={
 get platform(){return process.platform},
 get SHELL(){return authEnvironment.SHELL},
 get CLAUDE_CODE_DISABLE_ATTACHMENTS(){return authEnvironment.CLAUDE_CODE_DISABLE_ATTACHMENTS},
 get CLAUDE_CODE_SIMPLE(){return authEnvironment.CLAUDE_CODE_SIMPLE},
 get CLAUDE_CODE_SESSION_KIND(){return authEnvironment.CLAUDE_CODE_SESSION_KIND},
 get CLAUDE_CODE_TOTAL_TOKENS_REMINDER(){return authEnvironment.CLAUDE_CODE_TOTAL_TOKENS_REMINDER},
 get CLAUDE_CODE_TOTAL_TOKENS_REMINDER_BUDGET(){return authEnvironment.CLAUDE_CODE_TOTAL_TOKENS_REMINDER_BUDGET},
 get CLAUDE_CODE_TOTAL_TOKENS_REMINDER_AFTER_USER_TURN(){return authEnvironment.CLAUDE_CODE_TOTAL_TOKENS_REMINDER_AFTER_USER_TURN},
}
const currentRuntimeCache:()=>RuntimeCache=getRuntimeMemo287
const executable287=createWindowsExecutableDiscovery287({
 getCache:currentRuntimeCache,getEnv:()=>process.env,cwd:()=>process.cwd(),homedir:os.homedir,
 lstatSync:fs.lstatSync,realpathSyncNative:fs.realpathSync.native,spawnSync,
})
const discoverGitBash287=createWindowsGitBashDiscovery287({
 getOverride:()=>process.env.CLAUDE_CODE_GIT_BASH_PATH,existsSync:fs.existsSync,
 findExecutable:executable287.findExecutable,warn:logForDebugging,
})
const windowsShell287=createWindowsShell287Ports({
 getPlatform:()=>process.platform,getOSName:getPlatform,
 getPowerShellToolSetting:()=>authEnvironment.CLAUDE_CODE_USE_POWERSHELL_TOOL,
 getFeatureValue:getFeatureValue_CACHED_MAY_BE_STALE,getShell:()=>authEnvironment.SHELL,
 getCache:currentRuntimeCache,
 getGitBashPath:()=>createCachedWindowsGitBashPath287(currentRuntimeCache(),discoverGitBash287)(),
})
// Shared original $a reader: hook defaults use the same Windows/Git-Bash owner.
export const usesBashTools287=windowsShell287.Ta
export const contextRuntimeKernel=createContextRuntime287({
 toolsMachine:()=>scope.getStore()?.contextRuntime?.toolsMachine?.(),a:env,p:lazySchema,d:z.object,k:z.array,o:z.string,O:z.boolean,Fo:z.discriminatedUnion,R:z.literal,
 B6e:()=>scope.getStore()?.contextRuntime?.agentProxyNote?.(),Be:model=>getModelBehaviorName287(model),Va:getCatalogEntry,mp:getMarketingNameForModel,
 Em:getSdkBetas,Gg:getContextWindowForModel,Jf:getRuntimeMainLoopModel,
 nm:runtimeCwd,NR:async()=>{const cwd=runtimeCwd();return cwd!==null&&findGitRoot(cwd)!==null},
 M2:cwd=>{const gitRoot=findGitRoot(cwd);return gitRoot!==null&&findCanonicalGitRoot(cwd)!==gitRoot},Rc:getCurrentWorktreeSession,
 Ppn:os.version,U6e:os.release,xpn:os.type,Ta:windowsShell287.Ta,Yb:windowsShell287.Yb,
 Vb:()=>getFeatureValue_CACHED_MAY_BE_STALE('tengu_scratch',false),jw:getScratchpadDir,
 ko:getRuntimeMemo287,Xe:getInitialSettings,md:()=>getClientData(),x:getFeatureValue_CACHED_MAY_BE_STALE,
 S7e:getSystemPromptSectionCache,Y5r:setSystemPromptSectionCacheEntry,tQ:getSystemPromptSectionEpoch,
 dmn:(name,text)=>scope.getStore()?.contextRuntime?.resolvePromptSection?.(name,text)??Promise.resolve(text),
 pe:ctx=>ctx.getAppState().toolPermissionContext,qf:ctx=>ctx.options.mainLoopModel,
 ke:value=>value,ji:values=>values.map(value=>({...value,content:`<system-reminder>\n${value.content}\n</system-reminder>`})),
 // Existing C telemetry cancellation; no fabricated provider/account records.
 i(){},t:logForDebugging,c:text=>text,_:text=>text,
})
export function createRuntimeContextCollectors(ctx:ToolUseContext,messages:Message[],input:string|null,options?:{isRegularUserPrompt?:boolean;deliveredTurnStart?:boolean}) {
 return {
  environment:()=>scope.run(ctx,()=>contextRuntimeKernel.environment(ctx,messages)),
  model:()=>scope.run(ctx,()=>contextRuntimeKernel.model(ctx,messages)),
  tokens:()=>scope.run(ctx,()=>{
   // Original ptr's bare-fork branch never reaches the runtime reminder slots.
   if(ctx.options.bareFork)return []
   const regular=(options?.isRegularUserPrompt??false)&&contextRuntimeKernel.totalTokensMode()!=='off'&&contextRuntimeKernel.totalTokensAfterUserTurn()
   return input===null&&!options?.deliveredTurnStart||regular
    ?contextRuntimeKernel.totalTokens(getExecutionSession287(),messages,ctx.options.mainLoopModel,ctx.agentId,regular):[]
  }),
 }
}
export async function getRuntimeContextAttachments(ctx:ToolUseContext,messages:Message[],input:string|null,options?:{isRegularUserPrompt?:boolean;deliveredTurnStart?:boolean}) {
 const collectors=createRuntimeContextCollectors(ctx,messages,input,options)
 const [environment,model,tokens]=await Promise.all([collectors.environment(),collectors.model(),collectors.tokens()])
 return {environment,model,tokens}
}
export function normalizeRuntimeContextAttachment(attachment:RuntimeAttachment){return contextRuntimeKernel.normalizers[attachment.type](attachment)}
export function createRuntimeContextMessage(attachment:RuntimeAttachment){
 const normalized=normalizeRuntimeContextAttachment(attachment)
 return {...createAttachmentMessage(attachment),...(normalized.length?{rendered:normalized.map(value=>({content:value.content})),renderedRole:'system' as const}:{})}
}
export function restoreRuntimeContext(before:Message[],after:Message[],ctx:ToolUseContext){
 const retainDirectory=scope.run(ctx,()=>runtimeCwd()!==null)
 return scope.run(ctx,()=>[...contextRuntimeKernel.restoreEnvironment(before,after,retainDirectory),...contextRuntimeKernel.restoreModel(before,after)].map(createRuntimeContextMessage).concat((require('../../utils/sessionSettings287.js') as typeof import('../../utils/sessionSettings287.js')).restoreSessionSettingsAttachments287(before,after).map(createAttachmentMessage)))
}

export function rollOverRuntimeContext(messages:Message[],ctx:ToolUseContext){
 if(contextRuntimeKernel.totalTokensMode()==='padded-countdown')contextRuntimeKernel.budgets.of(getExecutionSession287()).rollOverContext(ctx.agentId??'main',contextRuntimeKernel.usage(messages))
}

/** Shared original nullable Windows Git Bash discovery, not the exiting shell helper. */
export function getWindowsGitBashPath287():string|null {return createCachedWindowsGitBashPath287(currentRuntimeCache(),discoverGitBash287)()}
