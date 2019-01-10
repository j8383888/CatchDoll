@echo on
cd resource/atlas
call atlas.bat
cd ../../utils
start python copy.py
pause