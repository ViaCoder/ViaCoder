import {getOfficialModelValidation287} from './officialModelPicker287/validation.js'
export {clearOfficialValidatedModels287 as clearValidatedModelCache} from './officialModelPicker287/validation.js'
export async function validateModel(model: string): Promise<{valid: boolean; error?: string}> {
  return getOfficialModelValidation287().ONn(model, {})
}
