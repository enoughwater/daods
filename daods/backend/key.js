import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  keys.env.SUPABASE_URL,
  keys.env.SUPABASE_ANON_KEY
)