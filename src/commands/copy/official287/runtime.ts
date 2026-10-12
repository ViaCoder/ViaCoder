import {publicCommandSourcePort287} from '../../../utils/commandCompletionProducers287.js'
import {setClipboard} from '../../../ink/termio/osc.js'
import {createCopyCommand287} from './native.js'
const imports=[{"name":"Qf","imported":"Qf","module":"chunk-09m4fzsj.js"},{"name":"pi","imported":"pi","module":"chunk-eske5nfz.js"},{"name":"Vt","imported":"Vt","module":"chunk-eske5nfz.js"},{"name":"le","imported":"le","module":"chunk-nankzm0s.js"},{"name":"i","imported":"i","module":"chunk-6hnyhakg.js"},{"name":"ie","imported":"ie","module":"chunk-m59srz4k.js"},{"name":"hpn","imported":"hpn","module":"chunk-1y575bx8.js"},{"name":"xw","imported":"xw","module":"chunk-1y575bx8.js"},{"name":"Jg","imported":"Jg","module":"chunk-6xrs6gmd.js"},{"name":"U7","imported":"U7","module":"chunk-mphp7acd.js"},{"name":"fo","imported":"fo","module":"chunk-mphp7acd.js"},{"name":"e","imported":"e","module":"chunk-ysm7k028.js"}] as const
/** Reuses canonical primitives, existing C picker and tempfile IO; no new owner/cache. */
export function createCopyCommandForHost287(Ce:unknown,Y:unknown){
 const ports=Object.fromEntries(imports.map(p=>[p.name,p.name==='xw'?setClipboard:publicCommandSourcePort287(p.module,p.imported)]))
 return createCopyCommand287({...ports,Ce,Y})
}
