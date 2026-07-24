import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import { getCollection, sortByDateDesc } from "@/lib/content";

export const metadata: Metadata = { title: "Berita" };

export default function BeritaList() {
  const berita = sortByDateDesc(getCollection("berita"));

  return (
    <Container className="py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-gabah-dark">Informasi</p>
      <h1 className="mt-2 font-display text-4xl text-sawah">Berita &amp; Pengumuman</h1>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {berita.map((item, i) => (
          <FadeIn key={item.slug} delay={(i % 4) * 0.08}>
            <Link
              href={`/berita/${item.slug}`}
              className="group block overflow-hidden rounded-2xl border border-sawah/15 bg-surface transition hover:shadow-md"
            >
              {item.data.gambar_sampul && (
                <div className="relative h-48 w-full bg-sawah/10">
                  <Image
                    src={item.data.gambar_sampul}
                    alt={item.data.judul}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="font-mono text-xs uppercase tracking-wide text-gabah-dark">
                  {item.data.kategori} ·{" "}
                  {new Date(item.data.tanggal).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2 className="mt-2 font-display text-2xl text-ink group-hover:text-sawah">
                  {item.data.judul}
                </h2>
                <p className="mt-2 text-sm text-ink/70">{item.data.ringkasan}</p>
              </div>
            </Link>
          </FadeIn>
        ))}
        {berita.length === 0 && <p className="text-muted">Belum ada berita.</p>}
      </div>
    </Container>
  );
}
