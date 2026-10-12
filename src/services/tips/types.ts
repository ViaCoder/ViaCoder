import type { ThemeName } from '../../utils/theme.js'
import type { getExecutionSession287 } from '../context/execution287.js'
import type { FileStateCache } from '../../utils/fileStateCache.js'

export type TipContext = {
  theme: ThemeName
  session?: ReturnType<typeof getExecutionSession287>
  storageV5?: unknown
  credentials?: unknown
  bashHosts?: Set<string>
  toolsUsed?: Set<string>
  devIntents?: Set<string>
  readFileState?: FileStateCache
  bashTools?: Set<string>
}

export type Tip = {
  id: string
  label?: string
  priority?: number
  providerAgnostic?: boolean
  maxLifetimeShows?: number
  advertisedCommand?: string
  content: (context: Pick<TipContext, 'theme'>) => string | Promise<string>
  cooldownSessions: number
  isRelevant: (context?: TipContext) => boolean | Promise<boolean>
}
