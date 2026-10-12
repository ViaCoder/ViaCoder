var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
// Complete pinned 2.1.287 GetTask definition/helpers. Host owners are explicit ports.
function module0(imports) {
    var Km = "GetTask";
    var n2t = "Repeated GetTask call; not answered again.";
    return { Km, n2t };
}
function module1(imports) {
    var Ue = "Bash";
    return { Ue };
}
function module2(imports) {
    class i {
        resetters = [];
        built = [];
        lazy(e) { let t, r = () => { t = void 0; }; return this.resetters.push(r), () => { if (t === void 0)
            t = e(), this.built.push(r); return t; }; }
        builtCount() { return this.built.length; }
        releaseBuiltSince(e) { for (let t of this.built.splice(e))
            t(); }
        reset() { for (let e of this.resetters)
            e(); this.built.length = 0; }
    }
    ;
    var _rr = new i;
    function f(e) { return _rr.lazy(e); }
    ;
    return { i, _rr, f };
}
function module3(imports) {
    var dt = "Read";
    return { dt };
}
function module4(imports) {
    function Le(e) { if (!e)
        return !1; if (typeof e === "boolean")
        return e; let n = String(e).toLowerCase().trim(); return ["1", "true", "yes", "on"].includes(n); }
    ;
    return { Le };
}
function module5(imports) {
    const Le = imports["Le"];
    const process = imports["process"];
    var N = /^[+-]?(\d+(\.\d*)?|\.\d+)[eE][+-]?\d+$/;
    var E = /^[+-]?\d{1,3}([_,\u00A0\u202F ])\d{3}(?:\1\d{3})*$/;
    var c = /[_,\u00A0\u202F ]/g;
    function m(e) { if (e.length <= 32) {
        if (N.test(e)) {
            let n = Number(e);
            return Number.isInteger(n) ? n : NaN;
        }
        if (E.test(e))
            return parseInt(e.replace(c, ""), 10);
    } return; }
    ;
    function Oc(e) { let n = String(e).trim(); return m(n) ?? parseInt(n, 10); }
    ;
    function i(e) { let n = process.argv.indexOf("--"); return (n === -1 ? process.argv : process.argv.slice(0, n)).includes(e); }
    ;
    function xr() { return Le(process.env.CLAUDE_CODE_SIMPLE) || i("--bare"); }
    ;
    return { N, E, c, m, Oc, i, xr };
}
function module6(imports) {
    const process = imports["process"];
    const Oc = imports["Oc"];
    var Me = 120000;
    var Ne = 600000;
    function cSe(e = process.env) { let n = e.BASH_DEFAULT_TIMEOUT_MS; if (n) {
        let r = Oc(n);
        if (!isNaN(r) && r > 0)
            return r;
    } return Me; }
    ;
    function dSe(e = process.env) { let n = e.BASH_MAX_TIMEOUT_MS; if (n) {
        let r = Oc(n);
        if (!isNaN(r) && r > 0)
            return Math.max(r, cSe(e));
    } return Math.max(Ne, cSe(e)); }
    ;
    return { Me, Ne, cSe, dSe };
}
function module7(imports) {
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
function module8(imports) {
    const n = imports["n"];
    function zfe() { return n().host.launchOptions.singleShotPrintSession(); }
    ;
    function P3t() { return n().host.launchOptions.strictToolResultPairing(); }
    ;
    return { zfe, P3t };
}
function module9(imports) {
    var wr = { [Symbol.dispose]() { } };
    function Rr() { return wr; }
    ;
    var ng = Rr;
    function _(e, n, r) { const env_1 = { stack: [], error: void 0, hasError: false }; try {
        const s = __addDisposableResource(env_1, ng `JSON.stringify(${Se(e)})`, false);
        return JSON.stringify(e, n, r);
    }
    catch (e_1) {
        env_1.error = e_1;
        env_1.hasError = true;
    }
    finally {
        __disposeResources(env_1);
    } }
    ;
    function Se(e) { return typeof e === "string" ? e.length : e; }
    ;
    return { wr, Rr, ng, _, Se };
}
function module10(imports) {
    const f = imports["f"];
    const Wo = imports["Wo"];
    const u = imports["u"];
    const o = imports["o"];
    const x = imports["x"];
    const T = imports["T"];
    const H = imports["H"];
    const C = imports["C"];
    const dt = imports["dt"];
    const dSe = imports["dSe"];
    const Km = imports["Km"];
    const tc = imports["tc"];
    const zfe = imports["zfe"];
    const _ = imports["_"];
    var z3 = { memory_pressure: "stopped because the system is running low on memory", deadline: "stopped after reaching its background time limit" };
    var V3 = { memory_pressure: "This is not a failure of the command. Claude Code stopped it because the system was critically low on memory while the session was idle, which says nothing about the command or its own memory use, so there is nothing in it to debug. Do not start it again on your own, even if the work seems to need it: memory may still be short. Report what was stopped and why, and start it again only when asked. The user can turn this behavior off by starting Claude Code with CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP=1 in its environment; setting it from a shell command has no effect.", deadline: "If the work in progress still needs it, start it again with `run_in_background` and a longer `timeout`. If it already had the longest `timeout` allowed, do not restart it. Either way, report that it was stopped." };
    var SXe = 12000;
    var T2n = 4 * SXe;
    var Y3 = { taskId: o(), statusMessage: o(), createdAt: o(), lastUpdatedAt: o() };
    var GRr = f(() => Wo("status", [u({ ...Y3, status: x("working") }), u({ ...Y3, status: x("completed"), result: u({ content: T(u({ type: x("text"), text: o() })), isError: H() }) }), u({ ...Y3, status: x("failed"), error: u({ code: C(), message: o() }) }), u({ ...Y3, status: x("cancelled") })]));
    function Wle(e) { let n = GRr().safeParse(e); return n.success ? n.data : null; }
    ;
    function IOt(e) { return _(zkn(e)); }
    ;
    function zkn(e) { let { taskId: n, statusMessage: r, createdAt: s, lastUpdatedAt: g } = e; switch (e.status) {
        case "working": return { taskId: n, status: "working", statusMessage: r, createdAt: s, lastUpdatedAt: g };
        case "completed": return { taskId: n, status: "completed", statusMessage: r, createdAt: s, lastUpdatedAt: g, result: { content: e.result.content.map(({ type: h, text: b }) => ({ type: h, text: b })), isError: e.result.isError } };
        case "failed": return { taskId: n, status: "failed", statusMessage: r, createdAt: s, lastUpdatedAt: g, error: { code: e.error.code, message: e.error.message } };
        case "cancelled": return { taskId: n, status: "cancelled", statusMessage: r, createdAt: s, lastUpdatedAt: g };
    } }
    ;
    function qkn(e) { return `Output is being written to ${e}; use ${dt} on that path for interim output.`; }
    ;
    var wXe = "between your tool calls if you are still working, or by starting a new turn if you have already replied";
    var Kkn = "Its result is delivered to the agent that started it, not to you.";
    var Vkn = `Do not call ${Km} again for this task: when the command finishes, its result is delivered to you automatically \u2014 ${wXe} (usually as a ${Km} result, otherwise as a task notification). If that result is all you are waiting for, end your turn; otherwise continue with other work.`;
    function dlt(e) { return e ? "final_response" : zfe() ? "session" : void 0; }
    ;
    function T_e() { return `If you still need its result and have other work, keep working \u2014 it reaches you between your tool calls if it exits in time; if waiting for it is all that is left, wait with one foreground shell command that blocks until the output file shows what you need, rather than checking on it repeatedly. Next time, run a command you must wait on in the foreground (with a timeout of up to ${Math.floor(dSe() / 60000)} minutes) and keep the background for work you can start and forget.`; }
    ;
    function Ykn(e) { return `Its result reaches you only if it finishes while you are still working: it is terminated ${e === "final_response" ? "when you give your final response" : "when your turn ends, since this session takes no further input"}, and nothing can follow that. ${T_e()}`; }
    ;
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
    function yAo(e) { switch (e) {
        case "pending":
        case "running":
        case "paused": return "working";
        case "completed":
        case "failed": return "completed";
        case "killed": return "cancelled";
    } }
    ;
    function _Ao(e, n, r) { switch (e.status) {
        case "pending":
        case "running":
        case "paused": return { taskId: e.id, status: "working", statusMessage: `Still running. ${qkn(e.outputFile)} ${r === "other_agent" ? Kkn : r ? Ykn(r) : Vkn}`, createdAt: J3(e.startTime), lastUpdatedAt: J3(e.startTime) };
        case "completed":
        case "failed": return cN({ taskId: e.id, outcome: e.status, exitCode: e.isAdopted ? void 0 : e.result?.code, startTime: e.startTime, endTime: e.endTime ?? e.startTime, outputFile: e.outputFile, output: n });
        case "killed": return cN({ taskId: e.id, outcome: "killed", exitCode: void 0, startTime: e.startTime, endTime: e.endTime ?? e.startTime, outputFile: e.outputFile, output: void 0 });
    } }
    ;
    function Lu(e) { return typeof e === "object" && e !== null && "type" in e && e.type === "local_bash"; }
    ;
    return { z3, V3, SXe, T2n, Y3, GRr, Wle, IOt, zkn, qkn, wXe, Kkn, Vkn, dlt, T_e, Ykn, J3, Xkn, cN, yAo, _Ao, Lu };
}
function module11(imports) {
    var S = null;
    function n4o(e) { let n = S; return S = e, n; }
    ;
    return { S, n4o };
}
function module12(imports) {
    const ko = imports["ko"];
    const k = imports["k"];
    const n4o = imports["n4o"];
    var bu = { reader: null };
    function lm(e) { let n = bu.reader; return bu.reader = e, n; }
    ;
    function pJe(e) { return e !== void 0 && e.agentType === "subagent" && e.isAsync === !1; }
    ;
    function lo(e, n) { let r = ko().pinnedFeatureValues ??= new Map; if (!r.has(e))
        r.set(e, k(e, n)); return r.get(e); }
    ;
    lm(lo);
    ;
    n4o(lo);
    ;
    return { bu, lm, pJe, lo };
}
function module13(imports) {
    const xk = imports["xk"];
    const a = imports["a"];
    const xr = imports["xr"];
    function Za() { return xk().backgroundTasksDisabled || a.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS || xr(); }
    ;
    return { Za };
}
function module14(imports) {
    const lo = imports["lo"];
    const Za = imports["Za"];
    const P3t = imports["P3t"];
    const xr = imports["xr"];
    function BN() { return lo("tengu_violin_rosin", !1) === !0 && !Za() && !P3t() && !xr(); }
    ;
    return { BN };
}
function module15(imports) {
    function yo(t) { return t; }
    ;
    return { yo };
}
function module16(imports) {
    const JC = imports["JC"];
    const yo = imports["yo"];
    function q4(e) { if (e.agentId)
        return e.agentId; let n = JC(); return n ? yo(n.agentId) : void 0; }
    ;
    function GMe(e, n) { if (e === void 0)
        return !0; return e === n; }
    ;
    return { q4, GMe };
}
function module17(imports) {
    const GMe = imports["GMe"];
    var O = 64;
    class Uot {
        #t = new Map;
        started(t, n) { this.#t.set(t, this.#t.get(t) ?? n); let e = [...this.#t].filter(([, r]) => r.hostName === n.hostName); if (e.length > O)
            this.#t.delete(e[0]?.[0] ?? t); }
        find(t, n) { let e = this.#t.get(t); return e && GMe(n, e.agentId) ? e : void 0; }
    }
    ;
    return { O, Uot };
}
function module18(imports) {
    function r(n) { return n; }
    ;
    function S(n) { return r(n); }
    ;
    function c(n) { return r(n); }
    ;
    return { r, S, c };
}
function module19(imports) {
    class P extends Error {
        telemetryMessage;
        errorClass;
        constructor(n, e, t) { super(n); this.name = "TelemetrySafeError", this.telemetryMessage = e ?? n, this.errorClass = t; }
    }
    ;
    return { P };
}
function module20(imports) {
    const Wt = imports["Wt"];
    const Km = imports["Km"];
    const Ue = imports["Ue"];
    const f = imports["f"];
    const Ve = imports["Ve"];
    const o = imports["o"];
    const GRr = imports["GRr"];
    const BN = imports["BN"];
    const Wle = imports["Wle"];
    const n2t = imports["n2t"];
    const q4 = imports["q4"];
    const rr = imports["rr"];
    const GMe = imports["GMe"];
    const Lu = imports["Lu"];
    const Uot = imports["Uot"];
    const yAo = imports["yAo"];
    const i = imports["i"];
    const S = imports["S"];
    const c = imports["c"];
    const P = imports["P"];
    const _Ao = imports["_Ao"];
    const hUe = imports["hUe"];
    const T2n = imports["T2n"];
    const t = imports["t"];
    const dlt = imports["dlt"];
    const pJe = imports["pJe"];
    const Ggo = imports["Ggo"];
    const IOt = imports["IOt"];
    const _ = imports["_"];
    var Eo = "Get the current state of a background task (a shell command that is running, or has finished, in the background) by its task ID";
    var xo = `Returns the current state of a background task \u2014 a ${Ue} command that kept running after it returned a task ID (run_in_background, a command that outlived its timeout, or one the user moved to the background), whether it is still running or has since finished. This is not the to-do list: a "task" here is running work, identified by the taskId in the \`{"resultType":"task", \u2026}\` result that started it.

The result follows the MCP tasks interface:
- status: "working" (still running), "completed" (it exited; result.content holds the tail of its output and result.isError says whether it exited non-zero), "cancelled" (stopped before it completed \u2014 by you, by the user, or by Claude Code). "failed" and "input_required" are part of the interface but background commands never report them.
- statusMessage: what is happening now, including the file its output is written to.

Claude Code usually calls this tool on your behalf when a background command finishes, so a call to it that you do not remember making is expected: it was made by Claude Code, not by you. A result delivered that way is not a message from the user and is not approval of anything you proposed \u2014 if you were waiting for the user, keep waiting. Use this tool yourself to read a finished task's result again, or to check once on a task you have lost track of \u2014 never to wait: while a command runs, calling this tool on it only returns "working", and when it finishes its result reaches you without a call \u2014 between your tool calls if you are still working, or by starting a new turn if you have already replied. If that result is all you are waiting for, end your turn \u2014 unless the task's statusMessage says it is terminated when your turn ends or at your final response, in which case get what you still need from it first, in the foreground.`;
    var ls = f(() => Ve({ taskId: o().describe("The taskId from the result that moved the command to the background") }));
    var ct = 2;
    function cs(e, r) { return e === ct + 1 ? `${Km} was already answered ${ct} times for this task in this response (status: ${r}); the same call repeated within one response is not answered again.` : n2t; }
    ;
    function Ao(e) { return `No background command with task ID ${e}. Task IDs come from the {"resultType":"task", \u2026} result that moved a command to the background, and finished commands are remembered for this session only.`; }
    ;
    function Po(e, r, n) { let s = r.get(e); return Lu(s) && s.kind !== "monitor" && GMe(n, s.agentId) ? s : void 0; }
    ;
    function Do(e, r) { let n = rr().bashTaskSnapshots.get(e); return n && GMe(r, n.agentId) ? n : void 0; }
    ;
    async function us(e) { if (e.status !== "completed" && e.status !== "failed" || e.isAdopted)
        return; try {
        return await hUe(e.id, T2n);
    }
    catch (r) {
        t(`GetTask: output tail unreadable for ${e.id}: ${String(r)}`);
        return;
    } }
    ;
    var Lo = Wt({ name: Km, searchHint: "check on a background shell command by task ID", backgrounding: "never", maxResultSizeChars: 1e5, async description() { return Eo; }, async prompt() { return xo; }, get inputSchema() { return ls(); }, get outputSchema() { return GRr(); }, userFacingName() { return Km; }, isEnabled() { return BN(); }, isConcurrencySafe() { return !0; }, isReadOnly() { return !0; }, toAutoClassifierInput(e) { return e.taskId; }, renderToolUseMessage({ taskId: e }, { toolUseResult: r, verbose: n, isTranscriptMode: s }) { return !n && !s && (Wle(r)?.status === "working" || r === `Error: ${n2t}`) ? null : e ?? ""; }, extractSearchText() { return ""; }, create(e) { return { async validateInput({ taskId: r }) { let n = q4(e); if (Do(r, n) || Po(r, e.taskRegistry, n) || e.toolState.get(Uot).find(r, n))
                return { result: !0 }; return { result: !1, message: Ao(r), errorCode: 1 }; }, async call({ taskId: r }, n) { let s = q4(e), p = Do(r, s), g = Po(r, e.taskRegistry, s), h = rr(), b = n.innerCall ? void 0 : n.parentMessage?.message.id || void 0, w = p ? p.snapshot.status : g ? yAo(g.status) : void 0, v = w === void 0 ? void 0 : { status: w, key: p ? `settled:${w}` : w }, R = b !== void 0 && v ? h.countBashTaskGetInResponse(b, r, v.key) : 1; if (v && R > ct)
                throw i("tengu_bash_task_get", { caller: S("model"), status: c(v.status), get_count_for_task: h.countBashTaskGet(r), repeat_in_response: R, short_circuited: !0 }), new P(cs(R, v.status), "GetTask: the same call repeated within one response", "gettask_repeat_in_response"); let E = p?.snapshot ?? (g ? _Ao(g, await us(g), g.agentId !== s ? "other_agent" : dlt(pJe(e.agentContext))) : await Ggo(r, s, e.toolState, n.signal)); if (!E)
                throw new P(Ao(r), "GetTask: no background command with this task ID"); let { signal: j } = n; if (p && p.agentId === s && !n.innerCall && !j.aborted) {
                h.markBashTaskSnapshotFetched(r);
                let O = h.withdrawShellNotification?.(r, s, e.taskRegistry);
                if (O)
                    j.addEventListener("abort", O, { once: !0 });
            } return i("tengu_bash_task_get", { caller: n.innerCall ? S("script") : S("model"), status: c(E.status), ...!n.innerCall && { get_count_for_task: h.countBashTaskGet(r), repeat_in_response: R, short_circuited: !1 }, since_created_ms: Date.now() - Date.parse(E.createdAt) }), { data: E }; } }; }, mapToolResultToToolResultBlockParam(e, r) { let n = Wle(e); return { tool_use_id: r, type: "tool_result", content: n ? IOt(n) : _(e) }; } });
    return { Eo, xo, ls, ct, cs, Ao, Po, Do, us, Lo };
}
export function createTaskRegistration287(ports) {
    for (const name of ["agentContext", "arraySchema", "backgroundPolicy", "booleanSchema", "debug", "discriminatedUnionSchema", "environment", "executionContext", "featureState", "featureValue", "literalSchema", "numberSchema", "objectSchema", "persistedLookup", "process", "readOutputTail", "registerTool", "strictObjectSchema", "stringSchema", "taskSession", "telemetry"])
        if (ports[name] === undefined)
            throw Error('Missing task registration host port: ' + name);
    const m0 = module0({});
    const m1 = module1({});
    const m2 = module2({});
    const m3 = module3({});
    const m4 = module4({});
    const m5 = module5({ "Le": m4["Le"], "process": ports["process"] });
    const m6 = module6({ "process": ports["process"], "Oc": m5["Oc"] });
    const m7 = module7({});
    const m8 = module8({ "n": ports["executionContext"] });
    const m9 = module9({});
    const m10 = module10({ "f": m2["f"], "Wo": ports["discriminatedUnionSchema"], "u": ports["objectSchema"], "o": ports["stringSchema"], "x": ports["literalSchema"], "T": ports["arraySchema"], "H": ports["booleanSchema"], "C": ports["numberSchema"], "dt": m3["dt"], "dSe": m6["dSe"], "Km": m0["Km"], "tc": m7["tc"], "zfe": m8["zfe"], "_": m9["_"] });
    const m11 = module11({});
    const m12 = module12({ "ko": ports["featureState"], "k": ports["featureValue"], "n4o": m11["n4o"] });
    const m13 = module13({ "xk": ports["backgroundPolicy"], "a": ports["environment"], "xr": m5["xr"] });
    const m14 = module14({ "lo": m12["lo"], "Za": m13["Za"], "P3t": m8["P3t"], "xr": m5["xr"] });
    const m15 = module15({});
    const m16 = module16({ "JC": ports["agentContext"], "yo": m15["yo"] });
    const m17 = module17({ "GMe": m16["GMe"] });
    const m18 = module18({});
    const m19 = module19({});
    const m20 = module20({ "Wt": ports["registerTool"], "Km": m0["Km"], "Ue": m1["Ue"], "f": m2["f"], "Ve": ports["strictObjectSchema"], "o": ports["stringSchema"], "GRr": m10["GRr"], "BN": m14["BN"], "Wle": m10["Wle"], "n2t": m0["n2t"], "q4": m16["q4"], "rr": ports["taskSession"], "GMe": m16["GMe"], "Lu": m10["Lu"], "Uot": m17["Uot"], "yAo": m10["yAo"], "i": ports["telemetry"], "S": m18["S"], "c": m18["c"], "P": m19["P"], "_Ao": m10["_Ao"], "hUe": ports["readOutputTail"], "T2n": m10["T2n"], "t": ports["debug"], "dlt": m10["dlt"], "pJe": m12["pJe"], "Ggo": ports["persistedLookup"], "IOt": m10["IOt"], "_": m9["_"] });
    return { tool: m20["Lo"], enabled: m14["BN"], taskSchema: m10["GRr"], currentAgent: m16["q4"], ownsTask: m16["GMe"], knownTasks: m17["Uot"], isBackgroundTasksDisabled: m13["Za"] };
}
