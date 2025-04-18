import { supaAPI } from '@/modules/services';
import { SModel } from '@/modules/services/db/supabase/model';
import { NextRequest, NextResponse } from 'next/server';

// type getParams = Promise<{ model: string, id: string, children: string }>;
type tParams = Promise<{ model: string, id: string, }>;

export async function GET(req: NextRequest, { params }: { params: tParams }) {
  const param = await params
  const model = param.model as SModel;

  const id = parseInt(param.id, 10);

  try {
    const data = await supaAPI.get(model, id);
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Ошибка получения данных ${model} с ID ${id}:`, error);
    return NextResponse.json({ error: `Ошибка получения ${model}` }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: tParams }) {
  const param = await params
  const model = param.model as SModel;
  const id = parseInt(param.id, 10);

  try {
    const body = await req.json();
    const data = await supaAPI.put(model, id, body);
    return NextResponse.json({ message: 'Данные успешно обновлены', data });
  } catch (error) {
    console.error(`Ошибка обновления данных ${model} с ID ${id}:`, error);
    return NextResponse.json({ error: `Ошибка обновления ${model}` }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: tParams }) {
  const param = await params
  const model = param.model as SModel;
  const id = parseInt(param.id, 10);

  try {
    await supaAPI.delete(model, id);
    return NextResponse.json({ message: 'Данные успешно удалены' });
  } catch (error) {
    console.error(`Ошибка удаления данных ${model} с ID ${id}:`, error);
    return NextResponse.json({ error: `Ошибка удаления ${model}` }, { status: 500 });
  }
}
