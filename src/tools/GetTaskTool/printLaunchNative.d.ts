export interface PrintTaskLaunchMethods287 {
  singleShotPrintSession():boolean
  replaceSingleShotPrintSession(value:boolean):void
  printInputClosed():boolean
  markPrintInputClosed():void
}
export interface PrintTaskLaunchPorts287 {
  executionContext():{host:{launchOptions:PrintTaskLaunchMethods287}}
}
export interface PrintTaskLaunchNative287 {
  initialize(input:string|AsyncIterable<string>,options:{sdkUrl?:string}):void
  singleShot():boolean
  markInputClosed():void
  inputClosed():boolean
}
export function createPrintTaskLaunchNative287(ports:PrintTaskLaunchPorts287):PrintTaskLaunchNative287
