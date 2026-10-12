import type { Command } from '../../commands.js'
import {getIsNonInteractiveSession} from '../../bootstrap/state.js'
import {isPolicyAllowed} from '../../services/policyLimits/index.js'
import {module9} from '../../utils/claudeInChrome/officialMenu287/native.js'

// Complete fixed 287 Ker/L8t descriptor, resolved without importing the
// menu/Ink dependency closure while the canonical cleanup owner is booting.
// Both gates still read their actual owners, not a replacement namespace.
const original = module9({get(file,name){
  if(file==='chunk-bn3p37gv.js'&&name==='Ce')return getIsNonInteractiveSession
  if(file==='chunk-09m4fzsj.js'&&name==='sk')return ()=>isPolicyAllowed('allow_claude_browser_extension')
  throw Error('Chrome command descriptor dependency missing '+file+':'+name)
},module(){throw Error('No native module imports in Chrome registration')}})
const command: Command = {...original.L8t,load:()=>import('./chrome.js')}
export default command
