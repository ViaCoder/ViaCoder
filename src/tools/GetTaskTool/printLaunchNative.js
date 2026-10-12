// Pinned 2.1.287 print singleShot/inputClosed source producer slice and full helper closure. Host owners are explicit ports.
function module0(imports) {
    const n = imports["n"];
    function veo({ hasStreamingInput: e, sdkUrl: t }) { return !e && !t; }
    ;
    function Ceo(e) { n().host.launchOptions.replaceSingleShotPrintSession(e); }
    ;
    function zfe() { return n().host.launchOptions.singleShotPrintSession(); }
    ;
    function Aeo() { n().host.launchOptions.markPrintInputClosed(); }
    ;
    function k3t() { return n().host.launchOptions.printInputClosed(); }
    ;
    return { veo, Ceo, zfe, Aeo, k3t };
}
function module1(imports) {
    const Ceo = imports["Ceo"];
    const veo = imports["veo"];
    function initializePrintTaskLaunch287(r, R) {
        let de = typeof r !== "string";
        Ceo(veo({ hasStreamingInput: de, sdkUrl: R.sdkUrl }));
    }
    ;
    return { initializePrintTaskLaunch287 };
}
export function createPrintTaskLaunchNative287(ports) {
    for (const name of ["executionContext"])
        if (ports[name] === undefined)
            throw Error('Missing task registration host port: ' + name);
    const m0 = module0({ "n": ports["executionContext"] });
    const m1 = module1({ "Ceo": m0["Ceo"], "veo": m0["veo"] });
    return { initialize: m1["initializePrintTaskLaunch287"], singleShot: m0["zfe"], markInputClosed: m0["Aeo"], inputClosed: m0["k3t"] };
}
