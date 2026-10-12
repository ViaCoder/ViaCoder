import {authEnvironment} from '../authEnvironment.js'
import {filesCredentialSlots} from '../../vendor/official-files-api/slots.js'
import {createOfficialProviderSelection287} from './officialProviderSelection287/native.js'

// Original source decision and original credential owner. Each read remains lazy.
const nativeProvider287 = createOfficialProviderSelection287({
  environment: () => authEnvironment,
  gatewayAuth: () => filesCredentialSlots.gatewayAuth(),
  gatewayServerProcess: () => filesCredentialSlots.gatewayServerProcess(),
  gatewayRequiredByHostPolicy: () => filesCredentialSlots.gatewayRequiredByHostPolicy(),
})
export function getNativeAPIProvider287() { return nativeProvider287.provider() }
