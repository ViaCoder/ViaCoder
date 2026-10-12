// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQueryUuid287(ports){
const {}=ports;
var d=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function tn(t){if(typeof t!=="string")return null;return d.test(t)?t:null};
return {tn};
}
