// Pinned npm 2.1.283 complete functions; only two require bindings adapted.
export function createCdFunctions(deps) {
const {V,Ph,we,Rs,ba,gh,Hl,ag,Ru,Vh,OR,II,IR,x9t,A9t,srr,U,E,S,t,d,taskOutputs,retention,q9t,K9t,xZt,L_o,NI,mv,Xe,G,j,Ct,x,xn,oe,D}=deps;
const N=()=>false,kg=()=>undefined;
async function Yze(e) {
    let n = N() && e !== void 0 ? e : void 0, r = V(), s = Ph(we()), g = Rs(), h = g.sessionFile;
    if (h === null || ba()) {
        g.currentSessionRelocatedCwd = we(), gh(r, "cd", s);
        return;
    }
    let b = Hl(s, `${r}.jsonl`);
    if (h === b) {
        gh(r, "cd", s);
        let w = we();
        if (g.currentSessionRelocatedCwd !== w) {
            g.currentSessionRelocatedCwd = w;
            let D = { type: "relocated", sessionId: r, relocatedCwd: w };
            g.beginTranscriptRelocation(), q9t(h);
            try {
                if (await g.flush(), await xZt(), await L_o(h, S(D) + `
`, NI(h, n)))
                    g.fireMirror(h, [D]);
            }
            catch (F) {
                t(`relocateSessionTranscript: same-target relocated stamp failed: ${F}`);
            }
            finally {
                K9t(h), await g.endTranscriptRelocation();
            }
        }
        return;
    }
    g.beginTranscriptRelocation(), q9t(h);
    try {
        await g.flush(), await xZt(), await OR(s, { recursive: !0, mode: 448 });
        let w = kg(e), D = await Ru(ag(h), w) === await Ru(s, w);
        if (!D)
            try {
                let [Pe, Me] = await Promise.all([Vh(ag(h), { bigint: !0 }), Vh(s, { bigint: !0 })]);
                D = Pe.dev === Me.dev && Pe.ino === Me.ino;
            }
            catch (Pe) {
                if (!U(Pe))
                    throw Pe;
            }
        let F;
        if (!D)
            F = await DWe(b);
        let W = n && Vg(h), q = n && Vg(b), ge = n !== void 0 && W !== void 0 && q !== void 0, ye = !0;
        try {
            await W9t(h, b, n, ge ? { from: W, to: q } : void 0);
        }
        catch (Pe) {
            if (U(Pe)) {
                if (F !== void 0)
                    throw await II(F, b).catch((Me) => { t(`relocateSessionTranscript: could not restore set-aside destination after ENOENT move: ${Me}`, { level: "warn" }); }), Pe;
                t(`relocateSessionTranscript: old file missing: ${Pe}`), ye = !1;
            }
            else {
                if (F !== void 0)
                    await II(F, b).catch((Me) => { t(`relocateSessionTranscript: could not restore set-aside destination after failed move: ${Me}`, { level: "warn" }); });
                throw Pe;
            }
        }
        let ve = Hl(ag(h), r), Ee = Hl(s, r), xe = !0;
        try {
            await W9t(ve, Ee, n, ge ? { fromScope: $9t(W), toScope: $9t(q) } : void 0);
        }
        catch (Pe) {
            if (xe = !1, !U(Pe))
                d(Pe);
        }
        if (g.setSessionFile(b), gh(r, "cd", s), g.currentSessionRelocatedCwd = we(), ye)
            try {
                await mv(b, { type: "relocated", sessionId: r, relocatedCwd: g.currentSessionRelocatedCwd }, n);
            }
            catch (Pe) {
                t(`relocateSessionTranscript: relocated stamp failed: ${Pe}`);
            }
        if (xe)
            try {
                let Pe = taskOutputs;
                await Pe.repointTaskOutputSymlinks(ve, Ee);
            }
            catch (Pe) {
                d(Pe);
            }
    }
    finally {
        K9t(g.sessionFile ?? h), await g.endTranscriptRelocation();
    }
}
async function W9t(e, n, r, s) { if (N() && r !== void 0 && s !== void 0) {
    let h = "fromScope" in s ? await Irr(r, s.fromScope, s.toScope) : await r.move(s.from, s.to);
    if (h.ok)
        return;
    if (h.error.code === "NotFound" || h.error.code === "ScopeNotFound")
        throw Object.assign(Error("nothing to move at the old home"), { code: "ENOENT" });
    if (h.error.code === "Failed" && h.error.telemetryCode === "SameEntry")
        return;
    let b = "fromScope" in s ? vrr(h.error) : void 0;
    if (b !== void 0) {
        if (t(`renameWithFallbacks: a scope move stood with its set-aside leftover stranded; left in place at ${b.leftover ?? "(unnamed)"}`, { level: "warn" }), await rrr(e).catch(() => { return; }) !== void 0)
            t(`renameWithFallbacks: the session folder may also remain at ${e}; left in place`, { level: "warn" });
        return;
    }
    throw T8t(h.error);
} async function g(h, b) { await OR(b, { recursive: !0, mode: 448 }); for (let w of await IR(h, { withFileTypes: !0 }))
    if (w.isDirectory())
        await g(Hl(h, w.name), Hl(b, w.name));
    else
        await x9t(Hl(h, w.name), Hl(b, w.name)); } try {
    await II(e, n);
    return;
}
catch (h) {
    let b = E(h);
    if (b === "EEXIST" || b === "EPERM" || b === "EBUSY" || b === "ENOTEMPTY") {
        let w = await DWe(n).catch(() => { return; });
        try {
            await II(e, n);
        }
        catch (D) {
            if (w !== void 0)
                await II(w, n).catch(() => { });
            throw D;
        }
        return;
    }
    if (b === "EXDEV") {
        try {
            await x9t(e, n);
        }
        catch (w) {
            let D = E(w);
            if (D === "EISDIR" || D === "ENOTSUP" || D === "EPERM") {
                let F = await DWe(n);
                try {
                    await g(e, n);
                }
                catch (W) {
                    if (F !== void 0)
                        await A9t(n, { recursive: !0, force: !0 }).catch(() => { }), await II(F, n).catch(() => { });
                    throw W;
                }
            }
            else
                throw w;
        }
        await A9t(e, { recursive: !0, force: !0 });
        return;
    }
    throw h;
} }
async function DWe(e) { let n = `${e}.superseded-${Date.now()}`; try {
    await II(e, n);
}
catch (s) {
    if (U(s))
        return;
    throw s;
} let { isRetentionExemptionDisabled: r } = retention; if (!r()) {
    let s = new Date;
    await srr(n, s, s).catch((g) => { t(`relocateSessionTranscript: could not refresh the set-aside's mtime at ${n} (it ages from its old clock): ${g}`, { level: "warn" }); });
} return t(`relocateSessionTranscript: existing destination set aside at ${n}`, { level: "warn" }), n; }
async function Zwn(e, r) { let s = Xe(e); try {
    if (!(await G(s)).isDirectory())
        return { result: "not_a_directory", path: s, parent: j(s) };
}
catch (o) {
    if (!Ct(o))
        d(Object.assign(Error("cd: unexpected stat errno"), { code: E(o) }));
    return { result: "not_found", path: s };
} let n = s; try {
    n = await x(s);
}
catch {
    n = s;
} let l = xn(n); if (l === oe() && l === we())
    return { result: "same", directory: n }; let u = D({ requestedPath: s, canonicalPath: n }, r); if (u.result !== "allowed")
    return { result: "blocked_by_rule", directory: n, check: u }; return { result: "ok", directory: n }; }
return {relocate:Yze,validate:Zwn};
}

export function createCdValidation(deps) {
const {Xe,G,j,Ct,d,E,x,xn,oe,we,Ao,VDt,jd,lL,ike,H,At,Upt}=deps;
const M=a=>[...new Set(a)],b='Cd',Ee='/';
async function Zwn(e, r) { let s = Xe(e); try {
    if (!(await G(s)).isDirectory())
        return { result: "not_a_directory", path: s, parent: j(s) };
}
catch (o) {
    if (!Ct(o))
        d(Object.assign(Error("cd: unexpected stat errno"), { code: E(o) }));
    return { result: "not_found", path: s };
} let n = s; try {
    n = await x(s);
}
catch {
    n = s;
} let l = xn(n); if (l === oe() && l === we())
    return { result: "same", directory: n }; let u = D({ requestedPath: s, canonicalPath: n }, r); if (u.result !== "allowed")
    return { result: "blocked_by_rule", directory: n, check: u }; return { result: "ok", directory: n }; }
function D(e, r) { let s = M([...Ao(e.requestedPath), e.canonicalPath]), n = M([e.canonicalPath, VDt(e.canonicalPath)]), l = (o, m, h) => h.some((g) => B(o, m, g)); for (let o of jd(r)) {
    if (o.ruleValue.toolName !== b)
        continue;
    let m = o.ruleValue.ruleContent;
    if (m === void 0 || l(m, o.source, s))
        return { result: "blockedByRule", rule: o };
} let u = lL(r).filter((o) => o.ruleValue.toolName === b); if (u.length === 0)
    return { result: "allowed" }; for (let o of u) {
    let m = o.ruleValue.ruleContent;
    if (m === void 0 || l(m, o.source, n))
        return { result: "allowed" };
} return { result: "outsideAllowedPatterns", allowedPatterns: u.map((o) => o.ruleValue.ruleContent).filter((o) => o !== void 0) }; }
function B(e, r, s) { let { relativePattern: n, root: l } = cKe(e, r), u = ike(l ?? oe(), s); if (u === ".." || u.startsWith("../"))
    return !1; let o = n.replace(/\/{2,}/g, "/").replace(/^\//, "").replace(/\/$/, ""); return N(o).test(u); }
function N(e) { let r = "^"; for (let s = 0; s < e.length; s++) {
    let n = e[s];
    if (s === 0 && n === "*" && e[1] === "*" && e[2] === "/")
        r += "(?:.*/)?", s += 2;
    else if (n === "/" && e[s + 1] === "*" && e[s + 2] === "*")
        r += "(/.*)?", s += 2;
    else if (n === "*")
        if (e[s + 1] === "*")
            r += ".*", s++;
        else
            r += "[^/]+";
    else if ("\\^$.|?+()[]{}".includes(n))
        r += `\\${n}`;
    else
        r += n;
} return new RegExp(`${r}$`, "i"); }
function cKe(e, n) { return dct(e, i6n(n)); }
function dct(e, n) { if (H() === "windows" && (e.startsWith("~\\") || e.startsWith("\\") && e[1] !== "!" && e[1] !== "#"))
    e = e.replaceAll("\\", "/"); if (e.startsWith(`${Ee}${Ee}`)) {
    let s = e.slice(1);
    if (H() === "windows" && s.match(/^\/[a-z]\//i)) {
        let g = s[1]?.toUpperCase() ?? "C", h = s.slice(2), w = `${g}:\\`;
        return { relativePattern: h.startsWith("/") ? h : "/" + h, root: w };
    }
    return { relativePattern: s, root: Ee };
}
else if (H() === "windows" && e.match(/^[A-Za-z]:[/\\]/)) {
    let s = e[0].toUpperCase(), g = e.slice(2).replaceAll("\\", "/");
    return { relativePattern: g.startsWith("/") ? g : "/" + g, root: `${s}:\\` };
}
else if (e.startsWith(`~${Ee}`))
    return { relativePattern: e.slice(1), root: At().normalize("NFC") };
else if (e.startsWith(Ee))
    return { relativePattern: e, root: n }; let r = e; if (e.startsWith(`.${Ee}`))
    r = e.slice(2); return { relativePattern: r, root: null }; }
function i6n(e) { switch (e) {
    case "cliArg":
    case "command":
    case "session":
    case "toolsNarrowing":
    case "mcpServerPolicy":
    case "hostCredential": return Xe(we());
    case "userSettings":
    case "policySettings":
    case "projectSettings":
    case "localSettings":
    case "flagSettings": return Upt(e);
} }
return Zwn;
}

export function createCdCommand(deps) {
const {e,N,Zwn,me,pe,eEn,Tn,$7e,t,oe,II,G,K,qH,Ce,he,Ne,sIe,zGt,iWe}=deps;const m=()=>{},_=()=>{};
async function Qo(f, i, l) { let a = (l ?? "").trim(); if (!a)
    return e(N, { message: "Usage: /cd <path>", args: "", onDone: () => f("Usage: /cd <path>") }); let u = await Zwn(a, me(i)); switch (u.result) {
    case "not_found": {
        let o = `Couldn't find a directory at ${pe.bold(u.path)}.`;
        return e(N, { message: o, args: a, onDone: () => f(o) });
    }
    case "not_a_directory": {
        let o = `${pe.bold(u.path)} is not a directory. Did you mean ${pe.bold(u.parent)}?`;
        return e(N, { message: o, args: a, onDone: () => f(o) });
    }
    case "same": {
        let o = `Already in ${pe.bold(Tn(u.directory))}.`;
        return e(N, { message: o, args: a, onDone: () => f(o) });
    }
    case "blocked_by_rule": {
        let o = eEn(u.directory, u.check, pe.bold, { display: Tn });
        return e(N, { message: o, args: a, onDone: () => f(o) });
    }
    case "ok": break;
} let d = u.directory, p = async () => { let o; try {
    o = await $7e(i.session, d, "cd_command", { storageV5: i.storageV5 });
}
catch (y) {
    return t(`/cd relocate failed: ${y}`, { level: "error" }), f(`Couldn't move to ${pe.bold(Tn(d))} \u2014 the directory may no longer exist, or the session couldn't be moved. Staying in ${pe.bold(Tn(oe()))}.`), null;
} try {
    i.retireDepartedAdditionalDirectories?.(o.departedAdditionalDirectories);
}
catch (y) {
    t(`/cd: retiring the previous project's additional directories failed (continuing): ${y}`, { level: "error" });
} return { modelMessage: o.modelMessage, pending: await Ue(i), projectGrantsGated: o.projectGrantsGated, gatedNotice: o.gatedNotice }; }, c = async (o, y) => { if (await Ee(i), y?.persistFailed)
    m("mcp_project_approval_dialog", "mcp_approval_persist_failed");
else if (y)
    _("mcp_project_approval_dialog"); f(y?.persistFailed ? `Moved to ${pe.bold(Tn(d))}. One or more of your MCP server choices could not be saved (check permissions on .claude/settings.local.json) \u2014 you will be asked again next time.` : `Moved to ${pe.bold(Tn(d))}`, { display: "system", metaMessages: [o] }); }; if (II(d)) {
    let o = await p();
    if (o === null)
        return null;
    if (o.projectGrantsGated)
        return e(K, { outcome: o, onComplete: c });
    if (o.pending.pendingServers.length === 0)
        return await c(o.modelMessage), null;
    return e(G, { pending: o.pending, onComplete: (y) => void c(o.modelMessage, y) });
} let v = qH(Ce(d)), h; try {
    h = he(d);
}
catch (o) {
    t(`/cd: reading the target's project settings for the trust prompt failed: ${o}`, { level: "error" });
} return e(Ne, { directory: d, trustRoot: v != null && v !== Ce(d) ? v : void 0, disclosures: h, onConfirm: async () => (await sIe(d, i.storageV5).catch((o) => { t(`/cd: persisting trust failed: ${o}`, { level: "error" }); }), p()), onComplete: c, onCancel: () => { f(`Staying in ${pe.bold(Tn(oe()))}`); } }); }
async function Ue(f) { let i = { pendingServers: [], pluginServerNames: new Set }; try {
    let l = await zGt(f.storageV5);
    if (l.pendingServers.length > 0 && iWe().length > 0)
        return t("/cd: project MCP servers await approval but a settings file has errors; leaving them pending", { level: "warn" }), i;
    return l;
}
catch (l) {
    return t(`/cd: collecting the new directory's project MCP servers failed (continuing without approvals): ${l}`, { level: "error" }), i;
} }
async function Ee(f) { try {
    await f.reloadPlugins?.();
}
catch (i) {
    t(`/cd: refreshing plugins/MCP for the new directory failed (continuing): ${i}`, { level: "error" });
} }
return Qo;
}
