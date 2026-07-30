import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Map,
  Home,
  Network,
  Sprout,
  Images,
  FileText,
  ClipboardList,
  Phone,
} from "lucide-react";
import Container from "@/components/Container";
import TerraceMotif from "@/components/TerraceMotif";
import FadeIn from "@/components/FadeIn";
import { getCollection, getSettings, getSingleton, sortByDateDesc } from "@/lib/content";

export default function Beranda() {
  const s = getSettings();
  const profil = getSingleton("profil.md");
  const berita = sortByDateDesc(getCollection("berita")).slice(0, 3);

  const stats = [
    { label: "Jumlah Penduduk", value: s.jumlah_penduduk, Icon: Users },
    { label: "Luas Wilayah", value: s.luas_wilayah, Icon: Map },
    { label: "Jumlah Dusun", value: s.jumlah_dusun, Icon: Home },
  ];

  const tautanCepat = [
    { href: "/profil-desa", title: "Profil Desa", desc: "Sejarah, visi, dan misi desa.", Icon: FileText },
    { href: "/struktur-organisasi", title: "Struktur Organisasi", desc: "Kenali perangkat desa yang melayani Anda.", Icon: Network },
    { href: "/layanan", title: "Layanan Publik", desc: "Persyaratan dan alur pengurusan surat.", Icon: ClipboardList },
    { href: "/potensi", title: "Potensi Desa", desc: "Produk UMKM dan hasil bumi unggulan desa.", Icon: Sprout },
    { href: "/galeri", title: "Galeri Kegiatan", desc: "Dokumentasi kegiatan dan pembangunan desa.", Icon: Images },
    { href: "/kontak", title: "Kontak Kami", desc: "Alamat, telepon, dan lokasi kantor desa.", Icon: Phone },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-terrace-lines">
        {s.foto_latar_beranda && (
          <>
            <Image
              src={s.foto_latar_beranda}
              alt=""
              fill
              priority
              className="object-cover"
            />
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

        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-1">
          <TerraceMotif />
        </div>
      </section>

      {/* Kata sambutan Kepala Desa */}
      {profil?.data.kata_sambutan && (
        <section className="py-16">
          <Container>
            <FadeIn className="grid gap-8 rounded-3xl border border-sawah/15 bg-surface p-6 sm:p-10 md:grid-cols-[auto,1fr] md:items-center">
              {profil.data.foto_kepala_desa && (
                <div className="relative mx-auto h-40 w-40 shrink-0 overflow-hidden rounded-full border-4 border-paper shadow-md sm:h-48 sm:w-48">
                  <Image
                    src={profil.data.foto_kepala_desa}
                    alt={profil.data.nama_kepala_desa || "Kepala Desa"}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-gabah-dark">
                  Kata Sambutan
                </p>
                <p className="mt-3 whitespace-pre-line font-display text-lg italic leading-relaxed text-ink/90 sm:text-xl">
                  &ldquo;{profil.data.kata_sambutan}&rdquo;
                </p>
                {profil.data.nama_kepala_desa && (
                  <p className="mt-4 font-display text-sawah">
                    {profil.data.nama_kepala_desa}
                    <span className="block font-body text-xs font-normal uppercase tracking-wide text-muted">
                      Kepala Desa
                    </span>
                  </p>
                )}
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

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
                  className="group block overflow-hidden rounded-xl border border-paper/10 bg-paper/5 transition hover:border-gabah/50"
                >
                  {item.data.gambar_sampul && (
                    <div className="relative h-40 w-full bg-paper/10">
                      <Image
                        src={item.data.gambar_sampul}
                        alt={item.data.judul}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <p className="font-mono text-xs uppercase tracking-wide text-gabah-light">
                      {item.data.kategori}
                    </p>
                    <h3 className="mt-2 font-display text-xl leading-snug group-hover:text-gabah-light">
                      {item.data.judul}
                    </h3>
                    <p className="mt-2 text-sm text-paper/70">{item.data.ringkasan}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Tautan cepat */}
      <section className="py-16">
        <Container>
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-widest text-gabah-dark">
              Jelajahi Situs
            </p>
            <h2 className="mt-2 font-display text-3xl text-sawah">Kenali Kami</h2>
          </FadeIn>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:auto-rows-fr lg:grid-cols-3">
            {tautanCepat.map((card, i) => (
              <FadeIn key={card.href} delay={i * 0.08} className="h-full">
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
          </div>
        </Container>
      </section>
    </>
  );
}