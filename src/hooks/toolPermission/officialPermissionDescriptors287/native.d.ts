import type {Question} from '../../../tools/AskUserQuestionTool/AskUserQuestionTool.js'
import type {QuestionState} from '../../../components/permissions/AskUserQuestionPermissionRequest/use-multiple-choice-state.js'
import type {ToolUseConfirm} from '../../../components/permissions/PermissionRequest.js'
export interface OfficialQuestionView287 {
 key:string;displayQuestion:{text:string;needsGutter:boolean};displayBody:string[];displayHeader:string;multiSelect:boolean;
 options:{value:string;displayLabel:string;displayDescription:string;preview?:{kind:'full';markdown:string}|{kind:'withheld'}}[]
}
export interface OfficialPermissionDescriptor287 {
 requestId:string;toolName:string;input:Record<string,unknown>;description:string;permissionResult:ToolUseConfirm['permissionResult'];
 userFacingName:string;renderedToolUseMessage:unknown;showAlwaysAllow:boolean;requestSource?:{type:string;agentName?:string};
 questions?:Question[];metadataSource?:string;isEngineConfirm?:boolean;[key:string]:unknown
}
export interface OfficialQuestionState287 {
 currentQuestionIndex:number;answers:Record<string,string>;questionStates:Record<string,QuestionState>;isInTextInput:boolean;
 nextQuestion():void;prevQuestion():void;updateQuestionState(key:string,patch:Partial<QuestionState>,multi:boolean):void;
 setAnswer(key:string,answer:string,advance?:boolean):void;setTextInputMode(value:boolean):void
}
export interface OfficialPermissionDescriptors287 {
 display:{km(text:string):string;wl(text:string):string;Ks(text:string):string;LH:number;pj(text:string|undefined):boolean;UG(text:string):boolean;J_n(text:string,display:string,changed?:boolean):string;CBe:number;re(text:string,length:number):string;nt(text:string,length:number):string;xn(text:string):string}
 Ti(text:unknown):{text:string;needsGutter:boolean};h_(text:string):boolean;
 Pt(input:Record<string,unknown>):Promise<Record<string,unknown>>;
 Yze(input:Record<string,unknown>):Promise<OfficialPermissionDescriptor287>;
 R6(updates:import('../../../utils/permissions/PermissionUpdateSchema.js').PermissionUpdate[],tool:ToolUseConfirm['tool'],context:import('../../../Tool.js').ToolPermissionContext):import('../../../utils/permissions/PermissionUpdateSchema.js').PermissionUpdate[];
 x6(updates:import('../../../utils/permissions/PermissionUpdateSchema.js').PermissionUpdate[]):import('../../../utils/permissions/PermissionUpdateSchema.js').PermissionUpdate[];
 an(text:string):string;
 DO(input:Record<string,unknown>):OfficialPermissionDescriptor287;
 Ao(input:Record<string,unknown>):OfficialPermissionDescriptor287;
 Qe(context:Record<string,unknown>):OfficialPermissionDescriptor287['requestSource'];
 UY(questions:Question[],engineConfirm?:boolean):OfficialQuestionView287[];
 rXe(question:OfficialQuestionView287,value:string):string;
 vit(values:string[]):string;
 uto(value:unknown):boolean;
 mto(error:unknown):false;
 oge():OfficialQuestionState287;
 WZt(state:Pick<OfficialQuestionState287,'currentQuestionIndex'|'answers'|'questionStates'|'isInTextInput'>,action:Record<string,unknown>):Pick<OfficialQuestionState287,'currentQuestionIndex'|'answers'|'questionStates'|'isInTextInput'>
}
export function createOfficialPermissionDescriptors287(ports:Record<string,unknown>):OfficialPermissionDescriptors287
