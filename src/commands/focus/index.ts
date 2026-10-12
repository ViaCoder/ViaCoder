import type { Command } from '../../types/command.js'

export default {
  type:'local-jsx',name:'focus',
  description:'Toggle focus view: just your prompt, summary, and response',
  immediate:true,
  load:()=>import('./focus.js'),
} satisfies Command
