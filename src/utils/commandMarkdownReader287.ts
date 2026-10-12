import type {MarkdownFile,ClaudeConfigDirectory} from './markdownConfigLoader.js'
import {publicCommandSourcePort287} from './commandCompletionProducers287.js'
// Phe/GRn are the complete existing source functions in the canonical Mods
// namespace. They own ro.markdownFiles; this adapter has no queue/Map/cache.
type OriginalMarkdownReader287=(kind:ClaudeConfigDirectory,cwd:string|null,storageV5?:unknown)=>Promise<MarkdownFile[]>
export function getPublicMarkdownReader287():OriginalMarkdownReader287{
 return publicCommandSourcePort287('chunk-mphp7acd.js','Phe') as OriginalMarkdownReader287
}
export function getPublicMarkdownScan287():OriginalMarkdownReader287{
 return publicCommandSourcePort287('chunk-mphp7acd.js','GRn') as OriginalMarkdownReader287
}
export function loadPublicMarkdownFiles287(kind:ClaudeConfigDirectory,cwd:string|null,storageV5?:unknown):Promise<MarkdownFile[]>{
 return getPublicMarkdownReader287()(kind,cwd,storageV5)
}
export const markdownFilesCache287={clear(){
 const registry=(require('./commandCapability287.js') as typeof import('./commandCapability287.js')).getCommandRegistry287()
 registry.markdownFiles.clear()
}}
