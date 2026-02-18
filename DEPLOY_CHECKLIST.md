# Production Deployment Checklist

Every deployment to production MUST be verified against this checklist. If any item fails, trigger an **INSTANT ROLLBACK**.

## STATS VERIFICATION
- [ ] Hero shows "9 Million+ Active Resumes"
- [ ] Impact Card 1 shows "9 Million+" (Active Resumes)
- [ ] Impact Card 2 shows "15,000+" (Roles Filled)
- [ ] Impact Card 3 shows "1,182+" (Global Clients)
- [ ] Impact Card 4 shows "12 Days" (Avg. Time-to-Hire)
- [ ] Footer counter 1: "15,000+ Roles Filled"
- [ ] Footer counter 2: "1,182+ Global Clients"
- [ ] Footer counter 3: "35% Avg. Salary Growth"

## VISUAL & UI VERIFICATION
- [ ] **NO EMOJIS**: Search for 👤, 💼, ✅, 🚀, 🌍. Ensure all icons are Lucide SVGs.
- [ ] **NO CLIPART**: Trust bar above testimonials must be text-only (No dicebear avatars/illustrations).
- [ ] **NO informal badges**: Trust bar must NOT show "+1k".
- [ ] **Candidate Cards**: Show DiceBear illustrated avatars (NOT person emojis).
- [ ] **Formatting**: No double plus `++` visible.
- [ ] **Pricing**: No `$199` visible outside the specific pricing section.

## COPY VERIFICATION
- [ ] Hero Employer CTA: "Hire a Filipino Developer in 12 Days"
- [ ] Hero Jobseeker CTA: "Get Discovered by Global Employers Today"
- [ ] Navigation: "Employer Dashboard" (Not "Company Portal")
- [ ] Navigation: "Get Discovered" (Not "Post Resume")
- [ ] Navigation: "Join Free" (Not "Create Account")

---

# EMERGENCY ROLLBACK PROCEDURE

If any item above fails:
1. **Go to**: [Vercel Dashboard](https://vercel.com/dashboard)
2. **Select**: RemoteJobs.ph Project
3. **Navigate**: "Deployments" in the left sidebar
4. **Identify**: Find the deployment tagged `VERIFIED GOOD — DO NOT DELETE`.
5. **Action**: Click the triple-dot menu (⋮) -> **Promote to Production**.
6. **Wait**: 60 seconds.
7. **Confirm**: Reload [https://remotejobs-ph.vercel.app/](https://remotejobs-ph.vercel.app/) and re-verify checklist.
