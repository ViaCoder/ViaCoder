/** Local C over the existing 0.7.3 MCP client; no Rust driver/server/process. */
import {createHash} from 'node:crypto'
import {isAbsolute} from 'node:path'
import {CallToolResultSchema} from '@modelcontextprotocol/sdk/types.js'
import {z} from 'zod/v4'
import type {Tool} from '../../Tool.js'
import type {ConnectedMcpServer} from '../../services/mcp/types.js'
import {getConnectedMcpClient} from '../../services/mcp/connectionAccess.js'
import {getFsImplementation} from '../fsOperations.js'
import {LinuxComputerUseDoctorReport} from './index.js'
import {getComputerUseClipboardKeyGrants287} from '../../vendor/official-desktop/index.js'
import type {PlatformCuContract,PlatformCuCallContext,PlatformCuInvoker} from '../computerUse/platformExecutor.js'
import sharp from 'sharp'
import {linuxDesktopPortCommand073} from './desktopPort073.js'
import {verifyInstalledLinux073Binary} from './dragPatchReceipt.js'
const Pid=z.number().int().positive()
// Complete fixed-tag Rust wire fields, not a guessed Action/error envelope.
const Candidate=z.object({pid:Pid,name:z.string(),command:z.string()})
const Window=z.object({window_id:z.number().int().nonnegative(),pid:Pid.nullable(),title:z.string().nullable(),
 app_id:z.string().nullable(),wm_class:z.string().nullable(),bounds:z.object({x:z.number().int().nullable(),y:z.number().int().nullable(),width:z.number().int().nonnegative(),height:z.number().int().nonnegative()}).nullable(),
 workspace:z.number().int().nullable(),focused:z.boolean(),hidden:z.boolean(),client_type:z.string().nullable(),backend:z.string()})
const AccessibleApp=z.object({object_ref:z.string(),name:z.string().nullable(),pid:Pid.nullable(),role:z.string(),child_count:z.number().int(),bounds:z.object({x:z.number().int(),y:z.number().int(),width:z.number().int(),height:z.number().int()}).nullable()})
const Apps=z.object({apps:z.array(Candidate),accessible_apps:z.array(AccessibleApp),accessibility_error:z.string().nullable(),note:z.string()})
const Focus=z.object({backend:z.string(),focused_window:Window.nullable(),error:z.string().nullable(),permissions_hint:z.string().nullable(),message:z.string()})
const Action=z.object({action:z.string(),ok:z.boolean(),implemented:z.boolean(),message:z.string(),received:z.unknown().nullable()})
const Shell=z.object({ok:z.boolean(),command_sha256:z.string(),cwd:z.string(),timeout_seconds:z.number(),exit_code:z.number().int().nullable(),stdout:z.string(),stderr:z.string(),stdout_truncated:z.boolean(),stderr_truncated:z.boolean(),error:z.string().nullable()})
const Caption=z.object({width:z.number().int().positive(),height:z.number().int().positive(),coordinate_width:z.number().int().positive(),coordinate_height:z.number().int().positive(),scale:z.number().positive(),resized:z.boolean(),bytes:z.number().int().positive(),original_bytes:z.number().int().positive(),max_bytes:z.number().int().positive(),format:z.literal('jpeg'),quality:z.number().int(),source:z.string(),cropped_to_window:z.literal(false),window_title:z.null(),window_off_screen:z.boolean().optional(),off_screen_note:z.string().optional()})
const Point=z.object({x:z.number().int(),y:z.number().int()})
const Display=z.object({displayId:z.number().int(),name:z.string(),isPrimary:z.boolean(),width:z.number().int().positive(),height:z.number().int().positive(),originX:z.number().int(),originY:z.number().int(),scaleFactor:z.literal(1)})
export function hasLinux073Tools(connection:{name:string},tools:readonly Tool[],platform=process.platform){
 return platform==='linux'&&connection.name==='linux-computer-use'&&['doctor','list_apps','focused_window'].every(name=>tools.some(t=>t.mcpInfo?.toolName===name))
}
async function wire(connection:ConnectedMcpServer,name:string,args:Record<string,unknown>,signal:AbortSignal){
 signal.throwIfAborted()
 if('isClosed'in connection&&connection.isClosed())throw Error('Linux computer use connection closed')
 const client=getConnectedMcpClient(connection),request={name,arguments:args}
 const result=CallToolResultSchema.parse(client.generation==='v2'?await client.client.callTool(request,{signal}):
  await client.client.callTool(request,CallToolResultSchema,{signal}))
 signal.throwIfAborted()
 if(result.isError)throw Error(JSON.stringify(result))
 return result
}
async function call(connection:ConnectedMcpServer,name:string,args:Record<string,unknown>,signal:AbortSignal){
 const result=await wire(connection,name,args,signal)
 if(result.structuredContent!==undefined)return result.structuredContent
 if(result.content.length!==1||result.content[0]?.type!=='text')throw Error('Linux computer use expected structured upstream result')
 return JSON.parse(result.content[0].text) as unknown
}
/** PID + kernel start time + actual executable; never title/app_id as grant ID.
 * Reads only the connected local Linux process metadata, using the shared Fs. */
function processIdentity(pid:number){
 Pid.parse(pid)
 const fs=getFsImplementation(),prefix=`/proc/${pid}`,exe=fs.realpathSync(prefix+'/exe')
 const stat=fs.readFileSync(prefix+'/stat',{encoding:'utf8'}),end=stat.lastIndexOf(')')
 const start=stat.slice(end+2).trim().split(/\s+/)[19]
 if(end<0||!start||!/^\d+$/.test(start)||!isAbsolute(exe))throw Error('Linux computer use process identity unavailable')
 if(fs.realpathSync(prefix+'/exe')!==exe)throw Error('Linux computer use process changed during identity lookup')
 const displayName=stat.slice(stat.indexOf('(')+1,end)
 if(!displayName)throw Error('Linux computer use process lacks a kernel name')
 return{pid,bundleId:`linux-process:${pid}:${start}:${exe}`,displayName}
}
function hasFields(tool:Tool|undefined,fields:readonly string[]){
 const schema=tool?.inputJSONSchema
 if(!schema||!schema.properties||typeof schema.properties!=='object')return false
 return fields.every(field=>Object.hasOwn(schema.properties!,field))
}
/** We send max_bytes on every screenshot request, so it is part of the
 * capability contract just like the dimensions and encoding fields. */
export function hasLinux073ScreenshotInputs(tool:Tool|undefined){
 return hasFields(tool,['format','quality','max_width','max_height','max_bytes','full_screen'])
}
export async function createLinux073ConnectedBackend(connection:ConnectedMcpServer,tools:readonly Tool[],signal:AbortSignal){
 const client=getConnectedMcpClient(connection).client,version=client.getServerVersion()
 if(version?.name!=='computer-use-linux'||version.version!=='0.7.3')throw Error('Linux computer use server identity/version mismatch')
 const config=connection.config
 if(config.type!=='stdio'||!isAbsolute(config.command)||config.args?.length!==1||config.args[0]!=='mcp')
  throw Error('Linux computer use adapter requires the installed local stdio binary')
 const doctor=LinuxComputerUseDoctorReport.parse(await call(connection,'doctor',{},signal))
 if(doctor.platform.os!=='linux')throw Error('Linux computer use doctor platform mismatch')
 if(!['x86_64','aarch64','arm64'].includes(doctor.platform.arch))throw Error('Unsupported Linux computer use architecture')
 // Keep the original release pin; explicitly installed patched builds must
 // bind this SAME executable to the precise source patch and build digest.
 // Unreceipted installed ARM behavior is unchanged, not a drag-fix receipt.
 verifyInstalledLinux073Binary(config.command,doctor.platform.arch,getFsImplementation())
 if(!doctor.readiness.can_register_mcp_tools||!doctor.readiness.can_query_windows)
  return undefined // Preserve the existing mature Linux C; do not publish an app-grant adapter.
 const rawMethods:PlatformCuContract['methods']=['apps','foreground']
 const tool=(name:string)=>tools.find(t=>t.mcpInfo?.toolName===name)
 const shell=async(method:string,args:Record<string,unknown>,s:AbortSignal)=>{
  const command=linuxDesktopPortCommand073(method,args)
  // Upstream clears most environment names, including XDG_SESSION_TYPE.
  // Carry only its actual doctor's compositor identity, never model input,
  // login profiles, credentials, or a mode that treats XWayland as native X11.
  const env=doctor.platform.xdg_session_type===null?{}:{XDG_SESSION_TYPE:doctor.platform.xdg_session_type}
  const reply=Shell.parse(await call(connection,'run_shell',{command,timeout_seconds:5,env},s))
  if(!reply.ok||reply.exit_code!==0||reply.error!==null||reply.stdout_truncated||reply.stderr_truncated||reply.command_sha256!==createHash('sha256').update(command).digest('hex'))throw Error(JSON.stringify(reply))
  return JSON.parse(reply.stdout) as unknown
 }
 // Never enable upstream shell execution or add a tool absent from its list.
 // Missing optional primitives keep their established mature catalog path.
 const ports=hasFields(tool('run_shell'),['command','timeout_seconds','env'])?
  z.object({methods:z.array(z.enum(['displays','cursor','move','underPoint','readClipboard','writeClipboard']))}).parse(await shell('describe',{},signal)).methods:[]
 rawMethods.push(...ports.filter(m=>m!=='move'))
 if(doctor.readiness.can_capture_screenshots&&hasLinux073ScreenshotInputs(tool('screenshot'))){
  rawMethods.push('capture','zoom')
  if(!rawMethods.includes('displays'))rawMethods.push('displays')
 }
 if(doctor.readiness.can_send_development_input){
  if(hasFields(tools.find(t=>t.mcpInfo?.toolName==='press_key'),['key','pid']))rawMethods.push('key')
  if(hasFields(tools.find(t=>t.mcpInfo?.toolName==='type_text'),['text','pid']))rawMethods.push('type')
  if(ports.includes('underPoint')){
   if(ports.includes('move'))rawMethods.push('move')
   if(hasFields(tool('click'),['x','y','button','click_count','pid','window_id']))rawMethods.push('click')
   if(hasFields(tool('scroll'),['x','y','direction','pages','pid','window_id']))rawMethods.push('scroll')
   if(hasFields(tool('drag'),['start_x','start_y','end_x','end_y']))rawMethods.push('drag')
  }
 }
 const contract:PlatformCuContract={protocol:'cclaude-cu-executor/1',platform:'linux',upstream:'agent-sh/computer-use-linux',version:'0.7.3',
  ready:true,screenshotFiltering:'none',appIndexIncomplete:true,methods:rawMethods}
 const foreground=async(s:AbortSignal)=>{
  const reply=Focus.parse(await call(connection,'focused_window',{},s)),row=reply.focused_window
  if(reply.error!==null)throw Error(reply.error)
  if(row===null)return null
  if(row.pid===null)throw Error('Linux focused window lacks a trusted PID')
  return {...processIdentity(row.pid),window_id:row.window_id}
 }
 const screenshot=async(s:AbortSignal)=>{
  const result=await wire(connection,'screenshot',{format:'jpeg',quality:80,max_width:4096,max_height:4096,max_bytes:4194304,full_screen:true},s)
  if(result.content.length!==2||result.content[0]?.type!=='image'||result.content[1]?.type!=='text'||result.content[0].mimeType!=='image/jpeg')throw Error('Invalid original Linux screenshot content blocks')
  const caption=Caption.parse(JSON.parse(result.content[1].text)),bytes=Buffer.from(result.content[0].data,'base64')
  const meta=await sharp(bytes).metadata();s.throwIfAborted()
  if(meta.format!=='jpeg'||meta.width!==caption.width||meta.height!==caption.height||bytes.length!==caption.bytes||caption.window_off_screen||caption.off_screen_note)throw Error('Linux screenshot image/caption mismatch')
  if(Math.abs(caption.width/caption.coordinate_width-caption.scale)>0.002||Math.abs(caption.height/caption.coordinate_height-caption.scale)>0.002)throw Error('Linux screenshot coordinate scale mismatch')
  return {bytes,caption}
 }
 const displays=async(s:AbortSignal)=>{
  if(ports.includes('displays'))return z.array(Display).parse(await shell('displays',{},s))
  const {caption}=await screenshot(s)
  // One honest virtual display: upstream full capture is the composited
  // desktop, not per-monitor enumeration. Do not invent physical monitors.
  return [{displayId:0,name:'Linux composited desktop (all monitors)',isPrimary:true,width:caption.coordinate_width,height:caption.coordinate_height,originX:0,originY:0,scaleFactor:1 as const}]
 }
 const underPoint=async(x:number,y:number,s:AbortSignal)=>{
  const hit=z.object({pid:Pid,window_id:z.number().int().nonnegative()}).nullable().parse(await shell('underPoint',{x,y},s))
  return hit===null?null:{...processIdentity(hit.pid),window_id:hit.window_id}
 }
 const action=async(name:string,args:Record<string,unknown>,s:AbortSignal)=>{
  const reply=Action.parse(await call(connection,name,args,s))
  if(reply.action!==name||!reply.ok||!reply.implemented||reply.message.includes('WARNING:')||reply.message.includes('was clamped'))throw Error(JSON.stringify(reply))
  return reply
 }
 // Validate the actual metadata contract before publishing an adapted tool.
 Apps.parse(await call(connection,'list_apps',{},signal));await foreground(signal)
 const invoke:PlatformCuInvoker=async(method,args,live:PlatformCuCallContext)=>{
  if(method==='apps'){
   const result=Apps.parse(await call(connection,'list_apps',{},live.signal)),rows=result.apps
   return rows.map(row=>processIdentity(row.pid))
  }
  if(method==='foreground')return foreground(live.signal)
  if(!rawMethods.includes(method))throw Error(`Linux backend capability unavailable: ${method}`)
  if(method==='displays')return displays(live.signal)
  if(method==='capture'||method==='zoom'){
   const {bytes,caption}=await screenshot(live.signal)
   const ds=ports.includes('displays')?await displays(live.signal):[{displayId:0,name:'Linux composited desktop (all monitors)',isPrimary:true,width:caption.coordinate_width,height:caption.coordinate_height,originX:0,originY:0,scaleFactor:1 as const}]
   const display=args.displayId===undefined?ds.find(d=>d.isPrimary):ds.find(d=>d.displayId===args.displayId)
   if(!display)throw Error('Requested Linux display is unavailable')
   const minX=Math.min(...ds.map(d=>d.originX)),minY=Math.min(...ds.map(d=>d.originY)),maxX=Math.max(...ds.map(d=>d.originX+d.width)),maxY=Math.max(...ds.map(d=>d.originY+d.height))
   if(maxX-minX!==caption.coordinate_width||maxY-minY!==caption.coordinate_height)throw Error('Linux display topology and screenshot coordinates differ')
   const region=method==='zoom'?z.object({x:z.number(),y:z.number(),w:z.number().positive(),h:z.number().positive()}).parse(args.region):{x:display.originX,y:display.originY,w:display.width,h:display.height}
   if(region.x<display.originX||region.y<display.originY||region.x+region.w>display.originX+display.width||region.y+region.h>display.originY+display.height)throw Error('Linux crop is outside selected display')
   const left=Math.round((region.x-minX)*caption.width/caption.coordinate_width),top=Math.round((region.y-minY)*caption.height/caption.coordinate_height)
   const right=Math.round((region.x+region.w-minX)*caption.width/caption.coordinate_width),bottom=Math.round((region.y+region.h-minY)*caption.height/caption.coordinate_height)
   if(right<=left||bottom<=top)throw Error('Linux crop has no returned pixels')
   const {data,info}=await sharp(bytes).extract({left,top,width:right-left,height:bottom-top}).jpeg({quality:80}).toBuffer({resolveWithObject:true});live.signal.throwIfAborted()
   return {base64:data.toString('base64'),width:info.width,height:info.height,displayWidth:region.w,displayHeight:region.h,displayId:display.displayId,originX:region.x,originY:region.y}
  }
  if(method==='readClipboard'||method==='writeClipboard'){
   if(!live.flags[method==='readClipboard'?'clipboardRead':'clipboardWrite'])throw Error(`Linux ${method} requires explicit clipboard approval`)
   const value=await shell(method,method==='writeClipboard'?{text:z.string().parse(args.text)}:{},live.signal)
   return method==='readClipboard'?z.string().parse(value):z.null().parse(value)
  }
  if(method==='cursor')return Point.parse(await shell(method,{},live.signal))
  if(method==='underPoint'){const p=Point.parse(args);return underPoint(p.x,p.y,live.signal)}
  if(['click','move','drag','scroll'].includes(method)){
   const approved=async(p:z.infer<typeof Point>)=>{
    const hit=await underPoint(p.x,p.y,live.signal)
    if(!hit||!live.apps.some(a=>a.bundleId===hit.bundleId))throw Error('Linux pointer target is outside approved app grant')
    return hit
   }
   if(method==='drag'){
    const start=args.start===undefined?Point.parse(await shell('cursor',{},live.signal)):Point.parse(args.start),end=Point.parse(args.end)
    const first=await approved(start),last=await approved(end)
    if(first.bundleId!==last.bundleId)throw Error('Linux cross-application drag is unavailable')
    return action('drag',{start_x:start.x,start_y:start.y,end_x:end.x,end_y:end.y},live.signal)
   }
   const p=Point.parse(args),hit=await approved(p)
   if(method==='move')return Point.parse(await shell('move',p,live.signal))
   const target={x:p.x,y:p.y,pid:hit.pid,window_id:hit.window_id,relative:false}
   if(method==='click')return action('click',{...target,button:z.enum(['left','right','middle']).parse(args.button),click_count:z.number().int().min(1).max(3).parse(args.clicks)},live.signal)
   for(const [axis,positive,negative] of [['dy','down','up'],['dx','right','left']] as const){
    const delta=z.number().int().parse(args[axis]);if(delta===0)continue
    // Mac native amount counts wheel units; Rust rounds pages*5. No sign or
    // factor-of-five drift, including two-axis delivery in original order.
    await approved(p)
    await action('scroll',{...target,direction:delta>0?positive:negative,pages:Math.abs(delta)/5},live.signal)
   }
   return null
  }
  if(method!=='key'&&method!=='type')throw Error(`Linux backend capability unavailable: ${method}`)
  if(!rawMethods.includes(method))throw Error(`Linux backend capability unavailable: ${method}`)
  const target=await foreground(live.signal)
  if(!target||!live.apps.some(app=>app.bundleId===target.bundleId))throw Error('Linux focused process is outside the approved app grant')
  // Upstream type_text may use KDE clipboard integration. Never bypass the
  // existing flags merely because Mac's dispatcher chose viaClipboard=false.
  if(method==='type'&&(!live.flags.clipboardRead||!live.flags.clipboardWrite))
   throw Error('Linux type_text requires explicit clipboard read/write approval')
  const text=z.string().parse(args.text),repeat=method==='key'?z.number().int().positive().parse(args.repeat??1):1
  if(method==='key')for(const flag of getComputerUseClipboardKeyGrants287(text.toLowerCase().replace(/[ -]/g,'')))
   if(flag==='clipboardRead'&&!live.flags.clipboardRead||flag==='clipboardWrite'&&!live.flags.clipboardWrite)
    throw Error(`Linux keyboard clipboard action requires explicit ${flag} approval`)
  // Linux compositors bind Super/Meta chords independently of the Windows
  // chord table in the public dispatcher. Borrow the same explicit flag.
  if(method==='key'&&text.toLowerCase().replace(/[ -]/g,'').split('+').some(key=>['meta','super','cmd','command'].includes(key))&&!live.flags.systemKeyCombos)
   throw Error('Linux compositor shortcuts require explicit systemKeyCombos approval')
  for(let index=0;index<repeat;index++){
   live.signal.throwIfAborted()
   if((await foreground(live.signal))?.bundleId!==target.bundleId)throw Error('Linux keyboard focus changed before delivery')
   if(processIdentity(target.pid).bundleId!==target.bundleId)throw Error('Linux target process changed before input')
   await action(method==='key'?'press_key':'type_text',method==='key'?{key:text,pid:target.pid,window_id:target.window_id}:{text,pid:target.pid,window_id:target.window_id},live.signal)
  }
  return null
 }
 return{contract,invoke}
}
