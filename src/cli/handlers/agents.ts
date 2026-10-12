/** Official public background view/JSON command; configured /agents has its separate owner. */
import {getProductionAgentsCommand287} from '../officialAgentsCommand287/runtime.js'
import type {AgentsCommandHandler287} from '../officialAgentsCommand287/native.js'
export const agentsHandler:AgentsCommandHandler287=async (...args)=>{
  await getProductionAgentsCommand287().agentsCommandHandler(...args)
}
export {agentsHandler as agentsCommandHandler}
