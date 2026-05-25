#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_common.sh"
log_step "Building desktop app for macOS"
clean_desktop_build_artifacts
cross-env PLATFORM=DESKTOP TARGET=MAC next build
yarn dmg:detach
electron-builder --mac
log_ok "macOS build finished"
