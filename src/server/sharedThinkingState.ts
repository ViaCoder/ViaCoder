import {z} from 'zod/v4'
export class ThinkingRequestSuperseded extends Error {
 constructor(){super('Shared owner changed before thinking confirmation');this.name='ThinkingRequestSuperseded'}
}

const config=z.discriminatedUnion('type',[
 z.object({type:z.literal('disabled')}),
 z.object({type:z.literal('adaptive'),display:z.enum(['summarized','omitted']).optional()}),
 z.object({type:z.literal('enabled'),budgetTokens:z.number(),display:z.enum(['summarized','omitted']).optional()}),
])
export const sharedThinkingStateSchema=z.object({enabled:z.boolean(),userValue:z.boolean().nullable(),
 option:config.nullable(),revision:z.string().min(1),canEnable:z.boolean(),lockedReason:z.string().optional()})
export const sharedThinkingResultSchema=z.object({state:sharedThinkingStateSchema,undoToken:z.string().optional()})
export const sharedThinkingControlSchema=z.object({subtype:z.literal('local_public_thinking'),
 update:z.object({enabled:z.boolean(),expected:z.string().min(1)}).strict().optional(),
 restore:z.object({token:z.string().min(1),expected:z.string().min(1)}).strict().optional(),
}).strict().refine(request=>!(request.update&&request.restore),'Choose update or restore')
export type SharedThinkingState=z.infer<typeof sharedThinkingStateSchema>
export type SharedThinkingResult=z.infer<typeof sharedThinkingResultSchema>
export type SharedThinkingControl=z.infer<typeof sharedThinkingControlSchema>
export type SharedThinkingChange=Omit<SharedThinkingControl,'subtype'>
export interface SharedThinkingHost {
 thinking?(change?:SharedThinkingChange,signal?:AbortSignal):Promise<SharedThinkingResult>
 subscribeSettingsChanges?(listener:()=>void):()=>void
}
export function projectSharedThinking(value:unknown){const result=sharedThinkingResultSchema.safeParse(value);return result.success?result.data:null}
