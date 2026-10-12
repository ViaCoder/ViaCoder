# 源码 + Bun 发行安装（非 standalone/native compile）

## 审计结论与边界

- `bin/cc` 原来未解析软链接；现在解析绝对/相对链接，并用 `cd -P` 锁定实际发行路径。
  `current` 原子切换后，已启动进程的入口和后续 lazy imports 仍来自旧发行。
  不改变调用者 cwd、HOME、CLAUDE_CONFIG_DIR 或 OAuth Keychain service。
- README 的“原生包标识”和 `npm install -g .` 不是经验证的独立源码发行流程，已更正。
- `.work/platform-pkgs` / `platform-unpacked` 是官方四平台原生包；不是本仓源码编译产物。
  `.work/package/install.cjs` 替换官方 native 入口；`.work/clawgod-install.sh` 含下载、补丁、
  全局替换逻辑。均未运行，也不复用其网络/就地覆盖策略。
- 当前没有经四平台验证的本仓 native compile；不复制官方 binary 冒充本仓构建。
- 官方 native 整包仅用于离线差分基准；发布器不携带或启动官方整包，不以它替代本仓源码及本地定制。
- 若目标是“保留本地源码功能，同时复用官方 Bun/TLS/HTTP/2”，向目标平台提供公开的
  Bun 1.4.2 并以它启动源码；官方 `claude` 的 `__BUN/__bun` 或 ELF 原生段不能拆出后
  直接拼接。当前四平台官方整包检查均显示 `bun-v1.4.3`，它只作为离线差分基准，发布器
  不把它当作可插拔 runtime。
- 公开 `bin/viacoder` 委托的内部 `bin/cc` 已传 `--feature=TRANSCRIPT_CLASSIFIER`，
  canonical Web/SDK worker 也携带该开关，恢复公开 classifier 代码；账号、模型、设置等
  运行时资格门控仍生效。入口未启用 `BRIDGE_MODE`，Bridge 当前不作为发行支持入口。
  `bridgeMain.spawnScriptArgs()` 仍只传 argv[1]，
  将来启用需显式加本仓 preload/runtime config 的实际路径，不能转发全部 execArgv。
  Chrome sourceEntrypoint 已显式传 preload；本轮不改其实现。

## 六个平台

在**目标平台本机**使用公开 Bun 1.4.2。macOS/Linux 使用 Bash 和 tar；Windows 使用原生 PowerShell 入口。Linux 仅 glibc >= 2.26，
不支持 musl/Android。macOS 还须满足所用 Bun 与预编译依赖的系统要求；各机器仍须实机验收。
不要把开发机 node_modules 复制给另一架构，不做 `--cpu` 交叉安装后伪称已运行验收。

| 目标 Bun 进程 | ripgrep optional 包（1.18.0） | sharp（0.34.5）/ libvips（1.2.4） |
|---|---|---|
| darwin-x64（amd64） | @vscode/ripgrep-darwin-x64 | @img/sharp-darwin-x64 / @img/sharp-libvips-darwin-x64 |
| darwin-arm64 | @vscode/ripgrep-darwin-arm64 | @img/sharp-darwin-arm64 / @img/sharp-libvips-darwin-arm64 |
| linux-x64（amd64） | @vscode/ripgrep-linux-x64 | @img/sharp-linux-x64 / @img/sharp-libvips-linux-x64 |
| linux-arm64 | @vscode/ripgrep-linux-arm64 | @img/sharp-linux-arm64 / @img/sharp-libvips-linux-arm64 |
| win32-x64（amd64） | @vscode/ripgrep-win32-x64 | @img/sharp-win32-x64（无独立 libvips 包） |
| win32-arm64 | @vscode/ripgrep-win32-arm64 | @img/sharp-win32-arm64（无独立 libvips 包） |

Windows 本地一键入口：`./install/cc-release.ps1 local --offline`（已有本机依赖缓存），或明确允许依赖下载时使用 `--online`。两者均复用现有 pack/install、完整性校验及原子切换；不配置认证或启用服务。原生 Windows SSH 不走 POSIX 部署脚本。当前只完成源码合同验收，尚无 PowerShell 宿主及 Windows 实机安装证据；六目标映射不等于六平台实机通过。完整用法见 `RELEASE-ONE-COMMAND.md`。

源码包共用一份，目标机用 frozen bun.lock 安装 production + optional 依赖。
不省略 optional；不执行 lifecycle scripts；不调用 npm rebuild/node-gyp；缺预编译依赖则失败。
验证会实际加载 sharp 并 PNG roundtrip、执行 rg --version、加载 CLI --version/--bare --help，
并在最终物理发行路径、离线 guard 下编译/读取 Web 的 HTML、JS 与 CSS 入口资源。
不宣称仅 --version 成功就等于完整交互/模型/远程功能通过。

## 打包（无网络，无认证复制）

```sh
BUN_BIN=/absolute/path/to/bun ./install/cc-install pack "$PWD" ../.work/releases
```

`packaging/files.json` 指定固定文件和 src/stubs 源码树；生成的 `release-manifest.json`
逐项列出**全部精确路径、SHA256、执行权限**，安装时逐项核验并拒绝额外文件、symlink、
路径穿越或 package/lock 不一致。只打当前工作副本，包含尚未提交源码，不改 git。
固定版本依赖的 Bun `patchedDependencies` 声明修复文件也在 `patches/` 树中随包列入清单；
目标机的 frozen Bun 安装按锁应用补丁，不运行 postinstall 或手改 node_modules。
输出目录、tar.gz、外部 sha256。排除 `.env`（仅 `.env.example`）、`.git`、`node_modules`、
`.work`、认证目录/配置、tests、测试生成物；不扫描 HOME，不读取用户认证。
SHA256 是损坏检测，不是签名；必须从可信制作者独立核对 archive SHA256 后再解包运行。

## 目标机安装 / 更新（手动流程示例）

先在目标机准备对应架构 Bun；安装器不联网下载运行时。核对发布方给出的 SHA256，
解压可信源码包到临时目录，然后：

```sh
# 默认离线；缓存缺失则失败，不转在线重试。
BUN_BIN=/absolute/path/to/bun ./install/cc-install install "$PWD" --offline --cache-dir /path/to/bun-cache
# 仅用户明确允许目标机拉取依赖时用 --online：
BUN_BIN=/absolute/path/to/bun ./install/cc-install install "$PWD" --online
# 默认命令，PATH 由用户自己配置（不修改 shell profile）：
export PATH="$HOME/.local/bin:$PATH"
viacoder --help
viacoder -c
viacoder --resume
```

默认软件根 `$HOME/.local/share/cc`、公开命令 `$HOME/.local/bin/viacoder`；可选 `--prefix` / `--bin-dir`。
若已有不属于本 prefix 的 viacoder，明确失败而不覆盖；无关cclaude不删除、不覆盖。系统编译器 cc 和其他无关 cc 一律不动。
已有 `HOME/.claude`、OAuth、历史、项目 cwd 按运行时原有路径继续使用；安装过程只在临时
HOME 做依赖安装/验证，不读取或导入开发机凭据。启动继承目标用户原有认证环境。

目标用户可以显式保留自己的外部环境文件；路径相对调用者 cwd 或绝对路径：

```sh
export CC_ENV_FILE="$HOME/.config/cc/provider.env"
viacoder
```

安装器不创建、读取或复制该文件，不把它放进 release。已有 CLAUDE_CONFIG_DIR 直接继承；
不要把已有 OAuth 用户强制切到示例 API Key。源码开发目录仍支持自己的根 `.env`；
发行包不带 `.env`，启动也不写任何认证迁移。验证忽略实际 .env/CC_ENV_FILE 并隔离 HOME；help 用 --bare 禁用 Keychain 预取，
网络与子进程防护仍启用。不是认证/远程服务验收。

公开入口是 `bin/viacoder`，Web使用`viacoder serve`；package.bin仅公开viacoder，不公开cclaude或cc。内部 `bin/cc` 保留原运行器，
安装后的viacoder链接指向同一prefix的 `current/bin/cc`，以兼容旧发行回滚且仍仅
用 current 原子切换。数据根 `.local/share/cc` 不变，不改认证/会话位置。
只有已存在本 prefix 的已验证 current，且旧 cc 链接精确指向其 `current/bin/cc`
（绝对或等价相对链接）时，安装器才在新发行验证/切换成功后删除该旧链接。
常规 cc 文件、目录、外部/悬空链接均不覆盖；迁移失败保留旧 cc。不会创建新的公开 cc。
local install 不管理或启用服务；one-command remote deploy 才会在受限生命周期内安装、
enable/restart 同一用户的 `cc-serve.service`，并要求 ready 响应匹配当前 release manifest。
活动状态未知、endpoint 不完整/过期或服务 ready 无法证明时部署失败并保留旧版。

## 原子切换 / 回滚

安装次序：校验清单 → 新 releases/.candidate-* → 目标架构依赖 → 离线 smoke → 重命名为
独立 release → 在最终物理路径再 smoke →（remote only）fresh 活动检查 → previous 指向旧版 → 原子 rename 新 current。
启动器锁定当前物理 release。旧版本不就地改写；生命周期只清理能由合法 manifest、ready stamp、managed-prefix 位置、非 current/previous 与进程占用扫描全部证明安全的 2.1.183/2.1.283。
未知/无法证明的目录保留并提示人工处理。更新失败恢复原 current/previous；候选阶段失败只清理本次仅用于验证、尚未公开的 candidate，已落地 release 保留。

```sh
BUN_BIN=/absolute/path/to/bun ./install/cc-install rollback
# 自定义位置时仍传相同 --prefix / --bin-dir
```

回滚重新核验 previous 的清单、平台标记和 smoke，不安装依赖，然后原子切回。
`.install-lock` 防并发并覆盖 fresh 活动检查与 service/ready 阶段；中断/崩溃留下锁时明确失败，需确认无安装进程后由用户处理该锁。
原子性承诺是同文件系统 symlink rename，不是断电 fsync 事务；previous/current 两个指针
不是一笔事务，中断窗口可能丢失 previous 的回滚选择，但 current 永远是整份旧/新发行。

## 历史离线安装测试（四平台阶段，非当前六平台完成证明）

```sh
bun test tests/release-install.test.ts
```

全部使用临时 HOME / prefix / cache。覆盖四平台参数和锁包、真实绝对/相对 symlink 启动、
保留 cwd/环境、原子切换后的 lazy import、失败不切换、回滚、清单污染、托管cclaude退役、并发锁。
依赖获取可在测试 seam 中模拟；CLI 没有 skip-validation/假成功开关。
本机 native/CLI smoke 单独记录；其他三平台只测试映射/安装协议，未宣称实机通过。

## 本轮交付记录（2026-09-26）

- 安装专项测试与本轮新增文件的独立 tsc、Bash 语法检查通过（最终计数见交付消息）。
- darwin-arm64 实际源码候选目录：ripgrep 执行、sharp PNG roundtrip、CLI --version /
  --bare --help 通过，最终物理位置二次验证后才更新临时 current。
- 此本机 smoke 的依赖获取用测试 seam 指向仓库现有 node_modules；未联网下载，
  不把 node_modules 放进发行 artifact。真实 CLI 用空 cache 的 --offline 安装明确失败，
  不推广、不遗留安装锁、不切换现有版本。四平台全新依赖安装仍需目标机实机验收。
- 旧全套日志中 symlink/lazy-import 的三项失败及 /var 与 /private/var 比较的一项失败已修。
  启动使用专用空 preload 的 runtime.bunfig.toml + 绝对 --preload；避免任意 cwd 下
  Bun 配置里的 ./preload.ts 找错目录。源码 tsconfig 按实际入口位置解析，不传 execArgv。
- 无部署、SSH、密码文件访问或 commit；未修改 package.json/bun.lock/package-lock.json。

### 官方 npm 来源修复

真实 online 验收前发现旧锁显式记录 npmmirror tarball 地址；仅设置默认 registry 并不构成
“只使用官方 npm”的保证。打包现在只把已知 npmmirror HTTPS origin 规范为 registry.npmjs.org，
其余版本、依赖关系、integrity 保持不变；未知 origin 直接失败。清单记录源锁 SHA256，
生成包中是规范后的 frozen lock。共享 package.json/锁文件和旧快照均不修改。
安装显式传 `--registry=https://registry.npmjs.org`，继续 `--frozen-lockfile --production
--ignore-scripts`。因此修复后生成的是新快照；旧快照不宣称符合官方来源要求。

2026-09-26 补验收：修正 registry 后的快照已完成 darwin-arm64 实际 `--online` frozen
生产安装（无 node_modules seam）；候选及移动后的最终目录均通过 RG/sharp/version/
`--bare --help`，再以保留的专用缓存在第二个全新 prefix 实际 `--offline` 重装通过。
工作区 `.work/release-acceptance-npmjs-f0A6ew/RESULT.md` 保存精确快照、路径和结果。
此次以原已接受快照加 packaging 修复生成新包；主线程最终集成后仍应重新打包验收。

## 历史本地部署预检审计（2026-09-27，四平台阶段，无部署、无新发行包）

新增 `probe` / `preflight`，都是只读操作，**没有 SSH、DNS、认证、模型请求或依赖下载**。
`administrator@HOST` 只是此次目标标识，系统未知；用户名不构成 Windows 证据。
不使用开发机的平台信息填充远端信息，也不把模拟信息冒充目标机检测结果。

```sh
# 当前仅做这一离线检查：没有目标信息时 JSON status=blocked，退出码 2。
BUN_BIN=/absolute/path/to/bun ./install/cc-install preflight --target administrator@HOST

# 将来获得目标本机库存后：probe 仅在执行它的机器采集信息，不远程执行。
# 先确认其为 macOS/Linux，且 Bun 可运行；Windows 不使用此 Bash 安装器。
BUN_BIN=/absolute/path/to/bun ./install/cc-install probe > target-facts.json
# 再对人工传入的目标信息进行离线评估：
BUN_BIN=/absolute/path/to/bun ./install/cc-install preflight --target administrator@HOST --facts target-facts.json
```

库存格式仅含 `schema: 1`、`platform`、Bun 进程 `arch`、stable `bun` 版本、`glibc`（macOS 为 null）。
示例测试数据为 `{"schema":1,"platform":"linux","arch":"x64","bun":"1.4.2","glibc":"2.26"}`，
它不是本次目标的实测数据。文件限普通 JSON、4096 bytes，不接受 symlink、额外字段或密码参数。
错误不回显文件内容/未知参数值。目标标签限 `user@hostname` / `user@IPv4`，不含密码或 shell 语法。

- 退出 0、`status=platform-compatible` **仅表示人工库存的平台约束合格**，没有确认机器身份，
  没有验证磁盘/权限、Bash、OS 最低版本、Bun CPU 指令要求或任何 native 依赖。
- 缺信息、Windows、musl、Android、未知架构、旧 Bun 返回 blocked（退出 2）；无效文件/参数退出 1。
  安装入口也在调用 Bun 前拒绝非 Darwin/Linux 和非 amd64/arm64 的 uname。
  POSIX 平台进一步由安装器按 Bun 进程架构及实际 glibc 检查；不按远端库存交叉安装。
  Windows 官方 native 包的支持不等于本仓 Source+Bun Bash 安装器支持。WSL 按其 Linux 环境判断。
- 包身份、冻结生产依赖、native RG/sharp、CLI 检验仍使用原 `install` / `verify` 流程。
  候选目录及物理移动后的最终目录都通过验证才切换 current；缺离线缓存即失败，无在线重试。
  `verify INSTALLED_DIR` 仍在临时 HOME 下使用离线防护，不读现有认证/环境文件。
- `install/cc-release deploy --server USER@HOST --password-file FILE` 提供远程传输，
  同时支持 `--prefix` / `--bin-dir`，参数按独立 shell word 引用。密码文件仅交给 `sshpass -f`；
  不读取、打印、插值密码、开启 xtrace 或关闭 SSH 主机身份验证。此入口不自动启动服务或清理旧版；
  安装前活动任务检查及服务切换仍需操作者单独完成。离线 fake transport 通过不代表真实 SSH 部署。

### 官方 2.1.283 本地解码证据及对齐边界

所有官方证据来自 `../.work/official-modules-2.1.283/darwin-arm64/raw`，
用 `node scripts/official/read-module.mjs RAW_PATH SYMBOL` 读取声明，未执行官方安装逻辑。

| 本地 raw / SHA256 | 声明 | 审计结论 |
|---|---|---|
| `chunk-avx2hrwa.js` / `b08bd76160c9baa8de5d2679f525a7f28bdf7bc5fb748a94c0b9dde4d897d6cc` | `Fn` | POSIX 临时链接 + rename；拒绝替换非管理入口。保留本仓相同保护，不覆盖系统 cc。官方 Windows 分支是独立复制/备份协议，本仓没有移植。 |
| 同上 | `PHn` | 官方清理保护当前入口、运行版本/锁；本仓源码 lazy import 需要整目录，因此更保守：不自动删除任何落地 release。 |
| 同上 | `Bse` | 官方区分 Linux Android/musl；arm64 raw 的架构常量已折叠，不代表四平台均实测。本仓明确限制为四种 glibc/macOS source target。 |
| `chunk-n8y6ywk9.js` / `9d5a1c0eebdc8d98c820777772c65ef86f38118f8e2bccc514c234f018d90401` | `JL`、`Bw` | 官方服务名/配置目录处理 `CLAUDE_SECURESTORAGE_CONFIG_DIR`，包含 NFC 及非默认目录哈希。安装器不改 HOME/config/env，不迁移认证或重命名 keychain 服务。 |

**认证目录补充（主线程已修复）：**`CLAUDE_SECURESTORAGE_CONFIG_DIR` 的独立目录及显式空值语义
已按官方 `JL/Bw` 接入 macOS 服务名与 plaintext 后端；NFC 与非默认目录 hash 保持官方规则。
`tests/secure-storage-directory.test.ts` 两项离线测试验证路径/服务名、临时存储读写权限及配置会话哨兵不变。
测试只使用临时目录和合成内容；没有读取真实 Keychain/OAuth，亦不代表真实登录恢复验收完成。
安装器仍不迁移或改写既有认证与会话。

### 本轮修复与离线覆盖

- 修复 rollback 在公共 cc 被删除后不恢复入口：先验证 previous，再恢复链接、切换 current；
  验证失败不创建入口，已有无关 cc 仍拒绝覆盖。
- 修复 Linux glibc 三段版本的错误拼接，非法/低版本仍明确失败。
- 新增预检的平台矩阵、缺库存、坏 JSON、Windows/musl/未知 CPU、凭据参数拒绝和无日志泄漏测试。
- 保留绝对/相对 cc symlink、cwd/preload、安装失败、最终位置二次检验、原子切换、锁竞争测试；
  新增真实 Bun 旧/新版两个进程跨安装及回滚后的 lazy import 与临时配置/会话不变测试。

```sh
# 本轮不制作当前工作树发行包，显式排除会打包当前全仓的那一个测试。
bun test tests/deployment-preflight.test.ts tests/release-install.test.ts --test-name-pattern '^(?!actual source package)'
```

依赖安装边界使用 tiny fixture + 测试 IO；入口/lazy import 实际启动本机 Bun。
未进行本轮 frozen 依赖实装、native smoke 或其他三平台实机运行；源冻结后再另行打包验收。
回滚仍仅保证 current 单链接原子 rename；previous/current 不是断电事务，不自动抢锁/清理老版本。

本轮专项结果：**25 pass / 0 fail / 1 filtered out，227 assertions**；排除项即全仓打包测试。
全部测试使用隔离临时 HOME/prefix；strict tsc（未加 skipLibCheck）、Bash 语法和范围内 diff 检查通过。
这是安装准备的专项结果，不替代完整验收；当前完整验收仍未通过，不表示四平台或该远端已可部署。
