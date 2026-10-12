// Same existing actor and named original readers, never a second bus.
import {getMcpConnectedProducer287} from '../connectedProducer287.js'
import {getOriginalModsLifecycle287} from '../../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
function read(file,name){const value=getOriginalModsLifecycle287().clearLifecycleSource287(file,name);if(value===undefined)throw Error('Original reauth dependency missing '+file+':'+name);return value}
export function readMcpReauthBindings287(){
 const actor=getMcpConnectedProducer287().sourceModule('chunk-n927bk8v.js').uhe;
 if(!actor||typeof actor.subscribe!=='function')throw Error('Existing MCP reauth actor missing');
 return {uhe:actor,gr:read('chunk-z6w3579x.js','gr'),Ts:read('chunk-hrhfcbdv.js','Ts'),Io:read('chunk-mphp7acd.js','Io'),b1:read('chunk-mphp7acd.js','b1'),vr:read('chunk-scey49m3.js','vr'),rb:read('chunk-gr2z631p.js','rb'),$o:read('chunk-bwba1qcq.js','$o')}
}
