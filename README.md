# My-Blog-FrontOpen

Vue2 博客前端项目，线上通过 Cloudflare Pages 静态部署。

## 技术栈

- Vue 2.6
- Vue Router 3（`hash` 路由）
- Vuex 3 + 持久化
- Element UI
- Axios
- mavon-editor

## 本地开发

```bash
npm install
npm run serve
```

默认开发端口：`81`（见 `vue.config.js`）。

## 构建

```bash
npm run build
```

产物目录：`dist/`

## 线上 API 配置

当前在 `src/utils/constant.js` 中硬编码：

- `baseURL: https://blog.inter-trade.top/api`
- `webURL: https://blog.inter-trade.top`

如果你迁移域名，请修改该文件后重新构建。

## 功能模块

1. 文章首页、分类、标签、详情
2. 评论、点赞、微言、树洞
3. 友链/收藏/资源展示
4. 用户登录注册、资料编辑
5. 后台管理入口（用户、文章、资源、站点配置）

## 目录说明

```text
src/
├─ assets/       # 样式与图标资源
├─ directive/    # 指令（权限）
├─ router/       # 路由配置
├─ store/        # 状态管理
├─ utils/        # 请求层与工具函数
└─ views/        # 页面与组件
```

## Cloudflare Pages 推荐配置

- Framework preset: `Vue`
- Build command: `npm run build`
- Output directory: `dist`
- Node version: `18`

详见 [DEPLOYMENT.md](DEPLOYMENT.md)。

## 安全说明

该仓库默认不应包含后端密钥。敏感信息请放到部署平台的 Secrets，详见 [SECURITY.md](SECURITY.md)。

