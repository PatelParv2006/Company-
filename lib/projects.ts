export type Project = {
  id: string;
  created_at?: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  live_url: string;
  case_study_content: string;
  is_featured: boolean;
};

// All projects are now fetched from Supabase.
export const projects: Project[] = [];

