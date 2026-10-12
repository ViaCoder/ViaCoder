import {updateOrdinarySettingsAsync287} from '../../utils/settings/fastStatusWriter287.js'
import React,{useEffect,useState} from 'react'
import chalk from 'chalk'
import {statSync} from 'node:fs'
import {join,resolve} from 'node:path'
import {getOriginalCwd,getIsRemoteMode,setAdditionalDirectoriesForClaudeMd,getAdditionalDirectoriesForClaudeMd} from '../../bootstrap/state.js'
import {Select} from '../../components/CustomSelect/index.js'
import {Box,Text} from '../../ink.js'
import type {LocalJSXCommandCall,LocalJSXCommandContext} from '../../types/command.js'
import {getGlobalConfig,saveGlobalConfig,getProjectPathForConfig} from '../../utils/config.js'
import {getCwd} from '../../utils/cwd.js'
import {logForDebugging} from '../../utils/debug.js'
import {clearMemoryFileCaches,getMemoryFiles,getClaudeMds} from '../../utils/claudemd.js'
import {clearSkillCaches,getSkillDirCommands} from '../../skills/loadSkillsDir.js'
import {skillChangeDetector} from '../../utils/skills/skillChangeDetector.js'
import {settingsChangeDetector} from '../../utils/settings/changeDetector.js'
import {applySettingsChange} from '../../utils/settings/applySettingsChange.js'
import {getSettingsWithErrors,getInitialSettings} from '../../utils/settings/settings.js'
import {refreshActivePlugins} from '../../utils/plugins/refresh.js'
import {SandboxManager} from '../../utils/sandbox/sandbox-adapter.js'
import {getProjectMcpConfigsFromCwd} from '../../services/mcp/config.js'
import {getProjectMcpServerStatus} from '../../services/mcp/utils.js'
import {moveSessionDirectory} from './move.js'
import {validateCd} from './validation.js'
import {createCdCommand} from './official.js'

function Completed({onDone}:{onDone:()=>void}){useEffect(onDone,[onDone]);return null}
function Approvals({pending,onComplete}:{pending:{pendingServers:string[]};onComplete:(result?:{persistFailed?:boolean})=>void}){
 const [index,setIndex]=useState(0),[failed,setFailed]=useState(false)
 const name=pending.pendingServers[index]
 if(!name)return <Completed onDone={()=>onComplete({persistFailed:failed})}/>
 return <Box flexDirection="column"><Text>New project MCP server: {name}</Text><Select options={[{label:'Use this MCP server',value:'yes'},{label:'Do not use',value:'no'}]} onChange={async (value:string)=>{
  const key=value==='yes'?'enabledMcpjsonServers':'disabledMcpjsonServers',settings=getInitialSettings()
  const {error}=await updateOrdinarySettingsAsync287('localSettings', {[key]:[...settings[key]??[],name]})
  if(error)setFailed(true)
  setIndex(index+1)
 }} onCancel={()=>onComplete()}/></Box>
}
function TrustMove({directory,disclosures,onConfirm,onComplete,onCancel}:any){
 const [outcome,setOutcome]=useState<any>(null),[busy,setBusy]=useState(false),[error,setError]=useState('')
 if(outcome)return <Approvals pending={outcome.pending} onComplete={result=>onComplete(outcome.modelMessage,result)}/>
 return <Box flexDirection="column"><Text>Trust {directory} and move this session?</Text><Text>Its project instructions, permissions, hooks, MCP servers, and settings environment will apply.</Text>{disclosures&&<Text>{disclosures}</Text>}{error&&<Text color="error">{error}</Text>}{busy?<Text>Moving session…</Text>:<Select options={[{label:'Trust and move',value:'yes'},{label:'Stay here',value:'no'}]} onChange={(v:string)=>{
  if(v!=='yes'){onCancel();return}setBusy(true);void onConfirm().then((next:any)=>{if(next)setOutcome(next)}).catch((e:Error)=>{setError(e.message);setBusy(false)})
 }} onCancel={onCancel}/>}</Box>
}
function targetDisclosures(directory:string):string{
 const found=[]
 for(const file of ['.claude/settings.json','.claude/settings.local.json','.mcp.json','CLAUDE.md']){
  try{statSync(join(directory,file));found.push(file)}catch{}
 }
 return found.length?`Project files: ${found.join(', ')}`:''
}
// Local permission resolver has no parent-only project-grant gate. Require
// explicit trust for that target instead of silently applying inherited grants.
function explicitTrust(directory:string):boolean{
 return getGlobalConfig().projects?.[resolve(directory).replaceAll('\\','/')]?.hasTrustDialogAccepted===true
}
async function relocate(context:LocalJSXCommandContext,directory:string,warn:(message:string)=>void){
 const previous=getOriginalCwd()
 const departed=[...context.getAppState().toolPermissionContext.additionalWorkingDirectories.values()]
  .filter(d=>d.source==='projectSettings'||d.source==='localSettings').map(d=>d.path)
 const warning=await moveSessionDirectory(directory)
 if(warning)warn(warning)
 getProjectPathForConfig.cache.clear?.();clearMemoryFileCaches();clearSkillCaches()
 setAdditionalDirectoriesForClaudeMd(getAdditionalDirectoriesForClaudeMd().filter(d=>!departed.includes(d)))
 context.setAppState(state=>({...state,toolPermissionContext:{...state.toolPermissionContext,
  additionalWorkingDirectories:new Map([...state.toolPermissionContext.additionalWorkingDirectories].filter(([,d])=>d.source!=='projectSettings'&&d.source!=='localSettings'))}}))
 const followup=async(label:string,work:()=>unknown)=>{try{await work()}catch(error){warn(`${label}: ${String(error)}`)}}
 await followup('Settings watcher',()=>settingsChangeDetector.rehome())
 await followup('Project settings',()=>{settingsChangeDetector.notifyChange('projectSettings');applySettingsChange('projectSettings',context.setAppState)})
 await followup('Skills watcher',()=>skillChangeDetector.rehome())
 await followup('Skills refresh',()=>getSkillDirCommands(directory));await followup('Sandbox refresh',()=>SandboxManager.refreshConfig())
 let memory=''
 await followup('Project instructions',async()=>{memory=getClaudeMds(await getMemoryFiles(),t=>t==='Project'||t==='Local')})
 return {modelMessage:`The session's working directory has changed to ${directory} (via /cd). The environment block at the start of this conversation still names the previous directory — that information is stale. All tool calls and relative paths now resolve from ${directory}. Project settings (permission rules, hooks), project MCP servers, and project skills now come from ${directory}; its CLAUDE.md, if any, follows below. Environment variables set by the previous directory's settings stay in effect for this process — they cannot be unset — and the new directory's settings env is applied on top of them.\n\n${memory}`,
  departedAdditionalDirectories:departed,projectGrantsGated:false,gatedNotice:'',previous}
}
export const call:LocalJSXCommandCall=async(onDone,context,args)=>{
 if(getIsRemoteMode()){onDone('/cd requires the local session directory owner.',{display:'system'});return null}
 const warnings:string[]=[]
 const complete:typeof onDone=(message,options)=>onDone(warnings.length?`${message} Warning: ${warnings.join("; ")}`:message,options)
 const command=createCdCommand({e:React.createElement,N:Completed,Zwn:validateCd,me:(c:LocalJSXCommandContext)=>c.getAppState().toolPermissionContext,pe:chalk,
  eEn:(directory:string,check:any)=>`Cannot move to ${directory}: ${check.result}. Check Cd permission rules.`,Tn:(s:string)=>s,
  $7e:(_session:unknown,directory:string)=>relocate(context,directory,message=>warnings.push(message)),t:logForDebugging,oe:getCwd,
  II:explicitTrust,G:Approvals,K:TrustMove,qH:()=>undefined,Ce:resolve,he:targetDisclosures,Ne:TrustMove,
  sIe:async(directory:string)=>{const key=resolve(directory).replaceAll('\\','/');saveGlobalConfig(c=>({...c,projects:{...c.projects,[key]:{...c.projects?.[key],hasTrustDialogAccepted:true} as any}}));if(!explicitTrust(directory))throw Error('Trust preference was not saved')},
  zGt:async()=>({pendingServers:Object.keys(getProjectMcpConfigsFromCwd().servers).filter(name=>getProjectMcpServerStatus(name)==='pending'),pluginServerNames:new Set()}),
  iWe:()=>getSettingsWithErrors().errors,
 })
 return await command(complete,{...context,reloadPlugins:()=>refreshActivePlugins(context.setAppState)},args) as React.ReactNode
}
