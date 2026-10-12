// Public CCR is the complete original MRe hook, exported by the existing
// direct-connect module. Local ServeDirectConnect/sharedSession remains there
// on its separate C path; this facade instantiates no old Plan-only manager.
export {usePublicCcrSession287 as useRemoteSession} from './useDirectConnect.js'
export type {
 PublicCcrSessionProps287,
 PublicCcrSessionResult287,
} from './officialPublicCcrSession287.js'
