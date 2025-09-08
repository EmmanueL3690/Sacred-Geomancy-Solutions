import { createClient } from "@supabase/supabase-js";

// src/config.js
export const SUPABASE_URL = "https://fbgoesnmoxdodlqlwduv.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZ29lc25tb3hkb2RscWx3ZHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNjU3MTUsImV4cCI6MjA3Mjc0MTcxNX0.BsWDiK43af5i7dtOmYB5tbS5y0eOMQ6VTkYL0ukSUOU"; // your anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
