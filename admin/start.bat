@echo off
echo.
echo  =============================================
echo   Niyan Tech — App Manager
echo  =============================================
echo.
cd /d "%~dp0"

:: Check if node_modules exists, if not run npm install
if not exist "node_modules" (
  echo  Installing dependencies...
  npm install
  echo.
)

echo  Starting App Manager server...
echo  Opening browser at: http://localhost:3000/admin
echo  Press Ctrl+C to stop.
echo.
start http://localhost:3000/admin
node server.js
pause
