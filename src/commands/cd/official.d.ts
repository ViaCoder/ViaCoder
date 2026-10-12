export function createCdFunctions(deps:Record<string,unknown>):{relocate(storage?:unknown):Promise<void>;validate(path:string,context:unknown):Promise<any>}
export function createCdValidation(deps:Record<string,unknown>):(path:string,context:unknown)=>Promise<any>
export function createCdCommand(deps:Record<string,unknown>):(done:unknown,context:unknown,args:string)=>Promise<unknown>
