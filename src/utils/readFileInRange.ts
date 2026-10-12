import * as fs from 'node:fs'
import * as promises from 'node:fs/promises'
import * as stream from 'node:stream'
import * as stringDecoder from 'node:string_decoder'
import {createReadFileRange287} from './officialReadFileRange287/native.js'

// Ake and its stream helpers use one actual primitive reader. A supplied
// verified handle is read directly; it is never reopened by its path.
const rangeReader287=createReadFileRange287({fs,'fs/promises':promises,stream,string_decoder:stringDecoder})
export type {ReadFileRangeResult287 as ReadFileRangeResult,ReadFileRangeOptions287 as ReadFileRangeOptions} from './officialReadFileRange287/native.js'
export const readFileInRange=rangeReader287.readRange
export const FileTooLargeError=rangeReader287.fileTooLarge
export const SelectedRangeTooLargeError=rangeReader287.selectedTooLarge
