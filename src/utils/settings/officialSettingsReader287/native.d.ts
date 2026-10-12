import type {SettingsStore287,NativeParsedSettings287} from '../officialSettingsStore287/native.js'
import type {ValidationError} from '../validation.js'
import type {SettingSource} from '../constants.js'
import type {SettingsJson} from '../types.js'
import type {PolicyReadContext287} from '../../../services/context/officialModelUsagePolicy287/native.js'
export interface OriginalSettingsContext287 extends Omit<PolicyReadContext287,'cwd'> {
 cwd:string|null;projectConfigDir?:string;flagInline:Record<string,unknown>|null
 flagPath?:string;flagExpectedContent?:string;coworkPlugins:boolean
 canonicalGitRoot(path:string):string|null
 onLegacyLocalSettingsRead(site:string):void
}
export interface OriginalSettingsReader287 {
 NoProjectError:new()=>Error
 canonicalGitRoot(path:string):string|null
 context():OriginalSettingsContext287;heldContext():OriginalSettingsContext287
 compare():'same'|'changed'
 snapshot(overrides?:Map<string,NativeParsedSettings287>):Map<SettingSource,NativeParsedSettings287>
 engage():{changedSinceLast:boolean;release():{last:boolean;edited:SettingSource[]}}
 path(source:SettingSource,context:OriginalSettingsContext287):string|undefined
 legacyPath(context:OriginalSettingsContext287):string|undefined
 source(source:SettingSource,context:OriginalSettingsContext287):SettingsJson|null
 unfiltered(source:SettingSource,context:OriginalSettingsContext287,options?:{includeLegacyLocalSettings?:boolean}):SettingsJson|null
 errors(source:SettingSource,context:OriginalSettingsContext287):ValidationError[]
 directory(source:SettingSource,context:OriginalSettingsContext287):string
 isConfigDirectory(path:string):boolean
 relativePath(source:'projectSettings'|'localSettings'):string
}
export function createSettingsReader287(ports:Record<string,unknown>):OriginalSettingsReader287
