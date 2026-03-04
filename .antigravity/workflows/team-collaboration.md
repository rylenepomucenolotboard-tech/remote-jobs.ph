---
description: How teammates collaborate on this project using Git + Vercel
---

## Team Collaboration Workflow

### Setup (One-time per teammate)
1. Clone the repo:
   ```bash
   git clone https://github.com/rylenepomucenolotboard-tech/remote-jobs.ph.git
   cd remote-jobs.ph
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Open the folder in Antigravity as the workspace — agent rules auto-load from `.antigravity/rules.md` and `.cursorrules`.

### Daily Workflow
1. Always pull latest changes from main before starting:
   ```bash
   git pull origin main
   ```
2. Create a personal branch for your task:
   ```bash
   git checkout -b feature/your-task-name
   ```
3. Work on your changes with the AI agent.
4. Commit and push your branch:
   ```bash
   git add .
   git commit -m "Describe what you changed"
   git push origin feature/your-task-name
   ```
5. Open a Pull Request on GitHub targeting `main`.

### Deployment (Teammate with Vercel access only)
- Once a PR is merged to `main`, Vercel auto-deploys to: https://remote-jobsph.vercel.app/
- To trigger a manual deploy: log in to vercel.com > Project > Redeploy.

### Staying in Sync
```bash
git pull origin main
```
Run this often to avoid merge conflicts!
