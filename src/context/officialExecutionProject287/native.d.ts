import type {ReactNode} from 'react'
import type {ExecutionSession287,ExecutionProject287,ExecutionHost287} from '../../services/context/officialExecutionOwners287/native.js'
export interface ExecutionProjectContext287{
 SessionProvider(props:{session:ExecutionSession287;children:ReactNode}):ReactNode;
 HostProjectProvider(props:{host:ExecutionHost287;project:ExecutionProject287;children:ReactNode}):ReactNode;
 useHost():ExecutionHost287;
 useProject<T>(selector:(project:ExecutionProject287)=>T):T;
 useOptionalSession():ExecutionSession287|undefined;
 useSession():ExecutionSession287;
 useSession<T>(selector:(session:ExecutionSession287)=>T):T;
}
export function createExecutionProjectContext287(ports:Record<string,unknown>):ExecutionProjectContext287;
