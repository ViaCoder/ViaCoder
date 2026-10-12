import type {z} from 'zod/v4'
import type {ResultSuccess287,ResultError287} from './types.js'
export interface ResultSchemaPorts287 {
 f:<T>(factory:()=>T)=>()=>T;
 u:typeof z.object;x:typeof z.literal;o:typeof z.string;C:typeof z.number;H:typeof z.boolean;
 se:typeof z.unknown;T:typeof z.array;de:typeof z.record;B:typeof z.enum;Fe:typeof z.union;Wo:typeof z.discriminatedUnion;
 Ve:typeof z.strictObject;pt:typeof z.looseObject;
}
export function createResultSchemas287(ports:ResultSchemaPorts287):{
 success:()=>z.ZodType<ResultSuccess287>;
 error:()=>z.ZodType<ResultError287>;
}
