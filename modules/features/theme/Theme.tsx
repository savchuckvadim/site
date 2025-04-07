'use client';

import { useEffect, useState } from "react";
import { Dice1, Dice2, Dice3, MoonStar, SunDim } from "lucide-react";
import './style.css'
export default function ThemeMode({ setOuterTheme }: { setOuterTheme?: (theme: "violete" | "default" | "blue") => void }) {
    const [darkMode, setDarkMode] = useState<'dark' | 'light'>('light');
    const [isSpinning, setIsSpinning] = useState<boolean>(false);
    const [isThemeSpinning, setIsThemeSpinning] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const [theme, setTheme] = useState<'violete' | 'default' | 'blue'>('default');

    // Устанавливаем начальное состояние темы на клиенте
    useEffect(() => {
        setIsMounted(true);

        const storedTheme = (localStorage.getItem('theme') as 'violete' | 'default' | 'blue') || 'default';
        const storedMode = (localStorage.getItem('mode') === 'dark' ? 'dark' : 'light') as 'dark' | 'light';

        setTheme(storedTheme);
        setDarkMode(storedMode);

        // Устанавливаем классы на body после монтирования
        document.body.classList.add(storedTheme);
        document.body.classList.toggle('dark', storedMode === 'dark');
    }, []);

    const toggleMode = () => {
        const newMode = darkMode === 'dark' ? 'light' : 'dark';
        setDarkMode(newMode);
        setIsSpinning(true);

        setTimeout(() => setIsSpinning(false), 500);

        localStorage.setItem('mode', newMode);
        document.body.classList.toggle("dark", newMode === 'dark');
    };

    const toggleTheme = () => {
        setIsThemeSpinning(true);
        setTimeout(() => setIsThemeSpinning(false), 800);

        const newTheme: "violete" | "default" | "blue" = theme === 'violete' ? 'blue' : theme === 'blue' ? 'default' : 'violete';
        setTheme(newTheme);
        setOuterTheme && setOuterTheme(newTheme)
        localStorage.setItem('theme', newTheme);

        document.body.classList.remove('violete', 'blue', 'default');
        document.body.classList.add(newTheme);
    };

    if (!isMounted) return null;

    return (
        <>
            <div onClick={toggleTheme} className={`cursor-pointer text-foreground ${isThemeSpinning ? 'animate-spin-fast animate-shake' : ''}`}>

                {theme == 'default' ? <Dice1 color={darkMode === 'dark' ? "white" : "black"} />
                    : theme == 'blue' ? <Dice2 color="blue" />
                        : theme == 'violete' ? <Dice3 color="violet" />
                            : <Dice1 color={darkMode === 'dark' ? "white" : "black"} />
                }

            </div>
            <div
                className="p-0 ml-2 md:m-0 flex items-center justify-center cursor-pointer transition-transform duration-300"
                onClick={toggleMode}
            >
                <div className={`text-foreground ${isSpinning ? 'animate-spin' : ''}`}>
                    {darkMode === 'dark' ? <MoonStar size={24} /> : <SunDim size={24} />}
                </div>
            </div>
        </>
    );
}
