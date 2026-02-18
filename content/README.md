# Content-Locked Protection System

This directory contains the source of truth for all stats, copy, and visual assets on RemoteJobs.ph. 

## Rules for Developers
1. **NEVER** hardcode a stat or a marketing label inside a React component.
2. **ALWAYS** import from these files.
3. **Branch Protection**: You cannot push directly to `main`. All changes must go through a Pull Request on a feature branch.
4. **Manual Promotion**: Vercel production deployments are triggered manually after reviewing the Preview URL.

## Deployment Workflow
1. **Step 1**: Make changes on a feature branch (e.g., `feat/new-stats`).
2. **Step 2**: Push to feature branch and review at the Vercel Preview URL.
3. **Step 3**: Confirm all changes match the `DEPLOY_CHECKLIST.md` at the preview URL.
4. **Step 4**: Merge to `main` ONLY after preview confirmation.
5. **Step 5**: Manually Promote to Production in the Vercel Dashboard.
6. **Step 6**: Verify the Production URL (`remotejobs-ph.vercel.app`) reflects all changes.

## Environment Variables
The stats in `stats.js` are synced with Vercel Environment Variables. To update a stat permanently, change it in the Vercel Dashboard.
