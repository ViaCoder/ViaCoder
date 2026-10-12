import * as path from 'node:path'
import {homedir} from 'node:os'
import {executionLifecycle287} from '../services/context/execution287.js'
import {getNullableCwd287} from './cwd.js'
import {getPlatform} from './platform.js'
import {createPathRuntime287,type PathRuntime287,type WindowsPathConverter287} from './officialPathExpansion287/native.js'

// Bind lazily: bootstrap/config/path share an import cycle. The converter and
// public expandPath use the same original Z8/Qx cache after first actual use.
let owner:PathRuntime287|undefined
function runtime():PathRuntime287 {
  return owner??=createPathRuntime287(`${process.platform}-${process.arch}`,{
    nullableCwd:getNullableCwd287,
    NoProjectDirectoryError:executionLifecycle287.NoProjectDirectoryError,
    platform:getPlatform,path,homedir,
  })
}
export function expandPath287(value:string,base?:string):string {return runtime().expand(value,base)}
export const posixPathToWindowsPath287:WindowsPathConverter287=Object.assign(
  (value:string)=>runtime().convert(value),
  {cache:{clear:()=>runtime().convert.cache.clear(),size:()=>runtime().convert.cache.size(),
    delete:(key:string)=>runtime().convert.cache.delete(key),get:(key:string)=>runtime().convert.cache.get(key),
    has:(key:string)=>runtime().convert.cache.has(key),set:(key:string,value:string)=>runtime().convert.cache.set(key,value)}},
)

// Original jx and public Windows paths now use the same reverse conversion cache.
export const windowsPathToPosixPath287:WindowsPathConverter287=Object.assign(
  (value:string)=>runtime().windowsToPosix(value),
  {cache:{clear:()=>runtime().windowsToPosix.cache.clear(),size:()=>runtime().windowsToPosix.cache.size(),
    delete:(key:string)=>runtime().windowsToPosix.cache.delete(key),get:(key:string)=>runtime().windowsToPosix.cache.get(key),
    has:(key:string)=>runtime().windowsToPosix.cache.has(key),set:(key:string,value:string)=>runtime().windowsToPosix.cache.set(key,value)}},
)
