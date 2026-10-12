import type {z} from 'zod/v4'
import type {SDKControlMcpCallRequest,SDKControlRequest} from '../../entrypoints/sdk/controlTypes.js'
export type PrintMcpCallFrame287=Omit<SDKControlRequest,'request'>&{request:SDKControlMcpCallRequest}
export function createPrintMcpCall287(ports:object):(frame:PrintMcpCallFrame287,schedule:(work:()=>unknown|PromiseLike<unknown>)=>void)=>void
export function createMcpCallSchema287(ports:{f:typeof import('../../utils/lazySchema.js').lazySchema;u:typeof z.object;x:typeof z.literal;o:typeof z.string;de:typeof z.record;se:typeof z.unknown;C:typeof z.number;T:typeof z.array}):()=>z.ZodType<SDKControlMcpCallRequest>
