import {open,readdir,stat} from 'node:fs/promises'
import {join,extname} from 'node:path'
import {getProjectsDir} from '../../utils/sessionStorage.js'
import {logError} from '../../utils/log.js'
import {jsonStringify} from '../../utils/slowOperations.js'
import {createUsageTranscripts287,createUsageTranscriptLines287,createUsageTranscriptText287,createUsageTranscriptIoErrors287} from './officialUsage287/runtime.js'
import type {UsageBehaviorRecord} from '../../cli/control/sessionQueries.js'
import type {UsageTranscriptRead287} from './officialUsage287/runtime.js'

const lines=createUsageTranscriptLines287({K:open}),text=createUsageTranscriptText287({})
/** Complete normal filesystem ue/Bn/Gn and loop-fire observer. IO comes from
 * the existing project-directory owner; no alternative transcript/cache state. */
export function createLocalUsageTranscriptReader287(projectsDir:()=>string=getProjectsDir){
 return createUsageTranscripts287({Dp:projectsDir,H:readdir,Ce:stat,j:extname,v:join,d:logError,
  ...lines,QK:text,_:jsonStringify,Ht:createUsageTranscriptIoErrors287({}),
  // The injected client uses the original paginated reader and its canonical
  // parser/key/pager dependencies. This does not create a private backend.
  Ln:async(storageV5,since,record,fire,observer)=>{
   const {getPrintHostSource287}=await import('../../cli/printOwnership287/publicHostRuntime287.js')
   const read=getPrintHostSource287('chunk-zypax3sr.js','Ln') as (
    storageV5:unknown,since:number,record:Parameters<UsageTranscriptRead287>[1],
    fire?:Parameters<UsageTranscriptRead287>[3],observer?:Parameters<UsageTranscriptRead287>[4],
   )=>Promise<void>
   return read(storageV5,since,record,fire,observer)
  },
 })
}
export const nativeUsageTranscripts287=createLocalUsageTranscriptReader287()
export function parseUsageTranscriptLine287(line:Buffer,since:number):UsageBehaviorRecord|undefined {
 return nativeUsageTranscripts287.parse(line,0,line.length,since)
}
