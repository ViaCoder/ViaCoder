import {isSettingSourceEnabled} from '../../utils/settings/constants.js'
import {updateSettingsForSource} from '../../utils/settings/settings.js'
import {EFFORT_LEVELS} from '../../utils/model/effortLevels.js'
import {createSdkSettingsValidation287} from './updateSettings287.native.js'

const validation=createSdkSettingsValidation287({nu:EFFORT_LEVELS})

/** Official 2.1.287 OA/Uue and the original w3 persistence owner. */
export async function updateSdkSettings(request: {
  source: unknown
  settings: unknown
}, remoteTransport: boolean, options: {model: string; storageV5?: unknown}): Promise<void> {
  const source = request.source
  const error=validation.OA(remoteTransport,
    isSettingSourceEnabled(source==='userSettings'?'userSettings':'localSettings'),source,request.settings)
  if(error!==null)throw Error(error)
  const values=request.settings as Record<string,string>
  if(source==='userSettings'){
    const effort=validation.Uue(String(values.effortLevel))
    if(effort===undefined)throw Error(validation.Ow)
    const {persistModelCommandEffort287}=await import('../../utils/model/officialModelCommand287/runtime.js')
    const result=await persistModelCommandEffort287(effort,options.model,true,options.storageV5)
    if(result)throw result
    return
  }

  const result = await updateSettingsForSource('localSettings', {outputStyle: values.outputStyle})
  if (result.error) throw result.error
}
