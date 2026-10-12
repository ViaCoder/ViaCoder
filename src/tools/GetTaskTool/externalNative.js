// Complete pinned 2.1.287 GetTask definition/helpers. Host owners are explicit ports.
function module0(imports) {
    const rr = imports["rr"];
    const Wi = imports["Wi"];
    function Vh(e) { if (rr().terminalEmitClaims.has(e))
        return !1; return rr().terminalEmitClaims.add(e), !0; }
    ;
    function Ii(e, n, r) { if (!Vh(e))
        return; Wi({ type: "system", subtype: "task_notification", task_id: e, tool_use_id: r?.toolUseId, status: n, ...r?.reason !== void 0 && { reason: r.reason }, output_file: r?.outputFile ?? "", summary: r?.summary ?? "", usage: r?.usage, ...r?.resourceLinks && { resource_links: [...r.resourceLinks] }, ...r?.skipTranscript !== void 0 && { skip_transcript: r.skipTranscript }, ...r?.ambient && { ambient: !0 } }); }
    ;
    function pJe(e) { return e !== void 0 && e.agentType === "subagent" && e.isAsync === !1; }
    ;
    return { Vh, Ii, pJe };
}
function module1(imports) {
    function tc(t, n) { if (n <= 0)
        return ""; if (t.length <= n)
        return t; let e = t.slice(-n), r = e.charCodeAt(0); return f(r >= 56320 && r <= 57343 ? e.slice(1) : e); }
    ;
    function f(t) { if (typeof Buffer < "u")
        return Buffer.from(t, "utf16le").toString("utf16le"); return x(t); }
    ;
    function x(t) { let e = []; for (let r = 0; r < t.length; r += 8192) {
        let i = Math.min(r + 8192, t.length), o = new Uint16Array(i - r);
        for (let u = r; u < i; u++)
            o[u - r] = t.charCodeAt(u);
        e.push(String.fromCharCode(...o));
    } return e.join(""); }
    ;
    return { tc, f, x };
}
function module2(imports) {
    const t = imports["t"];
    const d = imports["d"];
    const uxe = imports["uxe"];
    const Ii = imports["Ii"];
    const Sp = imports["Sp"];
    const BN = imports["BN"];
    const rr = imports["rr"];
    const tc = imports["tc"];
    const Qu = imports["Qu"];
    var z3 = { memory_pressure: "stopped because the system is running low on memory", deadline: "stopped after reaching its background time limit" };
    var V3 = { memory_pressure: "This is not a failure of the command. Claude Code stopped it because the system was critically low on memory while the session was idle, which says nothing about the command or its own memory use, so there is nothing in it to debug. Do not start it again on your own, even if the work seems to need it: memory may still be short. Report what was stopped and why, and start it again only when asked. The user can turn this behavior off by starting Claude Code with CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP=1 in its environment; setting it from a shell command has no effect.", deadline: "If the work in progress still needs it, start it again with `run_in_background` and a longer `timeout`. If it already had the longest `timeout` allowed, do not restart it. Either way, report that it was stopped." };
    var SXe = 12000;
    function J3(e) { return new Date(e).toISOString(); }
    ;
    function Xkn({ content: e, omittedBytes: n }, r) {
        let s = tc(e, SXe), g = n > 0 || s.length < e.length, h = s.replace(/^\n+/, "").trimEnd();
        return g ? `[\u2026 earlier output omitted; full output: ${r}]
${h}` : h;
    }
    ;
    function cN({ taskId: e, outcome: n, exitCode: r, startTime: s, endTime: g, outputFile: h, output: b, stopCause: w }) { let D = { createdAt: J3(s), lastUpdatedAt: J3(g) }; if (n === "killed") {
        let z = w ? `${z3[w]}. ${V3[w]}` : "stopped before it completed.";
        return { taskId: e, status: "cancelled", statusMessage: `The command was ${z} Output so far: ${h}`, ...D };
    } let j = b ? Xkn(b, h) : ""; return { taskId: e, status: "completed", statusMessage: r === void 0 ? `Exited; the exit code is not known. Full output: ${h}` : `Exited with code ${r}. Full output: ${h}`, ...D, result: { content: j ? [{ type: "text", text: j }] : [], isError: n === "failed" } }; }
    ;
    function Lu(e) { return typeof e === "object" && e !== null && "type" in e && e.type === "local_bash"; }
    ;
    function _N(e, n) {
        let r, s = !1;
        if (n.update(e, (g) => { if (g.status !== "running" || !Lu(g))
            return g; try {
            t(`LocalShellTask ${e} kill requested`), g.shellCommand?.kill(), g.shellCommand?.cleanup();
        }
        catch (h) {
            d(h);
        } return s = g.notified, r = { toolUseId: g.toolUseId, description: g.description, isAdopted: g.isAdopted === !0, startTime: g.startTime, agentId: g.agentId, kind: g.kind }, { ...g, status: "killed", notified: !0, shellCommand: null, endTime: Date.now() }; }), r && !s) {
            if (!r.isAdopted)
                uxe(e, `
[killed]
`);
            Ii(e, "stopped", { toolUseId: r.toolUseId, summary: r.description, outputFile: Sp(e) });
        }
        if (r && !s && r.kind !== "monitor" && BN())
            rr().rememberBashTaskSnapshot(e, cN({ taskId: e, outcome: "killed", exitCode: void 0, startTime: r.startTime, endTime: Date.now(), outputFile: Sp(e), output: void 0 }), r.agentId);
        Qu(e);
    }
    ;
    return { z3, V3, SXe, J3, Xkn, cN, Lu, _N };
}
function module3(imports) {
    const Lu = imports["Lu"];
    const t = imports["t"];
    const _N = imports["_N"];
    const Sdt = imports["Sdt"];
    function Fs(e, s) { for (let [n, r] of Object.entries(s.all()))
        if (Lu(r) && r.agentId === e && r.status === "running")
            t(`killShellTasksForAgent: killing orphaned shell task ${n} (agent ${e} exiting)`), _N(n, s); Sdt((n) => n.agentId === e); }
    ;
    return { Fs };
}
function module4(imports) {
    function yi(e) { return e === "completed" || e === "failed" || e === "killed"; }
    ;
    return { yi };
}
function module5(imports) {
    const Lu = imports["Lu"];
    const yi = imports["yi"];
    const t = imports["t"];
    const _N = imports["_N"];
    const d = imports["d"];
    function dh({ shuttingDown: e, remoteTransport: r }) { return !e && !r; }
    ;
    function uh(e) { for (let r of Object.values(e.all())) {
        if (!Lu(r) || r.status !== "running")
            continue;
        if (!r.isBackgrounded && r.agentId !== void 0) {
            let n = e.get(r.agentId);
            if (n === void 0 || !yi(n.status))
                continue;
        }
        t(`print teardown: killing shell ${r.id} ("${r.description}") still running at stream close`);
        try {
            _N(r.id, e);
        }
        catch (n) {
            d(n);
        }
    } }
    ;
    return { dh, uh };
}
export function createGetTaskExternalNative287(ports) {
    for (const name of ["appendOutput", "debug", "dequeueForAgent", "enabled", "enqueueHostEvent", "evictOutput", "killTask", "logError", "outputPath", "taskSession"])
        if (ports[name] === undefined)
            throw Error('Missing task registration host port: ' + name);
    const m0 = module0({ "rr": ports["taskSession"], "Wi": ports["enqueueHostEvent"] });
    const m1 = module1({});
    const m2 = module2({ "t": ports["debug"], "d": ports["logError"], "uxe": ports["appendOutput"], "Ii": m0["Ii"], "Sp": ports["outputPath"], "BN": ports["enabled"], "rr": ports["taskSession"], "tc": m1["tc"], "Qu": ports["evictOutput"] });
    const m3 = module3({ "Lu": m2["Lu"], "t": ports["debug"], "_N": ports["killTask"], "Sdt": ports["dequeueForAgent"] });
    const m4 = module4({});
    const m5 = module5({ "Lu": m2["Lu"], "yi": m4["yi"], "t": ports["debug"], "_N": ports["killTask"], "d": ports["logError"] });
    return { killShell: m2["_N"], killForAgent: m3["Fs"], synchronousAgent: m0["pJe"], closeShells: m5["uh"], shouldCloseShells: m5["dh"], emitTerminal: m0["Ii"] };
}
