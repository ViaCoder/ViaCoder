import type {AuthEnvironment} from '../officialAuthEnvironment/runtime.js'
import type {OAuthDescriptorReaders} from '../officialOAuthRecovery/runtime.js'
export type OAuthSyncDescriptor = {
 oauth(): string | null
 read(options: {envVar: string;wellKnownPath: string;readPath?: string;label: string;fileLabel?: string;getCached(): string | null | undefined;setCached(value: string | null): void;skipInReviewOrigin?: boolean}): string | null
 persist(path: string,token: string,label: string,options?: {skipInReviewOrigin?: boolean}): void
 wellKnown(path: string,label: string): string | null
 probe(path: string,label: string): {token: string | null;miss?: 'empty' | 'enoent' | 'eacces' | 'other'}
 consume(): void
 path: string
 apiKeyPath: string
}
export function createOAuthSyncDescriptor(ports: {
 G(error: unknown): boolean;G_t(scopes: string[]): void
 H(path: string,options: {recursive: true;mode: number}): unknown;JJn: OAuthDescriptorReaders['isSocket'];KEn(name: string): void
 L(path: string): Promise<unknown>;N(path: string,text: string,options: {encoding: 'utf8';mode: number}): void;O(): string
 W_t(value: boolean): void;YEn(token: string): void;a: AuthEnvironment;bj(): string | null | undefined
 fVo: OAuthDescriptorReaders['inherited'];iU(token: string | null): void;l(error: unknown): string
 t(message: string,options?: {level:'error'|'debug'|'warn'}): void;t2e: OAuthDescriptorReaders['bounded'];v(error: unknown): string | undefined
}): OAuthSyncDescriptor
