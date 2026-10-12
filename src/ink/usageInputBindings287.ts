import {c} from 'react/compiler-runtime'
import {jsx,jsxs} from 'react/jsx-runtime'
import {useState,useRef,useCallback,useContext,useMemo,useSyncExternalStore,isValidElement,useEffect} from 'react'
import {Text,Box} from '../ink.js'
import {ClockContext} from './components/ClockContext.js'
import {RecentInputClockContext} from './components/RecentInputClockContext.js'
import {getFocusManager} from './focus.js'
import {stringWidth} from './stringWidth.js'
import {useDeclaredCursor} from './hooks/use-declared-cursor.js'
import {createUsageInputGuard287,createUsageInputTimer287,createUsageInputFocus287,createUsageInputText287} from '../services/api/officialUsage287/runtime.js'
const focus=createUsageInputFocus287({R:useEffect,NT:getFocusManager})
const text=createUsageInputText287({sf:isValidElement})
/** One binding of the complete original guard, shared with Usage confirmation.
 * Input timestamp/timeout state belongs exclusively to the actual App/clock. */
export const usageInputGuards287=createUsageInputGuard287({w:c,e:jsx,r:jsxs,n:Text,s:Box,b:Symbol.for('react.memo_cache_sentinel'),g:useState,A:useRef,ce:useCallback,ke:useContext,V0n:RecentInputClockContext,Ug:focus,ua:(...args:Parameters<typeof import('../context/overlayContext.js')['useRegisterOverlay']>)=>require('../context/overlayContext.js').useRegisterOverlay(...args),ie:stringWidth,uv:useDeclaredCursor,RR:text})
export const useUsageInputGuard287=usageInputGuards287.ha
export const useUsageInputTimeout287=createUsageInputTimer287({ke:useContext,xb:ClockContext,A:useRef,Q:useMemo,kt:useSyncExternalStore})
