import { join } from 'node:path'

const headers = {
  'Cache-Control': 'no-cache',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'same-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
}
const page = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#f6f5f1"><title>ViaCoder · 工作空间</title><link rel="icon" href="data:,"><link rel="stylesheet" href="/assets/app.css"></head><body><div id="root"></div><noscript>请启用 JavaScript 以连接共享会话。</noscript><script type="module" src="/assets/app.js"></script></body></html>`
let bundle: Promise<Blob> | undefined
async function javascript(): Promise<Blob> {
  const built = await Bun.build({ entrypoints:[join(import.meta.dir,'index.tsx')], target:'browser', format:'esm', minify:true, define:{ 'process.env.NODE_ENV':JSON.stringify('production') } })
  if (!built.success) throw new AggregateError(built.logs,'Web interface build failed')
  const script = built.outputs.find(output => output.path.endsWith('.js'))
  if (!script) throw Error('Web interface bundle is missing')
  return script
}
/** Only public static assets; account/session APIs remain behind serve's gates. */
export async function webAssetResponse(pathname: string): Promise<Response | undefined> {
  if (pathname === '/') return new Response(page, {headers:{...headers,'Content-Type':'text/html; charset=utf-8'}})
  if (pathname === '/assets/app.css') return new Response([await Bun.file(join(import.meta.dir,'styles.css')).text(), await Bun.file(join(import.meta.dir,'PermissionModePicker.css')).text()].join('\n'), {headers:{...headers,'Content-Type':'text/css; charset=utf-8'}})
  if (pathname === '/assets/app.js') return new Response(await (bundle ??= javascript()), {headers:{...headers,'Content-Type':'text/javascript; charset=utf-8'}})
}
