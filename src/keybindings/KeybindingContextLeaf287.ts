// One native context and erased type contracts; no loader, lifecycle or Ink barrel import.
import {createContext} from 'react'
import type {Key} from '../ink.js'
import type {ChordResolveResult} from './resolver.js'
import type {KeybindingContextName,ParsedBinding,ParsedKeystroke} from './types.js'

/** Handler registration for action callbacks */
export type HandlerRegistration = {
  action: string;
  context: KeybindingContextName;
  handler: () => void;
};
export type KeybindingContextValue = {
  /** Resolve a key input to an action name (with chord support) */
  resolve: (input: string, key: Key, activeContexts: KeybindingContextName[]) => ChordResolveResult;

  /** Update the pending chord state */
  setPendingChord: (pending: ParsedKeystroke[] | null) => void;

  /** Get display text for an action (e.g., "ctrl+t") */
  getDisplayText: (action: string, context: KeybindingContextName) => string | undefined;

  /** All parsed bindings (for help display) */
  bindings: ParsedBinding[];

  /** Current pending chord keystrokes (null if not in a chord) */
  pendingChord: ParsedKeystroke[] | null;

  /** Currently active keybinding contexts (for priority resolution) */
  activeContexts: Set<KeybindingContextName>;

  /** Register a context as active (call on mount) */
  registerActiveContext: (context: KeybindingContextName) => void;

  /** Unregister a context (call on unmount) */
  unregisterActiveContext: (context: KeybindingContextName) => void;

  /** Register a handler for an action (used by useKeybinding) */
  registerHandler: (registration: HandlerRegistration) => () => void;

  registerPreDispatch: (registration: PreDispatchRegistration287) => () => boolean;
  singleKeyEvent: () => OriginalSingleKeyEvent287 | null;
  keyHandlerRegistry: OriginalKeyHandlerRegistry287;
};
export type OriginalSingleKeyEvent287 = {name:string;key:string;ctrl:boolean;shift:boolean;meta:boolean;superKey:boolean};
export type PreDispatchRegistration287 = {handler:(input:string,key:Key,event:unknown)=>boolean|void};
export type OriginalKeyHandlerRegistry287 = {decls:WeakMap<object,unknown>;scopesChanged:{emit(...args:unknown[]):void;subscribe(listener:(...args:unknown[])=>void):()=>void};preemptiveScopes:Map<string,unknown>;swallowAll:Map<unknown,unknown>;keyDispatchTrace:unknown};
export const NativeKeybindingContext287 = createContext<KeybindingContextValue | null>(null);
