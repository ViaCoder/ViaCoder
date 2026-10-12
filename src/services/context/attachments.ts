import {z} from 'zod'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../analytics/growthbook.js'
import {lazySchema} from '../../utils/lazySchema.js'
import {createOfficialContext} from './official/attachments.js'

// Official validators and branches remain intact. UUID creation and reminder
// wrapping belong to messages.ts; importing them here would create a cycle.
export const officialContextAttachments = createOfficialContext({
  'chunk-g4gq2k0z.js': {Egt:z.partialRecord, d:z.object, k:z.array, o:z.string, G:z.enum, O:z.boolean},
  'chunk-dsp1md5e.js': {p: lazySchema},
  'chunk-59zy4j10.js': {
    ke: (value: {content: string; isMeta: true}) => value,
    ji: messages => messages,
    LLe: () => getFeatureValue_CACHED_MAY_BE_STALE('tengu_indexed_corbato', false),
  },
})
export const sanitizeOfficialMemoryContent = officialContextAttachments.sanitizeMemoryContent
