import {AsyncLocalStorage} from 'node:async_hooks'
import type {AtomicStagingRegistry287} from './officialAtomicWriter287/native.js'
import {createPlatformAtomic287} from './officialAtomicWriter287/platform.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {OriginalHostRegistry287} from './settings/settingsCache.js'
import {getFsImplementation} from './fsOperations.js'
import {logForDebugging} from './debug.js'
import {logEvent} from '../services/analytics/index.js'

// Complete original m/p/y, tag functions and tme; the existing analytics leaf
// is frozen local C (no sender, queue, timer or I/O), including the P view.
export const originalAtomicFeaturePorts287=new Function('i',
 "function r(n){return n}\nfunction S(n){return r(n)}\nfunction c(n){return r(n)}\nfunction bn(n){return r(n)}\nfunction tme(n){if(typeof n!==\"string\")return;return/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(n)?bn(n):S(\"nonconforming\")}\nfunction m(e,r,u){i(\"tengu_feature_bad\",{...u,feature_name:c(e),error_code:tme(r)})}\nfunction p(e,r,u){i(\"tengu_feature_sad\",{...u,feature_name:c(e),error_code:tme(r)})}\nfunction y(e,r){i(\"tengu_feature_ok\",{feature_name:c(e),...r})};return {m,p,y};"
)(logEvent) as {m(feature:string,reason:string,metadata?:Record<string,unknown>):void;p(feature:string,reason:string,metadata?:Record<string,unknown>):void;y(feature:string,metadata?:Record<string,unknown>):void}

// The platform dispatcher and settings writer acquire this same original ne/V
// registry. File descriptors stay owned by the registry's original reset.
type AtomicCallerPorts287={fileOps:typeof getFsImplementation;debug:typeof logForDebugging;featureBad:(feature:string,reason:string)=>void}
// Call-scoped ports preserve each existing consumer callback without creating
// another native factory, error prototype, fd registry, or staging state.
const atomicCallerPorts287=new AsyncLocalStorage<AtomicCallerPorts287>()
const atomic=createPlatformAtomic287(process.platform,process.arch,{ae:()=>(atomicCallerPorts287.getStore()?.fileOps??getFsImplementation)(),t:(message,options)=>(atomicCallerPorts287.getStore()?.debug??logForDebugging)(message,options),
 j:()=>getAtomicStagingRegistry287(),m:(feature,reason)=>{const callback=atomicCallerPorts287.getStore()?.featureBad;if(callback){callback(feature,reason);return}logForDebugging(`${feature}: ${reason}`,{level:'error'});logEvent('feature_sad',{})}})
const registries=new OriginalHostRegistry287(()=>new atomic.StagingRegistry()) as {of(host:object):AtomicStagingRegistry287}
export function getAtomicStagingRegistry287():AtomicStagingRegistry287{return registries.of(getExecutionSession287().host)}
export function getAtomicWriter287(){return atomic}
/** Original F8o injection cut: caller transfers the open directory fd. */
export const recordAtomicStagingDirectory287=atomic.record

/** Bind the actual caller to the one native host factory. Error constructors
 * are shared with getAtomicWriter287(), as required by real settings Pr/dm. */
export function bindAtomicWriterCaller287(ports:AtomicCallerPorts287){
 return {...atomic,write:(...args:Parameters<typeof atomic.write>)=>atomicCallerPorts287.run(ports,()=>atomic.write(...args))}
}
