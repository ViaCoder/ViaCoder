import {getSettingsWithSources,getSettingsWithErrors} from '../../utils/settings/settings.js'
import {transformOrdinarySettingsAsync287} from '../../utils/settings/fastStatusWriter287.js'
import {isSettingSourceEnabled} from '../../utils/settings/constants.js'
import {projectSharedConfig,sharedConfigControlSchema} from '../../server/sharedConfigState.js'

/** Reuse the terminal's real scoped settings writer in the one execution owner. */
export async function handleSharedConfig(request:unknown) {
  const {update}=sharedConfigControlSchema.parse(request)
  const before=getSettingsWithSources()
  if (update) {
    if (!isSettingSourceEnabled('localSettings')) throw Error('Local settings are disabled for this session')
    if (getSettingsWithErrors().errors.length) throw Error('Settings validation errors must be resolved first')
    const local=before.sources.find(row=>row.source==='localSettings')?.settings ?? {}
    const changes:Record<string,unknown>={}
    for (const key of Object.keys(update.settings) as Array<keyof typeof update.settings>) {
      if ((local[key]??null)!==update.expected[key]) throw Error('Owner preferences changed; refresh before updating')
      const owner=[...before.sources].reverse().find(row=>Object.hasOwn(row.settings,key))
      if (owner && ['policySettings','flagSettings'].includes(owner.source)) throw Error(`Setting is managed by ${owner.source}`)
      changes[key]=update.settings[key]??undefined
    }
    const {error}=await transformOrdinarySettingsAsync287('localSettings',current=>{
      // The original Ri invokes this after the same per-path queue is acquired.
      // Do not acknowledge two writers which both read the same old snapshot.
      for(const key of Object.keys(update.settings) as Array<keyof typeof update.settings>)if((current?.[key]??null)!==update.expected[key])throw Error('Owner preferences changed; refresh before updating')
      return changes
    })
    if(error)throw error
  }
  return projectSharedConfig(getSettingsWithSources())!
}
