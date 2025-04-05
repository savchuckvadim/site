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
            // if (token) {
            //     console.log('Ошибка авторизации:', error?.message || 'User not found');
            //     const response = NextResponse.redirect(new URL('/auth/login', req.url));
            //     response.cookies.delete('token');  // Важно удалять токен!
            //     return response;
            // }
            // console.log('Midlware Authentication error: ' + error)
            // return NextResponse.redirect(new URL('/', req.url));

            if (error.message.includes('token is expired')) {
                console.log('Токен протух, пытаемся обновить...');
                const refreshToken = req.cookies.get('refresh_token')?.value;
            
                if (!refreshToken) {
                    console.log('Нет refresh токена, перенаправляем на логин');
                    const response = NextResponse.redirect(new URL('/auth/login', req.url));
                    response.cookies.delete('token');
                    response.cookies.delete('refresh_token');
                    return response;
                }
            
                // Пытаемся обновить токен
                const { data: sessionData, error: refreshError } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
            
                if (refreshError || !sessionData?.session) {
                    console.log('Ошибка обновления токена:', refreshError?.message || 'Не удалось обновить сессию');
                    const response = NextResponse.redirect(new URL('/auth/login', req.url));
                    response.cookies.delete('token');
                    response.cookies.delete('refresh_token');
                    return response;
                }
            
                const newSession = sessionData.session;
                console.log('Токен успешно обновлен');
            
                const response = NextResponse.next();
                response.cookies.set('token', newSession.access_token, { httpOnly: true, path: '/', secure: true, sameSite: 'lax' });
                response.cookies.set('refresh_token', newSession.refresh_token, { httpOnly: true, path: '/', secure: true, sameSite: 'lax' });
                return response;
            }

            console.log('Ошибка авторизации:', error.message);
            const response = NextResponse.redirect(new URL('/auth/login', req.url));
            response.cookies.delete('token');
            response.cookies.delete('refresh_token');
            return response;
        }
        const user = data && data.user as User | undefined
        console.log('Middleware user:', user)
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


