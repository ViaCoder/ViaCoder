import type React from 'react'
import type {Theme,ThemeName,ThemeSetting} from '../../../utils/theme.js'
export type PublicThemeSetting287=ThemeSetting|`custom:${string}`
export interface CustomTheme287 {slug:string;name:string;base:ThemeName;overrides:Partial<Theme>;source:'user'|{plugin:string}}
export interface ThemeContextValue287 {
 themeSetting:PublicThemeSetting287;setThemeSetting(setting:PublicThemeSetting287):void
 setPreviewTheme(setting:PublicThemeSetting287):void;savePreview():void;cancelPreview():void
 currentTheme:ThemeName;resolvedTheme:Theme;activeThemeOverrides:Partial<Theme>|undefined
 customThemes:CustomTheme287[];activeCustomTheme:CustomTheme287|undefined
 reloadCustomThemes():Promise<void>;setPreviewOverrides:React.Dispatch<React.SetStateAction<Partial<Theme>|null>>
}
export interface ThemeProviderProps287 {children:React.ReactNode;initialState?:PublicThemeSetting287;onThemeSave?(setting:PublicThemeSetting287):void}
export interface ThemeProviderRuntime287 {
 ThemeContext:React.Context<ThemeContextValue287>;ThemeProvider:React.ComponentType<ThemeProviderProps287>
 useTheme():[ThemeName,(setting:PublicThemeSetting287)=>void];useThemeSetting():PublicThemeSetting287
 usePreviewTheme():Pick<ThemeContextValue287,'setPreviewTheme'|'savePreview'|'cancelPreview'>
 useResolvedTheme():Theme;useThemeOverrides():Partial<Theme>|undefined
 useCustomThemes():Pick<ThemeContextValue287,'customThemes'|'activeCustomTheme'|'reloadCustomThemes'|'setPreviewOverrides'>
}
export function createThemeProvider287(ports:Record<string,unknown>):ThemeProviderRuntime287
export function createThemeContext287(ports:{jt:typeof React.createContext;MN:(name:ThemeName)=>Theme}):React.Context<ThemeContextValue287>
