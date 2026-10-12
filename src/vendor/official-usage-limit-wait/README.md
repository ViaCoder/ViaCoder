# 2.1.283 usage-limit-wait：完整官方 host + 公开本地消费者

仅使用本地官方 npm 2.1.283 darwin-arm64 原包和本仓源码。未请求真实模型、读取真实凭据、部署或提交。不是全产品 1:1。

## 原始证据与复现

- `state.js`：完整 `chunk-a7h398es.js`，73 个声明；仅修改 imports。
- `gates.js`：完整 `chunk-4akyf8px.js`，11 个声明；仅修改 imports。
- `intent.js`：完整 `chunk-r6te8jtn.js`，4 个声明；仅修改 imports。
- `provenance.json`：原模块、输出、逐个原始声明 SHA-256。
- `host-evidence.json`：调用方和宿主依赖的完整函数/类声明哈希。
- 原版权/version/license 头保留于 `NOTICE`。

```sh
[private-reference-not-distributed] src/vendor/official-usage-limit-wait/recover.mjs ../.work/official-modules-2.1.283/darwin-arm64
[private-reference-not-distributed] src/vendor/official-usage-limit-wait/verify.mjs ../.work/official-modules-2.1.283/darwin-arm64
[private-reference-not-distributed] test tests/usage-limit-wait.test.ts tests/usage-limit-wait-ui.test.ts tests/goal-recovery.test.ts tests/goal-checkin.test.ts tests/quota-errors.test.ts tests/compact-wiring.test.ts tests/compact-lifecycle.test.ts
```

## 实际接线（已写入，不需要主线程再造另一份计时器）

1. `REPL.onQueryEvent → observeUsageLimitMessage → Cso`：普通会话/Goal 均消费 assistant 的 rate_limit + quotaLimits。普通重试、拒答、提示词和 main Goal termination wrapper 不改。
2. `useUsageLimitWait → mountUsageLimitWait → Vdr/Bdr/oet/Wdr`：REPL 一处安装；仅 armed 时有一个 30 秒 observer。完整 vendor 保留 jitter、30 分钟睡眠 stale、busy、horizon、去重、unknown-setting rescans、两次 rearm 和 1/5 分钟下限。
3. `queueProcessor` 在出队广播前登记 in-flight lease，避免短暂丢失 intent 而误重启 Goal timer。`handlePromptSubmit` 的实际 enqueue/direct 输入调用 `B5t`；`executeUserInput` 在解析前 `Aso` 并登记 in-flight，解析出 shouldQuery 后 `kso`，finally `Tso`。包括输入 hook 阻断、空结果、throw、旧 claim、pre-arm queued human、manual takeover；不把排队前的人类工作误当恢复。
4. `services/claudeAiLimits.ts` 在**每个**拒绝响应发 `quotaRejected`，即使 snapshot 完全相同也发；`services/api/claude.ts` 传真实 querySource/subagent 身份。独立于 statusListeners 去重，不将辅助请求误当 main_thread rearm。
5. `Tool.usageLimitWait.hasIntent → goalTermination → GoalRecoveryController` 选择官方 `usage_limit_waiting`。`useGoalCheckin` 同时取消 Goal recovery/idle timer 和旧 check-in 消息，queue/host intent 解除后再允许 idle timer；不新增第二个 quota retry controller。
6. `useCancelRequest`：将等待加入既有键盘资格，Esc/Ctrl+C 消费相应 reason，manual wait 不因取消其他运行工作而提前消失；kill chord 清队列前取消 queued continuation。保留原快捷键、工具、agent 和队列操作逻辑。
7. `PromptInput` 空提交 guard：仅 leader 的 prompt 模式、无图片、stale 时消费 `Gdr`；不让 bash 空回车执行恢复文案，不改历史定制/props。
8. `rate-limit-options` 实际手动 arm/cancel；设置 schema + Config 增加 `autoContinueAtUsageLimit`，保留 source precedence、用户源写权限、取消 Config 时恢复原值。raw-key-presence 与有效布尔设置分开，非法显式值不会视作 absent 默认开启。
9. extra-usage 完成回调及菜单升级回调消费 `o8 → Y0e`；`probeMainModelQuota` 使用捕获的主模型，而不是普通启动 preflight 的小模型。skip/网络失败返回 null，不伪造额度恢复。
10. `acceptOfficialLowPriority` **先** `SO('low_priority')` **再**官方 `$wo`；身份变更取消配额等待，不覆盖低优先重试和解析。旧 low-priority README 的“quota host 未接”由本交付补上。
11. bootstrap `onSessionSwitch` 清除等待（clear/resume 广播由主线程负责，本分工没有修改 bootstrap）；后台移交/退出调用 `U5t`，重挂载调用 `uwe`。宿主意图是 host 生命周期，不按 conversation 创建另一份。

## host import 映射

| 官方依赖 | 本地端口 |
|---|---|
| K/j/G5t/Oe | 与 low-priority 共享 host scope，WeakMap + createSignal；离线 fixtures 用 withUsageLimitHost 隔离 |
| _u/Et/Mt/mm | 真实 REPL 挂载、交互/remote/background 资格；默认未挂载时关闭自动等待 |
| pt/Rn/it/Mh/hce | 既有 subscriber/account/model getter；hce 完整三分支映射 |
| Be/At/$b/o7/qLr/bee | 既有模型 catalog/alias/display 和官方 included-model feature |
| wne/_k/vRe/Ni | 设置源反向优先级、原始 key presence、现有 change detector |
| CJt/ga/ppo | quotaRejected/currentLimits/主模型 quota probe |
| hF/hv/fb/KNn/sY/ume | 真实 messageQueue + 输入解析期间 drain lease + 官方人类命令规则 |
| Zd | bootstrap session-change 广播 |
| i/d/c/_/m/p | 既有日志/遥测适配与本地 outcome signal；不替换定制遥测 |

## 明确未覆盖 / 不宣称一致的外围

- 私有 StorageV5 settings reader、flag expected-content snapshot、跨目录 local-settings fallback，以及私有 workspace/account epoch/宿主迁移 registry 未整体移植。当前 raw presence 按官方 uh=2 MiB 上限读取公开本地 settings paths；private fork/cd/spare_claim/hydrate reason 没有本地 bootstrap 对应事件，vendor e6e 规则已保留并差分测试。
- 模型实体解析依赖仓库既有 catalog/alias/display 恢复程度；非公开模型 identity/override 的完整闭包不在本轮。
- probe 的私有 dc/StorageV5 transport 以既有 SDK 配额请求适配，非完整私有网络宿主移植。quota_check 被禁用/无法确定时保留等待。
- 私有额度购买/额度重置实验、usage-credits 产品入口、desktop/cloud/relaunch 的全部 UI、系统通知中心和固定 footer 文案未整体移植。vendor 取消原因/文案/入口存在；当前公开 extra-usage、低优先、后台移交、process exit 已实际接通。不会制造不存在的服务端资格。
- 当前通知使用本地 transcript 文案适配，不声称官方全部日期格式、footer、notification UI 像素/文案 1:1。
- 没有恢复另一套 Goal 计时器，没有接真实模型进行“验收”。

## 测试边界

`tests/usage-limit-wait.test.ts` 使用隔离 HOME、fake time/timers、合成 quota 和禁网 fetch：验证 88 声明 SHA；完整 raw 模块直接求值差分；实际队列 → handlePromptSubmit → processUserInput → query → metadata/limits callback → claim finally；clear/resume；settings unknowable；low-priority 顺序；主模型 probe；取消和 stale 输入。`tests/usage-limit-wait-ui.test.ts` 真实挂载两个 REPL hooks，确认 quota 只保留一个 observer、同时取消 Goal 两类 timer，并在模型变更订阅时读取新 session 模型（不等 React 重渲染）。真实 query 只替换 inference dependency，quota 核心和输入解析不 mock。

全套共享树结果见 `verification.json`。不把并行代理改过的共享文件全量 diff 算成本分工成果。
