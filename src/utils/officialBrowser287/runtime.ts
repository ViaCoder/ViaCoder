import {createBrowserOpener287,type BrowserOpener287} from './source.js'
import {publicCommandSourcePort287 as read} from '../commandCompletionProducers287.js'
// Cache only the stateless source functions. Capability and environment readers
// remain the original live host-scoped owners; no browser settings are copied.
let opener:BrowserOpener287|undefined
export function getBrowserOpener287():BrowserOpener287 {
 return opener??=createBrowserOpener287(`${process.platform}-${process.arch}`,{
  capabilities:read('chunk-bn3p37gv.js','Xd'),
  environment:read('chunk-mbfze585.js','a'),
  platform:read('chunk-amhtwhch.js','O'),
  execute:read('chunk-fmv8bhm3.js','Ke'),
 })
}
