#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_common.sh"
log_step "Preparing git hooks (husky)"
husky
log_ok "Husky prepared"
