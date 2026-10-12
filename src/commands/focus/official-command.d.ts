export function createCommands(deps:Record<string,unknown>):{
  interactive():Promise<{call(done:unknown,context:unknown):Promise<null>}>
  text(args:string,context:unknown):Promise<{type:'text';value:string}>
}
