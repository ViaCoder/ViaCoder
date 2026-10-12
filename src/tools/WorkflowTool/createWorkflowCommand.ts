import type { Command } from '../../types/command.js'
import { getAllWorkflows, type WorkflowDefinition } from './scripts.js'
import {createWorkflowCommandBuilder287} from './officialCommand287/native.js'
import proof from './officialCommand287/provenance.json' with {type:'json'}
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'

let builder:ReturnType<typeof createWorkflowCommandBuilder287>|undefined
// The original closure reads existing lifecycle state, not another workflow or
// authoring-skill cache. Resolve only when commands are actually requested.
function createWorkflowCommand(workflow: WorkflowDefinition): Command {
  if(!builder){
    const owner=getOriginalModsLifecycle287()
    builder=createWorkflowCommandBuilder287(Object.fromEntries(Object.entries(proof.imports).map(([name,[module,symbol]])=>[name,owner.clearLifecycleSource287(module,symbol)])))
  }
  return builder(workflow)
}

export async function getWorkflowCommands(cwd: string, storageV5?: unknown): Promise<Command[]> {
  return (await getAllWorkflows(cwd, storageV5)).map(createWorkflowCommand)
}
