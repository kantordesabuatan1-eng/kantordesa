import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import Container from "./Container";
import TerraceMotif from "./TerraceMotif";
import { getSettings } from "@/lib/content";
import { NAV } from "@/lib/nav";

export default function Footer() {
  const s = getSettings();

  const sosial = [
    { href: s.facebook, Icon: Facebook, label: "Facebook" },
    { href: s.instagram, Icon: Instagram, label: "Instagram" },
    { href: s.youtube, Icon: Youtube, label: "YouTube" },
  ].filter((item) => item.href);

  const tautanCepat = NAV.slice(0, 4);
  const layanan = NAV.slice(4);

  return (
    <footer className="mt-24 bg-sawah-dark text-paper">
      <TerraceMotif flip />
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Kolom 1: Identitas desa */}
        <div>
          <div className="flex items-center gap-2.5">
            {s.logo && (
              <span className="relative h-9 w-7 shrink-0">
                <Image src={s.logo} alt={s.nama_desa} fill className="object-contain" />
              </span>
            )}
            <p className="font-display text-lg">{s.nama_desa}</p>
          </div>
          <p className="mt-3 text-sm text-paper/60">{s.tagline}</p>

          {sosial.length > 0 && (
            <div className="mt-5 flex gap-3">
              {sosial.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition hover:border-paper/40 hover:text-paper"
                >
                  <item.Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Kolom 2: Tautan Cepat */}
        <div>
          <p className="mb-4 font-body text-sm font-semibold uppercase tracking-wide text-paper/50">
            Tautan Cepat
          </p>
          <ul className="space-y-2.5">
            {tautanCepat.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-paper/75 transition hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3: Layanan */}
        <div>
          <p className="mb-4 font-body text-sm font-semibold uppercase tracking-wide text-paper/50">
            Layanan
          </p>
          <ul className="space-y-2.5">
            {layanan.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-paper/75 transition hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 4: Kontak */}
        <div>
          <p className="mb-4 font-body text-sm font-semibold uppercase tracking-wide text-paper/50">
            Kontak Kami
          </p>
          <ul className="space-y-3 text-sm text-paper/75">
            <li className="flex gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 translate-y-0.5 text-paper/50" strokeWidth={1.5} />
              <span>{s.alamat_kantor}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-paper/50" strokeWidth={1.5} />
              <span>{s.telepon}</span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-paper/50" strokeWidth={1.5} />
              <span>{s.email}</span>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col items-center justify-between gap-2 border-t border-paper/10 py-6 text-xs text-paper/50 sm:flex-row">
        <p>© {new Date().getFullYear()} {s.nama_desa}. Situs resmi pemerintah desa.</p>
        <p>Developed by Naufal Hidayatul Aulia</p>
      </Container>
    </footer>
  );
}