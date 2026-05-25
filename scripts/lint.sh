#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_common.sh"
log_step "Running ESLint"
next lint
log_ok "Lint completed"
