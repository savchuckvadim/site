'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/modules/services/db/supabase/model';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ConfirmForm() {
    const [message, setMessage] = useState('Подтверждение...');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const confirmEmail = async () => {
            const token = searchParams.get('access_token');
            const email = searchParams.get('email'); // Получаем email из ссылки
            const type = 'email'; // Тип подтверждения всегда 'email' для этого сценария

            if (!token && !email) {
                setMessage('Подтвердите e-mail')
                return;
            }
            if (!token || !email) {
                setMessage('Недействительная ссылка подтверждения.');
                return;
            }

            try {
                // Используем токен для подтверждения
                const { data, error } = await supabase.auth.verifyOtp({
                    email: email,
                    token: token,
                    type
                });

                if (error) {
                    setMessage(`Ошибка подтверждения: ${error.message}`);
                    return;
                }

                // Сохраняем токен в куки
                if (data?.session) {
                    document.cookie = `token=${data.session.access_token}; path=/; SameSite=Lax; Secure;`;
                    setMessage('Email подтвержден! Перенаправляем...');
                    setTimeout(() => router.push('/admin/projects'), 2000);
                } else {
                    setMessage('Подтверждение прошло успешно! Пожалуйста, войдите.');
                    setTimeout(() => router.push('/auth/login'), 2000);
                }
            } catch (err) {
                console.log(err)
                setMessage('Ошибка во время подтверждения.');
            }
        };

        confirmEmail();
    }, [searchParams, router]);

    return (
        <h1>{message}</h1>

    );
}
