import {constants} from 'node:fs'
import {lstat,open} from 'node:fs/promises'
import {logForDebugging} from '../../utils/debug.js'
import {logError} from '../../utils/log.js'
import {getTaskOutputPath} from '../../utils/task/diskOutput.js'
import {agentPromptState287} from '../../services/context/agentPromptState287.js'
import {createGetTaskSessionNative287,type SessionNativePorts287} from './sessionNative.js'

export function getTaskDebug287(message:string,options?:{level?:string}):void {
  const level=options?.level
  if(level==='error'||level==='warn'||level==='info'||level==='debug')logForDebugging(message,{level})
  else logForDebugging(message)
}
export function createSessionNativeHost287(ports:Pick<SessionNativePorts287,'mainAgentId'|'notificationQueue'>) {
  return createGetTaskSessionNative287({...ports,process,lstat,open,fsConstants:constants,
    backgroundPolicy:()=>agentPromptState287.backgroundPolicy(),
    featureValue:(name,fallback)=>{
      const {getFeatureValue_CACHED_MAY_BE_STALE}=require('../../services/analytics/growthbook.js') as typeof import('../../services/analytics/growthbook.js')
      return getFeatureValue_CACHED_MAY_BE_STALE(name,fallback)
    },
    debug:getTaskDebug287,logError,outputPath:id=>getTaskOutputPath(id)})
}
// File operations are independent of session/queue owners; accidental access
// to either missing port is an error, not a fabricated successful lookup.
export const taskFileNative287=createSessionNativeHost287({
  mainAgentId(){throw Error('File-only GetTask runtime has no agent owner')},
  notificationQueue(){throw Error('File-only GetTask runtime has no notification owner')},
})
