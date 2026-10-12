// Real extension acceptance against a throwaway loopback page, without a model.
import {lstat} from 'node:fs/promises'
import {dirname} from 'node:path'
import {getChromeModuleForPlatform} from '../src/vendor/official-chrome/platform.js'
import {summarizeNativeReadonlyResult} from './chrome-offline-result.mjs'

export function createdTabId(response) {
  for (const block of response.result?.content ?? []) {
    if (block.type !== 'text') continue
    try {
      const value = JSON.parse(block.text)
      if (Number.isInteger(value?.tabId)) return value.tabId
      if (Number.isInteger(value?.id)) return value.id
    } catch { /* Some extension versions return a short prose confirmation. */ }
    const match = block.text.match(/(?:"tabId"\s*:\s*|\btab\s+(?:with\s+)?(?:ID\s*[:=]?\s*)?)(\d+)/i)
    if (match) return Number(match[1])
  }
  throw Error('Created-tab response did not contain an unambiguous tab ID')
}

function responseText(response) {
  return (response.result?.content ?? []).filter(x => x.type === 'text').map(x => x.text).join('\n')
}

export async function exercisePage(call, url, marker, wasAcknowledged, report, {readOnly=false}={}) {
  let tabId
  try {
    const initial = await call('tabs_context_mcp', {createIfEmpty:false})
    if (/No MCP tab groups found|No tab group exists for this session/.test(responseText(initial))) {
      report({stage:'initialize-group',previousGroupAbsent:true})
      const initialized = await call('tabs_context_mcp', {createIfEmpty:true})
      const contexts = (initialized.result?.content ?? []).flatMap(block=>{
        if (block.type !== 'text') return []
        try {const value=JSON.parse(block.text);return Array.isArray(value.availableTabs)?[value]:[]}
        catch {return []}
      })
      // The extension creates one blank tab with a new group. Never reuse an
      // existing page if another actor changed the group during initialization.
      const tabs = contexts[0]?.availableTabs
      if (tabs?.length !== 1 || !Number.isInteger(tabs[0].tabId) ||
        !['chrome://newtab','chrome://newtab/','about:blank',''].includes(tabs[0].url))
        throw Error('New group did not return one identifiable blank tab')
      tabId = tabs[0].tabId
    } else {
      tabId = createdTabId(await call('tabs_create_mcp', {}))
    }
    report({stage:'created', tabId})
    await call('navigate', {url, tabId})
    const tree = responseText(await call('read_page', {tabId, filter:'all'}))
    if (!tree.includes(marker)) throw Error('Page marker missing from accessibility response')
    report({stage:'page-read', markerVerified:true})
    if (readOnly) return
    const line = tree.split('\n').find(x => x.includes('Confirm offline roundtrip') && x.includes('button'))
    const ref = line?.match(/\bref_\d+\b/)?.[0]
    if (!ref) throw Error('Test button reference missing from accessibility response')
    await call('computer', {action:'left_click', tabId, ref})
    const after = responseText(await call('read_page', {tabId, filter:'all'}))
    if (!after.includes(`${marker}-CLICKED`)) throw Error('Changed page marker missing from returned tree')
    // A separate local HTTP receipt checks the action, not just the tool's success flag.
    const deadline = Date.now() + 2000
    while (!wasAcknowledged() && Date.now() < deadline) await Bun.sleep(25)
    if (!wasAcknowledged()) throw Error('Local page action receipt missing')
    report({stage:'action-return', changedMarkerVerified:true, localReceiptVerified:true})
  } finally {
    if (tabId !== undefined) {
      await call('tabs_close_mcp', {tabId})
      report({stage:'cleanup', createdTabClosed:true})
    }
  }
}

async function main() {
  const socketPath = process.argv[process.argv.indexOf('--socket') + 1]
  const publicPage = process.argv.includes('--public-page')
  if ((!process.argv.includes('--allow-local-page') && !publicPage) || !process.argv.includes('--socket'))
    throw Error('Usage: --socket PATH --allow-local-page|--public-page')
  for (const [path, socket] of [[dirname(socketPath), false], [socketPath, true]]) {
    const s = await lstat(path)
    if (s.uid !== process.getuid() || s.isSymbolicLink() || (s.mode & 0o077) ||
      (socket ? !s.isSocket() : !s.isDirectory())) throw Error('Untrusted native socket')
  }
  const marker = publicPage ? 'Example Domain' : `CC-OFFLINE-${crypto.randomUUID()}`
  let acknowledged = false, served = 0
  const page = `<!doctype html><html lang="en"><meta charset="utf-8"><title>CC offline acceptance</title><h1>${marker}</h1><button id="confirm">Confirm offline roundtrip</button><p id="status">READY</p><script>document.getElementById('confirm').onclick=()=>{document.getElementById('status').textContent='${marker}-CLICKED';fetch('/${marker}/ack',{method:'POST'})}</script></html>`
  const server = publicPage ? null : Bun.serve({hostname:'127.0.0.1',port:0,fetch(request) {
    const path = new URL(request.url).pathname
    if (path === `/${marker}` && request.method === 'GET') {
      served++
      return new Response(page, {headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}})
    }
    if (path === `/${marker}/ack` && request.method === 'POST') {
      acknowledged = true
      return new Response('ok')
    }
    return new Response('not found', {status:404})
  }})
  const report = value => console.log(JSON.stringify(value))
  const client = getChromeModuleForPlatform('linux').createClient({
    serverName:'offline-page-acceptance', socketPath, clientTypeId:'claude-code',
    logger:{silly(){},debug(){},info(){},warn(){},error(){}},
    getToolCallTimeoutMs:()=>30000, onToolCallDisconnected:()=> 'native socket disconnected',
  })
  client.disableAutoReconnect = true
  const call = async (name, args) => {
    let timer
    try {
      const result = await Promise.race([client.callTool(name,args),
        new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error(`${name}: timed out`)),35000)})])
      const summary = summarizeNativeReadonlyResult(result)
      report({stage:'tool',name,isError:summary.isError,responseValid:summary.responseValid})
      if (summary.isError) {
        const serialized = JSON.stringify(result)
        report({stage:'tool-error',name, envelopeKeys:Object.keys(result ?? {}),
          groupAbsent:/tab_create_no_group|No MCP tab group exists/.test(serialized),
          permissionRelated:/permission|denied|declined/i.test(serialized),
          errorMessage: typeof result.error === 'string' ? result.error.slice(0,600)
            : typeof result.error?.message === 'string' ? result.error.message.slice(0,600) : undefined})
        throw Error(`${name}: extension returned error or invalid response`)
      }
      return result
    } finally {clearTimeout(timer)}
  }
  try {
    const url = publicPage ? 'https://example.com/' : `http://127.0.0.1:${server.port}/${marker}`
    report({stage:'start',mode:publicPage?'public-page':'loopback',url})
    await exercisePage(call, url, marker, ()=>acknowledged, report, {readOnly:publicPage})
    report({passed:true,modelRequests:0,...(publicPage?{publicPageReadVerified:true}:{pageRequests:served,testPageExternalRequests:0})})
  } finally {
    client.disconnect()
    if (server) {
      await server.stop(true)
      report({stage:'cleanup',localServerStopped:true,pageRequests:served,actionReceipt:acknowledged})
    }
  }
}

if (import.meta.main) main().catch(error=>{
  console.error(JSON.stringify({passed:false,error:error.message}))
  process.exitCode=1
})
