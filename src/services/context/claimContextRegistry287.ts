import {createPrintClaimContextRegistry287} from '../../cli/printOwnership287/native.js'
import {executionSessionRegistryConstructor287} from './execution287.js'

// The existing original qI allocator has one production initialization boundary.
// Both the print/context facade and canonical interactive closure borrow it.
// No Memory builder, settings reader, or lifecycle namespace is initialized here.
export const claimContextRegistry287 = createPrintClaimContextRegistry287(
  executionSessionRegistryConstructor287,
)
