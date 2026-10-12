// Generated canonical schema view; no new Zod factories or state.
import type {z} from 'zod/v4'
import type {PublicControlRequest287} from './types.js'
import {getPrintHostSource287} from '../../../cli/printOwnership287/publicHostRuntime287.js'
const roots=["Io","Do","xo","Uo","Vo","jo","Fo","HJe","ai","li","wi","IEn"] as const
export function publicControlRequestSchemas287():z.ZodType<PublicControlRequest287>[] {
 return roots.map(name=>(getPrintHostSource287('chunk-xep95vq1.js',name) as ()=>z.ZodType<PublicControlRequest287>)())
}
