import type {ModelName} from '../../../utils/model/model.js'
export interface ModelCommandRegistration287 {
  type: 'local-jsx'; name: 'model'; readonly description: string; argumentHint: '[model]';
  immediate: true; requires: {ink: true}; thinClientDispatch: 'control-request';
}
export function createModelCommandRegistration287(ports: {rt(): ModelName; As(model: ModelName): string}): ModelCommandRegistration287
