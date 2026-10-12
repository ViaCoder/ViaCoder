#!/usr/bin/env node
// Whole-package syntax evidence for the current version, not a runtime-parity
// certificate. No pinned chunk names or minified identifiers; no app imports.
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import {fileURLToPath} from 'node:url'
import {optionCalls, localCommands, localTools, SOURCE_SHA256 as inventorySource} from './registration-inventory.mjs'
import {fixtureRoot, readFixture, sha256, json, outputPath, inventoryFiles} from './version-diff-local.mjs'

const analyzerSources={'current-registration-review.mjs':sha256(fs.readFileSync(new URL(import.meta.url))),
  'registration-inventory.mjs':inventorySource}

const literal = n => n && (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) ? n.text : undefined
const walk = (n, visit) => {visit(n); ts.forEachChild(n, c => walk(c, visit))}
function enclosingFunction(tree, node) {
  for (let n = node.parent; n; n = n.parent) {
    if (ts.isFunctionLike(n)) return {start:n.getStart(tree), end:n.end, symbol:n.name?.getText(tree)}
  }
}
function gate(tree, node) {
  const conditions = []
  for(let child=node,p=node.parent;p;child=p,p=p.parent) {
    if(ts.isIfStatement(p)&&child!==p.expression) conditions.push({kind:'if', branch:child===p.thenStatement?'then':'else', expression:p.expression.getText(tree)})
    if(ts.isConditionalExpression(p)&&child!==p.condition) conditions.push({kind:'conditional', branch:child===p.whenTrue?'true':'false', expression:p.condition.getText(tree)})
    if(ts.isCaseClause(p)) conditions.push({kind:'case', expression:p.expression.getText(tree)})
  }
  return conditions.reverse()
}
function checkerFor(tree) {
  const file=tree.fileName
  const host={getSourceFile:n=>n===file?tree:undefined, getDefaultLibFileName:()=>'',writeFile(){},getCurrentDirectory:()=> '/',
    getCanonicalFileName:n=>n,useCaseSensitiveFileNames:()=>true,getNewLine:()=> '\n',fileExists:n=>n===file,readFile:n=>n===file?tree.text:undefined}
  return ts.createProgram([file],{allowJs:true,noLib:true,noResolve:true},host).getTypeChecker()
}
export function scanRegistrationSource(text, module='fixture.js', moduleSha256=sha256(text)) {
  const kind=/\.tsx$/.test(module)?ts.ScriptKind.TSX:/\.[cm]?ts$/.test(module)?ts.ScriptKind.TS:/\.jsx$/.test(module)?ts.ScriptKind.JSX:ts.ScriptKind.JS
  const tree=ts.createSourceFile(module,text,ts.ScriptTarget.Latest,true,kind)
  if(tree.parseDiagnostics.length)throw Error(`Registration AST failed: ${module}`)
  const anchor=n=>({module,moduleSha256,start:n.getStart(tree),end:n.end,line:tree.getLineAndCharacterOfPosition(n.getStart(tree)).line+1,sourceSha256:sha256(n.getText(tree))})
  const commands=[],controls=[],tools=[],optionDefinitions=[],indirectOptions=[],arrays=[],nodes=new Map(),optionScopes=new Map()
  walk(tree,n=>{
    if(ts.isCallExpression(n)&&ts.isPropertyAccessExpression(n.expression)&&['option','requiredOption','addOption','helpOption'].includes(n.expression.name.text)&&n.arguments[0]) {
      optionScopes.set(n.arguments[0].getStart(tree),enclosingFunction(tree,n))
    }
    // Split option construction from registration. An imported factory's
    // .option() cannot be resolved by this single-module syntax scan, but
    // neither the unresolved caller nor the factory definition may disappear.
    if(ts.isNewExpression(n)) {
      const declaration=literal(n.arguments?.[0])
      if(declaration&&/(?:^|[\s,])--[a-z][a-z0-9-]*(?=[\s,]|$)/.test(declaration)) {
        const flags=[...declaration.matchAll(/(?:^|[\s,])(--(?:no-)?[a-z][a-z0-9-]*|-[a-zA-Z])(?=[\s,]|$)/g)].map(m=>m[1])
        optionDefinitions.push({declaration,flags,constructor:n.expression.getText(tree),...anchor(n),
          definitionScope:enclosingFunction(tree,n),gate:gate(tree,n),classification:'option-constructor candidate only; registration and factory consumer unresolved'})
      }
    }
    if(ts.isCallExpression(n)&&ts.isPropertyAccessExpression(n.expression)&&n.expression.name.text==='addOption'&&n.arguments[0]) {
      let value=n.arguments[0]
      while(ts.isCallExpression(value)&&ts.isPropertyAccessExpression(value.expression))value=value.expression.expression
      if(!ts.isNewExpression(value))indirectOptions.push({...anchor(n),argument:n.arguments[0].getText(tree),
        definitionScope:enclosingFunction(tree,n),gate:gate(tree,n),classification:'indirect addOption consumer; factory target and returned flags unresolved'})
    }
    if(ts.isArrayLiteralExpression(n)&&ts.isReturnStatement(n.parent))arrays.push(n)
    if(ts.isObjectLiteralExpression(n)) {
      const props=new Map(n.properties.filter(ts.isPropertyAssignment).map(p=>[p.name.getText(tree).replace(/^['"]|['"]$/g,''),p.initializer]))
      const fields=new Map(n.properties.filter(p=>p.name).map(p=>[p.name.getText(tree).replace(/^['"]|['"]$/g,''),ts.isPropertyAssignment(p)?p.initializer.getText(tree):p.getText(tree)]))
      const name=literal(props.get('name')),type=literal(props.get('type'))
      if(name&&['local','local-jsx','prompt'].includes(type)) {
        const row={name,type,...anchor(n),definitionScope:enclosingFunction(tree,n),gate:gate(tree,n),
          fields:Object.fromEntries([...fields].filter(([k])=>k!=='name'&&k!=='type')),
          spreadExpressions:n.properties.filter(ts.isSpreadAssignment).map(p=>p.getText(tree)),
          registryArrayReferences:[],classification:'command-definition-only; runtime availability unchecked'}
        commands.push(row);nodes.set(row,n)
      }
      const keys=new Set(n.properties.map(p=>p.name?.getText(tree).replace(/^['"]|['"]$/g,'')))
      if(['inputSchema','call','isReadOnly'].every(k=>keys.has(k)))tools.push({...anchor(n),nameExpression:props.get('name')?.getText(tree),gate:gate(tree,n),classification:'tool-object-shape-only; registration and enable conditions unchecked'})
    }
    if(ts.isBinaryExpression(n)&&[ts.SyntaxKind.EqualsEqualsToken,ts.SyntaxKind.EqualsEqualsEqualsToken].includes(n.operatorToken.kind)) {
      const subtype=literal(n.right)??literal(n.left),subject=literal(n.right)?n.left:n.right
      if(subtype&&ts.isPropertyAccessExpression(subject)&&subject.name.text==='subtype')controls.push({subtype,subject:subject.getText(tree),subjectKind:/\.request\.subtype$/.test(subject.getText(tree))?'explicit-control-request':'event-or-aliased-request-unresolved',...anchor(n),gate:gate(tree,n),enclosingFunction:enclosingFunction(tree,n),classification:'subtype-comparison-only; receiver/handler unchecked'})
    }
    if(ts.isCaseClause(n)) {
      const expression=n.parent.parent.expression,subtype=literal(n.expression)
      if(subtype&&ts.isPropertyAccessExpression(expression)&&expression.name.text==='subtype')controls.push({subtype,subject:expression.getText(tree),subjectKind:/\.request\.subtype$/.test(expression.getText(tree))?'explicit-control-request':'event-or-aliased-request-unresolved',...anchor(n),gate:gate(tree,n),enclosingFunction:enclosingFunction(tree,n),classification:'subtype-switch-case-only; receiver/handler unchecked'})
    }
  })
  // Direct and alias references inside actual return arrays. Resolve lexical
  // declarations so a parameter with the same spelling is not a registry link.
  if(commands.length&&arrays.length) {
    const checker=checkerFor(tree),bindings=new Map(),inline=new Map([...nodes].map(([row,node])=>[node,row]))
    for(const [row,node]of nodes) {
      if(ts.isVariableDeclaration(node.parent)&&ts.isIdentifier(node.parent.name))bindings.set(checker.getSymbolAtLocation(node.parent.name),row)
    }
    function target(node,seen=new Set()) {
      if(inline.has(node))return inline.get(node)
      if(!ts.isIdentifier(node))return
      const symbol=checker.getSymbolAtLocation(node)
      if(bindings.has(symbol))return bindings.get(symbol)
      if(!symbol||seen.has(symbol))return
      seen.add(symbol)
      const decl=symbol.valueDeclaration
      if(decl&&ts.isVariableDeclaration(decl)&&decl.initializer)return target(decl.initializer,seen)
    }
    for(const array of arrays)for(const element of array.elements) {
      const visit=n=>{const row=target(n);if(row)row.registryArrayReferences.push({...anchor(n),array:anchor(array),gate:gate(tree,n),enclosingFunction:enclosingFunction(tree,array),classification:'lexical returned-array membership; registry reachability unchecked'})}
      walk(element,visit)
    }
  }
  const flags=optionCalls(tree,module,moduleSha256).map(row=>({...row,definitionScope:optionScopes.get(row.start)}))
  return {module,moduleSha256,flags,optionDefinitions,indirectOptions,commands,controls,tools}
}

export function currentRegistrationReview(repo, official) {
  const root=fixtureRoot(official), manifest=JSON.parse(readFixture(root,'manifest.json'))
  const officialRows={flags:[],optionDefinitions:[],indirectOptions:[],commands:[],controls:[],tools:[]},moduleHashes={}
  let jsModules=0
  for(const m of manifest.modules.filter(m=>m.loader===1)) {
    const bytes=readFixture(root,`raw/${m.path}`)
    if(sha256(bytes)!==m.sha256)throw Error(`Official module hash mismatch: ${m.path}`)
    const scanned=scanRegistrationSource(bytes.toString('utf8').replace(/\0+$/,''),m.path,m.sha256)
    moduleHashes[m.path]=m.sha256;jsModules++
    for(const key of Object.keys(officialRows))officialRows[key].push(...scanned[key])
  }
  const localSyntax=localRegistrationEvidence(repo)
  const local={flags:localSyntax.flags,optionDefinitions:localSyntax.optionDefinitions,indirectOptions:localSyntax.indirectOptions,
    commands:localCommands(repo).rows, controls:localSyntax.controls,
    tools:localTools(repo)}
  const pairs=(rows,local,key)=>[...Map.groupBy(rows,r=>r[key])].map(([name,official])=>({name,official,local:local.filter(r=>r[key]===name),classification:'syntax evidence only; missing local match is not a proven public feature gap'}))
  const flattenFlags=rows=>rows.flatMap(row=>row.flags.filter(f=>f.startsWith('--')).map(flag=>({...row,flag})))
  return {schemaVersion:3,version:manifest.version,platform:manifest.platform,binarySha256:manifest.binarySha256,
    analyzerSources,localSourceEvidence:localSyntax.sourceEvidence,
    scope:'Current whole-package syntax scan without pinned chunk/symbol names. Declaration presence, returned-array membership and dispatch comparisons do not establish runtime reachability, qualifications or behavioral equivalence. Local Tool symbols are not paired with minified official symbols by spelling.',
    scannedJSModules:jsModules,moduleHashes,official:officialRows,local,
    review:{flags:pairs(flattenFlags(officialRows.flags),flattenFlags(local.flags),'flag'),commands:pairs(officialRows.commands,local.commands,'name'),controls:pairs(officialRows.controls,local.controls,'subtype'),
      explicitControlRequests:pairs(officialRows.controls.filter(r=>r.subjectKind==='explicit-control-request'),local.controls.filter(r=>r.subjectKind==='explicit-control-request'),'subtype')},
    excludedFromProof:['SDK declaration schemas are not dispatches','tool-object shape is not registration','arrays require entry/enable/call-chain review','computed factory registrations and table dispatches require lexical graph/manual tracing','AWS/Google unused upstream features are separately user-excluded, not silently removed from evidence']}
}

export function localRegistrationEvidence(repo) {
  const root=fixtureRoot(path.join(repo,'src')), files=inventoryFiles(root)
  const flags=[],optionDefinitions=[],indirectOptions=[],controls=[],sourceEvidence=[]
  for(const file of files.files.filter(file=>/\.[cm]?[jt]sx?$/.test(file.path))) {
    const bytes=readFixture(root,file.path)
    if(sha256(bytes)!==file.sha256)throw Error(`Local source changed during registration review: ${file.path}`)
    const module=`src/${file.path}`,scanned=scanRegistrationSource(bytes.toString('utf8'),module,file.sha256)
    flags.push(...scanned.flags);optionDefinitions.push(...scanned.optionDefinitions);indirectOptions.push(...scanned.indirectOptions);controls.push(...scanned.controls)
    sourceEvidence.push({module,sha256:file.sha256,flags:scanned.flags.length,optionDefinitions:scanned.optionDefinitions.length,indirectOptions:scanned.indirectOptions.length,controls:scanned.controls.length})
  }
  return {flags,optionDefinitions,indirectOptions,controls,sourceEvidence}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const [repo,official,output]=process.argv.slice(2)
  if(!repo||!official||!output)throw Error('Usage: current-registration-review.mjs REPO OFFICIAL_PLATFORM_DIR OUTPUT_DIR')
  const destination=outputPath(output,[fixtureRoot(repo),fixtureRoot(official)]),result=currentRegistrationReview(path.resolve(repo),official)
  fs.mkdirSync(destination,{recursive:true});fs.writeFileSync(path.join(destination,'review.json'),json(result))
  const counts=Object.fromEntries(Object.entries(result.official).map(([k,v])=>[k,v.length]))
  fs.writeFileSync(path.join(destination,'summary.json'),json({version:result.version,platform:result.platform,scannedJSModules:result.scannedJSModules,counts,reviewSha256:sha256(json(result)),scope:result.scope}))
  console.log(JSON.stringify({version:result.version,platform:result.platform,scannedJSModules:result.scannedJSModules,counts}))
}
