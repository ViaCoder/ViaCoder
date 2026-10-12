import {cleanupLogs287} from './cleanupLogs287.js'
import {runCleanupSweep287} from './cleanupSweep287.js'
import type {CleanupLogResult287} from './officialCleanupLogs287/native.js'
import type {StorageV5Backend} from './secureStorage/storageV5.js'

export function convertFileNameToDate(filename:string):Date{
 return cleanupLogs287.dateFromName(filename)
}
export function cleanupOldMessageFiles():Promise<CleanupLogResult287>{
 return cleanupLogs287.messageLogs()
}
export function cleanupOldDebugLogs():Promise<CleanupLogResult287>{
 return cleanupLogs287.debugLogs()
}
/** Original complete dispatch, disposal and stats; retained C lives at five explicit leaves. */
export function cleanupOldMessageFilesInBackground(storage?:StorageV5Backend):Promise<void>{
 return runCleanupSweep287(storage)
}

