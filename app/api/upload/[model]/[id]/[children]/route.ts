import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

import { supaAPI } from '@/modules/services';
import { SModel } from '@/modules/services/db/supabase/model';
import { createSupabaseServerClient } from '@/modules/services/db/supabase/model/supabaseServer';

type params = Promise<{ model: string, id: string, children: string }>;

// Получение всех проектов

export async function POST(req: NextRequest, { params }: { params: params }) {
  try {
    const token = req.cookies.get('token')?.value;
    const supabase = await createSupabaseServerClient(token)
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title')?.toString() || 'Без названия';
    const description = formData.get('description')?.toString() || '';
    const orderNumber = parseInt(formData.get('order')?.toString() || '0', 10);

    if (!file) {
      return NextResponse.json({ error: 'Файл не найден' }, { status: 400 });
    }

    // Генерируем уникальное имя файла
    const fileName = `${nanoid()}.${file.name.split('.').pop()}`;

    // Загрузка файла в Supabase Storage
    const { data: storageData, error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(`public/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false,
      });
    console.log(storageData)
    console.log(uploadError)

    if (uploadError) {
      console.error('Ошибка загрузки файла в Supabase:', uploadError);
      return NextResponse.json({ error: 'Ошибка загрузки файла' }, { status: 500 });
    }

    // Получаем публичный URL
    const { data: publicUrlData } = supabase.storage
      .from('uploads')
      .getPublicUrl(`public/${fileName}`);

    const url = publicUrlData?.publicUrl;

    if (!url) {
      return NextResponse.json({ error: 'Ошибка получения URL файла' }, { status: 500 });
    }

    // Сохранение записи в базе данных
    const param = await params
    const model = param.model as SModel;
    const children = param.children as SModel;
    const parentId = Number(param.id) as number;

    const dbData = { title, description, order_number: orderNumber, url, [`${model}_id`]: parentId };

    const result = await supaAPI.post(children, dbData)

    if (result) {
      console.log('Запись добавлена:', result);
    } else {

      console.error('Ошибка при добавлении данных');
      return NextResponse.json({ error: 'Ошибка загрузки файла' }, { status: 500 });

    }


    return NextResponse.json({ message: 'Файл успешно загружен', url, result });
  } catch (error) {
    console.error('Ошибка обработки запроса:', error);
    return NextResponse.json({ error: 'Ошибка загрузки файла' }, { status: 500 });
  }
}

