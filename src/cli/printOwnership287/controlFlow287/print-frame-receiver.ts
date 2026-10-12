import type {ControlFrame287,PrintControlFlow287,PollEventUb287,TurnHandoffQe287,PrintControlResponse287} from './runtime.js'

type Reply287=(response:PrintControlResponse287)=>void

/** Three exact native handlers called by the one existing print dispatcher. */
export async function receiveOriginalControl287(input:{
  frame:ControlFrame287;flow:PrintControlFlow287;pollUb:Omit<PollEventUb287,'reply'>
  handoffQe:TurnHandoffQe287;rewind: (frame:ControlFrame287)=>Promise<void>
  reply:(frame:ControlFrame287,response:Parameters<Reply287>[0])=>void
}):Promise<'handled'|'not-owned'> {
  const {frame,flow,pollUb,handoffQe,rewind,reply}=input
  switch(frame.request.subtype){
    case 'poll_event':
      flow.pollEvent(frame.request,{...pollUb,reply:response=>reply(frame,response)})
      return 'handled'
    case 'rewind_conversation':
      await rewind(frame)
      return 'handled'
    case 'turn_handoff':
      flow.turnHandoff(frame.request,handoffQe,response=>reply(frame,response))
      return 'handled'
    default:
      return 'not-owned'
  }
}

// Existing main loop insertion (sole dispatcher remains print.ts):
// const disposition=await receiveOriginalControl287(...);
// if(disposition==='handled')continue;
