import {publicCommandSourcePort287} from '../utils/commandCompletionProducers287.js'
// Complete fixed287 readers share the same credential and policy owners as
// registration, command execution and LL. No independent compile-time kill gate.
function reader(name:'i3n'|'a3n'|'s9e'):()=>boolean{
 return publicCommandSourcePort287('chunk-09m4fzsj.js',name) as ()=>boolean
}
export function hasVoiceAuth():boolean{return reader('i3n')()}
export function isVoiceGrowthBookEnabled():boolean{return reader('a3n')()}
export function isVoiceModeEnabled():boolean{return reader('s9e')()}
