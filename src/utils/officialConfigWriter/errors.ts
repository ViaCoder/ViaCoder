import {createConfigErrors} from './runtime.js'

// One constructor brand for the native reader/writer and public init dialog.
export const configErrors=createConfigErrors()
export const ConfigParseError=configErrors.ConfigParseError
export type ConfigParseError=InstanceType<typeof ConfigParseError>
