import type { Metadata } from "next";
import { Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const hindSiliguri = Hind_Siliguri({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['bengali', 'latin'],
    variable: '--font-hind-siliguri'
});

export const metadata: Metadata = {
    title: "BARD ERP System",
    description: "Bangladesh Academy for Rural Development ERP",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${hindSiliguri.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
                {children}
            </body>
        </html>
    );
}
