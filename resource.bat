@echo on
cd resource/atlas
call atlas.bat
cd ../../utils
call start python copy.py
call start python table.py
call proto.bat
pause