import {createAtomicWriter287 as darwinArm64} from './native.js'
import {createAtomicWriter287 as darwinX64} from './darwin-x64/native.js'
import {createAtomicWriter287 as linuxArm64} from './linux-arm64/native.js'
import {createAtomicWriter287 as linuxX64} from './linux-x64/native.js'
import {createAtomicWriter287 as win32Arm64} from './win32-arm64/native.js'
import {createAtomicWriter287 as win32X64} from './win32-x64/native.js'
const factories={'darwin-arm64':darwinArm64,'darwin-x64':darwinX64,'linux-arm64':linuxArm64,'linux-x64':linuxX64,'win32-arm64':win32Arm64,'win32-x64':win32X64}
export function createPlatformAtomic287(platform:string,arch:string,ports:Parameters<typeof darwinArm64>[0]){
 const factory=factories[`${platform}-${arch}` as keyof typeof factories]
 if(!factory)throw Error(`Unsupported original atomic platform ${platform}-${arch}`)
 return factory(ports)
}
