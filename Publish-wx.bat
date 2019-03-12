@echo off
echo 清理过期资源
rmdir /s/q Egret_wxgame_remote
cd Egret/
egret publish --target wxgame
echo 开始修改
cd ../utils/
start python alterPublishCode-wx.py