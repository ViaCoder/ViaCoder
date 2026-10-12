import * as fsPromises from 'node:fs/promises'
import * as path from 'node:path'
import * as os from 'node:os'
import * as React from 'react'
import {createBannerProductionPorts287} from '../../components/LogoV2/bannerProduction287.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {getTerminalXtversionName287} from '../../ink/terminal.js'
import {envDynamic} from '../../utils/envDynamic.js'
import {JETBRAINS_IDES} from '../../utils/env.js'
import {getFastStatusSettingsWriter287} from '../../utils/settings/fastStatusWriter287.js'
import {getSettingsFilePathForSource} from '../../utils/settings/settings.js'
import {createScrollSpeed287,type ScrollSpeedRuntime287} from './officialScrollSpeed287/native.js'

/** Source GW, editor path memo, and mv all share this one factory and canonical host. */
export function createScrollSpeedProductionPorts287(){
 return {
  ...createBannerProductionPorts287(),
  builtins:{'fs/promises':fsPromises,path,os},
  Children:React.Children,Fragment:React.Fragment,isValidElement:React.isValidElement,
  xtversionName:getTerminalXtversionName287,
  attacherCaps:()=>getExecutionSession287().surfaceCapabilities.attacherCaps(),
  terminalEnvironment:{isJetBrainsIdeTerminal:()=>JETBRAINS_IDES.includes(envDynamic.terminal??'')},
  writeSettings:(...args:Parameters<ReturnType<typeof getFastStatusSettingsWriter287>['update']>)=>getFastStatusSettingsWriter287().update(...args),
  settingsPath:getSettingsFilePathForSource,
 }
}
export type ScrollSpeedPorts287=ReturnType<typeof createScrollSpeedProductionPorts287>
let runtime:ScrollSpeedRuntime287|undefined
export function getScrollSpeedRuntime287(){return runtime??=createScrollSpeed287(createScrollSpeedProductionPorts287())}
