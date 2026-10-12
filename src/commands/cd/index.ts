import type {Command} from '../../types/command.js'
export default {type:'local-jsx',name:'cd',description:'Change the working directory of the current session',load:()=>import('./cd.js')} satisfies Command
