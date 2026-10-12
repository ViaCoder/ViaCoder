// Generated from verified npm 2.1.283 base declarations and the complete 2.1.287 merger.
// Complete upstream declarations retained; dependency and merger export names are host adapters.
export function createFocusProjection({findTool,stripAnsi,truncate,artifactToolName,artifactIsPublish}) {
const _n=findTool, wt=stripAnsi, re=truncate;
const M=a=>[...new Set(a)], B=(a,p)=>a.filter(p).length;
const lJ=/[\x00-\x08\x0E-\x1F\x7F-\x9F]/g;
const ht='Agent',Im='Task',kt='Edit',wn='Write',tc='NotebookEdit';
const XOe=new Set([kt,wn,tc]),cJo=artifactToolName,uJo=artifactIsPublish;
const s6t=new WeakMap(),o6t=new WeakMap(),dMe=new WeakMap();
const pYe='Background command ',kBt='Agent "',VUo='" finished';
const xu='task-notification',oA='status',BD='summary';
const Uu='(no content)',mD='No response requested.';
const owo=2,rwo=1,swo=8,SPt='narration',nwo=new TextDecoder('utf-8',{ignoreBOM:true});
const Vt=(s,c)=>s.split(c).length-1,zc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const Va=()=>({claim:()=>false}),d=()=>{};
const hEe=e=>typeof e.hookLabel==='string'&&e.hookLabel.length>0?e.hookLabel:undefined;
function ESr(e, n, r, s = !1, g = {}) { if (g.transcriptV2)
    return e; let h = [], b = g.keepAllText !== !0, w = 0; while (w < e.length) {
    let D = e[w];
    if (!y6t(D)) {
        h.push(D), w++;
        continue;
    }
    let F = w, W = 0, q = 0, ge = [];
    if (b)
        while (w < e.length) {
            let tt = e[w];
            if (tt.type !== "user")
                break;
            let _t = a6t(tt);
            if (_t === null)
                break;
            if (_t.kind === "agent")
                W += _t.count;
            else
                q += _t.count;
            ge.push(tt), w++;
        }
    if (ge.length === 0)
        h.push(D), w++;
    let ye = w;
    while (ye < e.length && !y6t(e[ye]))
        ye++;
    let ve = s && ye === e.length;
    if (ve) {
        let tt = ye - 1;
        while (tt >= w && k6t(e[tt]))
            tt--;
        let _t = tt >= w ? e[tt] : void 0;
        if (_t?.type === "assistant" && _t.message.stop_reason !== null && (zde(_t) || hje(_t)))
            ve = !1;
    }
    let Ee = -1;
    if (!ve) {
        for (let tt = ye - 1; tt >= w; tt--)
            if (zde(e[tt])) {
                Ee = tt;
                break;
            }
    }
    let xe = new Set;
    if (g.keepAllText === !0) {
        let tt = new Set;
        for (let _t = w; _t < ye; _t++) {
            let vt = e[_t];
            if (vt.type !== "user")
                continue;
            for (let Bt of vt.message.content)
                if (typeof Bt === "object" && Bt !== null && Bt.type === "tool_result" && Bt.is_error === !0)
                    tt.add(Bt.tool_use_id);
        }
        for (let _t = w; _t < ye; _t++) {
            let vt = e[_t];
            if (zde(vt)) {
                xe.add(_t);
                continue;
            }
            if (vt.type === "assistant") {
                let Bt = vt.message.content[0];
                if (Bt?.type === "tool_use" && tt.has(Bt.id))
                    xe.add(_t);
                continue;
            }
            if (vt.type !== "user")
                continue;
            for (let Bt of vt.message.content)
                if (typeof Bt === "object" && Bt !== null && Bt.type === "tool_result" && Bt.is_error === !0 && tt.has(Bt.tool_use_id)) {
                    xe.add(_t);
                    break;
                }
        }
    }
    let Pe = new Set, Me = new Set;
    for (let tt = ye - 1; !ve && tt >= w; tt--) {
        let _t = e[tt];
        if (_t.type !== "assistant")
            continue;
        let vt = _t.message.content[0];
        if (vt?.type !== "tool_use" || Me.has(vt.name))
            continue;
        if (Me.add(vt.name), _n(n, vt.name)?.briefStandalone) {
            Pe.add(tt);
            for (let Bt = tt + 1; Bt < ye; Bt++) {
                let St = e[Bt];
                if (St.type === "assistant")
                    break;
                if (St.type !== "user")
                    continue;
                let Rt = St.message.content[0];
                if (Rt?.type === "tool_result" && Rt.tool_use_id === vt.id) {
                    Pe.add(Bt);
                    break;
                }
            }
        }
    }
    let Ne = null, Fe = ye;
    if (ge.length > 0) {
        if (Ne = v6t(ge[0]), Ne.messages = [...ge], W > 0)
            Ne.agentCount = W;
        if (q > 0)
            Ne.bashCount = q;
        Fe = F;
    }
    let We = [], He = () => { if (Ne)
        We.push([Fe, Ne]), Ne = null, Fe = ye; }, ze = 0;
    for (let tt = w; tt < ye; tt++) {
        if (tt === Ee || xe.has(tt) || Pe.has(tt)) {
            if (g.keepAllText === !0 && (xe.has(tt) || tt === Ee) && zde(e[tt]))
                He();
            continue;
        }
        let _t = e[tt];
        if (_t.type === "system") {
            if (_t.subtype === "informational" && _t.level === "info")
                ze++;
            else if (_t.subtype === "stop_hook_summary" && hEe(_t) !== void 0)
                ;
            else
                Pe.add(tt);
            continue;
        }
        let vt = null;
        if (_t.type === "collapsed_read_search")
            vt = _t;
        else if (_t.type === "grouped_tool_use")
            vt = _6t(_t, _t.toolName, _t.messages.map((Bt) => Bt.message.content[0]?.input), n);
        else if (_t.type === "assistant") {
            let Bt = _t.message.content[0];
            if (Bt?.type === "tool_use")
                vt = _6t(_t, Bt.name, [Bt.input], n);
            else if (hje(_t))
                ze++;
            else if ((Bt?.type === "thinking" || Bt?.type === "redacted_thinking") && !SRt(_t))
                ze++;
        }
        else if (_t.type === "user") {
            if (Ne) {
                Ne.messages.push(_t);
                let Bt = _t.toolUseResult, St = Bt?.toolStats ?? (Bt?.status === "async_launched" && Bt.agentId ? r?.(Bt.agentId) : void 0);
                if (St) {
                    if (Ne.readCount += St.readCount, Ne.searchCount += St.searchCount, St.bashCount)
                        Ne.bashCount = (Ne.bashCount ?? 0) + St.bashCount;
                    if (St.editFileCount)
                        Ne.editFileCount = (Ne.editFileCount ?? 0) + St.editFileCount;
                    if (St.linesAdded)
                        Ne.linesAdded = (Ne.linesAdded ?? 0) + St.linesAdded;
                    if (St.linesRemoved)
                        Ne.linesRemoved = (Ne.linesRemoved ?? 0) + St.linesRemoved;
                    if (St.otherToolCount)
                        Ne.otherToolCount = (Ne.otherToolCount ?? 0) + St.otherToolCount;
                    if (St.frameCount)
                        Ne.frameCount = (Ne.frameCount ?? 0) + St.frameCount;
                }
            }
        }
        if (_t.type === "attachment")
            ze++;
        if (vt)
            if (Ne)
                NJo(Ne, vt);
            else
                Ne = { ...vt, messages: [...vt.messages] }, Fe = tt;
    }
    if (Ee !== -1)
        Pe.add(Ee);
    for (let tt of xe)
        Pe.add(tt);
    let mt = [...Pe].map((tt) => [tt, e[tt]]);
    He();
    for (let [tt, _t] of We) {
        if (_t.uuid = `brief-${_t.uuid}`, ve && g.keepAllText !== !0 && _t === We.at(-1)?.[1])
            _t.isLiveBriefTurn = !0;
        _t.hookCount = void 0, _t.hookTotalMs = void 0, _t.hookInfos = void 0, mt.push([tt, _t]);
    }
    mt.sort((tt, _t) => tt[0] - _t[0]);
    let Je = ve || g.keepAllText === !0 ? 0 : ye - w + ge.length - mt.length - ze;
    for (let [, tt] of mt)
        h.push(Je > 0 && tt.type === "system" && tt.subtype === "turn_duration" ? { ...tt, briefHiddenCount: Je } : tt);
    w = ye;
} return h; }
function y6t(e) { if (e.type === "user")
    return e.message.content[0]?.type !== "tool_result"; return _je(e); }
function _je(e) { if (e.type !== "attachment")
    return !1; let n = e.attachment; if (n.type !== "queued_command" || n.commandMode !== "prompt")
    return !1; let r = n.origin; if (!n.isMeta && Zy(r))
    return !0; if (r?.kind === "channel")
    return !0; if (r?.kind === "peer")
    return !0; if (r?.kind === "slack-ping")
    return !0; return !1; }
function a6t(e) { let n = s6t.get(e); if (n !== void 0)
    return { kind: "bash", count: n }; let r = i6t(e); if (r === null)
    return null; if (r.startsWith(pYe))
    return { kind: "bash", count: 1 }; if (r.startsWith(kBt) && r.endsWith(VUo))
    return { kind: "agent", count: 1 }; return null; }
function i6t(e) { let n = o6t.get(e); if (n === void 0)
    n = sJo(e), o6t.set(e, n); return n; }
function sJo(e) { if (e.type !== "user")
    return null; let n = e.message.content[0]; if (n?.type !== "text")
    return null; if (e.origin && e.origin.kind !== "task-notification")
    return null; let r = n.text.trimStart(); if (!r.startsWith(`<${xu}`))
    return null; let s = `</${xu}>`, g = r.indexOf(s); if (g === -1)
    return null; let h = r.slice(0, g + s.length); if (r.slice(h.length).trim() !== "")
    return null; if (Mr(h, oA) !== "completed")
    return null; let b = Mr(h, BD); if (b?.includes("<"))
    return null; return b; }
function k6t(e) { if (e.type === "assistant") {
    let n = e.message.content[0];
    if (n?.type === "thinking" || n?.type === "redacted_thinking")
        return !SRt(e);
} if (e.type === "attachment")
    return !0; if (e.type === "system")
    return !0; return !1; }
function zde(e) { if (e.type === "assistant") {
    let n = e.message.content[0];
    if (n?.type === "text" && n.text.trim().length > 0 && !S6t(n.text))
        return !0;
    if (SRt(e))
        return !0;
} return !1; }
function hje(e) { if (e.type !== "assistant")
    return !1; let n = e.message.content[0]; return n?.type === "text" && S6t(n.text); }
function S6t(e) { return e.trim() === Uu || e === mD; }
function v6t(e) { return { type: "collapsed_read_search", searchCount: 0, readCount: 0, listCount: 0, memorySearchCount: 0, memoryReadCount: 0, memoryWriteCount: 0, messages: [e], displayMessage: e, uuid: e.uuid, timestamp: e.timestamp }; }
function _6t(e, n, r, s) { let g = r.length, h = v6t(e); if (n === ht || n === Im) {
    h.agentCount = g;
    let w = r.flatMap((D) => { let F = D?.description; if (typeof F !== "string")
        return []; let W = re(fr(wt(F)), 300); return W !== "" ? [W] : []; });
    if (w.length > 0)
        h.agentDescriptions = w;
    return h;
} let b = _n(s, n); if (b?.isMcp) {
    if (h.mcpCallCount = g, b.mcpInfo?.serverName)
        h.mcpServerNames = [b.mcpInfo.serverName];
}
else if (XOe.has(n)) {
    h.editFileCount = g;
    let w = 0, D = 0;
    for (let F of r) {
        let W = MQt(n, F);
        w += W.added, D += W.removed;
    }
    if (w > 0)
        h.linesAdded = w;
    if (D > 0)
        h.linesRemoved = D;
}
else if (n === cJo) {
    let w = B(r, (D) => uJo?.(D) === !0);
    if (w > 0)
        h.frameCount = w;
    if (g - w > 0)
        h.otherToolCount = (h.otherToolCount ?? 0) + (g - w);
}
else
    h.otherToolCount = g; return h; }
function MQt(e, n) { if (typeof n !== "object" || n === null)
    return { added: 0, removed: 0 }; let r = n; if (e === kt) {
    if (Array.isArray(r.edits)) {
        let s = 0, g = 0;
        for (let h of r.edits)
            if (typeof h === "object" && h !== null) {
                let b = h;
                s += P0(b.new_string), g += P0(b.old_string);
            }
        return { added: s, removed: g };
    }
    return { added: P0(r.new_string), removed: P0(r.old_string) };
} if (e === wn)
    return { added: P0(r.content), removed: 0 }; if (e === tc)
    return { added: P0(r.new_source), removed: 0 }; return { added: 0, removed: 0 }; }
function P0(e) {
    return typeof e === "string" && e.length > 0 ? Vt(e, `
`) + 1 : 0;
}
function SRt(e) { if (e.type !== "assistant")
    return !1; return bRt(e.message.content[0]); }
function bRt(e) { if (e === void 0)
    return !1; return e.type === "thinking" && typeof e.thinking === "string" && typeof e.signature === "string" && Art(e); }
function Art(e) { return !!e.thinking?.trim() && Noe(e); }
function Noe(e) { try {
    if (e.type !== "thinking" || !e.signature)
        return !1;
    let n;
    if (dMe.has(e))
        n = dMe.get(e);
    else
        n = bPt(e.signature), dMe.set(e, n);
    return n === SPt;
}
catch (n) {
    if (Va().claim("narration_classifier_error"))
        d(n);
    return !1;
} }
function bPt(e) { let n; try {
    n = atob(e);
}
catch {
    return;
} let r = new Uint8Array(n.length); for (let h = 0; h < n.length; h++)
    r[h] = n.charCodeAt(h); let s = Loe(r, owo); if (s === void 0)
    return; let g = Loe(s, rwo); if (g === void 0)
    return; return yPt(g, swo); }
function Loe(e, n) { let r; return ySr(e, { onBytes(g, h) { if (g === n)
        r = h; } }) ? r : void 0; }
function yPt(e, n) { let r = Loe(e, n); return r === void 0 ? void 0 : nwo.decode(r); }
function ySr(e, n) { let r = 0; while (r < e.length) {
    let s = lMe(e, r);
    if (s === void 0)
        return !1;
    let g = s.value & 7, h = Math.floor(s.value / 8);
    switch (r = s.next, g) {
        case 0: {
            let b = lMe(e, r);
            if (b === void 0)
                return !1;
            r = b.next, n.onVarint?.(h, b.value);
            break;
        }
        case 1:
            if (r + 8 > e.length)
                return !1;
            r += 8;
            break;
        case 2: {
            let b = lMe(e, r);
            if (b === void 0 || b.value > e.length - b.next)
                return !1;
            r = b.next + b.value, n.onBytes?.(h, e.subarray(b.next, r));
            break;
        }
        case 5:
            if (r + 4 > e.length)
                return !1;
            r += 4;
            break;
        default: return !1;
    }
} return !0; }
function lMe(e, n) { let r = 0, s = 1; for (let g = 0; g < 10; g++) {
    let h = n + g;
    if (h >= e.length)
        return;
    let b = e[h];
    if (r += (b & 127) * s, (b & 128) === 0)
        return { value: r, next: h + 1 };
    s *= 128;
} return; }
function bmo(e) { for (let n = e.length - 1; n >= 0; n--) {
    let r = e[n];
    if (r.type === "assistant") {
        if (r.message.content.some((s) => s.type === "tool_use"))
            return !0;
    }
    else if (r.type === "user") {
        let s = r.message.content;
        if (!(Array.isArray(s) && s.some((h) => h.type === "tool_result")) && !r.isMeta)
            return !1;
    }
    else if (r.type === "attachment" && _je(r))
        return !1;
} return !1; }
function Zy(e) { return e === void 0 || e.kind === "human" || e.kind === "auto-continuation"; }
function Mr(l, i) { if (!l.trim() || !i.trim())
    return null; let n = zc(i), x = new RegExp(`<${n}(?:\\s+[^>]*)?>([\\s\\S]*?)<\\/${n}>`, "gi"), e, t = 0, s = 0, c = new RegExp(`<${n}(?:\\s+[^>]*?)?>`, "gi"), r = new RegExp(`<\\/${n}>`, "gi"); while ((e = x.exec(l)) !== null) {
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
function fr(t) { return t.replace(lJ, "").replace(/\s+/g, " ").trim(); }
function NJo(e, n) { if (e.searchCount += n.searchCount, e.readCount += n.readCount, e.listCount += n.listCount, e.memorySearchCount += n.memorySearchCount, e.memoryReadCount += n.memoryReadCount, e.memoryWriteCount += n.memoryWriteCount, n.teamMemorySearchCount)
    e.teamMemorySearchCount = (e.teamMemorySearchCount ?? 0) + n.teamMemorySearchCount; if (n.teamMemoryReadCount)
    e.teamMemoryReadCount = (e.teamMemoryReadCount ?? 0) + n.teamMemoryReadCount; if (n.teamMemoryWriteCount)
    e.teamMemoryWriteCount = (e.teamMemoryWriteCount ?? 0) + n.teamMemoryWriteCount; if (n.accountMemoryReadKeys?.length)
    e.accountMemoryReadKeys = M([...e.accountMemoryReadKeys ?? [], ...n.accountMemoryReadKeys]); if (n.accountMemorySearchCount)
    e.accountMemorySearchCount = (e.accountMemorySearchCount ?? 0) + n.accountMemorySearchCount; if (n.accountMemoryRecalls?.length)
    e.accountMemoryRecalls = [...e.accountMemoryRecalls ?? [], ...n.accountMemoryRecalls]; if (n.scratchpadWriteCount)
    e.scratchpadWriteCount = (e.scratchpadWriteCount ?? 0) + n.scratchpadWriteCount, e.scratchpadLinesAdded = (e.scratchpadLinesAdded ?? 0) + (n.scratchpadLinesAdded ?? 0), e.scratchpadLinesRemoved = (e.scratchpadLinesRemoved ?? 0) + (n.scratchpadLinesRemoved ?? 0); if (n.workshopWriteCount)
    e.workshopWriteCount = (e.workshopWriteCount ?? 0) + n.workshopWriteCount, e.workshopLinesAdded = (e.workshopLinesAdded ?? 0) + (n.workshopLinesAdded ?? 0), e.workshopLinesRemoved = (e.workshopLinesRemoved ?? 0) + (n.workshopLinesRemoved ?? 0); if (n.relevantMemories?.length)
    e.relevantMemories = [...e.relevantMemories ?? [], ...n.relevantMemories]; if (n.mcpCallCount)
    e.mcpCallCount = (e.mcpCallCount ?? 0) + n.mcpCallCount, e.mcpServerNames = M([...e.mcpServerNames ?? [], ...n.mcpServerNames ?? []]); if (n.bashCount)
    e.bashCount = (e.bashCount ?? 0) + n.bashCount; if (n.gitOpBashCount)
    e.gitOpBashCount = (e.gitOpBashCount ?? 0) + n.gitOpBashCount; if (n.otherToolCount)
    e.otherToolCount = (e.otherToolCount ?? 0) + n.otherToolCount; if (n.agentCount) {
    if (e.agentCount = (e.agentCount ?? 0) + n.agentCount, n.agentDescriptions)
        e.agentDescriptions = [...e.agentDescriptions ?? [], ...n.agentDescriptions];
} if (n.frameCount)
    e.frameCount = (e.frameCount ?? 0) + n.frameCount; if (n.editFileCount)
    e.editFileCount = (e.editFileCount ?? 0) + n.editFileCount; if (n.linesAdded)
    e.linesAdded = (e.linesAdded ?? 0) + n.linesAdded; if (n.linesRemoved)
    e.linesRemoved = (e.linesRemoved ?? 0) + n.linesRemoved; if (n.commits?.length)
    e.commits = [...e.commits ?? [], ...n.commits]; if (n.pushes?.length)
    e.pushes = [...e.pushes ?? [], ...n.pushes]; if (n.branches?.length)
    e.branches = [...e.branches ?? [], ...n.branches]; if (n.prs?.length)
    e.prs = [...e.prs ?? [], ...n.prs]; if (n.readFilePaths?.length)
    e.readFilePaths = [...e.readFilePaths ?? [], ...n.readFilePaths]; if (n.searchArgs?.length)
    e.searchArgs = [...e.searchArgs ?? [], ...n.searchArgs]; if (n.hookCount)
    e.hookCount = (e.hookCount ?? 0) + n.hookCount, e.hookTotalMs = (e.hookTotalMs ?? 0) + (n.hookTotalMs ?? 0), e.hookInfos = [...e.hookInfos ?? [], ...n.hookInfos ?? []]; if (e.latestDisplayHint = n.latestDisplayHint ?? e.latestDisplayHint, n.thoughtForMs)
    e.thoughtForMs = (e.thoughtForMs ?? 0) + n.thoughtForMs; e.latestThinkingSummary = n.latestThinkingSummary ?? e.latestThinkingSummary, e.messages.push(...n.messages); }
return {project:ESr,hasWork:bmo};
}
