import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      // Попытка получить данные из тела запроса
      body = await req.json();
    } catch (err) {
      // Если тело пустое или невалидное, присваиваем значение по умолчанию
      body = { message: 'No data received', error: err };
    }

    // Корректный редирект с методом GET
    const response = NextResponse.redirect(new URL('/auth/login', req.url), 303);

    // Устанавливаем куки, если данные есть
    if (body) {
      response.cookies.set('bx_yo_data', JSON.stringify('body_test'), { path: '/', maxAge: 60 * 60 * 24 });
    }

    return response;
  } catch (error) {
    console.error('Ошибка обработки запроса:', error);
    return NextResponse.json({ error: 'Ошибка загрузки файла' }, { status: 500 });
  }
}




export async function GET(req: NextRequest) {
  try {
    let body;
    try {
      // Попытка получить данные из тела
      body = await req.json();
    } catch (err) {
      // Если тело пустое или невалидное, присваиваем значение по умолчанию
      body = { message: 'No data received', error: err };
    }

    console.log('Полученные данные:', body);

    // Пример использования данных


    // Создаем абсолютный URL для редиректа
    const response = NextResponse.redirect(new URL('/auth/login', req.url));

    // Устанавливаем куки, если данные есть
    if (body) {
      response.cookies.set('bx_yo_data', body, { path: '/', maxAge: 60 * 60 * 24 });
    }

    return response;
  } catch (error) {
    console.error('Ошибка обработки запроса:', error);
    return NextResponse.json({ error: 'Ошибка загрузки файла' }, { status: 500 });
  }
}
