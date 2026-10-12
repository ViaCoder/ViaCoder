import {createExtensionsConfigAccessors287,type InlineExtensionsConfig287} from './officialExtensionsConfig287/native.js'
// Source accessors are stateless. Resolve the real execution scope at call time,
// including before any public CLI startup writer has run; no STATE fallback.
export const inlineExtensionsConfig287=createExtensionsConfigAccessors287({execution:()=>{
 const session=(require('./execution287.js') as typeof import('./execution287.js')).getExecutionSession287()
 return session as unknown as {host:{extensionsConfig:InlineExtensionsConfig287}}
}})
