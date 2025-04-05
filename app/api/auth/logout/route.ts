import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/modules/services/db/supabase/model/supabaseServer';

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value;

        // Инициализируем Supabase клиента
        const supabase = await createSupabaseServerClient(token);

        // Вызываем метод logout
        const { error } = await supabase.auth.signOut();
        if (error) throw new Error(error.message);

        // Создаем ответ и удаляем куки
        const response = NextResponse.json({ message: 'Логаут успешен' });

        // Удаляем токены из куков
        response.cookies.delete('token');
        response.cookies.delete('refresh_token');

        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Неизвестная ошибка' }, { status: 500 });
    }
}