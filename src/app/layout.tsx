import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const getSchwifty = localFont({
  src: './fonts/get_schwifty.ttf',
  variable: '--font-get-schwifty',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Rick and Morty Character Explorer",
  description: "Explore characters from the Rick and Morty universe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${getSchwifty.variable} bg-gray-100 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
