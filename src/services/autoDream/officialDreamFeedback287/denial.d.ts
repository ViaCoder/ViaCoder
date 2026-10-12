import type {PermissionAskDecision,PermissionDenyDecision} from '../../../types/permissions.js'
export type DreamToolDenialKind287='user-rejected'|'automode-unavailable'|'automode-parsing-error'|'automode-blocked'|'permission-rule'
export declare function classifyDreamToolDenial287(decision:PermissionAskDecision|PermissionDenyDecision):DreamToolDenialKind287;

