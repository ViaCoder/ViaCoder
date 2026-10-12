import {createHash} from 'node:crypto'
import {isAbsolute,resolve} from 'node:path'

// Serialization only. Commander in main remains the parser/validator; the
// canonical CLI worker parses these same public options again. No tool/model
// implementation or setting precedence is reimplemented here.
const fields = {
 model:'string',permissionMode:'string',dangerouslySkipPermissions:'boolean',allowDangerouslySkipPermissions:'boolean',
 tools:'array',allowedTools:'array',disallowedTools:'array',mcpConfig:'array',strictMcpConfig:'boolean',addDir:'array',
 agent:'string',agents:'string',settings:'string',settingSources:'string',pluginDir:'array',
 systemPrompt:'string',systemPromptFile:'string',appendSystemPrompt:'string',appendSystemPromptFile:'string',
 name:'string',effort:'string',thinking:'string',thinkingDisplay:'string',forwardSubagentText:'boolean',autocompact:'numberOrString',promptSuggestions:'boolean',
 betas:'array',fallbackModel:'string',disableSlashCommands:'boolean',chrome:'boolean',verbose:'boolean',
} as const
const flags:Record<string,string>={allowedTools:'--allowed-tools',disallowedTools:'--disallowed-tools'}
const viewerOnly=new Set(['debug','debugToStderr','verbose','prefill'])
const navigation=new Set(['resume','continue','forkSession'])
// Non-secret execution overrides; authentication/endpoint equivalence is
// independently required by serveDiscovery.sharedConfigKey.
export const CHECKPOINT_ENV = ['CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING',
 'CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING'] as const
export const STARTUP_ENV=['ANTHROPIC_MODEL','ANTHROPIC_SMALL_FAST_MODEL','ANTHROPIC_DEFAULT_OPUS_MODEL',
 'ANTHROPIC_DEFAULT_SONNET_MODEL','ANTHROPIC_DEFAULT_HAIKU_MODEL','CLAUDE_CODE_EFFORT_LEVEL',
 'CLAUDE_CODE_MAX_OUTPUT_TOKENS','MAX_THINKING_TOKENS','CLAUDE_AUTOCOMPACT_PCT_OVERRIDE',...CHECKPOINT_ENV] as const
export type ServeStartupOptions={values:Record<string,string|number|boolean|string[]>;env:Record<string,string>}
export function validateStartupOptions(value:unknown):ServeStartupOptions {
 if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid shared startup options')
 const data=value as Record<string,unknown>
 if(Object.keys(data).some(key=>key!=='values'&&key!=='env'))throw Error('Invalid shared startup options')
 const values=data.values,env=data.env
 if(!values||typeof values!=='object'||Array.isArray(values)||!env||typeof env!=='object'||Array.isArray(env))throw Error('Invalid shared startup options')
 for(const [key,v] of Object.entries(values)){
  const kind=fields[key as keyof typeof fields]
  if(!kind || !(kind==='array'?Array.isArray(v)&&v.every(x=>typeof x==='string'):
    kind==='numberOrString'?typeof v==='string'||typeof v==='number'&&Number.isFinite(v):typeof v===kind))throw Error(`Unsupported shared startup option: ${key}`)
 }
 for(const [key,v] of Object.entries(env))if(!STARTUP_ENV.includes(key as typeof STARTUP_ENV[number])||typeof v!=='string')throw Error('Invalid shared execution environment')
 return {values:{...values} as ServeStartupOptions['values'],env:{...env} as Record<string,string>}
}
export function startupKey(options?:ServeStartupOptions,environment:NodeJS.ProcessEnv=process.env):string {
 // The worker inherits these defaults even when a Web launch supplies no overrides.
 // Compare effective execution settings, not whether a frontend serialized them.
 const env:Record<string,string>={}
 for(const key of STARTUP_ENV)if(environment[key]!==undefined)env[key]=environment[key]!
 Object.assign(env,options?.env)
 return createHash('sha256').update(JSON.stringify([Object.entries(options?.values??{}).sort(),Object.entries(env).sort()])).digest('hex')
}
export function startupArguments(options?:ServeStartupOptions):string[]{
 if(!options)return []
 validateStartupOptions(options)
 return Object.entries(options.values).flatMap(([key,value])=>{
  const flag=flags[key]??'--'+key.replace(/[A-Z]/g,letter=>'-'+letter.toLowerCase())
  if(key==='chrome')return [value?'--chrome':'--no-chrome']
  if(key==='promptSuggestions')return [`${flag}=${String(value)}`]
  if(typeof value==='boolean')return value?[flag]:[]
  if(Array.isArray(value)){
    // Commander variadic options require a value. An empty bare flag can
    // consume the next option as a tool rule; only --tools has explicit empty semantics.
    if(!value.length)return key==='tools'?[flag,'']:[]
    return key==='pluginDir'?value.flatMap(v=>[flag,v]):[flag,...value]
  }
  return [`${flag}=${String(value)}`]
 })
}
export function parsedSharedStartup(options:Record<string,unknown>,source:(name:string)=>string|undefined,cwd:string,
 environment:NodeJS.ProcessEnv=process.env):{startup:ServeStartupOptions;unsupported:string[]}{
 const values:ServeStartupOptions['values']={},unsupported:string[]=[]
 for(const [key,value] of Object.entries(options)){
  if(source(key)!=='cli'||navigation.has(key))continue
  if(!(key in fields)){if(!viewerOnly.has(key))unsupported.push(key);continue}
  values[key]=value as ServeStartupOptions['values'][string]
 }
 // File-valued arguments retain the caller's interpretation even when resume
 // restores another saved project. JSON-valued config arguments stay JSON.
 const absolute=(v:string)=>isAbsolute(v)?v:resolve(cwd,v)
 for(const key of ['systemPromptFile','appendSystemPromptFile'])if(typeof values[key]==='string')values[key]=absolute(values[key])
 if(typeof values.settings==='string'&&!values.settings.trim().startsWith('{'))values.settings=absolute(values.settings)
 for(const key of ['pluginDir','addDir','mcpConfig'])if(Array.isArray(values[key]))values[key]=(values[key] as string[]).map(v=>key==='mcpConfig'&&v.trim().startsWith('{')?v:absolute(v))
 const env:Record<string,string>={}
 for(const key of STARTUP_ENV)if(environment[key]!==undefined)env[key]=environment[key]!
 const startup=validateStartupOptions({values,env})
 return {startup,unsupported}
}
