import type { ZodTypeAny } from 'zod'

export function createOfficialBootstrapResponseSchema287(ports: Record<string, (...args: any[]) => any>): () => ZodTypeAny
export function createOfficialBootstrapFetcher287(ports: Record<string, any>): (context: any, credentials?: unknown) => Promise<{response: unknown; scopeless: boolean} | null>
export function createOfficialBootstrapPublisher287(ports: Record<string, any>): (storageV5?: unknown, credentials?: unknown, options?: {keepRenderCaches?: boolean; renderedClientData?: unknown}) => Promise<boolean>
