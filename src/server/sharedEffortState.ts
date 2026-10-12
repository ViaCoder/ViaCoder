import {z} from 'zod/v4'
// Session display state only. Selection is separate from applied effort because
// environment settings and model/policy caps may override a user's preference.
const level = z.enum(['low','medium','high','xhigh','max'])
const effort = z.union([level,z.number().finite()])
export const sharedEffortStateSchema = z.object({
  model:z.string().min(1),
  selection:z.union([effort,z.literal('inherit'),z.literal('default')]),
  applied:effort.nullable(),
  /** Current owner/model/policy choices; absent on older workers. */
  available: z.array(level).optional(),
})
export type SharedEffortState = z.infer<typeof sharedEffortStateSchema>
export type SharedEffortResult = {message:string;state:SharedEffortState}
export function projectSharedEffortResult(value:unknown):SharedEffortResult|null {
  const parsed=z.object({message:z.string(),state:sharedEffortStateSchema}).safeParse(value)
  return parsed.success?parsed.data as SharedEffortResult:null
}
