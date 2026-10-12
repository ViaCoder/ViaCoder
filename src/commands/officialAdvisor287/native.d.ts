import type {Command} from '../../types/command.js'
import type {LocalCommandModule} from '../../types/command.js'
import type {BtwPrefixContext287} from '../../utils/officialBtwPrefix287/native.js'
export type AdvisorCanonicalReader287=(file:string)=>Readonly<Record<string,unknown>>
export function createAdvisorOriginalCall287(read:AdvisorCanonicalReader287):(args:string,context:BtwPrefixContext287)=>Promise<{type:'text';value:string}>
export function createAdvisorOriginalRegistration287(ports:{Ce():boolean;AE():boolean;V6():string[];loadAdvisor287():Promise<LocalCommandModule>}):Command
