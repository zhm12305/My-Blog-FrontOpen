#!/bin/bash

# =============================================================================
# POEMON博客前端 - 最终部署准备脚本
# =============================================================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 前端最终部署准备${NC}"
echo "=================================="

echo "🎉 后端API已完全正常工作！"
echo "现在准备前端最终部署..."
echo ""

echo "[1/5] 检查Node.js环境..."
if command -v npm &> /dev/null; then
    echo "✅ npm版本: $(npm --version)"
    echo "✅ node版本: $(node --version)"
else
    echo -e "${RED}❌ npm未安装，请先安装Node.js${NC}"
    exit 1
fi

echo ""
echo "[2/5] 验证前端配置..."
echo "🔍 检查API配置 (src/utils/constant.js):"

# 检查配置文件
if [[ -f "src/utils/constant.js" ]]; then
    echo "✅ 配置文件存在"
    
    # 检查自适应协议配置
    if grep -q "window.location.protocol" src/utils/constant.js; then
        echo "✅ 自适应协议配置已启用"
        echo "  📋 HTTPS环境将使用: https://blog.inter-trade.top/api"
        echo "  📋 HTTP环境将使用: http://blog.inter-trade.top/api"
    else
        echo -e "${YELLOW}⚠️  自适应协议配置未找到，使用默认配置${NC}"
    fi
else
    echo -e "${RED}❌ 配置文件不存在${NC}"
    exit 1
fi

echo ""
echo "[3/5] 清理旧文件..."
if [[ -d "dist" ]]; then
    rm -rf dist
    echo "✅ 已清理旧的dist目录"
fi

if [[ -d "node_modules" ]]; then
    echo "🧹 清理node_modules..."
    rm -rf node_modules
fi

echo ""
echo "[4/5] 安装依赖..."
echo "📦 安装npm依赖..."
npm install

if [[ $? -ne 0 ]]; then
    echo -e "${RED}❌ 依赖安装失败${NC}"
    exit 1
fi

echo ""
echo "[5/5] 构建前端..."
echo "🔨 构建生产版本..."
npm run build

if [[ $? -eq 0 ]] && [[ -d "dist" ]]; then
    echo -e "${GREEN}✅ 前端构建成功！${NC}"
    
    # 检查构建文件
    echo ""
    echo "📋 构建文件检查:"
    if [[ -f "dist/index.html" ]]; then
        echo "  ✅ index.html 存在"
    fi
    
    dist_size=$(du -sh dist/ | cut -f1)
    echo "  📊 构建大小: $dist_size"
    
    file_count=$(find dist -type f | wc -l)
    echo "  📁 文件数量: $file_count 个文件"
    
else
    echo -e "${RED}❌ 前端构建失败${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🎊 前端构建完成！${NC}"
echo "=================================="

echo ""
echo "📋 部署到Cloudflare Pages的步骤:"
echo ""
echo "方法1 - 自动部署 (Git):"
echo "  1. 提交更改:"
echo "     git add ."
echo "     git commit -m 'Fix HTTPS mixed content with adaptive protocol'"
echo "     git push"
echo "  2. Cloudflare Pages会自动检测并部署"
echo ""
echo "方法2 - 手动上传:"
echo "  1. 打开 Cloudflare Pages Dashboard"
echo "  2. 找到项目: zhi-blog.inter-trade.top"
echo "  3. 进入 Deployments"
echo "  4. 点击 'Upload assets' 或 'Direct upload'"
echo "  5. 上传整个 dist/ 目录的内容"
echo ""
echo "方法3 - 拖拽上传:"
echo "  1. 压缩 dist/ 目录为 dist.zip"
echo "  2. 在Cloudflare Pages中直接拖拽上传"
echo ""

echo -e "${BLUE}🌐 部署后验证步骤:${NC}"
echo "=================================="
echo ""
echo "1. 访问前端: https://zhi-blog.inter-trade.top"
echo "2. 打开浏览器开发者工具 (F12)"
echo "3. 检查 Network 标签，应该看到:"
echo "   ✅ API请求成功 (状态码200)"
echo "   ✅ 无 Mixed Content 错误"
echo "   ✅ 无 CORS 错误"
echo ""
echo "4. 测试功能:"
echo "   ✅ 首页文章加载"
echo "   ✅ 分类页面正常"
echo "   ✅ 文章详情页可访问"
echo "   ✅ 评论功能正常"
echo ""

echo -e "${BLUE}💡 故障排除:${NC}"
echo "=================================="
echo ""
echo "如果前端仍有问题:"
echo "  1. 检查浏览器控制台错误"
echo "  2. 确认后端API正常: http://blog.inter-trade.top/api/webInfo/getWebInfo"
echo "  3. 检查CORS配置"
echo "  4. 清除浏览器缓存"
echo ""

echo -e "${GREEN}🎯 预期最终结果:${NC}"
echo "=================================="
echo ""
echo "✅ 前端: https://zhi-blog.inter-trade.top (Cloudflare Pages + HTTPS)"
echo "✅ 后端: https://blog.inter-trade.top (你的服务器 + SSL)"
echo "✅ API: https://blog.inter-trade.top/api/* (完全正常)"
echo "✅ 管理: https://blog.inter-trade.top/admin (Django管理)"
echo "✅ 无混合内容错误，无CORS错误，无网络错误"
echo ""
echo "🎊 POEMON博客系统将完全正常运行！"
echo ""
echo "📅 构建完成时间: $(date)"
