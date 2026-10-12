import type {Command} from '../../commands.js'
import {getScrollSpeedRuntime287} from './runtime287.js'
// Keep original ZYo gates live; evaluating at import would freeze fullscreen/attacher state.
const scrollSpeed={
 type:'local-jsx',name:'scroll-speed',description:'Adjust mouse wheel scroll speed',
 isEnabled:()=>getScrollSpeedRuntime287().registration.isEnabled(),
 load:()=>import('./scrollSpeed.js'),
} satisfies Command
export default scrollSpeed
