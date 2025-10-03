import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ASHA Ki Kiran - आशा की किरण",
  description:
    "Mobile-first Healthcare Companion for ASHA Workers - स्वास्थ्य सेवा का साथी",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
