import * as React from 'react'
import type {LocalJSXCommandContext} from '../../commands.js'
import {ContextVisualization} from '../../components/ContextVisualization.js'
import type {LocalJSXCommandOnDone} from '../../types/command.js'
import {callOriginalInteractiveContext287} from '../../utils/contextAnalysis287.js'
import {renderToAnsiString} from '../../utils/staticRender.js'

export async function call(onDone: LocalJSXCommandOnDone, context: LocalJSXCommandContext, args = ''): Promise<React.ReactNode> {
  // Local shared-session viewers query the existing owner; they must not
  // calculate from the viewer's history or create another request executor.
  const shared = context.commandRuntime?.sharedSession
  if (shared) {
    if (!shared.contextUsage) throw new Error('Shared owner context is not available')
    const data = await shared.contextUsage(context.abortController.signal)
    onDone(await renderToAnsiString(<ContextVisualization data={data} />))
    return null
  }
  // Complete original In owns analysis, taint checks, fullscreen/all detail,
  // original rendering and the system display + metadata result contract.
  return callOriginalInteractiveContext287(onDone, context, args)
}
