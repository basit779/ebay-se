---
name: Auto-commit and push after changes
description: User wants every batch of code changes auto-committed and pushed to origin/main without asking
type: feedback
---

After completing any code changes, automatically commit and `git push origin main` without asking for confirmation.

**Why:** User's deployment pipeline (likely Vercel) auto-deploys from `main`. They got annoyed when I made changes but didn't push, leaving the deployment stale. They explicitly said "always push it aight it".

**How to apply:**
- After finishing a logical batch of edits, run `git add <specific files>`, commit with a clear message, and `git push origin main`.
- If push fails due to remote-ahead, `git pull --rebase origin main` then push again.
- Still avoid `--force`, `--no-verify`, and never push to other branches without asking.
- Don't push partial/broken work — commit only when the batch is in a working state.
