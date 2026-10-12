import type {LocalCommandCall} from '../../types/command.js'
import {getPublicUltrareviewClient287,callPublicUltrareviewText287} from './officialPublicReview287/runtime.js'
export type {ReviewHost} from './reviewHost287.js'
export type ReviewLaunchResult=import('./officialPublicReview287/native.js').ReviewLaunchResult287
export function parseReviewArgs(args:string){return getPublicUltrareviewClient287().core().oRt(args)}
/** Complete original m → TMe. Existing optional host injection stays connected. */
export const call:LocalCommandCall=callPublicUltrareviewText287
