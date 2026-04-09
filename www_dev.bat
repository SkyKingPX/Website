@echo off
cd /d "%~dp0www.soncresity.industries"

if not exist "node_modules" (
    echo Installing npm dependencies...
    call npm i --force
)

call npm run dev