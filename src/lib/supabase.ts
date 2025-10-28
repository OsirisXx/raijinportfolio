import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tqjkoiylfwbxgbivxifn.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxamtvaXlsZndieGdiaXZ4aWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyOTAxNjYsImV4cCI6MjA3Njg2NjE2Nn0.ONRAulxh7D9Wgr_N2LmeklowVk1ww3Hh0nFUQmQx01Y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey
)
