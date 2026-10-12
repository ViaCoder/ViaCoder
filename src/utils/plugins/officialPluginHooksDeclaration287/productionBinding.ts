import type { z } from 'zod/v4'
import type { HooksSettings } from '../../settings/types.js'
import { logForDebugging } from '../../debug.js'
import { isStorageV5PinnedOn } from '../../secureStorage/storageV5.js'
import { createPluginHooksDeclaration287 } from './native.js'

let runtime: ReturnType<typeof createPluginHooksDeclaration287> | undefined

export function getPluginHooksDeclaration287() {
  return runtime ??= createPluginHooksDeclaration287({
    debug: logForDebugging,
    storageV5Enabled: isStorageV5PinnedOn,
    moduleNotice: (plugin: string, text: string) => {
      const notice=(require('../../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().registration.Jye
      if(typeof notice!=='function')throw Error('Original Mods declaration notice is not callable')
      notice(plugin,text)
    },
  })
}

export function originalPluginHooksSchema287() {
  return getPluginHooksDeclaration287().schema() as z.ZodType<{
    $schema?: string
    description?: string
    hooks?: HooksSettings
    modules?: string[]
  }>
}
