@echo off
rem Starts the local documentation preview and opens it in the browser.
rem Close this window (or press Ctrl+C) to stop the server.
title Fluid Flux docs - preview
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Download it from https://nodejs.org and run this file again.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing dependencies, this happens only once...
  call npm install
  if errorlevel 1 (
    pause
    exit /b 1
  )
)

echo Starting the preview server. The page will open in your browser.
call npm run docs:dev -- --open
pause
