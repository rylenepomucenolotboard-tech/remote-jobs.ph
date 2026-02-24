/**
 * Sync Service for 2-way integration with Kinetic Staff
 * 
 * This service handles data synchronization between RemoteJobs.ph and 
 * the external candidate database at search-candidate.kineticstaff.com.
 */

import { supabase } from './supabase';

// Configuration
const KINETIC_API_URL = process.env.KINETIC_API_URL || 'https://api.kineticstaff.com';
const KINETIC_API_KEY = process.env.KINETIC_API_KEY || '';

export interface KineticCandidate {
    p_uuid: string;
    position: string;
    skills: string; // Comma separated string from Kinetic
    total_experience: string;
    expected_fee: {
        amount: number;
        currency: string;
        period: string;
    };
}

/**
 * Log a sync operation to the database
 */
async function logSync(details: {
    entity_type: 'job' | 'resume' | 'application';
    entity_id: string;
    direction: 'to_external' | 'from_external';
    status: 'success' | 'failed' | 'pending';
    external_id?: string;
    error_message?: string;
}) {
    try {
        await supabase.from('sync_log').insert({
            entity_type: details.entity_type,
            entity_id: details.entity_id,
            sync_direction: details.direction,
            external_id: details.external_id,
            status: details.status,
            error_message: details.error_message,
            synced_at: new Date().toISOString()
        });
    } catch (err) {
        console.error('Failed to write sync log:', err);
    }
}

/**
 * Sync a resume to Kinetic Staff platform
 * (Pushing local candidate profile to external database)
 */
export async function syncResumeToKinetic(resumeId: string) {
    try {
        const { data: resume, error } = await supabase
            .from('resumes')
            .select('*, profiles(*)')
            .eq('id', resumeId)
            .single();

        if (error) throw error;

        // Implementation Note: Since official write-access API is pending,
        // we log this as a pending sync.
        await logSync({
            entity_type: 'resume',
            entity_id: resumeId,
            direction: 'to_external',
            status: 'pending',
            error_message: 'External write-access API not configured yet'
        });

        console.log('Resume sync payload prepared for:', resumeId);
        return { success: true, status: 'pending' };
    } catch (error: any) {
        console.error('Resume Sync error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Sync a job posting to Kinetic Staff platform
 */
export async function syncJobToKinetic(jobId: string) {
    try {
        const { data: job, error } = await supabase
            .from('jobs')
            .select('*, profiles(*)')
            .eq('id', jobId)
            .single();

        if (error) throw error;

        await logSync({
            entity_type: 'job',
            entity_id: jobId,
            direction: 'to_external',
            status: 'pending',
            error_message: 'External job-post API not configured yet'
        });

        console.log('Job sync payload prepared for:', jobId);
        return { success: true, status: 'pending' };
    } catch (error: any) {
        console.error('Job Sync error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Fetch candidates from Kinetic Staff and sync to local database
 * (Pulling external candidates into Job Seeker profiles)
 */
export async function fetchCandidatesFromKinetic(keyword: string = 'Developer') {
    try {
        console.log(`Starting candidate fetch for keyword: ${keyword}`);

        // TODO: Replace with real API call or Scraper trigger
        // Example structure for when API is ready:
        /*
        const response = await fetch(`${KINETIC_API_URL}/v1/candidates/search?keyword=${encodeURIComponent(keyword)}`, {
            headers: { 'Authorization': `Bearer ${KINETIC_API_KEY}` }
        });
        const data = await response.json();
        const candidates: KineticCandidate[] = data.candidates;
        */

        // For now, we return a structural placeholder
        return {
            success: true,
            message: 'Ready for integration. Search logic prepared for p_uuid mapping.',
            target_endpoint: `${KINETIC_API_URL}/v1/candidates/search`
        };

    } catch (error: any) {
        console.error('Fetch Candidates error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Map a Kinetic Candidate to our local database schema
 */
export async function ingestKineticCandidate(candidate: KineticCandidate) {
    try {
        console.log('Ingesting candidate:', candidate.p_uuid);

        // 1. Create/Update Profile
        // Note: For external candidates, we use a system-controlled ID or the p_uuid
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .upsert({
                id: candidate.p_uuid, // Using p_uuid as the ID for external profiles
                user_type: 'jobseeker',
                full_name: 'Kinetic Candidate', // Names are often hidden on Kinetic until contact
                role: candidate.position,
                years_of_experience: parseInt(candidate.total_experience) || 0,
                expected_salary: `${candidate.expected_fee.amount} ${candidate.expected_fee.currency} ${candidate.expected_fee.period}`,
                updated_at: new Date().toISOString()
            }, { onConflict: 'id' })
            .select()
            .single();

        if (profileError) throw profileError;

        // 2. Create/Update Resume entry
        const skillsArray = candidate.skills.split(',').map(s => s.trim()).filter(Boolean);

        const { error: resumeError } = await supabase
            .from('resumes')
            .upsert({
                jobseeker_id: profile.id,
                skills: skillsArray,
                experience_years: profile.years_of_experience,
                file_name: 'Kinetic Sync Profile',
                file_url: 'https://search-candidate.kineticstaff.com/external-resume-view/' + candidate.p_uuid,
                updated_at: new Date().toISOString()
            }, { onConflict: 'jobseeker_id' });

        if (resumeError) throw resumeError;

        await logSync({
            entity_type: 'resume',
            entity_id: candidate.p_uuid,
            direction: 'from_external',
            status: 'success',
            external_id: candidate.p_uuid
        });

        return { success: true, profileId: profile.id };
    } catch (error: any) {
        console.error('Ingestion error:', error);
        await logSync({
            entity_type: 'resume',
            entity_id: candidate.p_uuid,
            direction: 'from_external',
            status: 'failed',
            error_message: error.message
        });
        return { success: false, error: error.message };
    }
}

/**
 * Setup webhook listeners for real-time sync
 */
export async function setupWebhooks() {
    console.log('Webhook infrastructure placeholder ready');
}
