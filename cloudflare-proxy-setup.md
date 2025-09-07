# Cloudflare 代理配置教程

## 方法1: 通过Cloudflare Dashboard配置

1. **登录 Cloudflare Dashboard**
   - 进入你的域名管理页面 `zhi-blog.inter-trade.top`

2. **添加页面规则 (Page Rules)**
   - 进入 `Rules` → `Page Rules`
   - 点击 `Create Page Rule`
   - URL Pattern: `zhi-blog.inter-trade.top/api/*`
   - 设置: `Forwarding URL` → `301 Redirect`
   - 目标: `https://blog.inter-trade.top/$1`

3. **或者使用 Workers (推荐)**
   - 进入 `Workers & Pages` → `Create Worker`
   - 使用以下代码:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // 如果是API请求，代理到后端服务器
  if (url.pathname.startsWith('/api/')) {
    const backendUrl = `http://blog.inter-trade.top${url.pathname}${url.search}`
    
    // 创建新请求
    const newRequest = new Request(backendUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    })
    
    // 发送请求到后端
    const response = await fetch(newRequest)
    
    // 添加CORS头
    const newResponse = new Response(response.body, response)
    newResponse.headers.set('Access-Control-Allow-Origin', '*')
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    return newResponse
  }
  
  // 其他请求正常处理
  return fetch(request)
}
```

## 方法2: 修改前端配置 (已完成)

前端配置已修改为自动检测协议，现在需要重新部署。

## 立即执行的步骤:

1. **重新构建前端**:
```bash
cd My-Blog-FrontOpen
npm run build
```

2. **部署到Cloudflare Pages**:
- 将新的 `dist` 目录内容上传
- 或使用Git推送触发自动部署
