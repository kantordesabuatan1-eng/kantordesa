import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Map,
  Home,
  Network,
  Sprout,
  Images,
  ClipboardList,
  Phone,
  Compass,
  ScrollText,
  Target,
} from "lucide-react";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import TerraceMotif from "@/components/TerraceMotif";
import { getCollection, getSettings, getSingleton, sortByDateDesc } from "@/lib/content";

export default function Beranda() {
  const s = getSettings();
  const profil = getSingleton("profil.md");
  const berita = sortByDateDesc(getCollection("berita")).slice(0, 3);
  const potensi = getCollection("potensi").slice(0, 5);
  const galeri = sortByDateDesc(getCollection("galeri")).slice(0, 4);

  const stats = [
    { label: "Jumlah Penduduk", value: s.jumlah_penduduk, Icon: Users },
    { label: "Luas Wilayah", value: s.luas_wilayah, Icon: Map },
    { label: "Jumlah Dusun", value: s.jumlah_dusun, Icon: Home },
  ];

  const layananCepat = [
    { href: "/layanan", title: "Surat Menyurat", desc: "Pengajuan surat secara online.", Icon: ScrollText },
    { href: "/kontak", title: "Pengaduan", desc: "Sampaikan keluhan atau aspirasi.", Icon: ClipboardList },
    { href: "/struktur-organisasi", title: "Struktur Organisasi", desc: "Kenali perangkat desa.", Icon: Network },
    { href: "/potensi", title: "Potensi Desa", desc: "Produk UMKM & hasil bumi.", Icon: Sprout },
    { href: "/galeri", title: "Galeri", desc: "Dokumentasi kegiatan desa.", Icon: Images },
    { href: "/kontak", title: "Kontak", desc: "Alamat & lokasi kantor desa.", Icon: Phone },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative -mt-24">
        <Container className="pt-4 sm:pt-6">
          <div className="relative overflow-hidden rounded-[2rem]">
            {s.foto_latar_beranda ? (
              <div className="relative h-[420px] w-full sm:h-[520px] md:h-[600px]">
                <Image
                  src={s.foto_latar_beranda}
                  alt=""
                  fill
                  priority
                  className="object-cover"
                />
                {/* Gradasi hijau khas situs - gelap di atas (biar navbar & teks kebaca), menerus ke bawah */}
                <div className="absolute inset-0 bg-gradient-to-b from-sawah-dark/90 via-sawah-dark/50 to-sawah-dark/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-sawah-dark/70 via-sawah-dark/20 to-transparent" />
              </div>
            ) : (
              <div className="h-[420px] w-full bg-gradient-to-br from-sawah via-sawah-dark to-sawah-dark sm:h-[460px]" />
            )}

            <div className="absolute inset-0 flex items-end pb-10 sm:items-center sm:pb-0">
              <FadeIn className="max-w-xl px-6 sm:px-10 md:px-14">
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gabah-light">
                  Situs Resmi {s.kecamatan}
                </p>
                <h1 className="font-display text-3xl leading-tight text-paper sm:text-4xl md:text-5xl">
                  Selamat Datang di Website Resmi {s.nama_desa}
                </h1>
                <p className="mt-4 max-w-md text-paper/85 sm:text-lg">{s.tagline}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/profil-desa"
                    className="flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-medium text-sawah-dark transition hover:bg-gabah-light"
                  >
                    Jelajahi Desa
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/layanan"
                    className="rounded-full border border-paper/50 px-6 py-3 text-sm font-medium text-paper transition hover:bg-paper/10"
                  >
                    Layanan Publik
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Kartu statistik "mengambang", menimpa batas bawah kartu hero */}
          <FadeIn delay={0.15} className="relative z-10 -mt-8 grid grid-cols-3 gap-3 px-2 sm:-mt-14 sm:gap-5 sm:px-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-paper p-4 text-center shadow-lg sm:p-5"
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
        <div className="h-10 sm:h-0" />
      </section>

      {/* Profil Desa + Layanan Cepat */}
      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          {/* Kolom kiri: Profil Desa */}
          <FadeIn>
            {profil?.data.foto_sampul && (
              <div className="relative mb-6 h-52 w-full overflow-hidden rounded-2xl bg-sawah/10 sm:h-64">
                <Image
                  src={profil.data.foto_sampul}
                  alt="Profil Desa"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <p className="font-mono text-xs uppercase tracking-widest text-gabah-dark">
              Profil Desa
            </p>
            <h2 className="mt-2 font-display text-2xl text-sawah sm:text-3xl">
              Mengenal {s.nama_desa}
            </h2>
            <p className="mt-3 text-sm text-ink/70 sm:text-base">{s.tagline}</p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-sawah/15 bg-surface p-3">
                <Compass className="mb-1.5 h-4 w-4 text-sawah" strokeWidth={1.5} />
                <p className="font-display text-sm text-sawah">Visi</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-ink/60">{profil?.data.visi}</p>
              </div>
              <div className="rounded-xl border border-sawah/15 bg-surface p-3">
                <Target className="mb-1.5 h-4 w-4 text-sawah" strokeWidth={1.5} />
                <p className="font-display text-sm text-sawah">Misi</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-ink/60">
                  {profil?.data.misi?.[0]}
                </p>
              </div>
              <div className="rounded-xl border border-sawah/15 bg-surface p-3">
                <ScrollText className="mb-1.5 h-4 w-4 text-sawah" strokeWidth={1.5} />
                <p className="font-display text-sm text-sawah">Sejarah</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-ink/60">
                  Kenali asal-usul dan perjalanan desa kami.
                </p>
              </div>
            </div>

            <Link
              href="/profil-desa"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-sawah px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-sawah-dark"
            >
              Selengkapnya Tentang Desa
              <span aria-hidden="true">→</span>
            </Link>
          </FadeIn>

          {/* Kolom kanan: Layanan Cepat */}
          <FadeIn delay={0.1}>
            <p className="font-mono text-xs uppercase tracking-widest text-gabah-dark">
              Layanan Cepat
            </p>
            <h2 className="mt-2 font-display text-2xl text-sawah sm:text-3xl">
              Layanan untuk Masyarakat
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {layananCepat.map((item, i) => (
                <FadeIn key={item.title + i} delay={0.05 * i}>
                  <Link
                    href={item.href}
                    className="flex h-full flex-col gap-2 rounded-2xl border border-sawah/15 bg-surface p-4 transition hover:border-sawah/40 hover:shadow-md"
                  >
                    <item.Icon className="h-5 w-5 text-sawah" strokeWidth={1.5} />
                    <p className="font-display text-sm text-ink">{item.title}</p>
                    <p className="text-xs text-ink/60">{item.desc}</p>
                  </Link>
                </FadeIn>
              ))}
            </div>

            <Link
              href="/layanan"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sawah underline underline-offset-4"
            >
              Lihat Semua Layanan →
            </Link>
          </FadeIn>
        </Container>
      </section>

      {/* Kata sambutan Kepala Desa */}
      {profil?.data.kata_sambutan && (
        <section className="pb-16">
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
      <TerraceMotif />
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
      <TerraceMotif flip />

      {/* Potensi Desa */}
      {potensi.length > 0 && (
        <section className="py-16">
          <Container>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-gabah-dark">
                  Ekonomi Lokal
                </p>
                <h2 className="mt-2 font-display text-3xl text-sawah">Potensi Desa</h2>
              </div>
              <Link href="/potensi" className="text-sm text-sawah underline underline-offset-4">
                Lihat semua
              </Link>
            </div>

            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {potensi.map((item, i) => (
                <FadeIn
                  key={item.slug}
                  delay={i * 0.06}
                  className="relative aspect-square w-[46%] shrink-0 snap-start overflow-hidden rounded-2xl bg-sawah/10 sm:w-[30%] lg:w-[18.5%]"
                >
                  <Link href="/potensi" className="block h-full w-full">
                    {item.data.foto && (
                      <Image
                        src={item.data.foto}
                        alt={item.data.nama_produk}
                        fill
                        className="object-cover transition duration-300 hover:scale-105"
                        sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 18vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-sawah-dark/90 via-sawah-dark/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="font-display text-base text-paper">{item.data.nama_produk}</p>
                      <p className="mt-0.5 text-xs text-paper/70">{item.data.kategori}</p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Peta Lokasi + Galeri */}
      <section className="pb-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          {/* Peta Lokasi */}
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-widest text-gabah-dark">Lokasi</p>
            <h2 className="mt-2 font-display text-2xl text-sawah sm:text-3xl">Peta Desa</h2>

            <div className="mt-6 overflow-hidden rounded-2xl border border-sawah/15 bg-surface">
              {s.maps_embed_url ? (
                <iframe
                  src={s.maps_embed_url}
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi Desa"
                />
              ) : (
                <div className="flex h-[260px] items-center justify-center text-sm text-muted">
                  Peta belum ditambahkan
                </div>
              )}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div>
                  <p className="font-display text-lg text-ink">{s.nama_desa}</p>
                  <p className="text-sm text-muted">{s.kecamatan}, {s.kabupaten}</p>
                </div>
                <Link
                  href="/kontak"
                  className="rounded-full bg-sawah px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-sawah-dark"
                >
                  Lihat Lokasi
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Galeri */}
          <FadeIn delay={0.1}>
            <div className="flex items-end justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-gabah-dark">
                  Dokumentasi
                </p>
                <h2 className="mt-2 font-display text-2xl text-sawah sm:text-3xl">Galeri Desa</h2>
              </div>
              <Link href="/galeri" className="text-sm text-sawah underline underline-offset-4">
                Lihat semua
              </Link>
            </div>

            {galeri.length > 0 ? (
              <div className="mt-6 grid grid-cols-2 gap-3">
                {galeri.map((item) => (
                  <div
                    key={item.slug}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sawah/10"
                  >
                    {item.data.gambar && (
                      <Image
                        src={item.data.gambar}
                        alt={item.data.judul}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-sm text-muted">Belum ada foto di galeri.</p>
            )}
          </FadeIn>
        </Container>
      </section>
    </>
  );
}