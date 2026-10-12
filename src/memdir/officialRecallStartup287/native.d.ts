import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
export interface RecallStartupPorts287 {
 o:ExecutionSession287
 importRecall287():Promise<{maybePrewarmRecallIndex(session:ExecutionSession287):void}>
}
export function createRecallStartupConsumer287(ports:RecallStartupPorts287):()=>Promise<void>
