# 全栈架构说明（前端仓库内）

本文件用于在仅公开前端仓库时，仍保留完整架构说明。

## 1. 线上部署结构

```text
Cloudflare Pages (前端静态)
        │
        ├─ 页面资源（HTML/CSS/JS）
        └─ API 请求 -> blog.inter-trade.top/api/*
                         │
                         └─ 1Panel OpenResty/Nginx
                              └─ poemon-backend:8089 (Django)
                                   └─ 1Panel-mysql-G45r:3306 (MySQL)
```

## 2. 前端运行方式

1. Vue2 SPA，路由模式为 `hash`
2. Axios 统一封装在 `src/utils/request.js`
3. API 基地址在 `src/utils/constant.js`
4. Token 保存在 `localStorage`（`userToken` / `adminToken`）

## 3. 后端（对接信息）

后端为 Django + DRF，使用 `TokenAuthentication`。

主要接口域：

1. 用户认证：注册/登录/找回密码
2. 内容模块：文章/评论/微言/树洞
3. 资源模块：资源库/友链/收藏
4. 后台管理：用户、文章、分类标签、站点设置
5. 统计模块：IP 与地图数据

## 4. 数据库核心表

1. `article` 文章
2. `comment` 评论
3. `user`（Client 扩展信息）
4. `sort` / `label` 分类标签
5. `resource` / `resource_path` 资源与友链
6. `web_info` 站点配置
7. `ip` 访客统计

## 5. 已识别的重要风险

1. 后端存在明文密钥（应迁移到环境变量）
2. 多个 `AllowAny` 写接口依赖前端传参，建议加强服务端鉴权绑定
3. 前端通过 CDN 外链大量依赖，需关注可用性与供应链风险
4. 部分管理操作使用 `GET` 触发写操作，建议改为 `POST/PUT/DELETE`

