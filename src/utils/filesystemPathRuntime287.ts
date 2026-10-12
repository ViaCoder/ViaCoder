import * as fs from 'node:fs'
import * as path from 'node:path'
import * as os from 'node:os'
import {createFilesystemPathRuntime287} from './officialFilesystemPaths287/native.js'

// Both public consumers share the original network caches and launch ancestry.
// Original Uet captures the process working directory when this owner loads.
export const filesystemPathRuntime287=createFilesystemPathRuntime287(
  `${process.platform}-${process.arch}`,{fs,path,os,filesystem:()=>{const {getFsImplementation}=require('./fsOperations.js') as typeof import('./fsOperations.js');return getFsImplementation()}},
)
