import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Access from environment variables
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

<<<<<<< HEAD
export const supabase = createClient(supabaseUrl, supabaseKey );
=======
export const supabase = createClient(supabaseUrl, supabaseKey);



>>>>>>> 2a35d2d (feat:delete unused mockup)
