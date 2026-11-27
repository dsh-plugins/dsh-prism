# 棱镜（dsh-prism）技术路线与架构参考

## 一句话设计理念

**对用户隐藏一切基础设施复杂度，在底层用严格的边界换取高自治与高可用。**

基于五个插件（`dsh-concierge-ui`、`dsh-workspace-registry`、`dsh-orchestrator`、`dsh-mesh-node`、`dsh-im-gateway`），棱镜在 DeepSeek Harness（DSH）之上构建了一套多层分布式协作架构：对 Web 与 IM 用户屏蔽底层工作区与多机拓扑，仅呈现极简对话流、折叠任务状态卡与只读检视入口；而在底层通过严格隔离、显式发信、动态点将、位置透明与遇锁自愈保证系统的安全与鲁棒。

## 六个核心原则与技术路线

1. **交互极简与渐进式披露（Zero-Workspace UX）**
   用户关心的是「做成一件事」，而非「代码在哪台机器的哪个目录」。系统通过单一对话流（`dsh-concierge-ui`）与 IM 入口（`dsh-im-gateway`）屏蔽工作区、路径与多机拓扑，将一句自然语言折射为后台多层协作；同时保留只读旁路检视能力，做到「平时零打扰，排查全透明」。

2. **严格权限天花板与上下文洁癖（Strict Isolation）**
   越靠近用户的层级，权限越克制、上下文越干净。系统采用「L1 交互 → L2 规划 → L3 执行」三层隔离：L1 绑定配置中的默认工作区，被彻底剥离文件读写与终端执行能力，只保留项目元数据检索（`query_projects`）与任务派发权——既守住 IM/Web 入口的越权与注入底线，也隔绝底层海量代码与日志对路由层注意力的污染。

3. **默认静默，显式发信（Silent-by-Default Actor）**
   打破传统大模型「有问必答、吐字即输出」的同步对话范式。L1 的自然语言生成仅作为内部思考，向用户输出可见内容必须显式调用 `send_user`。L1 与 L2、L2 与 L3 之间通过 `send_child` / `send_parent` 经持久队列双向主动发信，配合 `report_progress` / `get_progress` 与子任务终态的 `task_settled` 事件，使智能体具备异步事件处理、主动保持沉默与多任务并行协调的能力。

4. **能力自描述与动态点将（Self-Describing Routing）**
   拒绝把模型和任务写死。通过「分层模型池 + 独立能力介绍（`description`）+ 专属提示词覆写（`promptMode: "append" | "replace"`）」，把模型选择权下放给运行时：用户按偏好自由切换前端 L1 模型，而 L1/L2 则通过 `list_models` 读取下一层模型的「能力简历」在派发时动态择优，兼顾效果、延迟与成本。

5. **位置透明的分布式抽象（Location Transparency）**
   `dsh-mesh-node` 用 WebRTC DataChannel 连接已互相登记公钥的节点，并为各节点注册标准的 `prism-<nodeId>` 子代理提供方。L1 可用 `agent_spawn` 向多个节点批量派发 L2 任务，L3 继承 L2 的工作区。文件操作在项目所在设备执行。显式开启 Room 后，同批获准的 L2 可用 `peer_send` 互发消息。

6. **外轻内重，遇锁自愈（Virtual Facade & Copy-on-Conflict）**
   各层通过子代理接口运行 DSH 原生会话。启用会话遇到写锁冲突时，运行器从可读取的历史创建新会话，并原子更新逻辑代理的会话绑定。用于查看的历史使用独立的只读会话。

## 整体协作链路

```mermaid
flowchart TD
    W[Web 用户] --> UI[dsh-concierge-ui]
    I[IM 用户] --> IM[dsh-im-gateway]
    UI --> L1[L1 交互会话 · 默认工作区]
    IM --> L1
    L1 -->|query_projects| R[dsh-workspace-registry]
    L1 -->|dispatch_planner · 指定项目与 L2 模型| L2[L2 规划会话 · 目标工作区]
    L1 -->|agent_spawn · 可选 Room| L2
    L2 -->|dispatch_executor · 继承工作区并收窄权限| L3[L3 执行会话 · 同节点同工作区]
    L3 -->|send_parent / report_progress / task_settled| L2
    L2 -->|send_parent / report_progress / task_settled| L1
    L1 -->|send_user| D[公开消息投递]
    D --> UI
    D --> IM
```

- **工作区治理**：网页安装场景下自动发现 DSH 侧栏已登记的本地工作区（以原生 UUID 为内部项目 ID，默认只读检索）；显式配置场景由 `registry` 管理 `id`、`nodeId`、`workspace`、`principals` 与 `permissions`。`query_projects` 仅返回授权元数据，物理路径只在受信宿主代码中解析。
- **权限交集**：L3 执行工具集合严格取「L3 角色白名单 ∩ 项目策略 ∩ L2 派发预算」的交集，提示词覆写不会扩大宿主强制执行的安全边界。
- 用户消息、模型选择、任务状态与待投递的代理消息保存在 `conversations.sqlite`。各节点的 DSH 原生会话保存完整记录。远程任务的完整记录可在执行设备的 DSH 工作区查看。

## 源码检出、构建与部署

`dsh-prism` 公开保存官网、使用文档、版本锁（`plugins.lock.json`）与检出脚本。`node scripts/checkout.mjs` 按锁定的提交复现使用 HTTP Mesh 的历史源码环境和集成测试。检出需要五个插件仓库的 Git 读取权限、DeepSeek Harness `0.2.3-alpha.2` 和 Node.js 24.9 或以上。要运行 WebRTC 组合，请使用下方 npm 安装表及 [WebRTC 配置](CONFIG.md#webrtc-节点)。

```sh
# 1. 在公开仓库根目录检出锁定版本的五个插件到 runtime/
node scripts/checkout.mjs
cd runtime

# 2. 安装依赖、编译并运行测试（集成测试会在隔离临时目录启动真实 DSH 进程）
npm ci
npm run build
npm test

# 3. 复制示例配置并启动（默认使用 prism.example.json）
cp prism.example.json prism.config.json
npm start -- prism.config.json --host 127.0.0.1 --port 3080 --no-open
```

打包发布压缩包时，在 `runtime/` 下执行：

```sh
npm pack --workspaces --pack-destination ../tarballs
```

## 当前 npm 发布版本与五插件索引

通过 DSH 插件管理器安装时，请按以下顺序安装并启用。启用 Mesh 后，编排器会获得运行所需的 `dshMesh` 服务。[安装图解](https://prism.dsh-plug.in/zh/guide/start)

| 安装顺序 | 插件包名与版本 | 配置段 | 技术文档（需仓库权限） |
| --- | --- | --- | --- |
| 1 | `@dsh-prism/dsh-workspace-registry@0.1.2` | `registry` | [项目记录与主体授权](https://github.com/dsh-plugins/dsh-workspace-registry/blob/main/docs/TECH.md) |
| 2 | `@dsh-prism/dsh-orchestrator@0.2.0` | `orchestrator` | [工具、模型和持久化](https://github.com/dsh-plugins/dsh-orchestrator/blob/main/docs/TECH.md) |
| 3 | `@dsh-prism/dsh-mesh-node@0.2.1` | `mesh` | [两端配置和远程执行](https://github.com/dsh-plugins/dsh-mesh-node/blob/main/docs/TECH.md) |
| 4 | `@dsh-prism/dsh-im-gateway@0.2.0` | `im` | [通道认证、命令和投递](https://github.com/dsh-plugins/dsh-im-gateway/blob/main/docs/TECH.md) |
| 5 | `@dsh-prism/dsh-concierge-ui@0.2.0` | 由启动器挂载 | [路由、前端组件与只读会话](https://github.com/dsh-plugins/dsh-concierge-ui/blob/main/docs/TECH.md) |

## 本地预览官网文档

官网基于 VitePress 构建，在公开仓库根目录执行：

```sh
npm ci --prefix website
npm run docs:dev --prefix website    # 本地预览
npm run docs:build --prefix website  # 构建静态站点
```

[棱镜官网](https://prism.dsh-plug.in/zh/)
