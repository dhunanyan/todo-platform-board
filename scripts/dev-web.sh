#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_common.sh"
log_step "Starting web development server"
cross-env PLATFORM=WEB TARGET=MAC next dev
