import { createClient } from '@supabase/supabase-js'



// URL и ключ можно получить из консоли Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string

export const supabase = createClient(supabaseUrl, supabaseKey)

export const createSupabaseServerClient = async (token?: string) => {
    // const cookieStore = await cookies();
    // const token = cookieStore.get('token')?.value
   console.log(token)

    return createClient(
        supabaseUrl!,
        supabaseKey!, // или SUPABASE_ANON_KEY, но тут лучше SERVICE_KEY
        {
            global: {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            },
            auth: {
                autoRefreshToken: false, // На сервере не используем автообновление
                persistSession: false,   // Сессии в localStorage на сервере нет
                detectSessionInUrl: false,
            },
        }
    );
};




// const supaServerClient = await createSupabaseServerClient()

// export enum SModel {
//     PROJECTS = 'projects',
//     PROJECT = 'project',
//     SERVICES = 'services',
//     SERVICE = 'service',
//     PROJECT_DETAILS = 'project_details',
//     USERS = 'users',
//     PROFILES = 'profiles'
// }


// export const supaAuth = {
//     register: async (email: string, password: string) => {
//         try {
//             const redirectUrl = `${window.location.origin}/auth/confirm`;
//             let role = 'user'
//             const lowwerEmail = email.toLocaleLowerCase()
//             const adminEmails = ['savchuckvadim@gmail.com', 'volkovgoods@gmail.com']
//             if (adminEmails.includes(lowwerEmail)) {
//                 role = 'admin'
//             }

//             const { data, error } = await supaServerClient.auth.signUp({
//                 email: email,
//                 password: password,
//                 options: {
//                     data: {
//                         role: role,
//                     },
//                     emailRedirectTo: redirectUrl
//                 }
//             } as SignUpWithPasswordCredentials,
//             );

//             if (error) throw error;

//             // if (data?.user) {

//             //     // Сохраняем токен, если регистрация прошла успешно
//             //     if (data.session?.access_token) {
//             //         document.cookie = `token=${data.session?.access_token}; path=/; SameSite=Lax; Secure;`;

//             //     }
//             // }
//             if (data.session) {
//                 const { access_token, refresh_token, expires_at } = data.session;

//                 const response = NextResponse.next();
//                 response.cookies.set('token', access_token, {
//                     path: '/',
//                     httpOnly: true,
//                     secure: true,
//                     sameSite: 'lax',
//                     maxAge: expires_at ? expires_at - Math.floor(Date.now() / 1000) : 60 * 60, // Время до истечения
//                 });
//                 response.cookies.set('refresh_token', refresh_token, {
//                     path: '/',
//                     httpOnly: true,
//                     secure: true,
//                     sameSite: 'lax',
//                     maxAge: 60 * 60 * 24 * 30, // 30 дней
//                 });

//                 console.log('Регистрация успешна: токены сохранены.');
//                 return response;
//             }
//             return data;
//         } catch (error: any) {
//             throw new Error(error.message || 'Ошибка регистрации');
//         }
//     },

//     login: async (email: string, password: string) => {
//         const { data, error } = await supaServerClient.auth.signInWithPassword({ email, password });

//         if (error) throw error;
//         // Проверяем подтверждение email
//         if (!data.user?.email_confirmed_at) {
//             throw new Error("Email не подтвержден. Проверьте свою почту.");
//         }
//         // if (data?.session) {
//         //     document.cookie = `token=${data.session.access_token}; path=/; SameSite=Lax; Secure;`;
//         // }
//         // Сохраняем токены в куки при успешной аутентификации
//         if (data.session) {
//             const { access_token, refresh_token, expires_at } = data.session;

//             const response = NextResponse.next();
//             response.cookies.set('token', access_token, {
//                 path: '/',
//                 httpOnly: true,
//                 secure: true,
//                 sameSite: 'lax',
//                 maxAge: expires_at ? expires_at - Math.floor(Date.now() / 1000) : 60 * 60, // Время до истечения
//             });
//             response.cookies.set('refresh_token', refresh_token, {
//                 path: '/',
//                 httpOnly: true,
//                 secure: true,
//                 sameSite: 'lax',
//                 maxAge: 60 * 60 * 24 * 30, // 30 дней
//             });

//             console.log('Логин успешен: токены сохранены.');
//             return response;
//         }
//         return data;
//     },



//     forget: async (email: string) => {
//         const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
//             // redirectTo: 'http://localhost:3000/auth/reset-password'  // Укажи свою ссылку
//             redirectTo: 'https://site-olive-six.vercel.app/auth/reset-password'
//         });

//         if (error) {
//             throw new Error(`Ошибка сброса пароля: ${error.message}`);
//         }

//         return data;

//     },

//     reset: async (email: string, password: string) => {
//         try {
//             let role = 'user'
//             const lowwerEmail = email.toLocaleLowerCase()
//             const adminEmails = ['savchuckvadim@gmail.com', 'volkovgoods@gmail.com']
//             if (adminEmails.includes(lowwerEmail)) {
//                 role = 'admin'
//             }

//             const { data, error } = await supabase.auth.updateUser({
//                 email: email,
//                 password: password,

//             } as SignUpWithPasswordCredentials,
//             );

//             if (error) throw error;



//             return data;
//         } catch (error: any) {
//             throw new Error(error.message || 'Ошибка регистрации');
//         }
//     },
//     getUser: async () => {
//         try {
//             const token = getCookie('token'); // Получаем токен из куков
//             if (!token) return null;
//             const { data } = await supabase.auth.getUser();

//             return data?.user;
//         } catch (error) {
//             console.error("Ошибка получения пользователя:", error);
//             return null;
//         }
//     },
//     getAccessToken: async () => {
//         const { data, error } = await supabase.auth.getSession();
//         if (error || !data.session) {
//             console.error("Ошибка получения токена:", error);
//             return null;
//         }
//         return data.session.access_token;
//     },
//     // logout: async () => {
//     //     await supabase.auth.signOut();
//     //     // document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
//     // }
//     logout: async () => {
//         try {
//             // Вызываем логаут через Supabase
//             const { error } = await supabase.auth.signOut();
    
//             if (error) {
//                 throw new Error("Ошибка при выходе из системы: " + error.message);
//             }
    
//             // Удаляем токены из куков (устаревшая дата)
//             document.cookie = "token=; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
//             document.cookie = "refresh_token=; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    
//             console.log("Пользователь успешно вышел из системы.");
//         } catch (error) {
//             console.error("Ошибка при логауте:", error);
//         }
//     }
// }

// // Функция для получения токена из куков
// function getCookie(name: string): string | null {
//     const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//     return match ? decodeURIComponent(match[2]) : null;
// }