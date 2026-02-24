import type { Metadata } from "next";
import "./globals.css";
import MobileStickyCTA from "@/components/MobileStickyCTA";

export const metadata: Metadata = {
  title: "9 Million+ Active Resumes | 15,000+ Roles Filled | RemoteJobs.ph",
  description: "Connect with 1,182+ global companies. Access 9 Million+ active resumes. The premier marketplace for elite Filipino remote talent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RemoteJobs.ph",
    "url": "https://remotejobs-ph.vercel.app/",
    "logo": "https://remotejobs-ph.vercel.app/logo.png",
    "description": "The premier marketplace for connecting global employers with elite Filipino remote talent.",
    "sameAs": [
      "https://facebook.com/remotejobsph",
      "https://linkedin.com/company/remotejobsph"
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body>
        {children}
        <MobileStickyCTA />
      </body>
    </html>
  );
}
