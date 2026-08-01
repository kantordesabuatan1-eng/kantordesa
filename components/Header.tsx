import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import MobileNav from "./MobileNav";
import { getSettings } from "@/lib/content";
import { NAV } from "@/lib/nav";

export default function Header() {
  const settings = getSettings();

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4 sm:top-6">
      <Container className="max-w-5xl">
        <div className="relative flex items-center justify-between gap-4 rounded-full border border-paper/15 bg-sawah-dark/40 px-4 py-2.5 shadow-lg backdrop-blur-md sm:px-6 sm:py-3">
          <Link href="/" className="flex items-center gap-2.5">
            {settings.logo ? (
              <span className="relative h-9 w-7 shrink-0 sm:h-10 sm:w-8">
                <Image
                  src={settings.logo}
                  alt={`Logo ${settings.nama_desa || "Desa"}`}
                  fill
                  className="object-contain"
                />
              </span>
            ) : (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper font-display text-base text-sawah-dark">
                {settings.nama_desa?.[0] ?? "D"}
              </span>
            )}

            {settings.logo_kedua && (
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-paper/10 sm:h-10 sm:w-10">
                <Image
                  src={settings.logo_kedua}
                  alt="Logo kedua"
                  fill
                  className="object-cover"
                />
              </span>
            )}

            <span className="hidden font-display text-base leading-tight text-paper sm:block">
              {settings.nama_desa || "Nama Desa"}
            </span>
          </Link>

          <nav className="hidden gap-6 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-body text-sm text-paper/85 transition-colors hover:text-paper"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <MobileNav dark />
        </div>
      </Container>
    </header>
  );
}