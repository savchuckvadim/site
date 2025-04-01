import { createClient } from '@supabase/supabase-js'

// URL и ключ можно получить из консоли Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string

export const supabase = createClient(supabaseUrl, supabaseKey)

export enum SModel {
    PROJECTS = 'projects',
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
    getByRelation: async (model: SModel, parent: SModel, parentId: number) => {
        try {
            const { data, error } = await supabase
                .from(model)
                .select('*')
                .eq(`${parent}_id`, parentId);

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
