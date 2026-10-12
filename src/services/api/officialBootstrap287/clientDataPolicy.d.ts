export type PublishedClientDataPolicyVerdict287={restrictions:Record<string,{allowed:boolean}>;compliance_taints:string[]}
export declare function createPublishedClientDataPolicyHelpers287(ports:{Jt:{servedTrue(name:string):boolean}}):{
 ljt(verdict:PublishedClientDataPolicyVerdict287,policy:string,taints?:string[]):boolean
 M(policy:string,taints:string[]):boolean
 registry:Record<string,{onCacheMiss?:string;deniedUnder?:string[]}>
}
