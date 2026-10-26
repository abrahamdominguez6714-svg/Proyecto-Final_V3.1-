import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Europerfumes Guadalajara | Perfumería selecta",
  description:
    "Encuentra tu próxima fragancia en Europerfumes Guadalajara. Perfumes para ella, él y decants con atención cercana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
