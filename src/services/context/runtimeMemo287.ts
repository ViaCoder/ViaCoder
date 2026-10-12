import {getExecutionSession287,executionSessionRegistryConstructor287} from './execution287.js'
import {createRuntimeMemo287} from './officialRuntimeMemo287/native.js'

/** Shared original ko: aliases share their root, independent sessions do not. */
export const getRuntimeMemo287=createRuntimeMemo287({
 execution:getExecutionSession287,
 registry:executionSessionRegistryConstructor287,
})
