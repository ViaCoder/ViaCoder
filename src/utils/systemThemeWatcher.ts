import { oscColor, type TerminalQuerier } from '../ink/terminal-querier.js'
import { wrapForMultiplexer } from '../ink/termio/osc.js'
import { logForDebugging } from './debug.js'
import {
  setCachedSystemTheme,
  themeFromOscColor,
  type SystemTheme,
} from './systemTheme.js'

/** Follow OSC 11 while the public `auto` theme is selected. */
export function watchSystemTheme(
  querier: TerminalQuerier,
  onTheme: (theme: SystemTheme) => void,
): () => void {
  let disposed = false
  let querying = false

  const report = (data: string): void => {
    if (disposed) return
    const theme = themeFromOscColor(data)
    if (!theme) return
    setCachedSystemTheme(theme)
    onTheme(theme)
  }

  const unsubscribe = querier.subscribeBackgroundColor(report)
  const query = async (): Promise<void> => {
    if (disposed || querying) return
    querying = true
    try {
      const raw = oscColor(11)
      const inMultiplexer = Boolean(process.env.TMUX || process.env.STY)
      if (inMultiplexer) {
        const wrapped = {
          ...raw,
          request: wrapForMultiplexer(raw.request),
        }
        const [response] = await Promise.all([
          querier.send(wrapped),
          querier.flush(),
        ])
        if (response) {
          report(response.data)
          return
        }
      }
      const [response] = await Promise.all([
        querier.send(raw),
        querier.flush(),
      ])
      if (response) report(response.data)
    } catch (error) {
      logForDebugging(`systemTheme: OSC 11 query failed: ${String(error)}`)
    } finally {
      querying = false
    }
  }

  void query()
  return () => {
    disposed = true
    unsubscribe()
  }
}
