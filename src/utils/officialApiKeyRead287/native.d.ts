type ApiKeyReadValue = { key: string; source: '/login managed key' } | null
export type ApiKeyReadCell = { value: ApiKeyReadValue | undefined; promise: null | Promise<unknown>; clear(): void }
type MacReadPorts<Username extends 'Xk' | 'XT'> = { Jl(): boolean; wtr(): { stdout: string | null } | null; jF(): string; iEe(command: string): string; t(message: string, options: { level: 'error' }): void; le(): { primaryApiKey?: string | null }; U(): { host: object }; f8(): boolean } & Record<Username, () => string>
type ConfigReadPorts = { Xl(): boolean; le(): { primaryApiKey?: string | null };U():{host:object};B():{host:object} }
export function createApiKeyRead_darwin_arm64_287(ports: MacReadPorts<'Xk'>): { read: () => ApiKeyReadValue; cell(host: object): ApiKeyReadCell }
export function createApiKeyRead_darwin_x64_287(ports: MacReadPorts<'XT'>): { read: () => ApiKeyReadValue; cell(host: object): ApiKeyReadCell }
export function createApiKeyRead_linux_arm64_287(ports: ConfigReadPorts): (() => ApiKeyReadValue) & {cell(host:object):ApiKeyReadCell}
export function createApiKeyRead_linux_x64_287(ports: ConfigReadPorts): (() => ApiKeyReadValue) & {cell(host:object):ApiKeyReadCell}
export function createApiKeyRead_win32_arm64_287(ports: ConfigReadPorts): (() => ApiKeyReadValue) & {cell(host:object):ApiKeyReadCell}
export function createApiKeyRead_win32_x64_287(ports: ConfigReadPorts): (() => ApiKeyReadValue) & {cell(host:object):ApiKeyReadCell}
