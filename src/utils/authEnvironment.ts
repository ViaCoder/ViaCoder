import {createAuthIntegerReader,createAuthDecoders} from './officialAuthEnvironment/runtime.js'
import {createTypedEnvironment287} from './officialTypedEnvironment287/native.js'

// Original typed getters read the live process environment lazily, caching
// each parsed value only until its raw value changes. No credentials are read
// at module import, and false flags remain false instead of truthy strings.
export const authEnvironment=createTypedEnvironment287({
  D:createAuthDecoders({rc:createAuthIntegerReader()}),process,parent:{},
})
