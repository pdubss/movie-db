import { createClient } from "@supabase/supabase-js";
import type { Database } from "./lib/database.types";

const supabaseURL = import.meta.env.VITE_SUPA_URL;
const supabaseKEY = import.meta.env.VITE_SUPA_API_KEY;
export const supabase = createClient<Database>(supabaseURL, supabaseKEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
