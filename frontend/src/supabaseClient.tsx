import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_SUPA_URL;
const supabaseKEY = import.meta.env.VITE_SUPA_API_KEY;
export const supabase = createClient(supabaseURL, supabaseKEY);
