#!/bin/bash
# Auto-commit and push to the current branch's upstream whenever the agent
# finishes a turn. Fails open (exit 0) so a push problem never blocks Cursor.
set -u

# Discard stdin JSON from the hook runner.
cat >/dev/null 2>&1 || true

cd "$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0

# Nothing to do if the tree is clean.
if [ -z "$(git status --porcelain)" ]; then
  exit 0
fi

branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
[ -z "$branch" ] && exit 0

git add -A || exit 0
git commit -m "auto: $(date '+%Y-%m-%d %H:%M:%S')" >/dev/null 2>&1 || exit 0
git push origin "$branch" >/dev/null 2>&1 || exit 0

exit 0
