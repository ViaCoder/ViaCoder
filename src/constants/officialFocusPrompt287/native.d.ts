export interface FocusPrompt287Ports {
 lean(model:string):boolean
 nonInteractive():boolean
 execution():{host:object}
 sections():Map<string,string|null>
 noteInvalidation(reason:string):void
 flagSettings():Record<string,unknown>|null
 setFlagSettings(value:Record<string,unknown>|null):void
 settingsForSource(source:'flagSettings'):{viewMode?:'focus'|'default'}|null
 settings():{viewMode?:'focus'|'default'}
 globalConfig():{briefTranscript?:boolean}
 settingsChangeDetector:{notifyChange(source:'flagSettings'):void}
}
export interface FocusPrompt287 {
 guidance(model:string):string|null
 enabled():boolean
 invalidate():void
 override(mode:'focus'|'default'|null):void
 signal():{subscribe(callback:()=>void):()=>void;emit():void;clear():void}
}
export function createOfficialFocusPrompt287(ports:FocusPrompt287Ports):FocusPrompt287
