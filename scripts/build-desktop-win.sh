#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_common.sh"
log_step "Building desktop app for Windows"
clean_desktop_build_artifacts
cross-env PLATFORM=DESKTOP TARGET=WIN next build
electron-builder --win
log_ok "Windows build finished"
