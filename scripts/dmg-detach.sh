#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/_common.sh"
log_step "Detaching stale DMG volume if mounted"
hdiutil detach "/Volumes/Task Flow Board" -force >/dev/null 2>&1 || log_warn "No mounted Task Flow Board DMG volume"
log_ok "DMG detach step finished"
