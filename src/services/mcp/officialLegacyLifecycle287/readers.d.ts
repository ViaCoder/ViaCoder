import type {ConnectedMCPServer} from '../types.js'
import type {ListChangedClientModule287} from '../officialListChanged287/native.js'
import type {LegacyMcpLifecycleRoots287} from './native.js'
import type {McpConnected287} from '../officialConnected287/native.js'
export function readLegacyMcpLifecycleClient287():ListChangedClientModule287<ConnectedMCPServer>&LegacyMcpLifecycleRoots287&{clearServerCache:McpConnected287['clearServerLegacy']}
