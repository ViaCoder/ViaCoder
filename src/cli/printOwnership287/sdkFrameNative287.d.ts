import type {PrintMcpClient287} from '../../services/mcp/officialPrintScheduler287/native.js'
import type {SDKControlRequest} from '../../entrypoints/sdk/controlTypes.js'
export interface PrintSdkFrame287 {
 ze(mode?:'redial'|'skip'):Promise<void>;
 wn(name:string):Promise<void>;
 Tr(name:string):Promise<PrintMcpClient287|undefined>;
 Ed():boolean;
 handleMcpMessage(frame:SDKControlRequest):void;
 initializeSdk(frame:SDKControlRequest):Promise<{outcomes:Record<string,string>|undefined;deferred:boolean}>;
 readonly pendingToolsRefresh:Set<string>;
 readonly retainedRefreshFailures:Set<string>;
 readonly parkedManifests:Map<string,unknown>;
}
export function installPrintSdkFrameNative287(owner:object,ports:object):PrintSdkFrame287;
