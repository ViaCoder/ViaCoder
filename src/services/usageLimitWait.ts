import {randomUUID} from 'node:crypto'
import * as official from '../vendor/official-usage-limit-wait/state.js'
import {getUsageLimitPorts, j} from '../vendor/official-usage-limit-wait/host.js'
import {G5t} from '../vendor/official-usage-limit-wait/intent.js'
import type {QueuedCommand} from '../types/textInputTypes.js'
import type {Message} from '../types/message.js'
import {registerCleanup} from '../utils/cleanupRegistry.js'
export {official as officialUsageLimitWait}
export {withUsageLimitHost} from '../vendor/official-usage-limit-wait/host.js'
export const usageLimitIntent = {hasIntent: () => G5t.of(j().host).hasIntent()}
export const cancelUsageLimitWait = (reason: string) => official.SO(reason)
// A7/co: automatic waits and queued continuations cancel first. A manual
// wait belongs to the episode, and survives cancelling unrelated running work.
export function cancelUsageLimitGesture(reason: 'escape'|'ctrl_c', busy: boolean): boolean {
  if (!official.ret() && !official.vso() && (busy || !official.dwe(official.ose().phase))) return false
  official.SO(reason); return true
}
export function staleUsageLimitInput(input: string, hasImages: boolean, isLeader: boolean): string {
  return isLeader && !hasImages && !input.trim() ? official.Gdr() ?? input : input
}
export const recheckUsageLimitWait = () => official.Y0e()

// Official Y5.applyMessage: only real rate-limit assistant metadata auto-arms;
// Goal presence is irrelevant. Called before the query terminal is consumed.
export function observeUsageLimitMessage(message: Message): boolean {
  if (message.type !== 'assistant' || !message.isApiErrorMessage || message.error !== 'rate_limit' || !message.quotaLimits) return false
  return official.Cso(message.quotaLimits)
}

// r4e's drain lease survives processUserInput awaits and covers commands which
// never reach query. Aso runs before processing; kso only after shouldQuery is
// known. Identity of the claim is preserved through finally (Tso).
// Ch.someInFlightDrainCommand must become true BEFORE dequeue publishes its
// snapshot. Otherwise observers briefly see no intent and can rearm Goal idle
// work while input hooks are still processing the continuation.
export function retainUsageLimitCommands(commands: QueuedCommand[]): () => void {
  const draining = getUsageLimitPorts().draining
  commands.forEach(command => draining.add(command))
  return () => {commands.forEach(command => draining.delete(command))}
}

export function beginUsageLimitDrain(input: QueuedCommand[]) {
  const ports = getUsageLimitPorts(), commands = official.Aso(input) as QueuedCommand[]
  commands.forEach(command => ports.draining.add(command))
  const uuids = input.flatMap(command => command.uuid ? [command.uuid] : [])
  let claim: {kind: string; queried: boolean} | null = null
  return {
    commands,
    claim(willQuery: boolean) {
      const primary = commands[0]
      claim = official.kso({turnUuids: uuids,
        isHumanTakeover: willQuery && !!primary && (primary.mode === 'prompt' || primary.mode === 'bash') && ports.isHuman(primary),
        humanCommandUuids: commands.filter(ports.isHuman).map(command => command.uuid), willQuery})
    },
    finish() {
      try {official.Tso(claim, uuids)} finally {commands.forEach(command => ports.draining.delete(command))}
    },
  }
}
export function registerUsageLimitTakeover(command: QueuedCommand, dispatching = false): void {
  if (!getUsageLimitPorts().isHuman(command)) return
  command.uuid ??= randomUUID()
  official.B5t(command.uuid, {dispatching})
}

export type UsageLimitNotice = (text: string, level: 'info'|'warning') => void
// Public equivalent of rwn: exactly one 30s observer while armed. It does not
// replace the host's stale/sleep detection with a reset-time timeout.
export function mountUsageLimitWait({isBusy, notice, remote = false,
  setInterval: start = globalThis.setInterval, clearInterval: stop = globalThis.clearInterval,
}: {isBusy: () => boolean; notice: UsageLimitNotice; remote?: boolean;
  setInterval?: typeof globalThis.setInterval; clearInterval?: typeof globalThis.clearInterval}) {
  const ports = getUsageLimitPorts()
  ports.lifecycle.mounted = !remote; ports.lifecycle.remote = remote
  if (remote) return () => {ports.lifecycle.mounted = false}
  official.uwe()
  official.Vdr()
  let timer: ReturnType<typeof globalThis.setInterval> | undefined
  const sync = () => {
    if (official.ose().phase === 'armed') {
      if (timer === undefined) {timer = start(() => {
        if (official.Wdr(Date.now(), isBusy()) === 'fired') notice('Usage limit reset · continuing automatically', 'info')
      }, 30_000); timer.unref?.()}
    } else if (timer !== undefined) {stop(timer); timer = undefined}
  }
  const off = official.Bdr(sync)
  const events = official.oet((event: string) => {
    const messages: Record<string, [string, 'info'|'warning']> = {
      'auto-armed': ['Usage limit reached · continuing automatically when it resets', 'info'],
      'taken-over': ['Usage limit reached · waiting to continue automatically', 'info'],
      'cancelled': ['Automatic continue cancelled · /rate-limit-options to re-arm', 'info'],
      'fired-now': ['Usage limit available again · continuing now', 'info'],
      'stale': ['Usage limit has reset · press enter to continue', 'info'],
      'disabled': ['Automatic continue was turned off · this task will not resume on its own', 'warning'],
      'horizon-exceeded': ['Automatic continue stopped · the usage limit now resets more than 24 hours out, so this task will not resume on its own (/rate-limit-options to wait anyway)', 'warning'],
      'continuation-dropped': ['Automatic continue did not run · the continuation was blocked before it reached the model, so this task did not resume on its own · send a prompt to continue', 'warning'],
      'cap-exhausted': ['Automatic continue stopped after repeated usage-limit hits · this task will not resume on its own (/rate-limit-options to try again)', 'warning'],
    }
    const entry = messages[event]; if (entry) notice(...entry)
  })
  const cleanup = registerCleanup(async () => {official.U5t('process_exit')})
  sync()
  return () => {cleanup(); official.U5t('process_exit'); off(); events(); if (timer !== undefined) stop(timer); ports.lifecycle.mounted = false}
}
