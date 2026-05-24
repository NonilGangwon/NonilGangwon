#!/bin/bash
# EC2 초기 배포 스크립트 (최초 1회 실행)

APP_NAME="nonilgangwon"
APP_DIR="/home/ubuntu/app"
JAR_FILE="$APP_DIR/nonilgangwon.jar"

echo "🚀 Deploying $APP_NAME..."

# 기존 프로세스 종료
sudo systemctl stop $APP_NAME || true

# 새 jar 실행
sudo systemctl start $APP_NAME

echo "✅ Deploy complete!"
sudo systemctl status $APP_NAME
