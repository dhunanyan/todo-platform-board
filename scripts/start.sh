#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_common.sh"
log_step "Starting production Next.js server"
next start
