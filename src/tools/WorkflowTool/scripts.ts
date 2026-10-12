import type { LoadedPlugin, PluginManifest } from '../../types/plugin.js'
import {getFsImplementation} from '../../utils/fsOperations.js'
import {areWorkflowsEnabled} from './gate.js'
import {getWorkflowLoader287,getWorkflowParser287,registerWorkflow287,readBundledWorkflows287} from './officialLoader287/runtime.js'

// Fixed 2.1.287 chunk-57ewcm63.js / chunk-pzbak5zb.js, directly on the
// canonical lifecycle's host-scoped ro/ut. No local discovery/cache owner.
export const MAX_WORKFLOW_SCRIPT_BYTES = 524_288

export type WorkflowPhase = { title: string; detail?: string; model?: string }
export type WorkflowMeta = {
  name: string
  description: string
  title?: string
  whenToUse?: string
  phases?: WorkflowPhase[]
}
export type WorkflowDefinition = {
  source: 'built-in' | 'plugin' | 'userSettings' | 'projectSettings'
  name: string
  description: string
  whenToUse?: string
  phases?: WorkflowPhase[]
  script: string
  filePath?: string
  plugin?: string
  pluginManifest?: PluginManifest
  serverPluginId?: string
  disableModelInvocation?: boolean | (() => boolean)
}
export type ParsedWorkflow = { meta: WorkflowMeta; scriptBody: string }


export function parseWorkflowScript(script:string):ParsedWorkflow|{error:string} {
  return getWorkflowParser287().F_(script)
}

/** Single-plugin reader: same original _/v, bounded reads and realpath set as P.
 * Normal discovery calls complete P(storageV5), not a substituted callback.
 */
export async function loadPluginWorkflows(plugin:LoadedPlugin):Promise<WorkflowDefinition[]> {
  const original=getWorkflowLoader287(),seen=new Set<string>(),workflows:WorkflowDefinition[]=[]
  if(plugin.workflowsPath)workflows.push(...await original._(plugin.workflowsPath,plugin.name,plugin.source,plugin.manifest,seen))
  for(const file of plugin.workflowsPaths??[]) {
    try {
      const info=await getFsImplementation().stat(file)
      if(info.isDirectory())workflows.push(...await original._(file,plugin.name,plugin.source,plugin.manifest,seen))
      else if(info.isFile()&&file.endsWith('.js')) {
        const workflow=await original.v(file,plugin.name,plugin.source,plugin.manifest,seen)
        if(workflow)workflows.push(workflow)
      }
    } catch { /* Complete discovery reports errors through original P. */ }
  }
  const serverPluginId=(plugin as LoadedPlugin&{serverPluginId?:string}).serverPluginId
  if(serverPluginId!==undefined)for(const workflow of workflows)workflow.serverPluginId=serverPluginId
  return workflows
}

// iCe's second parameter is StorageV5, never pluginDir. Inline plugin paths are
// consumed by the existing xi/ut plugin loader; public local callers omit v5.
export async function getAllWorkflows(cwd:string,storageV5?:unknown):Promise<WorkflowDefinition[]> {
  if(!areWorkflowsEnabled())return []
  const {initBundledWorkflows}=await import('./bundled/index.js')
  await initBundledWorkflows()
  return getWorkflowLoader287().iCe(cwd,storageV5)
}

export async function findWorkflow(name:string,cwd:string,storageV5?:unknown):Promise<WorkflowDefinition|undefined> {
  return (await getAllWorkflows(cwd,storageV5)).find(workflow=>workflow.name===name)
}

export function invalidateWorkflowCache():void {getWorkflowLoader287().VDn()}

export function registerBundledWorkflow(script:string,options?:{disableModelInvocation?:()=>boolean}):void {
  const parsed=getWorkflowParser287().F_(script,{validateBody:false})
  if('error'in parsed)throw Error(parsed.error)
  registerWorkflow287(script,parsed.meta,options)
}
export function getBundledWorkflows():readonly WorkflowDefinition[] {return readBundledWorkflows287()}
