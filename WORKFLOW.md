# 👩‍💻 Team Workflow — remote-jobs.ph

**Repo:** https://github.com/rylenepomucenolotboard-tech/remote-jobs.ph  
**Production:** https://remote-jobs.ph.vercel.app  
**Team:** Des + Teammate  
**Deploys:** Vercel auto-deploys every time a PR is merged to `main`

---

## ✅ STEP 1 — Verify Your GitHub Remote (Run Once)

```bash
git remote -v
```

**Expected output:**
```
origin  https://github.com/rylenepomucenolotboard-tech/remote-jobs.ph.git (fetch)
origin  https://github.com/rylenepomucenolotboard-tech/remote-jobs.ph.git (push)
```

**If the URL is wrong, fix it:**
```bash
git remote set-url origin https://github.com/rylenepomucenolotboard-tech/remote-jobs.ph.git
```

---

## ✅ STEP 2 — Verify You're NOT on Main

```bash
git branch
# The line with * is your current branch.
# You should NEVER commit directly to main.
```

**If you are on `main`, create your own branch immediately:**
```bash
git checkout -b feature/des-[task-name]       # for Des
git checkout -b feature/teammate-[task-name]  # for Teammate
# Example: git checkout -b feature/des-fix-homepage
```

**To see ALL branches (local + remote):**
```bash
git branch -a
```

---

## ✅ STEP 3 — Verify GitHub Auth (Run Once)

```bash
# Try pushing HEAD to your current branch
git push origin HEAD
```

**If you get a `403 Permission Denied` error:**
1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Check scopes: `repo`, `workflow`
4. Copy the token
5. In Git Credential Manager, when asked for a password → paste the token
6. Or set it directly:
   ```
   git remote set-url origin https://YOUR_TOKEN@github.com/rylenepomucenolotboard-tech/remote-jobs.ph.git
   ```

---

## 🔁 DAILY WORKFLOW — Before Starting Work

> Run these EVERY time you sit down to start coding.

```bash
# 1. Go back to main and pull the latest changes from GitHub
git checkout main
git pull origin main

# 2. Create a new branch named after your task
git checkout -b feature/des-[task-name]
# Example: git checkout -b feature/des-update-hero

# 3. Start coding!
```

---

## 🔁 DAILY WORKFLOW — After Finishing Work

> Run these when you're done coding and ready to share your work.

```bash
# 1. Stage all your changed files
git add .

# 2. Commit with a clear message (what did you actually change?)
git commit -m "Brief description of what you changed"
# Example: git commit -m "Update hero section copy and mobile layout"

# 3. Push your branch up to GitHub
git push origin feature/des-[task-name]

# 4. Open a Pull Request on GitHub:
#    → Go to: https://github.com/rylenepomucenolotboard-tech/remote-jobs.ph
#    → Click the yellow "Compare & pull request" banner
#    → Set base branch to: main
#    → Write a title and short description
#    → Click "Create Pull Request"
#    → Teammate reviews → approves → merges → Vercel auto-deploys ✅
```

---

## 🚀 STEP 5 — Vercel Auto-Deploy Verification

After a PR is merged to `main`:

1. Go to: https://vercel.com/dashboard
2. Click the **remote-jobs-ph** project
3. Click **"Deployments"** in the left sidebar
4. The top row should show `Building` → then **`Ready` ✅** (green)

### What success looks like:
- Status badge: **Ready** (green checkmark)  
- "Visit" button links to the live production URL  
- The commit message matches your PR title  

### What failure looks like:
- Status badge: **Error** (red X)  
- Click → **"View Logs"** to see exactly what broke  

### 3 Most Common Auto-Deploy Failures

| # | Root Cause | Fix |
|---|-----------|-----|
| 1 | **Build error** — TypeScript or linting error | Read Vercel logs → fix the error → push a new commit |
| 2 | **Missing environment variable** | Vercel → Project → **Settings** → **Environment Variables** → add the missing variable → redeploy |
| 3 | **Auto-deploy not triggering at all** | Vercel → Project → **Settings** → **Git** → verify "Production Branch" is set to `main` and the GitHub integration is connected |

---

## 🤝 TEAMMATE SYNC — Commands for Rylen/Teammate

```bash
# Every morning before starting work:
git checkout main
git pull origin main

# Create your own branch:
git checkout -b feature/teammate-[task-name]

# Then code normally, commit, push, and open a PR.
```

---

## 🧠 CONFLICT PREVENTION — The Golden Rules

> **Rule 1: Work in different folders/files whenever possible.**

| Des owns… | Teammate owns… |
|---|---|
| `app/` pages & routing | `components/` UI components |
| `content/` copy & text | `public/` assets & images |
| `lib/` utilities | `styles/` CSS & Tailwind |

> **Rule 2: One person per feature at a time.**  
> If you both need to touch the same file → agree who edits first → they commit & push → the other pulls before editing.

> **Rule 3: Sync before starting, always.**  
> `git pull origin main` is the very first command you run every day.

---

## 📋 QUICK REFERENCE CARD

```bash
# ─── START OF DAY ───────────────────────────────
git checkout main
git pull origin main
git checkout -b feature/your-task-name

# ─── END OF DAY ─────────────────────────────────
git add .
git commit -m "Describe what you did"
git push origin feature/your-task-name
# → Then open a Pull Request on GitHub

# ─── SYNC TEAMMATE'S CHANGES MID-TASK ────────────
git checkout main
git pull origin main
git checkout feature/your-task-name
git merge main
# Resolve any conflicts, then commit

# ─── CHECK WHERE YOU ARE ─────────────────────────
git status          # what files changed?
git branch          # what branch am I on?
git log --oneline   # recent commits
```

---

*Last updated: 2026-03-02 | Maintained by Des & Teammate*
