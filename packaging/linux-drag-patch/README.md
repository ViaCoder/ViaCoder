# Linux drag 0.7.3 精确补丁交付

固定 agent-sh/computer-use-linux **v0.7.3 / 374f0af3d5959bb88cfa45317df69da43cb040df**，MIT；属于 CClaude 本地 C，不冒称上游新版本。仅修改 `src/abs_pointer.rs` 与 `src/server.rs` 的 drag 链：

- 保留原 ABS_X/ABS_Y、几何、clamp 和时序；press 部分失败或 end-motion 失败也在同一 VirtualDevice 尝试 up。
- 显式 up 返回错误；同时失败保留两条错误，不隐去原错误。Drop 提供 panic/unwind 的同设备释放尝试，不保证硬件故障或进程被强杀后的物理状态。
- 整条 drag 复用上游原 `run_cancellation_safe_input`，阻塞任务和释放结束前持有原 `input_operation_lock`。
- native 已调用、锁中毒、worker panic/join 错误都不重放 portal/ydotool；仅确定无 pointer/后端不可用、尚未开始时沿用原选择。其它输入、UI、认证、模型 fallback 和遥测不改。

## 显式离线构建路径

以下命令是**交付给 Linux 构建/安装 owner 执行的步骤，本轮没有执行完整后端构建或实机安装**。需要已经准备好的完整固定 tag 源码与离线 Cargo 缓存；本脚本不下载源码、依赖或桌面组件，不调用 Git。部分 `.work` 来源只有两份证据文件，不是完整可构建仓库；`verify-source` 会明确失败。

设定绝对路径，`SOURCE` 应为固定 tag 的独立源码工作目录，`OUTPUT` 为源码之外尚不存在的目录，`CARGO`/`RUSTC` 为已安装工具链的实际可执行文件而非需要联网的 bootstrap。

```sh
REPO=[private-reference-not-distributed]   # Linux 构建主机上的实际源码仓库路径
SOURCE=/opt/build/computer-use-linux-0.7.3
OUTPUT=/opt/build/cclaude-linux-drag-073-v1-x64
TARGET=x86_64-unknown-linux-gnu              # ARM: aarch64-unknown-linux-gnu
export CARGO=/opt/rust/bin/cargo
export RUSTC=/opt/rust/bin/rustc
export CARGO_HOME=/opt/build/offline-cargo-cache # 单独缓存，不含用户认证文件

node "$REPO/packaging/linux-drag-patch.mjs" apply "$SOURCE"
node "$REPO/packaging/linux-drag-patch.mjs" verify-source "$SOURCE"
node "$REPO/packaging/linux-drag-patch.mjs" build "$SOURCE" "$TARGET" "$OUTPUT"
```

Node 24+（内建 TypeScript stripping）用于此显式工具。构建调用的精确 Cargo 命令为：

```sh
"$CARGO" build --offline --locked --release --bin computer-use-linux \
  --target "$TARGET" --target-dir "$OUTPUT/target"
```

构建前后校验固定 tag 的全部 84 文件（数学 Git blob SHA-1，不调用 Git）与两个 patch 后 SHA-256；失败不产生成功收据。输出为 `OUTPUT/computer-use-linux` 及同名 `.cclaude-linux-drag.json` 收据。收据记录补丁、源树、两文件、目标架构及实际 ELF 二进制哈希；它是本地管理员的未签名构建记录，不是供应链签名、上游发行证明或实机验收证明。

## 实际安装与 caller 接线

```sh
INSTALLED=/opt/cclaude-cu/linux-drag-073-v1/bin/computer-use-linux
node "$REPO/packaging/linux-drag-patch.mjs" install \
  "$OUTPUT/computer-use-linux" "$INSTALLED"
cclaude linux-computer-use register --binary "$INSTALLED"
```

`install` 只复制两个已核验文件到新路径，不启动桌面/服务、不覆盖现用 binary、不自动改 MCP 配置。已有 `linux-computer-use` 显式配置指向旧路径时，现有 register 会报告 name-conflict；安装 owner 须通过现有 MCP 配置流程明确切换其 **command** 至上述新绝对路径，并保留 `args:["mcp"]`。不自动覆盖它。未配置时亦可将新目录显式置于 PATH 供原默认发现读取；显式配置始终优先。切换前由主控做活动检查，下一会话使用同一 MCP 生命周期。

生产入口仍是 `getDefaultLinuxComputerUseMcpConfig/probeLinuxComputerUse` → 原 stdio 生命周期 → `createLinux073ConnectedBackend` → `verifyInstalledLinux073Binary` → 原 SDK `drag` RPC。版本/doctor/schema 校验保留；x64 原 release SHA 保留，另接受与**同一 command**相邻且匹配固定 patch 身份、源码及实际 ELF 哈希/架构的收据。ARM 原已安装路径不禁用；无收据不代表 drag 已修。

只安装 patch 源码而仍连接原版 binary **不会生效**。收据遗漏或不匹配的 x64 修改版会显式报错，不悄悄放宽原 release pin；带收据的 ARM 同样校验。回滚是显式恢复原 MCP command 和 PATH，而非覆盖用户正使用的进程。

## 已验与剩余

有限离线回归覆盖精确 patch、收据完整性、fixture 路径复制、真实 connectedExecutor/SDK 单次错误 RPC，以及实际 patched drag/ABS 源体的错误释放、panic、真实 Tokio 取消锁生命周期。evdev/portal/ydotool OS 叶为固定 fixture，既有绿色平台 suite 不重跑。

尚需主控：准备完整固定 tag/offline 缓存 → Linux x64/ARM 各自完整编译 → 显式安装/切换 → 实机 down/end-error/up、取消和后继动作互斥验收。未编译完整 upstream crate（含 rmcp 宏和真实 evdev）、未验证真实 uinput/compositor、不计 C11/D7 完成，也不将 source-only 记为 drag 已修。
