#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_common.sh"
log_step "Building web production bundle"
cross-env PLATFORM=WEB TARGET=MAC next build
log_ok "Web build finished"
