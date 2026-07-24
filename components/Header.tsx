import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { getSettings } from "@/lib/content";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/profil-desa", label: "Profil Desa" },
  { href: "/struktur-organisasi", label: "Struktur Organisasi" },
  { href: "/berita", label: "Berita" },
  { href: "/layanan", label: "Layanan" },
  { href: "/potensi", label: "Potensi Desa" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kontak", label: "Kontak" },
];

export default function Header() {
  const settings = getSettings();

  return (
    <header className="sticky top-0 z-40 border-b border-sawah/10 bg-paper/90 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex items-center gap-2.5">
            {settings.logo ? (
              // Logo pertama ditampilkan utuh sesuai bentuk aslinya (mis. perisai
              // untuk logo Kabupaten/Pemda) — tidak dipotong jadi lingkaran.
              <span className="relative h-11 w-9 shrink-0 sm:h-12 sm:w-10">
                <Image
                  src={settings.logo}
                  alt={`Logo ${settings.nama_desa || "Desa"}`}
                  fill
                  className="object-contain"
                />
              </span>
            ) : (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sawah font-display text-lg text-paper">
                {settings.nama_desa?.[0] ?? "D"}
              </span>
            )}

            {settings.logo_kedua && (
              <>
                <span className="h-8 w-px bg-sawah/25" aria-hidden="true" />
                {/* Logo kedua tetap dipotong bulat (avatar) */}
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-sawah/10">
                  <Image
                    src={settings.logo_kedua}
                    alt="Logo kedua"
                    fill
                    className="object-cover"
                  />
                </span>
              </>
            )}
          </span>

          <span className="font-display text-lg leading-tight text-ink">
            {settings.nama_desa || "Nama Desa"}
            <span className="block font-body text-xs font-normal uppercase tracking-wide text-muted">
              {settings.kecamatan}
            </span>
          </span>
        </Link>

        <nav className="hidden gap-6 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-body text-sm text-ink/80 transition hover:text-sawah"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="lg:hidden">
          <summary className="cursor-pointer list-none rounded border border-sawah/30 px-3 py-2 text-sm text-ink">
            Menu
          </summary>
          <div className="absolute left-0 right-0 mt-2 border-y border-sawah/10 bg-paper p-4 shadow-lg">
            <div className="flex flex-col gap-3">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className="font-body text-sm text-ink">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </details>
      </Container>
    </header>
  );
}
