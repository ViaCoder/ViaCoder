import {getRecallSelector287} from './officialRecallSelector287/runtime.js'
import type {RecallSelector287,RecallSelected287} from './officialRecallSelector287/native.js'

export type RelevantMemory=RecallSelected287

/** Complete original l7t, supplied the caller's existing selector/session.
 * The original Drr attachments consumer invokes this public facade. */
export function findRelevantMemories(...args:Parameters<RecallSelector287['find']>):ReturnType<RecallSelector287['find']>{
 return getRecallSelector287().find(...args)
}
