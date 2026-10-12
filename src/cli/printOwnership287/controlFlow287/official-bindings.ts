import {getPrintHostSource287} from '../publicHostRuntime287.js'
import imports from './official-imports.json' with {type:'json'}
/** Exact full lexical dependency inventory. Every read goes to the single production getter. */
export function getSelectedOriginalBindings287():Readonly<Record<string,unknown>> {
 const result:Record<string,unknown>={}
 for(const row of imports)result[row.name]=getPrintHostSource287(row.file,row.export)
 return Object.freeze(result)
}
