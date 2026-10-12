import type {ExecutionSession287} from '../officialExecutionOwners287/native.js'
import type {z} from 'zod/v4'
export const initializeSkillsSchema287:z.ZodOptional<z.ZodArray<z.ZodString>>
export interface SessionSkillAllowlist287 {read():readonly string[]|undefined;replace(value:readonly string[]|undefined):void;applyInitializeSkills(request:{skills?:readonly string[]}):void}
export function createSessionSkillAllowlist287(ports:{execution():Pick<ExecutionSession287,'host'>}):SessionSkillAllowlist287
