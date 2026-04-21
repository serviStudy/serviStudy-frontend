import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ServiStudy",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer>
          <div className="w-full bg-white text-[#6f6f6f] p-5 text-center flex-col md:p-2.5">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} ServiStudy. Todos los derechos reservados.
            </p>
            <p className="text-xs">
              Conectando talento estudiantil con oportunidades.
            </p>
          </div>
          <Toaster></Toaster>
        </footer>
      </body>
    </html>
  );
}
