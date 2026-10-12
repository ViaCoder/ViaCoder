/** Exact wire fields emitted by fixed-287 hI's public UI producers. */
export interface UiInstance287 {surface:string;component:string;instance_id:string}
export interface UiDecoration287 {start:number;end:number;color?:string;backgroundColor?:string;dimColor?:boolean;bold?:boolean;italic?:boolean;underline?:boolean;strikethrough?:boolean}
export type UiHostRequest287=
 |{subtype:'ui_copy';surface:string;client_id:string;plugin:string;text:string}
 |{subtype:'ui_prompt_read';surface:string;client_id:string}
 |{subtype:'ui_prompt_fill';surface:string;client_id:string;text:string;mode:'replace'|'append'|'insert';decorations?:UiDecoration287[]}
 |{subtype:'ui_prompt_suggest';surface:string;client_id:string;text:string}
export type UiSystemEvent287={type:'system'}&(
 |{subtype:'ui_toast';plugin:string;text:string;timeout_ms:number}
 |{subtype:'ui_status';plugin:string;text:string|null}
 |{subtype:'ui_invalidate';event:'ui.render';instances?:UiInstance287[]}
 |{subtype:'ui_log';plugin:string;text:string}
 |{subtype:'ui_panes';panes:{id:string;title:string;plugin:string;close_on_escape?:true;hold_toasts?:true;rows?:number;columns?:number}[];shown_id:string|null;focused_id:string|null;focus_requested_id:string|null}
 |{subtype:'ui_scroll';client_id:string;component:'Pane'|'AbovePrompt';instance_id:string;offset:number;follow_end?:boolean}
 |{subtype:'ui_focus';client_id:string;component:'Pane'|'AbovePrompt';instance_id:string;plugin:string;key:string})
