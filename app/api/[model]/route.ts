import { supaAPI } from '@/modules/services';
import { SModel } from '@/modules/services/db/supabase/model';
import { NextRequest, NextResponse } from 'next/server';

type tParams = Promise<{ model: string, id: string, }>;
export async function GET(req: NextRequest, { params }: { params: tParams }) {
  const param = await params
  try {
    // Ждем параметры
    const model = param.model;

    if (!model) {
      return NextResponse.json({ error: 'Модель не указана' }, { status: 400 });
    }
    // Приводим к типу SModel
    const modelName = model as SModel;
    const data = await supaAPI.getAll(modelName);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    return NextResponse.json({ error: 'Ошибка получения данных' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: tParams }) {
  const param = await params
  const model = param.model as SModel;
  try {
    const body = await req.json();
    const data = await supaAPI.post(model, body);
    return NextResponse.json({ message: 'Данные успешно добавлены', data });
  } catch (error) {
    console.error(`Ошибка добавления данных в ${model}:`, error);
    return NextResponse.json({ error: `Ошибка добавления в ${model}` }, { status: 500 });
  }
}
