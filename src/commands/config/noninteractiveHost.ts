import type { LocalJSXCommandContext } from '../../types/command.js'
import { getGlobalConfig, saveGlobalConfig } from '../../utils/config.js'
import { isEnvTruthy } from '../../utils/envUtils.js'
import { isSettingSourceEnabled } from '../../utils/settings/constants.js'
import { getInitialSettings, getSettingsWithErrors, getSettingsWithSources } from '../../utils/settings/settings.js'
import {getSettingsCacheStore287} from '../../utils/settings/settingsCache.js'
import {updateOrdinarySettingsAsync287} from '../../utils/settings/fastStatusWriter287.js'
import type { ConfigCommandHost, ConfigOutcome } from './config-noninteractive.js'

// Official chunk-azjf17r6: VWe row ids and bo boolean coercion. Only expose
// rows whose real local consumers exist. Consent/plugin/model rows need their
// owning host services and are intentionally not replaced by arbitrary JSON writes.
const rows = [
  {id:'autoCompact',label:'Auto-compact',key:'autoCompactEnabled',storage:'global'},
  {id:'tips',label:'Show tips',key:'spinnerTipsEnabled',storage:'localSettings'},
  {id:'reduceMotion',label:'Reduce motion',key:'prefersReducedMotion',storage:'localSettings'},
  {id:'progressBar',label:'Terminal progress bar',key:'terminalProgressBarEnabled',storage:'global'},
  {id:'turnDuration',label:'Show turn duration',key:'showTurnDuration',storage:'global'},
  {id:'gitignore',label:'Respect .gitignore in file picker',key:'respectGitignore',storage:'global'},
  {id:'copyFullResponse',label:'Skip the /copy picker',key:'copyFullResponse',storage:'global'},
] as const
const clean = (value:string) => value.replace(/[\p{Cc}\p{Cf}]/gu, '')
const message = (message:string,kind:ConfigOutcome['kind']='refusal'):ConfigOutcome => ({kind,message})

/** Real local settings adapter. Remote storage/consent requires an explicit host. */
export function createLocalConfigHost(context:LocalJSXCommandContext):ConfigCommandHost {
  const offBox = () => isEnvTruthy(process.env.CLAUDE_CODE_REMOTE) ||
    ['remote','remote_projects','remote_desktop','remote_mobile','ssh-remote'].includes(process.env.CLAUDE_CODE_ENTRYPOINT ?? '')
  return {
    persistsOffBox:offBox,
    list:() => rows.map(row=>`  ${row.id}=true|false`).sort().join('\n'),
    async apply(assignments) {
      const results:ConfigOutcome[]=[]
      for (const {key,raw} of assignments) {
        const row=rows.find(row=>row.id.toLowerCase()===key.toLowerCase())
        if (!row) { results.push(message(`${clean(key)} isn't an available /config setting on this host. Run /config to see what's available.`)); continue }
        if (offBox()) { results.push(message('Local settings writes require the session settings host on this connection.', 'locked')); continue }
        const lower=raw.toLowerCase(), on=['true','1','on','yes'].includes(lower), off=['false','0','off','no'].includes(lower)
        if (!on && !off) { results.push(message(`${row.label} takes true or false, not "${clean(raw)}".`)); continue }
        // Re-read before EACH write; a prior assignment or policy change must not
        // leave the next assignment using a stale merge/lock decision.
        const {sources}=getSettingsWithSources()
        if (getSettingsWithErrors().errors.length) {results.push(message(`Couldn't save ${row.label}: settings validation errors must be resolved first.`, 'locked'));continue}
        const owner=[...sources].reverse().find(source => Object.hasOwn(source.settings,row.key))
        if (owner && (row.storage==='global' || ['policySettings','flagSettings'].includes(owner.source))) {
          results.push(message(`Couldn't save ${row.label}: set by ${owner.source}.`,'locked'));continue
        }
        try {
          if (row.storage==='global') {
            saveGlobalConfig(current=>({...current,[row.key]:on}))
            if (getGlobalConfig()[row.key]!==on) throw Error('the saved value could not be confirmed')
          } else {
            if (!isSettingSourceEnabled(row.storage)) throw Error('local settings are disabled for this session')
            const {error}=await updateOrdinarySettingsAsync287(row.storage,{[row.key]:on},context.storageV5)
            if(error) throw error
            const store=getSettingsCacheStore287()
            const saved=store.repoTierFreeze.whileLive(()=>{
              // The original held tier remains fixed until release. Confirm the
              // write against live source precedence, without leaking that merge
              // back into the query's canonical held view.
              store.mergedSettings=null
              try{return getInitialSettings()[row.key]}
              finally{store.mergedSettings=null}
            })
            if(saved!==on) throw Error('a higher-priority setting overrides the saved value')
            context.setAppState(state=>({...state,settings:{...state.settings,[row.key]:on}}))
          }
          results.push(message(`Set ${row.label} to ${on ? 'true' : 'false'}`))
        } catch(error) {results.push(message(`Couldn't save ${row.label}: ${error instanceof Error ? error.message : String(error)}`,'save-failure'))}
      }
      return results
    },
  }
}
