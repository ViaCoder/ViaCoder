import type {Context} from 'react'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import type {NativeFrameSources287,NativeTerminalModes287} from './frameLifecycle.js'
export function readNativeFrameSources287():NativeFrameSources287 & {
 wze:new()=>NativeTerminalModes287;
 zAt:Context<NativeTerminalModes287>;
} {
 const source=getOriginalModsLifecycle287();
 const terminal=source.clearSourceModule287('chunk-nzck9a32.js');
 const cursor=source.clearSourceModule287('chunk-097c14a9.js');
 const ink=source.clearSourceModule287('chunk-p50qybax.js');
 return {
 pYt:terminal.pYt as NativeFrameSources287['pYt'],
 DI:cursor.DI as string,MI:cursor.MI as string,
 Y0n:ink.Y0n as NativeFrameSources287['Y0n'],Ko:ink.Ko as NativeFrameSources287['Ko'],
 wze:terminal.wze as new()=>NativeTerminalModes287,
 zAt:terminal.zAt as Context<NativeTerminalModes287>,
 };
}
