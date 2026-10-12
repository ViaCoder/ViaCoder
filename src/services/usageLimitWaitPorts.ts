import {readFile, stat} from 'node:fs/promises'
import {getFlagSettingsInline, getIsNonInteractiveSession, getIsRemoteMode, onSessionSwitch} from '../bootstrap/state.js'
import {isClaudeAISubscriber, getOauthAccountInfo} from '../utils/auth.js'
import {getMainLoopModel, getUserSpecifiedModelSetting, parseUserSpecifiedModel, getPublicModelDisplayName} from '../utils/model/model.js'
import {getCatalogEntry, getCatalogModelId} from '../utils/model/catalog.js'
import {getEnabledSettingSources} from '../utils/settings/constants.js'
import {getSettingsFilePathForSource, getSettingsForSource} from '../utils/settings/settings.js'
import {subscribe as subscribeSettings} from '../utils/settings/changeDetector.js'
import {safeParseJSON} from '../utils/json.js'
import {getCommandQueue, enqueue, removeByFilter} from '../utils/messageQueueManager.js'
import type {QueuedCommand} from '../types/textInputTypes.js'
import {currentLimits, probeMainModelQuota} from './claudeAiLimits.js'
import {quotaRejected} from './usageLimitEvents.js'
import {getFeatureValue_CACHED_MAY_BE_STALE as flag} from './analytics/growthbook.js'

// Raw presence is deliberately separate from schema-valid effective value.
// Invalid/unknown/false keys must not accidentally opt a user into automation.
export async function usageLimitKeyPresence(key: string): Promise<'present'|'absent'|'unknowable'> {
  let present = false, unknowable = false
  for (const source of getEnabledSettingSources()) {
    const counts = source !== 'policySettings'
    const inline = source === 'flagSettings' ? getFlagSettingsInline() : undefined
    if (counts && inline && key in inline) present = true
    const path = getSettingsFilePathForSource(source)
    if (!path) continue
    try {
      if ((await stat(path)).size > 2 * 1024 * 1024) {unknowable = true; continue}
      const raw = await readFile(path, 'utf8')
      if (!raw.trim()) continue
      const parsed = safeParseJSON(raw, false)
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) unknowable = true
      else if (counts && key in parsed) present = true
    } catch (error) {if ((error as NodeJS.ErrnoException).code !== 'ENOENT') unknowable = true}
  }
  return unknowable ? 'unknowable' : present ? 'present' : 'absent'
}
export function isUsageLimitHumanCommand(command: QueuedCommand): boolean {
  const mode: string = command.mode
  const origin: {kind: string} | undefined = command.origin
  return mode !== 'task-notification' && mode !== 'poll-event' && !command.isMeta &&
    !(command as QueuedCommand & {skipAttachments?: boolean}).skipAttachments &&
    (origin === undefined || origin.kind === 'human' || origin.kind === 'auto-continuation')
}
export function createUsageLimitPorts() {
  const lifecycle = {mounted: false, remote: false, background: false}
  const draining = new Set<QueuedCommand>()
  return {
    lifecycle, draining,
    agentId: () => undefined,
    interactive: () => lifecycle.mounted && !getIsNonInteractiveSession(),
    remote: () => lifecycle.remote || getIsRemoteMode(),
    background: () => lifecycle.background,
    autoArmSuppressed: () => lifecycle.remote || lifecycle.background,
    subscriber: isClaudeAISubscriber, account: getOauthAccountInfo,
    model: getMainLoopModel, modelSetting: () => getUserSpecifiedModelSetting() ?? getMainLoopModel(),
    modelIdentity: getCatalogModelId, parseModel: parseUserSpecifiedModel,
    isOpus: (model: string) => getCatalogEntry(model)?.family === 'opus',
    isSonnet: (model: string) => getCatalogEntry(model)?.family === 'sonnet',
    modelFamily: getPublicModelDisplayName,
    includedModels: () => {
      const value = flag<unknown>('tengu_usage_overage_included_models', null)
      return value == null ? process.env.USER_TYPE === 'ant' ? [] : ['Fable', 'Fable 5', 'Fable 5.1'] : Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : []
    },
    settingSources: (key: string) => [...getEnabledSettingSources()].reverse().flatMap(source => {
      const value = (getSettingsForSource(source) as Record<string, unknown> | null)?.[key]
      return value === undefined ? [] : [{source, value}]
    }),
    keyPresence: usageLimitKeyPresence,
    onSettings: (listener: (...args: any[]) => void) => subscribeSettings(listener),
    onSession: (listener: (...args: any[]) => void) => onSessionSwitch(listener),
    onRejected: (listener: (...args: any[]) => void) => quotaRejected.subscribe(listener),
    limits: () => currentLimits,
    probe: (model: string) => probeMainModelQuota(model),
    isHuman: isUsageLimitHumanCommand,
    isPrompt: (command: QueuedCommand) => command.mode === 'prompt' && command.agentId === undefined,
    queue: getCommandQueue, enqueue, remove: removeByFilter,
    inFlight: (predicate: (command: QueuedCommand) => boolean) => [...draining].some(predicate),
  }
}
