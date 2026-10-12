export type Decoder<T>={parse(value:unknown):T|undefined}
export type AuthDecoders={
  str():Decoder<string>;rawStr():Decoder<string>;bool():Decoder<boolean>;triBool():Decoder<boolean>
  int(options?:{digitsOnly?:boolean;min?:number;max?:number}):Decoder<number>
  enum(values:readonly string[]):Decoder<string>
}
export type AuthEnvironment={
  readonly CLAUDE_ENABLE_STREAM_WATCHDOG?:boolean
  readonly CLAUDE_ENABLE_BYTE_WATCHDOG_BEDROCK:boolean
  readonly CLAUDE_CODE_RETRY_WATCHDOG:boolean
  readonly CLAUDE_CODE_MAX_RETRIES?:number
  readonly CLAUDE_ENABLE_BYTE_WATCHDOG?:boolean
  readonly CLAUDE_STREAM_FIRST_BYTE_TIMEOUT_MS?:number
  readonly _CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL:boolean
  readonly ANTHROPIC_CUSTOM_HEADERS?:string
  readonly ANTHROPIC_API_KEY?:string
  readonly ANTHROPIC_AUTH_TOKEN?:string
  readonly ANTHROPIC_PROFILE?:string
  readonly ANTHROPIC_BASE_URL?:string
  readonly ANTHROPIC_UNIX_SOCKET?:string
  readonly CLAUDE_CODE_API_KEY_HELPER_TTL_MS?:number
  readonly CLAUDE_CODE_ENTRYPOINT?:string
  readonly CLAUDE_AGENT_SDK_CLIENT_APP?:string
  readonly CLAUDE_CODE_SESSION_KIND?:string
  readonly CLAUDE_CODE_GATEWAY_HINT_HEADERS?:boolean
  readonly CLAUDE_CODE_DESKTOP_APP_VERSION?:string
  readonly CLAUDE_CODE_ADDITIONAL_PROTECTION:boolean
  readonly CLAUDE_CODE_HOST_AUTH_ENV_VAR?:string
  readonly CLAUDE_CODE_OAUTH_TOKEN?:string
  readonly CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR?:string
  readonly CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST:boolean
  readonly CLAUDE_CODE_REMOTE:boolean
  readonly CLAUDE_CODE_GZIP_REQUEST_BODY_LEVEL?:number
  readonly CLAUDE_CODE_GZIP_REQUEST_BODY_BLOCKS?:number
  readonly CLAUDE_CODE_GZIP_REQUEST_BODIES?:boolean
  readonly CLAUDE_CODE_GZIP_CCR_REQUEST_BODIES?:boolean
  readonly NODE_EXTRA_CA_CERTS?:string
  readonly CLAUDE_CODE_ENVIRONMENT_KIND?:string
  readonly CLAUDE_CODE_OAUTH_401_WAIT_MS?:number
  readonly CLAUDE_CODE_AUTH_FAIL_EXIT_MS?:number
  readonly CLAUDE_CODE_REMOTE_SESSION_ID?:string
  readonly CLAUDE_CODE_REMOTE_SESSION_ORIGIN?:string
  readonly CLAUDE_CODE_SUBSCRIPTION_TYPE?:string
  readonly CLAUDE_CODE_RATE_LIMIT_TIER?:string
  readonly CLAUDE_CODE_OAUTH_SCOPES?:string
  readonly CLAUDE_BG_AUTH_SNAPSHOT_PATH?:string
  set(name:string,value:unknown):void
  unset(name:string):void
}
export function createAuthIntegerKernel():{integer:(value:unknown)=>number;withDefault:(value:unknown,fallback:number)=>number}
export function createAuthIntegerDefaultReader():(value:unknown,fallback:number)=>number
export function createAuthIntegerReader():(value:unknown)=>number
export function createAuthDecoders(ports:{rc:(value:unknown)=>number}):AuthDecoders
export function createAuthEnvironment(ports:{D:AuthDecoders;process:{env:NodeJS.ProcessEnv}}):AuthEnvironment
