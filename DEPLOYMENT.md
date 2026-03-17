# 前端部署说明（Cloudflare Pages）

## 1. 准备

1. 确保仓库已包含前端代码
2. 检查 `src/utils/constant.js` 的 API 域名是否正确
3. 本地执行一次 `npm run build` 验证

## 2. Cloudflare Pages 配置

在 Pages 新建项目后，推荐：

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`（前端仓库根）
- Node.js: `18`

## 3. 自定义域名

1. 在 Cloudflare Pages 绑定你的域名
2. DNS 记录指向 Pages
3. 等待证书签发

## 4. 与后端联调

前端请求走 `baseURL`，例如：

```js
baseURL: "https://blog.inter-trade.top/api"
```

后端源站需要支持：

- `https://blog.inter-trade.top/api/*`
- 正确 CORS 与反向代理配置

## 5. 常见问题

1. 页面白屏：检查 CDN externals 是否加载失败（`index.html`）
2. 接口 404：检查 Nginx 是否正确转发 `/api/`
3. 登录异常：检查 token 存储和后端 TokenAuthentication

