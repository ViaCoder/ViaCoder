import {createArgumentsComplete287,createLookupComplete287,createAliasComplete287} from './officialPublicCommandDiscovery287/completions.js'
import {createSync287} from './officialPublicCommandDiscovery287/native.js'
import {getCommandName} from '../types/command.js'
// Original lookup/alias helpers have no state. Registry and the command objects
// themselves are passed by the actual caller, not copied to a second table.
export const commandArgumentLookup287=createLookupComplete287({Lo:getCommandName})
export const commandArgumentCompletions287=createArgumentsComplete287({
 ...commandArgumentLookup287,...createAliasComplete287(createSync287({})),
})
