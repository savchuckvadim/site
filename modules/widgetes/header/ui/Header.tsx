'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const pathname = usePathname();

    // Проверяем, находимся ли на странице портфолио
    const isPortfolio = pathname === "/portfolio" || pathname === "/home";
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        if (darkMode) {
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }
    };
    return (
        <header className={`w-full py-4 shadow-md ${isPortfolio ? "" : "bg-white text-black"}`}>
            <div className="container mx-auto flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Image
                        src="/vercel.svg"
                        alt="Logo"
                        width={32}
                        height={32}
                        className={"invert"}
                    />
                    <Link
                        href="/"
                        className={`transition-colors ${isPortfolio ? "text-black hover:text-white" : "text-black hover:text-gray-300"}`}
                    >
                        <span className="text-lg font-semibold">Volkov Design</span>
                    </Link>
                   
                
                </div>

                {/* Десктопное меню */}
                <nav className="hidden md:flex gap-4">
                    <Link href="/" className="hover:text-gray-300">Home</Link>
                    <Link href="/about" className="hover:text-gray-300">About us</Link>
                    <Link href="/portfolio" className="hover:text-gray-300">Portfolio</Link>
                    <Link href="/admin" className="hover:text-gray-300">Админка</Link>
                    {/* <Button variant='secondary' onClick={toggleTheme} >
                        {darkMode ? <Moon /> : <Sun />}
                    </Button> */}
                </nav>

                {/* Мобильное бургер-меню */}
                <div className="md:hidden">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="p-2">
                                <Menu size={24} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="mr-1 p-2 w-48 bg-white rounded-lg shadow-md text-black">
                            <nav className="flex flex-col gap-2">
                                <Link href="/" className="hover:text-gray-300">Home</Link>
                                <Link href="/about" className="hover:text-gray-300">About us</Link>
                                <Link href="/portfolio" className="hover:text-gray-300">Portfolio</Link>
                                <Link href="/admin" className="hover:text-gray-300">Админка</Link>
                            </nav>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </header>
    );
}
