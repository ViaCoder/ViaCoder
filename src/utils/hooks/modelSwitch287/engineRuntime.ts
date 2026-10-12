import {createHash} from 'node:crypto'
import * as path from 'node:path'
import {Bt} from '../../officialHostFilesystem287/native.js'
import {getProjectsDir} from '../../sessionStorage.js'
import {getToolResultsDir} from '../../toolResultStorage.js'
import {isStorageV5PinnedOn} from '../../secureStorage/storageV5.js'
import {getErrnoCode as getErrno} from '../../errors.js'
import {executionSessionRegistryConstructor287} from '../../../services/context/execution287.js'
import baseGetTag from 'lodash-es/_baseGetTag.js'
import NativeSymbol from 'lodash-es/_Symbol.js'
import {normalizeLegacyToolName} from '../../permissions/permissionRuleParser.js'
import {WEB_FETCH_TOOL_NAME} from '../../../tools/WebFetchTool/prompt.js'
import {WEB_SEARCH_TOOL_NAME} from '../../../tools/WebSearchTool/prompt.js'
import {createStore} from '../../../state/store.js'
import {getExecutionSession287} from '../../../services/context/execution287.js'
import {createHookEnginePluginSpelling287,createHookEnginePluginIdentity287,createHookEngineActivity287,createHookEngineNotice287,createHookEngineSignal287,createHookEngineTruncate287,createHookEngineWorkspace287,createHookEngineDirectories287,createHookEngineUtf8287,createHookEngineByteLabel287,createHookEngineStorageError287,createHookEngineAgentIdentity287,createHookEnginePermissionUpdates287,createHookEnginePermissionPattern287,createHookEngineErrorContext287,createHookEngineEngine287,createHookEngineString287,createHookEngineObservation287,createHookEngineDisplay287,createHookEngineMetadata287,createHookEngineNormalization287,createHookEngineRegistry287,createHookEngineHashMetadata287,createHookEnginePersistence287,createHookEngineCaps287,createHookEngineGuards287,createHookEngineStatus287,createHookEngineStringCast287,createHookEngineStatusCode287,type HookEngine287} from './engine.js'
import {hookRegistrationGate287} from './registrationGate.js'
import proof from './engine.provenance.json' with {type:'json'}
let failureNotice:ReturnType<typeof createHookEngineNotice287>|undefined
export function getHookFailureNoticeOwner287(){return (failureNotice??=createHookEngineNotice287({...createHookEngineSignal287({}),...createHookEngineTruncate287({})})).EE}
let engine:HookEngine287|undefined
let outputWorkspace:ReturnType<typeof createHookEngineWorkspace287>|undefined
export function createOriginalHookEnginePorts287(hosts:Record<string,unknown>):Record<string,unknown> {
 const strings=createHookEngineString287({}),metadata=createHookEngineMetadata287({})
 // Each missing application boundary fails when reached; never manufacture success.
 const missing=Object.fromEntries([...new Set(Object.values(proof.groups).flatMap(group=>group.imported))].map(name=>[name,()=>{throw Error('Original Hook execution port not connected: '+name)}]))
 const identity=createHookEnginePluginIdentity287(createHookEnginePluginSpelling287({}))
 const activity=createHookEngineActivity287({...missing,...hosts,...identity,ut:()=> (require('../../plugins/modsRegistryOwner287.js') as typeof import('../../plugins/modsRegistryOwner287.js')).modsRegistryOwner287.registry()})
 const common={...missing,...identity,...activity,EE:getHookFailureNoticeOwner287(),...metadata,...strings,...createHookEngineGuards287({}),...createHookEngineCaps287({}),...hosts}
 const persistencePorts={...common,...(outputWorkspace??=createHookEngineWorkspace287({Tt:executionSessionRegistryConstructor287,U:getExecutionSession287,t:hosts.t})),
 ...createHookEngineDirectories287({...common,Ae:path.join,Br:path.relative,Bt,Dp:getProjectsDir,E:getErrno,F:isStorageV5PinnedOn,It:path.basename,Mr:path.isAbsolute,jr:path.basename,kt:path.sep,xt:path.dirname}),
 ...createHookEngineUtf8287({}),...createHookEngineByteLabel287({}),...createHookEngineStorageError287({}),
 Bt,E:getErrno,F:isStorageV5PinnedOn,X:path.join,b:path.basename,z:path.dirname,lS:getToolResultsDir,Z:(value:unknown)=>value instanceof Error?value:Error(String(value)),td:(value:unknown)=>typeof value==='object'&&value!==null&&!Array.isArray(value),
 }
 const status=createHookEngineStatus287({...common,...createHookEngineStringCast287({mee:baseGetTag,nB:NativeSymbol}),...createHookEngineStatusCode287(metadata)})
 return {...common,...persistencePorts,...status,...createHookEngineHashMetadata287({...metadata,e:createHash}),
 ...createHookEnginePersistence287({...persistencePorts,...status}),...createHookEngineObservation287({}),
 ...createHookEngineDisplay287(strings),...createHookEngineAgentIdentity287({}),...createHookEngineErrorContext287({}),
 ...createHookEnginePermissionUpdates287({...common,...createHookEnginePermissionPattern287({Zl:normalizeLegacyToolName}),hr:WEB_FETCH_TOOL_NAME,Cm:WEB_SEARCH_TOOL_NAME}),...createHookEngineNormalization287({}),...createHookEngineRegistry287({}),
 ...hookRegistrationGate287,Ls:createStore,U:getExecutionSession287,...hosts}
}
export function createOriginalHookEngine287(hosts:Record<string,unknown>):HookEngine287{return createHookEngineEngine287(createOriginalHookEnginePorts287(hosts))}
export function getOriginalHookEngine287(hosts:()=>Record<string,unknown>):HookEngine287{return engine??=createOriginalHookEngine287(hosts())}
