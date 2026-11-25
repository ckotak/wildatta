#!/bin/sh
# One-time setup per clone: point git at the versioned hooks in .githooks/.
set -e
cd "$(git rev-parse --show-toplevel)"
git config core.hooksPath .githooks
chmod +x .githooks/* scripts/*.sh
echo "Git hooks enabled (core.hooksPath=.githooks)."
command -v gitleaks >/dev/null 2>&1 || echo "Tip: install gitleaks (brew install gitleaks) so the hooks can scan for secrets."
