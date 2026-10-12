import {officialAgentPrompt287} from './agentPrompt287.js'

// Complete original s0o; listings use the separate, ungated async Jzn path.
// Keep the function boundary lazy for either cold import order.
export function getPrompt(options:Parameters<typeof officialAgentPrompt287.description>[0]){
 return officialAgentPrompt287.description(options)
}
