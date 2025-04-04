import { supaAPI } from '@/modules/services';
import { SModel } from '@/modules/services/db/supabase/model';
import { NextRequest, NextResponse } from 'next/server';

type getParams = Promise<{ model: string, id: string, children: string }>;
type tParams = Promise<{ model: string, id: string, }>;

export async function GET(req: NextRequest, { params }: { params: getParams }) {
 
  const p = await params;
  const parent = p.model as SModel;
  const children = p.children as SModel;

  const id = parseInt(p.id, 10);

  try {
    const data = await supaAPI.getByRelation(children, parent, id);
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Ошибка получения данных ${children} с ID ${parent} ${id}:`, error);
    return NextResponse.json({ error: `Ошибка получения ${children}` }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: tParams }) {
  const p = await params
  const model = p.model as SModel;
  const id = parseInt(p.id, 10);

  try {
    const body = await req.json();
    const data = await supaAPI.put(model, id, body);
    return NextResponse.json({ message: 'Данные успешно обновлены', data });
  } catch (error) {
    console.error(`Ошибка обновления данных ${model} с ID ${id}:`, error);
    return NextResponse.json({ error: `Ошибка обновления ${model}` }, { status: 500 });
  }
}

// export async function DELETE(req: NextRequest, { params }: { params: tParams }) {
//   const p = await params;
//   const model = p.model as SModel;
//   const id = parseInt(p.id, 10);

//   try {
//     await supaAPI.delete(model, id);
//     return NextResponse.json({ message: 'Данные успешно удалены' });
//   } catch (error) {
//     console.error(`Ошибка удаления данных ${model} с ID ${id}:`, error);
//     return NextResponse.json({ error: `Ошибка удаления ${model}` }, { status: 500 });
//   }
// }
