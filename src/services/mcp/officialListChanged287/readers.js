// Read complete original functions from their existing sole canonical owner.
// No SDK, worker, list cache, dispatcher, or runtime factory is created here.
import {getOriginalModsLifecycle287} from '../../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getMcpConnectedProducer287} from '../connectedProducer287.js'
function member(file,name){
 const value=getOriginalModsLifecycle287().clearLifecycleSource287(file,name)
 if(value===undefined)throw Error('Original MCP list-change namespace missing '+file+':'+name)
 return value
}
export function readMcpListChangeBindings287(){
 return {gr:member('chunk-z6w3579x.js','gr'),ww:member('chunk-z6w3579x.js','ww'),vr:member('chunk-scey49m3.js','vr'),X$:member('chunk-z6w3579x.js','X$'),oTe:member('chunk-mphp7acd.js','oTe'),fJ:member('chunk-0rn4hgq0.js','fJ'),BM:member('chunk-nankzm0s.js','BM'),S:member('chunk-n4qghq20.js','S'),Ca:member('chunk-mphp7acd.js','Ca'),rb:member('chunk-gr2z631p.js','rb'),te:member('chunk-amhtwhch.js','te'),Go:member('chunk-amhtwhch.js','Go'),$o:member('chunk-bwba1qcq.js','$o'),i:member('chunk-6hnyhakg.js','i')}
}
export function readMcpListChangeClient287(){
 const source=getMcpConnectedProducer287().sourceModule('chunk-amg94xhm.js')
 const names=['gn'];for(const name of names)if(typeof source[name]!=='function')throw Error('Original MCP list-change SDK root missing '+name)
 return {onMcpToolListChanged:member('chunk-amg94xhm.js','Jp'),onMcpPromptListChanged:member('chunk-amg94xhm.js','Yp'),onMcpResourceListChanged:member('chunk-amg94xhm.js','Xp'),fetchResourceTemplatesForClient:source.gn}
}
export function filterStaticMcpTools287(tools,serverNames){
 return member('chunk-kny5qk1k.js','Vlr')(tools,serverNames)
}
