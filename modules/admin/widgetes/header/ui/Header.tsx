import Link from "next/link";
import Image from "next/image";

// bg-gray-800 text-white 
export default function Header() {
    return (
        <header className="w-full 
       bg-gray-800 text-white 
        py-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4">
                <div className="flex items-center gap-2    bg-gray-800">
                    <Image
                        src="/vercel.svg"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="white"
                        
                    />
                    <span className="text-lg font-semibold">ADMIN</span>
                </div>
                <nav className="flex gap-4">
                    <Link
                        href="/admin/home"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/admin/about"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        About us
                    </Link>
                    <Link
                        href="/admin/projects"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Выйти
                    </Link>

                </nav>
            </div>
        </header>
    );
}
