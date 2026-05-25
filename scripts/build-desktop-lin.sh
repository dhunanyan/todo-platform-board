#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_common.sh"
log_step "Building desktop app for Linux"
cross-env PLATFORM=DESKTOP TARGET=LIN next build
electron-builder --linux
log_ok "Linux build finished"
