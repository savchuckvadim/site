import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
// import path from 'path';
// import { promises as fs } from 'fs';
import { supaAPI } from '@/modules/services';
import { SModel, supabase } from '@/modules/services/db/supabase/model';


// Получение всех проектов

type Params = Promise<{ model: string, id: string, }>;

// Обновление существующего проекта
export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const param = await params
    const model = param.model as SModel;
    const formData = await req.formData();
    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    const title = formData.get('title')?.toString() || 'Без названия';
    const description = formData.get('description')?.toString() || '';
    const orderNumber = parseInt(formData.get('order')?.toString() || '0', 10);
    const file = formData.get('file') as File | null;

    if (!id) {
      return NextResponse.json({ error: 'Неверный ID' }, { status: 400 });
    }

    let url = null;

    // Если загружается новый файл
    if (file) {
      const fileName = `${nanoid()}.${file.name.split('.').pop()}`;
      const filePath = `/uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Ошибка загрузки файла:', uploadError);
        return NextResponse.json({ error: 'Ошибка загрузки файла' }, { status: 500 });
      }
      url = filePath;
    }

    const data = { title, description, order_number: orderNumber, url: '' };
    if (url) data.url = url;

    const updatedProject = await supaAPI.put(model, id, data);

    return NextResponse.json({ message: 'Проект обновлен', project: updatedProject });
  } catch (error) {
    console.error('Ошибка обновления проекта:', error);
    return NextResponse.json({ error: 'Ошибка обновления' }, { status: 500 });
  }
}

// Удаление проекта
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const param = await params;
    const model = param.model as SModel;

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Неверный ID' }, { status: 400 });
    }

    const deletedProject = await supaAPI.delete(model, id);

    if (deletedProject) {
      return NextResponse.json({ message: 'Проект удален' });
    } else {
      return NextResponse.json({ error: 'Ошибка удаления' }, { status: 500 });
    }
  } catch (error) {
    console.error('Ошибка удаления проекта:', error);
    return NextResponse.json({ error: 'Ошибка удаления' }, { status: 500 });
  }
}
