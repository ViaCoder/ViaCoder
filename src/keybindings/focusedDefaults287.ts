import {getPlatform} from '../utils/platform.js'
import {isRunningWithBun} from '../utils/bundledMode.js'
import {satisfies} from '../utils/semver.js'
import * as source from '../plugins/bundled/officialBuiltinConsumer287/native.js'
import proof from '../plugins/bundled/officialBuiltinConsumer287/provenance.json' with {type:'json'}
import type {KeybindingBlock} from './types.js'
const bindings={O:getPlatform,fO:isRunningWithBun,W3r:satisfies}
const group=proof.groups['chunk-tf0wpqry.js']
const factory=(source as unknown as Record<string,(ports:{get(file:string,name:string):unknown})=>{C0:KeybindingBlock[]}>)[group.factory]!
/** Add only the newly installed source surfaces. Existing C defaults retain
 * their exact bindings, including transcript/history/thinking shortcuts. */
const original=factory({get(_file,name){if(!Object.hasOwn(bindings,name))throw Error('Original focused defaults dependency missing '+name);return bindings[name as keyof typeof bindings]}}).C0
const scopes=new Set(['AbovePrompt','AbovePromptInput','AbovePromptSelect','Pane','PaneField'])
export const FOCUSED_BINDING_BLOCKS_287=original.filter(block=>scopes.has(block.context))
export const FOCUSED_CHAT_BINDINGS_287=Object.fromEntries(Object.entries(original.find(block=>block.context==='Chat')!.bindings).filter(([,action])=>action==='abovePrompt:toggle'||action==='abovePrompt:focus')) as KeybindingBlock['bindings']
