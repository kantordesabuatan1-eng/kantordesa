import Link from "next/link";
import Image from "next/image";
import { Users, Map, Home, Network, Sprout, Images } from "lucide-react";
import Container from "@/components/Container";
import TerraceMotif from "@/components/TerraceMotif";
import FadeIn from "@/components/FadeIn";
import { getCollection, getSettings, sortByDateDesc } from "@/lib/content";

export default function Beranda() {
  const s = getSettings();
  const berita = sortByDateDesc(getCollection("berita")).slice(0, 3);

  const stats = [
    { label: "Jumlah Penduduk", value: s.jumlah_penduduk, Icon: Users },
    { label: "Luas Wilayah", value: s.luas_wilayah, Icon: Map },
    { label: "Jumlah Dusun", value: s.jumlah_dusun, Icon: Home },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-terrace-lines">
        {s.foto_latar_beranda && (
          <>
            {/* Foto latar - full, tanpa overlay tebal */}
            <Image
              src={s.foto_latar_beranda}
              alt=""
              fill
              priority
              className="object-cover"
            />
            {/* Overlay sangat tipis, cuma supaya teks di area atas tetap kebaca */}
            <div className="absolute inset-0 bg-gradient-to-b from-paper/35 via-transparent to-transparent" />
          </>
        )}
        <Container className="relative z-10 grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
          <FadeIn
            className={
              s.foto_latar_beranda
                ? "rounded-3xl bg-paper/75 p-6 backdrop-blur-sm sm:p-8"
                : ""
            }
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gabah-dark">
              Situs Resmi {s.kecamatan}
            </p>
            <h1 className="font-display text-4xl leading-tight text-sawah md:text-5xl">
              {s.nama_desa}
            </h1>
            <p className="mt-4 max-w-md text-lg text-ink/80">{s.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/profil-desa"
                className="rounded-full bg-sawah px-6 py-3 text-sm font-medium text-paper transition hover:bg-sawah-dark"
              >
                Kenali Desa Kami
              </Link>
              <Link
                href="/layanan"
                className="rounded-full border border-sawah px-6 py-3 text-sm font-medium text-sawah transition hover:bg-sawah/10"
              >
                Layanan Publik
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.15} className="grid grid-cols-3 gap-2 sm:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-sawah/15 bg-paper/80 p-3 text-center shadow-sm backdrop-blur-sm sm:p-4"
              >
                <stat.Icon className="mx-auto mb-2 h-5 w-5 text-sawah" strokeWidth={1.5} />
                <p className="font-display text-lg text-sawah sm:text-2xl">{stat.value}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-muted sm:text-[11px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </FadeIn>
        </Container>

        {/* Motif ombak menyatu langsung di ujung bawah foto, tanpa jarak/garis batas */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-1">
          <TerraceMotif />
        </div>
      </section>

      {/* Berita terbaru */}
      <section className="bg-sawah-dark py-16 text-paper">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-3xl">Berita &amp; Pengumuman</h2>
            <Link href="/berita" className="text-sm text-gabah-light underline underline-offset-4">
              Lihat semua
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {berita.length === 0 && (
              <p className="text-paper/60">Belum ada berita yang dipublikasikan.</p>
            )}
            {berita.map((item, i) => (
              <FadeIn key={item.slug} delay={i * 0.1}>
                <Link
                  href={`/berita/${item.slug}`}
                  className="group block rounded-xl border border-paper/10 bg-paper/5 p-5 transition hover:border-gabah/50"
                >
                  <p className="font-mono text-xs uppercase tracking-wide text-gabah-light">
                    {item.data.kategori}
                  </p>
                  <h3 className="mt-2 font-display text-xl leading-snug group-hover:text-gabah-light">
                    {item.data.judul}
                  </h3>
                  <p className="mt-2 text-sm text-paper/70">{item.data.ringkasan}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Tautan cepat */}
      <section className="py-16">
        <Container className="grid gap-6 md:grid-cols-3 md:auto-rows-fr">
          {[
            { href: "/struktur-organisasi", title: "Struktur Organisasi", desc: "Kenali perangkat desa yang melayani Anda.", Icon: Network },
            { href: "/potensi", title: "Potensi Desa", desc: "Produk UMKM dan hasil bumi unggulan desa.", Icon: Sprout },
            { href: "/galeri", title: "Galeri Kegiatan", desc: "Dokumentasi kegiatan dan pembangunan desa.", Icon: Images },
          ].map((card, i) => (
            <FadeIn key={card.href} delay={i * 0.1} className="h-full">
              <Link
                href={card.href}
                className="flex h-full flex-col rounded-2xl border border-sawah/15 bg-surface p-6 transition hover:border-sawah/40 hover:shadow-md"
              >
                <card.Icon className="mb-3 h-6 w-6 text-sawah" strokeWidth={1.5} />
                <h3 className="font-display text-xl text-sawah">{card.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{card.desc}</p>
              </Link>
            </FadeIn>
          ))}
        </Container>
      </section>
    </>
  );
}
