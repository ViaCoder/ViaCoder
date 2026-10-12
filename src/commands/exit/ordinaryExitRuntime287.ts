import {gracefulShutdown} from '../../utils/gracefulShutdown.js';
import {createOrdinaryExit287} from './ordinaryExit287.js';
import {publicCommandSourcePort287 as read} from '../../utils/commandCompletionProducers287.js';
import {getWorktreeState287} from '../../utils/officialWorktreeState287.generated.js';
import {setOriginalCwd} from '../../bootstrap/state.js';
import {ExitFlow} from '../../components/ExitFlow.js';
import {WorktreeExitDialog} from '../../components/WorktreeExitDialog.js';
// Only stateless function collection is cached. Canonical QGn/APo shutdown is
// already host-scoped; the public root adapter installs the same terminal C hooks.
let functions:ReturnType<typeof createOrdinaryExit287>|undefined;
export function getOrdinaryExit287(){return functions??=createOrdinaryExit287(read,{storage:require('../../utils/sessionStorage.js'),worktreeState:getWorktreeState287,projectSetter:setOriginalCwd,shutdown:gracefulShutdown,ExitFlow,WorktreeExitDialog});}
