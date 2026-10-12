import { constants } from 'node:fs'
import { lstat, open, readdir, realpath } from 'node:fs/promises'
import { isAbsolute, join, relative, sep } from 'node:path'
import { getProjectsDir } from '../utils/sessionStorage.js'
import { parseOfficialUsageRecord, accumulateOfficialSkillTokens } from './official-skill-usage.js'

const WEEK=604_800_000
const CHUNK=4_194_304 // Official m8zvc9bg te/Ae.
const MAX_LINE=16*CHUNK
export type SkillScanPolicy={allowed:boolean;reason?:string}
export type SkillScanResult={tokens:Map<string,number>;note:string|null;files:number;records:number}

/** DZr/ue/kn/Dn/de: seven-day main + recursive subagent journals, mtime gate,
 * requestId > msg_ id > UUID dedupe, sum input/output/cache-read/cache-create.
 * Kn/Nn are the pinned official functions, not a fabricated per-invocation cost.
 * This is the local JSONL backend; v5 storage is deliberately not simulated.
 */
export async function scanSkillUsage(policy:()=>SkillScanPolicy, root=getProjectsDir(), now=Date.now(), signal?:AbortSignal):Promise<SkillScanResult> {
  const result:SkillScanResult={tokens:new Map(),note:null,files:0,records:0}
  const check=()=>{
    signal?.throwIfAborted()
    const gate=policy()
    if(!gate.allowed)throw new ScanDenied(gate.reason ?? 'Transcript scanning is not allowed.')
  }
  const cutoff=now-WEEK,seen=new Set<string>(),files:string[]=[],warnings=new Set<string>()
  let realRoot:string
  const within=(path:string)=>{const r=relative(realRoot,path);return r!== '..'&&!r.startsWith(`..${sep}`)&&!isAbsolute(r)}
  async function journals(folder:string):Promise<void> {
    check()
    let entries
    try {entries=await readdir(folder,{withFileTypes:true})}catch(error){if((error as NodeJS.ErrnoException).code==='ENOENT')return;throw error}
    for(const entry of entries){
      if(entry.isSymbolicLink())continue
      const path=join(folder,entry.name)
      if(entry.isFile()&&entry.name.endsWith('.jsonl'))files.push(path)
      else if(entry.isDirectory())await journals(path)
    }
  }
  try {
    check()
    if((await lstat(root)).isSymbolicLink())throw Error('Transcript root must not be a symbolic link')
    realRoot=await realpath(root)
    for(const project of await readdir(realRoot,{withFileTypes:true})){
      if(!project.isDirectory())continue
      const folder=join(realRoot,project.name)
      for(const entry of await readdir(folder,{withFileTypes:true})){
        if(entry.isFile()&&entry.name.endsWith('.jsonl'))files.push(join(folder,entry.name))
        else if(entry.isDirectory())await journals(join(folder,entry.name,'subagents'))
      }
    }
    // Official ue processes batches of four and folds them in discovery order.
    // Sequential streaming here bounds memory to one journal and preserves dedupe order.
    for(const path of files){
      check()
      const canonical=await realpath(path).catch(error=>{if(error.code==='ENOENT')return null;throw error})
      if(!canonical||!within(canonical))continue
      const handle=await open(canonical,constants.O_RDONLY|(constants.O_NOFOLLOW??0))
      try {
        const stat=await handle.stat()
        if(!stat.isFile()||stat.mtimeMs<cutoff)continue
        result.files++
        let pending=Buffer.alloc(0),dropping=false,position=0
        const chunk=Buffer.allocUnsafe(CHUNK)
        const consume=(line:Buffer)=>{
          const record=parseOfficialUsageRecord(line,0,line.length,cutoff)
          if(!record||record.uuid&&seen.has(record.uuid))return
          if(record.uuid)seen.add(record.uuid)
          result.records++
          accumulateOfficialSkillTokens(result.tokens,record)
        }
        while(position<stat.size){
          check()
          const {bytesRead}=await handle.read(chunk,0,Math.min(CHUNK,stat.size-position),position)
          if(!bytesRead)break
          position+=bytesRead
          let offset=0
          while(offset<bytesRead){
            const end=chunk.indexOf(10,offset),newline=end>=0&&end<bytesRead,bound=newline?end:bytesRead
            const part=chunk.subarray(offset,bound)
            if(!dropping){
              if(pending.length+part.length>MAX_LINE){warnings.add('Oversized transcript records were skipped; totals are partial.');pending=Buffer.alloc(0);dropping=true}
              else pending=Buffer.concat([pending,part])
            }
            if(newline){if(!dropping)consume(pending);pending=Buffer.alloc(0);dropping=false}
            offset=bound+(newline?1:0)
          }
        }
        if(pending.length&&!dropping)consume(pending)
      } finally {await handle.close()}
    }
    check()
    result.note=warnings.size?[...warnings].join(' '):null
    return result
  } catch(error) {
    if(error instanceof ScanDenied)return {...result,tokens:new Map(),note:error.message}
    if((error as NodeJS.ErrnoException).code==='ENOENT')return result
    throw error
  }
}
class ScanDenied extends Error {}
