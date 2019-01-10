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
REM set dest=..\..\MahjongLobby\resource\data
REM del /Q %dest%\*.json
REM copy /Y *.json %dest%
REM del /Q .\*.json
REM set dest=..\..\MahjongLobby\src\table
REM del /Q %dest%\*.ts
REM copy /Y *.ts %dest%
REM del /Q .\*.ts

rem =========================================
rem clear
::del /Q *.json;*.lua;*.ts

popd

if "%1"=="" pause