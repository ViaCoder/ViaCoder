export function aUo<T>(memory:T, tools:readonly {readonly name:string}[]):T;

export type OfficialSystemComposerHelper287Ports = {
  Be: (model: string) => string;
  Fn: (value: string) => string;
  Ji: (value: unknown) => value is Record<string, unknown>;
  Jr: string;
  Kd: () => Readonly<Record<string, unknown>> | null | undefined;
  Le: (value: string) => boolean;
  Neo: () => boolean;
  Ot: string;
  PE: string;
  Sn: string;
  Ue: string;
  WC: (model: string, effort: import("../../utils/effort.js").EffortLevel | number | undefined) => import("../../utils/effort.js").EffortLevel | number | undefined;
  Yor: string;
  a: Readonly<Record<string, string | boolean | undefined>>;
  co: string;
  dt: string;
  fk: string;
  gM: () => boolean;
  i: (event: string, payload: Readonly<Record<string, unknown>>) => void;
  k: { (name: string, fallback: string): string; (name: string, fallback: boolean): boolean };
  kZr: () => import("../../utils/model/officialEffortOwner287/native.js").EffortOwnerSnapshotSource287 | undefined;
  kd: (context: import("../../utils/model/officialEffortOwner287/native.js").EffortOwnerSnapshotSource287, model: string | undefined) => import("../../utils/effort.js").EffortLevel | number | undefined;
  lo: (feature: string, fallback: boolean) => boolean;
  me: (effort: import("../../utils/effort.js").EffortLevel | number | undefined) => string | number | undefined;
  p8: (model: string | undefined) => boolean;
  t: (message: string) => void;
  ujo: (model: string) => boolean;
  wt: string;
  xQn: (model: string | undefined) => boolean;
};

export type OfficialBrookHeronPorts287 = Pick<OfficialSystemComposerHelper287Ports, 'Be' | 'Fn' | 'Ji' | 'Kd' | 'WC' | 'i' | 'kZr' | 'kd' | 'me'>;
export type OfficialBrookHeron287 = { Pao(model: string): string | null };
export function createOfficialBrookHeron287(ports: OfficialBrookHeronPorts287): OfficialBrookHeron287;

export type OfficialSystemComposerHelpers287 = {
  Bao(toolNames: ReadonlySet<string>): string;
  Cao(): string | null;
  Pao(model: string): string | null;
  Wao(settings: object | null, model: string | undefined): string;
  Iao(settings: object | null): string;
  aUo<T>(memory: T, tools: readonly {readonly name:string}[]): T;
};

export function createOfficialSystemComposerHelpers287(ports: OfficialSystemComposerHelper287Ports): OfficialSystemComposerHelpers287;
