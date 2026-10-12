import type {OfficialQuestionView287,OfficialQuestionState287} from './native.js'
export interface OriginalAskSelectionPorts287 {
 Wt:Record<string,Record<string,unknown>>;qe:OfficialQuestionView287[];cn:Record<string,string>;
 fs(origin:'user'|'afk'):boolean;Or:{current:{question:string;answer:string}|null};
 Pr(answers:Record<string,string>):Promise<boolean|void>;
 er:OfficialQuestionState287['updateQuestionState'];Gn:OfficialQuestionState287['setAnswer'];
 uto(value:unknown):boolean;vit(values:string[]):string;rXe(question:OfficialQuestionView287,value:string):string;
 mto(error:unknown):false;Dr:{current:boolean};d(error:unknown):void
}
export function createOriginalAskSelection287(ports:OriginalAskSelectionPorts287):(question:string,value:string|string[],textInput?:string,advance?:boolean)=>void
export function createOriginalAskFinal287(ports:Pick<OriginalAskSelectionPorts287,'fs'|'Pr'|'cn'|'Dr'|'d'>&{Ur():void;X():boolean}):(action:string)=>void

export function createOriginalAskCancel287(ports:{N(value:{behavior:"deny"}):boolean;Zt:boolean;Ie?:string;qe:unknown[];i(event:string,metadata:Record<string,unknown>):void;an(value:string):string}):()=>void
