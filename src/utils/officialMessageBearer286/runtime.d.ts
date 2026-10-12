import type {AuthEnvironment} from '../officialAuthEnvironment/runtime.js'
export function createMessageBearer286(ports: {
  BS(options: {skipRetrievingKeyFromApiKeyHelper: true}): {key: string | null; source: string}
  a: Pick<AuthEnvironment, 'ANTHROPIC_AUTH_TOKEN'>
  kr(): boolean
  oUe(nonInteractive: boolean): Promise<string | null>
}): (headers: Record<string, string | undefined>, nonInteractive: boolean) => Promise<'ANTHROPIC_AUTH_TOKEN' | 'apiKeyHelper' | null>
