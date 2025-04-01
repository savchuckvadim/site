'use client';

import { MoonStar, SunDim } from "lucide-react";
import { useState, useEffect } from "react";
import './style.css';
export default function ThemeMode() {
    // Чтение темы из localStorage при монтировании
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") === "dark";
        }
        return false;
    });
    const [isSpinning, setIsSpinning] = useState(false);

    // Установка темы при монтировании компонента
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            // Сохраняем в localStorage
            localStorage.setItem("theme", newMode ? "dark" : "light");

            setIsSpinning(true);
            setTimeout(() => setIsSpinning(false), 300); // Уменьшил время

            if (newMode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }

            return newMode;
        });
    };

    return (
        <div
            className="p-0 flex items-center justify-center cursor-pointer transition-transform duration-150"
            onClick={toggleTheme}
        >
            <div className={`text-foreground ${isSpinning ? 'animate-spin-fast' : ''}`}>
                {darkMode ? <MoonStar size={24} /> : <SunDim size={24} />}
            </div>
        </div>
    );
}
