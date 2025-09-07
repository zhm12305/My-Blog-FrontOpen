#!/bin/bash

# =============================================================================
# POEMON博客前端 - 重新部署脚本
# =============================================================================

echo "🚀 前端重新部署"
echo "=================="

echo "[1/5] 清理旧文件..."
if [ -d "dist" ]; then
    rm -rf dist
    echo "✅ 已清理旧的dist目录"
fi

echo "[2/5] 安装依赖..."
npm install

echo "[3/5] 构建前端..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ 构建失败，dist目录不存在"
    exit 1
fi

echo "[4/5] 检查构建文件..."
if [ -f "dist/index.html" ]; then
    echo "✅ index.html 存在"
else
    echo "❌ index.html 不存在，构建可能有问题"
    exit 1
fi

echo "[5/5] 部署说明..."
echo ""
echo "🎉 前端构建完成！"
echo ""
echo "📋 部署到Cloudflare Pages的方法："
echo ""
echo "方法1 - 手动上传："
echo "  1. 打开 Cloudflare Pages Dashboard"
echo "  2. 进入你的项目: zhi-blog.inter-trade.top"  
echo "  3. 上传 dist/ 目录中的所有文件"
echo ""
echo "方法2 - Git自动部署："
echo "  1. 提交代码: git add . && git commit -m 'Fix HTTPS mixed content'"
echo "  2. 推送到GitHub: git push"
echo "  3. Cloudflare会自动重新部署"
echo ""
echo "🔧 配置更新："
echo "  ✅ API地址已修改为自动检测协议"
echo "  ✅ HTTPS环境将使用 https://blog.inter-trade.top/api"
echo "  ✅ HTTP环境将使用 http://blog.inter-trade.top/api"
echo ""
echo "⚠️  注意："
echo "  如果仍有混合内容错误，请配置后端SSL证书"
echo "  或使用Cloudflare Workers代理API请求"
