// Complete pinned 2.1.287 print controller/scheduler closure. Host leaves are explicit ports.
function module0(imports) {
    const A6 = imports["A6"];
    const JV = imports["JV"];
    var Bve = (e) => e !== void 0 && A6.get()?.has(e) === !0;
    var iV = () => A6.get() ? JV.get() : void 0;
    return { Bve, iV };
}
function module1(imports) {
    const Ku = imports["Ku"];
    function Xf(e) { return Ku(e) && e.passive !== !0; }
    ;
    return { Xf };
}
function module2(imports) {
    const YKe = imports["YKe"];
    var lso = (e) => YKe.has(e);
    return { lso };
}
function module3(imports) {
    const iV = imports["iV"];
    const Xf = imports["Xf"];
    const Bve = imports["Bve"];
    const Ku = imports["Ku"];
    const lso = imports["lso"];
    function pi(e) { return Ku(e) && e.mode === "orphaned-permission"; }
    ;
    class kl {
        messageQueue;
        stopping;
        isHeadAhead = !1;
        queuedAtWait;
        followersFrom;
        constructor(e, r) { this.messageQueue = e, this.stopping = r; }
        waitForHead(e) { let r = iV(); return this.isHeld(r, e()) ? this.waitOut(e, r) : void 0; }
        takeHead(e, r) { if (this.isHeadAhead = !1, this.followersFrom = void 0, iV() !== void 0 && this.messageQueue.peek(Uc) !== void 0 && this.messageQueue.peek(e) !== void 0)
            return this.isHeadAhead = !0, this.messageQueue.dequeue((g) => pi(g) && e(g)) ?? this.messageQueue.dequeue(Uc); if (this.isHeld(iV(), e))
            return; return this.followersFrom = this.queuedAtWait, this.queuedAtWait = void 0, (this.messageQueue.peek(pi) === void 0 ? this.messageQueue.dequeue((g) => e(g) && DP(g)) : void 0) ?? r(); }
        get isAheadOfStart() { return this.isHeadAhead; }
        admits(e) { return !this.isHeadAhead && (this.followersFrom?.has(e) ?? !0); }
        async waitOut(e, r) { let n = r; while (this.isHeld(n, e()))
            this.queuedAtWait ??= new Set(this.messageQueue.getCommandQueue()), await xP(this.messageQueue, n), n = iV(); }
        isHeld(e, r) { return !this.stopping() && e !== void 0 && this.messageQueue.peek(r) !== void 0 && this.messageQueue.peek(Uc) === void 0; }
    }
    ;
    function Uc(e) { return Xf(e) && Bve(e.uuid); }
    ;
    function DP(e) { return Xf(e) && lso(e.uuid); }
    ;
    async function xP(e, r) { let n = () => { }, s = new Promise((g) => { n = e.subscribe(() => g()); }); try {
        await Promise.race([r, s]);
    }
    finally {
        n();
    } }
    ;
    var Hw = `<system-reminder>
You are running in non-interactive mode and cannot return a response to the user until your team is shut down.

You MUST shut down your team before preparing your final response:
1. Use requestShutdown to ask each team member to shut down gracefully
2. Wait for shutdown approvals
3. Use the cleanup operation to clean up the team
4. Only then provide your final response to the user

The user cannot receive your response until the team is completely shut down.
</system-reminder>

Shut down your team and prepare your final response for the user.`;
    function Sw(e) { return Ku(e) && e.value === Hw; }
    ;
    return { pi, kl, Uc, DP, xP, Hw, Sw };
}
function module4(imports) {
    function notifyTurnStarting287(e, n) { this.onTurnStarting?.(e, n); }
    ;
    return { notifyTurnStarting287 };
}
export function createPrintDispatchStartNative287(ports) {
    for (const name of ["aheadUuids", "isMainThreadAgent", "startJoin", "startUuids"])
        if (ports[name] === undefined)
            throw Error('Missing print lifecycle host port: ' + name);
    const m0 = module0({ "A6": ports["startUuids"], "JV": ports["startJoin"] });
    const m1 = module1({ "Ku": ports["isMainThreadAgent"] });
    const m2 = module2({ "YKe": ports["aheadUuids"] });
    const m3 = module3({ "iV": m0["iV"], "Xf": m1["Xf"], "Bve": m0["Bve"], "Ku": ports["isMainThreadAgent"], "lso": m2["lso"] });
    const m4 = module4({});
    return { StartGate: m3["kl"], isMainThread: m1["Xf"], endSessionHead: m3["Sw"], notifyTurnStarting: m4["notifyTurnStarting287"] };
}
