@echo off
echo ���������Դ
rmdir /s/q Egret_wxgame_remote
cd Egret/
egret publish --target wxgame
echo ��ʼ�޸�
cd ../utils/
start python alterPublishCode-wx.py