@echo off
setlocal

set ROOT_DIR=%~dp0
cd /d "%ROOT_DIR%"

where pnpm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Missing command: pnpm
  exit /b 1
)

where python >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Missing command: python
  exit /b 1
)

where xiaomusic >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Missing command: xiaomusic
  exit /b 1
)

if not exist "%ROOT_DIR%apps\example\config.local.js" (
  echo [ERROR] Missing apps\example\config.local.js
  echo Copy apps\example\config.example.js and fill your real values.
  exit /b 1
)

if not exist "%ROOT_DIR%xiaomusic.json" (
  echo [ERROR] Missing xiaomusic.json
  echo Copy xiaomusic.example.json and fill your real values.
  exit /b 1
)

if not exist "%ROOT_DIR%conf\setting.json" (
  echo [ERROR] Missing conf\setting.json
  echo Copy conf\setting.example.json and fill your real values.
  exit /b 1
)

echo [1/3] Installing Node dependencies
call pnpm install
if errorlevel 1 exit /b 1

echo [2/3] Starting xiaomusic in background
start "xiaomusic" cmd /c "xiaomusic --config "%ROOT_DIR%conf\setting.json" > "%ROOT_DIR%xiaomusic.log.txt" 2>&1"

echo [3/3] Starting MiGPT
call pnpm --filter @mi-gpt/example start
