import {createSignal} from '../../utils/signal.js'
const host={}
export const j=()=>({host})
export class K<T> {
  private values=new WeakMap<object,T>()
  constructor(private create:()=>T){}
  of(key:object):T {let value=this.values.get(key);if(!value){value=this.create();this.values.set(key,value)}return value}
}
export const Oe=createSignal
export const M=<T>(values:T[])=>[...new Set(values)]
