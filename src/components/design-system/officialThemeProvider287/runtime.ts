import * as React from 'react'
import {c} from 'react/compiler-runtime'
import {jsx} from 'react/jsx-runtime'
import useStdin from '../../../ink/hooks/use-stdin.js'
import {getSystemThemeName} from '../../../utils/systemTheme.js'
import {getTheme} from '../../../utils/themePalette287.js'
import {ThemeContext} from '../themeContext287.js'
import {createThemeProvider287} from './native.js'
import proof from './provenance.json'
const ports:Record<string,unknown>={n:ThemeContext,w:c,jt:React.createContext,ke:React.useContext,g:React.useState,R:React.useEffect,Q:React.useMemo,kt:React.useSyncExternalStore,e:jsx,b:Symbol.for('react.memo_cache_sentinel'),MN:getTheme,cP:useStdin,Xae:getSystemThemeName,importSystemThemeWatcher287:()=>import('../../../utils/systemThemeWatcher.js')}
// Never read canonical while the actual context is being created. Canonical n
// imports this one context; custom/settings/plugin readers run only on mount.
for(const [alias,binding]of Object.entries(proof.ports)){
 if(Object.hasOwn(ports,alias))continue
 ports[alias]=(...args:unknown[])=>{const owner=import.meta.require('../../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../../utils/hooks/modelSwitch287/lifecycleRuntime.js');const fn=owner.getOriginalModsLifecycle287().clearSourceModule287(binding.file)[binding.name];if(typeof fn!=='function')throw Error('ThemeProvider original import missing: '+binding.file+':'+binding.name);return Reflect.apply(fn,undefined,args)}
}
export const themeProviderRuntime287=createThemeProvider287(ports)
