import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://knykmhimnypopzkkbftt.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtueWttaGltbnlwb3B6a2tiZnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0Njk0MzMsImV4cCI6MjAyOTA0NTQzM30.p9J5FvT5dY99Wk0_23RLeLuSbJsEIqLtJPZYXrzm4zA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
