import {APIConnectionError} from '@anthropic-ai/sdk'
import {authEnvironment} from './authEnvironment.js'
import {logForDebugging} from './debug.js'
import {logError} from './log.js'
import {createTlsReload287} from './officialTlsMaterial287/native.js'
import {clearProxyCache,configureGlobalAgents} from './proxy.js'
import {sharedTlsMaterial287,tlsMaterialReporters287} from './sharedTlsMaterial287.js'

const reload=createTlsReload287({
 a:authEnvironment,Nse:sharedTlsMaterial287.loadMTLSClientMaterial,
 Fse:clearProxyCache,lw:configureGlobalAgents,d:logError,t:logForDebugging,
 m:tlsMaterialReporters287.m,p:tlsMaterialReporters287.p,y:tlsMaterialReporters287.y,Jd:APIConnectionError,
})
export const isMTLSReloadError=reload.shouldReload
export const reloadMTLSAfterFailure=reload.reload
