import * as nodeFs from 'node:fs'
import {memoryLabel287} from '../officialPermissionLifecycle287/memoryLabel.js'
import {createHash} from 'node:crypto'
import * as path from 'node:path'
import * as url from 'node:url'
import {homedir} from 'node:os'
import {open} from 'node:fs/promises'
import {getFsImplementation,safeResolvePath} from '../../../utils/fsOperations.js'
import {filesystemPathRuntime287} from '../../../utils/filesystemPathRuntime287.js'
import {expandPath} from '../../../utils/path.js'
import {getCwd} from '../../../utils/cwd.js'
import {logForDebugging} from '../../../utils/debug.js'
import {useReducer,useCallback} from 'react'
import {logError} from '../../../utils/log.js'
import {createOfficialPermissionDescriptors287} from './native.js'
import type {ToolUseConfirm} from '../../../components/permissions/PermissionRequest.js'
import {createPublicPermissionMatcher287,type PublicPermissionMatcher287,type PublicPermissionMatchers287} from './matcher.js'
import matcherProof from './matcher.provenance.json' with {type:'json'}
// Stateless source closure. The schema/settings ports read the existing owners;
// lazy getters keep PermissionContext's cold import out of the tool/settings SCC.
let descriptors:ReturnType<typeof createOfficialPermissionDescriptors287>|undefined;
function owner(){return descriptors??=createOfficialPermissionDescriptors287({
 'chunk-q80zaav8.js:m':nodeFs,
 'chunk-6xrs6gmd.js:bfe':()=>{throw Error('Permission proxy expansion port is not bound in this public caller')},
 'chunk-mphp7acd.js:RC':(require('../../../tools/FileEditTool/FileEditTool.js') as typeof import('../../../tools/FileEditTool/FileEditTool.js')).FileEditTool,
 'chunk-mphp7acd.js:hv':(require('../../../tools/FileWriteTool/FileWriteTool.js') as typeof import('../../../tools/FileWriteTool/FileWriteTool.js')).FileWriteTool,
 'chunk-mphp7acd.js:vce':(require('../../../tools/NotebookEditTool/NotebookEditTool.js') as typeof import('../../../tools/NotebookEditTool/NotebookEditTool.js')).NotebookEditTool,
 'chunk-mphp7acd.js:qR':(require('../../../tools/FileReadTool/FileReadTool.js') as typeof import('../../../tools/FileReadTool/FileReadTool.js')).FileReadTool,
 'chunk-mphp7acd.js:KR':(require('../../../tools/GrepTool/GrepTool.js') as typeof import('../../../tools/GrepTool/GrepTool.js')).GrepTool,
 'chunk-mphp7acd.js:Sv':(require('../../../tools/GlobTool/GlobTool.js') as typeof import('../../../tools/GlobTool/GlobTool.js')).GlobTool,
 'chunk-wsccbnna.js:ht':path.relative,'chunk-wsccbnna.js:yt':path.posix,'chunk-wsccbnna.js:gt':path.basename,
 'chunk-s354e3rr.js:oe':getCwd,
 'chunk-x954y317.js:Cs':(value:string)=>filesystemPathRuntime287.isUncPath(value)&&!filesystemPathRuntime287.isLocalWslPath(value),
 'chunk-x954y317.js:Lh':(value:string)=>filesystemPathRuntime287.isNetworkBrowsePath(value)||filesystemPathRuntime287.isNetRootPath(value)||filesystemPathRuntime287.isNtDevicePath(value)||filesystemPathRuntime287.isKernelNamespacePath(value),
 'chunk-bffwghss.js:ae':getFsImplementation,'chunk-q80zaav8.js:ae':getFsImplementation,
 'chunk-bffwghss.js:bo':safeResolvePath,'chunk-bffwghss.js:t':logForDebugging,'chunk-bffwghss.js:l':open,
 'chunk-6xrs6gmd.js:kgt':(value:ReturnType<typeof filesystemPathRuntime287.permissionAncestry>)=>value.unresolved===true?null:path.resolve(value.landing)===path.resolve(value.requested)?null:value.landing,
 'chunk-q80zaav8.js:za':filesystemPathRuntime287.permissionAncestry,'chunk-wsccbnna.js:Xe':expandPath,
 // Exact pinned JMo early branch G=null; no Memory state or qualification created.
 'chunk-wsccbnna.js:JMo':memoryLabel287,
 'chunk-vh4tv488.js:e':createHash,
 'chunk-6xrs6gmd.js:ge':(source:import('../../../utils/settings/constants.js').SettingSource)=>(require('../../../utils/settings/settings.js') as typeof import('../../../utils/settings/settings.js')).getSettingsForSource(source),
 'chunk-wsccbnna.js:o5':{get inputSchema(){return (require('../../../tools/AskUserQuestionTool/AskUserQuestionTool.js') as typeof import('../../../tools/AskUserQuestionTool/AskUserQuestionTool.js')).AskUserQuestionTool.inputSchema}},
 'chunk-wsccbnna.js:lt':url.fileURLToPath,'chunk-wsccbnna.js:rt':path.isAbsolute,
 'chunk-w7hy7pqe.js:Ve':path.resolve,'chunk-0g89pq4a.js:a':path.posix,
 'chunk-x954y317.js:tt':path,
 'chunk-w7hy7pqe.js:Sn':url.pathToFileURL,'chunk-2ejbgdvw.js:c':homedir,'chunk-2ejbgdvw.js:S':path.sep,
 'chunk-f2cpzzp9.js:Uh':useReducer,'chunk-f2cpzzp9.js:ce':useCallback,
 'chunk-f2cpzzp9.js:d':logError,
})}
// Lazy initialization avoids loading tool identities in the cold settings SCC.
export const permissionDescriptors287=new Proxy({} as ReturnType<typeof createOfficialPermissionDescriptors287>,{get(_target,key){return Reflect.get(owner(),key)}});
export function buildPermissionDescriptor287(item:ToolUseConfirm){
 if(!item.toolUseContext.dialogAgentContext287)throw Error('Permission descriptor lacks actual Agent provenance')
 const requestSource=permissionDescriptors287.Qe({...item.toolUseContext,agentContext:item.toolUseContext.dialogAgentContext287})
 const args={tool:item.tool,description:item.description,input:item.input,permissionResult:item.permissionResult,
  toolUseID:item.toolUseID,assistantMessage:item.assistantMessage,theme:'dark',requestSource}
 return item.tool.name==='AskUserQuestion'?permissionDescriptors287.Ao(args):permissionDescriptors287.DO(args)
}

export function permissionQuestionsForLegacyLeaf287(questions:import('../../../tools/AskUserQuestionTool/AskUserQuestionTool.js').Question[],engineConfirm=false){
 const normalized=permissionDescriptors287.UY(questions,engineConfirm)
 return questions.map((question,index)=>{const view=normalized[index]!;return {...question,displayQuestion287:view.displayQuestion.text,header:view.displayHeader,
  options:question.options.map((option,i)=>({...option,displayLabel287:view.options[i]!.displayLabel,description:view.options[i]!.displayDescription,
   preview:view.options[i]!.preview?.kind==='full'?view.options[i]!.preview.markdown:undefined}))}})
}

// The original Ft registry belongs to this descriptor owner. Canonical MRe's
// permission router delegates Ymr here rather than constructing binary copies
// of the application's Tool objects (or a second permission/pending store).
let publicMatchers287:PublicPermissionMatchers287|undefined;
export function selectPublicPermissionMatcher287(tool:import('../../../Tool.js').Tool):PublicPermissionMatcher287|undefined {
 if(!publicMatchers287){
  const catalog=(import.meta.require('../../../tools.js') as typeof import('../../../tools.js')).getToolCatalogPorts287();
  const ports:Record<string,unknown>={
   gy:catalog.gy,o5:catalog.o5,RXt:catalog.RXt,_V:catalog._V,Jze:catalog.Jze,
   Ko:catalog.Tt,It:catalog.Ar,DO:permissionDescriptors287.DO,Ao:permissionDescriptors287.Ao,
  };
  for(const [name,binding] of Object.entries(matcherProof.ports)){
   if(!('file' in binding))continue;
   Object.defineProperty(ports,name,{enumerable:true,get(){
    const source=(import.meta.require('../../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287();
    return source.clearSourceModule287(binding.file)[binding.name];
   }});
  }
  publicMatchers287=createPublicPermissionMatcher287(ports);
 }
 return publicMatchers287.Ymr(tool);
}
