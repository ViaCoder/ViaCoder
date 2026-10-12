import type * as fs from 'node:fs'
import type * as path from 'node:path'
import type * as os from 'node:os'
export type GitMarker286 = (marker: string, parent: string) => boolean
export interface GitMarkerPorts286 {
 fs: Pick<typeof fs,'lstatSync'|'statSync'|'readlinkSync'>
 path: typeof path
 os: Pick<typeof os,'homedir'>
}
export declare function createGitMarker286(ports: GitMarkerPorts286): GitMarker286
