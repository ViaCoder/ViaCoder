import ts from 'typescript'
export function resultTypesFromSource(decls,roots){
 const out=[],seen=new Set(),typeName=n=>'OriginalResult_'+n.replaceAll('$','dollar');
 function literals(n){if(ts.isIdentifier(n)){const d=decls.get(n.text);if(!d?.initializer)throw Error('SDK enum source absent '+n.text);return literals(d.initializer)}if(!ts.isArrayLiteralExpression(n))throw Error('SDK enum is not literal');return n.elements.flatMap(x=>ts.isSpreadElement(x)?literals(x.expression):[x.getText()])}
 function optional(n,seen=new Set()){
  if(ts.isParenthesizedExpression(n))return optional(n.expression,seen)
  if(ts.isArrowFunction(n)&&!ts.isBlock(n.body))return optional(n.body,seen)
  if(ts.isCallExpression(n)){
   if(ts.isPropertyAccessExpression(n.expression)){if(n.expression.name.text==='optional'||n.expression.name.text==='catch'&&n.arguments[0]?.getText()==='void 0')return true;return optional(n.expression.expression,seen)}
   const name=n.expression.getText()
   if(name==='f'&&n.arguments[0])return optional(n.arguments[0],seen)
   const declaration=decls.get(name)
   if(declaration?.initializer&&!seen.has(name)){seen.add(name);return optional(declaration.initializer,seen)}
  }
  return false
 }
 function objectType(obj){if(!ts.isObjectLiteralExpression(obj))throw Error('SDK object source missing');const fields=obj.properties.map(p=>{if(!ts.isPropertyAssignment(p))throw Error('SDK object property contract');return p.name.getText()+(optional(p.initializer)?'?':'')+': '+typ(p.initializer)+';'});return '{ '+fields.join(' ')+' }'}
 function typ(n){
  if(ts.isParenthesizedExpression(n))return typ(n.expression)
  if(ts.isArrowFunction(n)&&!ts.isBlock(n.body))return typ(n.body)
  if(ts.isCallExpression(n)){
   if(ts.isPropertyAccessExpression(n.expression)){
    const method=n.expression.name.text,base=typ(n.expression.expression)
    if(method==='optional'||method==='catch')return '('+base+') | undefined'
    if(method==='nullable')return '('+base+') | null'
    if(method==='extend'){const extension=objectType(n.arguments[0]);return 'Omit<('+base+'), keyof '+extension+'> & '+extension}
    if(method==='and')return '('+base+') & ('+typ(n.arguments[0])+')'
    if(['describe','int','nonnegative','min','max','finite','nonempty','positive'].includes(method))return base
    throw Error('SDK type method missing '+method)
   }
   const name=n.expression.getText()
   if(name==='Gi'&&n.arguments.length===2)return typ(n.arguments[1])
   if(name==='f'||name==='tE'){const a=n.arguments[0];if(!ts.isArrowFunction(a)||ts.isBlock(a.body))throw Error('SDK lazy type contract');return typ(a.body)}
   if(name==='o')return 'string';if(name==='C')return 'number';if(name==='H')return 'boolean';if(name==='se')return 'unknown';if(name==='x'){const v=n.arguments[0];if(ts.isPrefixUnaryExpression(v)&&v.operator===ts.SyntaxKind.ExclamationToken&&ts.isNumericLiteral(v.operand))return Number(v.operand.text)?'false':'true';return v.getText()}
   if(name==='B')return literals(n.arguments[0]).join(' | ')
   if(name==='T')return 'Array<'+typ(n.arguments[0])+'>'
   if(name==='de')return 'Record<'+typ(n.arguments[0])+', '+typ(n.arguments[1])+'>'
   if(name==='Fe'||name==='Wo'){const list=n.arguments[name==='Wo'?1:0];if(!ts.isArrayLiteralExpression(list))throw Error('SDK union literal missing');return list.elements.flatMap(x=>ts.isSpreadElement(x)?spreadTypes(x.expression):[typ(x)]).join(' | ')}
   if(name==='u'||name==='Ve'||name==='pt'){
    return objectType(n.arguments[0])+(name==='pt'?' & Record<string, unknown>':'')
   }
   if(decls.has(name)){emit(name);return typeName(name)}
   throw Error('SDK type schema missing '+name)
  }
  if(ts.isPropertyAccessExpression(n)&&ts.isPropertyAccessExpression(n.expression)&&n.expression.name.text==='shape')return typ(n.expression.expression)+'['+JSON.stringify(n.name.text)+']'
  throw Error('SDK type expression missing '+n.getText().slice(0,100))
 }
 function spreadTypes(n){if(!ts.isCallExpression(n)||!ts.isPropertyAccessExpression(n.expression)||n.expression.name.text!=='map'||n.arguments[0].getText()!=='Wy')throw Error('SDK content union spread missing');return literals(n.expression.expression).map(t=>'{ type: '+t+' } & Record<string, unknown>')}
 function emit(name){if(seen.has(name))return;seen.add(name);const n=decls.get(name);if(!n||!ts.isVariableDeclaration(n))throw Error('SDK type declaration missing '+name);const type=typ(n.initializer);out.push('export type '+typeName(name)+' = '+type+';')}
 roots.forEach(emit);return '// Generated from exact fixed287 schema AST. Required/optional fields stay explicit with strictNullChecks disabled.\n'+out.join('\n')+'\nexport type ResultSuccess287 = '+typeName(roots[0])+';\n'+(roots[1]?'export type ResultError287 = '+typeName(roots[1])+';\n':'')
}
