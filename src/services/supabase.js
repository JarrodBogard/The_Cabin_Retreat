import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://nvpukmekgnacnridbglh.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52cHVrbWVrZ25hY25yaWRiZ2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5MzA1ODksImV4cCI6MjAzNzUwNjU4OX0.d_QsEReA8nHYq6dw5nPj0MLlAw8PNoAGQL5fIJ97oqU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
