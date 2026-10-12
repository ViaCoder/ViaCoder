// Official npm 2.1.286 credential slot factory; existing standalone host facade. Standalone host only.
import {createOfficialCredentialSlots} from '../../utils/officialCredentialSlots/runtime.js';
function wo(){return n().host.credentialSlots.gatewayAuth()}
function y2t(){return n().host.credentialSlots.gatewayServerProcess()}
function _2t(){return n().host.credentialSlots.gatewayRequiredByHostPolicy()}
const root={host:{credentialSlots:createOfficialCredentialSlots()}};function n(){return root}
export {wo,y2t,_2t};
export const filesCredentialSlots=root.host.credentialSlots;
