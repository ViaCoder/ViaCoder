import * as fs from 'node:fs'
import * as path from 'node:path'
import * as os from 'node:os'
import {createGitMarker286 as darwinArm64} from './darwin-arm64.js'
import {createGitMarker286 as darwinX64} from './darwin-x64.js'
import {createGitMarker286 as linuxArm64} from './linux-arm64.js'
import {createGitMarker286 as linuxX64} from './linux-x64.js'
import {createGitMarker286 as win32Arm64} from './win32-arm64.js'
import {createGitMarker286 as win32X64} from './win32-x64.js'
import type {GitMarker286,GitMarkerPorts286} from './contract.js'

export function createPlatformGitMarker286(
 platform: string = process.platform,
 arch: string = process.arch,
 ports: GitMarkerPorts286 = {fs,path,os},
): GitMarker286 {
 const factories={
  'darwin-arm64':darwinArm64,'darwin-x64':darwinX64,
  'linux-arm64':linuxArm64,'linux-x64':linuxX64,
  'win32-arm64':win32Arm64,'win32-x64':win32X64,
 }
 const factory=factories[`${platform}-${arch}` as keyof typeof factories]
 if(!factory)throw new Error(`Unsupported Git marker platform: ${platform}-${arch}`)
 return factory(ports)
}

export const isOfficialGitMarker286=createPlatformGitMarker286()
