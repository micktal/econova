import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "https://wkdupbqnobijzmqohpnr.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZHVwYnFub2JpanptcW9ocG5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NjMwMjAsImV4cCI6MjA4MTEzOTAyMH0.YswYQcR56oM1S-HHkrnOxUxqzz_VbPPT2eXaDtd1bN8";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase credentials. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
