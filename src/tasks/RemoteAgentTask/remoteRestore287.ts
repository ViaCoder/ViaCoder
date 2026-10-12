import type {TaskContext} from '../../Task.js'
import {logForDebugging} from '../../utils/debug.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {startRemoteSessionPollingC} from './RemoteAgentTask.js'
import {createRemoteAgentRestoreNative287, type RemoteRestoreInput287} from './remoteRestoreNative287.js'

const bindings = {
  dPo: ['chunk-mphp7acd.js', 'dPo'], O7: ['chunk-mphp7acd.js', 'O7'],
  Rx: ['chunk-nankzm0s.js', 'Rx'], em: ['chunk-y1ndyy9p.js', 'em'],
  ZRe: ['chunk-pqgqke0w.js', 'ZRe'], O5: ['chunk-mphp7acd.js', 'O5'],
  $6o: ['chunk-mphp7acd.js', '$6o'], Gln: ['chunk-mphp7acd.js', 'Gln'],
  TYe: ['chunk-p54b66vv.js', 'TYe'], Br: ['chunk-9d2ykxmy.js', 'Br'],
} as const

/** Whole qMt/V6o adopts the actual task registry and supplied storage/credentials.
 * Existing C log projection and polling remain on that same task and AppStore. */
export async function restoreRemoteAgentTasks287(input: RemoteRestoreInput287, context: TaskContext): Promise<void> {
  const owner = getOriginalModsLifecycle287()
  const ports = new Proxy<Record<string, unknown>>({
    t: logForDebugging,
    y4t: (id: string) => startRemoteSessionPollingC(id, {...context, abortController: input.abortController}),
  }, {
    has: (target, key) => typeof key === 'string' && (Object.hasOwn(target, key) || Object.hasOwn(bindings, key)),
    get: (target, key) => {
      if (key === Symbol.unscopables) return undefined
      if (Object.hasOwn(target, key)) return Reflect.get(target, key)
      const [file, name] = bindings[key as keyof typeof bindings]
      return owner.clearLifecycleSource287(file, name)
    },
  })
  await createRemoteAgentRestoreNative287(ports)({...input, taskRegistry: {
    register: task => input.taskRegistry.register({...task, log: []}),
  }})
}
