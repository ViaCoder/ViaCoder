import {createHookOutputParser287} from './officialHookOutput287/native.js'
import {HookJSONOutputSchema} from '../../entrypoints/sdk/coreSchemas.js'
import {jsonParse,jsonStringify,slowLogging} from '../slowOperations.js'
import {logForDebugging} from '../debug.js'
// No parser-specific owner/cache: both execution paths validate the same schema.
export const hookOutputParser287=createHookOutputParser287({
 schema:()=>HookJSONOutputSchema(),parse:jsonParse,stringify:jsonStringify,
 debug:logForDebugging,slowLogging,
})
