@echo off
pushd "%~dp0"

rem Recursive get Tools\release\Table\ path upwardly.
set tool=
if        exist Tools\release\Table\ (
       set tool=Tools\release\Table\
) else if exist ..\Tools\release\Table\ (
       set tool=..\Tools\release\Table\
) else if exist ..\..\Tools\release\Table\ (
       set tool=..\..\Tools\release\Table\
) else if exist ..\..\..\Tools\release\Table\ (
       set tool=..\..\..\Tools\release\Table\
) else if exist ..\..\..\..\Tools\release\Table\ (
       set tool=..\..\..\..\Tools\release\Table\
) else if exist ..\..\..\..\..\Tools\release\Table\ (
       set tool=..\..\..\..\..\Tools\release\Table\
) else if exist ..\..\..\..\..\..\Tools\release\Table\ (
       set tool=..\..\..\..\..\..\Tools\release\Table\
) else if exist ..\..\..\..\..\..\..\Tools\release\Table\ (
       set tool=..\..\..\..\..\..\..\Tools\release\Table\
)else if exist release\Table\ (
       set tool=release\Table\
) else if exist ..\release\Table\ (
       set tool=..\release\Table\
) else if exist ..\..\release\Table\ (
       set tool=..\..\release\Table\
) else if exist ..\..\..\release\Table\ (
       set tool=..\..\..\release\Table\
) else if exist ..\..\..\..\release\Table\ (
       set tool=..\..\..\..\release\Table\
) else if exist ..\..\..\..\..\release\Table\ (
       set tool=..\..\..\..\..\release\Table\
) else if exist ..\..\..\..\..\..\release\Table\ (
       set tool=..\..\..\..\..\..\release\Table\
) else if exist ..\..\..\..\..\..\..\release\Table\ (
       set tool=..\..\..\..\..\..\..\release\Table\
)

rem Clear if necessary.
if exist clear.bat call clear.bat

echo %tool%TableBuild .
%tool%TableBuild .

rem =========================================
rem copy
set dest=..\..\MahjongLobby\resource\table
del /Q %dest%\*.json
copy /Y *.json %dest%
::del /Q .\*.json

set dest=..\..\MahjongLobby\src\table
del /Q %dest%\*.ts
copy /Y *.ts %dest%
::del /Q .\*.ts

rem =========================================
rem clear
::del /Q *.json;*.lua;*.ts

popd

if "%1"=="" pause