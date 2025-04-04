import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers';

// URL и ключ можно получить из консоли Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string

export const supabase = createClient(supabaseUrl, supabaseKey)

export const createSupabaseServerClient = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value
   console.log(token)

    return createClient(
        supabaseUrl!,
        supabaseKey!, // или SUPABASE_ANON_KEY, но тут лучше SERVICE_KEY
        {
            global: {
                headers: {
                    Authorization: `Bearer ${token || ''}`,
                },
            },
        }
    );
};