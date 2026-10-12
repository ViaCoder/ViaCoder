import type {ReadStream} from 'node:tty'
import {ReadStream as NativeReadStream} from 'node:tty'
import {openSync} from 'node:fs'
import type {RenderOptions} from '../ink.js'
import {getOriginalModsLifecycle287} from './hooks/modelSwitch287/lifecycleRuntime.js'
import {createTerminalInputOwner287,createTerminalSizeRestore287} from '../cli/printOwnership287/publicHostNative.js'
import {isEnvTruthy} from './envUtils.js'
import {logEvent} from '../services/analytics/index.js'
import {logForDebugging} from './debug.js'
import {authEnvironment} from './authEnvironment.js'

/** Actual original Y9t memo shared by root rendering and cloud qualification.
 * This accessor has no cache and never creates a second terminal stream. */
export type TerminalInput287 = {kind:'stdin'}|{kind:'override';stream:ReadStream}|{kind:'unavailable';reason:'ci'|'mcp'|'tty_unavailable'|'windows'}
const source=(file:string)=>getOriginalModsLifecycle287().clearSourceModule287(file)
const restoreTerminalSize287=createTerminalSizeRestore287({a:authEnvironment,process})
// One full original p/o/Y9t/vR factory. Canonical does not select a second f9
// module: renderOptions and existing-cloud qualification read this instance.
const terminalInputOwner287=createTerminalInputOwner287({
 Le:isEnvTruthy,i:logEvent,t:logForDebugging,a:openSync,s:NativeReadStream,process,
 kqt:()=>{const entry=source('chunk-vm1241f9.js').kqt as ()=>string;return entry()},
 DOe:stream=>{const protect=source('chunk-g3fn1fm9.js').DOe as (stream:ReadStream)=>void;protect(stream)},
 pu:error=>{const serialize=source('chunk-3bsqc8dr.js').pu as (error:Error)=>Parameters<typeof logEvent>[1];return serialize(error)},
 Zm:()=>{const reader=source('chunk-3bsqc8dr.js').Zm as ()=>boolean;return reader()},
 sgo:restoreTerminalSize287,
})
export function getTerminalInput287():TerminalInput287 {
 return terminalInputOwner287.Y9t.get()
}
export function getTerminalRenderOptions287(exitOnCtrlC=false):RenderOptions {
 return terminalInputOwner287.vR(exitOnCtrlC)
}
