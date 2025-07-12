#!/bin/bash

echo "🚀 WebImageCircle 启动脚本"
echo "================================"

# 检查 Node.js 版本
echo "📋 检查 Node.js 版本..."
node_version=$(node -v)
echo "当前 Node.js 版本: $node_version"

# 检查 npm 版本
echo "📋 检查 npm 版本..."
npm_version=$(npm -v)
echo "当前 npm 版本: $npm_version"

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 检查依赖安装是否成功
if [ $? -eq 0 ]; then
    echo "✅ 依赖安装成功"
else
    echo "❌ 依赖安装失败，请检查网络连接或 Node.js 版本"
    exit 1
fi

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查构建是否成功
if [ $? -eq 0 ]; then
    echo "✅ 项目构建成功"
else
    echo "❌ 项目构建失败，请检查代码错误"
    exit 1
fi

# 启动项目
echo "🌐 启动 WebImageCircle..."
echo "访问地址: http://localhost:3000"
echo "按 Ctrl+C 停止服务"
echo "================================"

npm start 