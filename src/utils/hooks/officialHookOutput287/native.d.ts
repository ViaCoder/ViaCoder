import type {HookJSONOutput,SyncHookJSONOutput,AsyncHookJSONOutput} from '../../../entrypoints/agentSdkTypes.js'
import type {z} from 'zod/v4'
import type {slowLogging} from '../../slowOperations.js'
export interface HookOutputParserPorts287 {
 schema():z.ZodType<HookJSONOutput>;
 parse(text:string):unknown;
 stringify:typeof import('../../slowOperations.js').jsonStringify;
 debug:typeof import('../../debug.js').logForDebugging;
 slowLogging:typeof slowLogging;
}
export type HookParseResult287={json?:HookJSONOutput;plainText?:string;validationError?:string}
export function createHookOutputParser287(ports:HookOutputParserPorts287):{
 commandParser(stdout:string):HookParseResult287;
 httpParser(body:string):HookParseResult287;
 validate(json:string):{json:HookJSONOutput}|{validationError:string};
 isSync(output:HookJSONOutput):output is SyncHookJSONOutput;
 isAsync(output:HookJSONOutput):output is AsyncHookJSONOutput;
}
