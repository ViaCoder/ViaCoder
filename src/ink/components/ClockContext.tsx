import {c} from 'react/compiler-runtime'
import {jsx} from 'react/jsx-runtime'
import {createContext,useEffect,useState} from 'react'
import {FRAME_INTERVAL_MS} from '../constants.js'
import {useTerminalFocus} from '../hooks/use-terminal-focus.js'
import {createInkClockRuntime287,type NativeInkClock287} from '../officialInputClock287/native.js'
export type Clock=NativeInkClock287
export const ClockContext=createContext<Clock|null>(null)
// One original clock per App root. Follower subscriptions never keep it alive;
// the original cancellable timeout is also consumed by confirmation dwell.
const native=createInkClockRuntime287({w:c,e:jsx,g:useState,R:useEffect,nc:useTerminalFocus,Nh:FRAME_INTERVAL_MS,xb:ClockContext})
export const createClock=native.createClock
export const ClockProvider=native.ClockProvider
