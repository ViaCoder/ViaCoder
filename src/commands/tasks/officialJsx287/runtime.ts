import type {LocalJSXCommandContext} from '../../../commands.js'
import type {LocalJSXCommandOnDone} from '../../../types/command.js'
import type {ReactNode, ComponentType} from 'react'
import {publicCommandSourcePort287 as canonical} from '../../../utils/commandCompletionProducers287.js'
import {getOriginalModsLifecycle287} from '../../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getWorkflowExecutionSource287} from '../../../tools/WorkflowTool/officialExecution287/runtime.js'
import {getTools} from '../../../tools.js'
import sourceProof from './provenance.json' with {type:'json'}
import {create as factory0} from './chunk-ne5cvdkz.js'
import {create as factory1} from './chunk-f2cpzzp9.js'
import {create as factory2} from './chunk-mphp7acd.js'
import {create as factory3} from './chunk-p54b66vv.js'
import {create as factory4} from './chunk-ja7vednk.js'
import {create as factory5} from './chunk-5s6b4r7q.js'
import {create as factory6} from './chunk-9hktajv8.js'
import {create as factory7} from './chunk-jcz2qb1f.js'
import {create as factory8} from './chunk-pjb5g3rk.js'
import {create as factory9} from './chunk-3qqte4xv.js'
import {create as factory10} from './chunk-6xrs6gmd.js'
import {create as factory11} from './chunk-2s2bptza.js'
import {create as factory12} from './chunk-1cedw4af.js'
import {create as factory13} from './chunk-7y4dr5ny.js'
import {create as factory14} from './chunk-hrhfcbdv.js'
import {create as factory15} from './chunk-m59srz4k.js'
import {create as factory16} from './chunk-rxxcd631.js'
import {create as factory17} from './chunk-8tmmrx5g.js'
import {create as factory18} from './chunk-0pprbvtw.js'
import {create as factory19} from './chunk-v3wcrzft.js'
type SourceRef287={file:string;name:string};
interface TasksProof287{aliases:Record<string,SourceRef287>;groups:Record<string,{rows:{names:string[]}[];ports:{local:string;file:string;name:string}[]}>;requires:Record<string,{canonicalPublicNamespace?:boolean;existingWorkflowSource?:boolean}&Record<string,unknown>>;borrowed:{file:string;name:string;kind:string}[]}
const proof=sourceProof as unknown as TasksProof287;
const factories:Record<string,{create:(ports:Record<string,unknown>)=>Record<string,any>}>={"chunk-ne5cvdkz.js":{create:factory0},"chunk-f2cpzzp9.js":{create:factory1},"chunk-mphp7acd.js":{create:factory2},"chunk-p54b66vv.js":{create:factory3},"chunk-ja7vednk.js":{create:factory4},"chunk-5s6b4r7q.js":{create:factory5},"chunk-9hktajv8.js":{create:factory6},"chunk-jcz2qb1f.js":{create:factory7},"chunk-pjb5g3rk.js":{create:factory8},"chunk-3qqte4xv.js":{create:factory9},"chunk-6xrs6gmd.js":{create:factory10},"chunk-2s2bptza.js":{create:factory11},"chunk-1cedw4af.js":{create:factory12},"chunk-7y4dr5ny.js":{create:factory13},"chunk-hrhfcbdv.js":{create:factory14},"chunk-m59srz4k.js":{create:factory15},"chunk-rxxcd631.js":{create:factory16},"chunk-8tmmrx5g.js":{create:factory17},"chunk-0pprbvtw.js":{create:factory18},"chunk-v3wcrzft.js":{create:factory19}};
export type NativeTasksProps287=Pick<LocalJSXCommandContext,'storageV5'|'session'> & {messageQueue?:unknown} & Pick<LocalJSXCommandContext['options'],'tools'|'commands'|'verbose'> & {onDone:LocalJSXCommandOnDone;initialDetailTaskId?:string;onBack?:()=>void;promptVisibleBelow?:boolean};
export interface OriginalTasksPublic287{call(onDone:LocalJSXCommandOnDone,context:LocalJSXCommandContext&{isMidTurn?:boolean}):Promise<ReactNode>;BackgroundTasksView:ComponentType<NativeTasksProps287>;McpTaskDetailView:ComponentType<any>}
async function createTasksPublic287(){
 
 
 const sourceOwner=getOriginalModsLifecycle287();
 
 const instances=new Map<string,Record<string,any>>();
 const namespaces:any={};for(const [file,m]of Object.entries(proof.requires) as any)if(m.canonicalPublicNamespace)namespaces[file]=await sourceOwner.importPublicSourceModule287('/$bunfs/root/'+file);
 const builtinModules:any={};for(const p of proof.borrowed.filter((p:any)=>p.kind==='builtin'))if(!builtinModules[p.file])builtinModules[p.file]=await import(p.file);
 function read(file:string,name:string):any{
  const alias=proof.aliases[file+':'+name];if(alias)return read(alias.file,alias.name);
  if(proof.groups[file]?.rows.some((r:any)=>r.names.includes(name)))return load(file)[name];
  if(file==='chunk-djhbc0y7.js'&&name==='HO')return getTools;
  if(builtinModules[file])return builtinModules[file][name];
  const value=canonical(file,name);if(value===undefined)throw Error('Missing canonical task port '+file+':'+name);return value;
 }
 function requireOriginal287(specifier:string):any{
  const file=specifier.replace('/$bunfs/root/','');if(namespaces[file])return namespaces[file];
  const module=proof.requires[file];if(!module)throw Error('Unmapped required task namespace '+file);
  if(module.existingWorkflowSource){const original=getWorkflowExecutionSource287('chunk-8tmmrx5g.js');return {killWorkflowTask:original.O4,pauseWorkflowTask:original.wge,skipWorkflowAgent:original.AVe,retryWorkflowAgent:original.TVe};}
  return Object.fromEntries(Object.entries(module).map(([key,p]:any)=>[key,read(p.file,p.name)]));
 }
 function load(file:string):any{if(instances.has(file))return instances.get(file);const g=proof.groups[file];const ports=Object.defineProperties({requireOriginal287,importOriginal287:(specifier:string)=>sourceOwner.importPublicSourceModule287(specifier)},Object.fromEntries(g.ports.map((p:any)=>[p.local,{enumerable:true,get:()=>read(p.file,p.name)}])));const namespace=factories[file].create(ports);instances.set(file,namespace);return namespace;}
 const original=load('chunk-ne5cvdkz.js');
 const native=load('chunk-f2cpzzp9.js');
 return {call:original.de as OriginalTasksPublic287['call'],BackgroundTasksView:native.WEt as OriginalTasksPublic287['BackgroundTasksView'],McpTaskDetailView:native.cF as OriginalTasksPublic287['McpTaskDetailView']};
}
let publication:Promise<OriginalTasksPublic287>|undefined;
export function getOriginalTasksPublic287():Promise<OriginalTasksPublic287>{return publication??=createTasksPublic287();}
