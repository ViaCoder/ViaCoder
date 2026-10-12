import type Anthropic from '@anthropic-ai/sdk'
import type {ClientOptions} from '@anthropic-ai/sdk'
import type {authEnvironment} from '../../../utils/authEnvironment.js'
import type {GatewayCredential287} from '../../remoteManagedSettings/officialGatewayRefresh287/native.js'
export interface GatewayMessagesPorts287 {
 environment: Partial<Pick<typeof authEnvironment,'CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST'|'ANTHROPIC_CUSTOM_HEADERS'|'CLAUDE_CODE_GATEWAY_HINT_HEADERS'>>
 provider(): string
 gatewayAuth(): GatewayCredential287|null|undefined
 refreshGateway(): Promise<void>
 gatewayFromEnvironment(): boolean
 sdkConstructor: new(options: ClientOptions) => Anthropic
 debugEnabled(): boolean
 firstPartyRequest(): boolean
 featureValue(name: string, fallback: boolean): boolean
 execution(): {host: {credentialSlots: {gatewayAuth(): GatewayCredential287|null|undefined; gatewayServerProcess(): boolean}}}
}
export interface GatewayMessages287 {
 authorizationPartition(headers: Record<string,string|undefined>): {value: string|undefined; rest: Record<string,string|undefined>}
 gatewayHeaders(): Record<string,undefined>
 expired(): boolean
 hostManagedError(provider: string, hint?: string): Error
 hintGate(): boolean|undefined
 preflight(): void
 construct(options: ClientOptions): Promise<Anthropic>
}
export declare function createGatewayMessages287(ports: GatewayMessagesPorts287): GatewayMessages287
