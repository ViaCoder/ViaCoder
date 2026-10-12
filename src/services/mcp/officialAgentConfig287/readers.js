import {getOriginalModsLifecycle287} from '../../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
function member(file,name){const value=getOriginalModsLifecycle287().clearLifecycleSource287(file,name);if(value===undefined)throw Error('Original MCP config lifecycle missing '+file+':'+name);return value}
export function readAgentMcpConfigIngress287(){return member('chunk-dgp2yyqt.js','j6e')}
export function readMcpConfigWriter287(){return member('chunk-mphp7acd.js','w1')}
export function readMcpConfigReservation287(){return member('chunk-nankzm0s.js','yIe')}
