import type axios from 'axios'
import type {z} from 'zod'
import type {AuthEnvironment} from '../officialAuthEnvironment/runtime.js'
import type {GlobalConfig} from '../config.js'
import type {OAuthProfileResponse,OAuthTokens} from '../../services/oauth/types.js'
import type {ExchangeCodeForTokensOptions,RefreshOAuthTokenOptions,AuthorizeOptions} from '../../services/oauth/client.js'
export type OAuthProfileInfo = {
 subscriptionType: string | null;rateLimitTier: string | null;seatTier: string | null
 hasExtraUsageEnabled: boolean | null;billingType: string | null
 ccOnboardingFlags: Record<string,unknown>;claudeCodeTrialEndsAt: string | null;claudeCodeTrialDurationDays: number | null
 displayName?: string;fullName?: string;accountCreatedAt?: string;subscriptionCreatedAt?: string;rawProfile?: OAuthProfileResponse
}
export type OAuthClientRuntime = {
 authorize(options: AuthorizeOptions): string
 exchange(code: string,options: ExchangeCodeForTokensOptions): Promise<import('../../services/oauth/types.js').OAuthTokenExchangeResponse>
 refresh(token: string,options?: RefreshOAuthTokenOptions): Promise<OAuthTokens>
 roles(token: string,storageV5?: unknown): Promise<void>
 profile(token: string): Promise<OAuthProfileInfo>
 tokenProfile(token: string): Promise<OAuthProfileResponse | undefined>
 keyProfile(): Promise<OAuthProfileResponse | undefined>
 planLabel(profile?: OAuthProfileResponse): string | null
 validatePlan(profile: {organization?:{plan_display_name?:unknown}} | undefined): string | null
 scopes(scope: unknown): string[]
 refreshExpiry(seconds: unknown,defaultOnAbsent: boolean): number | undefined
 invalidScope(error: unknown): boolean
}
export type OAuthTransportClassifier = {
 expected(error: unknown,additional?: (error: unknown)=>boolean): boolean
 classify(error: unknown): {kind:'auth'|'timeout'|'network'|'http'|'other';status?:number;message:string}
 code(error: unknown): string
}
export function createOAuthTransportClassifier(ports: {Sn<T>(v:T):T;_<T>(v:T):T;l(error:unknown):string}): OAuthTransportClassifier
export function createOAuthClient(ports: {
 $_<T>(value:T):T;AJ():string | null;G2t(value:unknown):{url:string} | null;GG():boolean;L5r():string[];MXe:string;PC:string;Po():string
 Sr(value:unknown):string;Te(updater:(config:GlobalConfig)=>GlobalConfig,storageV5?:unknown):Promise<void>;Uu:string;Vd(error:unknown):Record<string,string>
 Xs:OAuthTransportClassifier['classify'];_<T>(value:T):T;a:AuthEnvironment;bj():string | null | undefined;c<T>(value:T):T;ce():GlobalConfig
 cn:typeof import('../../constants/oauth.js').getOauthConfig;cu:OAuthTransportClassifier['expected'];d(error:unknown):void;de:typeof z.string
 f<T>(factory:()=>T):()=>T;hJe:string;ht:Pick<typeof axios,'get'|'post'|'isAxiosError'>;i(name:string,metadata:Record<string,unknown>):void
 kzt:OAuthTransportClassifier['code'];m(feature:string,reason:string):void;me(value:unknown):unknown;p(feature:string,reason:string):void
 pn():OAuthTokens | null;r9():boolean;t(message:string,options?:{level:'error'|'warn'|'debug'}):void;ut:typeof z.object;y(feature:string):void;yJe():string[]
}): OAuthClientRuntime
