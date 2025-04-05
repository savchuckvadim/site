'use client'
import Link from "next/link";


import { ThemeMode } from "@/modules/features";
import { supaAuth } from "@/modules/services/db/supabase/model";

// bg-gray-800 text-white 
export default function Header() {
    const signOut = () => {
        supaAuth.logout();

    }
    return (
        <header className="w-full 
       bg-background text-primary-foreground 
        py-4 shadow-md">
            {/* <div className="container mx-auto flex items-center justify-between px-4 bg-background"> */}
            <div className="max-w-7xl mx-auto p-0 sm:px-6 lg:px-8 flex items-center justify-between">

                <div className="flex items-center gap-2    bg-background ">
                    {/* <Image
                        src="/vercel.svg"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="dark:invert"

                    /> */}
                    <span className="text-lg text-accent-foreground font-semibold">ADMIN</span>
                </div>
                <nav className="flex gap-4">
                    <Link
                        href="/admin/home"
                        className="text-accent-foreground hover:text-secondary transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/admin/services"
                        className="text-accent-foreground hover:text-secondary transition-colors"
                    >
                        Services
                    </Link>
                    <Link
                        href="/admin/projects"
                        className="text-accent-foreground hover:text-secondary transition-colors dark:hover:text-primary"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/"
                        className="text-accent-foreground hover:text-secondary transition-colors dark:hover:text-primary"
                        onClick={() => signOut()}
                    >
                        Выйти
                    </Link>
                    <ThemeMode />
                </nav>
            </div>
        </header>
    );
}
