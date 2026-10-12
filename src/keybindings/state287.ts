import type {FSWatcher} from 'chokidar'
import {createOriginalKeybindingSignal287} from './signal287.js'
import type {ParsedBinding} from './types.js'
import type {KeybindingWarning} from './validate.js'
export type KeybindingState287={bindings:ParsedBinding[]|null;warmedFromBackend:boolean;warmAttempted:boolean;warnings:KeybindingWarning[];watcher:FSWatcher|null;initialized:boolean;disposed:boolean;lastCustomBindingsLogDate:string|null;loggedShortcutFallbacks:Set<string>;actionFiredLoggedAt:Map<string,number>;changed:ReturnType<typeof createOriginalKeybindingSignal287<[ {bindings:ParsedBinding[];warnings:KeybindingWarning[]} ]>>;[Symbol.dispose]():void}
// Full fixed-287 Qe. The production loader and native Tips read this same LP.
import {createKeybindingState287} from '../services/tips/officialTips287/native.js'
const LP=createKeybindingState287(createOriginalKeybindingSignal287) as KeybindingState287
export function getKeybindingState287():KeybindingState287{return LP}
