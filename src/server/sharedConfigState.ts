import {z} from 'zod/v4'

// Local shared-session UI extension; never broadens official update_settings.
export const sharedConfigKeys = ['spinnerTipsEnabled','prefersReducedMotion','outputStyle'] as const
const values = z.object({spinnerTipsEnabled:z.boolean().optional(),prefersReducedMotion:z.boolean().optional(),outputStyle:z.string().optional()})
const patch = z.object({spinnerTipsEnabled:z.boolean().nullable().optional(),prefersReducedMotion:z.boolean().nullable().optional(),outputStyle:z.string().nullable().optional()}).strict()
export const sharedConfigSnapshotSchema = z.object({effective:values,sources:z.array(z.object({source:z.string(),settings:values}))})
export const sharedConfigControlSchema = z.object({subtype:z.literal('local_public_config'),update:z.object({source:z.literal('localSettings'),settings:patch,expected:patch}).strict().optional()}).strict().refine(request=>!request.update || Object.keys(request.update.settings).length>0 && Object.keys(request.update.settings).sort().join(',')===Object.keys(request.update.expected).sort().join(','),'Settings and expected keys must match')
export type SharedConfigControl = z.infer<typeof sharedConfigControlSchema>
export function projectSharedConfig(value:unknown) {
  const result=sharedConfigSnapshotSchema.safeParse(value)
  return result.success ? result.data : null
}
