'use client';

import Link from "next/link";
import Image from "next/image";
// import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Menu } from "lucide-react";
import { ThemeMode } from "@/modules/features";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export default function Header() {
    const pathname = usePathname();
    // const isPortfolio = false
    // Проверяем, находимся ли на странице портфолио
    const isPortfolio = pathname === "/portfolio" || pathname === "/home";
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [hoverClass, setHoverClass] = useState('')
    useEffect(() => {
        setIsMounted(true);

    }, [])
    const [theme, setTheme] = useState<'violete' | 'default' | 'blue'>('default');

    useEffect(() => {
        const storedTheme = (localStorage.getItem('theme') as 'violete' | 'default' | 'blue') || 'default';
        setTheme(storedTheme);

        theme === 'default'
            ? setHoverClass('hover:text-gray-300')
            : setHoverClass('hover:text-primary');
    }, []);

    useEffect(() => {
        theme === 'default'
            ? setHoverClass('hover:text-gray-300')
            : setHoverClass('hover:text-primary');


    }, [theme])


    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false); // Скрываем при скролле вниз
            } else {
                setIsVisible(true); // Показываем при скролле вверх
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (<AnimatePresence>
        {isVisible && (
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                exit={{ y: -100 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 right-0 p-4 "
                style={{ zIndex: 1000 }}
            >
                <header className={`bg-background w-full py-4 shadow-md ${isPortfolio ? "blr" : "bg-background"}`}>
                    {/* <header className={`w-full py-4 shadow-md bg-background`}> */}

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Link
                                href="/"
                                className={`transition-colors`}
                            >
                                <Image
                                    src="/volkov.svg"
                                    alt="Logo"
                                    width={120}
                                    height={85}
                                    className="backgound:invert"
                                    priority
                                />

                                {/* <span className="text-lg text-accent-foreground font-semibold">Volkov Design</span> */}
                            </Link>


                        </div>

                        {/* Десктопное меню */}
                        <nav className="hidden md:flex gap-4">
                            {/* <Link href="/" className="hover:text-gray-300">Home</Link>
                    <Link href="/about" className="hover:text-gray-300">About us</Link>
                    <Link href="/portfolio" className="hover:text-gray-300">Portfolio</Link>
                    <Link href="/admin" className="hover:text-gray-300">Login</Link> */}

                            <Link href="/" className={`cursor-pointer ${hoverClass}`}>Home</Link>
                            <Link href="/services" className={`cursor-pointer ${hoverClass}`}>Services</Link>
                            <Link href="/portfolio" className={`cursor-pointer ${hoverClass}`}>Portfolio</Link>
                            <Link href="/admin" className={`cursor-pointer ${hoverClass}`}>Login</Link>

                            {isMounted && <ThemeMode setOuterTheme={setTheme} />}
                            {/* </Suspense> */}
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
                                        <Link href="/services" className="hover:text-gray-300">About us</Link>
                                        <Link href="/portfolio" className="hover:text-gray-300">Portfolio</Link>
                                        <Link href="/admin" className="hover:text-gray-300">Админка</Link>
                                    </nav>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </header>
            </motion.div>
        )}
        {!isVisible && (
            <div
                className="fixed top-0 left-0 right-0 h-2 hover:h-16 bg-transparent"
                style={{ zIndex: 999 }}
                onMouseEnter={() => setIsVisible(true)}
            ></div>
        )}
    </AnimatePresence>
    );
}
