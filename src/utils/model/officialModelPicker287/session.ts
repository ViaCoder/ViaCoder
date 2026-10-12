import {createSelectorSession287,createSelectorRunning287} from './selector.native.js'
import {getOfficialModelMenuPolicy287,getOfficialModelReprobeRuntime287} from '../officialModelPicker287.js'
import {parseUserSpecifiedModel} from '../model.js'
export function createModelSessionControllerPorts287():Record<string,unknown>{
 const policy=(name:string)=>(...args:unknown[])=>{const fn=getOfficialModelMenuPolicy287()[name];if(typeof fn!=='function')throw Error('Unbound session model policy '+name);return fn(...args)}
 return {El:()=>getOfficialModelMenuPolicy287().El(),Rt:parseUserSpecifiedModel,
  $H:policy('$H'),$r:(model:string)=>getOfficialModelMenuPolicy287().$r(model),Ct:(model:string)=>model.replace(/\[1m\]/gi,''),
  Yyt:policy('Yyt'),Kw:policy('Kw'),Fk:policy('Fk'),Iy:policy('Iy'),
  uQn:(model:string)=>getOfficialModelReprobeRuntime287().uQn(model),pQn:(model:string)=>getOfficialModelReprobeRuntime287().pQn(model)}
}
export const sourceModelSessionController287=createSelectorSession287(createModelSessionControllerPorts287())
export const sourceRunningModel287=createSelectorRunning287({...sourceModelSessionController287,Py:()=>getOfficialModelMenuPolicy287().Py(),Rt:parseUserSpecifiedModel})
