import {writeFile} from 'fs/promises'
import {dirname} from 'path'
import type {LocalCommandCall} from '../../types/command.js'
import {publicCommandSourcePort287} from '../../utils/commandCompletionProducers287.js'
import {createKeybindingsText287,type KeybindingsPorts287} from './officialText287/native.js'
import proof from './officialText287/provenance.json' with {type:'json'}

// Resolve original imports live at each actual call; no duplicate defaults,
// keybinding/config/FS/editor owner, copied template cache or host backend.
function getPorts287():KeybindingsPorts287 {
 const builtins={c:writeFile,f:dirname}
 return Object.fromEntries(proof.imports.map(p=>[p.name,
  p.kind==='builtin'?builtins[p.name as keyof typeof builtins]:publicCommandSourcePort287(p.module,p.imported),
 ])) as unknown as KeybindingsPorts287
}
const typedLocalCommandCall:LocalCommandCall=(args,context)=>createKeybindingsText287(getPorts287()).call(args,context)
export const call=typedLocalCommandCall
