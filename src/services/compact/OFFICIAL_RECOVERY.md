## 2026-10-05 当前287迁移状态

响应式summary完整287 xie与fork/query预算、手动同namespace I、automatic UIr/BIr/WIr/W_t已接实际消费者；最终化现直接调用同canonical G6n/DIr/Iie/svo/XOe，不再旧PLn/zSr/手写恢复或无消费optional journal端口。主控原root/真实文件/真实PostCompact一次/原附件失败恢复4/46、三个owned roots0；对应有限范围见COMPACT_FINALIZER_PRODUCTION_287_20261005.md。完整dispatcher接线及最新接受证据以WORK_PLAN_287为准；最终全仓/流量/平台/版本门尚未全闭。本地lease、完整历史及冻结定制保持。以下283内容仅历史证据，不能从旧TODO重复派工或当当前全部compact已287；最新唯一状态见WORK_PLAN_287.md。

# Compact 恢复边界 — 官方 npm 2.1.283

仅从本地 darwin-arm64 raw 模块取证；没有真实模型调用、部署、远端连接、密码文件读取或提交。保留既有工作树和本地历史定制。

本轮获准后已直接修改 query 的 compact 区域、forkedAgent，以及为 compact 参数落地所必需的 API 序列化边界。Tool.ts 只追加 compact 字段。未编辑 REPL.tsx、utils/hooks.ts、Goal/clear 实现、默认提示词、拒答分支或遥测策略。

## 可复现官方证据

- `scripts/official/vendor-compact.mjs RAW --check`：完整提取的重试、split、finalizer、strip plan、precompute 函数；`official/provenance.json` 保存模块/声明 SHA-256、UTF-16 与字节偏移、外部宿主依赖。
- `scripts/official/vendor-compact-store.mjs RAW --check`：`chunk-bav4p6fn.js:ke/Ei` 的完整 session-owned store；包括 attempt counter、failure cap、prompt veto、sidecar 队列（未启用 I/O）。
- `scripts/official/vendor-compact-callers.mjs RAW --check`：10 个 caller/transport 声明的独立 SHA-256 和偏移，包括 `chunk-td7fxg34.js:$a`、共享 `fv/iE/nDt/GSr/xPe`、手动 `T` 及 first-party/gateway 判定。
- 官方函数体不改写；新增 TypeScript 是宿主适配和真实 caller 接线，不宣称整个 query/nDt/fv 都已 vendor。

### 调用链与位置

1. `chunk-wyjbafrm.js:$So → fv`：将 compactionRequestKind、thinkingStripPlan、advisorStripPlan、fallbackModel、skipMessageCacheMarkers、onStreamDelta 交给 fork。
2. `fv → options.runQuery`：保留这些参数；fallback 存在时 clone options；流事件在筛选前回调；tombstone 从结果移除。
3. `chunk-td7fxg34.js:$a`：autocompact 后按 `JSr` 判断并 `QSr` 启动 estimate；响应后按 usage 再判断 api_response；PTL 按 `ebr → xLn` 消费。
4. `QSr → yoe/$So`：后台独立 AbortController，PreCompact veto，禁止 last-resort，pending/ready/failed、三次 counted-failure 上限、同一用户输入 veto。
5. `ebr → ZSr` 与手动 `A → ZSr`：pending 等待/中止、消费移除、UUID 与 key 前缀校验；保留预计算后的 suffix。
6. `iE`：先取 `dIe/nq`、`lIe/HP`，规范化后 `xor/Cxt → Nh`，不改 transcript；`nDt` 对消息缓存标记单独禁用，system/tools cache 保留；`JOt` 写 compact 请求 header。

## 已可达的本地链路

- query 默认导入 reactive，不再依赖外部编译 feature 开关；现有返回值 `CompactionResult | null` 和 Goal termination wrapper 保留。
- query estimate 与 response-usage 两个位置调用 `maybeStartCompactPrecompute`，由官方 JSr/QSr 执行生产；不需要外部测试注入 ready 条目才能工作。
- session-owned store 跨 query context copies 与手动 slash command 共享。session ID 变化中止旧工作；模型/UUID/key 前缀不匹配时失效；晚到的旧任务不能覆盖新条目。
- PTL 自动消费、阈值 autocompact 消费、手动 A 消费均接通。现有 SM 优先级和无缓存时传统阈值压缩保留，不回退本地历史行为。
- 自动缓存命中不重复 PreCompact。手动仍保留既有“先 hook，再检查缓存”的行为及 custom/hook 指令 miss。保留 suffix、replacement 和 finalizer。
- 真正的 runForkedAgent → query → API options 贯通上述字段；compact 有序 fallback 链复用原 catch，fork options 隔离父会话，原拒答和 legacy fallback catch 的 AST 文本未改。
- API 读取 strip plans 并在规范化后执行官方 xor/Nh；历史对象未改。消息 cache marker、first-party/gateway header 在真实 SDK offline fetch 中验证。
- onStreamDelta 在流事件过滤前执行，moe 对进度的调用接入本地 UI setters。configured fallback 从 query 参数继承到 compact options；Tool.options.fallbackModel 可由已有调用者传入完整列表。

## 给主助手的接线状态

已编辑 query.ts；无需重复补上述 import/调用点。可直接集成当前工作树。

- `CompactRequestOptions` 在 compact/request.ts；query 和 API options 继承它，fork 另外接收 string|string[] fallbackModel 与流回调。
- `ToolUseContext.compactPrecompute` 可供 session owner 显式持有；未设置时使用按 session ID 管理的本地 store。`getCompactPrecompute`、`invalidateCompactPrecompute` 可供生命周期 owner 调用。
- `attachCompactPrecompute` 保留显式外部store接口；287手动consumer直接用同canonical namespace原I/Fct/AFt与实际sidecar队列，旧rehydrate/consumed空callback已删。见287状态及正式报告，不再把旧283空端口当已接。
- `attachCompactFinalizerPorts` 的 requestJournal/sessionFlags/onCompactionEvent/keptThinking 保持显式 owner 端口，没有伪造这些私有服务。

## 仍缺的准确边界（不是全 1:1）

1. **session.compact middleware**：本地 s_r 适配执行 core 与现有 PreCompact，不含官方插件消息重写/替换 middleware；replacement 消费/finalizer 已运行，真实 middleware 的生产入口尚缺。
2. **模型事实与窗口来源**：PA 由现有本地窗口解析器承接 env/settings/本地 served window；缺官方 yp/sNr、账单与 native-1m、unknown-model 全套事实/来源判定。JSr/QSr、比例表 lwe/cdt/udt、SDK prompt scanner Owr/gU/Gie 为官方函数。
3. **sidecar 与借用**：Mrt/ubo/MAt 的持久化、storageV5 预读/恢复未启用；真实跨 agent borrowFrom/preFirstCompactFork/remote readiness 尚未接。内存 pending/ready/failed 和当前 agent 消费已接。
4. **完整 GSr/xLn 外层**：cache-cold 的 OTt/Fmt/I3 与实验 rdt 自动选择 skipMessageCacheMarkers、完整事件/指标/effort 尚缺。显式 skipMessageCacheMarkers 已贯通真实请求。credits-boundary entitlement 的 fut 仍关闭。
5. **finalizer 私有依赖**：完整 boe teammate/remote notice/served-state、requestJournal、sessionFlags、完整 xPe 的模型 thinking policy 尚缺；现有 file/plan/skill/goal/agent/tool delta 与本地历史仍保留。API 已消费 thinking/advisor marker，但默认 finalizer 未启用新的自动 kept-thinking marker 决策。
6. **fork 高级协议**：ownPrefix、relayFork、stickyBetas、agentCacheTtlOverride、advisor 快照/隔离 latch、forkPointUuid、divergesAtMessageId、Wfe preserved-tail 管理未恢复；当前 compact 需要的六项请求字段/流与 fallback 已贯通。onRetryStatus 到 transport 的私有 stall/heartbeat 状态机尚缺。
7. **生命周期**：query/手动成功和下一轮边界检测会清理；正常 subagent 最终响应已停止投机并失效；异常 subagent 退出与独立 clear owner 的即时通知还未调用 invalidateCompactPrecompute。不得把这一点视为全部 clear/session parity。

## 验证记录

- **最终定向验收：45 pass / 0 fail，1571 assertions；155 个官方 kernel 声明、2 个 store 声明、10 个 caller 声明校验通过。**

- 定向 suite 包含 compact-reactive、compact-wiring、compact-hook、compact-window、quota-errors、goal-recovery；全局 fetch 断言禁用，唯一 SDK transport 使用明确 offline fetch。
- wiring 测试使用真实 query/fork，不 mock runForkedAgent；覆盖多步 fallback/父 options 隔离、流 UI、真实 QSr pending→PTL 消费→重试、真实阈值 caller、手动 suffix 复用、veto/SDK gate/rewind、raw QSr/JSr/ZSr 差分、真实 API/SDK wire。
- AST 对比本轮编辑前快照：query Goal wrapper `5cb9061cc1e1c7cfe59bada21f22e64732cb17733471fbef60319aa0d5ec7154`；legacy fallback catch `4a50305594ebeb8998ea3a5efad314aca652f637f8f37d76d1803cedc699296b`；isRefusalMessage 最终分支 `a971a9919933b4142e67980f5f1dcaad0cf2cfacf7881f57d744cefd271a4a91`，均未变化。
- 全仓 tsc 仍有既有缺模块、React namespace、SDK block 类型等诊断；不声明全仓类型检查通过。定向编译诊断与最终测试数量见本轮最终回复。

## 后续 quota/error 分工（同一轮）

用户追加授权后修改 `src/services/claudeAiLimits.ts` 和 `src/services/api/errors.ts` 的非拒答分支：

- 完整读取官方 `M7/Zbe/Rlt/Ilt/Tlt` 及纯解析依赖；测试直接运行本地原函数，29 个函数/常量的模块、偏移、函数哈希保存在 `tests/fixtures/quota-official-2.1.283.json`。
- `parseQuotaStatusFromHeaders` 返回 base/own/readings，支持 grace 和 active-low-priority 参数；后者代表官方 XM 的 active phase，不擅自等同于用户请求开启的环境变量。
- 7d_oi、scope、upgrade paths、overage-in-use、monthly/channel utilization、credits_required 结构化购买资格；reset 按官方取整。
- 低优先 `_h/Mwo/rUn/oUn/yh/Jv`：有限非负等待时间、未知状态、预算最多 1。M7 使用 offer subset；现有 currentLimits/UI 保留独立 transport 状态字段。
- quota 429 错误携带独立新快照，不取旧 currentLimits；headerless subscriber capacity 429 标记 transient，非 subscriber 为 false，明确 overage-disabled/long-context entitlement 不标临时错误。
- 支持两种 long-context credits 文本的 apiError/errorDetails；仍保留原提示文案。不改 Opus→Sonnet 静默分支或拒答恢复。
- `getErrorMessageIfRefusal`、`get3PModelFallbackSuggestion` 原本函数体 SHA-256 在测试中固定校验。

剩余接线：低优先会话状态机/宽限期真实状态源、多会话 quota lease、完整 yUn 的 model-requires-credits 决策与剩余 IN/provider 错误包装未恢复；不是整个 errors.ts 1:1。该部分的类型/低优先状态机由主助手和类型分工继续集成；本轮未覆盖其并行改动。

