import {createReadStream} from 'node:fs'
import {createInterface} from 'node:readline'
import {appendFile,copyFile,lstat,mkdir,readdir,readlink,realpath,rename,rm,stat,symlink,unlink,utimes} from 'node:fs/promises'
import {basename,dirname,join,resolve,sep} from 'node:path'
import {getOriginalCwd,getSessionId,switchSession,type SessionSwitchReason} from '../../bootstrap/state.js'
import type {SessionId} from '../../types/ids.js'
import type {Entry} from '../../types/logs.js'
import {getProjectDir,getProjectsDir,sessionTitleChanged} from '../../utils/sessionStorage.js'
import {getTaskOutputDir} from '../../utils/task/diskOutput.js'
import {updateSessionRecord} from '../../utils/concurrentSessions.js'
import {logForDebugging} from '../../utils/debug.js'
import {createCdFunctions} from './official.js'

export type RelocationProject={
 sessionFile:string|null; currentSessionRelocatedCwd?:string
 renamePersistenceDisabled():boolean;beginTranscriptRelocation():void;endTranscriptRelocation():Promise<void>
 flush():Promise<void>;setSessionFile(file:string):void
}
// A persisted transcript supplies the provenance after process restart too.
async function isSessionAlias(file:string,current:string,transcript:string,id:string):Promise<boolean>{
 const projects=await realpath(getProjectsDir())
 if(basename(file)!==id||await realpath(file)!==await realpath(current))return false
 let link=file
 const seen=new Set<string>()
 while((await lstat(link)).isSymbolicLink()){
  if(seen.has(link))return false
  seen.add(link)
  const next=resolve(dirname(link),await readlink(link))
  if(basename(next)!==id||await realpath(dirname(dirname(next)))!==projects)return false
  link=next
 }
 let witnessedHome=false,witnessedMove=false
 const input=createReadStream(transcript)
 const lines=createInterface({input,crlfDelay:Infinity})
 try{for await(const line of lines){
  let row:any;try{row=JSON.parse(line)}catch{continue}
  if(row.sessionId!==id)continue
  const cwd=row.type==='relocated'?row.relocatedCwd:row.cwd
  if(typeof cwd==='string'&&basename(getProjectDir(cwd))===basename(dirname(file)))witnessedHome=true
  if(row.type==='relocated'&&typeof cwd==='string'&&basename(getProjectDir(cwd))===basename(dirname(current)))witnessedMove=true
  if(witnessedHome&&witnessedMove)return true
 }}finally{lines.close();input.destroy()}
 return false
}
export class CommittedRelocationError extends Error {
 constructor(error:unknown){super(`The session moved, but a follow-up operation failed: ${String(error)}`)}
}
let relocating=false
const missing=(e:unknown)=>(e as NodeJS.ErrnoException)?.code==='ENOENT'
async function optionalStat(file:string){try{return await lstat(file)}catch(e){if(!missing(e))throw e;return undefined}}

async function repointTaskOutputSymlinks(from:string,to:string){
 const outputs=getTaskOutputDir()
 const entries=await readdir(outputs,{withFileTypes:true}).catch(e=>{if(missing(e))return [];throw e})
 for(const item of entries){
  if(!item.isSymbolicLink())continue
  const file=join(outputs,item.name),link=await readlink(file),target=resolve(outputs,link)
  if(target!==from&&!target.startsWith(from+sep))continue
  const replacement=to+target.slice(from.length)
  // Only a captured unchanged link; never remove an output file.
  if(await readlink(file)!==link)continue
  await unlink(file);await symlink(replacement,file)
 }
}

/** Yze/W9t/DWe are complete official bodies; this binds their raw-fs host. */
export async function relocateTranscriptWithOfficial(owner:RelocationProject):Promise<void>{
 if(relocating)throw Error('A directory move is already in progress')
 relocating=true
 const id=getSessionId(),targetDir=getProjectDir(getOriginalCwd()),old=owner.sessionFile
 const from=old?join(dirname(old),id):undefined,to=join(targetDir,id)
 let removedAlias:string|undefined
 try{
  if(from&&from!==to&&!owner.renamePersistenceDisabled()){
   const destination=await optionalStat(to)
   if(destination){
    const same=await realpath(from).catch(()=>from)===await realpath(to).catch(()=>to)
    if(destination.isSymbolicLink()&&same&&old&&await isSessionAlias(to,from,old,id)){removedAlias=await readlink(to);await unlink(to)}
    else if(!same)throw Error('The destination session sidecar already exists; left unchanged')
    else if(destination.isSymbolicLink())throw Error('The destination link has no matching same-session relocation provenance')
   }
  }
  const official=createCdFunctions({
   V:getSessionId,Ph:getProjectDir,we:getOriginalCwd,
   Rs:()=>({...owner,sessionFile:owner.sessionFile,
    get currentSessionRelocatedCwd(){return owner.currentSessionRelocatedCwd},
    set currentSessionRelocatedCwd(value:string|undefined){owner.currentSessionRelocatedCwd=value},
    beginTranscriptRelocation:()=>owner.beginTranscriptRelocation(),endTranscriptRelocation:()=>owner.endTranscriptRelocation(),
    // flush() waits tracked IO; a write already awaiting its UUID index can
    // enqueue after the first drain. Drain again before renaming its home.
    flush:async()=>{await owner.flush();await owner.flush()},
    setSessionFile:(file:string)=>owner.setSessionFile(file),fireMirror:()=>{}}),
   ba:()=>owner.renamePersistenceDisabled(),
   gh:(id:SessionId,reason:SessionSwitchReason,dir:string)=>{switchSession(id,reason,dir);sessionTitleChanged.emit();void updateSessionRecord({cwd:getOriginalCwd()})},
   Hl:join,ag:dirname,Ru:(file:string)=>realpath(file).catch(()=>resolve(file)),Vh:stat,OR:mkdir,II:rename,IR:readdir,x9t:copyFile,A9t:rm,srr:utimes,
   U:missing,E:(e:NodeJS.ErrnoException)=>e.code,S:JSON.stringify,t:logForDebugging,d:(e:unknown)=>logForDebugging(String(e)),
   taskOutputs:{repointTaskOutputSymlinks},retention:{isRetentionExemptionDisabled:()=>false},q9t:()=>{},K9t:()=>{},xZt:async()=>{},NI:()=>undefined,
   L_o:async(file:string,text:string)=>{await appendFile(file,text,{mode:0o600});return true},
   mv:async(file:string,entry:Entry)=>{await appendFile(file,JSON.stringify(entry)+'\n',{mode:0o600})},
  })
  let completionError:unknown
  try{await official.relocate()}catch(error){
   if(owner.sessionFile===old)throw error
   completionError=error
  }
  owner.currentSessionRelocatedCwd=getOriginalCwd()
  // C compatibility: previously persisted absolute tool-results references
  // remain valid. On A→B→C→A, remove only A's owned alias before the move;
  // B→C→A stays acyclic, then C→A is installed.
  if(from&&from!==to&&owner.sessionFile!==old&&await optionalStat(to)&&!await optionalStat(from)){
   try{await symlink(to,from,'dir')}catch(error){completionError??=error}
  }
  if(completionError)throw new CommittedRelocationError(completionError)
 }catch(error){
  if(removedAlias&&!await optionalStat(to)){await symlink(removedAlias,to,'dir')}
  throw error
 }finally{relocating=false}
}
