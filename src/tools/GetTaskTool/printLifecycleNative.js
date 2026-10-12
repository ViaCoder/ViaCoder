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
// Complete pinned 2.1.287 print controller/scheduler closure. Host leaves are explicit ports.
function module0(imports) {
    function yo(t) { return t; }
    ;
    var d = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    function tn(t) { if (typeof t !== "string")
        return null; return d.test(t) ? t : null; }
    ;
    return { yo, d, tn };
}
function module1(imports) {
    class Tt {
        #e;
        #t = new WeakMap;
        constructor(e) { this.#e = e; }
        peek(e) { return this.#t.get(e.root); }
        of(e) { let t = e.root, o = this.#t.get(t); if (o !== void 0)
            return o; let r = this.#e(); return this.#t.set(t, r), r; }
        drop(e) { this.#t.delete(e.root); }
    }
    ;
    return { Tt };
}
function module2(imports) {
    const Tt = imports["Tt"];
    const U = imports["U"];
    class e {
        pinnedFeatureValues;
        reminderFold;
        echoWireToolInputs;
        maxSubagentSpawnDepthFromGrowthBook;
        decstbmRendererEnabled;
        forkSubagentEnabledSource;
        bashFirstDescriptionTrimmed;
        bashFirstDescriptionTrimmedCompiledOnly;
        bashPromptSkillCommands;
        bashPromptCarriesPreShip;
        coordinatorReadOnlyBashEnabled;
        coordinatorWorkerOutputTrees;
        bashActFirstEnabled;
        defaultFileReadingLimits;
        suggestRolloutEnabled;
        sendUserFileDeferred;
        sessionStartWorkflowSizeGuideline;
        totalTokensReminderMode;
        totalTokensReminderBudget;
        totalTokensReminderAfterUserTurn;
        silentTurnReminderTurns;
        clientDataCapabilityLogged;
        sharedMemoryServedViaTools;
        tetherLiveGate;
        threadsEnvOptIn;
        keptReminderDelivery;
        keptReminderRetired;
        clearAtProbeFailures;
        threadsProbeFailures;
        displayUpdatesProbeFailures;
        keptReminderOkLogged;
        artifactReplPathEnabled;
        artifactPreviewBrowserSearch;
        artifactPreviewBrowser;
        sandboxedAttemptGateEnabled;
        commandNetworkListsOffered;
        replGateOn;
        replGateSource;
        replTypedEvents;
        replDrawShare;
        replConversationResumed;
        machinesSectionShown;
        workflowAuthoringSkillAvailable;
        attributionAnnouncementEnabled;
        autoModeContextEnabled;
        serverClassifierShadowEnabled;
        thirdPartyServerClassifierEnabled;
        userServerClassifierSwitch;
        shellDescription;
        agentProxyNote;
        keptDeferredToolsEnabled;
        segmentedTranscript;
        clear() { for (let o of Object.keys(this))
            this[o] = void 0; }
    }
    ;
    var r = new Tt(() => new e);
    function ko() { return r.of(U()); }
    ;
    return { e, r, ko };
}
function module3(imports) {
    var rSt = 1e5;
    var S = null;
    function n4o(e) { let n = S; return S = e, n; }
    ;
    return { rSt, S, n4o };
}
function module4(imports) {
    const tn = imports["tn"];
    const ko = imports["ko"];
    const k = imports["k"];
    const n4o = imports["n4o"];
    function iZn(e) { return e?.kind === "human" || e?.kind === "auto-continuation"; }
    ;
    function Bk(e) { return e?.kind === "task-notification" && e.subkind === "projects-relay"; }
    ;
    var bu = { reader: null };
    function lm(e) { let n = bu.reader; return bu.reader = e, n; }
    ;
    function E_t(e) { if (e.turnAttributionKey !== void 0)
        return e.turnAttributionKey; return e.mode === "task-notification" ? v_t(e.inheritedTurnAttributionKey) : void 0; }
    ;
    function z3r(e) { return e.findLast((n) => v_t(n.turnAttributionKey) !== void 0)?.turnAttributionKey; }
    ;
    function v_t(e) { return tn(e) ?? void 0; }
    ;
    function lo(e, n) { let r = ko().pinnedFeatureValues ??= new Map; if (!r.has(e))
        r.set(e, k(e, n)); return r.get(e); }
    ;
    lm(lo);
    ;
    n4o(lo);
    ;
    return { iZn, Bk, bu, lm, E_t, z3r, v_t, lo };
}
function module5(imports) {
    function G(n, e) { let r = 0; for (let t of n)
        r += +!!e(t); return r; }
    ;
    return { G };
}
function module6(imports) {
    function r(n) { return n; }
    ;
    function S(n) { return r(n); }
    ;
    function c(n) { return r(n); }
    ;
    function bn(n) { return r(n); }
    ;
    return { r, S, c, bn };
}
function module7(imports) {
    const bn = imports["bn"];
    const S = imports["S"];
    class P extends Error {
        telemetryMessage;
        errorClass;
        constructor(n, e, t) { super(n); this.name = "TelemetrySafeError", this.telemetryMessage = e ?? n, this.errorClass = t; }
    }
    ;
    function tme(n) { if (typeof n !== "string")
        return; return /^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(n) ? bn(n) : S("nonconforming"); }
    ;
    return { P, tme };
}
function module8(imports) {
    const i = imports["i"];
    const c = imports["c"];
    const tme = imports["tme"];
    function y(e, r) { i("tengu_feature_ok", { feature_name: c(e), ...r }); }
    ;
    function m(e, r, u) { i("tengu_feature_bad", { ...u, feature_name: c(e), error_code: tme(r) }); }
    ;
    function p(e, r, u) { i("tengu_feature_sad", { ...u, feature_name: c(e), error_code: tme(r) }); }
    ;
    return { y, m, p };
}
function module9(imports) {
    const P = imports["P"];
    const m = imports["m"];
    const Ge = imports["Ge"];
    var K8e = "session-notice";
    var Oe = new Set([K8e]);
    function q(e) { return e.replace(/[01345789i]/g, (n) => ({ "0": "o", "1": "l", "3": "e", "4": "a", "5": "s", "7": "t", "8": "b", "9": "g", i: "l" })[n]); }
    ;
    function Pe(e, n) { if (e === n)
        return !0; let [r, s] = e.length <= n.length ? [e, n] : [n, e]; if (s.length - r.length > 1)
        return !1; let l = 0, p = 0, g = 0; while (l < r.length && p < s.length) {
        if (r[l] === s[p]) {
            l++, p++;
            continue;
        }
        if (g > 0)
            return !1;
        if (g++, r.length === s.length)
            l++;
        p++;
    } return g === 0 || l === r.length; }
    ;
    function Ae(e, n) { for (let r of [n.length - 1, n.length, n.length + 1]) {
        if (r <= 0 || r > e.length)
            continue;
        for (let s = 0; s + r <= e.length; s++)
            if (Pe(e.slice(s, s + r), n))
                return !0;
    } return !1; }
    ;
    function f1t(e) { return ne(e, Oe); }
    ;
    function ne(e, n) { let r = q(e); for (let s of n) {
        let l = q(s);
        if (r.includes(l) || Ae(r, l))
            return !0;
    } return !1; }
    ;
    function tb(e) { return e.mode === "poll-event"; }
    ;
    function J1e(e) { return e.mode === "poll-event" && e.agentId === Ge(); }
    ;
    function eYe(e) { for (let n of e)
        n.pollEvent?.settleDelivered?.(); }
    ;
    function vre(e, n) { let r = !1; for (let s of e) {
        if (s.pollEvent === void 0)
            continue;
        r = !0, s.pollEvent.settleDropped?.(new P(`poll event discarded undelivered: ${n}`, "poll event discarded undelivered"));
    } if (r)
        m("poll_event_delivery", "discarded"); }
    ;
    return { K8e, Oe, q, Pe, Ae, f1t, ne, tb, J1e, eYe, vre };
}
function module10(imports) {
    const wKt = imports["wKt"];
    function Ls(t, e) { let r = t, S = new Set, a = e && wKt(e), s = () => r; return { getSnapshot: s, getState: s, setState: (n) => { let o = r, i = n(o); if (Object.is(i, o))
            return; r = i, a?.({ newState: i, oldState: o }); for (let u of S)
            u(); }, subscribe: (n) => { let o = wKt(n); return S.add(o), () => S.delete(o); } }; }
    ;
    return { Ls };
}
function module11(imports) {
    const Ku = imports["Ku"];
    const Bk = imports["Bk"];
    const a = imports["a"];
    const lo = imports["lo"];
    const G = imports["G"];
    const tb = imports["tb"];
    const iZn = imports["iZn"];
    const Sdt = imports["Sdt"];
    const yo = imports["yo"];
    const zle = imports["zle"];
    const JO = imports["JO"];
    const Tt = imports["Tt"];
    const Ls = imports["Ls"];
    const j_ = imports["j_"];
    function IRo(e, n) { return e !== void 0 && e.mode === "poll-event" && e.pollEvent?.wake === !0 && !n; }
    ;
    function IWn(e) { return e === "prompt" || e === "orphaned-permission" || e === "task-notification" || e === "poll-event"; }
    ;
    function dct(e) { return Ku(e) && e.mode === "task-notification"; }
    ;
    function Xf(e) { return Ku(e) && e.passive !== !0; }
    ;
    function B7(e) { return Xf(e) && !tb(e); }
    ;
    function Mln(e) { return B7(e) && e.mode === "prompt" && e.shouldQuery !== !1 && !e.isMeta && iZn(e.origin); }
    ;
    function YPo(e) { return G(e.getCommandQueueSnapshot(), Mln); }
    ;
    function N6(e) { return e.passive === !0 && Ku(e) && !0; }
    ;
    function Lln(e) { return Ku(e) && Bk(e.origin) && e.hearthRelayMessageIds !== void 0 && e.shouldQuery !== !1 && Z7e(); }
    ;
    var JOt = 120000;
    function u2(e) { return e !== void 0 && !(zle() < e); }
    ;
    function Lu(e) { return typeof e === "object" && e !== null && "type" in e && e.type === "local_bash"; }
    ;
    var zoe = 300000;
    var pCt = 30000;
    var sio = new Map;
    var XPe = new Set;
    class mCt {
        #e = Ls(sio);
        #t = new Map;
        #n = new Set;
        subscribe = this.#e.subscribe;
        getSnapshot = this.#e.getSnapshot;
        letGo(e) { this.#n.add(e); }
        ended(e) { this.#n.delete(e); }
        wasLetGo(e) { return this.#n.has(e); }
        started(e, n, r) { this.#t.set(e, r), this.#r(e, { status: "running", stopRequested: !1, ...n }); }
        settled(e, n) { this.#t.delete(e); let r = this.#e.getSnapshot().get(e); if (r === void 0)
            return !1; let s = { paintedInPlace: !1, detachedAt: r.detachedAt, tool: r.tool, input: r.input }; return this.#r(e, n.status === "completed" ? { ...n, ...s, resultQueued: !1 } : { ...n, ...s }), !0; }
        resultQueued(e) { let n = this.#e.getSnapshot().get(e); if (n?.status === "completed" && !n.resultQueued)
            this.#r(e, { ...n, resultQueued: !0 }); }
        awaitingResult() { let e = []; for (let [n, r] of this.#e.getSnapshot())
            if (r.status === "running" || r.status === "completed" && !r.resultQueued)
                e.push(n); return e; }
        owesResult(e) { for (let n of this.#e.getSnapshot().values())
            if (n.status === "running" ? e - n.detachedAt < zoe + pCt : n.status === "completed" && !n.resultQueued && e - n.settledAt < pCt)
                return !0; return !1; }
        paintedInPlace(e) { let n = this.#e.getSnapshot().get(e); if (n === void 0 || n.status === "running" || n.paintedInPlace)
            return; this.#r(e, { ...n, paintedInPlace: !0 }); }
        stopRunning(e) { let n = [...this.#t].filter(([r]) => e === void 0 || e.has(r)); if (n.length === 0)
            return 0; for (let [r] of n)
            this.#t.delete(r); this.#e.setState((r) => { let s = new Map(r); for (let [g] of n) {
            let h = s.get(g);
            if (h?.status === "running")
                s.set(g, { ...h, stopRequested: !0 });
        } return s; }); for (let [, r] of n)
            r("user-cancel"); return n.length; }
        discardAllExcept(e) { for (let [r, s] of [...this.#t])
            if (!e.has(r))
                this.#t.delete(r), s("conversation-cleared"); let n = new Set; return this.#e.setState((r) => { let s = new Map; for (let [g, h] of r)
            if (e.has(g))
                s.set(g, h);
            else
                n.add(g); return n.size === 0 ? r : s; }), n; }
        discardAll() { this.discardAllExcept(XPe); }
        discardAllOutside(e) { return this.#e.getSnapshot().size === 0 ? XPe : this.discardAllExcept(this.#o(e)); }
        outside(e) { let n = this.#e.getSnapshot(); if (n.size === 0)
            return XPe; let r = this.#o(e); return new Set([...n.keys()].filter((s) => !r.has(s))); }
        #o(e) { let n = this.#e.getSnapshot(), r = new Set; for (let s of e) {
            if (s.type !== "assistant")
                continue;
            for (let g of s.message.content)
                if (g.type === "tool_use" && n.has(g.id))
                    r.add(g.id);
        } return r; }
        #r(e, n) { this.#e.setState((r) => new Map(r).set(e, n)); }
    }
    ;
    var KS = new Tt(() => new mCt);
    function jct(e, n) { return { input_tokens: e.input_tokens + n.input_tokens, cache_creation_input_tokens: e.cache_creation_input_tokens + n.cache_creation_input_tokens, cache_read_input_tokens: e.cache_read_input_tokens + n.cache_read_input_tokens, output_tokens: e.output_tokens + n.output_tokens, output_tokens_details: { thinking_tokens: e.output_tokens_details.thinking_tokens + n.output_tokens_details.thinking_tokens }, server_tool_use: { web_search_requests: e.server_tool_use.web_search_requests + n.server_tool_use.web_search_requests, web_fetch_requests: e.server_tool_use.web_fetch_requests + n.server_tool_use.web_fetch_requests }, service_tier: n.service_tier, cache_creation: { ephemeral_1h_input_tokens: e.cache_creation.ephemeral_1h_input_tokens + n.cache_creation.ephemeral_1h_input_tokens, ephemeral_5m_input_tokens: e.cache_creation.ephemeral_5m_input_tokens + n.cache_creation.ephemeral_5m_input_tokens }, inference_geo: n.inference_geo, iterations: n.iterations, speed: n.speed, fallback_credit: n.fallback_credit ?? e.fallback_credit }; }
    ;
    var Z6o = ["user", "scheduled-task", "sleep-auto-resume", "quit-auto-resume", "remote-restart-auto-resume", "ci-monitor", "dispatch", "side-session-brief", "side-session-start", "side-session-wake", "other"];
    function e5o(e) { return Z6o.includes(e); }
    ;
    function b4t(e) { if (e === void 0 || e === "")
        return; return e5o(e) ? e : "other"; }
    ;
    function xWn(e) { let n = b4t(e); return n === void 0 || n === "user" ? void 0 : t5o(n); }
    ;
    function t5o(e) { switch (e) {
        case "scheduled-task": return "scheduled";
        case "sleep-auto-resume":
        case "quit-auto-resume":
        case "remote-restart-auto-resume":
        case "ci-monitor": return "auto_continuation";
        case "dispatch": return "peer";
        case "side-session-brief":
        case "side-session-start":
        case "side-session-wake":
        case "other": return "host_synthetic";
    } }
    ;
    function QTo(e) { let n = e[0]?.ccrTurnId; return e.every((r) => r.ccrTurnId === n) ? n : void 0; }
    ;
    function ek(e) { return e.type === "local_agent" && e.status === "completed" && "keepaliveReasons" in e && e.keepaliveReasons instanceof Set && e.keepaliveReasons.size > 0; }
    ;
    function XR(e, n) { n.update(e, (r) => { if (r.notified && r.quietlyParked !== !0)
        return r; return { ...r, notified: !0, quietlyParked: !1 }; }); }
    ;
    function wan(e) { Sdt((n) => n.agentId === yo(e)); }
    ;
    function Z7e() { return a.CLAUDE_CODE_SQUISHY_NEWT ?? lo("tengu_squishy_newt", !0); }
    ;
    return { IRo, IWn, dct, Xf, B7, Mln, YPo, N6, Lln, JOt, u2, Lu, zoe, pCt, sio, XPe, mCt, KS, jct, Z6o, e5o, b4t, xWn, t5o, QTo, ek, XR, wan, Z7e };
}
function module12(imports) {
    var Cn = "[Artifact comment sent to Claude]";
    var En = "[Artifact comments sent to Claude]";
    function QSr(e) { let t = tQt(e); return t !== null && (t.startsWith(Cn) || t.startsWith(En)); }
    ;
    function tQt(e) { if (typeof e === "string")
        return e; if (Array.isArray(e)) {
        let t = e.at(-1);
        if (t?.type === "text" && typeof t.text === "string")
            return t.text;
    } return null; }
    ;
    return { Cn, En, QSr, tQt };
}
function module13(imports) {
    function sM(e) { if (typeof e === "string")
        return e.trim().startsWith("/"); if (!Array.isArray(e))
        return !1; let n = e.at(-1); return n?.type === "text" && typeof n.text === "string" && n.text.trim().startsWith("/"); }
    ;
    return { sM };
}
function module14(imports) {
    function Epn(e) { return e?.kind === "task-notification" && e.producer === "session-task"; }
    ;
    function vpn(e) { return e?.kind === "task-notification" && Object.keys(e).every((n) => n === "kind" || n === "producer"); }
    ;
    return { Epn, vpn };
}
function module15(imports) {
    var Ru = "task-notification";
    var Oz = "task-id";
    var zK = "tool-use-id";
    var ZZ = "task-type";
    var ret = "output-file";
    var aC = "status";
    var wT = "summary";
    return { Ru, Oz, zK, ZZ, ret, aC, wT };
}
function module16(imports) {
    function wc(t) { return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
    ;
    return { wc };
}
function module17(imports) {
    const wc = imports["wc"];
    function jr(l, i) { if (!l.trim() || !i.trim())
        return null; let n = wc(i), x = new RegExp(`<${n}(?:\\s+[^>]*)?>([\\s\\S]*?)<\\/${n}>`, "gi"), e, t = 0, s = 0, c = new RegExp(`<${n}(?:\\s+[^>]*?)?>`, "gi"), r = new RegExp(`<\\/${n}>`, "gi"); while ((e = x.exec(l)) !== null) {
        let g = e[1], o = l.slice(s, e.index);
        t = 0, c.lastIndex = 0;
        while (c.exec(o) !== null)
            t++;
        r.lastIndex = 0;
        while (r.exec(o) !== null)
            t--;
        if (t === 0 && g)
            return g;
        s = e.index + e[0].length;
    } return null; }
    ;
    return { jr };
}
function module18(imports) {
    var Yen = "session_inbox";
    function yLe(e) { return e.verifiedSlackHumanTurn === !0 && e.priority !== "now"; }
    ;
    return { Yen, yLe };
}
function module19(imports) {
    const Lln = imports["Lln"];
    const yLe = imports["yLe"];
    function glr(e, n) { let o = e.peek(n); if (!o || o.priority === "now" || Lln(o))
        return o; return e.peek((r) => n(r) && yLe(r)) ?? o; }
    ;
    function uso(e, n) { let o = glr(e, n); if (o === void 0)
        return; return e.dequeue((r) => r === o); }
    ;
    return { glr, uso };
}
function module20(imports) {
    var u = 8;
    function Kwo(n) { let t = n.findLast((e) => e.traceContext)?.traceContext; if (!t)
        return { parent: void 0, linked: [] }; let r = new Set([t.traceparent]), o = []; for (let { traceContext: e } of n)
        if (e && !r.has(e.traceparent))
            r.add(e.traceparent), o.push(e); return { parent: t, linked: o.slice(-u) }; }
    ;
    return { u, Kwo };
}
function module21(imports) {
    var Le = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    function qEe(s) { return typeof s === "string" && Le.test(s) ? s : void 0; }
    ;
    function stt(s) { return Math.round(performance.now() - s); }
    ;
    return { Le, qEe, stt };
}
function module22(imports) {
    var lp = { output_tokens_details: { thinking_tokens: 0 }, input_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0, output_tokens: 0, server_tool_use: { web_search_requests: 0, web_fetch_requests: 0 }, service_tier: "standard", cache_creation: { ephemeral_1h_input_tokens: 0, ephemeral_5m_input_tokens: 0 }, inference_geo: "", iterations: [], speed: "standard", fallback_credit: null };
    return { lp };
}
function module23(imports) {
    function Fu(e) { return e.type === "local_agent" && "isObserver" in e && e.isObserver === !0; }
    ;
    function x1(e) { if (e.type === "local_agent")
        return !Fu(e); return e.type === "local_workflow"; }
    ;
    function gg(e) { if (e.status !== "running" && e.status !== "pending")
        return !1; if ("isBackgrounded" in e && e.isBackgrounded === !1)
        return !1; return !0; }
    ;
    function pFt(e) { return e.type === "mcp_task" && e.parked === !0; }
    ;
    function L9e(e) { return e.type === "local_bash" && e.kind === "monitor" || e.type === "monitor_mcp" || e.type === "monitor_ws" && e.ambient !== !0; }
    ;
    function Lq(e) { return e.skipTranscript === !0 || e.type === "monitor_ws" && e.ambient === !0; }
    ;
    function kde(e) { let n = e.tasks ?? {}; return Object.values(n).filter((r) => r.status === "running"); }
    ;
    function kn(e) { return typeof e === "object" && e !== null && "type" in e && e.type === "local_agent"; }
    ;
    return { Fu, x1, gg, pFt, L9e, Lq, kde, kn };
}
function module24(imports) {
    function yi(e) { return e === "completed" || e === "failed" || e === "killed"; }
    ;
    return { yi };
}
function module25(imports) {
    const JOt = imports["JOt"];
    var Jbr = 2 * JOt + 60000;
    return { Jbr };
}
function module26(imports) {
    function B6t(e, s) { if (e.type !== "result")
        return e; let r = s.subagentStats !== void 0 ? { subagent_stats: s.subagentStats } : {}; if (e.total_cost_usd !== void 0 && s.totalCostUsd < e.total_cost_usd)
        return { ...e, ...r }; return { ...e, total_cost_usd: s.totalCostUsd, duration_api_ms: e.duration_api_ms === 0 ? e.duration_api_ms : s.durationApiMs, modelUsage: s.modelUsage, ...s.usage !== void 0 && { usage: s.usage }, ...r }; }
    ;
    return { B6t };
}
function module27(imports) {
    const Fu = imports["Fu"];
    const Uze = imports["Uze"];
    const ek = imports["ek"];
    const x1 = imports["x1"];
    const gg = imports["gg"];
    const kn = imports["kn"];
    const Qr = imports["Qr"];
    const XR = imports["XR"];
    const wan = imports["wan"];
    const Ii = imports["Ii"];
    function Gee(e) { let { taskRegistry: r, setAppState: n, shouldStop: s, storageV5: p } = e; _Tt(e); for (let g of Object.values(r.all())) {
        let h = ek(g) && x1(g);
        if (Fu(g) || !h && (g.status !== "running" || !gg(g) || !x1(g)) || s !== void 0 && !s(g))
            continue;
        if (zee(g.id, r, p), g.type === "local_agent")
            XR(g.id, r), wan(g.id);
        if (Uze(g.type)?.kill(g.id, r, n, "system", p), g.type === "local_agent")
            Ii(g.id, "stopped", { toolUseId: g.toolUseId, summary: g.description });
    } }
    ;
    function _Tt(e) { for (let r of Object.values(e.taskRegistry.all()))
        if (Fu(r) && r.status === "running")
            Uze(r.type)?.kill(r.id, e.taskRegistry, e.setAppState, "system"); }
    ;
    function zee(e, r, n) { r.update(e, (p) => kn(p) ? { ...p, stoppedByUser: !0, userStopCount: (p.userStopCount ?? 0) + 1 } : p.stoppedByUser ? p : { ...p, stoppedByUser: !0 }); let s = r.get(e); if (s?.type === "local_agent") {
        let p = "agentType" in s && typeof s.agentType === "string" ? s.agentType : "general-purpose";
        Qr(e, p, n);
    } }
    ;
    return { Gee, _Tt, zee };
}
function module28(imports) {
    class Mir {
        now() { return Date.now(); }
        monotonicNow() { return performance.now(); }
        setTimeout(t, r, e) { let o = setTimeout(t, r); if (e?.unref)
            o.unref(); return () => clearTimeout(o); }
    }
    ;
    var aB = new Mir;
    function ee(t, r, e) { return new Promise((o, n) => { if (r?.aborted) {
        if (e?.throwOnAbort || e?.abortError)
            n(e.abortError?.() ?? Error("aborted"));
        else
            o();
        return;
    } let m = (e?.clock ?? aB).setTimeout(() => { r?.removeEventListener("abort", i), o(); }, t, { unref: e?.unref }); function i() { if (m(), e?.throwOnAbort || e?.abortError)
        n(e.abortError?.() ?? Error("aborted"));
    else
        o(); } r?.addEventListener("abort", i, { once: !0 }); }); }
    ;
    var s = (t, r) => { let e = setTimeout(t, r); return () => clearTimeout(e); };
    function lt(t, r, e = s) { let o = () => { }, n = new Promise((m) => { o = e(() => m(void 0), r); }); return Promise.race([t, n]).finally(o); }
    ;
    return { Mir, aB, ee, s, lt };
}
function module29(imports) {
    var mrt = 600000;
    return { mrt };
}
function module30(imports) {
    function UIe(e) { if (!e)
        return !1; let { leadAgentId: t, teammates: r } = e; return Object.keys(r).some((s) => s !== t); }
    ;
    function aQe(e) { for (let t of Object.values(e.tasks))
        if (t.type === "in_process_teammate" && t.status === "running")
            return !0; return !1; }
    ;
    function PGt(e) { for (let t of Object.values(e.tasks))
        if (t.type === "in_process_teammate" && t.status === "running" && !t.isIdle)
            return !0; return !1; }
    ;
    return { UIe, aQe, PGt };
}
function module31(imports) {
    const Xf = imports["Xf"];
    const d = imports["d"];
    const IRo = imports["IRo"];
    const Ku = imports["Ku"];
    const tb = imports["tb"];
    const IWn = imports["IWn"];
    const f1t = imports["f1t"];
    const vre = imports["vre"];
    const N6 = imports["N6"];
    const xWn = imports["xWn"];
    const QSr = imports["QSr"];
    const sM = imports["sM"];
    const E_t = imports["E_t"];
    const dct = imports["dct"];
    const Epn = imports["Epn"];
    const vpn = imports["vpn"];
    const Ru = imports["Ru"];
    const jr = imports["jr"];
    const aC = imports["aC"];
    const yLe = imports["yLe"];
    const t = imports["t"];
    const uso = imports["uso"];
    const p = imports["p"];
    const Ge = imports["Ge"];
    const rSt = imports["rSt"];
    const Kwo = imports["Kwo"];
    const z3r = imports["z3r"];
    const QTo = imports["QTo"];
    const ne = imports["ne"];
    const qEe = imports["qEe"];
    const eYe = imports["eYe"];
    const y = imports["y"];
    const J1e = imports["J1e"];
    const jct = imports["jct"];
    const lp = imports["lp"];
    const x1 = imports["x1"];
    const gg = imports["gg"];
    const kde = imports["kde"];
    const yi = imports["yi"];
    const Jbr = imports["Jbr"];
    const B6t = imports["B6t"];
    const Gee = imports["Gee"];
    const Gm = imports["Gm"];
    const Nu = imports["Nu"];
    const lt = imports["lt"];
    const Z = imports["Z"];
    const stt = imports["stt"];
    const Ai = imports["Ai"];
    const XQr = imports["XQr"];
    const u2 = imports["u2"];
    const Fu = imports["Fu"];
    const zle = imports["zle"];
    const process = imports["process"];
    const a = imports["a"];
    const mrt = imports["mrt"];
    const aQe = imports["aQe"];
    const UIe = imports["UIe"];
    const k = imports["k"];
    const L9e = imports["L9e"];
    const Lu = imports["Lu"];
    const _N = imports["_N"];
    const xA = imports["xA"];
    const PP = imports["PP"];
    const kn = imports["kn"];
    const Ii = imports["Ii"];
    const Lq = imports["Lq"];
    const pFt = imports["pFt"];
    const PGt = imports["PGt"];
    const Dkt = imports["Dkt"];
    const ee = imports["ee"];
    const mP = imports["mP"];
    const m = imports["m"];
    function Ig(e) { return e != null && typeof e !== "string" && (!Array.isArray(e) || e.some((r) => r === null || typeof r !== "object" || ("type" in r) && r.type === "text" && (!("text" in r) || typeof r.text !== "string"))); }
    ;
    var al = ["idle", "earlier_turn", "after_turn", "background_wait", "entry_joins", "sdk_mcp_update", "loop_top", "session_start_wait", "first_command", "mcp_prewait", "repo_wait", "turn_joins", "tool_pool", "commit", "after_arm", "turn_gate", "turn_open", "engine_setup", "tool_reread", "cwd"];
    var Hg = new Map(al.map((e, r) => [e, r]));
    class gc {
        id = mP();
        spentMs = new Float64Array(al.length);
        phase = Hg.get("idle");
        phaseSinceMs;
        controlRequestsMs = 0;
        controlRequestSinceMs;
        constructor(e = performance.now()) { this.phaseSinceMs = e; }
        enter(e, r = performance.now()) { this.spentMs[this.phase] += r - this.phaseSinceMs, this.phase = Hg.get(e), this.phaseSinceMs = r; }
        controlRequestStarted(e = performance.now()) { this.controlRequestEnded(e), this.controlRequestSinceMs = e; }
        controlRequestEnded(e = performance.now()) { if (this.controlRequestSinceMs !== void 0)
            this.controlRequestsMs += e - this.controlRequestSinceMs, this.controlRequestSinceMs = void 0; }
        mark(e = performance.now()) { let r = Array.from(this.spentMs); return r[this.phase] += e - this.phaseSinceMs, { clockId: this.id, spentMs: r, controlRequestsMs: this.controlRequestsNow(e) }; }
        readSince(e, r, n) { if (e.clockId !== this.id)
            return; return { phases: pP(e.spentMs, (s) => this.spentMs[s] + (s === this.phase ? r - this.phaseSinceMs : 0), n), controlRequestsMs: Math.max(0, Math.round(this.controlRequestsNow(r) - e.controlRequestsMs)) }; }
        controlRequestsNow(e) { return this.controlRequestsMs + (this.controlRequestSinceMs === void 0 ? 0 : e - this.controlRequestSinceMs); }
    }
    ;
    function pP(e, r, n) { let s = {}, g = 0, w = 0; for (let h = 0; h < al.length; h++) {
        g += Math.max(0, r(h) - (e[h] ?? 0));
        let M = Math.round(g) - w;
        if (M > 0)
            s[al[h]] = M, w += M;
    } return s.other = Math.max(0, Math.round(n) - w), s; }
    ;
    class hc {
        running = !1;
        intentBatchInFlight = !1;
        runningReported = !1;
        runPhase;
        inputClosed = !1;
        endSessionRequested = !1;
        abortController;
        turnUnderWay = !1;
        pendingDispatchUuids = [];
        dequeueCount = 0;
        drainingHandoff;
        turnStartClock = new gc;
    }
    ;
    class kc {
        parked = null;
        heldFrames = new Set;
        ownParked = null;
        admissionBarrier;
        firstTurnGate;
        messageQueue;
        drain;
        receivedMessageUuids;
        declinedRedeliveries;
        io;
        transcriptForFrame;
        kick;
        retirementMayLandDuringReads;
        rescueOwnsReRun;
        idleTeeAllowed;
        constructor({ admissionBarrier: e, firstTurnGate: r = () => { return; }, messageQueue: n, drain: s, receivedMessageUuids: g, declinedRedeliveries: w, io: h, transcriptForFrame: M, kick: v, retirementMayLandDuringReads: R, rescueOwnsReRun: U, idleTeeAllowed: H }) { this.admissionBarrier = e, this.firstTurnGate = r, this.messageQueue = n, this.drain = s, this.receivedMessageUuids = g, this.declinedRedeliveries = w, this.io = h, this.transcriptForFrame = M, this.kick = v, this.retirementMayLandDuringReads = R, this.rescueOwnsReRun = U, this.idleTeeAllowed = H; }
        dropMalformed(e) { if (!Ig(e.message.content))
            return !1; if (t("Dropping malformed user frame: content must be a string or an array of block objects", { level: "error" }), e.uuid && !this.receivedMessageUuids.has(e.uuid))
            this.io.onCommandLifecycle?.(e.uuid, "completed"); return !0; }
        async skipDuplicate(e, r) { let n = this.transcriptForFrame(), s = this.retirementMayLandDuringReads(), g = await n.persisted(e), w = this.receivedMessageUuids.has(e), h = g && !w && await n.turnUnanswered(e); if (h && s && !this.rescueOwnsReRun())
            h = await n.turnUnanswered(e); if (h && !this.drain.running && !this.messageQueue.hasUserIntentCommandsInQueue() && !this.rescueOwnsReRun())
            this.declinedRedeliveries.forget(e), ne("info", "cli_user_message_dedup_reexecuted", {});
        else if (g || w) {
            if (ne("info", "cli_user_message_dedup_skipped", { exists_in_session: g, runtime_dup: w }), t(`Skipping duplicate user message: ${e}`), r(), g && !w && !h)
                this.io.onCommandLifecycle?.(e, "completed"), this.declinedRedeliveries.forget(e);
            if (this.messageQueue.peek(Xf) !== void 0)
                this.kick();
            else if (!this.drain.running) {
                if (this.idleTeeAllowed())
                    this.io.sessionState.notifyStateChanged("idle");
            }
            if (!h)
                this.receivedMessageUuids.track(e);
            else
                this.declinedRedeliveries.remember(e);
            return !0;
        } return this.receivedMessageUuids.track(e), !1; }
        acceptUserFrame(e) { let r = this.admissionBarrier(); if (e.ownFirstTurnMessage) {
            if (r.pending === 0 && this.ownParked === null)
                return this.deliver(e);
            let h = r.tail, M = performance.now();
            ne("info", "cli_user_frame_parked", () => ({ uuid: qEe(e.frame.uuid), barrier_pending: r.pending, had_parked: this.ownParked !== null, own_first_turn_message: !0 }));
            let v = (this.ownParked ?? Promise.resolve()).then(() => h).then(() => this.deliver(e, M)).catch((R) => d(Z(R))).finally(() => { if (e.queueing?.[Symbol.dispose](), this.ownParked === v)
                this.ownParked = null; });
            this.ownParked = v;
            return;
        } let n = this.firstTurnGate(); if (r.pending === 0 && this.parked === null && n === void 0)
            return this.deliver(e); let s = n === void 0 ? r.tail : Promise.all([r.tail, n]).then(() => { }), g = performance.now(); ne("info", "cli_user_frame_parked", () => ({ uuid: qEe(e.frame.uuid), barrier_pending: r.pending, had_parked: this.parked !== null, first_turn_gate: n !== void 0 })), this.heldFrames.add(e); let w = (this.parked ?? Promise.resolve()).then(() => s).then(() => this.heldFrames.has(e) ? this.deliver(e, g) : void 0).catch((h) => d(Z(h))).finally(() => { if (this.heldFrames.delete(e), e.queueing?.[Symbol.dispose](), this.parked === w)
            this.parked = null; }); this.parked = w; }
        parkedUuids() { return [...this.heldFrames].flatMap(({ frame: e }) => e.uuid ?? []); }
        cancelParked() { let e = this.parkedUuids(); return this.heldFrames.clear(), e; }
        hasParked() { return this.parked !== null || this.ownParked !== null; }
        async closeInput(e) { await this.admissionBarrier().tail; let r = this.firstTurnGate(); if (r !== void 0)
            await r; if (this.ownParked !== null)
            await this.ownParked; if (this.parked !== null)
            await this.parked; return ne("info", "cli_message_loop_ended"), this.drain.inputClosed = !0, e(); }
        async deliver(e, r) { const env_1 = { stack: [], error: void 0, hasError: false }; try {
            const n = __addDisposableResource(env_1, e.queueing, false);
            let s = performance.now(), g = e.admit(n), w;
            if (typeof g !== "boolean") {
                let H = await g;
                if (w = stt(s), !H)
                    return;
            }
            else if (!g)
                return;
            if (r !== void 0 && !e.ownFirstTurnMessage && !this.heldFrames.delete(e))
                return;
            let { frame: h, command: M } = e, v = performance.now(), R = Date.now(), U = h.server_received_wall_ms;
            if (M.frameTiming = { ...e.receivedWallMs !== void 0 && { receivedWallMs: e.receivedWallMs, intakePhasesMs: vP({ waits: e.waits, parsedAtMs: e.parsedAtMs, parkedAtMs: r, admitStartedAtMs: s, awaitedAdmitMs: w, enqueuedAtMs: v, receivedWallMs: e.receivedWallMs, enqueuedWallMs: R, aheadOfRead: e.aheadOfRead }), turnStartMark: this.drain.turnStartClock.mark(v) }, enqueuedWallMs: R, ...typeof U === "number" && Number.isFinite(U) && U > 0 && { serverReceivedWallMs: U } }, this.messageQueue.enqueue(M), n?.queued(), e.afterEnqueue?.(), h.uuid !== void 0)
                this.io.onCommandLifecycle?.(h.uuid, "queued");
            ne("info", "cli_user_message_enqueued", () => ({ has_uuid: h.uuid !== void 0, uuid: qEe(h.uuid), should_query: h.shouldQuery, has_priority: h.priority !== void 0, queue_depth: this.messageQueue.getCommandQueueLength(), parse_to_enqueue_ms: Math.round(v - e.parsedAtMs), dedup_ms: e.waits.dedupMs, flag_settle_ms: e.waits.flagSettleMs, receive_hook_ms: e.waits.receiveHookMs, ...e.waits.attachments !== void 0 && { attachments_ms: e.waits.attachments.ms, attachment_count: e.waits.attachments.count, inlined_images: e.waits.attachments.inlinedImages, ahead_of_files: e.waits.attachments.aheadOfFiles, ...e.waits.attachments.stages }, ...r !== void 0 && { parked_ms: Math.round(v - r) } })), e.beforeKick?.(), this.kick();
        }
        catch (e_1) {
            env_1.error = e_1;
            env_1.hasError = true;
        }
        finally {
            __disposeResources(env_1);
        } }
    }
    ;
    function Sc(e) { return Math.max(0, Math.round(e ?? 0)); }
    ;
    function vP({ waits: e, parsedAtMs: r, parkedAtMs: n, admitStartedAtMs: s, awaitedAdmitMs: g, enqueuedAtMs: w, receivedWallMs: h, enqueuedWallMs: M, aheadOfRead: v }) { let R = Math.round(w - r), U = { ...e.dedupMs !== void 0 && { dedup: e.dedupMs }, ...e.flagSettleMs !== void 0 && { flag_settle: e.flagSettleMs }, ...e.receiveHookMs !== void 0 && { receive_hook: e.receiveHookMs }, ...e.attachments !== void 0 && { attachments: e.attachments.ms }, ...n !== void 0 && { admission_wait: Math.round(s - n) }, ...g !== void 0 && { admit_check: g } }, H = 0; for (let ge of Object.values(U))
        H += ge ?? 0; let I = Math.max(0, Math.round(M - h) - R), de = Math.min(I, Sc(v?.startupMs)), z = Math.min(I - de, Sc(v?.controlRequestsMs)), he = Math.min(I - de - z, Sc(v?.userFramesMs)); return { before_read: I - de - z - he, ...de > 0 && { startup_wait: de }, ...z > 0 && { control_requests_ahead: z }, ...he > 0 && { user_frames_ahead: he }, ...U, other: Math.max(0, R - H) }; }
    ;
    function ul() { return XQr(); }
    ;
    function bP(e, r) { if (!u2(e))
        return !1; return r.some((n) => n.status === "running" && gg(n) && x1(n) && !Fu(n) && !n.stoppedByUser); }
    ;
    function gl({ maxBudgetUsd: e, abortedForShutdown: r, turnAborted: n, getAppState: s, setAppState: g, storageV5: w }) {
        if (Ai() || r || ul() && n)
            return !1;
        let h = Object.values(s().tasks ?? {});
        if (!bP(e, h))
            return !1;
        return t(`print budget halt: this run's spend ${zle()} reached --max-budget-usd ${e}; stopping background agents`), process.stderr.write(`Budget limit reached ($${zle().toFixed(2)} of $${e}); stopping background agents.
`), y("print_budget_halt"), Gee({ taskRegistry: Gm(s, g), setAppState: g, storageV5: w }), !0;
    }
    ;
    function wc(e) { if (!x1(e))
        return !1; if ("isBackgrounded" in e && e.isBackgrounded === !1)
        return !1; if (!yi(e.status))
        return !1; return !e.notified; }
    ;
    function sa({ tasks: e, waits: r, now: n }) { let s = !1, g = new Set; for (let w of e) {
        if (!wc(w))
            continue;
        g.add(w.id);
        let h = r.get(w.id);
        if (!h)
            h = { firstSeen: n, expired: !1 }, r.set(w.id, h);
        if (h.expired)
            continue;
        if (n - h.firstSeen >= Jbr) {
            h.expired = !0, t(`[print] task ${w.id} is terminal but its completion notification did not enqueue within ${Jbr}ms \u2014 exiting without it (enqueue dropped, or post-completion work still in flight)`, { level: "warn" });
            continue;
        }
        s = !0;
    } for (let w of r.keys())
        if (!g.has(w))
            r.delete(w); return s; }
    ;
    function ci() { return a.CLAUDE_CODE_BG_TASKS_REPORT_RUNNING !== !1; }
    ;
    function md(e) { return nh(e) && !pFt(e) && !(e.type === "remote_agent" && e.isLongRunning) && !((e.type === "monitor_ws" || e.type === "monitor_mcp") && e.timeoutId === void 0); }
    ;
    function Kg(e) { return e.type === "in_process_teammate" && e.status === "running" && (!e.isIdle || e.idleNotificationOwedToLead === !0); }
    ;
    function Gg(e) { return nh(e) && !md(e); }
    ;
    function Jg({ inputClosed: e, runningTasks: r }) { return e && r.some((n) => x1(n) && gg(n)); }
    ;
    function Xg({ aborted: e, shuttingDown: r, abortedForShutdown: n, teardownRequested: s, heldResultCount: g }) { return e && !r && !n && !s && g > 0; }
    ;
    function Zg({ inputClosed: e, currentState: r, hasActiveTeammates: n, hasRunningBgTasks: s, hasPendingNotification: g }) { if ((n || s || g) && ci())
        return !1; return !e && r === "running"; }
    ;
    function eh(e) { return e.map((r) => ({ type: r.type, status: r.status, isBackgrounded: "isBackgrounded" in r ? r.isBackgrounded : void 0, isObserver: "isObserver" in r ? r.isObserver : void 0, ambient: "ambient" in r ? r.ambient : void 0, parked: "parked" in r ? r.parked : void 0 })); }
    ;
    function rh({ hasActiveTeammates: e, hasRunningBgTasks: r, hasPendingNotification: n }) { return !((e || r || n) && ci()); }
    ;
    function nh(e) { return gg(e) && e.type !== "in_process_teammate" && e.type !== "local_bash" && e.type !== "dream" && !(e.type === "monitor_ws" && e.ambient); }
    ;
    var Rc = 5000;
    function oh() { return a.CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS ?? mrt; }
    ;
    function sh({ runningBackgroundTasks: e, inputClosed: r, hasMainThreadQueued: n, hasActiveTeammates: s, hasPendingNotification: g, holdForArmedMonitors: w, ceilingExceeded: h, deadline: M, swept: v, now: R }) { if (!(r && !n && !s && e.length > 0 && (h || !g && !e.some((H) => x1(H) || w && L9e(H)))))
        return { deadline: null, swept: !1, shouldSweep: !1 }; if (M === null)
        return { deadline: h ? R : R + Rc, swept: h, shouldSweep: h }; if (R < M)
        return { deadline: M, swept: v, shouldSweep: !1 }; return { deadline: M, swept: !0, shouldSweep: !v }; }
    ;
    function ih(e, r, n, s) { for (let g of e)
        if (Lu(g))
            t(`print wind-down: killing background shell ${g.id} ("${g.description}") after ${Rc}ms grace`), _N(g.id, r);
        else if (Fu(g))
            t(`print wind-down: killing mid-delivery observer ${g.id} after ${Rc}ms grace`), xA(g.id, r);
        else if (s && x1(g) && g.status === "running")
            t(`print wind-down: killing background ${g.type} task ${g.id} ("${g.description}") at the wait ceiling`), PP(g, r, n);
        else {
            if (t(`print wind-down: no longer waiting on background ${g.type} task ${g.id}`), kn(g))
                g.spawnedSubagent?.killed("system");
            Ii(g.id, "stopped", { toolUseId: g.toolUseId, summary: g.description, ambient: Lq(g) });
        } if (e.length > 0)
        y("print_wind_down"); }
    ;
    class Tc {
        drain;
        messageQueue;
        io;
        store;
        toolState;
        detachedToolCalls;
        pendingNotificationWaits;
        ccrRecap;
        maxBudgetUsd;
        storageV5;
        turnAbortedForShutdown;
        stopping;
        pulseKeepAlive;
        decideStashedAnswer;
        onIdleReported;
        windDownDeadline = null;
        windDownSwept = !1;
        bgWaitFirstIdle = null;
        bgWaitCeilingWarned = !1;
        bgWaitCeilingExceeded = !1;
        constructor({ drain: e, messageQueue: r, io: n, store: s, toolState: g, detachedToolCalls: w, pendingNotificationWaits: h, ccrRecap: M, maxBudgetUsd: v, storageV5: R, turnAbortedForShutdown: U, stopping: H, pulseKeepAlive: I, decideStashedAnswer: de, onIdleReported: z }) { this.drain = e, this.messageQueue = r, this.io = n, this.store = s, this.toolState = g, this.detachedToolCalls = w, this.pendingNotificationWaits = h, this.ccrRecap = M, this.maxBudgetUsd = v, this.storageV5 = R, this.turnAbortedForShutdown = U, this.stopping = H, this.pulseKeepAlive = I, this.decideStashedAnswer = de, this.onIdleReported = z; }
        park({ drainedThisIteration: e }) {
            let r = !1, n = this.store.getState(), s = kde(n).filter((Se) => gg(Se) && Se.type !== "in_process_teammate" && !(Se.type === "monitor_ws" && Se.ambient));
            gl({ maxBudgetUsd: this.maxBudgetUsd, abortedForShutdown: this.turnAbortedForShutdown(), turnAborted: this.drain.abortController?.signal.aborted ?? !1, getAppState: this.store.getState, setAppState: this.store.setState, storageV5: this.storageV5 });
            let g = this.messageQueue.peek(Xf) !== void 0, w = g && !this.holdsEvalSettles(), h = Date.now(), M = sa({ tasks: Object.values(n.tasks ?? {}), waits: this.pendingNotificationWaits, now: h }), v = this.detachedToolCalls.owesResult(h) && !u2(this.maxBudgetUsd), R = M || v;
            if (this.drain.inputClosed && !w && !e)
                this.bgWaitFirstIdle ??= h;
            else
                this.bgWaitFirstIdle = null, this.bgWaitCeilingWarned = !1;
            let U = oh(), H = U > 0 && this.bgWaitFirstIdle !== null && h - this.bgWaitFirstIdle >= U;
            this.bgWaitCeilingExceeded = H;
            let I = this.drain.inputClosed && (aQe(n) || UIe(n.teamContext)), de = this.drain.inputClosed && !u2(this.maxBudgetUsd) && k("tengu_giggly_dragonfly", !0), z = sh({ runningBackgroundTasks: s, inputClosed: this.drain.inputClosed, hasMainThreadQueued: g, hasActiveTeammates: I, hasPendingNotification: R, holdForArmedMonitors: de, ceilingExceeded: H, deadline: this.windDownDeadline, swept: this.windDownSwept, now: h });
            if (this.windDownDeadline = z.deadline, this.windDownSwept = z.swept, z.shouldSweep && !this.drain.abortController?.signal.aborted) {
                if (H && !this.bgWaitCeilingWarned)
                    this.bgWaitCeilingWarned = !0, process.stderr.write(`Background tasks still running after ${Math.round(U / 1000)}s; terminating. Set CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS=0 to wait indefinitely.
`);
                ih(s, Gm(this.store.getState, this.store.setState), this.store.setState, k("tengu_print_ceiling_stop_agents", !0)), r = !0;
            }
            let he = this.drain.inputClosed && !I;
            if ((!z.swept && s.some((Se) => he || !pFt(Se)) || g || M || v && !H || !1) && !this.drain.abortController?.signal.aborted && !this.drain.endSessionRequested && !this.stopping()) {
                if (r = !0, !w) {
                    if (this.drain.runPhase = "waiting_for_agents", this.decideStashedAnswer(), Zg({ inputClosed: this.drain.inputClosed, currentState: this.io.sessionState.getState(), hasActiveTeammates: PGt(n), hasRunningBgTasks: s.some(md), hasPendingNotification: R }))
                        this.io.sessionState.notifyStateChanged("idle"), Dkt(this.ccrRecap, this.io.sessionState), this.onIdleReported();
                    return this.pulseKeepAlive(), ee(100);
                }
            }
            return r ? "again" : "done";
        }
        holdsEvalSettles() { return !1; }
    }
    ;
    function MP(e) { return typeof e === "string" ? [{ type: "text", text: e }] : e; }
    ;
    function EP(e) {
        if (e.length === 1)
            return e[0];
        if (e.every((r) => typeof r === "string"))
            return e.join(`
`);
        return e.flatMap(MP);
    }
    ;
    function Oc(e) { let r = e[0]; if (e.length === 1)
        return r; let n = Kwo(e), s = e.findLast((g) => g.uuid) ?? r; return { ...r, value: EP(e.map((g) => g.value)), uuid: s.uuid, frameTiming: s.frameTiming, turnAttributionKey: z3r(e), traceContext: n.parent, linkedTraceContexts: n.linked, attachmentSourceUuid: void 0, deliveryId: void 0, fileAttachments: e.flatMap((g) => g.fileAttachments ?? []), clientPlatform: e.find((g) => g.clientPlatform)?.clientPlatform ?? r.clientPlatform, ccrTurnId: QTo(e), ...e.some((g) => g.stampThreadState) && { stampThreadState: !0 } }; }
    ;
    function fh(e) { return e.drainOnly === !0 && e.resumedTurnUserMessageUuid !== void 0; }
    ;
    function Sh(e, r) { return r !== void 0 && r.mode === "prompt" && r.workload === e.workload && r.isMeta === e.isMeta && r.shouldQuery === e.shouldQuery && r.wakeupSource === e.wakeupSource && IP(e.origin, r.origin) && !!r.verifiedSlackHumanTurn === !!e.verifiedSlackHumanTurn && !!r.projectsUserTurn === !!e.projectsUserTurn && !!r.localStdinOrigin === !!e.localStdinOrigin && !!r.sessionChannelPersonTyped === !!e.sessionChannelPersonTyped && xWn(r.hostInitiator) === xWn(e.hostInitiator) && !!r.skipAttachments === !!e.skipAttachments && !!r.skipSlashCommands === !!e.skipSlashCommands && !fh(e) && !fh(r) && e.seededSummon !== !0 && r.seededSummon !== !0 && !QSr(e.value) && !QSr(r.value) && e.hearthRelayRows === void 0 && r.hearthRelayRows === void 0 && e.hearthRelayThreadTs === void 0 && r.hearthRelayThreadTs === void 0 && e.hearthRelayMessageIds === void 0 && r.hearthRelayMessageIds === void 0 && r.priority === e.priority && !e.inlinedImagePaths?.length && !r.inlinedImagePaths?.length && !e.taskDelivery && !r.taskDelivery && !sM(e.value) && !sM(r.value); }
    ;
    var vh = rSt;
    function bh(e, r) { return r.priority === e.priority && r.workload === e.workload && !!r.isMeta === !!e.isMeta && !!r.skipAttachments === !!e.skipAttachments && r.wakeupSource === e.wakeupSource && r.ccrTurnId === e.ccrTurnId && E_t(r) === E_t(e) && hh(e) && hh(r); }
    ;
    function yl(e) { return Ku(e) && !tb(e) && !N6(e); }
    ;
    function hh(e) { if (!dct(e) || e.taskId === void 0 || !AP(e.origin) || e.uuid !== void 0 || e.taskDelivery !== void 0 || e.userResumeNotice === !0 || e.stopHookActive === !0 || e.shouldQuery === !1 || typeof e.value !== "string")
        return !1; let r = e.value.trim(), n = `<${Ru}>`, s = `</${Ru}>`; return r.startsWith(n) && r.indexOf(n, 1) === -1 && r.endsWith(s) && r.indexOf(s) === r.length - s.length && jr(r, aC) !== null; }
    ;
    function AP(e) { return e === void 0 || Epn(e) && vpn(e); }
    ;
    function IP(e, r) { if (e === r)
        return !0; if (!e || !r)
        return !1; if (e.kind !== r.kind)
        return !1; if (e.kind === "slack-ping" && r.kind === "slack-ping")
        return e.channelId === r.channelId && e.threadTs === r.threadTs && e.messageTs === r.messageTs && e.slackUserId === r.slackUserId && e.senderDisplay === r.senderDisplay && e.permalink === r.permalink; if (e.kind === "peer" && r.kind === "peer")
        return e.from === r.from && e.inbound_origin === r.inbound_origin && e.senderTaskId === r.senderTaskId && e.verifiedPeerPid === r.verifiedPeerPid && e.activityObservation === r.activityObservation; if (e.kind === "channel" && r.kind === "channel")
        return e.server === r.server; if (e.kind === "plugin" && r.kind === "plugin")
        return e.name === r.name && e.asUser === r.asUser; if (e.kind === "task-notification" && r.kind === "task-notification")
        return e.subkind === r.subkind && e.fireReason === r.fireReason; return !0; }
    ;
    class _l {
        messageQueue;
        prewaitLatch;
        deferredToolUsePending;
        holdsEvalSettles;
        pollEmptyDispatchStalled = !1;
        pollDispatchTarget;
        lastDispatchAborted = !1;
        constructor({ messageQueue: e, prewaitLatch: r, deferredToolUsePending: n, holdsEvalSettles: s }) { this.messageQueue = e, this.prewaitLatch = r, this.deferredToolUsePending = n ?? (() => !1), this.holdsEvalSettles = s ?? (() => !1); }
        takeHead() { if (this.pollDispatchTarget !== void 0 && this.messageQueue.peek(Xf) === this.pollDispatchTarget && !this.lastDispatchAborted)
            this.pollEmptyDispatchStalled = !0, d(Error("attachment-only poll dispatch made no progress \u2014 falling back to value dispatch")); if (this.pollDispatchTarget = void 0, this.lastDispatchAborted = !1, this.holdsEvalSettles())
            return; let e = this.messageQueue.peek(Xf); if (e !== void 0 && IRo(e, this.pollEmptyDispatchStalled) && this.messageQueue.peek(pi) === void 0 && !this.deferredHumanTurnQueued()) {
            let n = this.messageQueue.peek((s) => Xf(s) && !tb(s) && IWn(s.mode));
            if (n !== void 0)
                return this.messageQueue.dequeue((s) => s === n);
            return this.pollDispatchTarget = e, { value: [], mode: "prompt", agentId: e.agentId, isMeta: !0, pollEmptyDispatch: !0, skipSubmissionHooks: !0 };
        } let r = this.dequeueOrphansFirst(); if (r?.mode === "poll-event" && r.pollEvent !== void 0 && f1t(r.pollEvent.kind))
            return vre([r], "reserved kind refused legacy value dispatch; redelivered on reconnect"), this.pollEmptyDispatchStalled = !1, this.takeHead(); if (r?.mode === "poll-event" && this.pollEmptyDispatchStalled)
            this.pollEmptyDispatchStalled = !1; return r; }
        takeFollowers(e, r) { let n = []; if (e.mode !== "prompt")
            return n; while (!0) {
            let s = this.messageQueue.peek(yl);
            if (!Sh(e, s) || !r(s))
                break;
            if (this.prewaitLatch.isDoomBoundary(e, s))
                break;
            if (e.shouldQuery === !1 && this.queuedBefore(s).some((g) => pi(g) && g.handedOffTurn !== void 0))
                break;
            n.push(this.messageQueue.dequeue(yl));
        } return n; }
        holdsQueryForFollower(e, r) { if (this.deferredHumanTurnQueued())
            return !1; let n = this.messageQueue.peek((s) => yl(s) && s.handbackPointer !== !0); return n !== void 0 && bh(e, n) && r(n) && !this.prewaitLatch.isDoomBoundary(e, n); }
        noteTurnEnded(e) { this.lastDispatchAborted = e; }
        holdsBack(e) { return e.handedOffTurn !== void 0 && this.deferredToolUsePending(); }
        queuedBefore(e) { let r = this.messageQueue.getCommandQueue(), n = r.indexOf(e); return n < 0 ? [] : r.slice(0, n); }
        deferredHumanTurnQueued() { return this.messageQueue.peek((e) => Ku(e) && yLe(e)) !== void 0; }
        dequeueOrphansFirst() { let e = this.messageQueue.peek((r) => pi(r) && r.handedOffTurn?.continues === !0 && !this.holdsBack(r)) ?? this.messageQueue.peek((r) => pi(r) && r.handedOffTurn === void 0) ?? this.messageQueue.peek((r) => pi(r) && !this.holdsBack(r)); if (e?.handedOffTurn !== void 0 && !e.handedOffTurn.continues) {
            let r = this.queuedBefore(e).find((n) => Xf(n) && n.mode === "prompt" && n.shouldQuery === !1);
            if (r !== void 0)
                return this.messageQueue.dequeue((n) => n === r);
        } if (e)
            return this.messageQueue.dequeue((r) => r === e), t(`drainCommandQueue: prioritizing orphaned-permission for toolUseID=${e.orphanedPermission?.permissionResult?.toolUseID ?? e.handedOffTurn?.toolUseIDs.join(",") ?? "<unknown>"}`), e; return uso(this.messageQueue, Xf); }
    }
    ;
    function pi(e) { return Ku(e) && e.mode === "orphaned-permission"; }
    ;
    class Fc {
        messageQueue;
        drain;
        prewaitLatch;
        deliveryLedger;
        io;
        commandLacksUserIntent;
        revokeCodeliveredFollowups;
        stopping;
        endSessionHead;
        startGate;
        onHead;
        replayMerged;
        deferredToolUsePending;
        holdsEvalSettles;
        coalesceTaskNotifications;
        selector;
        heads = 0;
        heldCompletionChars = 0;
        heldCompletionWorkload;
        constructor({ messageQueue: e, drain: r, prewaitLatch: n, deliveryLedger: s, io: g, commandLacksUserIntent: w, revokeCodeliveredFollowups: h, stopping: M, endSessionHead: v, startGate: R, onHead: U, replayMerged: H, deferredToolUsePending: I, holdsEvalSettles: de, coalesceTaskNotifications: z }) { this.messageQueue = e, this.drain = r, this.prewaitLatch = n, this.deliveryLedger = s, this.io = g, this.commandLacksUserIntent = w, this.revokeCodeliveredFollowups = h, this.stopping = M, this.endSessionHead = v, this.startGate = R, this.onHead = U, this.replayMerged = H, this.deferredToolUsePending = I, this.holdsEvalSettles = de, this.coalesceTaskNotifications = z, this.selector = new _l({ messageQueue: e, prewaitLatch: n, deferredToolUsePending: I, holdsEvalSettles: de }); }
        get commandsProcessed() { return this.heads; }
        take() { while (!this.stopping()) {
            let e = this.drain.endSessionRequested ? this.startGate.takeHead(this.endSessionHead, () => this.messageQueue.dequeue(this.endSessionHead)) : this.startGate.takeHead((s) => Xf(s) && !this.selector.holdsBack(s), () => this.selector.takeHead());
            if (e === void 0) {
                if (this.heldCompletionChars === 0 || this.drain.endSessionRequested || this.messageQueue.peek(Xf) !== void 0)
                    return;
                if (this.drain.abortController?.signal.aborted) {
                    this.heldCompletionChars = 0, this.heldCompletionWorkload = void 0;
                    return;
                }
                p("print_task_notification_coalesce", "owed_call_dispatched"), e = { value: [], mode: "prompt", agentId: Ge(), isMeta: !0, skipSubmissionHooks: !0, workload: this.heldCompletionWorkload }, this.heldCompletionChars = 0, this.heldCompletionWorkload = void 0;
            }
            if (this.heads++, this.drain.dequeueCount++, e.mode === "task-notification" && typeof e.value === "string" && !this.drain.endSessionRequested && this.heldCompletionChars + e.value.length <= vh && this.coalesceTaskNotifications() && this.selector.holdsQueryForFollower(e, (s) => this.startGate.admits(s)))
                e = { ...e, shouldQuery: !1, queryHeldForNextTurn: !0, stampThreadState: void 0 };
            if (this.drain.intentBatchInFlight = !this.commandLacksUserIntent(e), this.io.sessionState.notifyTurnStarting(e.mode, e.taskId), this.onHead?.(e), !IWn(e.mode))
                throw Error("only prompt commands are supported in streaming mode");
            let r = [e];
            if (e.mode === "prompt" && !this.drain.endSessionRequested) {
                r.push(...this.selector.takeFollowers(e, (g) => this.startGate.admits(g)));
                let s = r.filter((g) => g.uuid !== void 0 && this.messageQueue.consumeCancelPending(g.uuid));
                if (s.length > 0) {
                    this.revokeCodeliveredFollowups(s);
                    for (let w of s)
                        this.io.onCommandLifecycle?.(w.uuid, "cancelled");
                    let g = r.filter((w) => !s.includes(w));
                    if (g.length === 0) {
                        this.prewaitLatch.reset();
                        continue;
                    }
                    r.length = 0, r.push(...g), e = g[0];
                }
                if (r.length > 1)
                    e = Oc(r);
            }
            let n = r.map((s) => s.uuid).filter((s) => s !== void 0);
            if (this.drain.pendingDispatchUuids = n, this.drain.drainingHandoff = e.handedOffTurn && { command: e, running: !1 }, this.prewaitLatch.parkBatch(this.drain.intentBatchInFlight), r.length > 1)
                this.replayMerged?.(r, e);
            return { command: e, members: r, uuids: n };
        } return; }
        commit(e) { let r = e.members.filter((n) => n.uuid !== void 0 && this.messageQueue.consumeCancelPending(n.uuid)); if (r.length > 0) {
            vre(r.filter(tb), "cancelled by the host"), this.revokeCodeliveredFollowups(r);
            for (let s of r)
                if (!this.messageQueue.consumeCancelPendingAcked(s.uuid))
                    this.io.onCommandLifecycle?.(s.uuid, "cancelled");
            let n = e.members.filter((s) => !r.includes(s));
            if (n.length === 0) {
                this.prewaitLatch.dropParkedBatch();
                return;
            }
            e.members.length = 0, e.members.push(...n), e.command = Oc(e.members), e.uuids.length = 0, e.uuids.push(...e.members.map((s) => s.uuid).filter((s) => s !== void 0));
        } return e; }
        start(e) { this.deliveryLedger.startBatch(e.uuids); let { frameTiming: r } = e.command; if (r !== void 0)
            ne("info", "cli_turn_started", () => ({ uuid: qEe(e.command.uuid), batch_size: e.members.length, enqueue_to_start_ms: Date.now() - r.enqueuedWallMs })); let n = e.command.mode === "poll-event" ? [...e.uuids] : []; if (e.command.mode === "poll-event")
            eYe(e.members), y("poll_event_delivery"); return n; }
        noteTurnEnded(e, r, n) { if (this.selector.noteTurnEnded(e), e || n.num_turns > 0) {
            if (!e && this.heldCompletionChars > 0)
                y("print_task_notification_coalesce");
            this.heldCompletionChars = 0, this.heldCompletionWorkload = void 0;
        }
        else if (r.queryHeldForNextTurn === !0 && typeof r.value === "string" && n.result === "")
            this.heldCompletionChars += r.value.length, this.heldCompletionWorkload = r.workload; }
        exit() { if (this.drain.pendingDispatchUuids = [], this.drain.intentBatchInFlight = !1, this.drain.drainingHandoff = void 0, this.drain.turnUnderWay = !1, this.prewaitLatch.dropParkedBatch(), this.stopping() || this.drain.endSessionRequested)
            this.heldCompletionChars = 0, this.heldCompletionWorkload = void 0; this.selector = new _l({ messageQueue: this.messageQueue, prewaitLatch: this.prewaitLatch, deferredToolUsePending: this.deferredToolUsePending, holdsEvalSettles: this.holdsEvalSettles }); }
    }
    ;
    function Qc({ message: e, held: r, holdBackActive: n, emit: s }) { if (n) {
        r.push(e);
        return;
    } $c(r, s), s(e); }
    ;
    function $c(e, r) { for (let n of e)
        r(n); e.length = 0; }
    ;
    function Lh(e, r) { if (!r || e.type !== "result" || e.queued_turn_count === void 0 || e.queued_turn_count === 0)
        return e; return { ...e, queued_turn_count: 0 }; }
    ;
    function Vc(e, r) { if (e.length === 0)
        return r; let n = [...e, r], s = n.find((g) => g.subtype !== "success" || g.is_error) ?? r; return e.length = 0, { ...s, total_cost_usd: r.total_cost_usd, duration_api_ms: r.duration_api_ms, modelUsage: r.modelUsage, usage: n.reduce((g, w) => jct(g, w.usage), lp), num_turns: n.reduce((g, w) => g + w.num_turns, 0), duration_ms: n.reduce((g, w) => g + w.duration_ms, 0), permission_denials: n.flatMap((g) => g.permission_denials) }; }
    ;
    var KP = 1e4;
    async function Yc(e, r = Nu, n = KP) { if (e) {
        await r();
        return;
    } try {
        if (await lt(r().then(() => !0), n) === void 0)
            t(`transcript drain still running after ${n}ms; the result goes out without it`, { level: "warn" });
    }
    catch (s) {
        d(s);
    } }
    ;
    class Jc {
        heldBackResults = [];
        carriedEvalResults = [];
        pendingPointerResults = new Set;
        drain;
        messageQueue;
        toolState;
        store;
        pendingNotificationWaits;
        storageV5;
        sessionMirror;
        flushSessionStorage;
        emit;
        heldResultTotals;
        turnAbortedForShutdown;
        shuttingDown;
        stopping;
        teardownRequested;
        emitPendingSuggestion;
        constructor({ drain: e, messageQueue: r, toolState: n, store: s, pendingNotificationWaits: g, storageV5: w, sessionMirror: h, flushSessionStorage: M, emit: v, heldResultTotals: R, turnAbortedForShutdown: U, shuttingDown: H, stopping: I, teardownRequested: de, emitPendingSuggestion: z, handbackPointerResults: he }) { this.drain = e, this.messageQueue = r, this.toolState = n, this.store = s, this.pendingNotificationWaits = g, this.storageV5 = w, this.sessionMirror = h, this.flushSessionStorage = M, this.emit = (ge) => { if (ge.type === "result" && this.pendingPointerResults.delete(ge.uuid))
            he.add(ge); v(ge); }, this.heldResultTotals = R, this.turnAbortedForShutdown = U, this.shuttingDown = H, this.stopping = I, this.teardownRequested = de, this.emitPendingSuggestion = z; }
        holdsResults() { return this.heldBackResults.length > 0 || this.carriedEvalResults.length > 0; }
        route(e, { command: r }) { if (r.shouldQuery !== !1 && this.drain.inputClosed && this.messageQueue.peek(J1e) !== void 0) {
            this.carriedEvalResults.push(e);
            return;
        } let n = r.shouldQuery === !1 ? e : Vc(this.carriedEvalResults, e), s = this.store.getState(); if (r.handbackPointer === !0)
            this.pendingPointerResults.add(e.uuid); if (r.shouldQuery === !1 && r.queryHeldForNextTurn !== !0 && r.handbackPointer !== !0)
            return this.flushBeforeResult().then(() => { this.emit(e); }); if (Jg({ inputClosed: this.drain.inputClosed, runningTasks: kde(s) }) || this.drain.inputClosed && sa({ tasks: Object.values(s.tasks ?? {}), waits: this.pendingNotificationWaits, now: Date.now() })) {
            Qc({ message: n, held: this.heldBackResults, holdBackActive: !0, emit: (w) => this.emit(w) });
            return;
        } let g = () => { Qc({ message: n, held: this.heldBackResults, holdBackActive: !1, emit: (w) => this.emit(B6t(w, this.heldResultTotals())) }); }; return this.flushBeforeResult().then(g); }
        release() { let e = this.carriedEvalResults.pop(); if (e !== void 0)
            this.heldBackResults.push(Vc(this.carriedEvalResults, e)); if (this.heldBackResults.length === 0)
            return; if (Xg({ aborted: this.drain.abortController?.signal.aborted ?? !1, shuttingDown: this.shuttingDown(), abortedForShutdown: this.turnAbortedForShutdown(), teardownRequested: this.teardownRequested(), heldResultCount: this.heldBackResults.length }))
            Gee({ taskRegistry: Gm(this.store.getState, this.store.setState), setAppState: this.store.setState, storageV5: this.storageV5 }); return this.flushBeforeResult().then(() => { this.emitHeldResults(); }); }
        flushBeforeResult() { return Yc(this.sessionMirror, this.flushSessionStorage); }
        emitHeldResults() { let e = this.drain.endSessionRequested || this.stopping(); $c(this.heldBackResults, (r) => this.emit(Lh(B6t(r, this.heldResultTotals()), e))), this.emitPendingSuggestion(); }
    }
    ;
    function decideStashedAnswer287() { if (this.stashedAdoptedParkAnswer !== void 0) {
        let e = this.stashedAdoptedParkAnswer;
        this.stashedAdoptedParkAnswer = void 0, this.fire(e);
    } }
    ;
    function Pp(e, r) { let s = Date.now(); return () => { if (!r)
        return; let g = Date.now(); if (g - s >= 30000)
        e.enqueue({ type: "keep_alive" }), s = g; }; }
    ;
    function installMainLoopLiveness287({ Yt, v, gs, r, qe }) { var Ya = () => { if (Yt.inheritedPromptOwnsWorkerStatus())
        return !1; let b = v(), D = Object.values(b.tasks ?? {}), K = D.some(Kg), ce = kde(b).some(md), ke = sa({ tasks: D, waits: gs, now: Date.now() }), Ie = rh({ hasActiveTeammates: K, hasRunningBgTasks: ce, hasPendingNotification: ke }); if (Ie && ci() && D.some(Gg))
        ne("info", "cli_idle_gate_report_idle", () => ({ task_count: D.length, tasks: eh(D.slice(0, 64)), tasks_truncated: D.length > 64, has_active_teammates: K, has_running_bg_tasks: ce, has_pending_notification: ke })); return Ie; }; r.setMainLoopLiveness(() => { if (qe.running)
        return !0; try {
        return !Ya();
    }
    catch (b) {
        return d(b), m("per_task_stop_sparing", "liveness_probe_throw"), !1;
    } }); ; return Ya; }
    ;
    return { Ig, al, Hg, gc, pP, hc, kc, Sc, vP, ul, bP, gl, wc, sa, ci, md, Kg, Gg, Jg, Xg, Zg, eh, rh, nh, Rc, oh, sh, ih, Tc, MP, EP, Oc, fh, Sh, vh, bh, yl, hh, AP, IP, _l, pi, Fc, Qc, $c, Lh, Vc, KP, Yc, Jc, decideStashedAnswer287, Pp, installMainLoopLiveness287 };
}
function module32(imports) {
    function Le(e) { if (!e)
        return !1; if (typeof e === "boolean")
        return e; let n = String(e).toLowerCase().trim(); return ["1", "true", "yes", "on"].includes(n); }
    ;
    function gs(e) { if (e === void 0)
        return !1; if (typeof e === "boolean")
        return !e; let n = String(e).toLowerCase().trim(); return ["0", "false", "no", "off"].includes(n); }
    ;
    return { Le, gs };
}
function module33(imports) {
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
function module34(imports) {
    const Le = imports["Le"];
    const gs = imports["gs"];
    const Oc = imports["Oc"];
    function i(n) { return { parse: (e) => n(u(e)) }; }
    ;
    function t(n) { let e = n?.trim(); return e ? e : void 0; }
    ;
    function u(n) { return n === void 0 ? void 0 : String(n); }
    ;
    var f = i(t);
    var o = i((n) => n);
    var s = i((n) => Le(n));
    var l = i((n) => { if (Le(n))
        return !0; if (gs(n))
        return !1; return; });
    var m = d();
    function B7o(n) { if (typeof n === "boolean")
        return n ? "1" : "0"; return String(n); }
    ;
    var D = { str: () => f, rawStr: () => o, bool: () => s, triBool: () => l, int: (n) => n ? d(n) : m, enum: (n) => i((e) => e !== void 0 && n.includes(e.trim()) ? e.trim() : void 0) };
    function d(n) { return i((e) => { if (e === void 0)
        return; if (n?.digitsOnly && !/^[+-]?\d+$/.test(e.trim()))
        return; let r = Oc(e); if (!Number.isFinite(r))
        return; if (n?.min !== void 0 && r < n.min)
        return; if (n?.max !== void 0 && r > n.max)
        return; return r; }); }
    ;
    return { i, t, u, f, o, s, l, m, B7o, D, d };
}
function module35(imports) {
    const process = imports["process"];
    const B7o = imports["B7o"];
    const D = imports["D"];
    var SE = D.triBool();
    var qp = D.bool();
    var Hi = D.int({ min: 0 });
    function ZZe(t, o) { let _ = Object.create(o); for (let [r, s] of Object.entries(t)) {
        let n = _, e;
        Object.defineProperty(_, r, { get: () => { let C = process.env[r]; if (C !== n)
                e = s.parse(C), n = C; return e; }, enumerable: !0, configurable: !0 });
    } return Object.defineProperties(_, { set: { value: (r, s) => { process.env[r] = B7o(s); } }, unset: { value: (r) => { delete process.env[r]; } } }), _; }
    ;
    return { SE, qp, Hi, ZZe };
}
function module36(imports) {
    function NPt(n) { return n.source === "session-inbox" && n.kind === "message.received"; }
    ;
    return { NPt };
}
function module37(imports) {
    var git = /^file_[A-Za-z0-9_]{8,80}$/;
    return { git };
}
function module38(imports) {
    const Oz = imports["Oz"];
    const zK = imports["zK"];
    const ZZ = imports["ZZ"];
    const ret = imports["ret"];
    const aC = imports["aC"];
    const wT = imports["wT"];
    const Ru = imports["Ru"];
    function qi({ taskId: n, toolUseId: s, taskType: r, outputFile: e, status: i, summary: t, body: u, trailing: d }) {
        let f = [[Oz, n], [zK, s], [ZZ, r], [ret, e], [aC, i], [wT, t]], o = `<${Ru}>`;
        for (let [a, T] of f)
            if (T)
                o += `
<${a}>${T}</${a}>`;
        return `${o}${u ?? ""}
</${Ru}>${d ?? ""}`;
    }
    ;
    return { qi };
}
function module39(imports) {
    var Bqe = "FetchInboxMessage";
    return { Bqe };
}
function module40(imports) {
    const Tt = imports["Tt"];
    const Yen = imports["Yen"];
    const NPt = imports["NPt"];
    const k = imports["k"];
    const git = imports["git"];
    const t = imports["t"];
    const y = imports["y"];
    const que = imports["que"];
    const m = imports["m"];
    const qi = imports["qi"];
    const Bqe = imports["Bqe"];
    const Ge = imports["Ge"];
    const d = imports["d"];
    var a = 32;
    var u = "session-inbox-unread";
    var l = new Set(["request_failed", "http_error", "owner_unverified"]);
    function s() { return k("tengu_bridge_inbox_pointer_boundary", !0); }
    ;
    class f {
        tracked = new Map;
        noteQueued({ inboundOrigin: i, wake: e, uuid: o }) { if (i !== Yen || e === void 0 || o === void 0 || !NPt(e) || !s())
            return; let n = e.data.file_id; if (typeof n !== "string" || !git.test(n))
            return; if (this.tracked.size >= a) {
            let r = this.tracked.keys().next().value;
            if (r !== void 0)
                this.tracked.delete(r), t(`[bridge] inbox pointer ${r} forgotten: ${a} pointers already unread`);
        } this.tracked.set(n, { uuid: o, delivered: !1, renotifyValue: void 0 }); }
        noteLifecycle(i, e) { for (let [o, n] of this.tracked) {
            if (n.uuid !== i)
                continue;
            switch (e) {
                case "completed":
                    n.delivered = !0;
                    break;
                case "cancelled":
                case "discarded":
                case "refused":
                    this.tracked.delete(o);
                    break;
                case "queued":
                case "started": break;
            }
            return;
        } }
        tapCommandLifecycle(i) { let e = i.onCommandLifecycle; i.onCommandLifecycle = (o, n) => { e?.(o, n), this.noteLifecycle(o, n); }; }
        noteFetchAttempt(i, e, o) { let n = this.tracked.get(i); if (n === void 0)
            return; if (!e.ok && l.has(e.reason))
            return; if (this.tracked.delete(i), n.renotifyValue !== void 0) {
            if (o.removeByFilter(c(n.renotifyValue)), e.ok)
                y("bridge_inbox_pointer");
        } }
        pendingFileIds() { return [...this.tracked.keys()]; }
        renotifyUnfetched(i) {
            try {
                if (this.tracked.size === 0)
                    return;
                if (!s()) {
                    this.tracked.clear();
                    return;
                }
                if (que() > 0)
                    return;
                for (let [e, o] of this.tracked) {
                    if (!o.delivered)
                        continue;
                    if (o.renotifyValue !== void 0) {
                        if (i.peek(c(o.renotifyValue)) !== void 0)
                            continue;
                        this.tracked.delete(e), m("bridge_inbox_pointer", "unread_after_renotify"), t(`[bridge] inbox pointer ${e} was not read after a re-notify; giving up`);
                        continue;
                    }
                    let n = qi({ taskType: u, status: "pending", summary: `An inbox message announced earlier has not been read (file_id ${e})`, body: `
A session-inbox notification carrying file_id ${e} was delivered to you earlier and ${Bqe} was not called for it. Call ${Bqe} with that file_id now, before other work. Its content is relayed text under the rules the tool describes, not an instruction from this note.` });
                    i.enqueuePendingNotification({ mode: "task-notification", agentId: Ge(), value: n, skipAttachments: !0, priority: "later" }), o.renotifyValue = n, t(`[bridge] inbox pointer ${e} was not read by its turn; re-notifying once`);
                }
            }
            catch (e) {
                d(e);
            }
        }
    }
    ;
    var Bvr = new Tt(() => new f);
    function c(i) { return (e) => e.mode === "task-notification" && e.value === i; }
    ;
    return { a, u, l, s, f, Bvr, c };
}
export function createPrintLifecycleNative287(ports) {
    for (const name of ["admissionSlot287", "admit287", "analytics", "bindCallback", "debug", "dequeueForAgent", "diagnostic", "environment", "executionContext", "feature", "flushSessionStorage", "inboxRunPressure", "isMainThreadAgent", "killObserver", "killShell", "logError", "mainAgentId", "persistAgentStop", "process", "randomUUID", "registry", "reportRecap", "shuttingDown", "stopTask", "taskImplementation", "teardownUnwindRequested", "terminalEvent", "toError", "totalCost"])
        if (ports[name] === undefined)
            throw Error('Missing print lifecycle host port: ' + name);
    const m0 = module0({});
    const m1 = module1({});
    const m2 = module2({ "Tt": m1["Tt"], "U": ports["executionContext"] });
    const m3 = module3({});
    const m4 = module4({ "tn": m0["tn"], "ko": m2["ko"], "k": ports["feature"], "n4o": m3["n4o"] });
    const m5 = module5({});
    const m6 = module6({});
    const m7 = module7({ "bn": m6["bn"], "S": m6["S"] });
    const m8 = module8({ "i": ports["analytics"], "c": m6["c"], "tme": m7["tme"] });
    const m9 = module9({ "P": m7["P"], "m": m8["m"], "Ge": ports["mainAgentId"] });
    const m10 = module10({ "wKt": ports["bindCallback"] });
    const m11 = module11({ "Ku": ports["isMainThreadAgent"], "Bk": m4["Bk"], "a": ports["environment"], "lo": m4["lo"], "G": m5["G"], "tb": m9["tb"], "iZn": m4["iZn"], "Sdt": ports["dequeueForAgent"], "yo": m0["yo"], "zle": ports["totalCost"], "JO": ports["admissionSlot287"], "Tt": m1["Tt"], "Ls": m10["Ls"], "j_": ports["admit287"] });
    const m12 = module12({});
    const m13 = module13({});
    const m14 = module14({});
    const m15 = module15({});
    const m16 = module16({});
    const m17 = module17({ "wc": m16["wc"] });
    const m18 = module18({});
    const m19 = module19({ "Lln": m11["Lln"], "yLe": m18["yLe"] });
    const m20 = module20({});
    const m21 = module21({});
    const m22 = module22({});
    const m23 = module23({});
    const m24 = module24({});
    const m25 = module25({ "JOt": m11["JOt"] });
    const m26 = module26({});
    const m27 = module27({ "Fu": m23["Fu"], "Uze": ports["taskImplementation"], "ek": m11["ek"], "x1": m23["x1"], "gg": m23["gg"], "kn": m23["kn"], "Qr": ports["persistAgentStop"], "XR": m11["XR"], "wan": m11["wan"], "Ii": ports["terminalEvent"] });
    const m28 = module28({});
    const m29 = module29({});
    const m30 = module30({});
    const m31 = module31({ "Xf": m11["Xf"], "d": ports["logError"], "IRo": m11["IRo"], "Ku": ports["isMainThreadAgent"], "tb": m9["tb"], "IWn": m11["IWn"], "f1t": m9["f1t"], "vre": m9["vre"], "N6": m11["N6"], "xWn": m11["xWn"], "QSr": m12["QSr"], "sM": m13["sM"], "E_t": m4["E_t"], "dct": m11["dct"], "Epn": m14["Epn"], "vpn": m14["vpn"], "Ru": m15["Ru"], "jr": m17["jr"], "aC": m15["aC"], "yLe": m18["yLe"], "t": ports["debug"], "uso": m19["uso"], "p": m8["p"], "Ge": ports["mainAgentId"], "rSt": m3["rSt"], "Kwo": m20["Kwo"], "z3r": m4["z3r"], "QTo": m11["QTo"], "ne": ports["diagnostic"], "qEe": m21["qEe"], "eYe": m9["eYe"], "y": m8["y"], "J1e": m9["J1e"], "jct": m11["jct"], "lp": m22["lp"], "x1": m23["x1"], "gg": m23["gg"], "kde": m23["kde"], "yi": m24["yi"], "Jbr": m25["Jbr"], "B6t": m26["B6t"], "Gee": m27["Gee"], "Gm": ports["registry"], "Nu": ports["flushSessionStorage"], "lt": m28["lt"], "Z": ports["toError"], "stt": m21["stt"], "Ai": ports["shuttingDown"], "XQr": ports["teardownUnwindRequested"], "u2": m11["u2"], "Fu": m23["Fu"], "zle": ports["totalCost"], "process": ports["process"], "a": ports["environment"], "mrt": m29["mrt"], "aQe": m30["aQe"], "UIe": m30["UIe"], "k": ports["feature"], "L9e": m23["L9e"], "Lu": m11["Lu"], "_N": ports["killShell"], "xA": ports["killObserver"], "PP": ports["stopTask"], "kn": m23["kn"], "Ii": ports["terminalEvent"], "Lq": m23["Lq"], "pFt": m23["pFt"], "PGt": m30["PGt"], "Dkt": ports["reportRecap"], "ee": m28["ee"], "mP": ports["randomUUID"], "m": m8["m"] });
    const m32 = module32({});
    const m33 = module33({});
    const m34 = module34({ "Le": m32["Le"], "gs": m32["gs"], "Oc": m33["Oc"] });
    const m35 = module35({ "process": ports["process"], "B7o": m34["B7o"], "D": m34["D"] });
    const m36 = module36({});
    const m37 = module37({});
    const m38 = module38({ "Oz": m15["Oz"], "zK": m15["zK"], "ZZ": m15["ZZ"], "ret": m15["ret"], "aC": m15["aC"], "wT": m15["wT"], "Ru": m15["Ru"] });
    const m39 = module39({});
    const m40 = module40({ "Tt": m1["Tt"], "Yen": m18["Yen"], "NPt": m36["NPt"], "k": ports["feature"], "git": m37["git"], "t": ports["debug"], "y": m8["y"], "que": ports["inboxRunPressure"], "m": m8["m"], "qi": m38["qi"], "Bqe": m39["Bqe"], "Ge": ports["mainAgentId"], "d": ports["logError"] });
    return { DispatchIntake: m31["Fc"], queuedTurnCount: m11["YPo"], ResultController: m31["Jc"], refreshHeldResultTotals: m26["B6t"], markTaskUserStopped: m27["zee"], CloseController: m31["kc"], Parker: m31["Tc"], Drain: m31["hc"], admissionSlot: ports["admissionSlot287"], detachedSlot: m11["KS"], windDown: m31["ih"], policy: m31["sh"], createEnvironment: m35["ZZe"], ceilingSchema: m35["Hi"], reportRunningSchema: m35["SE"], remoteSchema: m35["qp"], pulse: m31["Pp"], stopForegroundAgents: m27["_Tt"], budgetSweep: m31["gl"], admit: ports["admit287"], stopBackgroundAgents: m27["Gee"], inboxSlot: m40["Bvr"], decideStashedAnswer: m31["decideStashedAnswer287"], installMainLoopLiveness: m31["installMainLoopLiveness287"] };
}
