import {createArtifactPresence287} from './officialArtifactPresence287/native.js'
import type {PrintArtifactState287} from '../../cli/printOwnership287/cancellationNative.js'

// Resolve lazily: OAuth/reset startup must not initialize the artifact graph,
// read credentials, or fork the C.of(U()) cell already used by cancellation.
function cancellation(){return (require('../../cli/printOwnership287/cancellation287.js') as typeof import('../../cli/printOwnership287/cancellation287.js')).printCancellation287}
export function getArtifactSlot287():{current:PrintArtifactState287|undefined}{return cancellation().artifactSlot()}
export function getArtifactState287():PrintArtifactState287{return cancellation().artifactState()}
const presence=createArtifactPresence287({a:getArtifactSlot287})
export const isArtifactInitialized287=presence.yxe
export const artifactSource287={a:getArtifactSlot287,X:getArtifactState287,yxe:isArtifactInitialized287}
