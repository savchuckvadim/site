import { createClient, SignUpWithPasswordCredentials, User } from '@supabase/supabase-js'

// URL и ключ можно получить из консоли Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: true, // Автоматическое обновление токена
        persistSession: true,   // Сохранять сессию
        detectSessionInUrl: true,
    },
})

export enum SModel {
    PROJECTS = 'projects',
    PROJECT = 'project',
    SERVICES = 'services',
    SERVICE = 'service',
    PROJECT_DETAILS = 'project_details',
    USERS = 'users',
    PROFILES = 'profiles'
}

export const supaAPI = {
    // Получение всех записей
    getAll: async (model: SModel) => {
        try {
            const { data, error } = await supabase
                .from(model)
                .select('*');

            if (error) {
                console.error(`Ошибка получения всех данных из ${model}:`, error);
                return null;
            }
            console.log(`Все данные из ${model}:`, data);
            return data;
        } catch (err) {
            console.error('Ошибка выполнения запроса:', err);
            return null;
        }
    },

    // Получение по ID
    get: async (model: SModel, id: number) => {
        try {
            const { data, error } = await supabase
                .from(model)
                .select('*')
                .eq('id', id);

            if (error) {
                console.error(`Ошибка получения данных из ${model}:`, error);
                return null;
            }
            return data;
        } catch (err) {
            console.error('Ошибка выполнения запроса:', err);
            return null;
        }
    },
    getByRelation: async (model: SModel, parent: SModel | string, parentId: number) => {
        try {
            const { data, error } = await supabase
                .from(model)
                .select('*')
                .eq(`${parent}_id`, parentId);

            if (error) {
                console.error(`Ошибка получения данных из ${model}:`, error);
                return null;
            }
            const { data: parentData, error: parentError } = await supabase
                .from(parent)
                .select('*')
                .eq('id', parentId);

            if (error) {
                console.error(`Ошибка получения данных из ${parent}:`, parentError);
                return null;
            }

            return {
                data: {
                    data,
                    parent: parentData
                }
            };
        } catch (err) {
            console.error('Ошибка выполнения запроса:', err);
            return null;
        }
    },

    postWithRelation: async (model: SModel, parent: SModel, parentId: number, data: object) => {
        try {
            const parentProp = `${parent}_id`
            const requestData = {
                ...data,
                parentProp: parentId,

            }
            const { error } = await supabase

                .from(model)
                .insert([requestData]);

            if (error) {
                console.error(`Ошибка добавления в ${model}:`, error);
                return null;
            }
            console.log(`Успешно добавлено в ${model}:`, requestData);
            return requestData;
        } catch (err) {
            console.error('Ошибка выполнения запроса:', err);
            return null;
        }
    },

    // Добавление новой записи
    post: async (model: SModel, data: object) => {
        try {
            const { error } = await supabase
                .from(model)
                .insert([data]);

            if (error) {
                console.error(`Ошибка добавления в ${model}:`, error);
                return null;
            }
            console.log(`Успешно добавлено в ${model}:`, data);
            return data;
        } catch (err) {
            console.error('Ошибка выполнения запроса:', err);
            return null;
        }
    },

    // Обновление записи
    put: async (model: SModel, id: number, data: object) => {
        try {
            const { error } = await supabase
                .from(model)
                .update(data)
                .eq('id', id);

            if (error) {
                console.error(`Ошибка обновления в ${model}:`, error);
                return null;
            }
            console.log(`Успешно обновлено в ${model} с ID ${id}:`, data);
            return data;
        } catch (err) {
            console.error('Ошибка выполнения запроса:', err);
            return null;
        }
    },

    // Удаление записи
    delete: async (model: SModel, id: number) => {

        try {
            const { error } = await supabase
                .from(model)
                .delete()
                .eq('id', id);

            if (error) {

                console.error(`Ошибка удаления из ${model}:`, error);
                return null;
            }

            console.log(`Успешно удалено из ${model} с ID ${id}`);
            return id;
        } catch (err) {
            console.error('Ошибка выполнения запроса:', err);
            return null;
        }
    }
};

export const supaAuth = {
    register: async (email: string, password: string) => {
        try {
            const redirectUrl = `${window.location.origin}/confirm`;
            let role = 'user'
            const lowwerEmail = email.toLocaleLowerCase()
            const adminEmails = ['savchuckvadim@gmail.com', 'volkovgoods@gmail.com']
            if (adminEmails.includes(lowwerEmail)) {
                role = 'admin'
            }

            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        role: role,
                    },
                    emailRedirectTo: redirectUrl
                }
            } as SignUpWithPasswordCredentials,
            );

            if (error) throw error;

            if (data?.user) {

                // Сохраняем токен, если регистрация прошла успешно
                if (data.session?.access_token) {
                    document.cookie = `token=${data.session?.access_token}; path=/; SameSite=Lax; Secure;`;

                }
            }

            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Ошибка регистрации');
        }
    },

    // login: async (email: string, password: string) => {
    //     const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    //     if (error) throw error;
    //     // Проверяем подтверждение email
    //     if (!data.user?.email_confirmed_at) {
    //         throw new Error("Email не подтвержден. Проверьте свою почту.");
    //     }
    //     if (data?.session) {
    //         document.cookie = `token=${data.session.access_token}; path=/; SameSite=Lax; Secure;`;
    //     }

    //     return data;
    // },

    login: async (email: string, password: string) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка логина');
            }

            console.log("Логин успешен!");
            const result = await response.json() as Promise<User>;

            return result
        } catch (error: any) {
            console.error("Ошибка при логине:", error.message);
            throw error;
        }
    },

    forget: async (email: string) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            // redirectTo: 'http://localhost:3000/auth/reset-password'  // Укажи свою ссылку
            redirectTo: 'https://site-olive-six.vercel.app/auth/reset-password'
        });

        if (error) {
            throw new Error(`Ошибка сброса пароля: ${error.message}`);
        }

        return data;

    },

    reset: async (email: string, password: string) => {
        try {
            let role = 'user'
            const lowwerEmail = email.toLocaleLowerCase()
            const adminEmails = ['savchuckvadim@gmail.com', 'volkovgoods@gmail.com']
            if (adminEmails.includes(lowwerEmail)) {
                role = 'admin'
            }

            const { data, error } = await supabase.auth.updateUser({
                email: email,
                password: password,

            } as SignUpWithPasswordCredentials,
            );

            if (error) throw error;



            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Ошибка регистрации');
        }
    },
    getUser: async () => {
        try {
            const token = getCookie('token'); // Получаем токен из куков
            if (!token) return null;
            const { data } = await supabase.auth.getUser();

            return data?.user;
        } catch (error) {
            console.error("Ошибка получения пользователя:", error);
            return null;
        }
    },

    logout: async () => {
        // await supabase.auth.signOut();
        // document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка логина');
            }

            console.log("Log out успешен!");
            const result = await response.json();

            return result
        } catch (error: any) {
            console.error("Ошибка при Log out:", error.message);
            throw error;
        }
    }
}

// Функция для получения токена из куков
function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}