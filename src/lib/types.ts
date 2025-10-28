export interface Profile {
  id: string
  name: string
  title: string
  bio: string
  profile_image_url?: string
  resume_url?: string
  email?: string
  facebook?: string
  location?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  image_url?: string
  tech_stack: string[]
  live_url?: string
  github_url?: string
  featured: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  name: string
  category: string
  proficiency_level: number
  icon_url?: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface Experience {
  id: string
  company: string
  position: string
  description: string
  start_date: string
  end_date?: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      profile: {
        Row: Profile
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
      }
      projects: {
        Row: Project
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>
      }
      skills: {
        Row: Skill
        Insert: Omit<Skill, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Skill, 'id' | 'created_at' | 'updated_at'>>
      }
      experiences: {
        Row: Experience
        Insert: Omit<Experience, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Experience, 'id' | 'created_at' | 'updated_at'>>
      }
      contact_submissions: {
        Row: ContactSubmission
        Insert: Omit<ContactSubmission, 'id' | 'created_at'>
        Update: Partial<Omit<ContactSubmission, 'id' | 'created_at'>>
      }
    }
  }
}
