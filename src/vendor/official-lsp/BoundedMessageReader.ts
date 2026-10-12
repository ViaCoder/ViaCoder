import {AbstractMessageReader,Disposable,type DataCallback,type Message} from 'vscode-jsonrpc/node.js'
import type {Readable} from 'node:stream'
import {logForDebugging} from '../../utils/debug.js'

// Selected from official 2.1.283 chunk-wthhr3tb.js: It/Is/As and
// qt/$s/qs/Ds/Bs/Dn. The local adapter replaces bundled symbol names only.
export const MAX_LSP_HEADER_BYTES=65_536
export const MAX_LSP_BODY_BYTES=33_554_432
const delimiter=Buffer.from('\r\n\r\n')
const headerPattern=/^([!#$%&'*+.^_`|~0-9A-Za-z-]+)[ \t]*:[ \t]*([^\r\n]*)$/
const allowedHeaders=new Set(['content-length','content-type'])
const empty=Buffer.alloc(0)

export function parseLspHeader(header:string):number|Error {
  let contentLength:string|undefined
  for(const line of header.split('\r\n')){
    const match=headerPattern.exec(line),name=match?.[1]?.toLowerCase()
    if(!match||name===undefined||!allowedHeaders.has(name))return Error('LSP server sent non-protocol output in the header block — its stdout is desynchronized from the base protocol (logs/banners on stdout instead of stderr?)')
    if(name==='content-length')contentLength=match[2]?.trim()
  }
  if(contentLength===undefined)return Error('LSP server sent a header block without a Content-Length — its stdout is desynchronized from the base protocol (non-protocol output on stdout?)')
  if(!/^\d+$/.test(contentLength))return Error('LSP server sent a Content-Length that is not a number — its stdout is desynchronized from the base protocol')
  const length=Number(contentLength)
  if(length>MAX_LSP_BODY_BYTES)return Error('LSP server declared a message larger than the size limit — refusing to buffer it')
  return length
}

export class BoundedMessageReader extends AbstractMessageReader {
  private callback?:DataCallback
  private stopped=false
  private headerChunks:Buffer[]=[]
  private headerBytes=0
  private headerTail:Buffer<ArrayBufferLike>=empty
  private expectedBodyLength?:number
  private bodyChunks:Buffer[]=[]
  private bodyBytes=0
  private readonly onData=(data:Buffer|string)=>this.handleData(data)
  private readonly onStreamError=(error:Error)=>this.fireError(error)
  private readonly onStreamClose=()=>this.fireClose()
  constructor(private readonly readable:Readable,private readonly onProtocolViolation:(error:Error)=>void){super()}
  listen(callback:DataCallback):Disposable {
    this.callback=callback
    this.readable.on('data',this.onData)
    this.readable.on('error',this.onStreamError)
    this.readable.on('close',this.onStreamClose)
    return Disposable.create(()=>this.detach())
  }
  override dispose():void {this.detach();super.dispose()}
  private detach():void {
    this.stopped=true
    this.readable.removeListener('data',this.onData)
    this.readable.removeListener('error',this.onStreamError)
    this.readable.removeListener('close',this.onStreamClose)
    this.resetHeader();this.bodyChunks=[];this.bodyBytes=0;this.expectedBodyLength=undefined
  }
  private handleData(data:Buffer|string):void {
    if(this.stopped)return
    let chunk:Buffer|undefined=typeof data==='string'?Buffer.from(data,'utf8'):data
    while(chunk&&chunk.length>0&&!this.stopped){
      const length=this.expectedBodyLength
      chunk=length===undefined?this.consumeHeader(chunk):this.consumeBody(chunk,length)
    }
  }
  private consumeHeader(chunk:Buffer):Buffer|undefined {
    const joined=this.headerTail.length===0?chunk:Buffer.concat([this.headerTail,chunk]),index=joined.indexOf(delimiter)
    if(index===-1){
      this.headerChunks.push(chunk);this.headerBytes+=chunk.length
      this.headerTail=joined.subarray(Math.max(0,joined.length-(delimiter.length-1)))
      if(this.headerBytes>MAX_LSP_HEADER_BYTES)this.protocolViolation(Error('LSP server exceeded the header size limit without a message header — it is likely printing logs or other non-protocol output to stdout instead of stderr'))
      return
    }
    const consumed=index-this.headerTail.length+delimiter.length
    const headerSize=this.headerBytes-this.headerTail.length+index
    this.headerChunks.push(chunk.subarray(0,consumed))
    const header=Buffer.concat(this.headerChunks).subarray(0,headerSize).toString('latin1')
    const remainder=chunk.subarray(consumed)
    this.resetHeader()
    const length=parseLspHeader(header)
    if(length instanceof Error){this.protocolViolation(length);return}
    this.expectedBodyLength=length
    return remainder.length>0?remainder:undefined
  }
  private consumeBody(chunk:Buffer,length:number):Buffer|undefined {
    const needed=length-this.bodyBytes
    if(chunk.length<needed){this.bodyChunks.push(chunk);this.bodyBytes+=chunk.length;return}
    this.bodyChunks.push(chunk.length===needed?chunk:chunk.subarray(0,needed))
    const remainder=chunk.length>needed?chunk.subarray(needed):undefined
    const body=Buffer.concat(this.bodyChunks,length)
    this.bodyChunks=[];this.bodyBytes=0;this.expectedBodyLength=undefined
    this.deliver(body)
    return remainder
  }
  private deliver(body:Buffer):void {
    let decoded:unknown
    try{decoded=JSON.parse(body.toString('utf8'))}
    catch(error){logForDebugging(`LSP: dropped unparseable message body: ${error}`,{level:'warn'});return}
    if(typeof decoded!=='object'||decoded===null){logForDebugging('LSP: dropped message body that is not an object',{level:'warn'});return}
    try{this.callback?.(decoded as Message)}catch(error){this.fireError(error)}
  }
  private resetHeader():void {this.headerChunks=[];this.headerBytes=0;this.headerTail=empty}
  private protocolViolation(error:Error):void {
    if(this.stopped)return
    this.stopped=true;this.detach();this.fireError(error)
    try{this.onProtocolViolation(error)}catch(failure){this.fireError(failure)}
  }
}
