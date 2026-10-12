import type {ApiKeyReadCell} from '../officialApiKeyRead287/native.js'
import type {ApiKeyHelperState287} from '../officialApiKeyHelper/runtime.js'
export interface StartupAuthResetPorts287 {
 U():{host:object}
 Rpe:{of(host:object):{clear():void}}
 nns:{of(host:object):ApiKeyReadCell}
 HWt:{of(host:object):ApiKeyHelperState287}
 rJe():void;a_t():void;Ej():void;vpe():void;F():boolean;bwe():void
}
export function createStartupAuthReset287(ports:StartupAuthResetPorts287):{
 reset():void;readerCell():ApiKeyReadCell;clearOAuth():void;clearHelper():void
}
