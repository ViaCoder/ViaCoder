import type {Command,Option} from '@commander-js/extra-typings'
import type {createPublicSubcommandWrappers287} from '../publicSubcommandRegistration287.js'
import type {AgentsCommandHandler287} from './native.js'
export function registerAgentsCommand287(program:Command,option:typeof Option,withHandles:ReturnType<typeof createPublicSubcommandWrappers287>['withHandles'],loadHandler:()=>Promise<{agentsCommandHandler:AgentsCommandHandler287}>):void
