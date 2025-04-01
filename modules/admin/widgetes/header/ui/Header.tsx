
import Link from "next/link";
import Image from "next/image";

import { ThemeMode } from "@/modules/features";

// bg-gray-800 text-white 
export default function Header() {
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
        <header className="w-full 
       bg-background text-primary-foreground 
        py-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4 bg-background">
                <div className="flex items-center gap-2    bg-background ">
                    <Image
                        src="/vercel.svg"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="white"

                    />
                    <span className="text-lg text-accent-foreground font-semibold">ADMIN</span>
                </div>
                <nav className="flex gap-4">
                    <Link
                        href="/admin/home"
                        className="text-accent-foreground hover:text-white transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/admin/about"
                        className="text-accent-foreground hover:text-white transition-colors"
                    >
                        About us
                    </Link>
                    <Link
                        href="/admin/projects"
                        className="text-accent-foreground transition-colors"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/"
                        className="text-foreground hover:text-accent-foregroundtransition-colors"
                    >
                        Выйти
                    </Link>
                    <ThemeMode />
                </nav>
            </div>
        </header>
    );
}
