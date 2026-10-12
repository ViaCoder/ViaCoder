export type ChromeDialogPorts287={
 a:{isWslEnvironment():boolean};t(message:string,options?:{level:string}):void;ft():boolean;le():{chromeExtension?:{pairedDeviceName?:string};claudeInChromeDefaultEnabled?:boolean};sk():boolean;ac:string;cH():Promise<boolean>;lH:string;g_e:string;
 d(error:unknown):void;Zc():{wiredThisSession:boolean};iJe():boolean;yr():boolean;AT():boolean;yge():boolean
}
export declare function createChromeDialogAndGate287(ports:ChromeDialogPorts287):{buildChromeDialogResponse(args:{mcpClients:unknown[];atStartup:(settingOn:boolean)=>Promise<boolean>}):Promise<Record<string,unknown>>;CHROME_PERMISSIONS_URL:string;claudeInChromeDefaultForHost(args?:{settingOn?:boolean}):Promise<boolean>}
