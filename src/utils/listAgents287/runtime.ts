import * as path from 'node:path'
import {getOriginalModsLifecycle287} from '../hooks/modelSwitch287/lifecycleRuntime.js'
import type {Command} from '../../types/command.js'
type LocalCommand=Extract<Command,{type:'local'}>
import {createAge287,createNameHelpers287,createUserNameReader287,createSessionLabelHelpers287,createListing287,createCall287,createRegistration287} from './native.js'
let installed:ReturnType<typeof install>|undefined
function install(){
 const owner=getOriginalModsLifecycle287()
 const supplement:Record<string,Record<string,unknown>>={}
 function read(file:string,name:string):any {if(file==='path')return (path as unknown as Record<string,unknown>)[name];if(Object.hasOwn(supplement[file]??{},name))return supplement[file][name];return owner.clearLifecycleSource287(file,name)}
 supplement['chunk-nankzm0s.js']=createAge287({})
 supplement['chunk-wb5qh1pz.js']=createNameHelpers287({"ese":read("chunk-wb5qh1pz.js","ese"),"dSt":read("chunk-wb5qh1pz.js","dSt"),"$F":read("chunk-mky26gaw.js","$F"),"q":read("chunk-bn3p37gv.js","q"),"V2e":read("chunk-wb5qh1pz.js","V2e"),"re":read("chunk-wb5qh1pz.js","re"),"se":read("chunk-wb5qh1pz.js","se")})
 supplement['chunk-z3rgg13c.js']=createUserNameReader287({"qv":read("chunk-nankzm0s.js","qv"),"Iw":read("chunk-z3rgg13c.js","Iw")})
 supplement['chunk-mn0vydwy.js']=createSessionLabelHelpers287({"q2e":read("chunk-wb5qh1pz.js","q2e"),"tse":read("chunk-wb5qh1pz.js","tse")})
 supplement['chunk-vt9dn7by.js']=createListing287({"aKr":read("chunk-nankzm0s.js","aKr"),"qv":read("chunk-nankzm0s.js","qv"),"Jt":read("chunk-m59srz4k.js","Jt"),"eg":read("chunk-wb5qh1pz.js","eg"),"cK":read("chunk-wb5qh1pz.js","cK"),"q2e":read("chunk-wb5qh1pz.js","q2e"),"k5r":read("chunk-wb5qh1pz.js","k5r"),"Ir":read("chunk-wb5qh1pz.js","Ir"),"K2e":read("chunk-wb5qh1pz.js","K2e"),"nQe":read("chunk-wb5qh1pz.js","nQe"),"P8":read("chunk-wb5qh1pz.js","P8"),"Fj":read("chunk-wb5qh1pz.js","Fj"),"I8":read("chunk-wb5qh1pz.js","I8"),"ese":read("chunk-wb5qh1pz.js","ese"),"tse":read("chunk-wb5qh1pz.js","tse"),"wGt":read("chunk-wb5qh1pz.js","wGt"),"dSt":read("chunk-wb5qh1pz.js","dSt"),"x5r":read("chunk-wb5qh1pz.js","x5r"),"H4o":read("chunk-wb5qh1pz.js","H4o"),"X2e":read("chunk-wb5qh1pz.js","X2e"),"vGt":read("chunk-wb5qh1pz.js","vGt"),"lT":read("chunk-yzr5hfaq.js","lT"),"Ra":read("chunk-yzr5hfaq.js","Ra"),"ni":read("chunk-6jc3yf5g.js","ni"),"k$t":read("chunk-b5mvcpdr.js","k$t"),"Yq":read("chunk-b5mvcpdr.js","Yq"),"M1r":read("chunk-b5mvcpdr.js","M1r"),"L1r":read("chunk-b5mvcpdr.js","L1r"),"B$r":read("chunk-z3rgg13c.js","B$r"),"QKn":read("chunk-mn0vydwy.js","QKn"),"M$r":read("chunk-mn0vydwy.js","M$r"),"ZNo":read("chunk-mn0vydwy.js","ZNo"),"u8e":read("chunk-mn0vydwy.js","u8e"),"Gpn":read("chunk-mn0vydwy.js","Gpn"),"zpn":read("chunk-mn0vydwy.js","zpn"),"QFt":read("chunk-mn0vydwy.js","QFt"),"Vpn":read("chunk-mn0vydwy.js","Vpn"),"N$r":read("chunk-mn0vydwy.js","N$r"),"ZFt":read("chunk-mn0vydwy.js","ZFt"),"pft":read("chunk-mn0vydwy.js","pft"),"C1e":read("chunk-mn0vydwy.js","C1e"),"e$t":read("chunk-mn0vydwy.js","e$t"),"yX":read("chunk-dfzp1684.js","yX"),"z_":read("chunk-4nawnnf1.js","z_"),"x":read("path","basename")})
 const module=createCall287({"Bo":read("chunk-x5mcrns6.js","Bo"),"FR":read("chunk-dfzp1684.js","FR"),"lyr":read("chunk-vt9dn7by.js","lyr"),"cyr":read("chunk-vt9dn7by.js","cyr"),"dyr":read("chunk-vt9dn7by.js","dyr")})
 const command=createRegistration287({...{"ni":read("chunk-6jc3yf5g.js","ni")},loadModule:()=>module}).s as LocalCommand
 return {command,module,read,listing:supplement['chunk-vt9dn7by.js']}
}
export function getListAgentsRuntime287(){return installed??=install()}
export function getListAgentsCommand287():LocalCommand{return getListAgentsRuntime287().command}
