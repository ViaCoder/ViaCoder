import type {ReactNode} from 'react'
import type {Notification} from '../notifications.js'
export function createPinnedNotificationDisplay287(ports:Record<string,unknown>): {
 compare:(a:Notification,b:Notification)=>number
 item:(notice:Notification)=>ReactNode
 Notice:(props:{notice:Notification})=>ReactNode
}
