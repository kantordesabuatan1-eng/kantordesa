import type { Metadata } from "next";
import Script from "next/script";
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
    metadataBase: new URL("https://kampungbuatan1.netlify.app/"),
    icons: iconUrl ? { icon: iconUrl, shortcut: iconUrl, apple: iconUrl } : undefined,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body
        className={`${fraunces.variable} ${publicSans.variable} ${jetbrains.variable} bg-paper font-body text-ink antialiased`}
      >
        <Header />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <WhatsAppButton />
        {/* Diperlukan agar link undangan admin (email) mengarahkan ke /admin dengan benar */}
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="afterInteractive" />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", (user) => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
