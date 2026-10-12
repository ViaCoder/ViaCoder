import {getClientDataHooks286, getGlobalConfig} from './config.js'
import {createOfficialClientDataReader286} from './officialClientData286/data.runtime.js'

// Preserve the actual ConfigState and config reader. The native closure calls
// these ports lazily, after the read gate and key-getter availability checks.
const reader = createOfficialClientDataReader286({ce: getGlobalConfig, oe: getClientDataHooks286})

export function getClientData(model?: string): Record<string, unknown> | null {
  return reader.Td(model)
}

/** Same reader and gate/slot owner; preserve the server-associated model tag. */
export const getClientDataRecord = reader.zYn
