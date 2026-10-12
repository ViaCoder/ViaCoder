import { getHeapDumpFunctions287 } from './officialHeapDump287/runtime.js'

export type HeapDumpResult = {
  success: boolean
  heapPath?: string
  diagPath?: string
  error?: string
  diagnostics?: MemoryDiagnostics
}

/**
 * Memory diagnostics captured alongside heap dump.
 * Helps identify if leak is in V8 heap (captured in snapshot) or native memory (not captured).
 */
export type MemoryDiagnostics = {
  timestamp: string
  runtime: 'bun' | 'node'
  objectTypeCounts?: Record<string, number>
  protectedObjectTypeCounts?: Record<string, number>
  mimalloc?: Record<string, unknown>
  sessionId: string
  trigger: 'manual' | 'auto-1.5GB'
  dumpNumber: number // 1st, 2nd, etc. auto dump in this session (0 for manual)
  uptimeSeconds: number
  memoryUsage: {
    heapUsed: number
    heapTotal: number
    external: number
    arrayBuffers: number
    rss: number
  }
  memoryGrowthRate: {
    bytesPerSecond: number
    mbPerHour: number
  }
  v8HeapStats: {
    heapSizeLimit: number // Max heap size allowed
    mallocedMemory: number // Memory allocated outside V8 heap
    peakMallocedMemory: number // Peak native memory
    detachedContexts: number // Leaked contexts - key leak indicator!
    nativeContexts: number // Active contexts
  }
  v8HeapSpaces?: Array<{
    name: string
    size: number
    used: number
    available: number
  }>
  resourceUsage: {
    maxRSS: number // Peak RSS in bytes
    userCPUTime: number
    systemCPUTime: number
  }
  activeHandles: number // Leaked timers, sockets, file handles
  activeRequests: number // Pending async operations
  openFileDescriptors?: number // Linux/macOS - indicates resource leaks
  analysis: {
    potentialLeaks: string[]
    recommendation: string
  }
  smapsRollup?: string // Linux only - detailed memory breakdown
  platform: string
  nodeVersion: string
  ccVersion: string
}

export async function captureMemoryDiagnostics(
  trigger: 'manual' | 'auto-1.5GB',
  dumpNumber = 0,
): Promise<MemoryDiagnostics> {
  return getHeapDumpFunctions287().capture(trigger, dumpNumber)
}

export async function performHeapDump(
  trigger: 'manual' | 'auto-1.5GB' = 'manual',
  dumpNumber = 0,
): Promise<HeapDumpResult> {
  return getHeapDumpFunctions287().perform(trigger, dumpNumber)
}
