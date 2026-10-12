// Fixed 2.1.287 full stateless closures; generated from hash-pinned raw. No business owner allocation.
export function createOrdinaryExit287(read,host){
const made=Object.create(null);
function dependency(file,name){if(name==='Kn'&&file==='chunk-mphp7acd.js')return host.shutdown;if(name==='vT'&&file==='chunk-bn3p37gv.js')return host.projectSetter;if(name==='T_t'&&file==='chunk-nankzm0s.js')return value=>host.worktreeState().setCurrentSession(value);if(name==='jEt'&&file==='chunk-f2cpzzp9.js'&&host.ExitFlow)return host.ExitFlow;return made[file]&&Object.hasOwn(made[file],name)?made[file][name]:read(file,name)}
function build0(){
const mapping={"w":{"local":"w","imported":"w","module":"chunk-bgj860b4.js"},"Te":{"local":"Te","imported":"Te","module":"chunk-038c023k.js"},"g":{"local":"g","imported":"g","module":"chunk-1y575bx8.js"},"A":{"local":"A","imported":"A","module":"chunk-1y575bx8.js"},"ZCt":{"local":"ZCt","imported":"ZCt","module":"chunk-spmb4s4c.js"},"e":{"local":"e","imported":"e","module":"chunk-ysm7k028.js"},"Ont":{"local":"Ont","imported":"Ont","module":"chunk-5jq5v243.js"},"I":{"local":"I","imported":"I","module":"chunk-eske5nfz.js"},"r":{"local":"r","imported":"r","module":"chunk-ysm7k028.js"},"n":{"local":"n","imported":"n","module":"chunk-jkt292h5.js"},"b":{"local":"b","imported":"b","module":"chunk-870yz02b.js"},"be":{"local":"be","imported":"be","module":"chunk-134t0awf.js"},"j":{"local":"j","imported":"j","module":"chunk-vbsw5qhh.js"},"eo":{"local":"eo","imported":"eo","module":"chunk-wyp8fh9r.js"},"jL":{"local":"jL","imported":"jL","module":"chunk-1x5y5a12.js"},"Pt":{"local":"Pt","imported":"Pt","module":"chunk-nankzm0s.js"},"zY":{"local":"zY","imported":"zY","module":"chunk-f2cpzzp9.js"},"Uc":{"local":"Uc","imported":"Uc","module":"chunk-nankzm0s.js"},"ego":{"local":"ego","imported":"ego","module":"chunk-f10wcx31.js"},"jEt":{"local":"jEt","imported":"jEt","module":"chunk-f2cpzzp9.js"},"OB":{"local":"OB","imported":"OB","module":"chunk-099w45zp.js"},"qee":{"local":"qee","imported":"qee","module":"chunk-djhbc0y7.js"},"q":{"local":"q","imported":"q","module":"chunk-bn3p37gv.js"},"Aae":{"local":"Aae","imported":"Aae","module":"chunk-ff8yrzyn.js"},"jP":{"local":"jP","imported":"jP","module":"chunk-scey49m3.js"},"pue":{"local":"pue","imported":"pue","module":"chunk-scey49m3.js"}};
const ports=new Proxy(Object.create(null),{get:(_,name)=>{const p=mapping[name];if(!p)throw Error('Missing original dependency '+String(name));return dependency(p.module,p.imported)}});
const bridge={get WorktreeExitDialog(){return host.WorktreeExitDialog??made['chunk-f2cpzzp9.js'].vX},requireOriginal287(spec){if(spec!=='/$bunfs/root/chunk-waq70p5c.js')throw Error('Unknown session namespace '+spec);return host.storage}};
function Z() { }
function x(d) { let i = (0, ports["w"])(26), { sessionDrafts: o, messages: p, renderExitFlow: s, onExit: t } = d, { storageV5: m } = (0, ports["Te"])(), [f, h] = (0, ports["g"])("nudge"), [y, T] = (0, ports["g"])(null), L = (0, ports["A"])(!1), W; if (i[0] !== o || i[1] !== m)
    W = async function E() { for (const oe of o)
        await (0, ports["ZCt"])(oe, "exit_nudge", m).catch(Z); }, i[0] = o, i[1] = m, i[2] = W;
else
    W = i[2]; let E = W, _; if (i[3] !== t || i[4] !== s)
    _ = function v() { if (s)
        T(s());
    else
        t(); }, i[3] = t, i[4] = s, i[5] = _;
else
    _ = i[5]; let v = _, K; if (i[6] !== E || i[7] !== y || i[8] !== t || i[9] !== s || i[10] !== f)
    K = function D(l) { if (f !== "nudge" || y || l.ctrl || l.meta) {
        return;
    } if (L.current) {
        l.preventDefault();
        return;
    } if (l.key === "return")
        l.preventDefault(), h("panel");
    else if (l.key === "escape") {
        if (l.preventDefault(), L.current = !0, s)
            T(s(E));
        else
            (async () => { await E(), t(); })();
    } }, i[6] = E, i[7] = y, i[8] = t, i[9] = s, i[10] = f, i[11] = K;
else
    K = i[11]; let D = K; if (y) {
    return y;
} if (f === "panel") {
    let u;
    if (i[12] !== v)
        u = () => v(), i[12] = v, i[13] = u;
    else
        u = i[13];
    let c;
    if (i[14] !== p || i[15] !== u)
        c = (0, ports["e"])((0, ports["Ont"]), { messages: p, onDone: u }), i[14] = p, i[15] = u, i[16] = c;
    else
        c = i[16];
    return c;
} const u = o.length; let c; if (i[17] !== o.length)
    c = (0, ports["I"])(o.length, "feedback draft"), i[17] = o.length, i[18] = c;
else
    c = i[18]; let S; if (i[19] !== o.length || i[20] !== c)
    S = (0, ports["r"])((0, ports["n"]), { children: ["You have ", u, " unsent", " ", c] }), i[19] = o.length, i[20] = c, i[21] = S;
else
    S = i[21]; let O; if (i[22] === (0, ports["b"]))
    O = (0, ports["e"])((0, ports["n"]), { dimColor: !0, children: (0, ports["r"])((0, ports["be"]), { children: [(0, ports["e"])((0, ports["j"]), { chord: "enter", action: "review & send" }), (0, ports["e"])((0, ports["j"]), { chord: "esc", action: "discard and exit" })] }) }), i[22] = O;
else
    O = i[22]; let J; if (i[23] !== D || i[24] !== S)
    J = (0, ports["r"])((0, ports["eo"]), { onKeyDown: D, children: [S, O] }), i[23] = D, i[24] = S, i[25] = J;
else
    J = i[25]; return J; }
var ee = ["Goodbye!", "See ya!", "Bye!", "Catch you later!"];
function P() { return (0, ports["jL"])(ee) ?? "Goodbye!"; }
async function Ne(d, o) { if ((0, ports["Pt"])())
    return d(), (0, ports["zY"])(), null; let p = (0, ports["Uc"])() !== null, s = (0, ports["ego"])(), t = p || s.length > 0 ? (m) => (0, ports["e"])((0, ports["jEt"]), { showWorktree: p, backgroundItems: s, messages: o.messages, isMidTurn: o.isMidTurn, getMessages: o.getMessages, getIsResponseStreaming: o.getIsResponseStreaming, onDone: d, onCancel: () => d(), onBeforeExit: m }) : null; if ((0, ports["OB"])()) {
    let { queued: m } = await (0, ports["qee"])({ lightweight: !0 }, o.storageV5).catch(() => ({ queued: [], expired: [] })), f = m.filter((h) => h.source_session_id === (0, ports["q"])());
    if (f.length > 0)
        return (0, ports["e"])(x, { sessionDrafts: f, messages: [...o.messages], renderExitFlow: t, onExit: () => { d(P()), (0, ports["Aae"])((0, ports["jP"])(o), { responseStreaming: (0, ports["pue"])(o) }, o.storageV5); } });
} if (t)
    return t(); return d(P()), await (0, ports["Aae"])((0, ports["jP"])(o), { responseStreaming: (0, ports["pue"])(o) }, o.storageV5), null; }
return {Z,x,ee,P,Ne};
}
function build1(){
const mapping={"BS":{"local":"BS","imported":"BS","module":"chunk-bn3p37gv.js"},"vo":{"local":"vo","imported":"vo","module":"chunk-m59srz4k.js"},"FC":{"local":"FC","imported":"FC","module":"chunk-fqd1ykkc.js"},"$2":{"local":"$2","imported":"$2","module":"chunk-fqd1ykkc.js"},"jft":{"local":"jft","imported":"jft","module":"chunk-fqd1ykkc.js"},"Jt":{"local":"Jt","imported":"Jt","module":"chunk-m59srz4k.js"},"Lpt":{"local":"Lpt","imported":"Lpt","module":"chunk-1jqp49rh.js"},"uKn":{"local":"uKn","imported":"uKn","module":"chunk-w7hy7pqe.js"}};
const ports=new Proxy(Object.create(null),{get:(_,name)=>{const p=mapping[name];if(!p)throw Error('Missing original dependency '+String(name));return dependency(p.module,p.imported)}});
const bridge={get WorktreeExitDialog(){return host.WorktreeExitDialog??made['chunk-f2cpzzp9.js'].vX},requireOriginal287(spec){if(spec!=='/$bunfs/root/chunk-waq70p5c.js')throw Error('Unknown session namespace '+spec);return host.storage}};
var u = 50;
function l(e) { let n = []; for (let o of (0, ports["BS"])()) {
    if (e && !e(o))
        continue;
    n.push({ label: "scheduled task", detail: `${f(o)} \xB7 ${(0, ports["vo"])(o.prompt, u, !0)}` });
} return n; }
function f(e) { if (e.recurring)
    return (0, ports["FC"])(e.cron); let n = (0, ports["$2"])(e.cron), o = n && (0, ports["jft"])(n, new Date(e.createdAt)); if (!o)
    return (0, ports["FC"])(e.cron); let t = Math.max(0, o.getTime() - Date.now()); return `Runs once in ${(0, ports["Jt"])(t, { mostSignificantOnly: !0 })}`; }
var g = { agent: "subagent", workflow: "workflow", shell: "shell", monitor: "monitor", mcp: "MCP task" };
function ego() { let e = (0, ports["Lpt"])(), { items: n, kinds: o } = e, t = []; for (let r of n) {
    if (r.kind === "todo" || r.doneAt !== void 0)
        continue;
    t.push({ label: g[r.kind], detail: (0, ports["vo"])(r.label, u, !0) });
} if (o.includes("auto_mode_scan"))
    t.push({ label: (0, ports["uKn"]).auto_mode_scan, detail: "environment scan for /auto-mode-setup" }); if (o.includes("local_memory_import"))
    t.push({ label: (0, ports["uKn"]).local_memory_import, detail: "still reading local memory notes; running the command again later continues it" }); return t.push(...l()), t; }
return {u,l,f,g,ego};
}
function build2(){
const mapping={"jL":{"local":"jL","imported":"jL","module":"chunk-1x5y5a12.js"},"w":{"local":"w","imported":"w","module":"chunk-bgj860b4.js"},"Te":{"local":"Te","imported":"Te","module":"chunk-038c023k.js"},"g":{"local":"g","imported":"g","module":"chunk-1y575bx8.js"},"un":{"local":"un","imported":"un","module":"chunk-870yz02b.js"},"Aae":{"local":"Aae","imported":"Aae","module":"chunk-ff8yrzyn.js"},"Kn":{"local":"Kn","imported":"Kn","module":"chunk-mphp7acd.js"},"e":{"local":"e","imported":"e","module":"chunk-ysm7k028.js"},"b":{"local":"b","imported":"b","module":"chunk-870yz02b.js"},"h$":{"local":"h$","imported":"h$","module":"chunk-q80zaav8.js"},"ypo":{"local":"ypo","imported":"homedir","module":"os"},"zf":{"local":"zf","imported":"zf","module":"chunk-q80zaav8.js"},"Rf":{"local":"Rf","imported":"Rf","module":"chunk-mphp7acd.js"},"hpo":{"local":"hpo","imported":"dirname","module":"path"},"t":{"local":"t","imported":"t","module":"chunk-q80zaav8.js"},"RCe":{"local":"RCe","imported":"RCe","module":"chunk-s6vr35c0.js"},"DMe":{"local":"DMe","imported":"DMe","module":"chunk-s6vr35c0.js"},"JVe":{"local":"JVe","imported":"JVe","module":"chunk-s6vr35c0.js"},"oB":{"local":"oB","imported":"oB","module":"chunk-x954y317.js"},"vT":{"local":"vT","imported":"vT","module":"chunk-bn3p37gv.js"},"Kl":{"local":"Kl","imported":"Kl","module":"chunk-epk29mef.js"},"X_":{"local":"X_","imported":"X_","module":"chunk-epk29mef.js"},"hne":{"local":"hne","imported":"hne","module":"chunk-mphp7acd.js"},"Uc":{"local":"Uc","imported":"Uc","module":"chunk-nankzm0s.js"},"LTe":{"local":"LTe","imported":"LTe","module":"chunk-mphp7acd.js"},"i":{"local":"i","imported":"i","module":"chunk-6hnyhakg.js"},"S":{"local":"S","imported":"S","module":"chunk-n4qghq20.js"},"a":{"local":"a","imported":"a","module":"chunk-mbfze585.js"},"A":{"local":"A","imported":"A","module":"chunk-1y575bx8.js"},"_r":{"local":"_r","imported":"_r","module":"chunk-k01ybgd6.js"},"Sye":{"local":"Sye","imported":"Sye","module":"chunk-mphp7acd.js"},"lt":{"local":"lt","imported":"lt","module":"chunk-f2n7vgt8.js"},"vGn":{"local":"vGn","imported":"vGn","module":"chunk-mphp7acd.js"},"Gq":{"local":"Gq","imported":"Gq","module":"chunk-sr35ha4n.js"},"Je":{"local":"Je","imported":"Je","module":"chunk-fmv8bhm3.js"},"vt":{"local":"vt","imported":"vt","module":"chunk-2ynta9xc.js"},"yn":{"local":"yn","imported":"yn","module":"chunk-fmv8bhm3.js"},"LK":{"local":"LK","imported":"LK","module":"chunk-fmv8bhm3.js"},"bl":{"local":"bl","imported":"bl","module":"chunk-sr35ha4n.js"},"Jet":{"local":"Jet","imported":"lstat","module":"fs/promises"},"W":{"local":"W","imported":"W","module":"chunk-c9me9cp7.js"},"LS":{"local":"LS","imported":"LS","module":"chunk-2ynta9xc.js"},"Xet":{"local":"Xet","imported":"realpath","module":"fs/promises"},"lq":{"local":"lq","imported":"lq","module":"chunk-mphp7acd.js"},"Q3":{"local":"Q3","imported":"Q3","module":"chunk-nankzm0s.js"},"Nde":{"local":"Nde","imported":"Nde","module":"chunk-5rt0fp4b.js"},"Wq":{"local":"Wq","imported":"Wq","module":"chunk-5rt0fp4b.js"},"_J":{"local":"_J","imported":"_J","module":"chunk-5rt0fp4b.js"},"R":{"local":"R","imported":"R","module":"chunk-1y575bx8.js"},"r":{"local":"r","imported":"r","module":"chunk-ysm7k028.js"},"s":{"local":"s","imported":"s","module":"chunk-jkt292h5.js"},"Ns":{"local":"Ns","imported":"Ns","module":"chunk-f3vd025c.js"},"n":{"local":"n","imported":"n","module":"chunk-jkt292h5.js"},"$e":{"local":"$e","imported":"$e","module":"chunk-6zne1pwx.js"},"he":{"local":"he","imported":"he","module":"chunk-0smna178.js"},"Tr":{"local":"Tr","imported":"Tr","module":"chunk-t1n6x7q0.js"},"Wy":{"local":"Wy","imported":"Wy","module":"chunk-2nsxx5x8.js"},"Gu":{"local":"Gu","imported":"Gu","module":"chunk-8x0q3rtr.js"},"m":{"local":"m","imported":"m","module":"chunk-9d2ykxmy.js"},"Jz":{"local":"Jz","imported":"Jz","module":"chunk-87dncfz9.js"},"yDe":{"local":"yDe","imported":"yDe","module":"chunk-87dncfz9.js"},"EMe":{"local":"EMe","imported":"EMe","module":"chunk-f10wcx31.js"},"di":{"local":"di","imported":"di","module":"chunk-hrhfcbdv.js"},"hDe":{"local":"hDe","imported":"hDe","module":"chunk-87dncfz9.js"},"MW":{"local":"MW","imported":"MW","module":"chunk-87dncfz9.js"},"Eve":{"local":"Eve","imported":"Eve","module":"chunk-87dncfz9.js"},"dne":{"local":"dne","imported":"dne","module":"chunk-mphp7acd.js"},"tte":{"local":"tte","imported":"tte","module":"chunk-5q0db342.js"},"y":{"local":"y","imported":"y","module":"chunk-9d2ykxmy.js"},"oDe":{"local":"oDe","imported":"oDe","module":"chunk-z75es3hd.js"},"JS":{"local":"JS","imported":"JS","module":"chunk-b60bqfbx.js"},"Pt":{"local":"Pt","imported":"Pt","module":"chunk-nankzm0s.js"},"Ha":{"local":"Ha","imported":"Ha","module":"chunk-mphp7acd.js"},"vge":{"local":"vge","imported":"vge","module":"chunk-f10wcx31.js"},"ve":{"local":"ve","imported":"ve","module":"chunk-sfx0zagn.js"},"Yo":{"local":"Yo","imported":"Yo","module":"chunk-wmm2e4zt.js"},"Xa":{"local":"Xa","imported":"Xa","module":"chunk-wmm2e4zt.js"},"sx":{"local":"sx","imported":"sx","module":"chunk-qravq5t1.js"},"ph":{"local":"ph","imported":"ph","module":"chunk-168jtmbg.js"},"tM":{"local":"tM","imported":"tM","module":"chunk-mphp7acd.js"},"re":{"local":"re","imported":"re","module":"chunk-eske5nfz.js"},"IA":{"local":"IA","imported":"IA","module":"chunk-mphp7acd.js"},"yh":{"local":"yh","imported":"yh","module":"chunk-mphp7acd.js"},"KM":{"local":"KM","imported":"KM","module":"chunk-xep95vq1.js"},"yf":{"local":"yf","imported":"yf","module":"chunk-amhtwhch.js"},"xf":{"local":"xf","imported":"xf","module":"chunk-mphp7acd.js"},"q":{"local":"q","imported":"q","module":"chunk-bn3p37gv.js"},"fq":{"local":"fq","imported":"fq","module":"chunk-mphp7acd.js"},"qv":{"local":"qv","imported":"qv","module":"chunk-nankzm0s.js"},"kFe":{"local":"kFe","imported":"kFe","module":"chunk-mphp7acd.js"},"D1":{"local":"D1","imported":"D1","module":"chunk-m6stxthx.js"},"g8t":{"local":"g8t","imported":"g8t","module":"chunk-87dncfz9.js"},"uCe":{"local":"uCe","imported":"randomUUID","module":"crypto"},"p":{"local":"p","imported":"p","module":"chunk-9d2ykxmy.js"},"fV":{"local":"fV","imported":"fV","module":"chunk-ff8yrzyn.js"},"cpr":{"local":"cpr","imported":"cpr","module":"chunk-87dncfz9.js"},"VCe":{"local":"VCe","imported":"VCe","module":"chunk-4ggapckt.js"},"b8t":{"local":"b8t","imported":"b8t","module":"chunk-87dncfz9.js"},"bX":{"local":"bX","imported":"bX","module":"chunk-ff8yrzyn.js"},"I":{"local":"I","imported":"I","module":"chunk-eske5nfz.js"},"Lr":{"local":"Lr","imported":"Lr","module":"chunk-1jqp49rh.js"},"F":{"local":"F","imported":"F","module":"chunk-ky674g9x.js"},"pCe":{"local":"pCe","imported":"mkdir","module":"fs/promises"},"eze":{"local":"eze","imported":"eze","module":"chunk-87dncfz9.js"},"Dt":{"local":"Dt","imported":"Dt","module":"chunk-f2n7vgt8.js"},"Tv":{"local":"Tv","imported":"Tv","module":"chunk-1jqp49rh.js"},"l":{"local":"l","imported":"l","module":"chunk-c9me9cp7.js"},"Ea":{"local":"Ea","imported":"Ea","module":"chunk-ke6n6sdy.js"},"QU":{"local":"QU","imported":"QU","module":"chunk-bn3p37gv.js"},"ks":{"local":"ks","imported":"ks","module":"chunk-q80zaav8.js"},"Ar":{"local":"Ar","imported":"Ar","module":"chunk-eske5nfz.js"},"pT":{"local":"pT","imported":"pT","module":"chunk-hrhfcbdv.js"},"DFr":{"local":"DFr","imported":"DFr","module":"chunk-1jqp49rh.js"},"HXe":{"local":"HXe","imported":"HXe","module":"chunk-5rsp1jx3.js"},"lpn":{"local":"lpn","imported":"lpn","module":"chunk-1jqp49rh.js"},"MFr":{"local":"MFr","imported":"MFr","module":"chunk-1jqp49rh.js"},"e9":{"local":"e9","imported":"e9","module":"chunk-1jqp49rh.js"},"cW":{"local":"cW","imported":"cW","module":"chunk-2ynta9xc.js"},"Ee":{"local":"Ee","imported":"Ee","module":"chunk-bn3p37gv.js"},"bs":{"local":"bs","imported":"bs","module":"chunk-2ynta9xc.js"},"lr":{"local":"lr","imported":"lr","module":"chunk-2ynta9xc.js"},"tt":{"local":"tt","imported":"tt","module":"chunk-f1vb7bx7.js"},"PGn":{"local":"PGn","imported":"PGn","module":"chunk-mphp7acd.js"},"b$":{"local":"b$","imported":"b$","module":"chunk-bn3p37gv.js"},"vE":{"local":"vE","imported":"vE","module":"chunk-mphp7acd.js"},"cdt":{"local":"cdt","imported":"cdt","module":"chunk-mphp7acd.js"},"$$":{"local":"$$","imported":"$$","module":"chunk-ff8yrzyn.js"},"Nu":{"local":"Nu","imported":"Nu","module":"chunk-mphp7acd.js"},"c":{"local":"c","imported":"c","module":"chunk-n4qghq20.js"},"k0":{"local":"k0","imported":"k0","module":"chunk-5dn0d281.js"},"tn":{"local":"tn","imported":"tn","module":"chunk-yptq0vrd.js"},"_v":{"local":"_v","imported":"_v","module":"chunk-mphp7acd.js"},"zD":{"local":"zD","imported":"zD","module":"chunk-mphp7acd.js"},"vMe":{"local":"vMe","imported":"vMe","module":"chunk-ff8yrzyn.js"},"ln":{"local":"ln","imported":"ln","module":"chunk-mphp7acd.js"},"TGn":{"local":"TGn","imported":"TGn","module":"chunk-mphp7acd.js"},"e4":{"local":"e4","imported":"e4","module":"chunk-bn3p37gv.js"},"LLo":{"local":"LLo","imported":"LLo","module":"chunk-1jqp49rh.js"},"NLo":{"local":"NLo","imported":"NLo","module":"chunk-1jqp49rh.js"},"sxt":{"local":"sxt","imported":"sxt","module":"chunk-vnjpgehp.js"},"Rw":{"local":"Rw","imported":"Rw","module":"chunk-1jqp49rh.js"},"LFr":{"local":"LFr","imported":"LFr","module":"chunk-1jqp49rh.js"},"y4":{"local":"y4","imported":"y4","module":"chunk-z75es3hd.js"},"hA":{"local":"hA","imported":"hA","module":"chunk-bn3p37gv.js"},"dee":{"local":"dee","imported":"dee","module":"chunk-bn3p37gv.js"},"Fr":{"local":"Fr","imported":"Fr","module":"chunk-1jqp49rh.js"},"YDt":{"local":"YDt","imported":"YDt","module":"chunk-mphp7acd.js"},"T_t":{"local":"T_t","imported":"T_t","module":"chunk-nankzm0s.js"},"rRt":{"local":"rRt","imported":"rRt","module":"chunk-0cb4je7a.js"},"ai":{"local":"ai","imported":"ai","module":"chunk-mphp7acd.js"},"n9":{"local":"n9","imported":"n9","module":"chunk-1jqp49rh.js"},"_t":{"local":"_t","imported":"_t","module":"chunk-q80zaav8.js"},"Ir":{"local":"Ir","imported":"Ir","module":"chunk-wb5qh1pz.js"},"Kk":{"local":"Kk","imported":"Kk","module":"chunk-mky26gaw.js"},"yCe":{"local":"yCe","imported":"join","module":"path"},"oKr":{"local":"oKr","imported":"oKr","module":"chunk-nankzm0s.js"},"wm":{"local":"wm","imported":"wm","module":"chunk-fft5zm4p.js"},"Xn":{"local":"Xn","imported":"Xn","module":"chunk-2z86j2rq.js"},"De":{"local":"De","imported":"De","module":"chunk-2z86j2rq.js"},"P":{"local":"P","imported":"P","module":"chunk-c9me9cp7.js"},"it":{"local":"it","imported":"it","module":"chunk-eetz002h.js"},"hCe":{"local":"hCe","imported":"dirname","module":"path"},"mCe":{"local":"mCe","imported":"copyFile","module":"fs/promises"},"vat":{"local":"vat","imported":"appendFile","module":"fs/promises"},"_":{"local":"_","imported":"_","module":"chunk-q80zaav8.js"},"gCe":{"local":"gCe","imported":"rm","module":"fs/promises"},"ul":{"local":"ul","imported":"ul","module":"chunk-1jqp49rh.js"},"O_e":{"local":"O_e","imported":"O_e","module":"chunk-h6pgq4vr.js"},"$9t":{"local":"$9t","imported":"$9t","module":"chunk-z75es3hd.js"},"d":{"local":"d","imported":"d","module":"chunk-amhtwhch.js"},"OC":{"local":"OC","imported":"OC","module":"chunk-mphp7acd.js"},"YLo":{"local":"YLo","imported":"YLo","module":"chunk-0rn4hgq0.js"}};
const ports=new Proxy(Object.create(null),{get:(_,name)=>{const p=mapping[name];if(!p)throw Error('Missing original dependency '+String(name));return dependency(p.module,p.imported)}});
const bridge={get WorktreeExitDialog(){return host.WorktreeExitDialog??made['chunk-f2cpzzp9.js'].vX},requireOriginal287(spec){if(spec!=='/$bunfs/root/chunk-waq70p5c.js')throw Error('Unknown session namespace '+spec);return host.storage}};
var fat = /^(.*\S) \((\d{1,6})\)$/;
var gat = 1500;
function Twe(h) { let v = fat.exec(h); return v ? { base: v[1], generation: Number(v[2]) } : { base: h, generation: 1 }; }
function hat(h, v) { let D = (0, ports["Ir"])(h), { base: N } = Twe(h), X = (0, ports["Ir"])(N), Se = new Set, _e = 1; for (let Ie of v) {
    Se.add((0, ports["Ir"])(Ie));
    let Oe = Twe(Ie);
    if ((0, ports["Ir"])(Oe.base) === X)
        _e = Math.max(_e, Oe.generation);
} if (!Se.has(D))
    return h; let Pe = (0, ports["ks"])((0, ports["Ar"])(N)); for (let Ie = _e + 1;; Ie++) {
    let Oe = ` (${Ie})`, Ne = `${(0, ports["re"])(Pe, (0, ports["Kk"]) - Oe.length)}${Oe}`;
    if (!Se.has((0, ports["Ir"])(Ne)))
        return Ne;
} }
async function Nj(h, v) { if (!h.name)
    return h; let D; try {
    D = (await (0, ports["Dt"])((0, ports["Tv"])(void 0, v), gat, "seed name settle")).flatMap((Se) => Se.state.name ? [Se.state.name] : []);
}
catch (X) {
    return (0, ports["t"])(`[background] seed name settle skipped: ${(0, ports["l"])(X)}`), h;
} let N = hat(h.name, D); if (N === h.name)
    return h; return { ...h, name: N, nameSource: "collision" }; }
function KP(h) { if (h === 0)
    return ""; return `Automatic replies to ${h === 1 ? "Artifact comments" : `comments on ${h} Artifacts`} continue in the background session. You'll see a summary of the replies when you return.`; }
function iT({ running: h, finished: v, rerun: D }) { if (h === 0)
    return ""; let N = v > 0 ? `; ${v} finished ${(0, ports["I"])(v, "subagent")} ${v === 1 ? "is" : "are"} kept` : "", X = D > 0 ? `; ${D} that finished after a failed one ${D === 1 ? "runs" : "run"} again` : ""; return `${h} running workflow ${(0, ports["I"])(h, "subagent")} ${h === 1 ? "restarts" : "restart"} from the beginning${N}${X}.`; }
var wat = 3000;
var HRn = "Forking is not available in coordinator sessions. Use /branch instead.";
async function att(h, v, D, N, X, Se, _e, Pe, Ie, Oe) {
    if (Oe?.keepParent && (0, ports["Ea"])())
        return { ok: !1, error: HRn, queued: !1, reason: "coordinator_mode" };
    let Ne = Oe?.keepParent ? Oe.resumeAtLeaf : void 0, Ve = Ne === void 0 || Ne === null ? -1 : Ie.findIndex((Jo) => Jo.uuid === Ne);
    if (Ne !== void 0 && Ne !== null && Ve < 0)
        return { ok: !1, error: "Couldn't fork \u2014 the conversation no longer contains the fork point.", queued: !1, reason: "fork_point_missing" };
    let qe = (0, ports["QU"])(), ze = Oe?.keepParent ? (0, ports["re"])((0, ports["ks"])((0, ports["Ar"])(v ?? "")), 60) : "", pt = h.name ? `${h.name} ${(0, ports["pT"])}${ze ? ` ${ze}` : ""}` : ze ? `${(0, ports["pT"])} ${ze}` : void 0, St = Oe?.keepParent ? { ...h, name: pt, nameSource: pt ? "auto" : void 0 } : h, ht = (0, ports["DFr"])(), yt = (0, ports["HXe"])(D), bt = (0, ports["lpn"])(X), xt = Se.session ?? [], Ut = _e.session ?? [], Ct = xt.length > 0 || Ut.length > 0 || bt.length > 0 ? { allow: [...xt], deny: [...Ut], ...bt.length > 0 && { addDirs: bt } } : void 0, Wt = (Se.cliArg ?? []).filter((0, ports["MFr"])), Yt = (_e.cliArg ?? []).filter((0, ports["e9"])), qt = (0, ports["Uc"])(), no = !Oe?.keepParent && Boolean(qt && !qt.enteredExisting), lo = (() => { if (!Oe?.keepParent)
        return null; if (qt)
        return { to: qt.originalCwd, from: qt.enteredExisting ? "entered" : "owned" }; if (!(0, ports["cW"])((0, ports["Ee"])()))
        return null; let Jo = (0, ports["bs"])((0, ports["Ee"])()); return Jo && (0, ports["lr"])(Jo) === Jo ? { to: Jo, from: "launched" } : null; })(), to = lo?.to, wo = (0, ports["tt"])().worktree?.bgIsolation === "none", ko = (() => { if (!Oe?.keepParent || lo !== null)
        return; if ((0, ports["lr"])((0, ports["Ee"])()) === null)
        return; return (0, ports["cW"])((0, ports["Ee"])()) || wo ? "this-tree" : "own-worktree"; })();
    if ((0, ports["PGn"])() === null && Ie.length > 0 && (0, ports["b$"])().transcriptSource !== "ccr-api")
        await (0, ports["vE"])([...Ie], void 0, void 0, Ie, Oe?.storageV5);
    let so = (0, ports["PGn"])(), Ro = (0, ports["q"])();
    (0, ports["cdt"])(void 0, Oe?.storageV5);
    let co = !1;
    try {
        if (Oe?.keepParent)
            await (0, ports["$$"])(Ie, Oe.storageV5);
        await (0, ports["Dt"])((0, ports["Nu"])(), Oe?.keepParent ? 1e4 : 2000, "flush timeout"), co = !0;
    }
    catch {
        if (Oe?.keepParent)
            return (0, ports["i"])("tengu_background_spawn_failed", { via: (0, ports["c"])(Pe) }), { ok: !1, error: "Couldn't fork \u2014 this conversation is still being saved. Try again in a moment.", queued: !1, reason: "flush_incomplete" };
    }
    let No = Oe?.keepParent && lo ? `This conversation was forked out of ${qt?.worktreePath ?? (0, ports["Ee"])()}${qt?.worktreeBranch ? ` (branch ${qt.worktreeBranch})` : ""}, a linked worktree the original session is still working in \u2014 never edit files, run commands, or enter that worktree with ${(0, ports["k0"])}. You are in ${lo.to}${wo ? "" : `; before making code changes, create a new worktree of your own with ${(0, ports["k0"])} instead of reusing the original's${qt?.worktreeBranch ? `, and if the task builds on the original's work, base your new branch on ${qt.worktreeBranch} rather than checking that branch out (it stays checked out in the original's worktree)` : ""}`}.` : ko === "own-worktree" ? `This conversation was forked from a session that is still working in this checkout (${(0, ports["Ee"])()}). Before making code changes, create a new worktree of your own with ${(0, ports["k0"])} so your edits don't land where the original session is editing.` : void 0, ho = Ne === void 0 ? Ie : Ie.slice(0, Ve + 1), Wo = (0, ports["tn"])(Ro), Eo = Ne !== void 0 && Wo !== null ? { type: "last-prompt", sessionId: Wo, leafUuid: Ne, explicit: !0 } : void 0;
    if (Ne !== void 0 && Eo === void 0)
        return (0, ports["i"])("tengu_background_spawn_failed", { via: (0, ports["c"])(Pe) }), { ok: !1, error: "Couldn't fork \u2014 this session's id cannot record the fork point.", queued: !1, reason: "session_id_invalid" };
    let Mo = ho.findLast((Jo) => (0, ports["_v"])(Jo) && !(0, ports["zD"])(Jo.uuid)), zo = No !== void 0 && (0, ports["vMe"])(ho) !== void 0 && Mo !== void 0 ? { parentUuid: Mo.uuid, isSidechain: !1, ...(0, ports["ln"])({ type: "fork_briefing", text: No }), ...(0, ports["TGn"])(Ro) } : void 0, Uo = so, Do = Oe?.providedSessionId, bo;
    if (Oe?.keepParent && so !== null) {
        Do ??= (0, ports["uCe"])(), bo = Do.slice(0, 8);
        try {
            Uo = await bJo(so, bo, Oe.storageV5, { required: Eo ? [Eo] : [], optional: zo ? [zo] : [] });
        }
        catch (Jo) {
            return await Noo(bo, Oe.storageV5), (0, ports["i"])("tengu_background_spawn_failed", { via: (0, ports["c"])(Pe) }), { ok: !1, error: `Couldn't fork \u2014 ${(0, ports["l"])(Jo)}`, queued: !1, reason: "snapshot_copy_failed" };
        }
    }
    let qo = Oe?.keepParent ? (0, ports["e4"])() : {}, Qo = No !== void 0 && (zo === void 0 || so === null) && !(qo.appendSystemPrompt ?? "").includes(No) ? No : void 0, Sn = [...Uo !== null ? ["--resume", Uo, "--fork-session"] : [], ...Oe?.replyOnResume ? ["--reply-on-resume"] : [], ...(0, ports["LLo"])(Oe?.keepParent ? (0, ports["NLo"])((0, ports["sxt"])(qe)) : qe, X), ...Wt.flatMap((Jo) => ["--allowed-tools", Jo]), ...Yt.flatMap((Jo) => ["--disallowed-tools", Jo]), ...ht ? ["--model", ht] : [], ...yt !== void 0 ? ["--effort", yt] : [], "--permission-mode", N, ...[], ...(0, ports["Rw"])("--agent", qo.agent), ...(0, ports["Rw"])("--agents", qo.agents), ...(0, ports["Rw"])("--name", Oe?.keepParent ? void 0 : Oe?.workerName), ...(0, ports["Rw"])("--append-system-prompt", [qo.appendSystemPrompt, Qo].filter(Boolean).join(`

`) || void 0), ...(0, ports["Rw"])("--system-prompt-snapshot", (0, ports["LFr"])(qo.systemPromptSnapshot)), ...v ? ["--", v] : []], Tn = Ie.at(-1)?.timestamp, Zt = await (0, ports["y4"])(Sn, Do, "repl", to ?? qt?.worktreePath ?? (0, ports["Ee"])(), { ...St, ...Oe?.keepParent && { bgIsolation: "default" }, ...Oe?.keepParent && Tn !== void 0 && { forkSourceAlive: !0, forkBoundaryAt: Tn, forkSessionId: Do, forkParentSessionId: (0, ports["q"])() }, worktree: no ? { path: qt.worktreePath, branch: qt.worktreeBranch, hookBased: qt.hookBased ?? !1, originCwd: qt.originalCwd } : void 0, sessionPermissionRules: Ct, memoryToggledOff: (0, ports["hA"])() || void 0, autoMemoryOffThisSession: (0, ports["dee"])() || void 0, inFlight: Oe?.taskFreeInFlight }, Oe?.extraEnv, void 0, Oe?.storageV5).catch((Jo) => ({ ok: !1, error: `Couldn't ${Oe?.keepParent ? "fork" : "background"} \u2014 ${(0, ports["l"])(Jo)}`, reason: void 0 }));
    if (!Zt.ok) {
        if ((0, ports["i"])("tengu_background_spawn_failed", { via: (0, ports["c"])(Pe) }), bo !== void 0 && !Zt.alive)
            Noo(bo, Oe?.storageV5);
        let Jo = !1;
        if (Pe === "left_arrow" && Oe?.providedSessionId !== void 0 && so !== null && !Zt.alive) {
            let bn = (0, ports["Lr"])(Oe.providedSessionId.slice(0, 8)), cn = await (0, ports["Fr"])(bn, Oe.storageV5);
            if (cn)
                Jo = await wJo({ sessionFile: so, forkSessionId: Oe.providedSessionId, jobDir: bn, prev: cn, forkArgs: Sn, storageV5: Oe.storageV5 });
            if (Jo && co)
                await Pwe(so, Ro, Oe.providedSessionId, Oe.storageV5);
            if (Jo && qt) {
                if (no && !qt.hookBased)
                    await (0, ports["YDt"])(qt.worktreePath, qt.originalCwd);
                (0, ports["T_t"])(null), (0, ports["Q3"])();
            }
        }
        if (Pe === "left_arrow")
            if (Jo)
                (0, ports["p"])("repl_background_fork", "queued_for_later");
            else
                (0, ports["m"])("repl_background_fork", "spawn_failed");
        return { ok: !1, error: Zt.error, queued: Jo, reason: Zt.reason, alive: Zt.alive };
    }
    if ((0, ports["i"])("tengu_background", { via_flag: !1, via: (0, ports["c"])(Pe) }), Pe === "left_arrow")
        (0, ports["y"])("repl_background_fork");
    let gn = Zt.sessionId ?? Do;
    if (!Oe?.keepParent && so !== null && gn !== void 0)
        await Pwe(so, Ro, gn, Oe?.storageV5);
    if (qt && !Oe?.keepParent) {
        if (no && !qt.hookBased)
            await (0, ports["YDt"])(qt.worktreePath, qt.originalCwd);
        (0, ports["T_t"])(null), (0, ports["Q3"])();
    }
    if (St.name === void 0 && Zt.sessionId && !Oe?.keepParent) {
        let Jo = Zt.short, bn = (0, ports["rRt"])((0, ports["ai"])([...Ie]), AbortSignal.timeout(wat), { credentials: Oe?.credentials }).then((cn) => cn ? (0, ports["n9"])(Jo, cn, "auto", Oe?.storageV5) : void 0).catch(() => { });
        if (Pe === "command")
            (0, ports["_t"])(() => bn);
    }
    return { ok: !0, short: Zt.short, sessionId: Zt.sessionId ?? Do, handedOff: no, hadWorktree: qt !== null, relocatedTo: to, relocatedFrom: lo?.from, name: St.name, rosterName: St.name || St.intent || Zt.short, editsIn: ko };
}
async function Pwe(h, v, D, N) { let X = (0, ports["tn"])(v), Se = (0, ports["tn"])(D); if (X === null || Se === null)
    return; await (0, ports["OC"])(h, (0, ports["YLo"])(X, Se), N, { onlyIfExists: !0 }).catch((_e) => { (0, ports["t"])(`[bg] continued-in record not written: ${(0, ports["l"])(_e)}`, { level: "warn" }); }); }
async function bJo(h, v, D, N = { required: [], optional: [] }) {
    let X = (0, ports["yCe"])((0, ports["Lr"])(v), ...(0, ports["oKr"])), Se = (0, ports["wm"])(h, D), _e;
    if (Se !== void 0 && (0, ports["Xn"])(v)) {
        let Ie = (0, ports["De"]).job(v, [...(0, ports["oKr"])]), Oe = await Se.backend.copy(Se.key, Ie);
        if (!Oe.ok) {
            let Ne = Oe.error.code, Ve = "telemetryCode" in Oe.error ? Oe.error.telemetryCode : void 0;
            throw new (0, ports["P"])(`snapshot copy failed: ${Ne}${Ve === void 0 ? "" : ` ${Ve}`}`, "snapshot copy failed");
        }
        _e = async (Ne) => { let Ve = await Se.backend.updateText(Ie, (qe) => qe === void 0 ? { skip: !0 } : { write: qe.value + Ne }); if (!Ve.ok)
            return (0, ports["it"])(Ve.error); return Ve.value.written ? void 0 : "snapshot gone"; };
    }
    else
        await (0, ports["pCe"])((0, ports["hCe"])(X), { recursive: !0, mode: 448 }), await (0, ports["mCe"])(h, X), _e = (Ie) => (0, ports["vat"])(X, Ie, { mode: 384 }).then(() => { return; }, (Oe) => (0, ports["l"])(Oe));
    let Pe = (Ie) => `
` + Ie.map((Oe) => (0, ports["_"])(Oe)).join(`
`) + `
`;
    if (N.required.length > 0) {
        let Ie = await _e(Pe(N.required));
        if (Ie !== void 0)
            throw (0, ports["t"])(`[bg] fork point not written to snapshot: ${Ie}`, { level: "error" }), new (0, ports["P"])("the fork point could not be written to the snapshot", "snapshot trailer append failed");
    }
    if (N.optional.length > 0) {
        let Ie = await _e(Pe(N.optional));
        if (Ie !== void 0)
            (0, ports["t"])(`[bg] fork briefing not written to snapshot: ${Ie}`, { level: "warn" });
    }
    return X;
}
async function Noo(h, v) { if (v !== void 0 && (0, ports["Xn"])(h)) {
    await v.deleteScope({ namespace: "job", jobId: h }).catch(() => { });
    return;
} await (0, ports["gCe"])((0, ports["Lr"])(h), { recursive: !0, force: !0 }).catch(() => { }); }
async function wJo(h) { let { sessionFile: v, forkSessionId: D, jobDir: N, prev: X, forkArgs: Se, storageV5: _e } = h, Pe = (0, ports["yCe"])((0, ports["hCe"])(v), `${D}.jsonl`); return Cat(v, Pe, _e).then(() => (0, ports["ul"])(N, { ...X, state: "failed", tempo: "idle", needs: void 0, block: void 0, inFlight: void 0, detail: "couldn't start in the background \u2014 press Enter to retry", linkScanPath: Pe, respawnFlags: (0, ports["O_e"])((0, ports["$9t"])(Se)), updatedAt: new Date().toISOString() }, _e).catch(async (Ie) => { throw await _at(Pe, _e), Ie; })).then(() => !0, (Ie) => ((0, ports["d"])(Ie), !1)); }
async function Cat(h, v, D) { let N = (0, ports["wm"])(h, D), X = (0, ports["wm"])(v, D); if (N !== void 0 && X !== void 0) {
    let Se = await N.backend.copy(N.key, X.key);
    if (!Se.ok) {
        await X.backend.delete(X.key).catch(() => { });
        let _e = Se.error.code, Pe = "telemetryCode" in Se.error ? Se.error.telemetryCode : void 0;
        throw new (0, ports["P"])(`rescue copy failed: ${_e}${Pe === void 0 ? "" : ` ${Pe}`}`, "rescue copy failed");
    }
    return;
} await (0, ports["mCe"])(h, v); }
async function _at(h, v) { let D = (0, ports["wm"])(h, v); if (D !== void 0) {
    await D.backend.delete(D.key).catch(() => { });
    return;
} await (0, ports["gCe"])(h, { force: !0 }).catch(() => { }); }
async function EJo(h, v, D) { let N = (0, ports["Lr"])(h), X = (0, ports["F"])() && D !== void 0 ? D : void 0; if (X === void 0)
    await (0, ports["pCe"])(N, { recursive: !0, mode: 448 }); await (0, ports["eze"])(N, v, { parent: "create" }, X); }
function QP(h) {
    let v = h.frameLiveLost > 0 ? `
Couldn't move ${h.frameLiveLost} ${(0, ports["I"])(h.frameLiveLost, "Artifact comment monitor")} to the background session, so automatic replies stopped. Publish ${h.frameLiveLost === 1 ? "the Artifact" : "each Artifact"} again to turn them back on.` : "", D = h.ok && h.adopted.adopted_frame_live > 0 ? `
${KP(h.adopted.adopted_frame_live)}` : "";
    return v + D;
}
async function DRn(h) { let v = await (0, ports["g8t"])(h.tasks, h.queue), D; if (v) {
    D = (0, ports["uCe"])();
    let Ie = !1;
    try {
        await EJo(D.slice(0, 8), v.payload, h.storageV5), Ie = !0, await v.checkpointAgents(h.taskRegistry);
    }
    catch {
        if (D = void 0, v.payload.frameLive !== void 0)
            (0, ports["p"])("artifact_live_subscribe", Ie ? "consent_carry_checkpoint_failed" : "consent_carry_write_failed");
    }
} let N = await (0, ports["fV"])(h.messages, "background_handoff", { responseStreaming: h.responseStreaming ?? h.isMidTurn }, h.storageV5), X = await Nj(h.seed, h.storageV5), Se = X.name !== h.seed.name ? X.name : void 0, _e = await att(X, h.prompt, h.sessionEffort, h.permissionMode, h.additionalWorkingDirectories, h.alwaysAllowRules, h.alwaysDenyRules, "command", h.messages, { proactivityLevel: h.proactivityLevel, replyOnResume: h.isMidTurn, providedSessionId: D, workerName: Se, taskFreeInFlight: v && D && (0, ports["cpr"])(v.payload) ? void 0 : { tasks: 0, queued: 0, kinds: [] }, storageV5: h.storageV5, credentials: h.credentials }).catch((Ie) => { throw (0, ports["VCe"])(), Ie; }); if (_e.ok) {
    if (v && D)
        v.disown(h.taskRegistry);
    return { ..._e, adopted: (0, ports["b8t"])(D ? v?.payload : null), frameLiveLost: D === void 0 ? v?.payload.frameLive?.length ?? 0 : 0 };
} if (D)
    v?.abandon(); let Pe = v?.payload.frameLive?.length ?? 0; if (h.exitsAfterward && D && Pe > 0)
    (0, ports["p"])("artifact_live_subscribe", "adopt_spawn_failed"); return { ok: !1, error: (0, ports["bX"])(_e.error, N, { exitsAfterward: h.exitsAfterward }), frameLiveLost: h.exitsAfterward ? Pe : 0 }; }
function Jar(h) { return (0, ports["JS"])() && !(0, ports["Pt"])() && !(0, ports["Ha"])() && (0, ports["vge"])() && hHe(h, "") !== null; }
function MRn(h) {
    let Ne = (0, ports["w"])(11), { messages: v, isMidTurn: D, responseStreaming: N } = h, X = (0, ports["Tr"])(), Se = (0, ports["Wy"])(), { storageV5: _e, credentials: Pe } = (0, ports["Te"])(), Ie = (0, ports["Gu"])(), Oe = (0, ports["A"])(!1), Ve, qe;
    if (Ne[0] !== Pe || Ne[1] !== D || Ne[2] !== v || Ne[3] !== Ie || Ne[4] !== N || Ne[5] !== _e || Ne[6] !== X || Ne[7] !== Se)
        Ve = () => {
            if (Oe.current) {
                return;
            }
            Oe.current = !0;
            let ze = hHe(v, "");
            if (ze === null) {
                (0, ports["m"])("bg_exit_dialog_background", "no_seed"), (0, ports["Kn"])(0, "prompt_input_exit", { finalMessage: "Nothing to background \u2014 exiting." });
                return;
            }
            (async () => {
                let pt = X.getState();
                let St = (0, ports["Jz"])(pt.tasks);
                let ht = (0, ports["yDe"])(pt.tasks, St);
                let xt = (0, ports["EMe"])((0, ports["di"])(pt.tasks, (yt) => (0, ports["hDe"])(yt, St) || (0, ports["MW"])(yt)), { cronFilter: (bt) => !(0, ports["Eve"])(bt, St) });
                let Ut = await DRn({ seed: ze, prompt: null, messages: v, exitsAfterward: !0, isMidTurn: D, responseStreaming: N, sessionEffort: pt.sessionEffort, permissionMode: (0, ports["dne"])(pt), proactivityLevel: (0, ports["tte"])(pt), additionalWorkingDirectories: pt.toolPermissionContext.additionalWorkingDirectories, alwaysAllowRules: pt.toolPermissionContext.alwaysAllowRules, alwaysDenyRules: pt.toolPermissionContext.alwaysDenyRules, tasks: pt.tasks, taskRegistry: Se, queue: Ie, storageV5: _e, credentials: Pe });
                if (Ut.ok) {
                    (0, ports["y"])("bg_exit_dialog_background");
                    let Ct = xt.count > 0 ? `
${xt.summary} couldn't be moved and ${xt.count === 1 ? "was" : "were"} stopped.` : "";
                    let Wt = iT(ht);
                    await (0, ports["Kn"])(0, "prompt_input_exit", { suppressResumeHint: !0, finalMessage: (0, ports["oDe"])(Ut.short, Ut.handedOff ? "(worktree handed off)" : void 0) + Ct + (Wt ? `
${Wt}` : "") + QP(Ut) });
                }
                else
                    (0, ports["m"])("bg_exit_dialog_background", "spawn_failed"), await (0, ports["Kn"])(0, "prompt_input_exit", { finalMessage: Ut.error + QP(Ut) });
            })();
        }, qe = [v, D, N, X, Se, _e, Pe, Ie], Ne[0] = Pe, Ne[1] = D, Ne[2] = v, Ne[3] = Ie, Ne[4] = N, Ne[5] = _e, Ne[6] = X, Ne[7] = Se, Ne[8] = Ve, Ne[9] = qe;
    else
        Ve = Ne[8], qe = Ne[9];
    (0, ports["R"])(Ve, qe);
    let Yt;
    if (Ne[10] === (0, ports["b"]))
        Yt = (0, ports["e"])((0, ports["n"]), { dimColor: !0, children: "Moving to background\u2026" }), Ne[10] = Yt;
    else
        Yt = Ne[10];
    return Yt;
}
function hHe(h, v, D = "(backgrounded)") { let N = v, X = !1, Se; for (let Ne = h.length - 1; Ne >= 0; Ne--) {
    let Ve = h[Ne];
    if (Ve.type === "assistant" && Se === void 0) {
        let qe = (0, ports["tM"])(Ve);
        if (qe)
            Se = (0, ports["re"])(qe.replace(/\s+/g, " ").trim(), 120);
    }
    if (Ve.type === "user" && !Ve.isMeta && !(0, ports["IA"])(Ve)) {
        let qe = (0, ports["yh"])(Ve)?.trim();
        if (qe && (0, ports["KM"])(qe)) {
            if (qe.startsWith(`<${(0, ports["yf"])}>`))
                X = !0;
            continue;
        }
        if (X = !0, !N && qe)
            N = qe;
    }
    if (X && N && Se !== void 0)
        break;
} if (!X && !v)
    return null; let _e = (0, ports["xf"])((0, ports["q"])()), Pe = (0, ports["fq"])((0, ports["q"])()), Ie = (0, ports["qv"])(), Oe = (0, ports["kFe"])(); return { intent: (0, ports["re"])(N || D, 200), name: _e ?? Pe, nameSource: _e ? Ie?.source === "collision" && Ie.name === _e ? "collision" : "user" : Pe ? "auto" : void 0, color: (0, ports["D1"])(Oe) ? Oe : void 0, detail: Se }; }
function gpo(Uo, Do) { return (0, ports["r"])((0, ports["s"]), { flexDirection: "row", children: [(0, ports["e"])((0, ports["n"]), { bold: !0, children: Uo.label }), Uo.detail ? (0, ports["r"])((0, ports["n"]), { dimColor: !0, children: [" \xB7 ", Uo.detail] }) : null] }, Do); }
function rX(h) { let Se = (0, ports["w"])(50), { items: v, onExit: D, onCancel: N, onBackground: X } = h, _e; if (Se[0] !== v.length)
    _e = function Ie(Pe) { (0, ports["i"])("tengu_exit_background_work_prompt", { item_count: v.length, chose_exit: Pe === "exit", chose_background: Pe === "background" }); }, Se[0] = v.length, Se[1] = _e;
else
    _e = Se[1]; let Ie = _e, Oe; if (Se[2] !== Ie || Se[3] !== X || Se[4] !== N || Se[5] !== D)
    Oe = function Ve(Ne) { switch (Ie(Ne), Ne) {
        case "exit": {
            return D();
        }
        case "background": {
            return X?.();
        }
        case "stay": {
            return N();
        }
    } }, Se[2] = Ie, Se[3] = X, Se[4] = N, Se[5] = D, Se[6] = Oe;
else
    Oe = Se[6]; let Ve = Oe, qe; if (Se[7] !== Ie || Se[8] !== N)
    qe = function ze() { Ie("stay"), N(); }, Se[7] = Ie, Se[8] = N, Se[9] = qe;
else
    qe = Se[9]; let ze = qe, pt = (0, ports["ve"])(), { rows: St } = (0, ports["Yo"])(pt), ht = (0, ports["Xa"])(), yt; if (Se[10] !== ht || Se[11] !== St)
    yt = !ht && (0, ports["sx"])() ? Math.floor(St / 2) : St, Se[10] = ht, Se[11] = St, Se[12] = yt;
else
    yt = Se[12]; let bt = yt, xt = Math.max(1, bt - (X ? 13 : 12)), Ut, Ct, Wt, Yt, qt, no, lo, to, wo; if (Se[13] !== ze || Se[14] !== v || Se[15] !== xt) {
    let ko = v.slice(0, xt);
    Ct = (0, ports["he"]);
    to = "Background work is running";
    wo = "The following will stop when you exit:";
    Wt = ze;
    Yt = !0;
    Ut = (0, ports["s"]);
    qt = "column";
    no = 0;
    lo = ko.map(gpo);
    Se[13] = ze, Se[14] = v, Se[15] = xt, Se[16] = Ut, Se[17] = Ct, Se[18] = Wt, Se[19] = Yt, Se[20] = qt, Se[21] = no, Se[22] = lo, Se[23] = to, Se[24] = wo;
}
else
    Ut = Se[16], Ct = Se[17], Wt = Se[18], Yt = Se[19], qt = Se[20], no = Se[21], lo = Se[22], to = Se[23], wo = Se[24]; const so = v.length - xt; let Ro; if (Se[25] !== so)
    Ro = (0, ports["e"])((0, ports["ph"]), { count: so, unit: "item" }), Se[25] = so, Se[26] = Ro;
else
    Ro = Se[26]; let co; if (Se[27] !== Ut || Se[28] !== Ro || Se[29] !== qt || Se[30] !== no || Se[31] !== lo)
    co = (0, ports["r"])(Ut, { flexDirection: qt, gap: no, children: [lo, Ro] }), Se[27] = Ut, Se[28] = Ro, Se[29] = qt, Se[30] = no, Se[31] = lo, Se[32] = co;
else
    co = Se[32]; let No; if (Se[33] === (0, ports["b"]))
    No = { label: "Exit and stop tasks", value: "exit" }, Se[33] = No;
else
    No = Se[33]; let ho; if (Se[34] !== X)
    ho = X ? [{ label: "Move to background and exit", value: "background" }] : [], Se[34] = X, Se[35] = ho;
else
    ho = Se[35]; let Wo; if (Se[36] === (0, ports["b"]))
    Wo = { label: "Stay", value: "stay" }, Se[36] = Wo;
else
    Wo = Se[36]; let Eo; if (Se[37] !== ho)
    Eo = [No, ...ho, Wo], Se[37] = ho, Se[38] = Eo;
else
    Eo = Se[38]; let Mo; if (Se[39] !== Ve || Se[40] !== Eo)
    Mo = (0, ports["e"])((0, ports["$e"]), { options: Eo, onChange: Ve }), Se[39] = Ve, Se[40] = Eo, Se[41] = Mo;
else
    Mo = Se[41]; let zo; if (Se[42] !== Ct || Se[43] !== Wt || Se[44] !== Yt || Se[45] !== co || Se[46] !== Mo || Se[47] !== to || Se[48] !== wo)
    zo = (0, ports["r"])(Ct, { title: to, subtitle: wo, onCancel: Wt, exitOnCtrlCD: Yt, children: [co, Mo] }), Se[42] = Ct, Se[43] = Wt, Se[44] = Yt, Se[45] = co, Se[46] = Mo, Se[47] = to, Se[48] = wo, Se[49] = zo;
else
    zo = Se[49]; return zo; }
function Hpo(Dn) { return Dn.id; }
function Upo() { return "?"; }
function qpo(fs) { return fs.trim() !== ""; }
function $po() { return "Worktree removed (no changes)"; }
var Zet = 5000;
var GE = 5000;
function qH() { return bridge.requireOriginal287("/$bunfs/root/chunk-waq70p5c.js"); }
async function Vm(h, v) { let { originalCwd: D, preEnterOriginalCwd: N, liveLaunchAnchor: X } = h, Se = (0, ports["h$"])(D) ? (0, ports["ypo"])() : D; while (!0)
    try {
        (0, ports["zf"])(Se), (0, ports["Rf"])(Se);
        break;
    }
    catch {
        let Pe = (0, ports["hpo"])(Se);
        if (Pe === Se)
            break;
        Se = Pe;
    } let _e = Se !== D; if (_e)
    (0, ports["t"])(`Original directory ${D} no longer exists \u2014 returned to ${Se} instead`, { level: "warn" }); if (!_e) {
    let Pe = N ?? D;
    if (X === void 0 || (0, ports["RCe"])(Pe, (0, ports["DMe"])(X, h.worktreePath), { requireCovered: !0, coveredWitnesses: (0, ports["JVe"])(X, h.worktreePath), extraCoveredRoots: (() => { let Ie = (0, ports["oB"])(h.worktreePath); return Ie !== null ? [Ie] : []; })() }))
        (0, ports["vT"])(Pe);
    try {
        await qH().relocateSessionTranscript(v);
    }
    catch (Ie) {
        qH().reportRelocateSessionTranscriptFailure(Ie, "WorktreeExitDialog");
    }
} qH().saveWorktreeState(null, v), (0, ports["Kl"]).cache.clear?.(), (0, ports["X_"])(v); }
function iX(h, v, { killTmux: D, removedMessage: N, commits: X, changedFiles: Se }) { let _e = async () => { if (D && h.tmuxSessionName)
    await (0, ports["hne"])(h.tmuxSessionName); let Pe = (0, ports["Uc"])(); if (Pe === null || Pe.hookBased || Pe.worktreePath !== h.worktreePath)
    return `Worktree not removed: this session had switched away from it before Claude Code exited. It is still at ${h.worktreePath}.`; let { storageV5: Ie, credentials: Oe } = v; if (!await (0, ports["LTe"])(Ie, Oe))
    return `Worktree could not be removed \u2014 kept at ${h.worktreePath}`; return (0, ports["i"])("tengu_worktree_removed", { source: (0, ports["S"])("exit_dialog"), commits: X, changed_files: Se }), N(); }; return { path: h.worktreePath, run: _e, ignoresHangup: D && Boolean(h.tmuxSessionName) && Boolean((0, ports["a"]).TMUX) && ((0, ports["a"]).CLAUDE_CODE_TMUX_SESSION === void 0 || (0, ports["a"]).CLAUDE_CODE_TMUX_SESSION === h.tmuxSessionName) }; }
function vX(h) {
    let Pe = (0, ports["w"])(35), { onDone: v, onCancel: D } = h, { storageV5: N, credentials: X } = (0, ports["Te"])(), [Se, _e] = (0, ports["g"])("loading"), Ie;
    if (Pe[0] === (0, ports["b"]))
        Ie = [], Pe[0] = Ie;
    else
        Ie = Pe[0];
    let [Oe, Ne] = (0, ports["g"])(Ie), [Ve, qe] = (0, ports["g"])(null), [ze, pt] = (0, ports["g"])(null), [St, ht] = (0, ports["g"])(!1), [yt, bt] = (0, ports["g"])(0), [, xt] = (0, ports["g"])(null), [Ut, Ct] = (0, ports["g"])(), Wt = (0, ports["A"])(void 0), Yt;
    if (Pe[1] === (0, ports["b"]))
        Yt = (0, ports["Uc"])(), Pe[1] = Yt;
    else
        Yt = Pe[1];
    let qt = Yt, no = (0, ports["_r"])(Hpo), lo;
    if (Pe[2] !== no)
        lo = qH().getCurrentSessionTitle(no), Pe[2] = no, Pe[3] = lo;
    else
        lo = Pe[3];
    let to = lo, wo, ko;
    if (Pe[4] !== X || Pe[5] !== to || Pe[6] !== N)
        wo = () => {
            let bn = async function bn() {
                if (qt?.enteredExisting) {
                    await (0, ports["Sye"])(N), await Vm(qt, N), Ct(`Returned to ${qt.originalCwd} (worktree at ${qt.worktreePath} left in place)`), _e("done");
                    return;
                }
                let so = [];
                if (!1 && qt) {
                    if (qt.liveLaunchAnchor !== void 0) {
                        xt("not-read"), _e("asking");
                        return;
                    }
                    _e("checking");
                    let Ro = await (0, ports["lt"])((0, ports["vGn"])(qt.worktreePath, qt.originalChangeset, qt.originalCwd, { statusTimeoutMs: GE }), GE);
                    if (Ro === void 0)
                        (0, ports["t"])(`hook worktree status check for ${qt.worktreePath} outlasted ${GE} ms; asking instead`);
                    let co = Ro ?? null;
                    if (so = Array.from({ length: co?.changedFiles ?? 0 }, Upo), co === null || co.moved) {
                        if (so.length > 0)
                            Ne(so);
                        xt(co !== null && co.changeset !== null ? { movedToChangeset: co.changeset } : "unreadable"), _e("asking");
                        return;
                    }
                    xt({});
                }
                let No = qt && !0 ? await (0, ports["Gq"])(qt.worktreePath) : void 0;
                let ho = No !== void 0 && !No.ok;
                let Wo = !qt || !1 ? { stdout: "", stderr: "", code: 1, error: void 0 } : await (0, ports["Je"])((0, ports["vt"])(), ho ? [...(0, ports["yn"]), "rev-parse", "--git-dir"] : [...No?.ok ? No.args : [], ...(0, ports["yn"]), ...(0, ports["LK"])], { cwd: qt.worktreePath, env: (0, ports["bl"])(qt.worktreePath) });
                let Eo = !1;
                if (qt && Wo.code !== 0) {
                    ;
                    try {
                        await (0, ports["Jet"])(qt.worktreePath);
                    }
                    catch (Mo) {
                        let zo = Mo;
                        Eo = (0, ports["W"])(zo);
                    }
                }
                let Uo = !1;
                if (!0 && qt?.hookBased && Wo.code !== 0 && !Eo) {
                    try {
                        Uo = (0, ports["LS"])(await (0, ports["Xet"])(qt.worktreePath)) === null;
                    }
                    catch {
                        Uo = !1;
                    }
                }
                let Do = (ho || Wo.code !== 0) && !Eo && !Uo;
                if (qt && !qt.hookBased && Wo.code !== 0 && Eo) {
                    (0, ports["lq"])(null, N), (0, ports["Q3"])(), await Vm(qt, N);
                    let bo = qt.tmuxSessionName ? `. Detached tmux session ${qt.tmuxSessionName} may still be running \u2014 end it with: tmux kill-session -t ${qt.tmuxSessionName}` : "";
                    Ct(`Worktree at ${qt.worktreePath} is no longer accessible \u2014 exiting${bo}`), _e("done");
                    return;
                }
                if (Do)
                    so = ["?"], ht(!0);
                else if (!ho && Wo.stdout)
                    so = Wo.stdout.split(`
`).filter(qpo);
                let qo = !1;
                if (qt && Wo.code === 0 && !ho) {
                    let Qo = (0, ports["Nde"])(await (0, ports["Wq"])(qt.worktreePath, { deadlineMs: Zet }));
                    Sn: switch (Qo?.kind) {
                        case "changes": {
                            so = [...so, ...Qo.paths], qe((0, ports["_J"])(Qo));
                            break Sn;
                        }
                        case "unverifiable": {
                            qo = !0, pt((0, ports["_J"])(Qo));
                            break Sn;
                        }
                        case void 0:
                    }
                }
                if (so.length > 0)
                    Ne(so);
                if (qt) {
                    let Tn = qt.hookBased ? 0 : null;
                    if (qt.originalHeadCommit) {
                        let { stdout: Zt, code: gn } = await (0, ports["Je"])((0, ports["vt"])(), [...(0, ports["yn"]), "rev-list", "--count", `${qt.originalHeadCommit}..HEAD`], { cwd: qt.worktreePath, env: (0, ports["bl"])(qt.worktreePath) });
                        Tn = gn === 0 ? parseInt(Zt.trim()) || 0 : null;
                    }
                    if (bt(Tn), so.length === 0 && Tn === 0 && !to && !qo) {
                        if (_e("removing-clean"), !qt.hookBased) {
                            await Vm(qt, N), Wt.current = iX(qt, { storageV5: N, credentials: X }, { killTmux: !1, removedMessage: $po, commits: 0, changedFiles: 0 }), _e("done");
                            return;
                        }
                        (0, ports["LTe"])(N, X).then(async (Jo) => { if (await Vm(qt, N), Jo)
                            (0, ports["i"])("tengu_worktree_removed", { source: (0, ports["S"])("exit_dialog"), commits: 0, changed_files: 0 }), Ct("Worktree removed (no changes)");
                        else
                            Ct(`Worktree could not be removed \u2014 kept at ${qt.worktreePath}`); _e("done"); });
                        return;
                    }
                    else
                        _e("asking");
                }
            };
            bn();
        }, ko = [qt, to, N, X], Pe[4] = X, Pe[5] = to, Pe[6] = N, Pe[7] = wo, Pe[8] = ko;
    else
        wo = Pe[7], ko = Pe[8];
    (0, ports["R"])(wo, ko);
    let Mo, cn;
    if (Pe[9] !== v || Pe[10] !== Ut || Pe[11] !== Se)
        Mo = () => { if (Se === "done") {
            if (Wt.current)
                v(Ut, { removeWorktree: Wt.current });
            else
                v(Ut);
        } }, cn = [Se, v, Ut], Pe[9] = v, Pe[10] = Ut, Pe[11] = Se, Pe[12] = Mo, Pe[13] = cn;
    else
        Mo = Pe[12], cn = Pe[13];
    if ((0, ports["R"])(Mo, cn), !qt) {
        return v("No active worktree session found", { display: "system" }), null;
    }
    if (Se === "loading" || Se === "done") {
        return null;
    }
    if (Se === "checking") {
        return null;
    }
    let wn;
    if (Pe[14] !== Oe || Pe[15] !== yt || Pe[16] !== X || Pe[17] !== N)
        wn = async function wr(Zo) { if (!qt) {
            return;
        } let Rn = Boolean(qt.tmuxSessionName); let ar = qt.worktreeBranch ? ` on branch ${qt.worktreeBranch}` : ""; if (Zo === "keep" || Zo === "keep-with-tmux") {
            if (_e("keeping"), (0, ports["i"])("tengu_worktree_kept", { commits: yt ?? -1, changed_files: Oe.length }), await (0, ports["Sye"])(N), await Vm(qt, N), Rn)
                Ct(`Worktree kept. Your work is saved at ${qt.worktreePath}${ar}. Reattach to tmux session with: tmux attach -t ${qt.tmuxSessionName}`);
            else
                Ct(`Worktree kept. Your work is saved at ${qt.worktreePath}${ar}`);
            _e("done");
        }
        else if (Zo === "keep-kill-tmux") {
            if (_e("keeping"), (0, ports["i"])("tengu_worktree_kept", { commits: yt ?? -1, changed_files: Oe.length }), qt.tmuxSessionName)
                await (0, ports["hne"])(qt.tmuxSessionName);
            await (0, ports["Sye"])(N), await Vm(qt, N), Ct(`Worktree kept at ${qt.worktreePath}${ar}. Tmux session terminated.`), _e("done");
        }
        else if (Zo === "remove" || Zo === "remove-with-tmux") {
            _e("removing");
            let er = Rn ? " Tmux session terminated." : "";
            let Gn = Oe.length;
            let Xo = () => { if (yt === null) {
                return `Worktree and branch ${qt.worktreeBranch} removed.${Gn > 0 ? " Uncommitted changes were discarded." : ""}${er}`;
            } if (yt > 0 && Gn > 0) {
                return `Worktree removed. ${yt} ${yt === 1 ? "commit" : "commits"} and uncommitted changes were discarded.${er}`;
            } if (yt > 0) {
                return `Worktree removed. ${yt} ${yt === 1 ? "commit" : "commits"} on ${qt.worktreeBranch} ${yt === 1 ? "was" : "were"} discarded.${er}`;
            } return Gn > 0 ? `Worktree removed. Uncommitted changes were discarded.${er}` : `Worktree removed.${er}`; };
            if (!qt.hookBased) {
                await Vm(qt, N), Wt.current = iX(qt, { storageV5: N, credentials: X }, { killTmux: !0, removedMessage: Xo, commits: yt ?? -1, changedFiles: Gn }), _e("done");
                return;
            }
            if (qt.tmuxSessionName)
                await (0, ports["hne"])(qt.tmuxSessionName);
            let An = await (0, ports["LTe"])(N, X);
            if (await Vm(qt, N), !An) {
                Ct(`Worktree could not be removed \u2014 kept at ${qt.worktreePath}`), _e("done");
                return;
            }
            (0, ports["i"])("tengu_worktree_removed", { source: (0, ports["S"])("exit_dialog"), commits: yt ?? -1, changed_files: Gn }), Ct(Xo()), _e("done");
        } }, Pe[14] = Oe, Pe[15] = yt, Pe[16] = X, Pe[17] = N, Pe[18] = wn;
    else
        wn = Pe[18];
    let wr = wn;
    if (Se === "keeping") {
        let dr;
        if (Pe[19] === (0, ports["b"]))
            dr = (0, ports["r"])((0, ports["s"]), { flexDirection: "row", marginY: 1, children: [(0, ports["e"])((0, ports["Ns"]), {}), (0, ports["e"])((0, ports["n"]), { children: "Keeping worktree\u2026" })] }), Pe[19] = dr;
        else
            dr = Pe[19];
        return dr;
    }
    if (Se === "removing-clean" || Se === "removing") {
        let dr;
        if (Pe[20] === (0, ports["b"]))
            dr = (0, ports["e"])((0, ports["Ns"]), {}), Pe[20] = dr;
        else
            dr = Pe[20];
        const Jr = Se === "removing-clean" ? "Cleaning up worktree (no pending changes)\u2026" : "Removing worktree\u2026";
        let Mn;
        if (Pe[21] !== Jr)
            Mn = (0, ports["r"])((0, ports["s"]), { flexDirection: "row", marginY: 1, children: [dr, (0, ports["e"])((0, ports["n"]), { children: Jr })] }), Pe[21] = Jr, Pe[22] = Mn;
        else
            Mn = Pe[22];
        return Mn;
    }
    let zn = qt.worktreeBranch, Ln = Oe.length > 0, ps = St ? "uncommitted files that could not be counted (git could not vet the worktree's config or read a checkout there)" : `${Oe.length} uncommitted ${Oe.length === 1 ? "file" : "files"}${Ve ? ` (including ${Ve})` : ""}`, us = yt === null || yt > 0, jn = ze ? ` The worktree's submodules could not be checked for uncommitted work (${ze}); anything uncommitted inside one is lost if you remove the worktree.` : "", Rr;
    if (yt === null)
        Rr = `${Ln ? `You have ${ps}, and the ` : "The "}branch ${zn} may hold unpushed commits (commit baseline unavailable). The branch will be deleted if you remove.`;
    else if (Ln && us)
        Rr = `You have ${ps} and ${yt} ${yt === 1 ? "commit" : "commits"} on ${zn}. All will be lost if you remove.`;
    else if (Ln)
        Rr = `You have ${ps}. These will be lost if you remove the worktree.`;
    else if (us)
        Rr = `You have ${yt} ${yt === 1 ? "commit" : "commits"} on ${zn}. The branch will be deleted if you remove the worktree.`;
    else if (to)
        Rr = `This session was named "${to}". Keep the worktree to resume it later, or remove it to clean up.`;
    else
        Rr = "You are working in a worktree. Keep it to continue working there, or remove it to clean up.";
    Rr = Rr + jn;
    let dr;
    if (Pe[23] !== wr || Pe[24] !== D)
        dr = function Ur() { if (D) {
            D();
            return;
        } wr("keep"); }, Pe[23] = wr, Pe[24] = D, Pe[25] = dr;
    else
        dr = Pe[25];
    let Ur = dr, nr = Ln || us || ze !== null ? "All changes and commits will be lost." : "Clean up the worktree directory.", Dr = Boolean(qt.tmuxSessionName), Jr;
    if (Pe[26] !== nr)
        Jr = Dr ? [{ label: "Keep worktree and tmux session", value: "keep-with-tmux", description: `Stays at ${qt.worktreePath}. Reattach with: tmux attach -t ${qt.tmuxSessionName}` }, { label: "Keep worktree, end tmux session", value: "keep-kill-tmux", description: `Keeps worktree at ${qt.worktreePath}, terminates tmux session.` }, { label: "Remove worktree and tmux session", value: "remove-with-tmux", description: nr }] : [{ label: "Keep worktree", value: "keep", description: `Stays at ${qt.worktreePath}` }, { label: "Remove worktree", value: "remove", description: nr }], Pe[26] = nr, Pe[27] = Jr;
    else
        Jr = Pe[27];
    let Br = Jr, Or = Dr ? "keep-with-tmux" : "keep", Mn;
    if (Pe[28] !== wr || Pe[29] !== Br)
        Mn = (0, ports["e"])((0, ports["$e"]), { defaultFocusValue: Or, options: Br, onChange: wr }), Pe[28] = wr, Pe[29] = Br, Pe[30] = Mn;
    else
        Mn = Pe[30];
    let vs;
    if (Pe[31] !== Ur || Pe[32] !== Rr || Pe[33] !== Mn)
        vs = (0, ports["e"])((0, ports["he"]), { title: "Exiting worktree session", subtitle: Rr, onCancel: Ur, exitOnCtrlCD: !0, children: Mn }), Pe[31] = Ur, Pe[32] = Rr, Pe[33] = Mn, Pe[34] = vs;
    else
        vs = Pe[34];
    return vs;
}
function ifo() { }
var Gpo = ["Goodbye!", "See ya!", "Bye!", "Catch you later!"];
function Dtt() { return (0, ports["jL"])(Gpo) ?? "Goodbye!"; }
function jEt(h) { let pt = (0, ports["w"])(39), { showWorktree: v, backgroundItems: D, messages: N, getMessages: X, getIsMidTurn: Se, getIsResponseStreaming: _e, isMidTurn: Pe, onDone: Ie, onCancel: Oe, onBeforeExit: Ne } = h, { storageV5: Ve } = (0, ports["Te"])(), [qe, ze] = (0, ports["g"])(!1), St; if (pt[0] !== X || pt[1] !== N)
    St = () => X?.() ?? N, pt[0] = X, pt[1] = N, pt[2] = St;
else
    St = pt[2]; let ht = St, yt; if (pt[3] !== Se || pt[4] !== _e || pt[5] !== Pe)
    yt = () => ((_e ?? Se)?.() ?? Pe) === !0, pt[3] = Se, pt[4] = _e, pt[5] = Pe, pt[6] = yt;
else
    yt = pt[6]; let bt = yt, xt; if (pt[7] !== D || pt[8] !== qe || pt[9] !== Se || pt[10] !== ht || pt[11] !== Pe || pt[12] !== Ne || pt[13] !== Oe || pt[14] !== Ie || pt[15] !== bt || pt[16] !== v || pt[17] !== Ve) {
    xt = (0, ports["un"]);
    ko: {
        let Ut = ht();
        let Ct;
        if (pt[19] !== Se || pt[20] !== Pe)
            Ct = Se?.() ?? Pe, pt[19] = Se, pt[20] = Pe, pt[21] = Ct;
        else
            Ct = pt[21];
        let Wt = Ct;
        let Yt;
        if (pt[22] !== ht || pt[23] !== Ne || pt[24] !== Ie || pt[25] !== bt || pt[26] !== Ve)
            Yt = async function to(qt, no) { await Ne?.(), Ie(qt ?? Dtt()); let lo = ht(); if (lo)
                await (0, ports["Aae"])(lo, { responseStreaming: bt() }, Ve, no?.removeWorktree);
            else if (no?.removeWorktree)
                await (0, ports["Kn"])(0, "prompt_input_exit", { removeWorktree: no.removeWorktree });
            else
                await (0, ports["Kn"])(0, "prompt_input_exit"); }, pt[22] = ht, pt[23] = Ne, pt[24] = Ie, pt[25] = bt, pt[26] = Ve, pt[27] = Yt;
        else
            Yt = pt[27];
        let to = Yt;
        if (v) {
            let wo;
            if (pt[28] !== Oe || pt[29] !== to)
                wo = (0, ports["e"])((0, bridge.WorktreeExitDialog), { onDone: to, onCancel: Oe }), pt[28] = Oe, pt[29] = to, pt[30] = wo;
            else
                wo = pt[30];
            xt = wo;
            break ko;
        }
        if (qe && Ut) {
            xt = (0, ports["e"])(MRn, { messages: Ut, isMidTurn: Wt ?? !1, responseStreaming: bt() });
            break ko;
        }
        if (D.length > 0) {
            let so;
            if (Ut !== void 0 && Jar(Ut)) {
                let wo;
                if (pt[31] === (0, ports["b"]))
                    wo = () => ze(!0), pt[31] = wo;
                else
                    wo = pt[31];
                so = wo;
            }
            let wo;
            if (pt[32] !== to)
                wo = () => void to(), pt[32] = to, pt[33] = wo;
            else
                wo = pt[33];
            const Ro = Oe ?? ifo;
            let co;
            if (pt[34] !== D || pt[35] !== so || pt[36] !== wo || pt[37] !== Ro)
                co = (0, ports["e"])(rX, { items: D, onExit: wo, onCancel: Ro, onBackground: so }), pt[34] = D, pt[35] = so, pt[36] = wo, pt[37] = Ro, pt[38] = co;
            else
                co = pt[38];
            xt = co;
            break ko;
        }
    }
    pt[7] = D, pt[8] = qe, pt[9] = Se, pt[10] = ht, pt[11] = Pe, pt[12] = Ne, pt[13] = Oe, pt[14] = Ie, pt[15] = bt, pt[16] = v, pt[17] = Ve, pt[18] = xt;
}
else
    xt = pt[18]; if (xt !== (0, ports["un"]))
    return xt; return null; }
return {fat,gat,Twe,hat,Nj,KP,iT,wat,HRn,att,Pwe,bJo,Noo,wJo,Cat,_at,EJo,QP,DRn,Jar,MRn,hHe,gpo,rX,Hpo,Upo,qpo,$po,Zet,GE,qH,Vm,iX,vX,ifo,Gpo,Dtt,jEt};
}
function build3(){
const mapping={"QZt":{"local":"QZt","imported":"QZt","module":"chunk-4ggapckt.js"},"vE":{"local":"vE","imported":"vE","module":"chunk-mphp7acd.js"},"Nt":{"local":"Nt","imported":"Nt","module":"chunk-mphp7acd.js"},"JZt":{"local":"JZt","imported":"JZt","module":"chunk-4ggapckt.js"},"VCe":{"local":"VCe","imported":"VCe","module":"chunk-4ggapckt.js"},"d":{"local":"d","imported":"d","module":"chunk-amhtwhch.js"},"Kn":{"local":"Kn","imported":"Kn","module":"chunk-mphp7acd.js"},"$$":{"local":"$$","imported":"$$","module":"chunk-ff8yrzyn.js"}};
const ports=new Proxy(Object.create(null),{get:(_,name)=>{const p=mapping[name];if(!p)throw Error('Missing original dependency '+String(name));return dependency(p.module,p.imported)}});
const bridge={get WorktreeExitDialog(){return host.WorktreeExitDialog??made['chunk-f2cpzzp9.js'].vX},requireOriginal287(spec){if(spec!=='/$bunfs/root/chunk-waq70p5c.js')throw Error('Unknown session namespace '+spec);return host.storage}};
async function fV(e, r, { responseStreaming: i = !1 } = {}, o) { let a = (0, ports["QZt"])(r); if (!a || i)
    return a; try {
    if (await (0, ports["vE"])([...e, (0, ports["Nt"])((0, ports["JZt"])[r], "warning")], void 0, void 0, void 0, o), r === "relaunch")
        await (0, ports["$$"])(e, o);
}
catch (s) {
    throw (0, ports["VCe"])(), s;
} return !0; }
async function ZDn(e, { responseStreaming: r = !1 } = {}, i) { try {
    await fV(e, "process_exit", { responseStreaming: r }, i);
}
catch (o) {
    (0, ports["d"])(o);
} }
async function Aae(e, r = {}, i, o) { if (await ZDn(e, r, i), o)
    await (0, ports["Kn"])(0, "prompt_input_exit", { removeWorktree: o });
else
    await (0, ports["Kn"])(0, "prompt_input_exit"); }
return {fV,ZDn,Aae};
}
function build4(){
const mapping={"h$":{"local":"h$","imported":"h$","module":"chunk-q80zaav8.js"},"oB":{"local":"oB","imported":"oB","module":"chunk-x954y317.js"},"OQn":{"local":"OQn","imported":"homedir","module":"os"},"T_t":{"local":"T_t","imported":"T_t","module":"chunk-nankzm0s.js"},"$f":{"local":"$f","imported":"$f","module":"chunk-nankzm0s.js"},"Uc":{"local":"Uc","imported":"Uc","module":"chunk-nankzm0s.js"},"lr":{"local":"lr","imported":"lr","module":"chunk-2ynta9xc.js"},"zf":{"local":"zf","imported":"zf","module":"chunk-q80zaav8.js"},"t":{"local":"t","imported":"t","module":"chunk-q80zaav8.js"},"l":{"local":"l","imported":"l","module":"chunk-c9me9cp7.js"},"q":{"local":"q","imported":"q","module":"chunk-bn3p37gv.js"},"Ee":{"local":"Ee","imported":"Ee","module":"chunk-bn3p37gv.js"},"cr":{"local":"cr","imported":"cr","module":"chunk-bn3p37gv.js"},"Q3":{"local":"Q3","imported":"Q3","module":"chunk-nankzm0s.js"},"Ff":{"local":"Ff","imported":"lstat","module":"fs/promises"},"Ad":{"local":"Ad","imported":"Ad","module":"chunk-7y84p8fv.js"},"Sa":{"local":"Sa","imported":"Sa","module":"chunk-x954y317.js"},"Qh":{"local":"Qh","imported":"normalize","module":"path"},"_u":{"local":"_u","imported":"dirname","module":"path"},"vm":{"local":"vm","imported":"sep","module":"path"},"bs":{"local":"bs","imported":"bs","module":"chunk-2ynta9xc.js"},"d3":{"local":"d3","imported":"d3","module":"chunk-7y84p8fv.js"},"IH":{"local":"IH","imported":"IH","module":"chunk-7y84p8fv.js"},"O":{"local":"O","imported":"O","module":"chunk-amhtwhch.js"},"ul":{"local":"ul","imported":"realpath","module":"fs/promises"},"zg":{"local":"zg","imported":"basename","module":"path"},"d1e":{"local":"d1e","imported":"d1e","module":"chunk-ywmxa060.js"},"Oxe":{"local":"Oxe","imported":"Oxe","module":"chunk-7y84p8fv.js"},"Je":{"local":"Je","imported":"Je","module":"chunk-fmv8bhm3.js"},"vt":{"local":"vt","imported":"vt","module":"chunk-2ynta9xc.js"},"yn":{"local":"yn","imported":"yn","module":"chunk-fmv8bhm3.js"},"bl":{"local":"bl","imported":"bl","module":"chunk-sr35ha4n.js"},"ee":{"local":"ee","imported":"ee","module":"chunk-f2n7vgt8.js"},"yFe":{"local":"yFe","imported":"yFe","module":"chunk-mphp7acd.js"},"_Fe":{"local":"_Fe","imported":"_Fe","module":"chunk-mphp7acd.js"},"P7":{"local":"P7","imported":"P7","module":"chunk-mphp7acd.js"},"dGn":{"local":"dGn","imported":"dGn","module":"chunk-mphp7acd.js"},"Dce":{"local":"Dce","imported":"Dce","module":"chunk-mphp7acd.js"},"Nte":{"local":"Nte","imported":"Nte","module":"chunk-mphp7acd.js"},"TO":{"local":"TO","imported":"TO","module":"chunk-mphp7acd.js"},"Jwt":{"local":"Jwt","imported":"Jwt","module":"chunk-mphp7acd.js"}};
const ports=new Proxy(Object.create(null),{get:(_,name)=>{const p=mapping[name];if(!p)throw Error('Missing original dependency '+String(name));return dependency(p.module,p.imported)}});
const bridge={get WorktreeExitDialog(){return host.WorktreeExitDialog??made['chunk-f2cpzzp9.js'].vX},requireOriginal287(spec){if(spec!=='/$bunfs/root/chunk-waq70p5c.js')throw Error('Unknown session namespace '+spec);return host.storage}};
function lq(e, n) { (0, ports["T_t"])(e); let r = e !== null ? (() => { let { liveLaunchAnchor: s, originalChangeset: g, ...h } = e; return h; })() : void 0; (0, ports["$f"])((s) => ({ ...s, activeWorktreeSession: r }), n); }
async function YDt(e, n) { try {
    if (await (0, ports["yFe"])(await (0, ports["_Fe"])(e, n)))
        await (0, ports["P7"])(e, n);
}
catch (r) {
    (0, ports["t"])(`[worktree] left the lock on ${e} \u2014 cannot read the worktree registry to verify ownership (${(0, ports["l"])(r)})`);
} }
function CAe(e, n) { if (!(0, ports["h$"])(e))
    return e; return (0, ports["oB"])(n) ?? (0, ports["OQn"])(); }
async function Sye(e) { let n = (0, ports["Uc"])(); if (!n)
    return; try {
    let { worktreePath: r, originalCwd: s, worktreeBranch: g } = n, h = CAe(s, r), b = (0, ports["lr"])(h) ?? h;
    try {
        (0, ports["zf"])(h);
    }
    catch (w) {
        (0, ports["t"])(`Could not chdir to original directory while keeping worktree: ${w}`);
    }
    if (!n.enteredExisting && !n.hookBased)
        await YDt(r, b);
    lq(null, e), (0, ports["t"])(`Linked worktree preserved at: ${r}${g ? ` on branch: ${g}` : ""}`), (0, ports["t"])(`You can continue working there by running: cd ${r}`);
}
catch (r) {
    (0, ports["t"])(`Error keeping worktree: ${r}`, { level: "error" });
} }
async function LTe(e, n) { let r = (0, ports["Uc"])(); if (!r)
    return !0; try {
    let { worktreePath: s, originalCwd: g, worktreeBranch: h, hookBased: b } = r, w = CAe(g, s), D = (0, ports["lr"])(w) ?? w;
    try {
        (0, ports["zf"])(w);
    }
    catch (z) {
        (0, ports["t"])(`Could not chdir to original directory while cleaning up worktree: ${z}`);
    }
    if (r.enteredExisting)
        return lq(null, e), !0;
    let j = !1;
    if (b) {
        let z = await (0, ports["dGn"])({ id: (0, ports["q"])(), project: { originalCwd: (0, ports["Ee"])(), projectRoot: (0, ports["cr"])() } }, s, { storageV5: e, credentials: n });
        switch (z.kind) {
            case "removed":
                j = !0, (0, ports["t"])(`Removed hook-based worktree at: ${s}`);
                break;
            case "not_configured":
                (0, ports["t"])(`No WorktreeRemove hook configured; falling back to git worktree remove for: ${s}`);
                break;
            case "failed": return (0, ports["t"])(`WorktreeRemove hook ${z.summary}; kept worktree at: ${s}`, { level: "warn" }), (0, ports["Q3"])(), lq(null, e), !1;
        }
    }
    if (!j) {
        let z;
        try {
            z = await (0, ports["_Fe"])(s, D);
        }
        catch (bt) {
            if (await (0, ports["Ff"])(s).then(() => !0, () => !1))
                return (0, ports["t"])(`cleanupWorktree: kept ${s} \u2014 cannot read the worktree registry to verify lock ownership (${(0, ports["l"])(bt)})`, { level: "warn" }), (0, ports["Q3"])(), lq(null, e), !1;
            (0, ports["t"])(`cleanupWorktree: worktree registry unreadable and ${s} is already gone (${(0, ports["l"])(bt)}); continuing to the already-removed path`);
        }
        if (!await (0, ports["yFe"])(z))
            return (0, ports["t"])(`cleanupWorktree: kept ${s} \u2014 locked by another live Claude Code process, or with a reason we did not write (${z || "no reason"})`, { level: "warn" }), (0, ports["Q3"])(), lq(null, e), !1;
        await (0, ports["P7"])(s, D);
        let K = b ? null : (0, ports["oB"])(s), he = (0, ports["Ad"])(s), _e = (0, ports["oB"])(he);
        if (K === null && (0, ports["Sa"])(he))
            return (0, ports["t"])(`Kept worktree \u2014 ${s} carries a dot segment`, { level: "warn" }), (0, ports["Q3"])(), lq(null, e), !1;
        let ke = (0, ports["Qh"])(he), be = (0, ports["Ad"])((0, ports["Qh"])(w)), ve = [], Te = (0, ports["lr"])(w);
        while (Te !== null) {
            ve.push(Te);
            let bt = (0, ports["_u"])(Te), ht = bt === Te ? null : (0, ports["lr"])(bt);
            Te = ht !== null && ht.length < Te.length && Te.startsWith(ht.endsWith((0, ports["vm"])) ? ht : ht + (0, ports["vm"])) ? ht : null;
        }
        let xe = [...new Set([(0, ports["bs"])(w), ...ve].filter((bt) => bt !== null).map((bt) => (0, ports["Ad"])((0, ports["Qh"])(bt)))), be].sort((bt, ht) => bt.length - ht.length), Pe = _e === null ? null : (0, ports["Ad"])((0, ports["Qh"])(_e)), $e = xe.some((bt) => (0, ports["d3"])(ke).startsWith((0, ports["d3"])(bt) + (0, ports["vm"]))), Ne = xe.find((bt) => ke.startsWith(bt + (0, ports["vm"]))), We = _e !== null && Pe !== null && (Ne === void 0 ? !$e : Ne.startsWith(Pe + (0, ports["vm"]))) ? _e : Ne, qe = K !== null ? "clear" : await (0, ports["IH"])(We === _e ? he : ke, We !== void 0 ? We === _e && Ne === void 0 ? (0, ports["_u"])(We) : We : $e ? void 0 : (0, ports["_u"])(ke));
        if (qe !== "clear" && qe !== "missing")
            return (0, ports["t"])(`Kept linked worktree \u2014 ${s} is a link, or cannot be probed`, { level: "warn" }), (0, ports["Q3"])(), lq(null, e), !1;
        let Qe = !1;
        if (b && (0, ports["O"])() === "windows") {
            let bt = await (0, ports["Dce"])(D).catch(() => null);
            if (bt != null) {
                Qe = !0;
                let ht = await (0, ports["ul"])(s).catch(() => s);
                for (let kt of bt)
                    if (ht === await (0, ports["ul"])(kt.worktreePath).catch(() => kt.worktreePath)) {
                        Qe = !1;
                        break;
                    }
            }
        }
        let Ze, et = "";
        if (K !== null)
            Ze = await (0, ports["Nte"])(K, h ?? (0, ports["zg"])(s), s, { byPath: !0, deregisterOnKeep: !1 });
        else if (qe === "missing")
            Ze = (await (0, ports["d1e"])((0, ports["bs"])(D) ?? D, he)).outcome === "dropped";
        else {
            if (!Qe && !await (0, ports["Oxe"])(he))
                return (0, ports["t"])(`Kept linked worktree \u2014 unremovable reparse point in ${s}`, { level: "warn" }), (0, ports["Q3"])(), lq(null, e), !1;
            let bt = await (0, ports["Je"])((0, ports["vt"])(), [...(0, ports["yn"]), "worktree", "remove", "--force", he], { cwd: D, env: (0, ports["bl"])(D) });
            Ze = bt.code === 0, et = bt.stderr;
        }
        if (!Ze && await (0, ports["Ff"])(s).then(() => !0, () => !1))
            return (0, ports["t"])(`Failed to remove linked worktree, kept ${s}: ${et.trim()}`, { level: "warn" }), (0, ports["Q3"])(), lq(null, e), !1;
        (0, ports["t"])(`Removed linked worktree at: ${s}`), await (0, ports["TO"])(D);
    }
    if ((0, ports["Q3"])(), lq(null, e), !b && h)
        await (0, ports["ee"])(100), await (0, ports["Jwt"])(D, h, { logSuccess: !0 });
    return (0, ports["t"])("Linked worktree cleaned up completely"), !0;
}
catch (s) {
    return (0, ports["t"])(`Error cleaning up worktree: ${s}`, { level: "error" }), !1;
} }
return {lq,YDt,CAe,Sye,LTe};
}
made["chunk-w6n3znx4.js"]=build0();
made["chunk-f10wcx31.js"]=build1();
made["chunk-f2cpzzp9.js"]=build2();
made["chunk-ff8yrzyn.js"]=build3();
made["chunk-mphp7acd.js"]=build4();
return {call:made['chunk-w6n3znx4.js'].Ne,ExitFlow:made['chunk-f2cpzzp9.js'].jEt,WorktreeExitDialog:made['chunk-f2cpzzp9.js'].vX,Aae:made['chunk-ff8yrzyn.js'].Aae};
}
