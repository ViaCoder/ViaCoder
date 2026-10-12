import {createPrintChromeControlNative287,type ChromeControlGetter287} from './chromeControlNative.js'
import {getPrintHostSource287} from './publicHostRuntime287.js'
import {importPrintChromeModule287} from './chromeControlDynamicTransport287.js'
/** Original three branch bodies, with the existing session/client/scheduler/
 * writer as ports. No Chrome client, browser cache or permission owner copied. */
export function createPrintChromeControl287(host:Omit<ChromeControlGetter287,'get'|'importPublic'>) {
 return createPrintChromeControlNative287({
  ...host,
  get:(async(file:string,name:string)=>getPrintHostSource287(file,name)) as ChromeControlGetter287['get'],
  importPublic:importPrintChromeModule287,
 })
}
