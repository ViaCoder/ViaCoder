#!/usr/bin/env node
// Pinned, read-only registration evidence. Never imports an application module.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import ts from 'typescript';
export const SOURCE_SHA256 = crypto.createHash('sha256').update(fs.readFileSync(new URL(import.meta.url))).digest('hex');

export const OFFICIAL_MODULES = {
  flags: 'chunk-2crv8d5h.js', commands: 'chunk-wyjbafrm.js',
  controls: 'chunk-kgv54n2e.js', inlineControls: 'chunk-r4xrzyvn.js',
  tools: 'chunk-t4yyetdp.js', request: 'chunk-hzevqd7x.js',
  commandLoader: 'chunk-mzg9kbjz.js', cdCall: 'chunk-qah8hrt4.js',
  cdRelocation: 'chunk-9gvh1sdb.js', tuiCall: 'chunk-vpq9zdp0.js',
  focusTextCall: 'chunk-q8zehww8.js', workspaceDiff: 'chunk-n55ey0ga.js',
  workspaceDiffEngine: 'chunk-dsxy6a2x.js',
};
export const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const source = (file, contents) => ts.createSourceFile(file, contents, ts.ScriptTarget.Latest, true,
  /\.tsx$/.test(file) ? ts.ScriptKind.TSX : /\.[cm]?ts$/.test(file) ? ts.ScriptKind.TS : /\.jsx$/.test(file) ? ts.ScriptKind.JSX : ts.ScriptKind.JS);
const walk = (node, fn) => { fn(node); ts.forEachChild(node, child => walk(child, fn)); };
const literal = node => node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : undefined;
const name = node => node && (ts.isIdentifier(node) || ts.isStringLiteral(node)) ? node.text : undefined;
const line = (tree, node) => tree.getLineAndCharacterOfPosition(node.getStart(tree)).line + 1;
const gate = (tree, node) => {
  const clauses = [];
  for (let child = node, parent = node.parent; parent && !ts.isSourceFile(parent); child = parent, parent = parent.parent) {
    if (ts.isIfStatement(parent) && child !== parent.expression)
      clauses.push(`${child === parent.thenStatement ? '' : '!'}(${parent.expression.getText(tree)})`);
    if (ts.isConditionalExpression(parent) && child !== parent.condition)
      clauses.push(`${child === parent.whenTrue ? '' : '!'}(${parent.condition.getText(tree)})`);
  }
  return clauses.reverse();
};
const anchor = (tree, node, module, hash) => ({module, moduleSha256: hash,
  start: node.getStart(tree), end: node.end, line: line(tree, node)});

export function readPinned(rawRoot, index) {
  const moduleHashes = new Map(index.modules.map(record => [record.path, record.sha256]));
  const trees = new Map();
  for (const file of Object.values(OFFICIAL_MODULES)) {
    const bytes = fs.readFileSync(path.join(rawRoot, file));
    const expected = moduleHashes.get(file);
    if (!expected || sha256(bytes) !== expected) throw new Error(`Pinned module hash mismatch: ${file}`);
    const tree = source(file, bytes.toString('utf8').replace(/\0+$/, ''));
    if (tree.parseDiagnostics.length) throw new Error(`Official AST parse failed: ${file}`);
    trees.set(file, {tree, hash: expected});
  }
  return trees;
}

export function optionCalls(tree, module, hash) {
  const rows = [];
  walk(tree, node => {
    if (!ts.isCallExpression(node) || !ts.isPropertyAccessExpression(node.expression)) return;
    const method = node.expression.name.text;
    if (!['option','requiredOption','addOption','helpOption'].includes(method)) return;
    const arg = node.arguments[0];
    let option = arg;
    while (option && ts.isCallExpression(option) && ts.isPropertyAccessExpression(option.expression)) option = option.expression.expression;
    const declaration = literal(arg) ?? (option && ts.isNewExpression(option) ? literal(option.arguments?.[0]) : undefined);
    if (!declaration || !declaration.includes('-')) return;
    const flags = [...declaration.matchAll(/(?:^|[\s,])(--(?:no-)?[a-z][a-z0-9-]*|-[a-zA-Z])(?=[\s,]|$)/g)].map(match => match[1]);
    if (!flags.length) return;
    rows.push({declaration, flags, method, ...anchor(tree, arg, module, hash), gate: gate(tree, node)});
  });
  return rows;
}

function bindingForObject(tree, start) {
  let match;
  walk(tree, node => {
    if (!ts.isObjectLiteralExpression(node) || node.getStart(tree) !== start) return;
    const parent = node.parent;
    if (ts.isVariableDeclaration(parent)) match = parent.name.getText(tree);
    else if (ts.isBinaryExpression(parent)) match = parent.left.getText(tree);
  });
  return match;
}
function functionReturnArray(tree, functionName) {
  let result;
  walk(tree, node => {
    if (ts.isFunctionDeclaration(node) && node.name?.text === functionName)
      walk(node.body, inner => { if (ts.isReturnStatement(inner) && ts.isArrayLiteralExpression(inner.expression)) result = inner.expression; });
  });
  if (!result) throw new Error(`Registry function ${functionName} not found`);
  return result;
}
function arrayTerms(array, tree) {
  return array.elements.map(node => ({symbol: node.getText(tree), directSymbol: ts.isIdentifier(node) ? node.text : undefined,
    gate: gate(tree, node), start: node.getStart(tree)}));
}

export function officialCommands(index, tree, hash, loaderTree) {
  const registry = functionReturnArray(tree, 'Jho');
  const direct = new Set(arrayTerms(registry, tree).map(term => term.directSymbol).filter(Boolean));
  const conditionalKeys = new Set();
  for (const element of registry.elements) {
    if (!ts.isSpreadElement(element) || !ts.isCallExpression(element.expression) || element.expression.expression.getText(tree) !== 'x0') continue;
    const key = literal(element.expression.arguments[0]);
    if (key) conditionalKeys.add(key);
  }
  const conditional = new Map();
  walk(tree, node => {
    if (!ts.isFunctionDeclaration(node) || node.name?.text !== 'sqt') return;
    walk(node.body, inner => {
      if (!ts.isReturnStatement(inner) || !ts.isObjectLiteralExpression(inner.expression)) return;
      for (const group of inner.expression.properties) {
        if (!ts.isPropertyAssignment(group) || !conditionalKeys.has(name(group.name)) || !ts.isObjectLiteralExpression(group.initializer)) continue;
        for (const property of group.initializer.properties) {
          if (!ts.isPropertyAssignment(property) || !['whenOpen','whenClosed'].includes(name(property.name)) || !ts.isArrayLiteralExpression(property.initializer)) continue;
          for (const member of property.initializer.elements) if (ts.isIdentifier(member))
            conditional.set(member.text, `sqt.${name(group.name)}.${name(property.name)}; open=${group.initializer.properties.find(p => name(p.name) === 'open')?.getText(tree) ?? 'unknown'}`);
        }
      }
    });
  });
  const loaderMap = new Map();
  walk(loaderTree, node => {
    if (!ts.isVariableDeclaration(node) || name(node.name) !== 'x6' || !ts.isObjectLiteralExpression(node.initializer)) return;
    for (const property of node.initializer.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      let target;
      walk(property.initializer, inner => {
        if (ts.isCallExpression(inner) && inner.expression.kind === ts.SyntaxKind.ImportKeyword)
          target = literal(inner.arguments[0]);
      });
      if (target) loaderMap.set(name(property.name), path.basename(target));
    }
  });
  const aliases = new Map();
  walk(tree, node => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer && ts.isIdentifier(node.initializer))
      aliases.set(node.name.text, node.initializer.text);
  });
  const resolvesTo = (registered, binding) => {
    const seen = new Set(); let current = registered;
    while (current && !seen.has(current)) {
      if (current === binding) return true;
      seen.add(current); current = aliases.get(current);
    }
    return false;
  };
  return index.commands.map(command => {
    const binding = command.module === OFFICIAL_MODULES.commands ? bindingForObject(tree, command.start) : undefined;
    const registrySymbol = binding && [...direct, ...conditional.keys()].find(symbol => resolvesTo(symbol, binding));
    const registration = direct.has(registrySymbol) ? 'Jho-direct-or-alias' :
      conditional.has(registrySymbol) ? 'Jho-conditional-sqt' : 'not-proven-by-Jho-direct';
    return {name: command.name, type: command.type, binding, registration, registrySymbol,
      registryCondition: conditional.get(registrySymbol),
      gate: command.isEnabled ?? 'no-literal-isEnabled', hidden: command.isHidden ?? 'not-statically-declared',
      supportsNonInteractive: command.supportsNonInteractive ?? 'not-declared',
      loadExpression: command.load, loader: command.load ? 'object-load' : loaderMap.has(command.name) ? 'WT/x6-name-loader' : 'unresolved',
      loaderModule: loaderMap.get(command.name), loaderModuleSha256: index.modules.find(m => m.path === loaderMap.get(command.name))?.sha256,
      module: command.module, moduleSha256: index.modules.find(m => m.path === command.module)?.sha256,
      start: command.start, end: command.end};
  });
}

export function officialControls(tableTree, tableHash, inlineTree, inlineHash) {
  let table;
  walk(tableTree, node => {
    if (ts.isVariableDeclaration(node) && name(node.name) === 'Ee' && ts.isObjectLiteralExpression(node.initializer)) table = node.initializer;
  });
  if (!table) throw new Error('Official Ee control table not found');
  const rows = [];
  for (const property of table.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    rows.push({subtype: name(property.name), handler: property.initializer.getText(tableTree),
      registration: 'Ee-dispatch-table', ...anchor(tableTree, property, OFFICIAL_MODULES.controls, tableHash), gate: []});
  }
  walk(inlineTree, node => {
    if (!ts.isBinaryExpression(node) || ![ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken].includes(node.operatorToken.kind)) return;
    const left = node.left.getText(inlineTree), right = node.right.getText(inlineTree);
    const subtype = literal(node.right) ?? literal(node.left);
    const subject = literal(node.right) ? left : right;
    if (!subtype || !/\.request\.subtype$/.test(subject)) return;
    rows.push({subtype, registration: 'print-inline-dispatch',
      ...anchor(inlineTree, node, OFFICIAL_MODULES.inlineControls, inlineHash), gate: gate(inlineTree, node)});
  });
  return rows;
}

export function officialTools(tree, hash) {
  const imports = new Map(), variables = new Map();
  for (const statement of tree.statements) {
    if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier) && statement.importClause?.namedBindings && ts.isNamedImports(statement.importClause.namedBindings))
      for (const element of statement.importClause.namedBindings.elements)
        imports.set(element.name.text, {sourceModule: path.basename(statement.moduleSpecifier.text), exportSymbol: element.propertyName?.text ?? element.name.text});
    if (ts.isVariableStatement(statement)) for (const declaration of statement.declarationList.declarations)
      if (ts.isIdentifier(declaration.name)) {
        const match = declaration.initializer?.getText(tree).match(/import\.meta\.require\("\/\$bunfs\/root\/([^"/]+)"\)\.([A-Za-z_$][\w$]*)/);
        if (match) variables.set(declaration.name.text, {sourceModule: match[1], exportSymbol: match[2]});
      }
  }
  return arrayTerms(functionReturnArray(tree, 'Jw'), tree).map(term => ({
    symbol: term.symbol, directSymbol: term.directSymbol, registration: term.directSymbol ? 'Jw-direct' : 'Jw-expression',
    module: OFFICIAL_MODULES.tools, moduleSha256: hash, start: term.start, gate: term.gate,
    activationExpression: term.symbol,
    ...imports.get(term.directSymbol), ...variables.get(term.directSymbol),
  }));
}

function localTree(file) {
  const bytes = fs.readFileSync(file);
  const tree = source(file, bytes.toString('utf8'));
  if (tree.parseDiagnostics.length) throw new Error(`Local AST parse failed: ${file}`);
  return {tree, hash: sha256(bytes)};
}
function filesUnder(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap(entry =>
    entry.isDirectory() ? filesUnder(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
}
export function localCommands(root) {
  const registryFile = path.join(root, 'src/commands.ts');
  const {tree: registry, hash: registryHash} = localTree(registryFile);
  const registryText = registry.getText();
  if (!registryText.includes('...COMMANDS()') || !registryText.includes('selectNonInteractiveCommands(COMMANDS())'))
    throw new Error('Local command registry chain changed');
  const importedFiles = new Set();
  walk(registry, node => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const candidate = path.resolve(path.dirname(registryFile), node.moduleSpecifier.text.replace(/\.js$/, ''));
      importedFiles.add(candidate + '.ts'); importedFiles.add(candidate + '.tsx');
    }
  });
  const conditionalImports = new Set();
  const commandRegistrySlice = registryText.slice(registryText.indexOf('const COMMANDS'), registryText.indexOf('export const builtInCommandNames'));
  walk(registry, node => {
    if (!ts.isVariableDeclaration(node) || !ts.isIdentifier(node.name) || !node.initializer || !commandRegistrySlice.includes(node.name.text)) return;
    walk(node.initializer, inner => {
      if (!ts.isCallExpression(inner) || inner.expression.getText(registry) !== 'require') return;
      const specifier = literal(inner.arguments[0]);
      if (!specifier?.startsWith('./commands/')) return;
      const candidate = path.resolve(path.dirname(registryFile), specifier.replace(/\.js$/, ''));
      conditionalImports.add(candidate + '.ts'); conditionalImports.add(candidate + '.tsx');
    });
  });
  const extensionFile = path.join(root, 'src/commands/noninteractive/index.ts');
  const {tree: extensionTree} = localTree(extensionFile);
  const extensionImports = new Map();
  walk(extensionTree, node => {
    if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier) || !node.importClause?.name) return;
    const candidate = path.resolve(path.dirname(extensionFile), node.moduleSpecifier.text.replace(/\.js$/, ''));
    extensionImports.set(node.importClause.name.text, new Set([candidate + '.ts', candidate + '.tsx']));
  });
  const extensionFiles = new Set();
  walk(extensionTree, node => {
    if (!ts.isFunctionDeclaration(node) || node.name?.text !== 'getExtensionCommands') return;
    walk(node.body, inner => {
      if (!ts.isReturnStatement(inner) || !ts.isArrayLiteralExpression(inner.expression)) return;
      for (const element of inner.expression.elements)
        if (ts.isIdentifier(element)) for (const file of extensionImports.get(element.text) ?? []) extensionFiles.add(file);
    });
  });
  const rows = [];
  for (const file of filesUnder(path.join(root, 'src/commands')).filter(file => /\.tsx?$/.test(file))) {
    const {tree, hash} = localTree(file);
    walk(tree, node => {
      if (ts.isCallExpression(node) && node.expression.getText(tree) === 'textCommand') {
        const commandName = literal(node.arguments[0]);
        if (commandName) rows.push({name: commandName, type: 'local', file: path.relative(root, file),
          line: line(tree, node), sourceSha256: hash, isEnabled: node.arguments[3]?.getText(tree) ?? 'not-declared',
          registration: importedFiles.has(file) ? 'textCommand-imported-by-registry' :
            conditionalImports.has(file) ? 'textCommand-conditional-require-by-registry' :
            extensionFiles.has(file) ? 'textCommand-getExtensionCommands-registry' : 'textCommand-indirect-or-definition'});
      }
      if (!ts.isObjectLiteralExpression(node)) return;
      const props = new Map(node.properties.filter(ts.isPropertyAssignment).map(p => [name(p.name), p.initializer]));
      const commandName = literal(props.get('name')), type = literal(props.get('type'));
      if (!commandName || !['local', 'local-jsx', 'prompt'].includes(type)) return;
      rows.push({name: commandName, type, file: path.relative(root, file), line: line(tree, node),
        sourceSha256: hash, isEnabled: props.get('isEnabled')?.getText(tree) ?? 'not-declared',
        registration: importedFiles.has(file) ? 'imported-by-commands-registry' :
          conditionalImports.has(file) ? 'conditional-require-by-commands-registry' : 'definition-only-or-indirect'});
    });
  }
  // Text twins are factories, not literal command objects; their registry is explicit.
  const twinFile = path.join(root, 'src/commands/noninteractive/index.ts');
  const {tree: twins, hash: twinHash} = localTree(twinFile);
  walk(twins, node => {
    if (!ts.isCallExpression(node) || node.expression.getText(twins) !== 'textCommand') return;
    const commandName = literal(node.arguments[0]);
    if (commandName) rows.push({name: commandName, type: 'local', file: path.relative(root, twinFile),
      line: line(twins, node), sourceSha256: twinHash, registration: 'nonInteractiveCommands-text-twin',
      isEnabled: node.arguments[3]?.getText(twins) ?? 'not-declared'});
  });
  return {registry: {file: 'src/commands.ts', sourceSha256: registryHash}, rows};
}

export function localControls(root) {
  const file = path.join(root, 'src/cli/print.ts');
  const {tree, hash} = localTree(file);
  const rows = [];
  walk(tree, node => {
    if (!ts.isBinaryExpression(node) || ![ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken].includes(node.operatorToken.kind)) return;
    const subtype = literal(node.right) ?? literal(node.left);
    const subject = literal(node.right) ? node.left.getText(tree) : node.right.getText(tree);
    if (!subtype || !/\.request\.subtype$/.test(subject)) return;
    rows.push({subtype, file: 'src/cli/print.ts', line: line(tree, node), sourceSha256: hash,
      registration: 'print-dispatch-comparison', gate: gate(tree, node)});
  });
  return rows;
}

export function localTools(root) {
  const file = path.join(root, 'src/tools.ts');
  const {tree, hash} = localTree(file);
  let array;
  walk(tree, node => {
    if (ts.isFunctionDeclaration(node) && node.name?.text === 'getAllBaseTools')
      walk(node.body, inner => { if (ts.isReturnStatement(inner) && ts.isArrayLiteralExpression(inner.expression)) array = inner.expression; });
  });
  if (!array) throw new Error('Local getAllBaseTools array not found');
  return arrayTerms(array, tree).map(term => ({symbol: term.symbol, directSymbol: term.directSymbol,
    file: 'src/tools.ts', sourceSha256: hash, start: term.start, gate: term.gate,
    activationExpression: term.symbol}));
}

export function inventory(root, officialBase) {
  const index = JSON.parse(fs.readFileSync(path.join(officialBase, 'index.json'), 'utf8'));
  if (index.version !== '2.1.283' || index.platform !== 'darwin-arm64' || index.parseErrors.length) throw new Error('Wrong official index');
  const rawRoot = path.join(officialBase, 'raw'), pinned = readPinned(rawRoot, index);
  const get = key => pinned.get(OFFICIAL_MODULES[key]);
  const localFlagsFile = path.join(root, 'src/main.tsx');
  const {tree: localFlagsTree, hash: localFlagsHash} = localTree(localFlagsFile);
  return {schemaVersion: 1, version: index.version, platform: index.platform, binarySha256: index.binarySha256,
    scope: 'Pinned static registration/call-site evidence; gates and actual behavior require separate review. SDK type declarations and raw string occurrences are not runtime registrations.',
    flags: {official: optionCalls(get('flags').tree, OFFICIAL_MODULES.flags, get('flags').hash),
      local: optionCalls(localFlagsTree, 'src/main.tsx', localFlagsHash)},
    commands: {official: officialCommands(index, get('commands').tree, get('commands').hash, get('commandLoader').tree), local: localCommands(root)},
    controls: {official: officialControls(get('controls').tree, get('controls').hash, get('inlineControls').tree, get('inlineControls').hash),
      local: localControls(root)},
    tools: {official: officialTools(get('tools').tree, get('tools').hash).map(row => ({...row,
      sourceModuleSha256: index.modules.find(m => m.path === row.sourceModule)?.sha256})), local: localTools(root)},
    moduleHashes: Object.fromEntries([...pinned].map(([file, entry]) => [file, entry.hash]))};
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const [root, officialBase, destination] = process.argv.slice(2);
  if (!root || !officialBase || !destination) throw new Error('Usage: node registration-inventory.mjs REPO_ROOT OFFICIAL_PLATFORM_DIR OUTPUT_JSON');
  const result = inventory(path.resolve(root), path.resolve(officialBase));
  fs.writeFileSync(destination, JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({flags: result.flags.official.length, commands: result.commands.official.length,
    controls: result.controls.official.length, tools: result.tools.official.length}));
}
