import type {ToolUseContext} from '../../../Tool.js'
import type {KeybindingBlock} from '../../../keybindings/types.js'
import type {StorageV5Key} from '../../../utils/secureStorage/storageV5.js'
export type KeybindingsContext287=Pick<ToolUseContext,'storageV5'>
export type KeybindingsResult287={type:'text';value:string}
export interface KeybindingsPorts287 {
 P:new(message:string,displayMessage?:string)=>Error
 E(error:unknown):string|undefined
 yr():boolean;Mg():string
 _(value:unknown,replacer:null,space:number):string
 ae():Pick<ReturnType<typeof import('../../../utils/fsOperations.js').getFsImplementation>,'mkdir'>
 C0:KeybindingBlock[]
 mRe:readonly {key:string}[]
 R1e(key:string):string
 Vq():boolean;i$t():string;i1r:StorageV5Key
 ate:typeof import('../../../utils/promptEditor.js').editFileInEditor
 it(error:unknown):string
 c:typeof import('fs/promises').writeFile
 f:typeof import('path').dirname
}
export declare function createKeybindingsText287(ports:KeybindingsPorts287):{
 call(args:string,context:KeybindingsContext287):Promise<KeybindingsResult287>
 generateTemplate():string
 filterReserved(blocks:KeybindingBlock[]):KeybindingBlock[]
}
