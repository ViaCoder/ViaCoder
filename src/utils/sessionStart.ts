import type {HookResultMessage} from '../types/message.js'
import type {runSessionStartHooks287} from '../commands/clear/lifecycle287.js'

export type SessionStartHooksOptions = NonNullable<Parameters<typeof runSessionStartHooks287>[2]>
function source287(): typeof import('../commands/clear/lifecycle287.js') {
  return require('../commands/clear/lifecycle287.js') as typeof import('../commands/clear/lifecycle287.js')
}
function execution287() {
  return (require('../services/context/execution287.js') as typeof import('../services/context/execution287.js')).getExecutionSession287()
}

/** Original PIr consumes the existing bie/Dwo side channel, exactly once. */
export function takeInitialUserMessage(): string | undefined {
  const owner = (require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearLifecycleSource287('chunk-mphp7acd.js', 'bie')
  if (typeof owner !== 'function') throw Error('Original startup hook owner missing')
  const bie = owner as () => {pendingInitialUserMessage?: string}
  function PIr(){let e=bie(),n=e.pendingInitialUserMessage;return e.pendingInitialUserMessage=void 0,n}
  return PIr()
}

/** Complete original H5, including resumed context, blocking/cancel, reload and watcher handling. */
export function processSessionStartHooks(
  source: Parameters<typeof runSessionStartHooks287>[1],
  options: SessionStartHooksOptions = {},
): Promise<HookResultMessage[]> {
  return source287().runSessionStartHooks287(execution287(), source, options)
}

/** Complete original $xo; no separate plugin loader or setup-hook loop. */
export function processSetupHooks(
  trigger: 'init' | 'maintenance',
  options: {forceSyncExecution?: boolean; storageV5?: unknown; credentials?: unknown} = {},
): Promise<HookResultMessage[]> {
  const lifecycle = source287()
  const session = execution287()
  return lifecycle.runWithCompactLifecycleContext287({session}, () => {
    const setup = (require('./hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('./hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearLifecycleSource287('chunk-mphp7acd.js', '$xo')
    if (typeof setup !== 'function') throw Error('Original setup hook entry missing')
    return setup(session, trigger, options)
  })
}

