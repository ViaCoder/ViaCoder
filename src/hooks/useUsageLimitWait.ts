import {useEffect, useRef} from 'react'
import {mountUsageLimitWait, officialUsageLimitWait, type UsageLimitNotice} from '../services/usageLimitWait.js'
import {getUsageLimitPorts} from '../vendor/official-usage-limit-wait/host.js'
import type {QueryGuard} from '../utils/QueryGuard.js'
import type {AppStateStore} from '../state/AppStateStore.js'
import {getDefaultMainLoopModelSetting, parseUserSpecifiedModel} from '../utils/model/model.js'
export function useUsageLimitWait(guard: QueryGuard, remote: boolean, notice: UsageLimitNotice, model: string, store: AppStateStore) {
  const callback = useRef(notice); callback.current = notice
  useEffect(() => {
    const ports = getUsageLimitPorts(), previousModel = ports.model, previousSetting = ports.modelSetting
    // The REPL's session model can differ from bootstrap's startup override.
    ports.model = () => parseUserSpecifiedModel(ports.modelSetting())
    ports.modelSetting = () => {
      const state = store.getState()
      return state.mainLoopModelForSession ?? state.mainLoopModel ?? getDefaultMainLoopModelSetting()
    }
    const unmount = mountUsageLimitWait({isBusy: () => guard.isActive, remote,
      notice: (text, level) => callback.current(text, level)})
    let setting = ports.modelSetting()
    const off = store.subscribe(() => {
      const next = ports.modelSetting()
      if (next !== setting) {setting = next; if (!remote) officialUsageLimitWait.Y0e()}
    })
    return () => {off(); unmount(); ports.model = previousModel; ports.modelSetting = previousSetting}
  }, [guard, remote, store])
  const previousModel = useRef(model)
  useEffect(() => {
    if (previousModel.current !== model) {previousModel.current = model; if (!remote) officialUsageLimitWait.Y0e()}
  }, [model, remote])
}
