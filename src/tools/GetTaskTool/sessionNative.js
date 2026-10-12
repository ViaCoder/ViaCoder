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
    var s = globalThis.process?.getBuiltinModule?.("async_hooks");
    var wKt = s ? (e) => s.AsyncResource.bind(e) : (e) => e;
    function Me() { let e = new Set; return { subscribe(n) { let r = wKt(n); return e.add(r), () => { e.delete(r); }; }, emit(...n) { let r; for (let o of e)
            try {
                o(...n);
            }
            catch (i) {
                (r ??= []).push(i);
            } if (r)
            throw r.length === 1 ? r[0] : AggregateError(r, "Signal listener(s) threw"); }, clear() { e.clear(); } }; }
    ;
    return { s, wKt, Me };
}
function module1(imports) {
    class V {
        #e;
        #t = new WeakMap;
        constructor(e) { this.#e = e; }
        of(e) { let t = this.#t.get(e); if (t !== void 0)
            return t; let o = this.#e(); return this.#t.set(e, o), o; }
    }
    ;
    return { V };
}
function module2(imports) {
    const process = imports["process"];
    const Me = imports["Me"];
    const V = imports["V"];
    var Wh = 200;
    var jO = 64;
    var jh = Date.now() - process.uptime() * 1000;
    class zh {
        outputDir = void 0;
        linkedOutputs = new Map;
        linksInheritedBefore = jh;
        inheritedLinkLines = new Map;
        inheritPredecessorLinks(e, n) { if (!Number.isFinite(n))
            return; this.inheritedLinkLines.set(e, Math.max(jh, Math.min(Date.now(), n))); }
        linksInheritedBeforeFor(e) { return Math.max(this.linksInheritedBefore, this.inheritedLinkLines.get(e) ?? 0); }
        outputPathBindings = new Map;
        pendingOutputOps = new Set;
        diskOutputs = new Map;
        terminalEmitClaims = new Set;
        monitorSockets = new Map;
        streamedMonitorStops = new Map;
        mcpCallProgress = new WeakMap;
        remoteSessionLogs = new Map;
        reportedBashTaskDeliveries = new Set;
        bashTaskDeliveryOutcomes = new Map;
        bashTaskSnapshots = new Map;
        bashTaskGetCounts = new Map;
        lastPressureReapAt = 0;
        bashTaskGetsByResponse = new Map;
        withdrawShellNotification = void 0;
        killAgentMonitors = void 0;
        autoReactHumanTurnObserver = void 0;
        frameLiveUserStopObserver = void 0;
        liveDocUserStopObserver = void 0;
        autoReactDeliberateStopObserver = void 0;
        artifactRoomStopObserver = void 0;
        artifactPresenceStopObserver = void 0;
        agentIdleWindowTimers = new Map;
        agentBackgroundSignalResolvers = new Map;
        resumesInFlight = new Set;
        canUseToolNarrowings = new Map;
        taskEvicted = Me();
        agentStrandedMessages = Me();
        agentSpawned = Me();
        agentSettled = Me();
        agentResumeFailed = Me();
        cascadeStopExemptions = new Set;
        cascadeSpared = Me();
        constructor() { this.taskEvicted.subscribe((e) => { this.remoteSessionLogs.delete(e); }); }
        rememberBashTaskSnapshot(e, n, r) { if (this.bashTaskSnapshots.delete(e), this.bashTaskSnapshots.set(e, { snapshot: n, agentId: r, fetched: !1 }), this.bashTaskSnapshots.size > Wh) {
            let s = this.bashTaskSnapshots.keys().next().value;
            if (s !== void 0)
                this.bashTaskSnapshots.delete(s);
        } }
        countBashTaskGet(e) { let n = (this.bashTaskGetCounts.get(e) ?? 0) + 1; if (this.bashTaskGetCounts.delete(e), this.bashTaskGetCounts.set(e, n), this.bashTaskGetCounts.size > Wh) {
            let r = this.bashTaskGetCounts.keys().next().value;
            if (r !== void 0)
                this.bashTaskGetCounts.delete(r);
        } return n; }
        countBashTaskGetInResponse(e, n, r) { let s = this.bashTaskGetsByResponse.get(e) ?? new Map; if (this.bashTaskGetsByResponse.delete(e), this.bashTaskGetsByResponse.set(e, s), this.bashTaskGetsByResponse.size > jO) {
            let b = this.bashTaskGetsByResponse.keys().next().value;
            if (b !== void 0)
                this.bashTaskGetsByResponse.delete(b);
        } let g = s.get(n), h = g?.statusKey === r ? g.count + 1 : 1; return s.set(n, { count: h, statusKey: r }), h; }
        markBashTaskSnapshotFetched(e) { let n = this.bashTaskSnapshots.get(e); if (n)
            this.bashTaskSnapshots.set(e, { ...n, fetched: !0 }); }
        reset() { this.outputDir = void 0, this.linkedOutputs.clear(), this.outputPathBindings.clear(); for (let e of this.diskOutputs.values())
            e.cancel(); this.diskOutputs.clear(), this.terminalEmitClaims.clear(), this.remoteSessionLogs.clear(), this.bashTaskSnapshots.clear(), this.bashTaskGetCounts.clear(), this.lastPressureReapAt = 0, this.bashTaskGetsByResponse.clear(), this.reportedBashTaskDeliveries.clear(), this.bashTaskDeliveryOutcomes.clear(); }
        async drainDiskOutputs() { for (let e of this.diskOutputs.values())
            e.cancel(); while (this.pendingOutputOps.size > 0)
            await Promise.allSettled([...this.pendingOutputOps]); this.diskOutputs.clear(); }
    }
    ;
    var zO = new V(() => new zh);
    return { Wh, jO, jh, zh, zO };
}
function module3(imports) {
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
function module4(imports) {
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
    return { N, E, c, m, Oc };
}
function module5(imports) {
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
    var tYe = 1800000;
    function Cre() { return Math.min(Math.max(7200000, dSe()), 2147483647); }
    ;
    function tUo(e) { return Math.max(tYe, cSe(e)); }
    ;
    return { Me, Ne, cSe, dSe, tYe, Cre, tUo };
}
function module6(imports) {
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
function module7(imports) {
    const xk = imports["xk"];
    const k = imports["k"];
    const tUo = imports["tUo"];
    const Cre = imports["Cre"];
    function Vdn() { return !xk().backgroundDeadlineDisabled; }
    ;
    function CLr() { return Vdn() && k("tengu_cosmic_shore", !0); }
    ;
    function Nqn(e) { return CLr() ? ALr(e) : void 0; }
    ;
    function ALr(e) { return Math.min(e ?? tUo(), Cre()); }
    ;
    return { Vdn, CLr, Nqn, ALr };
}
function module8(imports) {
    function Jt(e, t) { if (e < 60000) {
        if (e === 0)
            return "0s";
        if (e < 1)
            return `${(e / 1000).toFixed(1)}s`;
        return `${Math.floor(e / 1000).toString()}s`;
    } let r = Math.floor(e / 86400000), n = Math.floor(e % 86400000 / 3600000), s = Math.floor(e % 3600000 / 60000), o = Math.round(e % 60000 / 1000); if (o === 60)
        o = 0, s++; if (s === 60)
        s = 0, n++; if (n === 24)
        n = 0, r++; let c = t?.hideTrailingZeros; if (t?.mostSignificantOnly) {
        if (r > 0)
            return `${r}d`;
        if (n > 0)
            return `${n}h`;
        if (s > 0)
            return `${s}m`;
        return `${o}s`;
    } if (r > 0) {
        if (c && n === 0 && s === 0)
            return `${r}d`;
        if (c && s === 0)
            return `${r}d ${n}h`;
        return `${r}d ${n}h ${s}m`;
    } if (n > 0) {
        if (c && s === 0 && o === 0)
            return `${n}h`;
        if (c && o === 0)
            return `${n}h ${s}m`;
        return `${n}h ${s}m ${o}s`;
    } if (s > 0) {
        if (c && o === 0)
            return `${s}m`;
        return `${s}m ${o}s`;
    } return `${o}s`; }
    ;
    return { Jt };
}
function module9(imports) {
    function yi(e) { return e === "completed" || e === "failed" || e === "killed"; }
    ;
    return { yi };
}
function module10(imports) {
    const yi = imports["yi"];
    var tx = 30000;
    function kn(e) { return typeof e === "object" && e !== null && "type" in e && e.type === "local_agent"; }
    ;
    function ak(e) { return e.keepaliveReasons ?? new Set; }
    ;
    function OP(e, n, r) { if (!e)
        return; r.update(e, (s) => { if (!kn(s) || ak(s).has(n))
        return s; return { ...s, keepaliveReasons: new Set(ak(s)).add(n) }; }); }
    ;
    function nx(e, n, r) { if (!e)
        return; r.update(e, (s) => { if (!kn(s) || !ak(s).has(n))
        return s; let o = new Set(ak(s)); o.delete(n); let i = o.size === 0 && yi(s.status) && !s.retain; return { ...s, keepaliveReasons: o, ...i && s.evictAfter === void 0 && { evictAfter: Date.now() + tx } }; }); }
    ;
    return { tx, kn, ak, OP, nx };
}
function module11(imports) {
    const tc = imports["tc"];
    const dSe = imports["dSe"];
    const _ = imports["_"];
    const Nqn = imports["Nqn"];
    const Jt = imports["Jt"];
    const Ge = imports["Ge"];
    const hy = imports["hy"];
    const nx = imports["nx"];
    const OP = imports["OP"];
    var z3 = { memory_pressure: "stopped because the system is running low on memory", deadline: "stopped after reaching its background time limit" };
    var V3 = { memory_pressure: "This is not a failure of the command. Claude Code stopped it because the system was critically low on memory while the session was idle, which says nothing about the command or its own memory use, so there is nothing in it to debug. Do not start it again on your own, even if the work seems to need it: memory may still be short. Report what was stopped and why, and start it again only when asked. The user can turn this behavior off by starting Claude Code with CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP=1 in its environment; setting it from a shell command has no effect.", deadline: "If the work in progress still needs it, start it again with `run_in_background` and a longer `timeout`. If it already had the longest `timeout` allowed, do not restart it. Either way, report that it was stopped." };
    var SXe = 12000;
    var wXe = "between your tool calls if you are still working, or by starting a new turn if you have already replied";
    function T_e() { return `If you still need its result and have other work, keep working \u2014 it reaches you between your tool calls if it exits in time; if waiting for it is all that is left, wait with one foreground shell command that blocks until the output file shows what you need, rather than checking on it repeatedly. Next time, run a command you must wait on in the foreground (with a timeout of up to ${Math.floor(dSe() / 60000)} minutes) and keep the background for work you can start and forget.`; }
    ;
    function k2n(e, n, { backgroundedByUser: r = !1, ending: s } = {}) { let g = s === "final_response" ? T_e() : s === "session" ? `This session takes no further input, though: the command is stopped when your turn ends, so its result reaches you only while you are still working. ${T_e()}` : r ? "Its result is delivered to you automatically when it finishes; carry on without waiting for it." : `When it finishes, its result is delivered to you automatically \u2014 ${wXe} \u2014 so there is no need to check whether it is done or to sleep; if that result is all you are waiting for, end your turn.`, h = { resultType: "task", taskId: e, status: "working", statusMessage: `${n} ${g}` }; return _(h); }
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
    var Mi = (...e) => hy().enqueuePendingNotification(...e);
    function s6n({ backgroundTaskId: e, outputPath: n, backgroundedByUser: r, backgroundedToDeliverMessage: s, backgroundedByTurnAbort: g, timedOutAfterMs: h, reapedAtFinalResponse: b, readToolName: w }) { let D = r ? `Command was manually backgrounded by user with ID: ${e}. Output is being written to: ${n}.` : s ? `Command was moved to the background (ID: ${e}) so that a message that arrived while it was running can reach you; it was not interrupted. Output is being written to: ${n}.` : h !== void 0 ? `Command did not complete within its ${Math.max(1, Math.round(h / 1000))}s timeout and was moved to the background (ID: ${e}). Output is being written to: ${n}.` : `Command running in background with ID: ${e}. Output is being written to: ${n}.`, j = b ? "If it exits while you are still working you will be notified, but it is terminated when you give your final response and no notification can follow that \u2014 so do not end your turn to wait for it; if you need its result, wait for it before giving your final response." : r ? void 0 : "You will be notified when it completes.", K = (h !== void 0 || r || s || g) && !b ? Nqn(void 0) : void 0, he = K !== void 0 ? `If it is still running after ${Jt(K, { hideTrailingZeros: !0 })} in the background, it will be stopped and you will be notified.` : void 0, _e = r ? void 0 : `To check interim output, use ${w} on that file path.`; return [D, j, he, _e].filter(Boolean).join(" "); }
    ;
    function Cmr(e, n, r) { let s = n ?? Ge(), g = hy(), h = g.getCommandQueue().filter((b) => b.mode === "task-notification" && b.taskId === e && b.agentId === s && b.taskDelivery !== void 0); if (h.length === 0)
        return; if (g.consume(h, { reason: "delivered_as_tool_result" }), n !== void 0)
        nx(n, `bash:${e}`, r); return () => { if (n !== void 0)
        OP(n, `bash:${e}`, r); h.forEach((b) => Mi(b)); }; }
    ;
    return { z3, V3, SXe, wXe, T_e, k2n, J3, Xkn, cN, Mi, s6n, Cmr };
}
function module12(imports) {
    class P extends Error {
        telemetryMessage;
        errorClass;
        constructor(n, e, t) { super(n); this.name = "TelemetrySafeError", this.telemetryMessage = e ?? n, this.errorClass = t; }
    }
    ;
    function E(n) { if (n && typeof n === "object" && "code" in n && typeof n.code === "string")
        return n.code; return; }
    ;
    return { P, E };
}
function module13(imports) {
    const R = imports["R"];
    const E = imports["E"];
    const P = imports["P"];
    const t = imports["t"];
    const d = imports["d"];
    const X = imports["X"];
    const m = imports["m"];
    const Sp = imports["Sp"];
    var A = m.O_NOFOLLOW ?? 0;
    var Cmt = 5368709120;
    var wt = Symbol("taskOutputSwapRefused");
    function g(e, n, i) { let s = `task output swap refused (${n}): ${e}` + (i === void 0 ? "" : `. To recover: ${i}.`), r = Object.assign(new P(s, `task output swap refused (${n})`), { [wt]: !0 }); t(s, { level: "error" }); let o = `${n}\x00${e}`; if (!H.has(o)) {
        if (H.size >= Rt)
            H.clear();
        H.add(o), d(r);
    } throw r; }
    ;
    var H = new Set;
    var Rt = 256;
    async function jgn(e, n) { let i; try {
        i = await R(e);
    }
    catch (u) {
        let a = E(u);
        if (a === "ELOOP" || a === "ENOTDIR")
            g(e, `lstat refused a swapped path (${a})`);
        throw u;
    } if (!i.isFile() || i.nlink !== 1)
        g(e, "not a regular nlink-1 file"); let s = !1, r = i.size > n, o; try {
        o = await X(e, s ? r ? "r+" : "r" : (r ? m.O_RDWR : m.O_RDONLY) | A | (m.O_NONBLOCK ?? 0));
    }
    catch (u) {
        let a = E(u);
        if (a === "ELOOP" || a === "EISDIR" || a === "ENOTDIR" || a === "ENXIO" || a === "EOPNOTSUPP" || a === "ENOTSUP")
            g(e, `open refused a swapped path (${a})`);
        throw u;
    } try {
        let u = await o.stat();
        if (!u.isFile() || u.dev !== i.dev || u.ino !== i.ino || u.nlink !== 1)
            g(e, "file changed between lstat and open");
        if (r && u.size > n)
            await o.truncate(n);
        return { handle: o, size: u.size };
    }
    catch (u) {
        throw await o.close(), u;
    } }
    ;
    async function hUe(e, n) { let i; try {
        i = await jgn(Sp(e), Cmt);
    }
    catch (o) {
        if (E(o) === "ENOENT")
            return { content: "", omittedBytes: 0 };
        throw o;
    } let { handle: s } = i, r = Math.min(i.size, Cmt); try {
        let o = Math.max(0, r - n), u = Buffer.allocUnsafe(r - o), a = 0;
        while (a < u.length) {
            let { bytesRead: c } = await s.read(u, a, u.length - a, o + a);
            if (c === 0)
                break;
            a += c;
        }
        let f = 0;
        while (o > 0 && f < a && (u[f] & 192) === 128)
            f++;
        return { content: u.toString("utf8", f, a), omittedBytes: o + f };
    }
    finally {
        await s.close();
    } }
    ;
    return { A, Cmt, wt, g, H, Rt, jgn, hUe };
}
function module14(imports) {
    function r3(n, s, r) { let e = !1, i; return s.update(n, (t) => { if (i = t, t.notified)
        return t; if (e = !0, r?.skipStampIfRunning && t.status === "running")
        return t; return { ...t, notified: !0 }; }), { claimed: e, task: i }; }
    ;
    return { r3 };
}
export function createGetTaskSessionNative287(ports) {
    for (const name of ["backgroundPolicy", "debug", "featureValue", "fsConstants", "logError", "lstat", "mainAgentId", "notificationQueue", "open", "outputPath", "process"])
        if (ports[name] === undefined)
            throw Error('Missing task registration host port: ' + name);
    const m0 = module0({});
    const m1 = module1({});
    const m2 = module2({ "process": ports["process"], "Me": m0["Me"], "V": m1["V"] });
    const m3 = module3({});
    const m4 = module4({});
    const m5 = module5({ "process": ports["process"], "Oc": m4["Oc"] });
    const m6 = module6({});
    const m7 = module7({ "xk": ports["backgroundPolicy"], "k": ports["featureValue"], "tUo": m5["tUo"], "Cre": m5["Cre"] });
    const m8 = module8({});
    const m9 = module9({});
    const m10 = module10({ "yi": m9["yi"] });
    const m11 = module11({ "tc": m3["tc"], "dSe": m5["dSe"], "_": m6["_"], "Nqn": m7["Nqn"], "Jt": m8["Jt"], "Ge": ports["mainAgentId"], "hy": ports["notificationQueue"], "nx": m10["nx"], "OP": m10["OP"] });
    const m12 = module12({});
    const m13 = module13({ "R": ports["lstat"], "E": m12["E"], "P": m12["P"], "t": ports["debug"], "d": ports["logError"], "X": ports["open"], "m": ports["fsConstants"], "Sp": ports["outputPath"] });
    const m14 = module14({});
    return { Session: m2["zh"], SessionSlot: m2["zO"], snapshot: m11["cN"], backgroundAnnouncement: m11["k2n"], backgroundText: m11["s6n"], readTail: m13["hUe"], withdraw: m11["Cmr"], claimShellNotification: m14["r3"] };
}
