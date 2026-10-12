import {useSyncExternalStore} from 'react'
import {getStoredImagePathsOwner287,subscribeStoredImagePaths287} from '../utils/imageStore.js'

/** The original wo string/null selector reads the same C image-path table that
 * source Sme/bme write. No parallel AppState field, snapshot map or ID owner. */
export function useStoredImagePaths287<T>(selector:(state:ReturnType<typeof getStoredImagePathsOwner287>)=>T):T {
  const read=()=>selector(getStoredImagePathsOwner287())
  return useSyncExternalStore(subscribeStoredImagePaths287,read,read)
}
