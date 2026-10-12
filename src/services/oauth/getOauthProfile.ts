import {getSharedOAuthClient} from '../../utils/sharedOAuthClient.js'
import type {OAuthProfileResponse} from './types.js'

export function getOauthProfileFromApiKey(): Promise<OAuthProfileResponse | undefined> {
 return getSharedOAuthClient().keyProfile()
}
export function getOauthProfileFromOauthToken(token: string): Promise<OAuthProfileResponse | undefined> {
 return getSharedOAuthClient().tokenProfile(token)
}
