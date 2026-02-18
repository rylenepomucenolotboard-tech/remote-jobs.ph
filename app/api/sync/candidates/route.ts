import { NextRequest, NextResponse } from 'next/server';
import { fetchCandidatesFromKinetic, ingestKineticCandidate, KineticCandidate } from '@/lib/sync';

export async function POST(req: NextRequest) {
    try {
        const { keyword } = await req.json();

        // This is where we would trigger the scraper or the external API
        const syncResult = await fetchCandidatesFromKinetic(keyword);

        if (!syncResult.success) {
            return NextResponse.json({ error: syncResult.error }, { status: 500 });
        }

        // Return the instruction for the client-side sync 
        // until the server-side scraper is fully configured
        return NextResponse.json({
            message: "Sync structure ready. Server-side scraping pending API credentials.",
            details: syncResult
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
