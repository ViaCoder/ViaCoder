import type {SDKControlRequest} from '../../entrypoints/sdk/controlTypes.js'
export type PrintFileControlNativePorts287 = Record<string, unknown> & {loadCanonicalModule287(file:string):Promise<Readonly<Record<string,unknown>>>}
export type PrintFileControlNative287 = {
  dispatch(message:SDKControlRequest):Promise<boolean>
  helpers:{qb(message:unknown,request:unknown):Promise<void>;Wb(message:unknown,request:unknown):Promise<void>}
}
export function createPrintFileControlNative287(ports:PrintFileControlNativePorts287):PrintFileControlNative287
