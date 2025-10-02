import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ASHA EHR Companion",
  description: "Mobile-first offline EHR for community health workers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="mobile-container">
          {children}
        </div>
      </body>
    </html>
  );
}
