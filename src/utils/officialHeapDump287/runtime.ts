import * as fs from 'node:fs'
import * as fsPromises from 'node:fs/promises'
import * as path from 'node:path'
import * as os from 'node:os'
import * as v8 from 'node:v8'
import {createHeapDump287,type HeapDumpFunctions287} from './source.js'
import {publicCommandSourcePort287 as read} from '../commandCompletionProducers287.js'
// Only original stateless functions and the source-declared Desktop exclusion
// set are cached. Session/fs/privacy/telemetry all use existing canonical owners.
let functions:HeapDumpFunctions287|undefined
export function getHeapDumpFunctions287():HeapDumpFunctions287 {
 return functions??=createHeapDump287(`${process.platform}-${process.arch}`,{
  session:read('chunk-bn3p37gv.js','q'),
  error:read('chunk-c9me9cp7.js','Z'),
  isReadonlyError:read('chunk-c9me9cp7.js','as'),
  telemetry:read('chunk-6hnyhakg.js','i'),
  stringify:read('chunk-q80zaav8.js','_'),
  fs:read('chunk-q80zaav8.js','ae'),
  debug:read('chunk-q80zaav8.js','t'),
  logError:read('chunk-amhtwhch.js','d'),
  platform:read('chunk-amhtwhch.js','O'),
  isBun:read('chunk-mbfze585.js','fO'),
  environment:read('chunk-mbfze585.js','a'),
  privateConnection:read('chunk-x5mcrns6.js','Bo'),
 },{'fs':fs,'fs/promises':fsPromises,'path':path,'os':os,'v8':v8})
}
