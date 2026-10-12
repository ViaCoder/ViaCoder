import { buildComputerUseTools } from '../../vendor/official-desktop/index.js'
import type { PlatformCuContract } from './platformExecutor.js'

/** Platform C removes unsupported actions from BOTH aggregate and individual
 * schemas. Mac's builder/body is unchanged. */
export function buildPlatformComputerUseTools(contract: PlatformCuContract) {
  const needs: Record<string, PlatformCuContract['methods'][number]> = {
    screenshot: 'capture', zoom: 'zoom', switch_display: 'displays', type: 'type', key: 'key', mouse_move: 'move',
    left_click: 'click', right_click: 'click', middle_click: 'click', double_click: 'click',
    triple_click: 'click', left_click_drag: 'drag', scroll: 'scroll', cursor_position: 'cursor',
    read_clipboard: 'readClipboard', write_clipboard: 'writeClipboard',
  }
  const unavailable = new Set(['hold_key', 'left_mouse_down', 'left_mouse_up', 'open_application'])
  if (contract.platform === 'win32' && contract.methods.includes('releaseInput')) {
    for (const [name, method] of [['open_application','openApp'],['hold_key','holdKey'],
      ['left_mouse_down','mouseDown'],['left_mouse_up','mouseUp']] as const)
      if (contract.methods.includes(method)) unavailable.delete(name)
  }
  for (const [tool, method] of Object.entries(needs)) if (!contract.methods.includes(method)) unavailable.add(tool)
  const tools = structuredClone(buildComputerUseTools({ platform: contract.platform,
    screenshotFiltering: 'none', adaptiveResolution: false, saveToDisk: false }, 'pixels'))
  // This is a JSON schema tree, not a prompt rewrite or native implementation.
  function adapt(value: unknown): void {
    if (!value || typeof value !== 'object') return
    const row = value as Record<string, unknown>
    if (row.properties && typeof row.properties === 'object') {
      const props = row.properties as Record<string, { enum?: string[]; description?: string }>
      if (props.action?.enum) props.action.enum = props.action.enum.filter(action => !unavailable.has(action))
      if (props.text?.description?.includes('modifier'))
        props.text.description += ' Held-key click/scroll modifiers are unavailable on this backend; do not supply modifiers.'
    }
    if (contract.platform === 'linux' && typeof row.description === 'string')
      row.description = row.description.replaceAll('macOS', 'Linux').replaceAll('Finder', 'file manager')
        .replaceAll('Spotlight', 'application launcher').replaceAll('Dock', 'desktop panel')
    for (const child of Object.values(row)) adapt(child)
  }
  const result = tools.filter((tool: { name: string }) => !unavailable.has(tool.name))
  for (const tool of result) {
    adapt(tool)
    if (contract.platform === 'linux' && tool.name === 'type')
      tool.description += ' This backend may use the clipboard; request clipboard read and write approval before typing.'
  }
  return result
}
