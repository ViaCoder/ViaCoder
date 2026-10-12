import * as path from 'node:path'
import * as fs from 'node:fs'
import * as fsPromises from 'node:fs/promises'
import * as crypto from 'node:crypto'
import {fileURLToPath} from 'node:url'
import * as source from './officialBuiltinInit287/native.js'
import proof from './officialBuiltinInit287/provenance.json' with {type:'json'}
import {getBuiltinRegistryOwner287,getBuiltinRegistryProduction287,getAgentsBuiltinModule287,getBuiltinSettingsChoice287} from './builtinRegistry287.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getOutsideHookRuntime287} from '../../utils/hooks/outsideRuntime287.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {getOriginalCwd,getIsNonInteractiveSession} from '../../bootstrap/state.js'
import {getGlobalConfig,saveGlobalConfig} from '../../utils/config.js'
import {getOriginalSettingsReader287} from '../../utils/settings/settingsReader287.js'
import {color} from '../../components/design-system/color.js'
import {getInitialSettings,getSettingsWithErrors} from '../../utils/settings/settings.js'
import {getFeatureValue_CACHED_WITH_REFRESH,getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {logForDebugging} from '../../utils/debug.js'
import {getBundledSkillsRoot} from '../../utils/permissions/filesystem.js'
import {getBundledSkillExtractDir} from '../../skills/bundledSkills.js'

type OriginalModule=Record<string,any>
type Group={factory:string;rows:readonly {name:string;source:string;variable:boolean}[];bindings:Record<string,{file:string;name:string}>;exports:Record<string,string>}
const groups=proof.groups as Record<string,Group>
const lifecycle=()=>getOriginalModsLifecycle287()
const base=path.join(path.dirname(fileURLToPath(import.meta.url)),'builtinPackages287')
const directory=(file:string)=>path.join(base,file.replace(/\.js$/,''))
// Module-instance holders, not another plugin registry, settings/auth cache or
// tip history. All builtin entries and scan records live only in ro/Ne.
const instances:Record<string,OriginalModule>={},imports:Record<string,unknown>={}
const nodes:Record<string,Record<string,unknown>>={path,fs,'fs/promises':fsPromises,crypto}
const app:Record<string,unknown>={
 registryOwner:getBuiltinRegistryOwner287,selection:()=>getBuiltinRegistryProduction287().NQ(),skillRoot:getBundledSkillsRoot,
 assetText:(name:string)=>{const file=path.basename(name),pinned=proof.resources[file as keyof typeof proof.resources];if(!pinned)throw Error("Unpinned builtin asset: "+file);const b=fs.readFileSync(path.join(base,"assets",file));if(crypto.createHash("sha256").update(b).digest("hex")!==pinned.sha256)throw Error("Builtin asset drift: "+file);return (file.endsWith(".zst")?Bun.zstdDecompressSync(b):b).toString("utf8")},
 skillWire:(...args:unknown[])=>getBuiltinPackageModule287("chunk-r18gtvpy.js").rts(...args),
 register:(definition:unknown)=>getBuiltinRegistryProduction287().eS(definition),
 descriptor:(folder:string,module:OriginalModule,metadata:()=>{scan:unknown})=>{
  const owner=getBuiltinRegistryProduction287(),descriptor=owner.iU(folder,module,metadata)
  // Same packaged metadata cut as Agents, limited to the generated package
  // directories. Never register an authored/user module without its scanner.
  if('folder'in descriptor&&folder.startsWith(base+path.sep)){
   const scan=metadata()?.scan
   if(!scan)throw Error('Original packaged builtin scan missing: '+folder)
   lifecycle().builtinPluginScanner287.registerScan(path.join(folder,'hooks/register.js'),scan)
  }
  return descriptor
 },
 builtinFolder:(name:string)=>directory(name==='diff'?'chunk-wm8f7gyy.js':name),
 available:(name:string)=>getBuiltinRegistryProduction287().GVr(name),definition:(name:string)=>getBuiltinRegistryProduction287().zw(name),
 execution:getExecutionSession287,nonInteractive:getIsNonInteractiveSession,debug:logForDebugging,
 feature:getFeatureValue_CACHED_WITH_REFRESH,cachedFeature:getFeatureValue_CACHED_MAY_BE_STALE,
 globalConfig:getGlobalConfig,saveGlobalConfig,settings:getInitialSettings,cwd:getOriginalCwd,environment:process.env,
 skillDirectory:getBundledSkillExtractDir,color,
 metadataWriter:()=> (require('../../utils/sessionStorage.js') as typeof import('../../utils/sessionStorage.js')).getDevModsMetadataOwner287(),
 // Original OC is async: a synchronous native FS throw becomes a rejection
 // for tOr's original catch, while the journal/queue itself stays unchanged.
 metadataAppend:async(fullPath:string,entry:Record<string,unknown>,storageV5?:unknown)=>{
  if(storageV5!==undefined)throw Error('Dev-mods StorageV5 metadata writer is not connected')
  return (require('../../utils/sessionStorage.js') as typeof import('../../utils/sessionStorage.js')).appendClearMetadataEntry287(fullPath,entry)
 },
 settingsSource:(name:Parameters<ReturnType<typeof getOriginalSettingsReader287>['source']>[0])=>{const r=getOriginalSettingsReader287();return r.source(name,r.heldContext())},
 heldSettingsContext:()=>getOriginalSettingsReader287().heldContext(),settingsMetadata:getSettingsWithErrors,
 builtinChoice:(...args:unknown[])=>getBuiltinSettingsChoice287().VG(...args),
 pluginsCacheOnly:(...args:unknown[])=>(require('../../utils/plugins/pluginLoader.js') as typeof import('../../utils/plugins/pluginLoader.js')).loadAllPluginsCacheOnly(...args),
 get permissionTool(){return (require('../../tools/AskUserQuestionTool/AskUserQuestionTool.js') as typeof import('../../tools/AskUserQuestionTool/AskUserQuestionTool.js')).AskUserQuestionTool},
 // Frozen C: pure telemetry callbacks remain omitted. No admission/credential
 // verdict is replaced with a success/default false/no-op.
 frozenTelemetry:()=>{},
}
function local(file:string,name:string):unknown{
 const group=groups[file]
 if(!group)throw Error('Public builtin dependency module not yet bound: '+file+':'+name)
 const module=moduleOf(file),key=group.exports[name]??name
 if(Object.hasOwn(module,key))return module[key]
 if(Object.hasOwn(module.public,name))return module.public[name]
 throw Error('Public builtin declaration not yet bound: '+file+':'+name)
}
function imported(file:string,name:string):unknown{
 const key=file+':'+name;if(Object.hasOwn(imports,key))return imports[key]
 const cut=proof.cuts.find(c=>c.file===file&&c.name===name)
 let value:unknown
 if(cut?.owner==='application')value=app[(cut as {port:string}).port]
 else if(cut?.owner==='node')value=name==='*'?nodes[file]:name==='default'?nodes[file]:nodes[file]?.[name]
 else if(cut?.owner==='lifecycle')value=lifecycle().clearSourceModule287(file)[(cut as {local:string}).local]
 else if(cut?.owner==='outside')value=getOutsideHookRuntime287().sourceModule(file)[(cut as {local:string}).local]
 else{
  // Imports of source functions are lazy to preserve module initialization
  // without entering unrelated dev-watch/skill/transport operations. The
  // invocation resolves the original declaration, never returns fake success.
  const group=groups[file],key=group?.exports[name]??name,row=group?.rows.find(r=>r.name===key)
  if(row&&(row.source.startsWith('function ')||row.source.startsWith('async function ')||/^[\w$]+=(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)=>/.test(row.source))){
   value=(...args:unknown[])=>{const fn=local(file,name);if(typeof fn!=='function')throw Error('Original builtin import is not callable: '+key);return fn(...args)}
  }else value=local(file,name)
 }
 if(value===undefined)throw Error('Canonical builtin import missing: '+key)
 imports[key]=value;return value
}
function moduleOf(file:string):OriginalModule{
 if(instances[file])return instances[file]
 const group=groups[file],factory=group&&(source as unknown as Record<string,(ports:unknown)=>OriginalModule>)[group.factory]
 if(!factory)throw Error('Public builtin source module not yet connected: '+file)
 return instances[file]=factory({get:imported,directory:directory(file),module:publicModule,importModule:async(file:string)=>publicModule(file)})
}
function publicModule(file:string):OriginalModule{
 if(file==='chunk-2a2022xc.js')return (require('../../services/tips/tipsProduction287.js') as typeof import('../../services/tips/tipsProduction287.js')).getNativeTipModule287(file).public
 if(file==='chunk-eq2jw754.js')return getAgentsBuiltinModule287()
 if(file==='chunk-tcxknsqc.js')return {wireSkillFilesExtraction:app.skillWire,getBundledSkillExtractDir:app.skillDirectory}

 return moduleOf(file).public
}
export function getBuiltinPackageModule287(file:string):OriginalModule{return moduleOf(file)}
export function initializePublicBuiltins287():void{
 source.initializeBuiltins287({ro:getBuiltinRegistryOwner287,rpe:getBuiltinRegistryProduction287().rpe,a:process.env,
  FJr:()=>{const fn=local('chunk-0a47xg8f.js','FJr');if(typeof fn!=='function')throw Error('Original FJr missing');return fn()},
  module:publicModule,directory:base})
}

/** Complete original _t/Lh uses canonical selection and ro-owned extraction weakmap. */
export function readBuiltinSkillCommands287():any[]{return getBuiltinPackageModule287("chunk-sthe7p0e.js")._t()}

export function wireBuiltinSkillFiles287(definition:unknown):{skillRoot:string|undefined;getPromptForCommand:any}{return getBuiltinPackageModule287("chunk-r18gtvpy.js").rts(definition)}
export function builtinSkillExtractDir287(name:string):string{return getBuiltinPackageModule287("chunk-r18gtvpy.js").HUe(name)}

/** Readonly original dependency binding, for independent raw observer replay. */
export const readBuiltinDependency287=(file:string,name:string):unknown=>imported(file,name)

export const readBuiltinPublicModule287=(file:string):Record<string,any>=>publicModule(file)
