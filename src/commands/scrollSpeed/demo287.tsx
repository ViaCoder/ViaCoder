import * as React from 'react'
import {c as cache} from 'react/compiler-runtime'
import {jsx,jsxs} from 'react/jsx-runtime'
import {Box,Text} from '../../ink.js'
import {getScrollSpeedRuntime287} from './runtime287.js'
import {createScrollDemo287,type ScrollDemo287,type ScrollDemoPorts287} from './officialScrollDemo287/native.js'
export function createScrollDemoProductionPorts287():ScrollDemoPorts287 {
 return {cache,useSyncExternalStore:React.useSyncExternalStore,Fragment:React.Fragment,jsx,jsxs,Box,Text,
  memoSentinel:Symbol.for('react.memo_cache_sentinel'),diagnostics:()=>getScrollSpeedRuntime287().diagnostics()}
}
let owner:ScrollDemo287|undefined
export function getScrollDemo287(){return owner??=createScrollDemo287(createScrollDemoProductionPorts287())}
/** Mounted in the existing Messages scrollable slot; visibility and disposal are original Yn. */
export function ScrollDemoRuler287(){const Ruler=getScrollDemo287().Ruler;return <Ruler/>}
