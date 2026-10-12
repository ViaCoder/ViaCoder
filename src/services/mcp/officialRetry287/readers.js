import {getOriginalModsLifecycle287} from '../../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getExecutionSession287} from '../../context/execution287.js'
function read(file,name){const value=getOriginalModsLifecycle287().clearLifecycleSource287(file,name);if(value===undefined)throw Error('Original MCP retry dependency missing '+file+':'+name);return value}
export function readMcpRetryClock287(){return getExecutionSession287().host.clock}
export function readMcpRetryBindings287(){return {
 TX:3,rTe:read('chunk-mphp7acd.js','rTe'),eft:read('chunk-0rn4hgq0.js','eft'),mJ:read('chunk-0rn4hgq0.js','mJ'),
 te:read('chunk-amhtwhch.js','te'),Go:read('chunk-amhtwhch.js','Go'),t:read('chunk-q80zaav8.js','t'),
 gr:read('chunk-z6w3579x.js','gr'),ww:read('chunk-z6w3579x.js','ww'),Io:read('chunk-mphp7acd.js','Io'),Ai:read('chunk-mphp7acd.js','Ai'),If:read('chunk-mphp7acd.js','If'),
 Ike:read('chunk-09m4fzsj.js','Ike'),Wr:read('chunk-09m4fzsj.js','Wr'),qI:read('chunk-c4h4snq8.js','qI'),$o:read('chunk-bwba1qcq.js','$o'),
 $Ht:read('chunk-mphp7acd.js','$Ht'),lHt:read('chunk-mphp7acd.js','lHt'),aHt:read('chunk-mphp7acd.js','aHt'),yN:read('chunk-mphp7acd.js','yN'),
 ttr:read('chunk-758hjhx1.js','ttr'),dfo:read('chunk-f2cpzzp9.js','dfo'),
}}
