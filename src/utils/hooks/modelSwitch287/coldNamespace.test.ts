import {test,expect} from 'bun:test'

test('late command and switch namespaces retain original callable identities and one model-change owner',()=>{
 const runtime=require('./runtime.js') as typeof import('./runtime.js')
 const {modelChangeSlot287,takeModelChangeSource287}=require('./modelChange.js') as typeof import('./modelChange.js')
 const {sourceModelSwitch287}=runtime
 const command=require('../../model/officialModelCommand287/runtime.js') as typeof import('../../model/officialModelCommand287/runtime.js')
 expect(runtime.modelChangeSlot287).toBe(modelChangeSlot287)
 expect(runtime.takeModelChangeSource287).toBe(takeModelChangeSource287)
 expect(sourceModelSwitch287.gWt).toBe(modelChangeSlot287)
 expect(sourceModelSwitch287.kRo).toBe(takeModelChangeSource287)
 expect(Object.hasOwn(sourceModelSwitch287,'FPr')).toBe(true)
 expect(Reflect.ownKeys(sourceModelSwitch287)).toContain('B_')
 expect(sourceModelSwitch287.FPr).toBe(sourceModelSwitch287.FPr)
 expect(command.sourceModelCommand287.jt).toBe(command.OriginalModelCommand287)
 expect(Object.hasOwn(command.sourceModelCommandHelpers287,'mE')).toBe(true)
 expect(command.sourceModelCommandHelpers287.mE).toBe(command.sourceModelCommandHelpers287.mE)
 expect(Reflect.ownKeys(command.sourceModelCommandHelpers287)).toContain('Bst')
})
