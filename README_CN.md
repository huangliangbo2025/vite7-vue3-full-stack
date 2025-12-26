# 前言

本项目基于 **Vue 3.5 + TypeScript + Vite + Element Plus + UnoCSS** 构建，旨在打造一个真正**简洁、清爽、可持续维护**的中后台管理系统。

市面上的后台管理模板非常多，但我仍选择自己重新搭建一个，原因主要有：

1. **版本滞后严重**\
   很多模板中 Vue / Vite 等核心依赖长期未升级，兼容性与维护成本极高。
   本项目虽然未来也可能落后，但由于结构简洁，可确保升级顺畅。

2. **过度封装导致束手束脚**\
   复杂封装让开发者必须适应作者的习惯。在 AI 时代，真正需要的复杂逻辑完全可以由 AI 辅助生成，不应该被封装限制。

3. **配置冗余、理解成本高**\
   很多模板塞入大量插件与配置，实际几乎不会用到。
   当你真的需要某个功能时，再请 AI 协助逐步补齐即可。

4. **个人风格过强**\
   一些开源项目强制带入作者自己的编码理念，使得难以作为通用模板使用。

因此，我认为现代项目的启动方式应该是：\
**只保留必要依赖、格式化工具、提交规范；业务代码由开发者完全掌控。**

---

# 依赖说明

### **axios + @tanstack/vue-query**

前者负责请求，后者负责缓存、请求管理，结合使用比自行封装 axios 更干净。

### **lodash-es**

可靠、成熟的工具库，避免团队重复造轮子。

### **vueuse**

在封装 Hook 之前，先确认 VueUse 是否已有现成实现，降低冗余。

### **Element Plus**

稳定、成熟、易替换的 UI 库。

### **echarts**

用于图表渲染，只在 Dashboard 中使用，非必需可删除。

---

# vite.config.ts 配置说明

- **vue()**：Vue 核心支持
- **vueJsx()**：启用 JSX/TSX
- **UnoCSS()**：引入 UnoCSS（记得在 `main.ts` 添加 `virtual:uno.css`）
- **envParse()**：增强环境变量提示
- **AutoImport()**：自动导入 Vue、Router 等 API
- **Components()**：自动按需注册组件（包含 Element Plus 与本地组件）
- **ElementPlus()**：加载源代码样式，避免样式缺失
- **createSvgIconsPlugin()**：自动注册 `assets/icons` 下的所有 SVG 图标
- **VueDevTools()**：调试增强
- **viteMockServe()**：本地 Mock 支持

整体配置保持轻量、清晰、可扩展。

---

# 代码格式化工具配置

- **prettier**：格式化 Vue 文件
- **dprint**：高性能格式化 ts/js/json/md 等文件
- **stylelint**：CSS/SCSS 校验
- **eslint**：通用代码质量检查
- **commitlint**：Git 提交规范（推荐使用 `pnpm cz`）

---

# VS Code 插件

## 必装

- Vue (Official)
- ESLint
- Prettier
- Dprint Code Formatter
- Tailwind CSS IntelliSense
- GitLens

如果你每次启动都会报错 Error initializing dprint. Ensure it is globally installed on the path (see https://dprint.dev/install) or specify a "dprint.path" setting to the executable. [INFO] Configuration file not found.
请运行一下脚本

```window PowerShell
irm https://dprint.dev/install.ps1 | iex
```

```macOS / Linux
curl -fsSL https://dprint.dev/install.sh | sh
```

并且修改你的settings.json配置

Windows

```json
{
  "dprint.path": "C:\\Users\\xxx\\.dprint\\bin\\dprint.exe"
}
```

macOS / Linux：

```json
{
  "dprint.path": "/Users/xxx/.dprint/bin/dprint"
}
```

## 可选

- One Dark Pro
- Auto Close Tag
- Code Spell Checker
- Color Highlight
- vscode-icons
- Indent-Rainbow

---

# 结语

若你需要更多完整能力（如权限路由、按钮权限、换肤、多语言等），可切换到 `full-dev` 分支。\
那部分代码我尽量保持简洁与可读。

脚手架只是参考，而不是必须遵循的标准。\
最适合你的结构，才是最佳结构。

- ** 正如我之前所说的，`full-dev` 分支功能确实齐全，但也强加了我自己的想法，所以你最好是当作参考来使用，确认你是否真的需要全量使用他 **\

---

# 劝告

- **没有 code review 的团队，不建议随意封装全局组件。**\
  冗余与冲突将会迅速积累。

- **不要用老旧项目作为新项目的起点。**\
  老代码、老依赖、老思维都将拖慢你的节奏。

我已经深受其害，希望你不要再踩坑。
