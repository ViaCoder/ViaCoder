import * as path from 'node:path'
import * as fs from 'node:fs'
import * as fsPromises from 'node:fs/promises'
import * as os from 'node:os'
import * as net from 'node:net'
import * as source from './officialTips287/native.js'
import proof from './officialTips287/provenance.json' with {type:'json'}
import {getDefaultBindingsSource287} from '../../keybindings/defaultBindingsSource287.js'
import {getKeybindingState287} from '../../keybindings/state287.js'
import connectedProof from '../mcp/officialConnected287/provenance.json' with {type:'json'}
import {getMcpConnectedProducer287} from '../mcp/connectedProducer287.js'
import builtinProof from '../../plugins/bundled/officialBuiltinInit287/provenance.json' with {type:'json'}
import lifecycleProof from '../../utils/plugins/officialHooksLifecycle287/provenance.json' with {type:'json'}
import outsideProof from '../../utils/hooks/officialHooksOutside287/provenance.json' with {type:'json'}
import {getBuiltinRegistryProduction287} from '../../plugins/bundled/builtinRegistry287.js'
import {getBuiltinPackageModule287,readBuiltinPublicModule287} from '../../plugins/bundled/builtinInit287.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getOutsideHookRuntime287} from '../../utils/hooks/outsideRuntime287.js'
import {getExecutionSession287,executionRecommendationGates287} from '../context/execution287.js'
import {getNativeFirstPartyRequest287} from '../api/usageProduction287.js'
import {getGlobalConfig,saveCurrentProjectConfig} from '../../utils/config.js'
import {getInitialSettings} from '../../utils/settings/settings.js'
import {getOriginalSettingsReader287} from '../../utils/settings/settingsReader287.js'
import {getFeatureValue_CACHED_WITH_REFRESH} from '../analytics/growthbook.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {env} from '../../utils/env.js'
import {logForDebugging} from '../../utils/debug.js'
import {logError} from '../../utils/log.js'
import {getOriginalCwd} from '../../bootstrap/state.js'
import {isPolicyAllowed} from '../policyLimits/index.js'
import {commandCapability287} from '../../utils/commandCapability287.js'
import {color} from '../../components/design-system/color.js'
import type {ThemeName} from '../../utils/theme.js'
import type {FileStateCache} from '../../utils/fileStateCache.js'

type Namespace=Record<string,any>
type Group={factory:string;rows:readonly {name:string;source:string}[];exports:Record<string,string>}
const groups=proof.groups as Record<string,Group>,cells:Record<string,Namespace>={}
const builtinGroups=builtinProof.groups as Record<string,Group>
// Namespace holders only. G/f in the full primary module is the sole Tips cache;
// Utt is deliberately NOT constructed here: it remains the installed builtin's.
const ownerIndex=(p:{modules:readonly {file:string;rows:readonly any[]}[]})=>Object.fromEntries(p.modules.map(g=>[g.file,new Set(g.rows.flatMap(r=>r.names??[r.name]))]))
const lifecycleIndex=ownerIndex(lifecycleProof),outsideIndex=ownerIndex(outsideProof),connectedIndex=ownerIndex(connectedProof)
const typedEnv=new Proxy(authEnvironment,{get(target,key,receiver){if(key==='terminal')return env.terminal;if(key==='isSSH')return env.isSSH;return Reflect.get(target,key,receiver)}})
const app:Record<string,unknown>={
 'chunk-bn3p37gv.js:U':getExecutionSession287,
 // Original host-keyed V (not session-root-keyed Tt) already belongs to the
 // outside namespace. Oae keeps its original registry and key identity.
 get 'chunk-bn3p37gv.js:V'(){return getOutsideHookRuntime287().sourceModule('chunk-bn3p37gv.js').V},
 'chunk-nankzm0s.js:Gt':new Proxy({}, {get:(_target,key)=>Reflect.get(getNativeFirstPartyRequest287().Gt,key)}),
 'chunk-nankzm0s.js:$f':saveCurrentProjectConfig,
 'chunk-nankzm0s.js:fn':()=> (require('../../utils/auth.js') as typeof import('../../utils/auth.js')).getClaudeAIOAuthTokens(),
 'chunk-mphp7acd.js:xi':(...args:unknown[])=> (require('../../utils/plugins/pluginLoader.js') as any).loadAllPluginsCacheOnly(...args),
 'chunk-wgt53hn2.js:zn':()=> (require('../../utils/secureStorage/index.js') as typeof import('../../utils/secureStorage/index.js')).getSecureStorage(),
 'chunk-f1vb7bx7.js:M':()=>getOriginalSettingsReader287().context(),
 'chunk-f1vb7bx7.js:Xje':(name:any,ctx:any)=>getOriginalSettingsReader287().source(name,ctx),
 'chunk-f1vb7bx7.js:Zn':(name:any)=>{const r=getOriginalSettingsReader287();return r.path(name,r.context())},
 get 'chunk-tf0wpqry.js:C0'(){return getDefaultBindingsSource287()},
 'chunk-tf0wpqry.js:LP':getKeybindingState287(),
 'chunk-q80zaav8.js:t':logForDebugging,'chunk-amhtwhch.js:d':logError,
 'chunk-nankzm0s.js:le':getGlobalConfig,'chunk-nankzm0s.js:k':getFeatureValue_CACHED_WITH_REFRESH,
 'chunk-nankzm0s.js:In':()=> (require('../../utils/auth.js') as typeof import('../../utils/auth.js')).getOauthAccountInfo(),
 'chunk-nankzm0s.js:ft':()=> (require('../../utils/auth.js') as typeof import('../../utils/auth.js')).isClaudeAISubscriber(),
 'chunk-nankzm0s.js:ir':()=> (require('../../utils/auth.js') as typeof import('../../utils/auth.js')).getSubscriptionType(),
 'chunk-f1vb7bx7.js:er':getInitialSettings,'chunk-f1vb7bx7.js:tt':getInitialSettings,
 'chunk-f1vb7bx7.js:ge':(name:Parameters<ReturnType<typeof getOriginalSettingsReader287>['source']>[0])=>{const r=getOriginalSettingsReader287();return r.source(name,r.heldContext())},
 'chunk-s354e3rr.js:oe':getOriginalCwd,'chunk-mbfze585.js:a':typedEnv,
 'chunk-mphp7acd.js:Sce':commandCapability287.availability,
 'chunk-b5kmgz2n.js:on':isPolicyAllowed,
 'chunk-sthe7p0e.js:NQ':()=>getBuiltinRegistryProduction287().NQ(),
 'chunk-sthe7p0e.js:zw':(name:string)=>getBuiltinRegistryProduction287().zw(name),
 'chunk-2ynta9xc.js:Ft':executionRecommendationGates287.Ft,
 'chunk-nx5qd7y4.js:Pn':color,
}
function local(file:string,name:string):unknown{const g=groups[file],m=getNativeTipModule287(file),key=g.exports[name]??name;if(Object.hasOwn(m,key))return m[key];throw Error('Original Tips declaration not selected: '+file+':'+name)}
function canonical(file:string,name:string):unknown{
 if(Object.hasOwn(app,file+':'+name))return app[file+':'+name]
 if(file==='path')return (path as unknown as Namespace)[name]
 if(file==='fs')return (fs as unknown as Namespace)[name]
 if(file==='fs/promises')return (fsPromises as unknown as Namespace)[name]
 if(file==='os')return (os as unknown as Namespace)[name]
 if(file==='net')return (net as unknown as Namespace)[name]
 const bg=builtinGroups[file],bk=bg?.exports[name]??name
 if(bg?.rows.some(r=>r.name===bk))return getBuiltinPackageModule287(file)[bk]
 // A source public alias can name a local symbol differently. Evidence from
 // the existing namespace must select that exact declaration, not a name twin.
 const aliases=(lifecycleProof as any).modules.find((g:any)=>g.file===file)?.exports
 const lk=aliases?.[name]??name
 if(lifecycleIndex[file]?.has(lk))return getOriginalModsLifecycle287().clearSourceModule287(file)[lk]
 const other=(outsideProof as any).modules.find((g:any)=>g.file===file)?.exports,ok=other?.[name]??name
 if(outsideIndex[file]?.has(ok))return getOutsideHookRuntime287().sourceModule(file)[ok]
 const connectedAliases=(connectedProof as any).modules.find((g:any)=>g.file===file)?.exports,ck=connectedAliases?.[name]??name
 if(connectedIndex[file]?.has(ck))return getMcpConnectedProducer287().sourceModule(file)[ck]
 throw Error('Public Tips canonical dependency not connected: '+file+':'+name)
}
/** Readonly dependency entry for an independently extracted raw observer. */
export function readNativeTipDependency287(file:string,name:string):unknown{
 if(groups[file]){
  const g=groups[file],key=g.exports[name]??name,row=g.rows.find(r=>r.name===key)
  if(row){if(/^async function |^function /.test(row.source))return (...args:unknown[])=>{const fn=local(file,name);if(typeof fn!=='function')throw Error('Original Tips dependency not callable: '+file+':'+name);return fn(...args)};return local(file,name)}
 }
 // A shared factory reads devIntentOwner287 while it is still assembling.
 // Resolve source function imports on invocation, like live ESM bindings;
 // constructing Oae does not invoke Wi/st/Z/c or construct another graph.
 // Literals/classes retain their actual owner values (not callable proxies).
 for(const p of [lifecycleProof,outsideProof]){
  const g=(p as any).modules.find((g:any)=>g.file===file),key=g?.exports?.[name]??name
  const row=g?.rows.find((r:any)=>(r.names??[r.name]).includes(key))
  if(row&&(/^(?:async )?function /.test(row.source)||/^[\w$]+=(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)=>/.test(row.source))){
   return (...args:unknown[])=>{const fn=canonical(file,name);if(typeof fn!=='function')throw Error('Original Tips canonical import is not callable: '+file+':'+name);return fn(...args)}
  }
 }
 try{return canonical(file,name)}catch(error){
  // Keep a missing public cut visible when invoked; no false qualification,
  // empty candidate set, success result or replacement cache is returned.
  if(file==='chunk-tf0wpqry.js'&&name==='LP'||file==='chunk-kvv1mdj6.js'&&name==='U$')return new Proxy({}, {get(){throw error}})
  return (..._args:unknown[])=>{throw error}
 }
}
export function getNativeTipModule287(file='chunk-2a2022xc.js'):Namespace{
 if(cells[file])return cells[file]
 const g=groups[file];if(!g)throw Error('Original Tips module not selected: '+file)
 const factory=(source as unknown as Record<string,(ports:unknown)=>Namespace>)[g.factory]
 const module=factory({get:readNativeTipDependency287,requireModule:(target:string)=>{
  if(target==='chunk-139mqjgn.js'){const settings=getNativeTipModule287('chunk-f1vb7bx7.js');return {projectSettingsAliasesUserSettings:settings.rw,getSettingsForSource:settings.ge,getSecuritySensitiveSettingWithSources:settings.fse}}
  throw Error('Original Tips synchronous module host not connected: '+target)
 },importModule:async(file:string)=>{
  if(file==='chunk-mfjd17m1.js'){const commands=require('../../commands.js') as typeof import('../../commands.js');return {getBuiltinCommands:commands.getBuiltinCommands,filterCommandsForRemoteMode:commands.filterCommandsForRemoteMode}}
  return groups[file]?getNativeTipModule287(file).public:readBuiltinPublicModule287(file)
 }})
 return cells[file]=new Proxy(module,{get:(target,key)=>typeof key==='string'&&!Object.hasOwn(target,key)?canonical(file,key):Reflect.get(target,key)})
}
export type NativeTipContext287={session:ReturnType<typeof getExecutionSession287>;theme:ThemeName;readFileState?:FileStateCache;bashTools?:Set<string>;bashHosts?:Set<string>;toolsUsed?:Set<string>;devIntents?:Set<string>;storageV5?:unknown;credentials?:unknown}
export function createProductionSpinnerTipController287(host:()=>{session:ReturnType<typeof getExecutionSession287>;theme:ThemeName;scope:{readFileState:FileStateCache};transcript:{getSnapshot():readonly unknown[]};setAppState:(update:(state:any)=>any)=>void;storageV5?:unknown;credentials?:unknown},guard:{isActive:boolean},signals?:{bashTools:Set<string>;pickedThisTurn?:{get():boolean;set(value:boolean):void};absorbedLength:{get():number;set(value:number):void}}){
 const ports=readProductionSpinnerTipPorts287()
 const Controller=source.createSpinnerTipController287(ports)
 return new Controller(host,guard,signals)
}
export function readProductionSpinnerTipPorts287():Readonly<Record<string,any>>{
 const tip=getBuiltinPackageModule287('chunk-bj5yaztj.js'),base=getNativeTipModule287('chunk-bj5yaztj.js'),signalsModule=getNativeTipModule287('chunk-p8yg3pqx.js')
 // Use exact canonical registry functions, including installed worker status.
 const admission=source.createTipsAdmission287({Ft:executionRecommendationGates287.Ft,zw:readNativeTipDependency287('chunk-sthe7p0e.js','zw'),NQ:readNativeTipDependency287('chunk-sthe7p0e.js','NQ'),uGe:tip.uGe,bKn:getNativeTipModule287('chunk-w7hy7pqe.js').bKn})
 const ports={Utt:tip.Utt,V7e:admission,Oio:base.Oio,Hio:base.Hio,F:readNativeTipDependency287('chunk-ky674g9x.js','F'),jtt:tip.jtt,d:logError,st:readNativeTipDependency287('chunk-c9me9cp7.js','st'),Z:readNativeTipDependency287('chunk-c9me9cp7.js','Z'),...signalsModule,Oae:getNativeTipModule287('chunk-yc409gx5.js').Oae}
 return ports
}
