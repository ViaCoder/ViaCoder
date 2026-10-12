export function createFocusProjection(deps:Record<string,unknown>):{
  project(messages:unknown[],tools:readonly unknown[],stats?:unknown,loading?:boolean,options?:unknown):unknown[]
  hasWork(messages:readonly unknown[]):boolean
}
