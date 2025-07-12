# WebImageCircle 部署指南

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 开发环境运行
```bash
npm run dev
```
访问 http://localhost:3000

### 3. 生产环境构建
```bash
npm run build
npm start
```

## 部署平台

### Vercel 部署（推荐）
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### Netlify 部署
1. 将代码推送到 GitHub
2. 在 Netlify 中连接 GitHub 仓库
3. 构建命令：`npm run build`
4. 发布目录：`.next`

### 传统服务器部署
1. 构建项目：`npm run build`
2. 上传 `.next` 文件夹到服务器
3. 安装 PM2：`npm install -g pm2`
4. 启动：`pm2 start npm --name "webimagecircle" -- start`

## 环境变量

创建 `.env.local` 文件：
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 性能优化

### 1. 图片优化
- 使用 Next.js Image 组件
- 配置图片域名
- 启用 WebP 格式

### 2. 缓存策略
- 静态资源缓存
- API 响应缓存
- 浏览器缓存

### 3. 代码分割
- 动态导入组件
- 路由级别代码分割
- 第三方库优化

## SEO 配置

### 1. 元数据
- 页面标题和描述
- Open Graph 标签
- Twitter Card 标签

### 2. 结构化数据
- JSON-LD 标记
- 面包屑导航
- FAQ 结构化数据

### 3. Sitemap
- 自动生成 sitemap.xml
- 提交到搜索引擎

## 监控和分析

### 1. 性能监控
- Core Web Vitals
- 页面加载速度
- 用户交互响应

### 2. 用户分析
- 页面访问量
- 用户行为路径
- 转化率分析

### 3. 错误监控
- JavaScript 错误
- API 错误
- 用户反馈

## 安全配置

### 1. 内容安全策略
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data: blob:;">
```

### 2. HTTPS 配置
- 强制 HTTPS 重定向
- HSTS 头设置
- 安全证书配置

### 3. 隐私保护
- 不收集用户个人信息
- 本地处理所有数据
- 透明隐私政策

## 维护和更新

### 1. 定期更新
- 依赖包更新
- 安全补丁
- 功能优化

### 2. 备份策略
- 代码版本控制
- 数据库备份
- 配置文件备份

### 3. 监控告警
- 服务可用性监控
- 性能指标告警
- 错误率监控

## 故障排除

### 常见问题
1. **构建失败**：检查依赖版本兼容性
2. **图片上传失败**：检查文件大小和格式限制
3. **性能问题**：优化图片处理和缓存策略

### 日志查看
```bash
# 开发环境
npm run dev

# 生产环境
pm2 logs webimagecircle
```

## 联系支持

- 技术支持：tech@webimagecircle.com
- 反馈建议：support@webimagecircle.com
- 商务合作：business@webimagecircle.com 