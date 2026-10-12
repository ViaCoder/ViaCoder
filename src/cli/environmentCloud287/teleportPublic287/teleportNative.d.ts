export type TeleportPublicBody287={
 teleportWithProgress(root:unknown,sessionId:string):Promise<{messages:unknown[];branchName:string}>;
 trustedDeviceRead:unknown;
 publicNamespaces:Record<string,Readonly<Record<string,unknown>>>;
 sourceModule(file:string):Record<string,unknown>|undefined;
}
export function createTeleportPublic287(ports:Record<string,unknown>):TeleportPublicBody287
