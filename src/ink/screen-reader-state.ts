// Official 2.1.283 chunk-pspf2b4w.js AX manager m and YMo/XMo/QMo/Jqn.
// Existing cached GrowthBook reader is the local synchronous remote-gate host.
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'
import {getGlobalConfig} from '../utils/config.js'
import {isEnvTruthy} from '../utils/envUtils.js'
import {screenReaderIntegerEnv} from './screen-reader-env.js'

type GateReader = (key: string, fallback: boolean) => boolean
const maximumAnnouncements = 16
const startupDefaultMs = 3000
const startupMaximumMs = 600000
const preparkDefaultMs = 50
const preparkMaximumMs = 5000

export class ScreenReaderState {
  #enabled?: boolean
  #activationSource?: 'flag' | 'env' | 'settings'
  #arrowNavigation?: boolean
  #gateReader: GateReader | null = getFeatureValue_CACHED_MAY_BE_STALE
  #firstAnnouncementAt: number | null = null
  #quietEnded = false
  #announcements: string[] = []

  swapRemoteGateReader(reader: GateReader | null): GateReader | null {
    const previous = this.#gateReader
    this.#gateReader = reader
    return previous
  }
  isEnabled(): boolean {
    if (this.#enabled !== undefined) return this.#enabled
    let enabled: boolean
    let source: 'flag' | 'env' | 'settings'
    if (process.argv.includes('--ax-screen-reader')) {enabled = true; source = 'flag'}
    else if (process.env.CLAUDE_AX_SCREEN_READER !== undefined) {
      enabled = isEnvTruthy(process.env.CLAUDE_AX_SCREEN_READER)
      source = 'env'
    } else {
      enabled = (getGlobalConfig() as {axScreenReader?: boolean}).axScreenReader === true
      source = 'settings'
    }
    if (!enabled) {this.#enabled = false; return false}
    const permitted = this.#gateReader?.('tengu_ax_screen_reader', true) ?? true
    this.#activationSource = permitted ? source : undefined
    this.#enabled = permitted
    return permitted
  }
  activationSource(): 'flag' | 'env' | 'settings' | undefined {
    return this.isEnabled() ? this.#activationSource : undefined
  }
  isArrowNavEnabled(): boolean {
    if (this.#arrowNavigation === undefined) this.#arrowNavigation = this.#gateReader?.('tengu_ax_sr_arrow_nav', false) ?? false
    return this.#arrowNavigation
  }
  markAnnouncementWritten(at = Date.now()): void {
    if (this.#firstAnnouncementAt === null) this.#firstAnnouncementAt = at
  }
  endStartupQuiet(): void {this.#quietEnded = true}
  startupQuietOpenedAtMs(): number | null {return this.#quietEnded ? null : this.#firstAnnouncementAt}
  queueAnnouncement(message: string): void {
    this.#announcements.push(message)
    if (this.#announcements.length > maximumAnnouncements) this.#announcements.splice(0, this.#announcements.length - maximumAnnouncements)
  }
  drainAnnouncements(): string[] {return this.#announcements.splice(0)}
  startupQuietRemainingMs(now = Date.now()): number {
    const opened = this.startupQuietOpenedAtMs()
    if (opened === null) return 0
    return Math.max(0, opened + Math.min(screenReaderIntegerEnv('CLAUDE_AX_STARTUP_QUIET_MS', startupDefaultMs), startupMaximumMs) - now)
  }
  preParkDelayMs(): number {return Math.min(screenReaderIntegerEnv('CLAUDE_AX_PREPARK_MS', preparkDefaultMs), preparkMaximumMs)}
  reset(): void {
    this.#enabled = undefined
    this.#activationSource = undefined
    this.#arrowNavigation = undefined
    this.#firstAnnouncementAt = null
    this.#quietEnded = false
    this.#announcements.length = 0
  }
}

export const screenReaderState = new ScreenReaderState()
export const isArrowNavEnabled = (): boolean => screenReaderState.isArrowNavEnabled()
export const markScreenReaderAnnouncementWritten = (at?: number): void => screenReaderState.markAnnouncementWritten(at)
export const queueScreenReaderAnnouncement = (message: string): void => screenReaderState.queueAnnouncement(message)
