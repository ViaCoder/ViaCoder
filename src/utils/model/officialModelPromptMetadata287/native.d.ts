export interface ModelPromptIdentity287 {modelId:string;marketingName:string|null;knowledgeCutoff:string|null}
export interface ModelPromptMetadataPorts287 {
 Be(model:string,options?:{identity?:boolean}):string
 He():string
 xa(model:string):{display_name?:string;knowledge_cutoff?:string}|undefined
}
export interface ModelPromptMetadata287 {
 marketingName(model:string):string|undefined
 knowledgeCutoff(model:string):string|null
 identity(model:string):ModelPromptIdentity287
 text(identity:ModelPromptIdentity287):string
}
export function createModelPromptMetadata287(ports:ModelPromptMetadataPorts287):ModelPromptMetadata287
