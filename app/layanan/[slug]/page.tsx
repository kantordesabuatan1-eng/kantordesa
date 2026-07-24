import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { getCollection, getItem, markdownToHtml } from "@/lib/content";

export function generateStaticParams() {
  return getCollection("layanan").map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = getItem("layanan", params.slug);
  return { title: item?.data.nama_layanan || "Layanan" };
}

export default async function LayananDetail({ params }: { params: { slug: string } }) {
  const item = getItem("layanan", params.slug);
  if (!item) notFound();

  const html = await markdownToHtml(item.content);

  return (
    <Container className="py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-gabah-dark">Layanan Publik</p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl text-sawah">
        {item.data.nama_layanan}
      </h1>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-sawah/15 bg-surface p-5">
          <p className="font-mono text-xs uppercase text-muted">Waktu Proses</p>
          <p className="mt-1 font-display text-lg text-ink">{item.data.waktu_proses}</p>
        </div>
        <div className="rounded-xl border border-sawah/15 bg-surface p-5">
          <p className="font-mono text-xs uppercase text-muted">Biaya</p>
          <p className="mt-1 font-display text-lg text-ink">{item.data.biaya}</p>
        </div>
        <div className="rounded-xl border border-sawah/15 bg-surface p-5">
          <p className="font-mono text-xs uppercase text-muted">Persyaratan</p>
          <ul className="mt-1 list-disc pl-4 text-sm text-ink/80">
            {(item.data.persyaratan || []).map((p: string, i: number) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <article
        className="prose-desa mt-10 max-w-3xl"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Container>
  );
}
