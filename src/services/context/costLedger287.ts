import {getExecutionSession287} from './execution287.js'
import type {CostLedger287,CostLedgerOwner287} from './officialExecutionOwners287/native.js'

export type {CostLedgerOwner287} from './officialExecutionOwners287/native.js'

// The bootstrap installer can retain this accessor, not a captured owner.
// The existing execution root reset then needs no additional reset callback.
export function getExecutionCostOwner287():CostLedgerOwner287 {
 return getExecutionSession287()
}

// Use the existing execution owner, including its shared project-fork ledger.
// No independent ledger, identity transition, counter, or reset policy here.
export function getExecutionCostLedger287():CostLedger287 {
 return getExecutionCostOwner287().costLedger
}
