import {syncAppStateEffortSnapshot287} from '../../utils/model/officialEffortOwner287.js'
import {getSettingsEffortTable} from '../../utils/model/effortSettings.js'
import {encodeSessionEffort} from '../../utils/model/effortSettings.js'
import type {SessionEffort} from '../../utils/model/effortSettings.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import {logError} from '../../utils/log.js'
import {logForDebugging} from '../../utils/debug.js'
import {getPrintHostSource287} from './publicHostRuntime287.js'
import {createWorkSecretCallerNative287,createWorkSecretLeafNative287,createWorkSecretRequestNative287,type WorkSecretCaller287} from './workSecretCaller287.native.js'
import {createClaudeWorkSecretNative287,type ClaudeWorkSecretInputs287,type ClaudeWorkSecretOwner287} from './claudeOAuthControls287.native.js'
import {getMcpConnectedProducer287,getMcpClientModule287} from '../../services/mcp/connectedProducer287.js'
import callerProof from './workSecretCaller287.provenance.json' with {type:'json'}
import acceptedProof from './claudeOAuthControls287.provenance.json' with {type:'json'}
type Binding287={file:string;name:string}
const imports287:Readonly<Record<string,Readonly<Record<string,Binding287>>>>={...acceptedProof.imports,...callerProof.imports}
const locals287:Readonly<Record<string,readonly string[]>>=callerProof.locals
const leaves287:Readonly<Record<string,readonly string[]>>=callerProof.leaves
// Only recovered function identities/static retry constants are memoized. All
// mutable clients, grants, permissions, credentials and identity belong to the
// existing canonical owners and the single original conditional Ir closure.
const functions287=new Map<string,unknown>()
export function readWorkSecretSource287(file:string,name:string):unknown {
 if(file==='chunk-dp67c56j.js'||file==='chunk-z6w3579x.js'){
  const namespace=getMcpConnectedProducer287().sourceModule(file)
  if(Object.hasOwn(namespace,name))return namespace[name]
 }
 try{return getPrintHostSource287(file,name)}catch(error){
  if(!leaves287[file]?.includes(name))throw error
  const key=file+':'+name
  if(!functions287.has(key))functions287.set(key,createWorkSecretLeafNative287(file,name,workSecretPorts287(file)))
  return functions287.get(key)
 }
}
function workSecretPorts287(file:string,caller:object={}):object {
 const imports=imports287[file]??{},locals=locals287[file]??[]
 return new Proxy(caller,{
  has:(target,name)=>typeof name==='string'&&(Object.hasOwn(target,name)||name==='canonicalMcpClient287'||Object.hasOwn(imports,name)||locals.includes(name)),
  get(target,name,receiver){
   if(name===Symbol.unscopables)return undefined
   if(Object.hasOwn(target,name))return Reflect.get(target,name,receiver)
   if(name==='canonicalMcpClient287')return getMcpClientModule287
   if(name==='d'&&Object.hasOwn(imports,'d'))return logError
   if(name==='t'&&Object.hasOwn(imports,'t'))return logForDebugging
   const binding=typeof name==='string'?imports[name]:undefined
   if(binding)return readWorkSecretSource287(binding.file,binding.name)
   if(typeof name==='string'&&locals.includes(name))return readWorkSecretSource287(file,name)
   throw Error('Original work-secret caller definition missing '+file+':'+String(name))
  },
  set:(target,name,value,receiver)=>Reflect.set(target,name,value,receiver),
 })
}
/** Same accepted complete vt transport; this adapter supplies only previously
 * unselected public helper definitions, never a second auth/MCP owner. */
export function createWorkSecretOwner287(input:ClaudeWorkSecretInputs287):ClaudeWorkSecretOwner287 {
 return createClaudeWorkSecretNative287(workSecretPorts287('chunk-ttxp2r5q.js'))(input)
}
export function createWorkSecretCaller287(caller:object):WorkSecretCaller287 {
 const adapted=Object.defineProperties({},Object.getOwnPropertyDescriptors(caller))
 const stores=Reflect.get(caller,'fn') as ClaudeWorkSecretInputs287['stores']
 const session=Reflect.get(caller,'e') as ExecutionSession287
 const sourceState287=(state:any)=>{
  const effort=session.modelSelection.mainLoopEffortState()
  if(!effort)throw Error('Original work-secret caller requires initialized canonical modelSelection effort owner')
  return {...state,sessionEffort:effort.sessionEffort}
 }
 const getAppState=()=>sourceState287(stores.getAppState())
 const setAppState=(update:(state:any)=>any)=>{stores.setAppState(previous=>{
  const source=sourceState287(previous),next=update(source)
  if(next===source)return previous
  const {sessionEffort,...state}=next as {sessionEffort:SessionEffort;[key:string]:any}
  return {...state,effortValue:sessionEffort===source.sessionEffort?previous.effortValue:encodeSessionEffort(sessionEffort)}
 });syncAppStateEffortSnapshot287(session.modelSelection,stores.getAppState().effortValue,false,getSettingsEffortTable)}
 Object.defineProperties(adapted,{
  v:{value:getAppState,configurable:true},R:{value:setAppState,configurable:true},
  fn:{value:{...stores,getAppState,setAppState},configurable:true},
 })
 const io=Reflect.get(caller,'r') as object
 const request=createWorkSecretRequestNative287(workSecretPorts287('chunk-64z3xwk8.js'))
 Object.defineProperty(adapted,'r',{value:new Proxy(io,{get(target,name,receiver){
  if(name==='requestRemoteControlWorkSecret')return (sessionId:string)=>request.call(io,sessionId)
  return Reflect.get(target,name,receiver)
 }}),configurable:true})
 Object.defineProperties(adapted,{
  readWorkSecretModule287:{value:async()=>({createHeadlessWorkSecretSession:createWorkSecretOwner287})},
  readProjectsJoinModule287:{value:()=>Object.fromEntries(['PROJECTS_MOUNT_FIRST_COMMAND_WAIT_MS','joinProjectsMountBeforeFirstCommand'].map(name=>[name,readWorkSecretSource287('chunk-8hvekfp7.js',name==='PROJECTS_MOUNT_FIRST_COMMAND_WAIT_MS'?'j':'L')]))},
 })
 return createWorkSecretCallerNative287(workSecretPorts287('chunk-xapeakym.js',adapted))
}
