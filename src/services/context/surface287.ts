import {createSurfaceIdentity287} from './officialSurfaceIdentity287/native.js'
import {getExecutionSession287} from './execution287.js'
import {authEnvironment} from '../../utils/authEnvironment.js'

// Original C.of(U().host): one host registry, also used by prompt consumers.
export const surfaceIdentity287 = createSurfaceIdentity287({
  execution: getExecutionSession287,
  environment: authEnvironment,
})
export const getSurfaceIdentity287 = surfaceIdentity287.surface

// Original Vr/sc from the same host registry factory, never the remote SDK bridge.
export const getSurfaceBridgeRuntime287=surfaceIdentity287.bridgeRuntime
export const getSurfaceReplHandle287=surfaceIdentity287.replHandle
