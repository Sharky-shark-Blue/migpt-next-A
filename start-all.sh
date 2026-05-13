#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "[ERROR] Missing command: $1"
    exit 1
  fi
}

require_cmd pnpm
require_cmd python
require_cmd xiaomusic

if [ ! -f "$ROOT_DIR/apps/example/config.local.js" ]; then
  echo "[ERROR] Missing apps/example/config.local.js"
  echo "Copy apps/example/config.example.js and fill your real values."
  exit 1
fi

if [ ! -f "$ROOT_DIR/xiaomusic.json" ]; then
  echo "[ERROR] Missing xiaomusic.json"
  echo "Copy xiaomusic.example.json and fill your real values."
  exit 1
fi

if [ ! -f "$ROOT_DIR/conf/setting.json" ]; then
  echo "[ERROR] Missing conf/setting.json"
  echo "Copy conf/setting.example.json and fill your real values."
  exit 1
fi

echo "[1/3] Installing Node dependencies"
pnpm install

echo "[2/3] Starting xiaomusic in background"
xiaomusic --config "$ROOT_DIR/conf/setting.json" > "$ROOT_DIR/xiaomusic.log.txt" 2>&1 &

echo "[3/3] Starting MiGPT"
pnpm --filter @mi-gpt/example start
