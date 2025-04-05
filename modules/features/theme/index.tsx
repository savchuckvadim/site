'use client'

import { useEffect, useState } from "react";
import { Dice1, Dice2, Dice3, MoonStar, SunDim } from "lucide-react";

export default function ThemeMode() {
    const [darkMode, setDarkMode] = useState<'dark' | 'light'>('dark');
    const [isSpinning, setIsSpinning] = useState<boolean>(false);
    const [isThemeSpinning, setIsThemeSpinning] = useState<boolean>(false);

    const [theme, setTheme] = useState<'violete' | 'default' | 'blue'>('default');

    // Устанавливаем начальное состояние темы на клиенте
    useEffect(() => {
        const storedTheme = (localStorage.getItem('theme') as 'violete' | 'default' | 'blue') || 'violete';
        const storedMode = (localStorage.getItem('mode') === 'dark' ? 'dark' : 'light') as 'dark' | 'light';

        setTheme(storedTheme);
        setDarkMode(storedMode);

        // Устанавливаем классы на body
        document.body.classList.add(storedTheme);
        document.body.classList.toggle('dark', storedMode === 'dark');
    }, []);

    const toggleMode = () => {
        const newMode = darkMode === 'dark' ? 'light' : 'dark';
        setDarkMode(newMode);
        setIsSpinning(true);

        setTimeout(() => setIsSpinning(false), 500);

        localStorage.setItem('mode', newMode);
        document.body.classList.toggle('dark', newMode === 'dark');
    };

    const toggleTheme = () => {
        setIsThemeSpinning(true);
        setTimeout(() => setIsThemeSpinning(false), 500);

        const newTheme = theme === 'violete' ? 'blue' : theme === 'blue' ? 'default' : 'violete';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        // Удаляем предыдущую тему и добавляем новую
        document.body.classList.remove('violete', 'blue', 'default');
        document.body.classList.add(newTheme);

    };

    return (
        <>
            {<div onClick={toggleTheme} className={`cursor-pointer text-foreground ${isThemeSpinning ? 'animate-spin' : ''}`}>
                {theme == 'default' && <Dice1 color="black" />}
                {theme == 'blue' && <Dice2 color="blue" />}
                {theme == 'violete' && <Dice3 color="violet" />}

            </div>
            }

            <div
                className="p-0 flex items-center justify-center cursor-pointer transition-transform duration-300"
                onClick={toggleMode}
            >
                <div className={`text-foreground ${isSpinning ? 'animate-spin' : ''}`}>
                    {darkMode === 'dark' ? <MoonStar size={24} /> : <SunDim size={24} />}
                </div>
            </div>
        </>
    );
}
