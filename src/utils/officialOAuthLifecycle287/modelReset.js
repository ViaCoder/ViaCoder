// Generated complete original 2.1.287 declarations. See provenance.json.
export function createOAuthModelReset287(ports){
const {Wn,Xr,pH}=ports;
function FVo(){let e=Xr(),n=e.servedCatalogActive;if(n?.source==="served")e.servedCatalogDeactivatedRows=n.catalog??void 0,e.servedCatalogActive={catalog:null,source:"fallback",fetchedAt:void 0,stale:!1};e.servedCatalogPublicIds.clear()};
function WVo(){let e=Xr();e.providerCache.confirmedEntitlementDenies.clear(),e.providerCache.overturnedEntitlementDenies.clear();let n=e.sessionModelDenyReprobe;n.honoredModels.clear(),n.contestedDenies.clear(),n.refusedModels.clear(),n.generation+=1};
function vpe(){Wn().invalidateAll(),pH()};
return {WVo,FVo,vpe};
}
