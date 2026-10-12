import {createBtwPanel287,type BtwPanelPorts287,type BtwPanelCanonicalBindings287,type BtwPanelOutcome287} from './native.js'
import proof from './provenance.json' with {type:'json'}
import {getOriginalModsLifecycle287} from '../../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {adaptQueryPrefixContext287} from '../../../utils/queryPrefixContext287.js'
import type {ProcessUserInputContext} from '../../../utils/processUserInput/processUserInput.js'
import type {LocalJSXCommandOnDone} from '../../../types/command.js'
import {buildBtwCacheSafeParams287} from '../../../utils/btwPrefix287.js'
import {runSideQuestion} from '../../../utils/sideQuestion.js'
import {EMPTY_USAGE} from '../../../services/api/logging.js'
import {BtwRetryView287,updateBtwRetry287,btwRetryFromProgress287} from '../retry287.js'
import {adoptBtwPanel,cancelBtwQuestion,detachBtwPanel,startOrAdoptBtwQuestion} from '../lifecycle.js'
import {getBtwHistoryForSession287} from '../history.js'
import type {BtwHistory} from '../history.js'
/** Exact namespace bindings, not another graph/cache. These values retain the
 * canonical Ink, clipboard, modal, remote policy and task-notification owners. */
export function createBtwPanelPorts287():BtwPanelPorts287 {
 const source=getOriginalModsLifecycle287(),bindings:Partial<BtwPanelCanonicalBindings287>={}
 for(const row of proof.imports){
  if(row.name==='urt')continue
  const value=source.clearSourceModule287(row.file)[row.exportName]
  if(value===undefined)throw Error('Original BTW panel binding not selected: '+row.file+':'+row.exportName)
  // The closed literal alias set is generated from this complete source only.
  bindings[row.name as keyof BtwPanelCanonicalBindings287]=value
 }
 const complete={...bindings,urt:runSideQuestion,$e:buildBtwCacheSafeParams287,Ue:updateBtwRetry287,mt:btwRetryFromProgress287,qe:BtwRetryView287}
 for(const name of proof.ports){if(['ownedTask287','adoptTask287','cancelTask287','detachTask287','importOriginal287'].includes(name))continue;if(Reflect.get(complete,name)===undefined)throw Error('Original BTW public panel port missing: '+name)}
 return {...complete as BtwPanelCanonicalBindings287,
  ownedTask287:(history:BtwHistory,question:string,run:(controller:AbortController)=>Promise<BtwPanelOutcome287>)=>startOrAdoptBtwQuestion(history,question,async controller=>{
   const outcome=await run(controller)
   if(outcome===null)return {response:null,aborted:true,usage:{...EMPTY_USAGE}}
   if('error' in outcome)throw Error(outcome.error)
   return {response:outcome.response,synthetic:outcome.synthetic,usage:{...EMPTY_USAGE}}
  }),
  adoptTask287:adoptBtwPanel,cancelTask287:cancelBtwQuestion,detachTask287:detachBtwPanel,
  importOriginal287:file=>source.importPublicSourceModule287('/$bunfs/root/'+file),
 }
}
var panel:ReturnType<typeof createBtwPanel287>|undefined
/** Factory closure only; all history/tasks/config/clipboard state remain their original owners. */
export function getBtwPanel287(){return panel??=createBtwPanel287(createBtwPanelPorts287())}
export async function callBtwPanel287(onDone:LocalJSXCommandOnDone,context:ProcessUserInputContext,args:string){
 const view=adaptQueryPrefixContext287(context)
 // Existing non-enumerable C lifecycle methods are installed on the actual Fe,
 // never on a replacement history object. Parent context determines the scope.
 getBtwHistoryForSession287(view.session)
 return getBtwPanel287().call(onDone,view,args)
}
