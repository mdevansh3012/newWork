import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mawtqlqvhiersaunvefm.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hd3RxbHF2aGllcnNhdW52ZWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MTE1NDYsImV4cCI6MjA2MDE4NzU0Nn0.yp6-PyDFEWWmBQx3_KDnPIMNEe9oeV4mjR3MvCDvHq4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
