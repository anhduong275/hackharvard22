import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ezrvecuiqcohtlxcanhl.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl as string, supabaseKey as string);

export default supabase;
