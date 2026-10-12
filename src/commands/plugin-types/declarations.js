// Extracted from official npm 2.1.283 chunk-hzevqd7x.js; source hash in evidence.json.
import { readFileSync } from 'node:fs';
const sRr = readFileSync(new URL('./claude-code.d.ts.txt', import.meta.url), 'utf8');
const S = JSON.stringify;
const M = values => [...new Set(values)];
const z = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const t = () => {}; // Host debug logging only, no change to emitted declarations.
var Con = (e) => `// Written by Claude Code ${e}.
${sRr}
`;
var h0t = "claude-code.d.ts";
var jm = (e) => e.replace(/\s+/g, " ").trim().replace(/\*\//g, "* /");
function sE(e, n) {
    let { description: r } = e, g = typeof r === "string" ? jm(r) : "";
    return g === "" ? "" : `${n}/** ${g} */
`;
}
var aE = /^[A-Za-z_$][\w$]*$/;
var lE = (e) => aE.test(e) ? e : S(e);
function cE(e) { return typeof e === "string" || typeof e === "number" || typeof e === "boolean" || e === null ? S(e) : "unknown"; }
var M$ = 32;
function jo(e, n = "", r = 0) {
    if (e === !0 || r > M$)
        return "unknown";
    if (e === !1)
        return "never";
    if (!z(e))
        return "unknown";
    if ("const" in e)
        return cE(e.const);
    if (Array.isArray(e.enum))
        return e.enum.map(cE).join(" | ") || "never";
    if (Array.isArray(e.anyOf) || Array.isArray(e.oneOf)) {
        let s = (e.anyOf ?? e.oneOf).map((g) => jo(g, n, r + 1));
        return s.length === 0 ? "unknown" : M(s).join(" | ");
    }
    if (Array.isArray(e.allOf)) {
        let s = e.allOf.map((h) => jo(h, n, r + 1));
        return s.length === 0 ? "unknown" : s.map((h) => h.includes(" | ") ? `(${h})` : h).join(" & ");
    }
    if (Array.isArray(e.type))
        return M(e.type.map((s) => jo({ ...e, type: s }, n, r + 1))).join(" | ") || "unknown";
    switch (e.type) {
        case "string": return "string";
        case "number":
        case "integer": return "number";
        case "boolean": return "boolean";
        case "null": return "null";
        case "array": {
            if (Array.isArray(e.items))
                return `[${e.items.map((h) => jo(h, n, r + 1)).join(", ")}]`;
            let s = jo(e.items, n, r + 1);
            return s.includes(" | ") || s.includes(" & ") || s.includes("/*") ? `Array<${s}>` : `${s}[]`;
        }
        case "object":
        case void 0: {
            if (!z(e.properties)) {
                let w = e.type === "object", v = "$ref" in e;
                return w ? "{}" : v ? `unknown /* $ref ${jm(String(e.$ref))} */` : "unknown";
            }
            let s = new Set(Array.isArray(e.required) ? e.required.map(String) : []), g = `${n}  `, h = Object.entries(e.properties).map(([w, v]) => { let A = z(v) ? sE(v, g) : "", T = s.has(w) ? "" : "?", D = jo(v, g, r + 1); return `${A}${g}${lE(w)}${T}: ${D}`; });
            return h.length === 0 ? "{}" : `{
${h.join(`
`)}
${n}}`;
        }
        default: return "unknown";
    }
}
var Cl = (e, n, r = (s) => jo(s.inputSchema, "    ")) => ["declare module 'claude-code' {", `  interface ${e} {`, ...[...n].sort((s, g) => s.name.localeCompare(g.name)).map((s) => { let h = s.description === void 0 ? "" : sE({ description: s.description }, "    "), b = lE(s.name); return `${h}    ${b}: ${r(s)}`; }), "  }", "}"];
var F$ = (e) => ["// The inputs of the built-in tools this build has, from each tool's", "// input schema. Merges into ToolCallInput (BuiltinToolInputs) so", '// `e.tool === "Bash"` narrows to the tool\'s arguments.', ...Cl("BuiltinToolInputs", e), "", "// The structured results of the same tools, from each tool's output", "// schema. Merges into ToolCallResult (BuiltinToolResults) so after", '// `e.tool === "Bash"` the `result` of `next(e)` is the tool\'s record.', ...Cl("BuiltinToolResults", e, (n) => n.outputSchema !== void 0 ? jo(n.outputSchema, "    ") : "unknown"), ""].join(`
`);
var O6o = (e) => ["// The inputs of the MCP tools this session had, from each server's tools/list", "// inputSchema; written by `/plugin-types` (src/plugins/functionHooks/mcp-tool-types/mcp-tool-declarations.ts).", "// Merges into the engine's ToolCallInput (types/ McpToolInputs) so", '// `e.tool === "mcp__<server>__<tool>"` narrows to the tool\'s arguments.', "// Regenerate rather than edit.", "export {}", ...Cl("McpToolInputs", e), ""].join(`
`);
function D6o(e) { let n = []; for (let r of e) {
    if (!r.name.startsWith("mcp__"))
        continue;
    if (r.inputJSONSchema === void 0) {
        t(`plugin-types: ${r.name} has no inputJSONSchema; skipped`);
        continue;
    }
    n.push({ name: r.name, inputSchema: r.inputJSONSchema, ...r.description !== void 0 && { description: r.description } });
} return n; }
var iRr = (e, n) => Con(e) + F$(n);
export {jo as schemaToType, O6o as mcpDeclarations, D6o as mcpSchemas, iRr as pluginDeclarations};
