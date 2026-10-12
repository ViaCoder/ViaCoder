// Original287 NWt/aIe/_i/tJe; sole explicit R04 exclusion: rZ() AWS cache reset.
export function createStartupAuthReset287(ports){
const {Rpe,U,nns,HWt,rJe,a_t,Ej,vpe,F,bwe}=ports;
function NWt(){if(aIe(),_i().clear(),tJe(),rJe(),a_t(),Ej(),vpe(),F())bwe()}
function aIe(){Rpe.of(U().host).clear()}
function _i(){return nns.of(U().host)}
function tJe(){let e=HWt.of(U().host);e.epoch++,e.cache=null,e.inflight=null}
return {reset:NWt,readerCell:_i,clearOAuth:aIe,clearHelper:tJe};
}
