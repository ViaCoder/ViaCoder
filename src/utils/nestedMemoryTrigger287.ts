/** Original Ml contexts use an ordered, de-duplicated array. Existing C
 * contexts use a Set. Mutate the caller's collection, never replace/copy it. */
export type NestedMemoryTriggers287=string[]|Set<string>
export function recordNestedMemoryTrigger287(triggers:NestedMemoryTriggers287|undefined,path:string):void {
 if(Array.isArray(triggers)){
  if(!triggers.includes(path))triggers.push(path)
 }else triggers?.add(path)
}
export function hasNestedMemoryTriggers287(triggers:NestedMemoryTriggers287|undefined):boolean {
 return triggers!==undefined&&(Array.isArray(triggers)?triggers.length:triggers.size)>0
}
export function clearNestedMemoryTriggers287(triggers:NestedMemoryTriggers287):void {
 if(Array.isArray(triggers))triggers.length=0
 else triggers.clear()
}
