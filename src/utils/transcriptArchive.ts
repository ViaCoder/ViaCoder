// Display-only disk paging. Never feed these raw records into query context.
import {open, type FileHandle} from 'node:fs/promises'
import type {Message} from '../types/message.js'
const RECORD_TYPES=new Set(['user','assistant','system','attachment','progress'])
export class TranscriptArchive {
  private offset=0
  private remainder=Buffer.alloc(0)
  private file?: FileHandle
  private closed=false
  private seen=new Set<string>()
  private constructor(private readonly path:string) {}
  static async open(path:string):Promise<TranscriptArchive> {
    const reader=new TranscriptArchive(path)
    reader.file=await open(path,'r')
    reader.offset=(await reader.file.stat()).size
    return reader
  }
  get done():boolean {return this.closed || (this.offset===0 && this.remainder.length===0)}
  async previous(count=200):Promise<Message[]> {
    const rows:Message[]=[]
    while(rows.length<count && !this.done){
      let boundary=this.remainder.lastIndexOf(10)
      while(boundary<0 && this.offset>0){
        const length=Math.min(65536,this.offset),buffer=Buffer.allocUnsafe(length)
        const {bytesRead}=await this.file!.read(buffer,0,length,this.offset-length)
        if(this.closed)return []
        if(bytesRead!==length)throw Error(`Transcript changed while reading: ${this.path}`)
        this.offset-=length
        this.remainder=Buffer.concat([buffer,this.remainder])
        boundary=this.remainder.lastIndexOf(10)
      }
      const line=this.remainder.subarray(boundary+1).toString('utf8')
      const lineOffset=this.offset+boundary+1
      this.remainder=boundary<0?Buffer.alloc(0):this.remainder.subarray(0,boundary)
      if(!line.trim())continue
      let record:Message
      try{record=JSON.parse(line)}catch{
        rows.push({type:'system',subtype:'informational',uuid:`archive-invalid-${lineOffset}` as Message['uuid'],timestamp:'',level:'warning',content:`Unreadable transcript record at byte ${lineOffset}:\n${line}`})
        continue
      }
      if(!record || !RECORD_TYPES.has(record.type) || typeof record.uuid!=='string' || this.seen.has(record.uuid))continue
      this.seen.add(record.uuid)
      rows.push(record)
    }
    return rows.reverse()
  }
  async close():Promise<void> {
    if(this.closed)return
    this.closed=true;this.remainder=Buffer.alloc(0);this.seen.clear()
    await this.file?.close();this.file=undefined
  }
}
