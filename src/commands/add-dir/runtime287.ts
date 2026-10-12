import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as crypto from 'node:crypto'
import chalk from 'chalk'
import * as React from 'react'
const {c:compilerCache}=require('react/compiler-runtime') as {c(size:number):any[]}
import {jsx,jsxs} from 'react/jsx-runtime'
import figures from 'figures'
import {Box,Text} from '../../ink.js'
import {MessageResponse} from '../../components/MessageResponse.js'
import {getExecutionSession287,runWithExecutionSession287} from '../../services/context/execution287.js'
import {preflightWorkspacePath287} from '../../services/context/workspaceConfinement287.js'
import {canonicalPostTurnSource287} from '../../query/postTurnClient287/index.js'
import {getCanonicalMessageQueue287} from '../../utils/messageQueueManager.js'
import {applyPermissionUpdate,persistPermissionUpdate} from '../../utils/permissions/PermissionUpdate.js'
import {SandboxManager} from '../../utils/sandbox/sandbox-adapter.js'
import {getAdditionalDirectoriesForClaudeMd,setAdditionalDirectoriesForClaudeMd} from '../../bootstrap/state.js'
import type {LocalJSXCommandContext,LocalJSXCommandOnDone,LocalCommandResult} from '../../types/command.js'
import type {ToolPermissionContext} from '../../Tool.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import {ConfinementPolicyError287} from '../../utils/confinement287/confinementError287.js'
import {logError} from '../../utils/log.js'
import {logForDebugging} from '../../utils/debug.js'
import * as native from './official287/native.js'
import proof from './official287/provenance.json' with {type:'json'}
import {AddWorkspaceDirectory} from '../../components/permissions/rules/AddWorkspaceDirectory.js'
import type {AddDirectoryResult,AlreadyAccessibleDirectory287} from './validation.js'

// Only original functions/imports are composed here. There is no session,
// extension registry, scanner, permission cache or project copy owned here.
function ports(group:keyof typeof proof.groups,overrides:Record<string,unknown>={}):Record<string,any>{
 return Object.fromEntries(proof.groups[group].ports.map(({local,file,name})=>{
  if(Object.hasOwn(overrides,local))return [local,overrides[local]]
  if(file==='path')return [local,Reflect.get(path,name)]
  if(file==='crypto')return [local,Reflect.get(crypto,name)]
  if(file==='fs/promises')return [local,Reflect.get(fs,name)]
  return [local,canonicalPostTurnSource287(file,name)]
 }))
}
const common={fe:chalk,d:logError,t:logForDebugging}
let validation:ReturnType<typeof native.createValidation287>|undefined
function validator(){return validation??=native.createValidation287(ports('validation',{
 ...common,c:async (absolutePath:string)=>{
  // A rejected path reaches neither raw stat nor extension scanning. Missing
  // files still follow original nle's pathNotFound branch.
  preflightWorkspacePath287(getExecutionSession287(),absolutePath,'write')
  return fs.stat(absolutePath)
 },
}))}
export async function validateAddDirectory287(directoryPath:string,permissionContext:ToolPermissionContext):Promise<AddDirectoryResult>{
 // nle catches stat errors by design. C13 denial must be distinct and must
 // precede any original network-probe/stat dependency with an external path.
 if(directoryPath&&!directoryPath.includes('\0')){
  const {expandPath}=await import('../../utils/path.js')
  let absolute:string|undefined
  try{absolute=path.resolve(expandPath(directoryPath))}catch{/* Original rich invalidPath below. */}
  if(absolute)try{preflightWorkspacePath287(getExecutionSession287(),absolute,'write')}
  catch(error){if(error instanceof ConfinementPolicyError287)return {resultType:'confinementBlocked',directoryPath,code:error.code};throw error}
 }
 return await validator().nle(directoryPath,permissionContext) as AddDirectoryResult
}
export function addDirectoryHelp287(result:AddDirectoryResult):string{
 if(result.resultType==='confinementBlocked')return `Directory was not added: Workspace confinement: ${result.code}.`
 return validator().rle(result) as string
}
let aliases:ReturnType<typeof native.createAliases287>|undefined
function aliasFunctions(){return aliases??=native.createAliases287(ports('aliases',common))}
let background:ReturnType<typeof native.createBackground287>|undefined
function backgroundFunctions(){return background??=native.createBackground287(ports('background',common))}
let actions:ReturnType<typeof native.createActions287>|undefined
function actionFunctions(){return actions??=native.createActions287(ports('actions',{
 ...common,RGn:(...args:any[])=>aliasFunctions().RGn(...args),BFr:(...args:any[])=>backgroundFunctions().BFr(...args),
 // Same existing permission and extension owners, not raw facsimile cells.
 ed:applyPermissionUpdate,l3:persistPermissionUpdate,
 xu:getAdditionalDirectoriesForClaudeMd,CW:setAdditionalDirectoriesForClaudeMd,je:SandboxManager,
 pe:(context:LocalJSXCommandContext)=>context.getAppState().toolPermissionContext,
}))}
export function addDirSourceContext287(context:LocalJSXCommandContext){
 const session=context.session??getExecutionSession287()
 return {...context,session,messageQueue:runWithExecutionSession287(session,getCanonicalMessageQueue287),
  setToolPermissionContext:(update:(prev:ToolPermissionContext)=>ToolPermissionContext)=>context.setAppState(prev=>({...prev,toolPermissionContext:update(prev.toolPermissionContext)})),
 }
}
export async function addDirectory287(context:LocalJSXCommandContext,directory:string,remember:boolean):Promise<string>{
 const session=context.session??getExecutionSession287()
 return runWithExecutionSession287(session,async()=>{
  // Re-check after the dialog wait, before permission/extension writes/hooks.
  preflightWorkspacePath287(session,directory,'read')
  return await actionFunctions().kJt(addDirSourceContext287(context),directory,remember) as string
 })
}
export function loadAccessibleDirectory287(context:LocalJSXCommandContext,result:AlreadyAccessibleDirectory287):string|null{
 const session=context.session??getExecutionSession287()
 return runWithExecutionSession287(session,()=>{
  preflightWorkspacePath287(session,result.absolutePath,'read')
  return actionFunctions().kRt(addDirSourceContext287(context),result) as string|null
 })
}
function callerPorts(context:LocalJSXCommandContext){return {
 pe:(c:LocalJSXCommandContext)=>c.getAppState().toolPermissionContext,
 nle:validateAddDirectory287,rle:addDirectoryHelp287,kJt:addDirectory287,kRt:loadAccessibleDirectory287,
}}
export async function callTextAddDir287(args:string,context:LocalJSXCommandContext):Promise<LocalCommandResult>{
 return runWithExecutionSession287(context.session??getExecutionSession287(),()=>native.createText287(callerPorts(context)).d(args,context))
}
// Host React/Ink ABI only: original y/L and the existing original kr/root clock.
export async function callInteractiveAddDir287(onDone:LocalJSXCommandOnDone,context:LocalJSXCommandContext,args?:string):Promise<React.ReactNode>{
 const session=context.session??getExecutionSession287()
 const renderer=native.createInteractive287({...callerPorts(context),fe:chalk,w:compilerCache,e:jsx,r:jsxs,J:figures,Ne:MessageResponse,n:Text,s:Box,kr:canonicalPostTurnSource287('chunk-jkt292h5.js','kr'),
  rze:(props:React.ComponentProps<typeof AddWorkspaceDirectory>)=>jsx(AddWorkspaceDirectory,{...props,session}),
 })
 return runWithExecutionSession287(session,()=>renderer.L(onDone,context,args))
}
export function withAddDirSession287<T>(session:ExecutionSession287|undefined,callback:()=>T):T{return runWithExecutionSession287(session??getExecutionSession287(),callback)}
