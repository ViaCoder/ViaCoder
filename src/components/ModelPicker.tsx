import {updateOrdinarySettingsAsync287} from '../utils/settings/fastStatusWriter287.js'
import * as React from 'react'
import {useCallback,useEffect,useMemo,useState,useSyncExternalStore} from 'react'
import {useAppState,useSetAppState} from '../state/AppState.js'
import {useNotifications} from '../context/notifications.js'
import {type EffortLevel,clampEffortLevel,toPersistableEffort} from '../utils/effort.js'
import {type ModelSetting,getDefaultMainLoopModel,parseUserSpecifiedModel} from '../utils/model/model.js'
import {getModelOptions} from '../utils/model/modelOptions.js'
import {mountOfficialModelRestrictionNoticeConsumer287} from '../utils/model/officialModelPicker287.js'
import {getOfficialModelValidation287} from '../utils/model/officialModelPicker287/validation.js'
import {OriginalModelSelector287} from '../utils/model/officialModelPicker287/selector.js'
import {subscribeServedCatalog,getServedCatalogVersion} from '../utils/model/servedCatalog.js'
import {getEffortSettingsUpdate} from '../utils/model/effortSettings.js'
import {updateSettingsForSource} from '../utils/settings/settings.js'
import {isFastModeEnabled} from '../utils/fastMode.js'
export type Props = {
  initial: string | null;
  sessionModel?: ModelSetting;
  onSetDefault?: (model: string | null) => void;
  onSelect: (model: string | null, effort: EffortLevel | undefined) => void;
  onCancel?: () => void;
  isStandaloneCommand?: boolean;
  showFastModeNotice?: boolean;
  /** Overrides the dim header line below "Select model". */
  headerText?: string;
  /**
   * When true, skip writing effortLevel to userSettings on selection.
   * Used by the assistant installer wizard where the model choice is
   * project-scoped (written to the assistant's .claude/settings.json via
   * install.ts) and should not leak to the user's global ~/.claude/settings.
   */
  skipSettingsWrite?: boolean;
};

/** Actual original mHe renderer/controller, with only existing host/C writers. */
export function ModelPicker(props:Props) {
  const setAppState=useSetAppState()
  const {addNotification}=useNotifications()
  const [selectionError,setSelectionError]=useState<string|undefined>()
  const fastMode=useAppState(state=>isFastModeEnabled()?(state.fastMode??false):false)
  const settings=useAppState(state=>state.settings)
  const version=useSyncExternalStore(subscribeServedCatalog,getServedCatalogVersion,getServedCatalogVersion)
  useEffect(()=>{
    getOfficialModelValidation287()
    return mountOfficialModelRestrictionNoticeConsumer287(addNotification,setSelectionError)
  },[addNotification])
  const options=useMemo(()=>getModelOptions(fastMode),[fastMode,version,settings,selectionError])
  const onSelect=useCallback(async (model:string|null,effort:EffortLevel|undefined)=>{
    // Preserve the explicit installer C: its choice is project-local and must
    // not leak into the global user's settings. No business cache is copied.
    if(effort!==undefined&&!props.skipSettingsWrite){
      const resolved=model===null?getDefaultMainLoopModel():parseUserSpecifiedModel(model)
      const level=clampEffortLevel(effort,resolved),persistable=toPersistableEffort(level)
      if(persistable!==undefined){
        const {error}=await updateOrdinarySettingsAsync287('userSettings', getEffortSettingsUpdate(resolved,persistable))
        if(error){setSelectionError(error.message);return}
      }
      setAppState(previous=>({...previous,effortValue:level}))
    }
    props.onSelect(model,effort)
  },[props.onSelect,props.skipSettingsWrite,setAppState])
  return <OriginalModelSelector287 {...props} onSelect={onSelect}
    headerText={selectionError??props.headerText} options={options}/>
}
