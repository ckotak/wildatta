#!/bin/sh
# Shared by the git hooks and CI. Source it, then call: check_forbidden_files "<newline-separated paths>"
# Returns 1 if any path is something that must never be published from this repo.
check_forbidden_files() {
  bad=$(printf '%s\n' "$1" | grep -E \
    -e '(^|/)\.env($|\.)' \
    -e '\.(pem|key|p12|pfx|keystore|jks)$' \
    -e '(^|/)id_(rsa|ed25519|ecdsa)' \
    -e '\.(zip|7z|rar|tar|tgz|gz)$' \
    -e '\.(psd|ai|sketch|fig|indd)$' \
    -e '\.(otf|ttf|eot)$' \
    -e '(^|/)(Wild Atta Design System|design-system)/' \
    -e '\.(heic|raw|dng|cr2|nef)$' \
    -e '\.(sql|sqlite|db|csv|xlsx?)$' || true)
  if [ -n "$bad" ]; then
    echo "Blocked: these files must not be committed to this public repo:" >&2
    printf '  %s\n' $bad >&2
    echo "See 'Never commit' in AGENTS.md. If a file is genuinely safe to publish, ask Chetan first." >&2
    return 1
  fi
}
