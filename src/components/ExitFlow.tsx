import {getOrdinaryExit287} from '../commands/exit/ordinaryExitRuntime287.js';
export type OrdinaryExitProps287={showWorktree:boolean;backgroundItems?:any[];messages?:any;getMessages?:()=>any;getIsMidTurn?:()=>boolean;getIsResponseStreaming?:()=>boolean;isMidTurn?:boolean;onDone:(message?:string)=>void;onCancel?:()=>void;onBeforeExit?:()=>unknown};
export function ExitFlow(props:OrdinaryExitProps287){return getOrdinaryExit287().ExitFlow({...props,backgroundItems:props.backgroundItems??[]});}
