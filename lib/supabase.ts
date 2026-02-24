import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export type UserType = 'employer' | 'jobseeker';
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type JobStatus = 'active' | 'closed' | 'draft';
export type ApplicationStatus = 'pending' | 'reviewed' | 'shortlisted' | 'rejected';

export interface Profile {
  id: string;
  user_type: UserType;
  full_name: string;
  company_name?: string;
  phone?: string;
  country?: string;
  role_hiring_for?: string;
  budget_message?: string;
  years_of_experience?: number;
  expected_salary?: string;
  role?: string;
  resume_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  employer_id: string;
  title: string;
  description: string;
  requirements?: string;
  salary_range?: string;
  location: string;
  job_type: JobType;
  category: string;
  deadline?: string;
  status: JobStatus;
  perks?: string[];
  is_featured?: boolean;
  created_at: string;
  updated_at: string;
  profiles?: Profile; // Joined data
}

export interface Resume {
  id: string;
  jobseeker_id: string;
  file_url: string;
  file_name: string;
  skills?: string[];
  experience_years?: number;
  education?: string;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  job_id: string;
  jobseeker_id: string;
  resume_id?: string;
  cover_letter?: string;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}
