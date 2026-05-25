#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_common.sh"
log_step "Running lint-staged on staged files"
lint-staged
log_ok "lint-staged completed"
