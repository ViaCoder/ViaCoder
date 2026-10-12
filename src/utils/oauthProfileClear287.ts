import {readFile,unlink} from 'node:fs/promises'
import {dirname,join} from 'node:path'
import {z} from 'zod'
import {authEnvironment} from './authEnvironment.js'
import {logForDebugging} from './debug.js'
import {getWifAttribution286,resetWIFCredentialState} from './httpWorkloadIdentity.js'
import {withWifCredentialLock286} from './officialHttpWif286/runtime.js'
import {createOAuthProfileClear287} from './officialOAuthProfileClear287/runtime.js'
import {createOAuthSchemaLazy} from './officialOAuthLease/runtime.js'
import {jsonParse} from './slowOperations.js'
import {clearBootstrapWorkloadIdentity} from './workloadIdentity.js'

// Reuse the actual WIF selector, its primed files and its existing lock/state.
// The legacy bootstrap reader is still a real caller, so invalidate it too.
export const oauthProfileClear287=createOAuthProfileClear287({
 configDir:()=>getWifAttribution286().SM(),defaultProfile:dir=>getWifAttribution286().MSe(dir),
 environment:authEnvironment,readFile,unlink,join,dirname,parse:jsonParse,
 schemaLazy:createOAuthSchemaLazy().lazy,looseObject:z.looseObject,string:z.string,
 lockDirectory:withWifCredentialLock286,
 reset(){resetWIFCredentialState();clearBootstrapWorkloadIdentity()},
 debug:logForDebugging,
})
