import type { Metadata } from "next";
import Container from "@/components/Container";
import GaleriCarousel from "@/components/GaleriCarousel";
import { getCollection, sortByDateDesc } from "@/lib/content";

export const metadata: Metadata = { title: "Galeri" };

export default function Galeri() {
  const galeri = sortByDateDesc(getCollection("galeri"));

  return (
    <Container className="py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-gabah-dark">Dokumentasi</p>
      <h1 className="mt-2 font-display text-4xl text-sawah">Galeri Kegiatan</h1>
      <p className="mt-3 max-w-2xl text-ink/70">
        Foto-foto kegiatan dan pembangunan desa. Geser (swipe) ke kiri/kanan untuk
        melihat semua foto. Admin bisa menambah foto baru kapan saja lewat halaman admin.
      </p>

      <GaleriCarousel items={galeri} />
    </Container>
  );
}