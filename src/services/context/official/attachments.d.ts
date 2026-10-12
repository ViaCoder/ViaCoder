export type RefreshReason = 'session_start' | 'compaction' | 'policy_refresh' | 'directory_added' | 'settings_sync' | 'account_change' | 'hooks_invalidate' | 'policy_verdict' | 'memory_paused' | 'memory_resumed' | 'auto_memory_off' | 'auto_memory_back_on'
export type InstructionFile = {path: string; type: 'User' | 'Project' | 'Local' | 'Managed' | 'AutoMem' | 'AutoMemPinned'; content: string}
export type SessionContext = Partial<Record<'userEmail' | 'attachedProject' | 'gitStatus' | 'perforceMode', string>>
export type ContextAttachment =
  | {type: 'instructions'; files: InstructionFile[]; removed?: string[]; changed?: boolean; reason?: RefreshReason}
  | {type: 'session_context'; context: SessionContext; changed?: boolean; reason?: RefreshReason}
  | {type: 'date'; date: string; changed?: boolean}
  | {type: 'context_sections'; sections: {name: string; text: string}[]}
  | {type: 'coordinator_context'; content: string; changed?: boolean}
export type OfficialContext<T> = {
  normalizers: Record<ContextAttachment['type'], (attachment: unknown) => T[]>
  snapshotInstructions(files: InstructionFile[]): InstructionFile[]
  readInstructions(messages: readonly unknown[]): Map<string, InstructionFile> | undefined
  diffInstructions(files: InstructionFile[], previous?: Map<string, InstructionFile>): {files: InstructionFile[]; removed?: string[]; changed?: boolean} | undefined
  readSessionContext(messages: readonly unknown[]): SessionContext | undefined
  readDate(messages: readonly unknown[]): string | undefined
  sameSessionContext(a: SessionContext, b: SessionContext): boolean
  formatInstructions(files: InstructionFile[]): string
  /** Exact `iq -> VRe -> K().neutralize` owner already used by the formatter. */
  sanitizeMemoryContent(text: string): string
  contextSectionsSchema(): import('zod').ZodType
  coordinatorContextSchema(): import('zod').ZodType
}
export function createOfficialContext<T>(host: {
  'chunk-g4gq2k0z.js': {
    Egt: typeof import('zod').z.partialRecord; d: typeof import('zod').z.object
    k: typeof import('zod').z.array; o: typeof import('zod').z.string
    G: typeof import('zod').z.enum; O: typeof import('zod').z.boolean
  }
  'chunk-dsp1md5e.js': {p<U>(load: () => U): () => U}
  'chunk-59zy4j10.js': {ke(value: {content: string; isMeta: true}): T; ji(messages: T[]): T[]; LLe(): boolean}
}): OfficialContext<T>
