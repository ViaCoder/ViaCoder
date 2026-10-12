import type { LocalJSXCommandContext } from '../../types/command.js'
import type { AutoCompactHost } from '../autocompact/autocompact.js'
import type { ConfigCommandHost } from '../config/config-noninteractive.js'
import type { McpCommandHost } from '../mcp/mcp-noninteractive.js'
import type { ReviewHost } from '../review/ultrareview-noninteractive.js'
import type { ModelSwitchHost } from './modelSwitch.js'

/** Explicit integration boundary; these are real host services, never default-allow mocks. */
export type CommandRuntime = ModelSwitchHost & {
  sharedSession?: import('../../server/sharedSessionCommandHost.js').SharedSessionCommandHost
  autoCompact?: AutoCompactHost
  config?: ConfigCommandHost
  mcp?: McpCommandHost
  ultrareview?: ReviewHost
}
export type CommandRuntimeContext = LocalJSXCommandContext & { commandRuntime?: CommandRuntime }
