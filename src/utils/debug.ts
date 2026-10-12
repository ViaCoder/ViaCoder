import memoize from 'lodash-es/memoize.js'
import type {DebugFilter} from './debugFilter.js'
import {getChromeClientCuts287} from './claudeInChrome/clientCutsRuntime287.js'
export type DebugLogLevel = 'verbose' | 'debug' | 'info' | 'warn' | 'error'

/** Public logging and original AL share the same host cell, Ht writer and
 * successor chain. Existing local ant/test visibility is retained at its
 * actual public caller, not inferred as authentication or backend eligibility. */
export function getCanonicalDebugInstance287() {
 const instance=getChromeClientCuts287().debugInstance()
 instance.deps.isAnt=process.env.USER_TYPE==='ant'
 instance.deps.isTestEnvironment=process.env.NODE_ENV==='test'
 return instance
}
export const getMinDebugLogLevel=memoize(():DebugLogLevel=>getCanonicalDebugInstance287().minLevel)
export const isDebugMode=memoize(():boolean=>getCanonicalDebugInstance287().isDebugMode())
export const getDebugFilter=memoize(():DebugFilter|null=>getCanonicalDebugInstance287().filter)
export const isDebugToStdErr=memoize(():boolean=>getCanonicalDebugInstance287().toStderr)
export const getDebugFilePath=memoize(():string|null=>getCanonicalDebugInstance287().filePath)
export function enableDebugLogging():boolean {
 const previous=getCanonicalDebugInstance287().enableDebugLogging()
 isDebugMode.cache.clear?.()
 return previous
}
export function setHasFormattedOutput(value:boolean):void {getCanonicalDebugInstance287().hasFormattedOutput=value}
export function getHasFormattedOutput():boolean {return getCanonicalDebugInstance287().hasFormattedOutput}
export async function flushDebugLogs():Promise<void> {await getChromeClientCuts287().debugState().instance?.flush()}
export function logForDebugging(message:string,{level}:{level:DebugLogLevel}={level:'debug'}):void {
 getCanonicalDebugInstance287().log(message,{level})
}
export function getDebugLogPath():string {return getCanonicalDebugInstance287().logPath()}

/**
 * Logs errors for Ants only, always visible in production.
 */
export function logAntError(context: string, error: unknown): void {
  if (process.env.USER_TYPE !== 'ant') {
    return
  }

  if (error instanceof Error && error.stack) {
    logForDebugging(`[ANT-ONLY] ${context} stack trace:\n${error.stack}`, {
      level: 'error',
    })
  }
}
