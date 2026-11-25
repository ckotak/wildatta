# Security

This is a static brochure site with no server, database or user accounts, so the realistic
risks are leaked secrets, leaked personal details, and unlicensed assets.

## Reporting a problem

Use GitHub's private vulnerability reporting (Security tab, "Report a vulnerability"). Please
don't open a public issue for anything sensitive.

## Repository settings checklist (owner only)

Once the repo is public, turn these on under **Settings**. They need the owner's account and
can't be set from code.

1. **Code security** → enable *Secret scanning* and *Push protection* (free on public repos).
2. **Code security** → enable *Dependabot alerts* and *Dependabot security updates*
   (`.github/dependabot.yml` already schedules version updates).
3. **Code security** → enable *Private vulnerability reporting*.
4. **Branches** → add a rule (or ruleset) for `main`: require a pull request, require the
   status checks *Secret scan* and *Forbidden files*, block force pushes and deletion.
5. **Actions → General** → set workflow permissions to *Read repository contents*, and require
   approval for workflows from first-time contributors.
6. **Pages** → source: *GitHub Actions*. Enforce HTTPS once the custom domain verifies.

## Local checks

Run `sh scripts/setup-hooks.sh` once per clone. It enables the hooks in `.githooks/`, which block
forbidden files and (if `gitleaks` is installed) scan for secrets on commit and push.
