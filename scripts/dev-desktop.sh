#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_common.sh"
log_step "Starting desktop development (Next.js + Electron)"
concurrently -k "cross-env PLATFORM=DESKTOP TARGET=MAC next dev" "wait-on http://localhost:3000 && cross-env PLATFORM=DESKTOP TARGET=MAC electron ."
