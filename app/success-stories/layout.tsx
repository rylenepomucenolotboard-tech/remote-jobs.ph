import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Success Stories | RemoteJobs.ph",
    description: "Check out how RemoteJobs.ph helped professionals and organizations of all sizes achieve their global expansion goals.",
    alternates: {
        canonical: "/success-stories"
    }
};

export default function SuccessStoriesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
