import {getPrintHostSource287,getPrintUiHostGate287} from '../printOwnership287/publicHostRuntime287.js'
import {createPluginUiSources287,createPrintUiControlDispatcher287,createPrintPublicSubscriptions287} from './factory.js'
import {logForDebugging} from '../../utils/debug.js'
import type {PrintPublicPorts287} from '../printOwnership287/publicHostNative.js'
import type {PrintUiSources287,PrintUiLexicalPorts287} from './types.js'

// The recovered module initializers (including wd) run once against the
// canonical source graph. Never create one module/registry per control/frame.
var source287:PrintUiSources287|undefined
export function getPrintUiSources287():PrintUiSources287 {
 return source287??=createPluginUiSources287(getPrintHostSource287,{logForDebugging})
}
export function createPrintUiControls287(host:PrintUiLexicalPorts287) {
 return createPrintUiControlDispatcher287(getPrintUiSources287(),host)
}

/** Replaces, rather than adds to, the previous single subscription install.
 * Exact same complete initializer and ports; only original Pf is exposed. */
export function installPrintUiPublicSubscriptions287(host:Pick<PrintPublicPorts287,'I'|'r'|'Wi'|'Q'|'v'>) {
 const rows={h5e:['chunk-09m4fzsj.js','h5e'],Gin:['chunk-mphp7acd.js','Gin'],fi:['chunk-xapeakym.js','fi'],wC:['chunk-xapeakym.js','wC'],_C:['chunk-xapeakym.js','_C'],rk:['chunk-xapeakym.js','rk'],IZo:['chunk-mphp7acd.js','IZo'],P6n:['chunk-mphp7acd.js','P6n'],EIr:['chunk-mphp7acd.js','EIr'],R4r:['chunk-xep95vq1.js','R4r'],x4r:['chunk-xep95vq1.js','x4r'],P4r:['chunk-xep95vq1.js','P4r'],I4r:['chunk-xep95vq1.js','I4r'],Xy:['chunk-xapeakym.js','Xy']} as const
 const source=Object.fromEntries(Object.entries(rows).map(([name,[file,original]])=>[name,getPrintHostSource287(file,original)])) as Pick<PrintPublicPorts287,keyof typeof rows>
 return createPrintPublicSubscriptions287({...source,...host,qz:(require('../remoteIO.js') as typeof import('../remoteIO.js')).RemoteIO,LEt:getPrintUiHostGate287})
}
