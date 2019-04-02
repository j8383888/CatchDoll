@echo off
echo 清理过期资源
cd Egret/bin-release
rmdir /s/q web
cd ../
call Publish.bat
echo 开始修改
cd ../utils/
start python alterPublishCode.py
pause