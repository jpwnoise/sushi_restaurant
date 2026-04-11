import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Akemi Sushi - Sushi, Ramen & Tepanyaki Premium",
  description:
    "El mejor sushi, ramen y tepanyaki de la ciudad. Ingredientes frescos, sabores auténticos.",
  openGraph: {
    title: "Akemi Sushi",
    description: "Sushi, ramen y tepanyaki con ingredientes frescos y sabores auténticos.",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} antialiased`}>
      <body className="min-h-screen font-[var(--font-poppins)] bg-[#1a1a1a] text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
