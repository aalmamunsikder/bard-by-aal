import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "BARD ERP",
    description: "Bangladesh Academy for Rural Development ERP System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-slate-50 text-slate-800 antialiased overflow-hidden selection:bg-emerald-100 selection:text-emerald-900`}>
                {children}
            </body>
        </html>
    );
}
