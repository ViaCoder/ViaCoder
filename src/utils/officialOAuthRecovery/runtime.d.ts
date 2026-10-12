import type { Stats, PathLike } from 'node:fs'
import type { AuthEnvironment } from '../officialAuthEnvironment/runtime.js'
import type { CredentialStore, ModernSecureStorage } from '../officialSecureStorage/runtime.js'
import type { CredentialStateCell } from '../officialOAuthPersistence/runtime.js'
import type { OAuthTokens } from '../../services/oauth/types.js'
import type { OAuthRefreshOptions, OAuthRefreshOutcome } from '../officialOAuthEngine/runtime.js'
export type OAuth401Options = {usesLoginOffFirstParty?: boolean;onForcedRefreshOutcome?: (outcome: OAuthRefreshOutcome) => void}
export type OAuth401Runtime = {
 recover(token: string, credentials?: CredentialStore, storageV5?: unknown, options?: OAuth401Options): Promise<boolean>
 direct(token: string, credentials?: CredentialStore, storageV5?: unknown, optedIn?: boolean, callback?: (outcome: OAuthRefreshOutcome) => void): Promise<boolean>
 waitForRotation(options: {failedAccessToken: string;timeoutMs: number;pollMs?: number;readToken?(): string | undefined;sleeper?(ms: number): Promise<void>}): Promise<boolean>
 waitBudget(): number
 failureDecision(options: {recovered: boolean;nowMs?: number;isRemoteChild?: boolean;thresholdMs?: number}): 'continue' | 'exit'
 remote(): boolean
 state: {of(host: object): {firstUnrecoveredAtMs: number | null}}
}
type Debug = (message: string, options?: {level: 'error' | 'debug' | 'warn'}) => void
export function createOAuth401Recovery(ports: {
 Bn(): boolean;F(): boolean;Fa(credentials?: CredentialStore): Promise<OAuthTokens | null>;GG(): boolean
 G_t(scopes: string[]): void;Hi(options: OAuthRefreshOptions): Promise<boolean>;Jde: CredentialStateCell;KT(): void
 Spe(): (() => Promise<string | null>) | null | undefined;Z(ms: number): Promise<void>;_n(): void;a: AuthEnvironment
 d(error: unknown): void;d0(): string | null | undefined;i(name: string,metadata: Record<string,unknown>): void
 iU(token: string): void;j(): {host: object};m(feature: string,reason: string): void
 m7n(credentials: CredentialStore): Promise<string | null | undefined>;o9(options: OAuthRefreshOptions): Promise<OAuthRefreshOutcome>
 r9(): boolean;t: Debug;y(feature: string): void;zn(): ModernSecureStorage
}): OAuth401Runtime
export type BoundedReadOptions = {maxBytes: number;symlinkAtPath?: 'follow' | 'refuse';regularFileOnly?: boolean}
export type OAuthDescriptorReaders = {bounded(path: string,options: BoundedReadOptions): string;inherited(fd: number,options: {maxBytes: number}): string;isSocket(fd: number): boolean}
export function createOAuthDescriptorReaders(ports: {
 D(fd: number): Stats;Hm(strings: TemplateStringsArray, ...values: unknown[]): Disposable
 L(fd: number): void;P: ReturnType<typeof createOAuthDescriptorError>;R(path: PathLike,flags: string | number): number
 de(fd: number,buffer: Uint8Array,offset: number,length: number,position: null): number;w: {O_RDONLY: number;O_NOFOLLOW: number;O_NONBLOCK: number}
}): OAuthDescriptorReaders
export function createOAuthDescriptorError(): new (message: string,telemetryMessage?: string,errorClass?: string) => Error
export type OAuthHandoffRuntime = {
 oauth(credentials: CredentialStore): Promise<string | null | undefined>
 consume(credentials: CredentialStore): Promise<void>
 descriptor(credentials: CredentialStore): Promise<string | null | undefined>
 read(options: {envVar: string;wellKnownPath: string;readPath?: string;label: string;fileLabel?: string;getCached(): string | null | undefined;setCached(token: string | null): void;credentials: CredentialStore;skipInReviewOrigin?: boolean}): Promise<string | null | undefined>
}
export function createOAuthHandoff(ports: {
 G_t(scopes: string[]): void;JJn: OAuthDescriptorReaders['isSocket'];KEn(name: string): void;O(): string
 W_t(value: boolean): void;YEn(token: string): void;a: AuthEnvironment;bj(): string | null | undefined
 fVo: OAuthDescriptorReaders['inherited'];iU(token: string): void;l(error: unknown): string;t: Debug
 t2e: OAuthDescriptorReaders['bounded'];v(error: unknown): string | undefined
}): OAuthHandoffRuntime
