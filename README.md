# RemoteJobs.ph

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🛡️ Change Protection System
This project implements a multi-layered change protection system to prevent accidental deployment overrides.
- **Content Locked**: All platform copy and stats are managed in `/content`.
- **Smoke Tests**: Automated verification engine in `/tests/smoke.test.js`.
- **Workflow**: See [content/README.md](file:///Users/rylenepomuceno/Scraper/Job Board/remotejobs-ph/content/README.md) for safe deployment protocols.

## Getting Started

First, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
