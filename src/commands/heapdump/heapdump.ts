import type { ToolUseContext } from '../../Tool.js'
import { getHeapDumpFunctions287 } from '../../utils/officialHeapDump287/runtime.js'

export async function call(
  args: string,
  context: Pick<ToolUseContext, 'session'>,
): Promise<{ type: 'text'; value: string }> {
  return getHeapDumpFunctions287().call(args, context)
}
