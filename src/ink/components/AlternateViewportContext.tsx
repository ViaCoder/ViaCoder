import {createContext, useContext} from 'react'

export const AlternateViewportContext=createContext(false)
export const useAlternateViewport=():boolean=>useContext(AlternateViewportContext)
