import type {SDKControlRequest} from '../../entrypoints/sdk/controlTypes.js'
import type {PrintDrain287} from '../../tools/GetTaskTool/printLifecycleNative.js'
export interface SetCwdControlFrameNative287 {
 control(request:SDKControlRequest):Promise<void>
 hf(caller:string,options?:{restartLaunchDirStdioServers:boolean}):Promise<void>
 pb():Promise<void>
 Hu():boolean
 up(input:Pick<PrintDrain287,'running'|'runPhase'>&{mainThreadQueueLength:number}):boolean
}
/** Typed application facade validates the borrowed lexical frame. */
export declare function createSetCwdControlFrameNative287(ports:object):SetCwdControlFrameNative287
