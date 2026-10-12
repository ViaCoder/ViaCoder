import React,{useState} from 'react'
import type {AppStateStore} from '../state/AppStateStore.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {useOptionalExecutionSession287} from './executionProject287.js'
import type {HotSpinnerStore287} from '../utils/hotSessionController287/spinnerAdopterNative.js'
import {getOriginalModsLifecycle287} from '../utils/hooks/modelSwitch287/lifecycleRuntime.js'

/** The original g0n, not a second React context. The xpr adopter commits to
 * the existing AppState spinner slots; no spinner map is owned here. */
function sourceSpinnerNamespace287():{
 g0n:React.Context<HotSpinnerStore287|null>;
 Yie:()=>HotSpinnerStore287;
}{
 return getOriginalModsLifecycle287().clearSourceModule287('chunk-1x5y5a12.js') as {
  g0n:React.Context<HotSpinnerStore287|null>;Yie:()=>HotSpinnerStore287;
 };
}

/** Original be creates P once and mounts g0n.Provider above its children.
 * REPL and MRe consume this very object, including the local C projection. */
export function SpinnerStoreProvider287({store,children}:{store:AppStateStore;children:React.ReactNode}):React.ReactNode {
 const session=useOptionalExecutionSession287()??getExecutionSession287();
 const [owner]=useState(()=>{
  // AppState is also imported by Tools during their schema initialization.
  // Bind the existing adopter at mount, after that cold import cycle closes.
  const {createProductionHotSpinnerStore287}=import.meta.require('../utils/hotSessionController287/runtime.js') as typeof import('../utils/hotSessionController287/runtime.js');
  return createProductionHotSpinnerStore287(store,session);
 });
 const {g0n}=sourceSpinnerNamespace287();
 return <g0n.Provider value={owner}>{children}</g0n.Provider>;
}

/** Keep the original missing-provider error and full return ABI. */
export function useProductionSpinnerStore287():HotSpinnerStore287 {
 return sourceSpinnerNamespace287().Yie();
}
