import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'

/** Df's two public awaits read the already-instantiated canonical namespace.
 * Neither a second surface registry nor a pending-interface Set is created.
 */
export function getSDKOuterLifecycleClose287(){
 const owner=getOriginalModsLifecycle287()
 function required(file:string,name:string):()=>Promise<void>{
  const value=owner.clearLifecycleSource287(file,name)
  if(typeof value!=='function')throw Error('Original SDK teardown source is not callable: '+file+':'+name)
  // Complete original slr()/pun() are async void and Df supplies no argument.
  return value as ()=>Promise<void>
 }
 return {
  detachSessions:required('chunk-n2zepamy.js','slr'),
  waitForInterfaceOps:required('chunk-09m4fzsj.js','pun'),
 }
}
