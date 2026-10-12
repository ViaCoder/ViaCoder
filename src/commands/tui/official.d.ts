export function createTuiCommand(deps:Record<string,unknown>):(done:unknown,context:unknown,args:string)=>Promise<unknown>
export function createTuiCarry(deps:Record<string,unknown>):{resolve(options:any,resolve:(s:string)=>string):any;argv(options:any):string[];restricted(options:any):boolean}

export function createRestartTaskPredicate287(read:(module:string,name:string)=>unknown):(tasks:Record<string,unknown>)=>boolean
export function jP(context:any):any
export function pue(context:any):boolean
