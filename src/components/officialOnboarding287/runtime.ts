import * as React from 'react'
import {c as cache} from 'react/compiler-runtime'
import {jsx,jsxs,Fragment} from 'react/jsx-runtime'
import {Box,Text,Newline,useTheme} from '../../ink.js'
import {getSSLErrorHint} from '../../services/api/errorUtils.js'
import {logEvent,type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS} from '../../services/analytics/index.js'
import {logError} from '../../utils/log.js'
import {env} from '../../utils/env.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {ConsoleOAuthFlow} from '../ConsoleOAuthFlow.js'
import {WelcomeV2} from '../LogoV2/WelcomeV2.js'
import {createOnboarding287} from './native.js'
import proof from './provenance.json'

/** All imports read the installed original namespace or an existing host leaf.
 * The original wt alone owns step progression and its once-only completion ref. */
export function createOnboardingProductionPorts287():Record<string,unknown>{
 const event=(name:string,metadata:Record<string,unknown>)=>logEvent(name,metadata as Record<string,AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS|boolean|number|undefined>)
 const ports:Record<string,unknown>={
  w:cache,g:React.useState,R:React.useEffect,Q:React.useMemo,A:React.useRef,
  jt:React.createContext,ke:React.useContext,by:React.Children,sf:React.isValidElement,
  r:jsxs,e:jsx,K:Fragment,s:Box,n:Text,xR:Newline,b:Symbol.for('react.memo_cache_sentinel'),
  Jn:useTheme,a:env,i:event,d:logError,uK:getSSLErrorHint,
  xme:ConsoleOAuthFlow,jY:WelcomeV2,
 }
 for(const [alias,binding]of Object.entries(proof.ports)){
  if(Object.hasOwn(ports,alias))continue
  ports[alias]=(...args:unknown[])=>{
   const fn=getOriginalModsLifecycle287().clearSourceModule287(binding.file)[binding.name]
   if(typeof fn!=='function')throw Error('Onboarding original import missing: '+binding.file+':'+binding.name)
   return Reflect.apply(fn,undefined,args)
  }
 }
 return ports
}
let runtime:ReturnType<typeof createOnboarding287>|undefined
export function getOnboarding287(){return runtime??=createOnboarding287(createOnboardingProductionPorts287())}
