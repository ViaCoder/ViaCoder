import type { TerminalNotification } from '../ink/useTerminalNotification.js'
import { NOTIFICATION_CHANNELS } from '../utils/configConstants.js'
import { logForDebugging } from '../utils/debug.js'
import { env } from '../utils/env.js'
import { execFileNoThrow } from '../utils/execFileNoThrow.js'
import {getOriginalModsLifecycle287} from '../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {createNotifications287,type NotificationPorts287,type NotificationContext287} from './officialNotifications287/native.js'
import { checkAppleTerminalBell } from '../vendor/official-terminal-bell/index.js'
import {
  type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  logEvent,
} from './analytics/index.js'

export type NotificationOptions = {
  message: string
  title?: string
  notificationType: string
}

// These accessors use the already-installed source namespace and its existing
// execution/config/hooks owners; no secondary state or copied hook dispatcher.
const originalNotification287=createNotifications287({
 Xd:()=> (getOriginalModsLifecycle287().clearSourceModule287('chunk-bn3p37gv.js').Xd as NotificationPorts287['Xd'])(),
 Vo:(...args)=> (getOriginalModsLifecycle287().clearSourceModule287('chunk-5vkjwxk2.js').Vo as NotificationPorts287['Vo'])(...args),
 i1:()=> (getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js').i1 as NotificationPorts287['i1'])(),
 ZO:(...args)=> (getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js').ZO as NotificationPorts287['ZO'])(...args),
 S:value=>value,c:value=>value,bn:value=>value,a:env,MZ:NOTIFICATION_CHANNELS,
 i:(name,data)=>logEvent(name,data as Record<string,AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS|undefined>),
 // Existing C: first-party exposure/feature telemetry remains suppressed.
 y(){},m(){},
 w:()=>checkAppleTerminalBell({Ke:execFileNoThrow,t:logForDebugging}),
})

export async function sendNotification(
 notif:NotificationOptions,
 terminal:TerminalNotification,
 context:NotificationContext287={},
):Promise<void>{
 await originalNotification287.send(notif,terminal,context)
}
