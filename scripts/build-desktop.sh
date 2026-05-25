#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_common.sh"
log_step "Building desktop app (default targets)"
cross-env PLATFORM=DESKTOP TARGET=MAC next build
yarn dmg:detach
electron-builder
log_ok "Desktop build finished"
