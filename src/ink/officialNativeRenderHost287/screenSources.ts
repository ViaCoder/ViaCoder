import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import type {NativeScreenSources287} from './screenLifecycle.js'
export function readNativeScreenSources287():NativeScreenSources287 {
 const source=getOriginalModsLifecycle287();
 const ink=source.clearSourceModule287('chunk-p50qybax.js');
 const csi=source.clearSourceModule287('chunk-m59srz4k.js');
 const capability=source.clearSourceModule287('chunk-ckcph1xh.js');
 const platform=source.clearSourceModule287('chunk-amhtwhch.js');
 const instances=source.clearSourceModule287('chunk-1y575bx8.js');
 const log=source.clearSourceModule287('chunk-q80zaav8.js');
 return {
 O:platform.O as NativeScreenSources287['O'],Us:instances.Us as NativeScreenSources287['Us'],
 Ko:ink.Ko as NativeScreenSources287['Ko'],zv:ink.zv as NativeScreenSources287['zv'],
 s$:csi.s$ as NativeScreenSources287['s$'],Fbt:csi.Fbt as NativeScreenSources287['Fbt'],
 ks:ink.ks as NativeScreenSources287['ks'],Fv:ink.Fv as number,Uv:ink.Uv as number,
 PD:capability.PD as NativeScreenSources287['PD'],FT:capability.FT as NativeScreenSources287['FT'],
 t:log.t as NativeScreenSources287['t'],
 };
}
