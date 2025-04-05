import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/modules/services/db/supabase/model/supabaseServer';




export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value;
        const supabase = await createSupabaseServerClient(token)
        const { email, password } = await req.json();

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) throw new Error(error.message);

        if (!data.user?.email_confirmed_at) {
            throw new Error("Email не подтвержден. Проверьте свою почту.");
        }

        console.log(data.user)
        // Если аутентификация прошла успешно, записываем токены в куки
        if (data.session) {
            const { access_token, refresh_token, expires_at } = data.session;

            const response = NextResponse.json(data.user);

            response.cookies.set('token', access_token, {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: expires_at ? expires_at - Math.floor(Date.now() / 1000) : 60 * 60,
            });
            response.cookies.set('refresh_token', refresh_token, {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30, // 30 дней
            });

            return response;
        }

        return NextResponse.json({ error: 'Ошибка логина' }, { status: 401 });
    }catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Неизвестная ошибка' }, { status: 500 });
    }
}
