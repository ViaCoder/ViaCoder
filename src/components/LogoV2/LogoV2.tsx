import * as React from 'react'
import {useState} from 'react'
import {Box,Text} from '../../ink.js'
import {getGlobalConfig} from '../../utils/config.js'
import {getInitialSettings} from '../../utils/settings/settings.js'
import {isDebugMode,isDebugToStdErr,getDebugLogPath} from '../../utils/debug.js'
import {EmergencyTip} from './EmergencyTip.js'
import {VoiceModeNotice} from './VoiceModeNotice.js'
import {Opus1mMergeNotice} from './Opus1mMergeNotice.js'
import {feature} from 'bun:bundle'
import {OriginalBanner287} from './bannerProduction287.js'

const ChannelsNoticeModule=feature('KAIROS')||feature('KAIROS_CHANNELS')
 ?require('./ChannelsNotice.js') as typeof import('./ChannelsNotice.js'):null

/** Messages' existing header mounts complete original Hi→Oi, not the old feed. */
export function LogoV2(){return <><OriginalBanner287/><LocalStartupHints/></>}

/** Explicit C layer: retain existing local notices/debug/tmux/company hints.
 * It owns no model/account policy or duplicated storage; the P banner owns its
 * original announcement/entrance latches. Full history and Ctrl+O stay upstream.
 */
export function LocalStartupHints(){
 const config=getGlobalConfig()
 const [announcement]=useState(()=>{
  const announcements=getInitialSettings().companyAnnouncements
  if(!announcements||announcements.length===0)return undefined
  return config.numStartups===1?announcements[0]:announcements[Math.floor(Math.random()*announcements.length)]
 })
 return <>
  <VoiceModeNotice/><Opus1mMergeNotice/>{ChannelsNoticeModule&&<ChannelsNoticeModule.ChannelsNotice/>}
  {isDebugMode()&&<Box paddingLeft={2} flexDirection="column"><Text color="warning">Debug mode enabled</Text><Text dimColor>Logging to: {isDebugToStdErr()?'stderr':getDebugLogPath()}</Text></Box>}
  <EmergencyTip/>
  {process.env.CLAUDE_CODE_TMUX_SESSION&&<Box paddingLeft={2} flexDirection="column"><Text dimColor>tmux session: {process.env.CLAUDE_CODE_TMUX_SESSION}</Text><Text dimColor>{process.env.CLAUDE_CODE_TMUX_PREFIX_CONFLICTS?`Detach: ${process.env.CLAUDE_CODE_TMUX_PREFIX} ${process.env.CLAUDE_CODE_TMUX_PREFIX} d (press prefix twice - Claude uses ${process.env.CLAUDE_CODE_TMUX_PREFIX})`:`Detach: ${process.env.CLAUDE_CODE_TMUX_PREFIX} d`}</Text></Box>}
  {announcement&&<Box paddingLeft={2} flexDirection="column">{!process.env.IS_DEMO&&config.oauthAccount?.organizationName&&<Text dimColor>Message from {config.oauthAccount.organizationName}:</Text>}<Text>{announcement}</Text></Box>}
 </>
}
