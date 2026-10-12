// Runtime subpath used by the existing approval view. Type restoration is
// separate; do not synthesize broad `any` interfaces to claim typecheck parity.
export { DEFAULT_GRANT_FLAGS } from '../src/vendor/official-desktop/index.js'
export type {
  CuPermissionRequest, CuPermissionResponse, CoordinateMode, CuSubGates,
  Logger,
} from '../src/vendor/official-desktop/nativeTypes.js'
