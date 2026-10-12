import {DEFAULT_BINDINGS as legacy} from './defaultBindings.js'
import {publicCommandSourcePort287} from '../utils/commandCompletionProducers287.js'
import type {KeybindingBlock} from './types.js'

/** The existing canonical C0 is the sole official default source. This is a
 * caller projection, not another loader/cache/state owner. Legacy-only Global keys
 * precede C0; other contexts follow it. Canonical Chat Ctrl+L must beat the older Global redraw key.
 * Never change gates or mutate either source table. User blocks remain last. */
export function getDefaultBindingsSource287():KeybindingBlock[] {
  const original=publicCommandSourcePort287('chunk-tf0wpqry.js','C0') as KeybindingBlock[]
  const keys=new Map(original.map(block=>[block.context,new Set(Object.keys(block.bindings))]))
  const compatibility=legacy.map(block=>({context:block.context,bindings:Object.fromEntries(
    Object.entries(block.bindings).filter(([key])=>!keys.get(block.context)?.has(key)),
  )})).filter(block=>Object.keys(block.bindings).length>0)
  return [...compatibility.filter(block=>block.context==='Global'),...original,...compatibility.filter(block=>block.context!=='Global')]
}
