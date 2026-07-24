import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import { getCollection } from "@/lib/content";

export const metadata: Metadata = { title: "Potensi Desa" };

export default function PotensiDesa() {
  const potensi = getCollection("potensi");

  return (
    <Container className="py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-gabah-dark">Ekonomi Lokal</p>
      <h1 className="mt-2 font-display text-4xl text-sawah">Potensi Desa &amp; UMKM</h1>
      <p className="mt-3 max-w-2xl text-ink/70">
        Produk unggulan dan hasil karya warga desa yang bisa Anda dukung.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {potensi.map((item, i) => (
          <FadeIn
            key={item.slug}
            delay={(i % 3) * 0.1}
            className="overflow-hidden rounded-2xl border border-sawah/15 bg-surface"
          >
            {item.data.foto && (
              <div className="relative h-44 w-full bg-sawah/10">
                <Image
                  src={item.data.foto}
                  alt={item.data.nama_produk}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="p-5">
              <p className="font-mono text-xs uppercase text-gabah-dark">{item.data.kategori}</p>
              <h2 className="mt-1 font-display text-xl text-ink">{item.data.nama_produk}</h2>
              <p className="mt-2 text-sm text-ink/70">{item.data.deskripsi_singkat}</p>
              {item.data.kontak_pemasaran && (
                <p className="mt-3 text-xs text-muted">📞 {item.data.kontak_pemasaran}</p>
              )}
            </div>
          </FadeIn>
        ))}
        {potensi.length === 0 && <p className="text-muted">Belum ada data potensi desa.</p>}
      </div>
    </Container>
  );
}
