@echo off
echo ���������Դ
cd Egret/bin-release
rmdir /s/q web
cd ../
call Publish.bat
echo ��ʼ�޸�
cd ../utils/
start python alterPublishCode.py
pause