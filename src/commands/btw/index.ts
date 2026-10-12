import type { Command } from '../../commands.js'
import {createBtwRegistration287} from './registration287.js'

// Preserve the original registration identity as well as control dispatch.
// The literal Bun module transport is the only host adaptation.
const btw:Command = Object.assign(createBtwRegistration287(),{
  load: () => import('./btw.js'),
})

export default btw
