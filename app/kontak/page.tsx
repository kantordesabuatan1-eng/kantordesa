import type { Metadata } from "next";
import Container from "@/components/Container";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Kontak" };

export default function Kontak() {
  const s = getSettings();

  return (
    <Container className="py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-gabah-dark">Hubungi Kami</p>
      <h1 className="mt-2 font-display text-4xl text-sawah">Kontak</h1>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-sawah/15 bg-surface p-6">
          <h2 className="font-display text-xl text-sawah">Kantor Desa</h2>
          <p className="mt-3 text-ink/80">{s.alamat_kantor}</p>
          <p className="mt-2 text-ink/80">Jam layanan: {s.jam_layanan}</p>
          <p className="mt-2 text-ink/80">Telepon: {s.telepon}</p>
          <p className="mt-2 text-ink/80">Email: {s.email}</p>
        </div>
        <div className="rounded-2xl border border-sawah/15 bg-surface p-6">
          <h2 className="font-display text-xl text-sawah">Media Sosial</h2>
          <ul className="mt-3 space-y-2 text-ink/80">
            {s.facebook && <li>Facebook: {s.facebook}</li>}
            {s.instagram && <li>Instagram: {s.instagram}</li>}
            {s.youtube && <li>YouTube: {s.youtube}</li>}
            {!s.facebook && !s.instagram && !s.youtube && (
              <li className="text-muted">Belum ditambahkan.</li>
            )}
          </ul>
        </div>
      </div>
    </Container>
  );
}
