import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest) {
  try {
    // Инициализируем объект для хранения данных
    const requestData: Record<string, any> = {};

    // Заголовки запроса
    requestData.headers = {};
    req.headers.forEach((value, key) => {
      requestData.headers[key] = value;
    });

    // Тело запроса
    try {
      const body = await req.json();
      requestData.body = body;
    } catch (err) {
      requestData.body = 'Не удалось распарсить тело запроса';
    }

    // Куки
    requestData.cookies = {};
    req.cookies.getAll().forEach((cookie) => {
      requestData.cookies[cookie.name] = cookie.value;
    });

    // Параметры запроса
    requestData.query = req.nextUrl.searchParams.toString();

    // Логи
    console.log('Все данные запроса:', requestData);

    // Возвращаем все данные в формате JSON
    return NextResponse.json({ message: 'Получены данные', data: requestData });
  } catch (error) {
    console.error('Ошибка обработки запроса:', error);
    return NextResponse.json({ error: 'Ошибка обработки запроса' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Этот маршрут поддерживает только POST-запросы' });
}

