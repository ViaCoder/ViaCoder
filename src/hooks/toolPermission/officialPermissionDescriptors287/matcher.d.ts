import type {Tool,ToolUseContext} from '../../../Tool.js'
import type {OfficialPermissionDescriptor287} from './native.js'
export interface PublicPermissionMatcher287 {
 matches(tool:Tool):boolean;
 dialog:Parameters<NonNullable<ToolUseContext['requestDialog']>>[0];
 build(input:Record<string,unknown>):OfficialPermissionDescriptor287;
}
export interface PublicPermissionMatchers287 {
 Ymr(tool:Tool):PublicPermissionMatcher287|undefined;
 Ft:PublicPermissionMatcher287[];
}
export function createPublicPermissionMatcher287(ports:Record<string,unknown>):PublicPermissionMatchers287
