import {updateOrdinarySettingsAsync287} from './fastStatusWriter287.js'
import type {SettingsJson} from './types.js'
import {logError} from '../log.js'
// Only adapt the original {error} result to UI completion; no queue/cache/store.
export async function persistUiSettings287(source:'userSettings'|'projectSettings'|'localSettings',value:SettingsJson,storageV5?:unknown,onError?:(error:Error)=>void):Promise<boolean>{
 const {error}=await updateOrdinarySettingsAsync287(source,value,storageV5)
 if(error){logError(error);onError?.(error);return false}
 return true
}
