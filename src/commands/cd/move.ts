import {getOriginalCwd,setOriginalCwd} from '../../bootstrap/state.js'
import {CommittedRelocationError} from './relocation.js'
import {getCwd} from '../../utils/cwd.js'
import {setCwd} from '../../utils/Shell.js'
import {relocateSessionTranscript} from '../../utils/sessionStorage.js'

/** $7e's cwd/relocation/rollback boundary. Trust is decided before this call. */
export async function moveSessionDirectory(directory:string):Promise<string|undefined>{
 const previous=getCwd(),original=getOriginalCwd()
 process.chdir(directory);setCwd(directory);setOriginalCwd(getCwd())
 try{await relocateSessionTranscript()}
 catch(error){
  if(error instanceof CommittedRelocationError)return error.message
  process.chdir(previous);setCwd(previous);setOriginalCwd(original)
  throw error
 }
}
