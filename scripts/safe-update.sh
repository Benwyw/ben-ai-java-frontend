#!/bin/sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PROJECT_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)

log() {
  printf '%s\n' "$1"
}

fail() {
  printf 'ERROR: %s\n' "$1" >&2
  exit 1
}

confirm() {
  prompt="$1"
  printf '%s [y/N]: ' "$prompt"
  IFS= read -r reply
  case "$reply" in
    y|Y|yes|YES) return 0 ;;
    *) return 1 ;;
  esac
}

usage() {
  cat <<'EOF'
Usage:
  ./scripts/safe-update.sh [package-name]

Examples:
  ./scripts/safe-update.sh
  ./scripts/safe-update.sh axios

What it does:
  1) Runs npm audit first.
  2) Updates one package or all packages with --ignore-scripts.
  3) Regenerates package-lock.json and verifies with npm ci --ignore-scripts.
  4) Prints a git diff summary for package-lock.json.
EOF
}

case "${1-}" in
  -h|--help)
    usage
    exit 0
    ;;
esac

command -v npm >/dev/null 2>&1 || fail "npm is not installed or not on PATH"
command -v git >/dev/null 2>&1 || fail "git is not installed or not on PATH"

cd "$PROJECT_ROOT"

[ -f package.json ] || fail "package.json not found in $PROJECT_ROOT"
[ -f package-lock.json ] || fail "package-lock.json not found in $PROJECT_ROOT"

log "==> Running npm audit (read-only check)"
if ! npm audit; then
  log ""
  log "npm audit reported vulnerabilities."
  if ! confirm "Continue with update anyway"; then
    fail "Aborted by user"
  fi
fi

TARGET_PACKAGE="${1-}"
if [ -z "$TARGET_PACKAGE" ]; then
  printf 'Package to update (leave empty to update all): '
  IFS= read -r TARGET_PACKAGE
fi

if [ -n "$TARGET_PACKAGE" ]; then
  log "==> Updating package: $TARGET_PACKAGE (scripts disabled)"
  npm update "$TARGET_PACKAGE" --ignore-scripts
else
  log "==> Updating all packages allowed by package.json ranges (scripts disabled)"
  npm update --ignore-scripts
fi

log "==> Regenerating package-lock.json (scripts disabled)"
npm install --package-lock-only --ignore-scripts

log "==> Verifying lockfile consistency with npm ci --ignore-scripts"
npm ci --ignore-scripts

log "==> package-lock.json diff summary"
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  if git diff --quiet -- package-lock.json; then
    log "No package-lock.json changes detected."
  else
    git --no-pager diff --stat -- package-lock.json
    log ""
    log "Changed version/resolved/integrity lines:"
    git --no-pager diff --unified=0 -- package-lock.json | grep -E '^[+-][[:space:]]+"(version|resolved|integrity)"' || true
    log ""
    log "Full lockfile diff: git --no-pager diff -- package-lock.json"
  fi
else
  log "Not a git repository; skipping git diff output."
fi

