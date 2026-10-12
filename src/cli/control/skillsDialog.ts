import type {Command} from '../../types/command.js'
import {createSkillsDialog287,createSkillsDialogCommands287} from './skillsDialog287.native.js'
import {getPrintHostSource287} from '../printOwnership287/publicHostRuntime287.js'

/** Original Eg reads the model catalog and aliases; no hand-maintained model list. */
export function skillBytesPerToken(model:string|undefined):number {
 return (getPrintHostSource287('chunk-nankzm0s.js','Eg') as (value:string|undefined)=>number)(model)
}

/** Full original g/NDe/FDe/$De, borrowing the existing registry/settings owner. */
export function buildSdkSkillsDialog(commands:readonly Command[], model?:string) {
 const rows={Ro:['chunk-s3exmmq6.js','Ro'],QPr:['chunk-mphp7acd.js','QPr'],Nc:['chunk-1b21she7.js','Nc'],Lo:['chunk-scey49m3.js','Lo'],nan:['chunk-mphp7acd.js','nan'],_ce:['chunk-mphp7acd.js','_ce'],wP:['chunk-mphp7acd.js','wP'],TTe:['chunk-mphp7acd.js','TTe'],tr:['chunk-s3exmmq6.js','tr'],ge:['chunk-f1vb7bx7.js','ge'],gK:['chunk-s3exmmq6.js','gK'],ow:['chunk-s3exmmq6.js','ow'],Gjt:['chunk-h0r6byca.js','Gjt']} as const
 const ports=Object.fromEntries(Object.entries(rows).map(([key,[file,name]])=>[key,getPrintHostSource287(file,name)]))
 const rt=getPrintHostSource287('chunk-nankzm0s.js','rt') as ()=>string
 return createSkillsDialog287(ports).build({commands,bytesPerToken:skillBytesPerToken(model??rt())})
}

/** Original cn/KEt includes live MCP and dynamic commands; never a second registry. */
export function createSdkSkillsCommandReader287(readCommands:()=>Command[],readMcpCommands:()=>Command[]) {
 return createSkillsDialogCommands287({
  v:()=>({mcp:{commands:readMcpCommands()}}),get Ro(){return readCommands()},
  KEt:getPrintHostSource287('chunk-n2zepamy.js','KEt') as (commands:Command[],mcp:Command[],extra:Command[])=>Command[],
  dde:getPrintHostSource287('chunk-09m4fzsj.js','dde') as ()=>Command[],
 })
}
