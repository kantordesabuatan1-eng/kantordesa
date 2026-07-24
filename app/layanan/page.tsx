import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import { getCollection, sortByOrder } from "@/lib/content";

export const metadata: Metadata = { title: "Layanan Publik" };

export default function LayananList() {
  const layanan = sortByOrder(getCollection("layanan"));

  return (
    <Container className="py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-gabah-dark">Pelayanan</p>
      <h1 className="mt-2 font-display text-4xl text-sawah">Layanan Publik</h1>
      <p className="mt-3 max-w-2xl text-ink/70">
        Daftar surat dan layanan administrasi yang dapat diurus warga di kantor desa.
      </p>

      <div className="mt-10 grid gap-4">
        {layanan.map((item) => (
          <Link
            key={item.slug}
            href={`/layanan/${item.slug}`}
            className="flex items-center justify-between rounded-xl border border-sawah/15 bg-surface px-6 py-5 transition hover:border-sawah/40"
          >
            <div>
              <h2 className="font-display text-lg text-ink">{item.data.nama_layanan}</h2>
              <p className="mt-1 text-sm text-muted">
                Waktu proses: {item.data.waktu_proses} · Biaya: {item.data.biaya}
              </p>
            </div>
            <span className="font-mono text-sm text-sawah">Lihat detail →</span>
          </Link>
        ))}
        {layanan.length === 0 && <p className="text-muted">Belum ada layanan yang ditambahkan.</p>}
      </div>
    </Container>
  );
}
