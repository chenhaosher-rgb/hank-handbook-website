#!/bin/bash

# 红人汉克手册 - 本地预览服务器启动脚本

echo "🚀 正在启动红人汉克手册网站..."
echo ""
echo "服务器地址: http://localhost:8000"
echo "按 Ctrl+C 停止服务器"
echo ""
echo "================================================"

# 启动 Python HTTP 服务器
python3 -m http.server 8000

