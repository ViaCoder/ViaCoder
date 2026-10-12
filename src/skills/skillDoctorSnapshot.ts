import { feature } from 'bun:bundle'
import { getProjectRoot, getSdkBetas } from '../bootstrap/state.js'
import { getMcpSkillCommands, getSkillToolCommands } from '../commands.js'
import { formatCommandsWithinBudget } from '../tools/SkillTool/prompt.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../services/analytics/growthbook.js'
import { isPolicyAllowed } from '../services/policyLimits/index.js'
import { getGlobalConfig } from '../utils/config.js'
import { getContextWindowForModel } from '../utils/context.js'
import { isEnvTruthy } from '../utils/envUtils.js'
import { getCanonicalName } from '../utils/model/model.js'
import type { Command } from '../types/command.js'
import type { LocalJSXCommandContext } from '../types/command.js'
import { buildSkillDoctorRows, classifySkillDoctorRows } from './skillDoctor.js'
import { scanSkillUsage, type SkillScanPolicy } from './skillDoctorScan.js'

export function skillReportsPersistOffBox():boolean {
  return isEnvTruthy(process.env.CLAUDE_CODE_REMOTE)||['remote','remote_projects','remote_desktop','remote_mobile','remote_cowork','remote_baku','ssh-remote'].includes(process.env.CLAUDE_CODE_ENTRYPOINT??'')
}
/** qbt/B: consult the existing policy service, never trigger a network refresh.
 * Validated-clover compliance inference has no complete host here: fail closed
 * for that cohort rather than treating absent HIPAA metadata as permission.
 */
export function skillTranscriptScanPolicy():SkillScanPolicy {
  if(skillReportsPersistOffBox())return {allowed:false,reason:'Skill usage reports are not available on this connection.'}
  if(!isPolicyAllowed('allow_skill_doctor_transcript_scan'))return {allowed:false,reason:'Transcript scanning is disabled by organization policy.'}
  if(getFeatureValue_CACHED_MAY_BE_STALE('tengu_validated_clover',false))return {allowed:false,reason:'Transcript scanning requires a verified compliance-policy host for this organization.'}
  return {allowed:true}
}
// Official Xy/ux and Nu (local estimator, not a token-count API call).
const fourChars=new Set(['claude-3-opus','claude-3-sonnet','claude-3-haiku','claude-3-5-sonnet','claude-3-5-haiku','claude-3-7-sonnet','claude-opus-4-0','claude-opus-4-1','claude-opus-4-5','claude-opus-4-6','claude-sonnet-4-0','claude-sonnet-4-5','claude-sonnet-4-6','claude-haiku-4-5'])
export function listingTokenEstimates(commands:Command[],model:string):Map<string,number> {
  if(!commands.length)return new Map()
  const rendered=formatCommandsWithinBudget(commands,getContextWindowForModel(model,getSdkBetas()))
  const canonical=getCanonicalName(model).replace(/\[1m\]/gi,'').replace(/-\d{8}$/,'').replace(/[._]/g,'-')
  const ratio=!model||fourChars.has(canonical)?4:3
  const tokens=new Map<string,number>()
  let offset=0
  for(let i=0;i<commands.length;i++){
    const command=commands[i]!,start=rendered.indexOf(`- ${command.name}`,offset)
    if(start<0)continue
    const next=commands[i+1],end=next?rendered.indexOf(`\n- ${next.name}`,start):rendered.length
    if(end<0)continue
    tokens.set(command.name,Math.round(rendered.slice(start,end).length/ratio));offset=end
  }
  return tokens
}
/** fqt/$je: reachable local listing + usage-count + measured seven-day scan host. */
export async function localSkillDoctorSnapshot(context:LocalJSXCommandContext) {
  const scanPromise=scanSkillUsage(skillTranscriptScanPolicy,undefined,Date.now(),context.abortController?.signal)
  // Attach immediately: discovery and the scanner run concurrently like fqt.
  scanPromise.catch(()=>{})
  const local=await getSkillToolCommands(getProjectRoot())
  const mcp=[...getMcpSkillCommands(context.getAppState().mcp.commands)]
  const unique=(commands:Command[])=>{
    const seen=new Set<string>()
    return commands.filter(command=>{if(seen.has(command.name))return false;seen.add(command.name);return true})
  }
  let included=unique([...local,...mcp])
  if(!context.options.tools.some(tool=>tool.name==='Skill'))included=[]
  if(feature('EXPERIMENTAL_SKILL_SEARCH')) {
    const {isSkillSearchEnabled}=await import('../services/skillSearch/featureCheck.js')
    if(isSkillSearchEnabled()){
      included=included.filter(command=>command.loadedFrom==='bundled'||command.loadedFrom==='mcp')
      if(included.length>30)included=included.filter(command=>command.loadedFrom==='bundled')
    }
  }
  const scan=await scanPromise
  const policy=skillTranscriptScanPolicy()
  if(!policy.allowed){scan.tokens.clear();scan.note=policy.reason??'Transcript scanning is not allowed.'}
  const rows=buildSkillDoctorRows(unique([...context.options.commands,...mcp]),listingTokenEstimates(included,context.options.mainLoopModel),getGlobalConfig().skillUsage??{},scan.tokens)
  return classifySkillDoctorRows(rows,scan.note)
}
