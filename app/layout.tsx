import type { Metadata } from "next";
import { Fraunces, Public_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getSettings } from "@/lib/content";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
});
const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export function generateMetadata(): Metadata {
  const s = getSettings();
  const title = `${s.nama_desa || "Website Desa"} — ${s.kecamatan || ""}`;
  const description = `Situs resmi ${s.nama_desa}, ${s.kecamatan}, ${s.kabupaten}. ${s.tagline || ""}`;
  const iconUrl = s.logo_kedua || s.logo;

  return {
    title: { default: title, template: `%s — ${s.nama_desa}` },
    description,
    openGraph: { title, description, type: "website" },
    metadataBase: new URL("https://kantordesa.vercel.app"),
    icons: iconUrl ? { icon: iconUrl, shortcut: iconUrl, apple: iconUrl } : undefined,
    verification: {
      google: "qvNALfNyAsGz4NsULgxSXdYudaEZCawbkxYWlJyjQwY",
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body
        className={`${fraunces.variable} ${publicSans.variable} ${jetbrains.variable} bg-paper font-body text-ink antialiased`}
      >
        <Header />
        <main className="pt-24">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}