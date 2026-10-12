import type {TerminalNotification} from '../../ink/useTerminalNotification.js'
import type {NotificationOptions} from '../notifier.js'

// Original i1 is an execution identity projection, not the mutable session.
export type NotificationSession287={id:string;project:{originalCwd:string;projectRoot:string}|null}
export type NotificationContext287={storageV5?:unknown;credentials?:unknown}
export interface NotificationPorts287 {
 Xd():{terminal?:string|null}|null;
 S(value:string):string;c(value:string):string;bn(value:string):string;
 a:{terminal?:string};i(name:string,data:Record<string,string|undefined>):void;
 y(name:string):void;m(name:string,reason:string):void;MZ:readonly string[];
 Vo(name:'preferredNotifChannel',fallback:'auto'):{value:string};
 i1():NotificationSession287;
 ZO(session:NotificationSession287,notification:NotificationOptions,context?:NotificationContext287&{timeoutMs?:number}):Promise<void>;
 w():Promise<boolean>;
}
export function createNotifications287(ports:NotificationPorts287):{
 send(notification:NotificationOptions,terminal:TerminalNotification,context?:NotificationContext287):Promise<void>;
 channel(channel:string,notification:NotificationOptions,terminal:TerminalNotification):Promise<string>;
 automatic():Promise<string>;
 display(method:string,notification:NotificationOptions,terminal:TerminalNotification):void;
 terminalCategory(value:string|undefined):string|undefined;
};
