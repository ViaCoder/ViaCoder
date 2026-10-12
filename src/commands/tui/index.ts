import type {Command} from '../../types/command.js'
export default {type:'local-jsx',name:'tui',description:'Change the terminal renderer',load:()=>import('./tui.js')} satisfies Command
