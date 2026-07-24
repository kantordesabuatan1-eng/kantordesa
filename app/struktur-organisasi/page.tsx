import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import { getCollection, sortByOrder } from "@/lib/content";

export const metadata: Metadata = { title: "Struktur Organisasi" };

export default function StrukturOrganisasi() {
  const perangkat = sortByOrder(getCollection("struktur"));

  return (
    <Container className="py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-gabah-dark">Pemerintahan</p>
      <h1 className="mt-2 font-display text-4xl text-sawah">Struktur Organisasi</h1>
      <p className="mt-3 max-w-2xl text-ink/70">
        Susunan perangkat Desa yang bertugas melayani warga. Data dan foto pada halaman ini
        diperbarui langsung oleh admin desa.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {perangkat.map((p, i) => (
          <FadeIn
            key={p.slug}
            delay={(i % 4) * 0.08}
            className="overflow-hidden rounded-2xl border border-sawah/15 bg-surface text-center"
          >
            <div className="relative aspect-square w-full bg-sawah/10">
              {p.data.foto && (
                <Image
                  src={p.data.foto}
                  alt={p.data.nama}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              )}
            </div>
            <div className="p-4">
              <p className="font-display text-lg text-ink">{p.data.nama}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-gabah-dark">
                {p.data.jabatan}
              </p>
              {p.data.periode && (
                <p className="mt-1 text-xs text-muted">Periode {p.data.periode}</p>
              )}
            </div>
          </FadeIn>
        ))}
        {perangkat.length === 0 && (
          <p className="text-muted">Data struktur organisasi belum ditambahkan.</p>
        )}
      </div>
    </Container>
  );
}
