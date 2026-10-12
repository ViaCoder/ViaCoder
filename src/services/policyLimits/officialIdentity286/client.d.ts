export interface OfficialPolicyClient286Ports {
  readonly _1t: unknown
  readonly _t: unknown
  readonly $4n: unknown
  readonly a: unknown
  readonly aBr: unknown
  readonly ae: unknown
  readonly Amn: unknown
  readonly boe: unknown
  readonly BS: unknown
  readonly BUt: unknown
  readonly c: unknown
  readonly C1e: unknown
  readonly c1t: unknown
  readonly C8e: unknown
  readonly cn: unknown
  readonly ct: unknown
  readonly d: unknown
  readonly D$o: unknown
  readonly d1t: unknown
  readonly dc: unknown
  readonly Dft: unknown
  readonly Dmn: unknown
  readonly E1e: unknown
  readonly e1o: unknown
  readonly e5n: unknown
  readonly eBr: unknown
  readonly eBt: unknown
  readonly EM: unknown
  readonly et: unknown
  readonly F: unknown
  readonly F4n: unknown
  readonly Fa: unknown
  readonly fBr: unknown
  readonly G: unknown
  readonly g1t: unknown
  readonly gE: unknown
  readonly h1t: unknown
  readonly H9n: unknown
  readonly Hft: unknown
  readonly Hmn: unknown
  readonly ht: unknown
  readonly i: unknown
  readonly I_e: unknown
  readonly ih: unknown
  readonly ip: unknown
  readonly it: unknown
  readonly IUo: unknown
  readonly j2o: unknown
  readonly j4n: unknown
  readonly J4n: unknown
  readonly jD: unknown
  readonly kmn: unknown
  readonly Kne: unknown
  readonly l: unknown
  readonly l0: unknown
  readonly l1t: unknown
  readonly lBr: unknown
  readonly Lmn: unknown
  readonly m: unknown
  readonly me: unknown
  readonly mh: unknown
  readonly MM: unknown
  readonly Mmn: unknown
  readonly N: unknown
  readonly N4n: unknown
  readonly n5n: unknown
  readonly Ng: unknown
  readonly Nmn: unknown
  readonly o9: unknown
  readonly oBr: unknown
  readonly Oe: unknown
  readonly Oft: unknown
  readonly Omn: unknown
  readonly Ot: unknown
  readonly p: unknown
  readonly P_e: unknown
  readonly Pft: unknown
  readonly Pmt: unknown
  readonly pn: unknown
  readonly Po: unknown
  readonly pRe: unknown
  readonly PUo: unknown
  readonly q4n: unknown
  readonly QD: unknown
  readonly qT: unknown
  readonly qUr: unknown
  readonly QUr: unknown
  readonly R: unknown
  readonly r5n: unknown
  readonly rBr: unknown
  readonly Rft: unknown
  readonly rGo: unknown
  readonly rt: unknown
  readonly S: unknown
  readonly S1t: unknown
  readonly sBr: unknown
  readonly sgt: unknown
  readonly t: unknown
  readonly T1e: unknown
  readonly t1o: unknown
  readonly T8e: unknown
  readonly T9r: unknown
  readonly tBt: unknown
  readonly Tje: unknown
  readonly Tmn: unknown
  readonly tt: unknown
  readonly u1t: unknown
  readonly U4n: unknown
  readonly uBt: unknown
  readonly uE: unknown
  readonly v: unknown
  readonly V4n: unknown
  readonly VI: unknown
  readonly VUr: unknown
  readonly W2o: unknown
  readonly w8e: unknown
  readonly Wc: unknown
  readonly WUr: unknown
  readonly X4n: unknown
  readonly xm: unknown
  readonly Xne: unknown
  readonly xq: unknown
  readonly Xs: unknown
  readonly XUr: unknown
  readonly XUt: unknown
  readonly Xy: unknown
  readonly y: unknown
  readonly y1t: unknown
  readonly Y4n: unknown
  readonly yb: unknown
  readonly Yne: unknown
  readonly yue: unknown
  readonly z: unknown
  readonly Z: unknown
  readonly z4n: unknown
  readonly Z4n: unknown
  readonly z6: unknown
  readonly Ze: unknown
  readonly ZSe: unknown
  readonly ZUr: unknown
  readonly zy: unknown
}

export interface OfficialPolicyClient286Instance {
  readonly storageV5: unknown
  readonly credentials: unknown
  readonly oauthRefreshLatch: { attempted: boolean; lastOutcome?: string }
  readonly abortController: AbortController
  runFetchCycle(reason: string, trigger?: string, awaited?: boolean): Promise<unknown>
  fetchAndLoad(reason: string, trigger?: string, awaited?: boolean): Promise<unknown>
  adoptStartupServices(services: { storageV5?: unknown; credentials?: import('../../../utils/officialSecureStorage/runtime.js').CredentialStore }): 'nothing to adopt' | 'already composed' | 'already used' | 'adopted'
  load(options?: { startupAwaited?: boolean }): Promise<unknown>
  refresh(options?: { observedBoundary?: boolean }): Promise<unknown>
  stop(): void
  stopBackgroundPolling(): void
}
export type OfficialPolicyClient286Constructor = new (options?: { storageV5?: unknown; credentials?: import('../../../utils/officialSecureStorage/runtime.js').CredentialStore }) => OfficialPolicyClient286Instance
export declare const OFFICIAL_POLICY_CLIENT_286_PORTS: readonly [
  {
    "local": "_1t",
    "imported": "_1t",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "_t",
    "imported": "_t",
    "module": "/$bunfs/root/chunk-yx145v00.js"
  },
  {
    "local": "$4n",
    "imported": "$4n",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "a",
    "imported": "a",
    "module": "/$bunfs/root/chunk-07mxqtdh.js"
  },
  {
    "local": "aBr",
    "imported": "aBr",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "ae",
    "imported": "ae",
    "module": "/$bunfs/root/chunk-yx145v00.js"
  },
  {
    "local": "Amn",
    "imported": "Amn",
    "module": "/$bunfs/root/chunk-p0q9w7rx.js"
  },
  {
    "local": "boe",
    "imported": "boe",
    "module": "/$bunfs/root/chunk-9qmnd54c.js"
  },
  {
    "local": "BS",
    "imported": "BS",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "BUt",
    "imported": "BUt",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "c",
    "imported": "c",
    "module": "/$bunfs/root/chunk-b006b4v9.js"
  },
  {
    "local": "C1e",
    "imported": "C1e",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "c1t",
    "imported": "c1t",
    "module": "/$bunfs/root/chunk-bnmhbev4.js"
  },
  {
    "local": "C8e",
    "imported": "C8e",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "cn",
    "imported": "cn",
    "module": "/$bunfs/root/chunk-0shqxty0.js"
  },
  {
    "local": "ct",
    "imported": "ct",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "d",
    "imported": "d",
    "module": "/$bunfs/root/chunk-j72sz16r.js"
  },
  {
    "local": "D$o",
    "imported": "D$o",
    "module": "/$bunfs/root/chunk-btymzz0s.js"
  },
  {
    "local": "d1t",
    "imported": "d1t",
    "module": "/$bunfs/root/chunk-bnmhbev4.js"
  },
  {
    "local": "dc",
    "imported": "dc",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "Dft",
    "imported": "Dft",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "Dmn",
    "imported": "Dmn",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "E1e",
    "imported": "E1e",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "e1o",
    "imported": "e1o",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "e5n",
    "imported": "e5n",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "eBr",
    "imported": "eBr",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "eBt",
    "imported": "eBt",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "EM",
    "imported": "EM",
    "module": "/$bunfs/root/chunk-x5pmvzy7.js"
  },
  {
    "local": "et",
    "imported": "unlink",
    "module": "fs/promises"
  },
  {
    "local": "F",
    "imported": "F",
    "module": "/$bunfs/root/chunk-r65ydf8e.js"
  },
  {
    "local": "F4n",
    "imported": "F4n",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "Fa",
    "imported": "Fa",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "fBr",
    "imported": "fBr",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "G",
    "imported": "G",
    "module": "/$bunfs/root/chunk-h730kz80.js"
  },
  {
    "local": "g1t",
    "imported": "g1t",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "gE",
    "imported": "gE",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "h1t",
    "imported": "h1t",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "H9n",
    "imported": "H9n",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "Hft",
    "imported": "Hft",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "Hmn",
    "imported": "Hmn",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "ht",
    "imported": "ht",
    "module": "/$bunfs/root/chunk-bkbr91zs.js"
  },
  {
    "local": "i",
    "imported": "i",
    "module": "/$bunfs/root/chunk-kgb116ys.js"
  },
  {
    "local": "I_e",
    "imported": "I_e",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "ih",
    "imported": "ih",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "ip",
    "imported": "ip",
    "module": "/$bunfs/root/chunk-9qmnd54c.js"
  },
  {
    "local": "it",
    "imported": "writeFile",
    "module": "fs/promises"
  },
  {
    "local": "IUo",
    "imported": "IUo",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "j2o",
    "imported": "j2o",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "j4n",
    "imported": "j4n",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "J4n",
    "imported": "J4n",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "jD",
    "imported": "jD",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "kmn",
    "imported": "kmn",
    "module": "/$bunfs/root/chunk-p0q9w7rx.js"
  },
  {
    "local": "Kne",
    "imported": "Kne",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "l",
    "imported": "l",
    "module": "/$bunfs/root/chunk-h730kz80.js"
  },
  {
    "local": "l0",
    "imported": "l0",
    "module": "/$bunfs/root/chunk-xwcdxthd.js"
  },
  {
    "local": "l1t",
    "imported": "l1t",
    "module": "/$bunfs/root/chunk-p0q9w7rx.js"
  },
  {
    "local": "lBr",
    "imported": "lBr",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "Lmn",
    "imported": "Lmn",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "m",
    "imported": "m",
    "module": "/$bunfs/root/chunk-1zmpymz2.js"
  },
  {
    "local": "me",
    "imported": "me",
    "module": "/$bunfs/root/chunk-b006b4v9.js"
  },
  {
    "local": "mh",
    "imported": "mh",
    "module": "/$bunfs/root/chunk-9qmnd54c.js"
  },
  {
    "local": "MM",
    "imported": "MM",
    "module": "/$bunfs/root/chunk-m0qf8etz.js"
  },
  {
    "local": "Mmn",
    "imported": "Mmn",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "N",
    "imported": "N",
    "module": "/$bunfs/root/chunk-abjdv98v.js"
  },
  {
    "local": "N4n",
    "imported": "N4n",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "n5n",
    "imported": "n5n",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "Ng",
    "imported": "Ng",
    "module": "/$bunfs/root/chunk-0sv6vt2c.js"
  },
  {
    "local": "Nmn",
    "imported": "Nmn",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "o9",
    "imported": "o9",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "oBr",
    "imported": "oBr",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "Oe",
    "imported": "Oe",
    "module": "/$bunfs/root/chunk-86t591ay.js"
  },
  {
    "local": "Oft",
    "imported": "Oft",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "Omn",
    "imported": "Omn",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "Ot",
    "imported": "Ot",
    "module": "/$bunfs/root/chunk-52qbm57h.js"
  },
  {
    "local": "p",
    "imported": "p",
    "module": "/$bunfs/root/chunk-1zmpymz2.js"
  },
  {
    "local": "P_e",
    "imported": "P_e",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "Pft",
    "imported": "Pft",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "Pmt",
    "imported": "Pmt",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "pn",
    "imported": "pn",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "Po",
    "imported": "Po",
    "module": "/$bunfs/root/chunk-178b5qmp.js"
  },
  {
    "local": "pRe",
    "imported": "pRe",
    "module": "/$bunfs/root/chunk-bnmhbev4.js"
  },
  {
    "local": "PUo",
    "imported": "PUo",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "q4n",
    "imported": "q4n",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "QD",
    "imported": "QD",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "qT",
    "imported": "qT",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "qUr",
    "imported": "qUr",
    "module": "/$bunfs/root/chunk-xqw8n0a5.js"
  },
  {
    "local": "QUr",
    "imported": "QUr",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "R",
    "imported": "R",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "r5n",
    "imported": "r5n",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "rBr",
    "imported": "rBr",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "Rft",
    "imported": "Rft",
    "module": "/$bunfs/root/chunk-p0q9w7rx.js"
  },
  {
    "local": "rGo",
    "imported": "rGo",
    "module": "/$bunfs/root/chunk-efdc0n9h.js"
  },
  {
    "local": "rt",
    "imported": "rt",
    "module": "/$bunfs/root/chunk-jeqrhtd1.js"
  },
  {
    "local": "S",
    "imported": "S",
    "module": "/$bunfs/root/chunk-yx145v00.js"
  },
  {
    "local": "S1t",
    "imported": "S1t",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "sBr",
    "imported": "sBr",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "sgt",
    "imported": "sgt",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "t",
    "imported": "t",
    "module": "/$bunfs/root/chunk-yx145v00.js"
  },
  {
    "local": "T1e",
    "imported": "T1e",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "t1o",
    "imported": "t1o",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "T8e",
    "imported": "T8e",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "T9r",
    "imported": "T9r",
    "module": "/$bunfs/root/chunk-jeqrhtd1.js"
  },
  {
    "local": "tBt",
    "imported": "tBt",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "Tje",
    "imported": "Tje",
    "module": "/$bunfs/root/chunk-h730kz80.js"
  },
  {
    "local": "Tmn",
    "imported": "Tmn",
    "module": "/$bunfs/root/chunk-p0q9w7rx.js"
  },
  {
    "local": "tt",
    "imported": "utimes",
    "module": "fs/promises"
  },
  {
    "local": "u1t",
    "imported": "u1t",
    "module": "/$bunfs/root/chunk-bnmhbev4.js"
  },
  {
    "local": "U4n",
    "imported": "U4n",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "uBt",
    "imported": "uBt",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "uE",
    "imported": "uE",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "v",
    "imported": "v",
    "module": "/$bunfs/root/chunk-h730kz80.js"
  },
  {
    "local": "V4n",
    "imported": "V4n",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "VI",
    "imported": "VI",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "VUr",
    "imported": "VUr",
    "module": "/$bunfs/root/chunk-bnmhbev4.js"
  },
  {
    "local": "W2o",
    "imported": "W2o",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "w8e",
    "imported": "w8e",
    "module": "/$bunfs/root/chunk-p0q9w7rx.js"
  },
  {
    "local": "Wc",
    "imported": "Wc",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "WUr",
    "imported": "WUr",
    "module": "/$bunfs/root/chunk-p0q9w7rx.js"
  },
  {
    "local": "X4n",
    "imported": "X4n",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "xm",
    "imported": "xm",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "Xne",
    "imported": "Xne",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "xq",
    "imported": "xq",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "Xs",
    "imported": "Xs",
    "module": "/$bunfs/root/chunk-h730kz80.js"
  },
  {
    "local": "XUr",
    "imported": "XUr",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "XUt",
    "imported": "XUt",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "Xy",
    "imported": "Xy",
    "module": "/$bunfs/root/chunk-majxx0zh.js"
  },
  {
    "local": "y",
    "imported": "y",
    "module": "/$bunfs/root/chunk-1zmpymz2.js"
  },
  {
    "local": "y1t",
    "imported": "y1t",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "Y4n",
    "imported": "Y4n",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "yb",
    "imported": "yb",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "Yne",
    "imported": "Yne",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "yue",
    "imported": "yue",
    "module": "/$bunfs/root/chunk-az9wtwfg.js"
  },
  {
    "local": "z",
    "imported": "z",
    "module": "/$bunfs/root/chunk-abjdv98v.js"
  },
  {
    "local": "Z",
    "imported": "Z",
    "module": "/$bunfs/root/chunk-52qbm57h.js"
  },
  {
    "local": "z4n",
    "imported": "z4n",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "Z4n",
    "imported": "Z4n",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "z6",
    "imported": "z6",
    "module": "/$bunfs/root/chunk-p0q9w7rx.js"
  },
  {
    "local": "Ze",
    "imported": "statSync",
    "module": "fs"
  },
  {
    "local": "ZSe",
    "imported": "ZSe",
    "module": "/$bunfs/root/chunk-7z735pk3.js"
  },
  {
    "local": "ZUr",
    "imported": "ZUr",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  },
  {
    "local": "zy",
    "imported": "zy",
    "module": "/$bunfs/root/chunk-jfkd2b5a.js"
  }
][]
export declare function createOfficialPolicyClient286(ports: OfficialPolicyClient286Ports): { LUr: OfficialPolicyClient286Constructor }
