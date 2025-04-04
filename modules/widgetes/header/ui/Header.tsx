'use client';

import Link from "next/link";
import Image from "next/image";
// import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Menu } from "lucide-react";
import { ThemeMode } from "@/modules/features";
import { useParams, usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    // const isPortfolio = false
    // Проверяем, находимся ли на странице портфолио
    const isPortfolio = pathname === "/portfolio" || pathname === "/home";
    // const [darkMode, setDarkMode] = useState(false);

    // const toggleTheme = () => {
    //     setDarkMode(!darkMode);
    //     if (darkMode) {
    //         document.documentElement.classList.remove("dark");
    //     } else {
    //         document.documentElement.classList.add("dark");
    //     }
    // };
    return (
        <header className={`w-full py-4 shadow-md ${isPortfolio ? "blr" : "bg-backgound"}`}>
            {/* <header className={`w-full py-4 shadow-md bg-background`}> */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src="/vercel.svg"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="backgound:invert"
                    />
                    <Link
                        href="/"
                        className={`transition-colors`}
                    >
                        <span className="text-lg text-accent-foreground font-semibold">Volkov Design</span>
                    </Link>


                </div>

                {/* Десктопное меню */}
                <nav className="hidden md:flex gap-4">
                    <Link href="/" className="hover:text-gray-300">Home</Link>
                    <Link href="/about" className="hover:text-gray-300">About us</Link>
                    <Link href="/portfolio" className="hover:text-gray-300">Portfolio</Link>
                    <Link href="/admin" className="hover:text-gray-300">Админка</Link>
                    <ThemeMode />
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
