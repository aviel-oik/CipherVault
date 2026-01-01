import { createClient } from '@supabase/supabase-js';;
import 'dotenv/config.js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);
console.log('connection to Supabase successful');

export default supabase