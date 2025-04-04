import { NextRequest, NextResponse } from 'next/server';
import { supabase } from './modules/services/db/supabase/model';
import { User, UserResponse } from '@supabase/supabase-js';


export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    console.log('Middleware сработал:', req.nextUrl.pathname)

    // Если токена нет — перенаправляем на логин
    if (!token) {
        console.log('Middleware редирект:', req.nextUrl.pathname)
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    try {
        // Проверяем JWT токен
        const { data, error } = await supabase.auth.getUser(token) as UserResponse;
        if (error) {
            if (token) {
                console.log('Ошибка авторизации:', error?.message || 'User not found');
                const response = NextResponse.redirect(new URL('/auth/login', req.url));
                response.cookies.delete('token');  // Важно удалять токен!
                return response;
            }
            console.log('Midlware Authentication error: ' + error)
            return NextResponse.redirect(new URL('/', req.url));
        }
        const user = data && data.user as User | undefined
        if (!user) {
            console.log('Midlware user not found: ' + data)
            return NextResponse.redirect(new URL('/', req.url));
        }
        const role = user?.user_metadata.role
        console.log('Middleware role:', role)

        // Если роль не админ и запрос в /admin - редирект на главную
        if (req.nextUrl.pathname.startsWith('/admin') && role !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url));
        }

        // Все в порядке - продолжаем
        return NextResponse.next();
    } catch (err) {
        console.error('Ошибка проверки токена:', err);
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }
}

// export async function middleware(req: NextRequest) {
//     console.log('Middleware сработал:', req.nextUrl.pathname);

//     if (req.nextUrl.pathname.startsWith('/admin')) {
//         console.log('Проверка доступа к админке');
//     }

//     return NextResponse.next();
// }


export const config = {
    matcher: ['/admin/:path*'],
};


