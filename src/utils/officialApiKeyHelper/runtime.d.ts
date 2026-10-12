import type { ApiKeySelection } from '../officialApiKey/runtime.js'

export type HelperValidation =
  | {kind:'line_break'|'nul'|'whitespace';index:number}
  | {kind:'control_character'|'non_ascii';index:number;codePoint:number}
  | {kind:'too_long';length:number;maxLength:number}
export type ApiKeyHelperState287={cache:{value:string;timestamp:number}|null;inflight:{promise:Promise<string|null>;startedAt:number|null}|null;epoch:number;lastFailure:string|null}
export type ApiKeyHelperRuntime = {
  state(host:object):ApiKeyHelperState287
  fetch(nonInteractive:boolean):Promise<string|null>
  cached():string|null
  lastFailure():string|null
  clear():void
  elapsed():number
  pending():Promise<string|null>|null
  canPrefetch():boolean
  ttl():number
  validate(value:string,options:{maxLength:number}):HelperValidation|null
  describe(reason:HelperValidation,stats:{length:number;lineCount:number}):string
  stats(value:string):{length:number;lineCount:number}
}
export function createApiKeyHelper(ports:{
  BS(options:{skipRetrievingKeyFromApiKeyHelper:true}):ApiKeySelection
  Bn():boolean
  Io():string|null
  J(text:string):unknown
  QS():boolean
  a:{CLAUDE_CODE_API_KEY_HELPER_TTL_MS?:number;CLAUDE_CODE_REMOTE?:boolean;CLAUDE_CODE_ENTRYPOINT?:string;ANTHROPIC_AUTH_TOKEN?:string}
  fe:{red(text:string):string}
  ge(source:string):{apiKeyHelper?:string}|null|undefined
  i(event:string,metadata:Record<string,never>):void
  ih():string|undefined
  j():{host:object}
  ns():boolean
  s8(message:string,error:Error):void
  t(message:string,options?:{level:'error'}):void
  xC(command:string,options:{cwd?:string;timeout:600000;reject:false;useToolMemoryCgroup:false}):Promise<{failed?:boolean;timedOut?:boolean;exitCode?:number;stdout?:string;stderr?:string}>
  y2:{getInstance():{startAuthentication():void;setError(error:string):void;endAuthentication(success:boolean):void}}
}):ApiKeyHelperRuntime
export function createHelperIntegerParser():{parse(value:string|undefined):number|undefined}
