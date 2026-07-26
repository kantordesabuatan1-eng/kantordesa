import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import MobileNav from "./MobileNav";
import { getSettings } from "@/lib/content";
import { NAV } from "@/lib/nav";

export default function Header() {
  const settings = getSettings();

  return (
    <header className="sticky top-0 z-40 border-b border-sawah/10 bg-paper/90 backdrop-blur">
      <Container className="relative flex items-center justify-between py-4">
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

        <MobileNav />
      </Container>
    </header>
  );
}