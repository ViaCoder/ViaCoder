import type {SDKControlRequest} from '../../../entrypoints/sdk/controlTypes.js';
import type {PrintDrain287} from '../../../tools/GetTaskTool/printLifecycleNative.js';
export type TaskEndSessionFrame287=SDKControlRequest & {request:Extract<SDKControlRequest['request'],{subtype:'end_session'}>};
export interface TaskEndSessionPorts287 {
 t(message:string):void;qe:Pick<PrintDrain287,'endSessionRequested'|'abortController'>;
 ll:typeof import('../../../utils/permissions/officialSDKPermission287/runtime.js').requestSDKTeardownUnwind287;
 Q:Pick<typeof import('../../../utils/messageQueueManager.js'),'suspendMidTurnFold'>;
 fl:import('../controlNative.js').PrintControlRuntime287['abortReason'];
 Oo():void;Pt:Pick<AbortController,'abort'>;On:{discard():void};Ze(frame:TaskEndSessionFrame287):void;
}
export function createTaskEndSession287(ports:TaskEndSessionPorts287):(frame:TaskEndSessionFrame287)=>'continue'|'break';
