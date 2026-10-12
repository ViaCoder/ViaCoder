// Complete official 2.1.287 Files header closure. Production version/UA stays with the existing owner.
export function createFilesHeaders287({Mo}){
var cp="oauth-2025-04-20";
function R(e,s){return Object.freeze({name:e,header:s})};
var ewe=R("oauth_auth",cp);
var ZKr=R("files_api","files-api-2025-04-14");
var gXo=`${ZKr.header},${ewe.header}`;
var hXo="2023-06-01";
function H5t(e){return{"User-Agent":Mo(),Authorization:`Bearer ${e.oauthToken}`,"anthropic-version":hXo,"anthropic-beta":gXo}};
return H5t;
}
