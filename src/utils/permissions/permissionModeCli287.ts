import {InvalidArgumentError} from '@commander-js/extra-typings'
import {createPermissionModeCli287} from './officialPermissionModeCli287/native.js'

// Keep CLI aliases out of the internal/SDK enum. Existing access gates still
// decide whether a parsed mode is available to this session.
const official = createPermissionModeCli287(InvalidArgumentError)
export const PERMISSION_MODE_CLI_CHOICES = official.choices
export const parsePermissionModeCLI = official.parse
export const normalizePermissionModeAlias = official.normalize
export const findPermissionMode = official.find
