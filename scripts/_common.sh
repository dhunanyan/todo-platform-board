#!/usr/bin/env bash
set -euo pipefail

if [[ -t 1 ]]; then
  C_RESET='\033[0m'
  C_BLUE='\033[1;34m'
  C_GREEN='\033[1;32m'
  C_YELLOW='\033[1;33m'
  C_RED='\033[1;31m'
else
  C_RESET=''
  C_BLUE=''
  C_GREEN=''
  C_YELLOW=''
  C_RED=''
fi

log_step() {
  echo -e "${C_BLUE}▶${C_RESET} $1"
}

log_ok() {
  echo -e "${C_GREEN}✔${C_RESET} $1"
}

log_warn() {
  echo -e "${C_YELLOW}⚠${C_RESET} $1"
}

log_err() {
  echo -e "${C_RED}✖${C_RESET} $1"
}

clean_desktop_build_artifacts() {
  log_step "Cleaning previous build artifacts (.next, out, release)"
  rm -rf .next out release
}
