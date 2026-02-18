const fs = require('fs');
const path = require('path');

// Simple smoke test runner for CI/CD or pre-promotion checks
const runSmokeTest = async () => {
    console.log("🚀 Starting Antigravity Smoke Test...");

    // In a real CI environment, this would use Playwright/Puppeteer
    // For this implementation, we verify the centralized content files and fallbacks

    try {
        const stats = require('../content/stats.js').STATS;
        const copy = require('../content/copy.js').COPY;

        const assertions = [
            { label: "Active Resumes presence", pass: stats.activeResumes.includes("9 Million+") },
            { label: "Roles Filled presence", pass: stats.rolesFilledTotal.includes("15,000+") },
            { label: "Global Clients presence", pass: stats.globalClients.includes("1,182+") },
            { label: "No zero-stat fallback", pass: !stats.activeResumes.startsWith("0") },
            { label: "Hero CTA Employer correct", pass: copy.hero.ctaEmployer === "Hire a Filipino Developer in 12 Days" },
            { label: "Hero CTA Jobseeker correct", pass: copy.hero.ctaJobseeker === "Get Discovered by Global Employers Today" },
            { label: "No forbidden terms (Company Portal)", pass: !JSON.stringify(copy).includes("Company Portal") },
            { label: "No forbidden terms (pravatar)", pass: !JSON.stringify(require('../content/images.js').IMAGES).includes("pravatar.cc") }
        ];

        let failed = false;
        assertions.forEach(a => {
            if (a.pass) {
                console.log(`✅ PASS: ${a.label}`);
            } else {
                console.log(`❌ FAIL: ${a.label}`);
                failed = true;
            }
        });

        if (failed) {
            console.error("\n🔴 SMOKE TEST FAILED: Deployment Blocked.");
            process.exit(1);
        } else {
            console.log("\n🟢 SMOKE TEST PASSED: Deployment Safe.");
            process.exit(0);
        }
    } catch (error) {
        console.error("error during smoke test:", error);
        process.exit(1);
    }
};

runSmokeTest();
