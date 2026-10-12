import {createContext, useContext} from 'react'

/** The same per-Ink-root switch consumed by the list's accessible branch. */
export const ScreenReaderContext=createContext(false)
export const useScreenReader=():boolean=>useContext(ScreenReaderContext)
