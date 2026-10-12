import {readFile,realpath} from 'node:fs/promises'
import {dirname,basename,join,relative,isAbsolute} from 'node:path'
import {getClaudeConfigHomeDir} from './envUtils.js'

/** Only references written by tool-result persistence, not arbitrary paths in prose. */
export function recordedOutputPaths(record:unknown):string[] {
  if(!record || typeof record!=='object')return []
  const row=record as {toolUseResult?:{persistedOutputPath?:unknown};message?:{content?:unknown}}
  const paths=new Set<string>()
  if(typeof row.toolUseResult?.persistedOutputPath==='string')paths.add(row.toolUseResult.persistedOutputPath)
  if(Array.isArray(row.message?.content))for(const block of row.message.content){
    if(block.type!=='tool_result' || typeof block.content!=='string' || !block.content.startsWith('<persisted-output>\n'))continue
    const match=block.content.match(/^Output too large [^\n]* Full output saved to: ([^\n]+)$/m)
    if(match)paths.add(match[1]!)
  }
  return [...paths]
}

export async function readRecordedOutput(path:string,projectsDir=join(getClaudeConfigHomeDir(),'projects')):Promise<string> {
  const [root,file]=await Promise.all([realpath(projectsDir),realpath(path)])
  const within=relative(root,file)
  if(within==='..' || within.startsWith('..'+(process.platform==='win32'?'\\':'/')) || isAbsolute(within) || basename(dirname(file))!=='tool-results')
    throw Error('Output reference is outside recorded session tool-results')
  return readFile(file,'utf8')
}
