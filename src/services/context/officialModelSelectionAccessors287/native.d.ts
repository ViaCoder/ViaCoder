export type ModelSelectionValue287=string|null|undefined
export interface ModelSelection287 {
 mainLoopModelOverride():ModelSelectionValue287
 overrideMainLoopModel(value:ModelSelectionValue287):void
 initialMainLoopModel():ModelSelectionValue287
 replaceInitialMainLoopModel(value:ModelSelectionValue287):void
}
export interface ModelSelectionAccessorRuntime287 {
 getMainLoopModelOverride():ModelSelectionValue287
 getInitialMainLoopModel():ModelSelectionValue287
 setMainLoopModelOverride(value:ModelSelectionValue287):void
 setInitialMainLoopModel(value:ModelSelectionValue287):void
}
export function createModelSelectionAccessors287(ports:{executionContext():{modelSelection:ModelSelection287}}):ModelSelectionAccessorRuntime287
