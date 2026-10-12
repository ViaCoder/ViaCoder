import type * as fs from 'node:fs'
import type * as path from 'node:path'
import type * as os from 'node:os'
import type { OAuthProcessRuntime } from '../officialOAuthLease/runtime.js'

export type OAuthNativePlatform = 'darwin-arm64' | 'darwin-x64' | 'linux-arm64' | 'linux-x64' | 'win32-arm64' | 'win32-x64'
export type OAuthPlatformPorts = {
  platform(): string
  host(): {host: object}
  exec(file: string, args: string[], options: {timeout: number; env?: NodeJS.ProcessEnv; extendEnv?: boolean}): Promise<{code: number; stdout: string}>
  errno(error: unknown): string | undefined
  fs(): {readFile(path: string, options: {encoding: 'utf8'}): Promise<string>; readlink(path: string): Promise<string>; readdir(path: string): Promise<fs.Dirent[]>}
  path: typeof path
  os: Pick<typeof os, 'hostname' | 'homedir'>
  fsSync: {readlinkSync(path: string): string; realpathSync(path: string): string}
  fsPromises: {readFile(path: string, encoding: 'utf8'): Promise<string>; readlink(path: string): Promise<string>}
  requireModule(name: string): unknown
  debug(message: string): void
}
export function createOAuthPlatformProbes(platform: OAuthNativePlatform, ports: OAuthPlatformPorts): OAuthProcessRuntime & {identity: {domain(): Promise<string>; space(): string}}

export function selectOAuthNativePlatform(platform: string, arch: string): OAuthNativePlatform
