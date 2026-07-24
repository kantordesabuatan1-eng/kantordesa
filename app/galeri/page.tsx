import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import { getCollection, sortByDateDesc } from "@/lib/content";

export const metadata: Metadata = { title: "Galeri" };

export default function Galeri() {
  const galeri = sortByDateDesc(getCollection("galeri"));

  return (
    <Container className="py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-gabah-dark">Dokumentasi</p>
      <h1 className="mt-2 font-display text-4xl text-sawah">Galeri Kegiatan</h1>
      <p className="mt-3 max-w-2xl text-ink/70">
        Foto-foto kegiatan dan pembangunan desa. Admin bisa menambah foto baru kapan saja lewat
        halaman admin.
      </p>

      <div className="mt-12 columns-2 gap-4 md:columns-3">
        {galeri.map((item, i) => (
          <FadeIn
            key={item.slug}
            delay={(i % 6) * 0.06}
            className="mb-4 break-inside-avoid overflow-hidden rounded-xl"
          >
            {item.data.gambar && (
              <Image
                src={item.data.gambar}
                alt={item.data.judul}
                width={600}
                height={400}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full object-cover"
              />
            )}
            <p className="mt-1 text-xs text-muted">{item.data.judul}</p>
          </FadeIn>
        ))}
        {galeri.length === 0 && <p className="text-muted">Belum ada foto di galeri.</p>}
      </div>
    </Container>
  );
}
