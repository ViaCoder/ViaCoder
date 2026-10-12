// Generated full original stateless MCP scope/pruning/startup declarations.
export function createProjectMcpNative287({ An }) {
    function fy(e, n) { let r = An(n), s = e.name; if (!s)
        return !1; return s.startsWith(`mcp__${r}__`) || s.startsWith(`${r}:`); }
    ;
    function KV(e, n) { let r = Ds(n); return e.filter((s) => !zc(s, n, r)); }
    ;
    function Jte(e, n) { return e.filter((r) => !fy(r, n)); }
    ;
    function hlt(e, n) { let r = { ...e }; return delete r[n], r; }
    ;
    function axr(e, n) { return (e.scope === "project" || e.scope === "local") && e.declaredIn !== void 0 && e.declaredIn !== n; }
    ;
    function lxr(e, n) { let r = e.clients.filter(n); if (r.length === 0)
        return { ...e, stale: [] }; let { tools: s, commands: g, resources: h } = e, b = { ...e.resourceTemplates }; for (let D of r)
        s = KV(s, D.name), g = Jte(g, D.name), h = hlt(h, D.name), delete b[D.name]; let w = new Set(r.map((D) => D.name)); return { clients: e.clients.filter((D) => !w.has(D.name)), tools: s, commands: g, resources: h, resourceTemplates: b, stale: r }; }
    ;
    function Kle(e) { return e.type === "stdio" || e.type === void 0; }
    ;
    function HA() { return Object.create(null); }
    ;
    function pG(e, n, r) { let s = HA(); if (e)
        for (let [g, h] of Object.entries(e))
            s[g] = r === void 0 ? { ...h, scope: n } : { ...h, scope: n, declaredIn: r }; return s; }
    ;
    function sde(e) { return Zw(e) || mZ(e); }
    ;
    function Ds(e) { return `mcp__${An(e)}__`; }
    ;
    function zc(e, n, r) { if (e.mcpInfo?.serverName !== void 0)
        return e.mcpInfo.serverName === n; return e.name.startsWith(r ?? Ds(n)); }
    ;
    function us(e) { let n = e.split("__"), [r, t, ...o] = n; if (r !== "mcp" || !t)
        return null; let s = o.length > 0 ? o.join("__") : void 0; return { serverName: t, toolName: s }; }
    ;
    function mbt(e, n) { if (e.startsWith("plugin:") || n.startsWith("plugin:"))
        return e === n; return An(e) === An(n); }
    ;
    function M8o(e, { listedServer: n, parsedServer: r }) { if (n !== void 0)
        return e === n; return r !== void 0 && mbt(r, e); }
    ;
    const ac = "claude-in-chrome";
    function Zw(e) { return An(e) === ac; }
    ;
    const Ox = "computer-use";
    function mZ(e) { return An(e) === Ox; }
    ;
    const $6e = (r, o) => Kle(o) && !sde(r);
    return { prune: lxr, departed: axr, addScope: pG, deferred: $6e, parseTool: us, promptServerDeparted: M8o };
}
