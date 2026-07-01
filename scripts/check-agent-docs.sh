#!/usr/bin/env bash
# Verify CLAUDE.md and AGENTS.md stay in sync as a single source of truth.
#
# CLAUDE.md is a symlink to AGENTS.md (see .gitattributes). On clients with
# `core.symlinks=false` the symlink may be checked out as a plain copy and
# silently drift. This script catches drift at pre-commit / CI time.
#
# Exit 0 if everything is consistent, non-zero otherwise.

set -euo pipefail

# Resolve repo root from the script's location so this works from any cwd.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CLAUDE="$REPO_ROOT/CLAUDE.md"
AGENTS="$REPO_ROOT/AGENTS.md"

fail() { echo "check-agent-docs: $*" >&2; exit 1; }

# 1. AGENTS.md (source of truth) must exist.
[ -e "$AGENTS" ] || fail "AGENTS.md not found at $AGENTS"

# 2. CLAUDE.md must exist as a symlink.
[ -L "$CLAUDE" ] || fail "CLAUDE.md is not a symlink (or missing). Restore with: rm -f CLAUDE.md && ln -s AGENTS.md CLAUDE.md"

# 3. The symlink target must resolve.
TARGET="$(readlink "$CLAUDE")"
[ -n "$TARGET" ] || fail "CLAUDE.md symlink has empty target"
[ -e "$CLAUDE" ] || fail "CLAUDE.md symlink target '$TARGET' is broken (does not exist)"

# 4. CLAUDE.md must point at AGENTS.md. If it points anywhere else (even
#    by accident), the single-source-of-truth invariant is broken.
case "$TARGET" in
  AGENTS.md|./AGENTS.md) ;;
  *) fail "CLAUDE.md points to '$TARGET', expected AGENTS.md. Re-link with: rm CLAUDE.md && ln -s AGENTS.md CLAUDE.md" ;;
esac

# 5. (No byte-diff needed: with the symlink intact above, the contents of
#    CLAUDE.md and AGENTS.md are by definition identical. If this script
#    ever needs to support a non-symlink mode, add a byte-equal check
#    here using `cmp <(cat "$CLAUDE") <(cat "$AGENTS")` or similar.)

echo "check-agent-docs: OK (CLAUDE.md -> $(readlink "$CLAUDE"))"
