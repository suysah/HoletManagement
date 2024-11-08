import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://wlxzskwxwmqfiorfwcdd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndseHpza3d4d21xZmlvcmZ3Y2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NjQzOTksImV4cCI6MjA0MzU0MDM5OX0.ZFRhEi1dL5z6oYtDHGC5vNUXnaHIuEpDW4gI5OeLgsg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
