import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RemoteJobs.ph - Find Remote Work & Hire Filipino Talent",
  description: "Connect employers with talented Filipino remote workers. Post jobs for free or find your next remote opportunity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
