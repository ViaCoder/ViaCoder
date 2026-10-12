import type {z} from 'zod/v4'
export type SpinnerTipsOverride287={excludeDefault?:boolean;tips?:Array<string|Record<string,unknown>>;tipsFile?:string;label?:string;[key:string]:unknown}
export function createTipsSettingsSchema287(ports:{f:(fn:()=>any)=>any;Fe:typeof z.union;o:typeof z.string;u:typeof z.object;Gi:typeof z.preprocess;T:typeof z.array;H:typeof z.boolean}):{spinnerTipsOverride:z.ZodCatch<z.ZodOptional<z.ZodType<SpinnerTipsOverride287>>>;pluginSuggestionMarketplaces:z.ZodOptional<z.ZodArray<z.ZodString>>}
export function resolveSpinnerTip287(ut:boolean,Wme:()=>boolean,wt:boolean,mt:{subject:string}|undefined,St:boolean,d:string|undefined):string|undefined
export function formatSpinnerTipLine287(mt:{subject:string}|undefined,Rt:string|undefined,d:string|undefined,p:string|undefined):string|undefined
