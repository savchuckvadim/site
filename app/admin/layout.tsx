// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
// import { Providers } from "@/modules/app";
import { Header } from "@/modules/admin";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Admin",
//   description: "Generated by create next app",
// };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* <header className="bg-blue-600 text-white p-4">
        <h2 className="text-xl">Панель администратора</h2>
      </header> */}
      <Header />
      <main className="p-4">
        {children}
      </main>

    </div>
  );
}

