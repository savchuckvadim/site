import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest) {
  try {

      // Получаем данные из запроса
      const body = await req.json();
      // const { username, token } = body;
  
      // Создаем ответ
      const response = NextResponse.redirect('/auth/login');
  
      // Устанавливаем куки
      response.cookies.set('bx_init', body, { path: '/', maxAge: 60 * 60 * 24 }); // 1 день
  
      return response;


  } catch (error) {
    console.error('Ошибка обработки запроса:', error);
    return NextResponse.json({ error: 'Ошибка загрузки файла' }, { status: 500 });
  }
}
