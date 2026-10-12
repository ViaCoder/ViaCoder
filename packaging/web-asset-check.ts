// Release smoke for the actual source+Bun Web entrypoint. Run under
// offline-guard.ts from the final physical release location.
import { webAssetResponse } from '../src/server/web/assets.js'

const document = await webAssetResponse('/')
const script = await webAssetResponse('/assets/app.js')
const style = await webAssetResponse('/assets/app.css')
if (!document?.ok || !script?.ok || !style?.ok) throw Error('Web entrypoint assets are unavailable')
const [html, js, css] = await Promise.all([document.text(), script.text(), style.text()])
if (!html.includes('/assets/app.js') || !html.includes('/assets/app.css') ||
    !js.includes('createElement') || !css.includes('color-scheme: light;')) {
  throw Error('Web entrypoint asset contents are incomplete')
}
if (js.includes('process.env.ANTHROPIC_API_KEY') || js.includes('bun:sqlite') ||
    (await webAssetResponse('/v1/sessions')) !== undefined) {
  throw Error('Web bundle contains server-only material')
}
process.stdout.write(JSON.stringify({ webAssets: 'ok', jsBytes: Buffer.byteLength(js),
  cssBytes: Buffer.byteLength(css) }) + '\n')
