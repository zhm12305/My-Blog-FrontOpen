# GitHub 发布检查清单（前端仓库）

## 发布前

1. 确认 `README.md`、`DEPLOYMENT.md`、`ARCHITECTURE.md` 已更新
2. 本地执行：
   - `npm install`
   - `npm run build`
3. 检查 `src/utils/constant.js` 域名是否为目标环境
4. 确认未提交敏感信息

## 自查命令

```bash
git status
rg -n "password|token|secret|apikey|access_key|secret_key" .
```

## 提交建议

```bash
git add .
git commit -m "docs: add project docs and github templates"
git push origin main
```

## Cloudflare Pages 同步检查

1. Build command: `npm run build`
2. Output directory: `dist`
3. Node version: `18`
4. 自定义域名解析正常

