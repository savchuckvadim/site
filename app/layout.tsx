import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/modules/app";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Volkov Design",
  description: "Elegant and Unique Design",
  keywords: ["Design", "Interior Design", "Architecture"],
  openGraph: {
    title: "Volkov Design - Elegant and Unique",
    description: "Discover top-notch interior design and architecture solutions.",
    url: "https://volkovdesign.com",
    siteName: "Volkov Design",

    locale: "en_US",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Volkov Design",
  //   description: "Elegant and Unique Design",
  //   creator: "@volkovdesign",
  //   // images: ["https://volkovdesign.com/twitter-image.jpg"],
  // },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
   
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>


          {children}


        </Providers>
      </body>
    </html>
  );
}
