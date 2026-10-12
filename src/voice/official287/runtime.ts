import {createRequire} from 'node:module'
import * as childProcess from 'node:child_process'
import * as os from 'node:os'
import * as path from 'node:path'
import * as fsPromises from 'node:fs/promises'
import {publicCommandSourcePort287} from '../../utils/commandCompletionProducers287.js'
import type {LocalCommandModule} from '../../types/command.js'
import proofData from './provenance.json' with {type:'json'}

type SourceImport={local:string;imported:string;module:string}
type Group={file:string;imports:SourceImport[]}
type PlatformProof={command:Group;capture:Group;native:Group;nativeShim:Group;stream:Group}
type FactoryModule={createCommand287(p:Record<string,unknown>):Record<string,any>;createCapture287(p:Record<string,unknown>):Record<string,any>;createNative287(p:Record<string,unknown>):Record<string,any>;createNativeShim287(p:Record<string,unknown>):Record<string,any>}
const proof=proofData as unknown as {platforms:Record<string,PlatformProof>}
const target=process.platform+'-'+process.arch
const hostRequire=createRequire(import.meta.url)
const builtinImports:Record<string,Record<string,unknown>>={'child_process':childProcess,'os':os,'path':path,'fs/promises':fsPromises}
// These seven primitive roles are the same actual host/env/process owners used
// by the canonical graph. Platform closure locals differ only by minifier name.
const captureImports=proof.platforms['darwin-arm64'].capture.imports.filter(p=>p.module.includes('/root/'))
const commandImports=proof.platforms['darwin-arm64'].command.imports
let factories:FactoryModule|undefined,command:LocalCommandModule|undefined,capture:Record<string,any>|undefined,native:Record<string,any>|undefined
function selected(){
 const p=proof.platforms[target]
 if(!p)throw new Error('Unsupported official voice platform '+target)
 return p
}
function sourceFactories(){
 return factories??=hostRequire('./'+target+'.js') as FactoryModule
}
function canonical(p:SourceImport){return publicCommandSourcePort287(path.basename(p.module),p.imported)}
function commandPorts(){
 const group=selected().command
 return Object.fromEntries(group.imports.map((p,i)=>[p.local,canonical(commandImports[i])]))
}
function nativeModule(){
 if(native)return native
 const p=selected(),shimImports=p.nativeShim.imports
 // Original lazy CJS wrapper remains original. Only embedded asset resolution
 // changes to the matching extracted platform payload in the source package.
 const assetRequire=(specifier:string)=>hostRequire(specifier.endsWith('/root/audio-capture.node')
  ?'./native-assets/'+target+'/audio-capture.node':specifier)
 const lazyCjs=publicCommandSourcePort287('chunk-870yz02b.js','v')
 const shim=sourceFactories().createNativeShim287({[shimImports[0].local]:lazyCjs,[shimImports[1].local]:assetRequire})
 const imports=p.native.imports
 return native=sourceFactories().createNative287({[imports[0].local]:shim[Object.keys(shim)[0]],[imports[1].local]:assetRequire})
}
function captureModule(){
 if(capture)return capture
 const group=selected().capture
 let originalIndex=0
 const imports=Object.fromEntries(group.imports.map(p=>[p.local,p.module.includes('/root/')
  ?canonical(captureImports[originalIndex++]):builtinImports[p.module]?.[p.imported]]))
 return capture=sourceFactories().createCapture287({...imports,importOriginal287:async(specifier:string)=>{
  if(path.basename(specifier)!==selected().native.file)throw new Error('Unexpected original voice capture import '+specifier)
  return nativeModule()
 }})
}
export function getOriginalVoiceCommand287():LocalCommandModule{
 return command??=sourceFactories().createCommand287({...commandPorts(),importOriginal287:getPublicVoiceModule287}) as LocalCommandModule
}
export async function getPublicVoiceModule287(specifier:string):Promise<Record<string,any>>{
 const file=path.basename(specifier)
 if(Object.values(proof.platforms).some(p=>p.capture.file===file))return captureModule()
 if(Object.values(proof.platforms).some(p=>p.native.file===file))return nativeModule()
 if(Object.values(proof.platforms).some(p=>p.stream.file===file))return {
  connectVoiceStream:publicCommandSourcePort287('chunk-vnsj0eyq.js','a_r'),
  isVoiceStreamAvailable:publicCommandSourcePort287('chunk-vnsj0eyq.js','i_r'),
  probeVoiceConnectivity:publicCommandSourcePort287('chunk-vnsj0eyq.js','s_r'),
 }
 throw new Error('Unknown original voice module '+specifier)
}
