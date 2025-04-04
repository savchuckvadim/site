'use client'

import { useEffect, useState } from "react";
import { MoonStar, SunDim } from "lucide-react";

export default function ThemeMode() {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [isSpinning, setIsSpinning] = useState<boolean>(false);

    // Устанавливаем начальное состояние темы на клиенте
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            const isDark = storedTheme === 'dark';
            setDarkMode(isDark);
            document.documentElement.classList.toggle("dark", isDark);
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        setIsSpinning(true);

        // Снимаем анимацию через 0.5 секунды
        setTimeout(() => setIsSpinning(false), 500);

        // Сохраняем тему в localStorage
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
        document.documentElement.classList.toggle("dark", newMode);
    };

    return (
        <div
            className="p-0 flex items-center justify-center cursor-pointer transition-transform duration-300"
            onClick={toggleTheme}
        >
            <div className={`text-foreground ${isSpinning ? 'animate-spin' : ''}`}>
                {darkMode ? <MoonStar size={24} /> : <SunDim size={24} />}
            </div>
        </div>
    );
}
