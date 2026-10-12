import type {PrintPublicPorts287} from '../printOwnership287/publicHostNative.js'
import type {PrintUiSourceRead287,PrintUiSources287,PrintUiLexicalPorts287,PrintUiDispatcher287,PrintUiPublicSubscriptions287} from './types.js'
export declare const borrowed287:readonly {file:string;name:string;provider:string}[]
export declare function createPluginUiSources287(read:PrintUiSourceRead287,host:{logForDebugging:typeof import('../../utils/debug.js').logForDebugging}):PrintUiSources287
export declare function createPrintUiControlDispatcher287(source:PrintUiSources287,host:PrintUiLexicalPorts287):PrintUiDispatcher287
export declare function createPrintPublicSubscriptions287(ports:PrintPublicPorts287):PrintUiPublicSubscriptions287
