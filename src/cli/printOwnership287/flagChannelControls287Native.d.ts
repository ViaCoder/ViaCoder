import type {SDKControlRequest} from '../../entrypoints/sdk/controlTypes.js'
export interface PrintFlagChannelControls287 {
 applyFlagSettings(frame:SDKControlRequest):Promise<void>;
 enableChannel(frame:SDKControlRequest):void;
 initializeThinkingBudgetOwner(owner:object,config:unknown,resetAnchor:unknown):void;
 setModel(frame:SDKControlRequest,schedule:(work:()=>void|Promise<void>)=>void):void;
 sourceApplySettings287(settings:Record<string,unknown>,readFast:()=>boolean):void;
 isLaunchModelPick():boolean;
}
export function createPrintFlagChannelControlsNative287(ports:object):PrintFlagChannelControls287;
