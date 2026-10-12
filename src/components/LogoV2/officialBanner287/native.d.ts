import type * as React from 'react'
import type {BannerProductionPorts287} from '../bannerProduction287.js'
export interface BannerRuntime287 {
 Header:React.ComponentType<{hideWelcomeChrome?:boolean;latchAnnouncementSlot?:boolean}>;
 Hi:React.ComponentType;
 Oi:React.ComponentType<{oneShotsAllowed?:boolean}>;
 entrance:(allowed:boolean)=>string|undefined;
 animation:React.ComponentType<{autoplay?:boolean;sequence?:string;delayMs?:number;onComplete?:()=>void;reserveCrouchRow?:boolean;color?:string}>;
 metadata:()=>{version:string;cwd:string;billingType:string;agentName:string|undefined};
 oneShotContext:React.Context<boolean>;
 markRestored:(host:object)=>void;
 wasRestored:(host:object)=>boolean;
 theme:(name:string)=>{effortUltra:string};
 trialOverride:()=>null;
}
export function createBanner287(ports:BannerProductionPorts287):BannerRuntime287
