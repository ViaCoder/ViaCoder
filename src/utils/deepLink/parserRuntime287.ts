import {createDeepLinkParser287,type DeepLinkParserPorts287} from '../officialDeepLinkParser287/native.js'
import {filesystemPathRuntime287} from '../filesystemPathRuntime287.js'
import {getFsImplementation} from '../fsOperations.js'
import {TelemetrySafeError_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS} from '../errors.js'
import {OFFICIAL_MARKETPLACE_SOURCE} from '../plugins/officialMarketplace.js'
export function createDeepLinkParserPorts287():DeepLinkParserPorts287 {
 return {
  SafeError:TelemetrySafeError_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  isUnc:filesystemPathRuntime287.isUncPath,
  hasParent(value){return ((require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-x954y317.js').By as (path:string)=>boolean)(value)},
  isNetwork(value){return ((require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-x954y317.js').pm as (path:string)=>boolean)(value)},
  ancestry:filesystemPathRuntime287.ancestry,
  filesystem:getFsImplementation(),
  sanitize(value){return ((require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-6re9qmwv.js').IQr as (text:string)=>string)(value)},
  marketplace:OFFICIAL_MARKETPLACE_SOURCE,
  githubSlug:{test(value){return ((require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-hrhfcbdv.js').JSt as RegExp).test(value)}},
  officialMarketplace(source){return ((require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-hrhfcbdv.js').sZe as (source:string)=>boolean)(source)},
 }
}
export const deepLinkParser287=createDeepLinkParser287(createDeepLinkParserPorts287())
