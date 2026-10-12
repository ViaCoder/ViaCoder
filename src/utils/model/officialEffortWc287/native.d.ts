import type {EffortLevel} from '../../../entrypoints/sdk/runtimeTypes.js'
import type {EffortSettings} from '../effortSettings.js'
import type {SettingSource} from '../../settings/constants.js'
import type {ZodType} from 'zod/v4'
export type OfficialEffortWc287Result=EffortLevel|number|undefined
export type OfficialEffortWc287HelpersImports={Be(model:string,options?:{identity?:boolean}):string;le():{modelAccessCache?:readonly {apiName?:string;entitled?:boolean;maxEffortLevel?:string|null}[]|null|undefined}}
export function createOfficialEffortWc287Helpers287(imports:OfficialEffortWc287HelpersImports):Pick<OfficialEffortWc287Ports,'Ct'|'Jm'|'V0'|'Z'|'Ape'>
export type OfficialEffortWc287NyImports={zQe(capability:string,model:string):boolean|undefined;xa(model:string):{capabilities?:readonly string[]}|undefined;servedCapabilityLookup(capability:string,models:readonly string[]):boolean|undefined;featureGateLookup(name:string):boolean|undefined}
export function createOfficialEffortWc287Ny287(imports:OfficialEffortWc287NyImports):(canonicalModel:string,capability:string,model:string)=>boolean|undefined
export type OfficialEffortWc287Ports={
 a:Readonly<{CLAUDE_CODE_ALWAYS_ENABLE_EFFORT?:string;CLAUDE_CODE_MAX_EFFORT_REMINDER?:string;ANTHROPIC_DEFAULT_FABLE_MODEL?:string;CLAUDE_CODE_EFFORT_LEVEL?:string}>
 Ape():readonly {apiName:string;entitled:boolean;maxEffortLevel?:string|null}[]
 Be(model:string,options?:{identity?:boolean}):string
 bkn(model:string):boolean
 bu():readonly (EffortSettings|undefined)[]
 cc(model:string):string
 cQn(...models:string[]):readonly string[]|undefined
 Ct(model:string):string
 d(error:Error):void
 Dbe(model:string,capability:string):boolean|undefined
 de:typeof import('zod/v4').z.record
 ge(source:SettingSource):EffortSettings|null|undefined
 gt(value:string,parseOptions?:boolean):unknown
 He():string
 Jm(model:string):string
 JU():{carriedEffort?:EffortLevel|number;fallbackModel?:string}|undefined
 k(name:string,fallback:string):string
 k(name:string,fallback:boolean):boolean
 k(name:string,fallback:Readonly<Record<string,string|boolean|undefined>>):Readonly<Record<string,string|boolean|undefined>>
 Kc():string|null|undefined
 nu:readonly EffortLevel[]
 ny(canonicalModel:string,capability:string,model:string):boolean|undefined
 o:typeof import('zod/v4').z.string
 Rt(model:string):string
 se():ZodType
 UVo(...models:string[]):string|undefined
 V0(model:string):string
 Xo():readonly SettingSource[]
 xa(model:string):{default_effort?:string}|undefined
 Z(error:unknown):Error
 Z7e():{name:string;default_effort_level?:string|null;override_user_effort?:boolean}|null
 zF(provider?:string):boolean
 zQe(capability:string,model:string):boolean|undefined
}
export function createOfficialEffortWc287(ports:OfficialEffortWc287Ports):(model:string,effort:EffortLevel|number|undefined,turnEffort?:EffortLevel|number)=>OfficialEffortWc287Result
export interface OfficialRequestEffortOptions287 {turnEffort?:EffortLevel|number;hookEffortValue?:EffortLevel|number;carriedEffort?:EffortLevel|number|null}
export interface OfficialEffortResolver287 {requestLevel(model:string,effort:EffortLevel|number|undefined,options?:OfficialRequestEffortOptions287):OfficialEffortWc287Result;resolve:ReturnType<typeof createOfficialEffortWc287>;hookLevel(model:string,effort:EffortLevel|number|undefined,turnEffort?:EffortLevel|number):EffortLevel;supports(model:string):boolean}
export function createOfficialEffortResolver287(ports:OfficialEffortWc287Ports):OfficialEffortResolver287
