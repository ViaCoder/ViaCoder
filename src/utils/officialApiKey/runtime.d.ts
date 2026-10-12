export type ApiKeySelection = {
  key: string | null
  source: 'ANTHROPIC_API_KEY' | 'apiKeyHelper' | '/login managed key' | 'none'
}
import type {AuthEnvironment} from '../officialAuthEnvironment/runtime.js'
type HelperSettings = {apiKeyHelper?:string} | null | undefined
export function createApiKeySelection(ports: {
  Gn():boolean; JI():string|null; Nc():boolean; PWt():boolean
  S4n():string|null; Zn():HelperSettings; a:NodeJS.ProcessEnv|AuthEnvironment
  ce():{customApiKeyResponses?:{approved?:unknown;rejected?:unknown}}
  fo():boolean; ge(source:string):HelperSettings
  mJ():string|null; w4n():ApiKeySelection|null
}): {
  select(options?:{skipRetrievingKeyFromApiKeyHelper?:boolean}):ApiKeySelection
  helper():string|undefined
  normalize(key:string):string
  approval(normalizedKey:string):'approved'|'rejected'|'new'
}
